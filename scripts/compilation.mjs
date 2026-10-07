// Build a compilation video from already-rendered 3D chapters (no re-render):
// keeps the intro of the first chapter and the outro of the last, cuts the repeated ones in between,
// with short audio fades at each join. Also writes the chapter timestamps (for the YouTube description)
// and a merged .srt.
// Usage: node scripts/compilation.mjs <name> ep01-x ep02-y ep03-z
//   → public/compilados/<name>.mp4, <name>.txt (timestamps), <name>.es.srt
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [name, ...ids] = process.argv.slice(2);
if (!name || ids.length < 2) throw new Error('Usage: node scripts/compilation.mjs <name> ep01-x ep02-y ...');

const tmp = mkdtempSync(path.join(os.tmpdir(), 'comp-'));
const mod = path.join(tmp, 'eps.mjs');
await build({
  stdin: {
    contents: "export { EPISODES } from './src/episodes/index.ts'; export { compileEpisode, INTRO_SEC, OUTRO_SEC } from './src/engine/timeline.ts';",
    resolveDir: process.cwd(),
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: mod,
  logLevel: 'error',
});
const { EPISODES, compileEpisode, INTRO_SEC, OUTRO_SEC } = await import(mod);

const OUT = 'public/compilados';
mkdirSync(OUT, { recursive: true });
const FADE = 0.25;
const NAMES = { papa: 'Max', mama: 'Luna', hijo: 'Lio', hija: 'Tini', narrador: 'Narrador' };
const srtTime = (s) => {
  const ms = Math.round(s * 1000);
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const ytTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const parts = [];
let t = 0;
const stamps = [];
const cues = [];
ids.forEach((id, i) => {
  const ep = EPISODES.find((e) => e.id === id);
  if (!ep) throw new Error(`No chapter ${id}`);
  const c = compileEpisode(ep);
  const first = i === 0;
  const last = i === ids.length - 1;
  const a = first ? 0 : INTRO_SEC;
  const b = last ? c.totalSec : c.totalSec - OUTRO_SEC;
  // timestamp points at the start of the chapter's story (after the intro for the first one, so the list reads 0:00 = intro)
  stamps.push({ at: first ? 0 : t, title: `Capítulo ${ep.number}: ${ep.title}` });
  for (const s of c.scenes)
    for (const e of s.events)
      if (e.kind === 'line') cues.push({ a: t + (s.start + e.t0 - a), b: t + (s.start + e.t1 - a), who: e.who, text: e.text });
  parts.push({ file: `public/episodes/${id}-3d.mp4`, a, b, first, last });
  t += b - a;
});

const out = path.join(OUT, `${name}.mp4`);
const inputs = parts.flatMap((p) => ['-ss', String(p.a), '-to', String(p.b), '-i', p.file]);
const chains = parts
  .map((p, i) => {
    const d = p.b - p.a;
    const af = [!p.first && `afade=t=in:st=0:d=${FADE}`, !p.last && `afade=t=out:st=${(d - FADE).toFixed(3)}:d=${FADE}`].filter(Boolean).join(',') || 'anull';
    return `[${i}:v]setpts=PTS-STARTPTS[v${i}];[${i}:a]asetpts=PTS-STARTPTS,${af}[a${i}]`;
  })
  .join(';');
const concat = parts.map((_, i) => `[v${i}][a${i}]`).join('') + `concat=n=${parts.length}:v=1:a=1[v][a]`;
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...inputs, '-filter_complex', `${chains};${concat}`, '-map', '[v]', '-map', '[a]',
  '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out]);

writeFileSync(path.join(OUT, `${name}.txt`), stamps.map((s) => `${ytTime(s.at)} ${s.title}`).join('\n') + '\n');
writeFileSync(
  path.join(OUT, `${name}.es.srt`),
  cues.sort((x, y) => x.a - y.a).map((q, i) => `${i + 1}\n${srtTime(q.a)} --> ${srtTime(q.b)}\n${q.who === 'narrador' ? '' : `${NAMES[q.who] ?? q.who}: `}${q.text}\n`).join('\n'),
);
rmSync(tmp, { recursive: true, force: true });
console.log(`✓ ${out} (${ytTime(t)})`);
console.log(stamps.map((s) => `${ytTime(s.at)} ${s.title}`).join('\n'));
