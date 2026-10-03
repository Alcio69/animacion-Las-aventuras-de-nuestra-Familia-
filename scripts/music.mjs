// Procedural, royalty-free music + sound effects (100% ours, no Content ID issues).
// Usage: npm run music  → public/audio/music-*.mp3, public/audio/sfx-*.mp3
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SR = 44100;
const OUT = new URL('../public/audio/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function writeMp3(name, L, R = L) {
  const n = L.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(n * 4, 40);
  let peak = 1e-9;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const g = 0.89 / peak;
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
  }
  const wav = join(tmpdir(), `${name}.wav`);
  writeFileSync(wav, buf);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-b:a', '128k', join(OUT, `${name}.mp3`)]);
  rmSync(wav);
  console.log('  ✓', name, (n / SR).toFixed(1) + 's');
}

// ---------- instruments ----------
/** Karplus-Strong plucked string (ukulele-ish). */
function pluck(L, R, t, note, dur, vol, pan = 0) {
  const f = midi(note);
  const p = Math.max(2, Math.round(SR / f));
  const ring = new Float32Array(p).map(() => rnd() * 2 - 1);
  const start = Math.round(t * SR);
  const len = Math.round(dur * SR);
  let idx = 0;
  for (let i = 0; i < len && start + i < L.length; i++) {
    const a = ring[idx];
    const b = ring[(idx + 1) % p];
    ring[idx] = (a + b) * 0.5 * 0.996;
    idx = (idx + 1) % p;
    const env = i < 60 ? i / 60 : 1;
    const s = a * vol * env;
    L[start + i] += s * (1 - pan) * 0.5;
    R[start + i] += s * (1 + pan) * 0.5;
  }
}
/** Bell / glockenspiel: decaying sines with inharmonic partial. */
function bell(L, R, t, note, vol, dur = 1.2, pan = 0) {
  const f = midi(note);
  const start = Math.round(t * SR);
  for (let i = 0; i < dur * SR && start + i < L.length; i++) {
    const tt = i / SR;
    const e = Math.exp(-tt * 4.2) * Math.min(1, i / 40);
    const s = (Math.sin(2 * Math.PI * f * tt) + 0.35 * Math.sin(2 * Math.PI * f * 2.76 * tt) * Math.exp(-tt * 8)) * e * vol;
    L[start + i] += s * (1 - pan) * 0.5;
    R[start + i] += s * (1 + pan) * 0.5;
  }
}
/** Round bass. */
function bass(L, R, t, note, dur, vol) {
  const f = midi(note);
  const start = Math.round(t * SR);
  for (let i = 0; i < dur * SR && start + i < L.length; i++) {
    const tt = i / SR;
    const e = Math.min(1, i / 200) * Math.exp(-tt * 2.5);
    const s = (Math.sin(2 * Math.PI * f * tt) + 0.25 * Math.sin(4 * Math.PI * f * tt)) * e * vol;
    L[start + i] += s * 0.5;
    R[start + i] += s * 0.5;
  }
}
function noiseHit(L, R, t, vol, decay, hp = 0.6, pan = 0) {
  const start = Math.round(t * SR);
  let prev = 0;
  for (let i = 0; i < 0.25 * SR && start + i < L.length; i++) {
    const w = rnd() * 2 - 1;
    const h = w - prev * hp;
    prev = w;
    const s = h * Math.exp(-(i / SR) * decay) * vol;
    L[start + i] += s * (1 - pan) * 0.5;
    R[start + i] += s * (1 + pan) * 0.5;
  }
}
function kick(L, R, t, vol) {
  const start = Math.round(t * SR);
  for (let i = 0; i < 0.3 * SR && start + i < L.length; i++) {
    const tt = i / SR;
    const f = 50 + 90 * Math.exp(-tt * 30);
    const s = Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 9) * vol;
    L[start + i] += s * 0.5;
    R[start + i] += s * 0.5;
  }
}

// ---------- songs ----------
const CHORDS = {
  C: [60, 64, 67, 72],
  G: [55, 59, 62, 67],
  Am: [57, 60, 64, 69],
  F: [53, 57, 60, 65],
  Dm: [50, 57, 62, 65],
  Em: [52, 59, 64, 67],
};

