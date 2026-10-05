#!/usr/bin/env python3
"""Generate character voices for every line in every episode (offline, free).

- Uses Kokoro neural voices (natural prosody) via sherpa-onnx, downloaded automatically the
  first time. Piper voices are still supported (engine "piper").
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

# Casting: engine + voice + speed + pitch (semitones) per character. Change here to recast a voice.
# Kokoro Spanish speakers: 28 = ef_dora (female), 29 = em_alex (male), 53 = em_santa (warm male).
# formant "shifted" makes a voice sound younger (smaller vocal tract); "preserved" keeps the timbre.
VOICES = {
    "papa": {"engine": "kokoro", "sid": 29, "speed": 0.95, "pitch": -1.0, "formant": "preserved"},
    "mama": {"engine": "kokoro", "sid": 28, "speed": 0.97, "pitch": 0.0},
    "hijo": {"engine": "kokoro", "sid": 28, "speed": 1.0, "pitch": 2.5, "formant": "shifted"},
    "hija": {"engine": "kokoro", "sid": 28, "speed": 1.0, "pitch": 5.0, "formant": "shifted"},
    "narrador": {"engine": "kokoro", "sid": 53, "speed": 0.9, "pitch": 0.0},
    "lola": {"engine": "kokoro", "sid": 28, "speed": 1.06, "pitch": 3.8, "formant": "shifted"},
    "tomi": {"engine": "kokoro", "sid": 29, "speed": 1.0, "pitch": 6.0, "formant": "shifted"},
    "benja": {"engine": "kokoro", "sid": 53, "speed": 1.0, "pitch": 5.5, "formant": "shifted"},
    "benjaPapa": {"engine": "kokoro", "sid": 29, "speed": 0.95, "pitch": -3.0, "formant": "preserved"},
    "benjaMama": {"engine": "kokoro", "sid": 28, "speed": 0.95, "pitch": -1.5, "formant": "preserved"},
    "abuela": {"engine": "kokoro", "sid": 28, "speed": 0.86, "pitch": -2.5, "formant": "preserved"},
    "dentista": {"engine": "kokoro", "sid": 53, "speed": 1.0, "pitch": 2.0, "formant": "preserved"},
}
KOKORO = "kokoro-multi-lang-v1_0"

_engines = {}


def fetch(name):
    d = os.path.join(TTS_DIR, name)
    if not os.path.isdir(d):
        os.makedirs(TTS_DIR, exist_ok=True)
        print(f"  downloading voice model {name} ...")
        tmp = os.path.join(TTS_DIR, f"{name}.tar.bz2")
        urllib.request.urlretrieve(f"{RELEASE}/{name}.tar.bz2", tmp)
        with tarfile.open(tmp) as t:
            t.extractall(TTS_DIR)
        os.remove(tmp)
    return d


def engine(model):
    if model in _engines:
        return _engines[model]
    import sherpa_onnx

    if model == KOKORO:
        d = fetch(KOKORO)
        cfg = sherpa_onnx.OfflineTtsConfig(
            model=sherpa_onnx.OfflineTtsModelConfig(
                kokoro=sherpa_onnx.OfflineTtsKokoroModelConfig(
                    model=os.path.join(d, "model.onnx"),
                    voices=os.path.join(d, "voices.bin"),
                    tokens=os.path.join(d, "tokens.txt"),
                    data_dir=os.path.join(d, "espeak-ng-data"),
                    lexicon=os.path.join(d, "lexicon-us-en.txt"),
                    lang="es",
                ),
                num_threads=4,
            )
        )
        _engines[model] = sherpa_onnx.OfflineTts(cfg)
        return _engines[model]

    d = fetch(f"vits-piper-{model}")
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
    if v.get("engine") == "kokoro":
        audio = engine(KOKORO).generate(tts_text(text), sid=v["sid"], speed=v["speed"])
    else:
        audio = engine(v["model"]).generate(tts_text(text), sid=0, speed=v["speed"])
    with tempfile.TemporaryDirectory() as td:
        raw = os.path.join(td, "raw.wav")
        sf.write(raw, np.array(audio.samples, dtype=np.float32), audio.sample_rate)
        filters = []
        if v["pitch"]:
            filters.append(f"rubberband=pitch={2 ** (v['pitch'] / 12):.4f}:formant={v.get('formant', 'shifted')}")
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
        cast = json.dumps(VOICES[ln["speaker"]], sort_keys=True)
        if force or key not in manifest or not os.path.exists(dest) or manifest[key].get("v") != cast:
            print(f"  [{ln['speaker']}] {ln['text']}")
            used[key] = {**synth(ln["speaker"], ln["text"], dest), "v": cast}
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
