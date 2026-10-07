// Writes YouTube subtitle files (.srt, Spanish) from the episode timeline: public/episodes/<id>.es.srt
// The timing is the same one the video uses (intro + scenes), so the captions line up exactly.
// Usage: node scripts/srt.mjs [epNN-slug ...]   (no args = every episode)
import { build } from 'esbuild';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const tmp = mkdtempSync(path.join(os.tmpdir(), 'srt-'));
const out = path.join(tmp, 'eps.mjs');
await build({
  stdin: {
    contents: "export { EPISODES } from './src/episodes/index.ts'; export { compileEpisode } from './src/engine/timeline.ts';",
    resolveDir: process.cwd(),
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: out,
  logLevel: 'error',
});
const { EPISODES, compileEpisode } = await import(out);
rmSync(tmp, { recursive: true, force: true });

const NAMES = { papa: 'Max', mama: 'Luna', hijo: 'Lio', hija: 'Tini', narrador: 'Narrador' };
const ts = (s) => {
  const ms = Math.round(s * 1000);
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const only = process.argv.slice(2);
for (const ep of EPISODES) {
  if (only.length && !only.includes(ep.id)) continue;
  const c = compileEpisode(ep);
  const cues = [];
  for (const s of c.scenes)
    for (const e of s.events) if (e.kind === 'line') cues.push({ a: s.start + e.t0, b: s.start + e.t1, who: e.who, text: e.text });
  const body = cues
    .sort((x, y) => x.a - y.a)
    .map((q, i) => `${i + 1}\n${ts(q.a)} --> ${ts(q.b)}\n${q.who === 'narrador' ? '' : `${NAMES[q.who] ?? q.who[0].toUpperCase() + q.who.slice(1)}: `}${q.text}\n`)
    .join('\n');
  writeFileSync(`public/episodes/${ep.id}.es.srt`, body);
  console.log(`✓ public/episodes/${ep.id}.es.srt (${cues.length} líneas)`);
}