function song(name, { bpm, prog, melody, swing = 0, drums = true, strum = 'pop' }) {
  const beat = 60 / bpm;
  const barLen = beat * 4;
  const bars = prog.length;
  const total = bars * barLen;
  const L = new Float32Array(Math.ceil((total + 2) * SR));
  const R = new Float32Array(L.length);
  prog.forEach((ch, b) => {
    const t0 = b * barLen;
    const notes = CHORDS[ch];
    // ukulele strum pattern: D . D U . U D U
    const pattern = strum === 'calm' ? [0, 2] : [0, 1, 1.5, 2.5, 3, 3.5];
    pattern.forEach((p, k) => {
      const down = k % 2 === 0;
      const order = down ? notes : [...notes].reverse();
      order.forEach((n, j) => pluck(L, R, t0 + p * beat + j * 0.012 + (p % 1 ? swing : 0), n, beat * 1.4, (down ? 0.32 : 0.2), -0.3));
    });
    bass(L, R, t0, notes[0] - 12, beat * 1.8, 0.55);
    bass(L, R, t0 + beat * 2, notes[0] - 12 + (b % 2 ? 7 : 0), beat * 1.8, 0.45);
    if (drums) {
      kick(L, R, t0, 0.55);
      kick(L, R, t0 + beat * 2, 0.45);
      for (let s = 0; s < 8; s++) noiseHit(L, R, t0 + s * beat * 0.5 + (s % 2 ? swing : 0), s % 2 ? 0.05 : 0.08, 60, 0.9, 0.4);
      noiseHit(L, R, t0 + beat, 0.22, 22, 0.3);
      noiseHit(L, R, t0 + beat * 3, 0.22, 22, 0.3);
    }
  });
  melody.forEach(([bar, pos, note, len = 1]) => {
    if (note) bell(L, R, bar * barLen + pos * beat, note, 0.22, beat * len + 0.6, 0.3);
  });
  // seamless loop: crossfade tail into head
  const loopN = Math.round(total * SR);
  const fadeN = Math.round(0.5 * SR);
  for (let i = 0; i < fadeN; i++) {
    L[i] += L[loopN + i] * (1 - i / fadeN);
    R[i] += R[loopN + i] * (1 - i / fadeN);
  }
  writeMp3(name, L.subarray(0, loopN), R.subarray(0, loopN));
}

