import sherpa_onnx, soundfile as sf, numpy as np, sys
import os
# Whisper (offline) to check that generated voices are intelligible.
# Model: github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-base.tar.bz2 (extract into ~/tts)
d = os.path.join(os.environ.get("TTS_DIR", os.path.expanduser("~/tts")), "sherpa-onnx-whisper-base")
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=d+"/base-encoder.int8.onnx",decoder=d+"/base-decoder.int8.onnx",tokens=d+"/base-tokens.txt",language="es",task="transcribe",num_threads=4)
for f in sys.argv[1:]:
    a,sr=sf.read(f,dtype='float32')
    if a.ndim>1: a=a.mean(1)
    s=rec.create_stream(); s.accept_waveform(sr,a); rec.decode_stream(s)
    print(f.split('/')[-1],'=>',s.result.text)
