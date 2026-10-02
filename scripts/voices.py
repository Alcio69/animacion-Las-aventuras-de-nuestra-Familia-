#!/usr/bin/env python3
"""Generate character voices for every line in every episode (offline, free).

- Uses Piper neural voices via sherpa-onnx (downloaded automatically the first time).
- Only NEW or CHANGED lines are synthesized (files are named by a hash of speaker+text).
- Writes public/voices/<key>.mp3 and src/voices.json (duration + lip-sync envelope).

Usage:  npm run voices          (pip install sherpa-onnx soundfile numpy  the first time)
"""
import glob, json, os, re, subprocess, sys, tarfile, tempfile, urllib.request

import numpy as np
import soundfile as sf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TTS_DIR = os.environ.get("TTS_DIR", os.path.expanduser("~/tts"))
OUT = os.path.join(ROOT, "public", "voices")
MANIFEST = os.path.join(ROOT, "src", "voices.json")
FPS = 30
RELEASE = "https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models"

# Casting: model + speed + pitch (semitones) per character. Change here to recast a voice.
VOICES = {
    "papa": {"model": "es_MX-claude-high", "speed": 0.8, "pitch": -1.0},
    "mama": {"model": "es_AR-daniela-high", "speed": 0.8, "pitch": 1.0},
    "hijo": {"model": "es_MX-claude-high", "speed": 0.84, "pitch": 5.0},
    "hija": {"model": "es_AR-daniela-high", "speed": 0.8, "pitch": 5.5},
    "narrador": {"model": "es_MX-ald-medium", "speed": 0.74, "pitch": 0.0},
}

_engines = {}


def engine(model):
    if model in _engines:
        return _engines[model]
    import sherpa_onnx

    d = os.path.join(TTS_DIR, f"vits-piper-{model}")
    if not os.path.isdir(d):
        os.makedirs(TTS_DIR, exist_ok=True)
        url = f"{RELEASE}/vits-piper-{model}.tar.bz2"
        print(f"  downloading voice {model} ...")
        tmp = os.path.join(TTS_DIR, f"{model}.tar.bz2")
        urllib.request.urlretrieve(url, tmp)
        with tarfile.open(tmp) as t:
            t.extractall(TTS_DIR)
        os.remove(tmp)
    cfg = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=glob.glob(os.path.join(d, "*.onnx"))[0],
                tokens=os.path.join(d, "tokens.txt"),
                data_dir=os.path.join(d, "espeak-ng-data"),
            ),
            num_threads=4,
        )
    )
    _engines[model] = sherpa_onnx.OfflineTts(cfg)
    return _engines[model]


def tts_text(text):
    # ALL-CAPS words would be spelled letter by letter: lowercase them for the voice only.
    return re.sub(r"\b([A-ZÁÉÍÓÚÑ]{2,})\b", lambda m: m.group(1).lower(), text)


def synth(speaker, text, dest):
    v = VOICES[speaker]
    audio = engine(v["model"]).generate(tts_text(text), sid=0, speed=v["speed"])
    with tempfile.TemporaryDirectory() as td:
        raw = os.path.join(td, "raw.wav")
        sf.write(raw, np.array(audio.samples, dtype=np.float32), audio.sample_rate)
        filters = []
        if v["pitch"]:
            filters.append(f"rubberband=pitch={2 ** (v['pitch'] / 12):.4f}:formant=shifted")
        filters += [
            "silenceremove=start_periods=1:start_threshold=-45dB",
            "areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse",
            "loudnorm=I=-16:TP=-1.5:LRA=11",
            "aresample=44100",
        ]
        wav = os.path.join(td, "fx.wav")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af", ",".join(filters), "-ac", "1", wav], check=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-b:a", "96k", dest], check=True)
        data, sr = sf.read(wav)
    return analyze(data, sr)


def analyze(data, sr):
    if data.ndim > 1:
        data = data.mean(axis=1)
    hop = sr // FPS
    n = int(np.ceil(len(data) / hop))
    rms = np.array([np.sqrt(np.mean(data[i * hop : (i + 1) * hop] ** 2) + 1e-12) for i in range(n)])
    ref = np.percentile(rms, 92) or 1
    env = np.clip(rms / ref, 0, 1)
    env = np.where(env < 0.12, 0, env)  # closed mouth on pauses
    return {"d": round(len(data) / sr, 3), "a": [round(float(x), 2) for x in env]}


def main():
    lines = json.loads(subprocess.check_output(["node", "--no-warnings", os.path.join(ROOT, "scripts", "lines.mjs")], cwd=ROOT))
    os.makedirs(OUT, exist_ok=True)
    manifest = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
    force = "--force" in sys.argv
    used = {}
    for ln in lines:
        key, dest = ln["key"], os.path.join(OUT, ln["key"] + ".mp3")
        if key in used:
            continue
        if force or key not in manifest or not os.path.exists(dest):
            print(f"  [{ln['speaker']}] {ln['text']}")
            used[key] = synth(ln["speaker"], ln["text"], dest)
        else:
            used[key] = manifest[key]
    # prune voices of lines that no longer exist
    for f in glob.glob(os.path.join(OUT, "*.mp3")):
        if os.path.basename(f)[:-4] not in used:
            os.remove(f)
    with open(MANIFEST, "w") as fh:
        json.dump(used, fh, separators=(",", ":"), sort_keys=True)
    print(f"voices ok: {len(used)} lines")


if __name__ == "__main__":
    main()