// melody helper: [bar, beat, midi, lengthInBeats]
const happyMelody = [
  [0, 0, 72], [0, 1, 76], [0, 2, 79, 2], [1, 0, 79], [1, 1, 77], [1, 2, 74, 2],
  [2, 0, 76], [2, 1, 72], [2, 2, 69, 2], [3, 0, 72], [3, 1, 74], [3, 2, 77, 2],
  [4, 0, 72], [4, 0.5, 74], [4, 1, 76], [4, 2, 79, 2], [5, 0, 83], [5, 1, 81], [5, 2, 79, 2],
  [6, 0, 81], [6, 1, 79], [6, 2, 76, 2], [7, 0, 77], [7, 1, 76], [7, 2, 74], [7, 3, 72],
];
const prog8 = ['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'G'];
song('music-happy', {
  bpm: 112,
  prog: [...prog8, ...prog8],
  melody: [...happyMelody, ...happyMelody.map(([b, p, n, l]) => [b + 8, p, n + 12 > 88 ? n : n, l])],
  swing: 0.03,
});
song('music-calm', {
  bpm: 78,
  prog: ['F', 'C', 'Dm', 'C', 'F', 'C', 'G', 'C'],
  melody: [[0, 0, 69, 2], [0, 2, 72, 2], [1, 0, 67, 4], [2, 0, 65, 2], [2, 2, 69, 2], [3, 0, 67, 4], [4, 0, 72, 2], [4, 2, 74, 2], [5, 0, 76, 4], [6, 0, 74, 2], [6, 2, 71, 2], [7, 0, 72, 4]],
  drums: false,
  strum: 'calm',
});
song('music-adventure', {
  bpm: 126,
  prog: ['Am', 'F', 'C', 'G', 'Am', 'F', 'G', 'G'],
  melody: [[0, 0, 69], [0, 1, 72], [0, 2, 76, 2], [1, 0, 77], [1, 1, 76], [1, 2, 72, 2], [2, 0, 72], [2, 1, 76], [2, 2, 79, 2], [3, 0, 79], [3, 1, 81], [3, 2, 83, 2], [4, 0, 81], [4, 2, 76, 2], [5, 0, 77], [5, 2, 72, 2], [6, 0, 74], [6, 1, 76], [6, 2, 79, 2], [7, 0, 83, 4]],
});

// ---------- sound effects ----------
function sfx(name, dur, fn) {
  const L = new Float32Array(Math.ceil(dur * SR));
  const R = new Float32Array(L.length);
  fn(L, R);
  writeMp3(name, L, R);
}
const sweep = (L, R, f0, f1, dur, vol, shape = 'sine', t0 = 0) => {
  let ph = 0;
  const s0 = Math.round(t0 * SR);
  for (let i = 0; i < dur * SR; i++) {
    const k = i / (dur * SR);
    const f = f0 * Math.pow(f1 / f0, k);
    ph += (2 * Math.PI * f) / SR;
    let v = Math.sin(ph);
    if (shape === 'square') v = Math.sign(v) * 0.6;
    const e = Math.min(1, i / 100) * (1 - k);
    L[s0 + i] += v * e * vol;
    R[s0 + i] += v * e * vol;
  }
};
sfx('sfx-pop', 0.2, (L, R) => sweep(L, R, 300, 900, 0.09, 0.9));
sfx('sfx-boing', 0.6, (L, R) => {
  let ph = 0;
  for (let i = 0; i < 0.55 * SR; i++) {
    const tt = i / SR;
    const f = 180 + 120 * Math.sin(tt * 40) * Math.exp(-tt * 4) + tt * 200;
    ph += (2 * Math.PI * f) / SR;
    const v = Math.sin(ph) * Math.exp(-tt * 5);
    L[i] += v;
    R[i] += v;
  }
});
sfx('sfx-whoosh', 0.6, (L, R) => {
  let lp = 0;
  for (let i = 0; i < 0.6 * SR; i++) {
    const k = i / (0.6 * SR);
    const a = 0.02 + 0.25 * Math.sin(Math.PI * k);
    lp += a * ((rnd() * 2 - 1) - lp);
    const v = lp * Math.sin(Math.PI * k);
    L[i] += v;
    R[i] += v;
  }
});
sfx('sfx-ding', 1.5, (L, R) => {
  bell(L, R, 0, 88, 0.6, 1.4);
  bell(L, R, 0.08, 93, 0.4, 1.3);
});
sfx('sfx-sparkle', 1.3, (L, R) => [84, 88, 91, 96, 100, 103].forEach((n, i) => bell(L, R, i * 0.07, n, 0.3, 0.8, i % 2 ? 0.5 : -0.5)));
sfx('sfx-poof', 0.8, (L, R) => {
  let lp = 0;
  for (let i = 0; i < 0.8 * SR; i++) {
    const tt = i / SR;
    lp += 0.08 * ((rnd() * 2 - 1) - lp);
    const v = lp * Math.exp(-tt * 5) * 3;
    L[i] += v;
    R[i] += v;
  }
  kick(L, R, 0, 0.6);
});
sfx('sfx-tada', 1.6, (L, R) => {
  [60, 64, 67].forEach((n, i) => pluck(L, R, i * 0.06, n + 12, 0.3, 0.6));
  [60, 64, 67, 72].forEach((n) => pluck(L, R, 0.3, n + 12, 1.2, 0.5));
  [72, 76, 79, 84].forEach((n, i) => bell(L, R, 0.3 + i * 0.02, n, 0.25, 1.2));
});
sfx('sfx-drum', 1.2, (L, R) => {
  for (let i = 0; i < 16; i++) noiseHit(L, R, i * 0.05, 0.3 + i * 0.02, 30, 0.2);
  kick(L, R, 0.85, 1);
  noiseHit(L, R, 0.85, 0.5, 10, 0.5);
});
sfx('sfx-doorbell', 1.6, (L, R) => {
  bell(L, R, 0, 76, 0.6, 1.0);
  bell(L, R, 0.45, 72, 0.6, 1.1);
});
sfx('sfx-giggle', 0.9, (L, R) => {
  for (let k = 0; k < 5; k++) sweep(L, R, 700 - k * 30, 900 - k * 30, 0.09, 0.4, 'sine', k * 0.15);
});
sfx('sfx-thunder', 3.5, (L, R) => {
  // crack + long rolling rumble (low-passed noise with slow wobble)
  let lp = 0;
  let lp2 = 0;
  for (let i = 0; i < 3.4 * SR; i++) {
    const tt = i / SR;
    const w = rnd() * 2 - 1;
    lp += 0.02 * (w - lp);
    lp2 += 0.2 * (w - lp2);
    const crack = tt < 0.25 ? lp2 * Math.exp(-tt * 14) * 1.2 : 0;
    const roll = lp * (1 + 0.6 * Math.sin(tt * 9) * Math.sin(tt * 2.3)) * Math.min(1, tt * 8) * Math.exp(-tt * 0.9) * 5;
    L[i] += crack + roll;
    R[i] += crack * 0.8 + roll * 1.05;
  }
});
// ambience: steady rain (soft noise bed + random droplets), seamless loop
{
  const dur = 12;
  const L = new Float32Array(dur * SR);
  const R = new Float32Array(L.length);
  let a = 0;
  let b = 0;
  for (let i = 0; i < L.length; i++) {
    const w1 = rnd() * 2 - 1;
    const w2 = rnd() * 2 - 1;
    a += 0.35 * (w1 - a);
    b += 0.35 * (w2 - b);
    L[i] += a * 0.25;
    R[i] += b * 0.25;
  }
  for (let k = 0; k < 900; k++) {
    const s0 = Math.floor(rnd() * (L.length - 2000));
    const f = 2500 + rnd() * 4000;
    const v = 0.05 + rnd() * 0.12;
    const pan = rnd();
    for (let i = 0; i < 1500; i++) {
      const d = Math.sin((2 * Math.PI * f * i) / SR) * Math.exp(-i / 180) * v;
      L[s0 + i] += d * (1 - pan);
      R[s0 + i] += d * pan;
    }
  }
  const fade = SR;
  for (let i = 0; i < fade; i++) {
    L[i] = L[i] * (i / fade) + L[L.length - fade + i] * (1 - i / fade);
    R[i] = R[i] * (i / fade) + R[R.length - fade + i] * (1 - i / fade);
  }
  writeMp3('amb-rain', L.subarray(0, L.length - fade), R.subarray(0, R.length - fade));
}
console.log('audio ok');
