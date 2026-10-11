// Render vertical Shorts (1080x1920) to public/shorts/<id>.mp4 + a cover frame (.jpg).
// Usage: node scripts/render-short.mjs short-01-xxx [short-02-yyy ...]
// Resumable like render.mjs: 8 s chunks in out/chunks/<id>/ (delete that folder after changing the Short).
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ids = process.argv.slice(2);
if (!ids.length) throw new Error('Usage: node scripts/render-short.mjs <short-id> ...');
const OUT = 'public/shorts';
const CHUNK = 240;
mkdirSync(OUT, { recursive: true });
const browserExecutable = (() => {
  try {
    const dir = readdirSync('/opt/pw-browsers').find((d) => d.startsWith('chromium_headless_shell'));
    return dir ? `/opt/pw-browsers/${dir}/chrome-linux/headless_shell` : null;
  } catch {
    return null;
  }
})();
const serveUrl = await bundle({ entryPoint: path.resolve('remotion/index.ts') });
process.on('exit', () => rmSync(serveUrl, { recursive: true, force: true }));
const chromiumOptions = { gl: 'angle' };

for (const id of ids) {
  const composition = await selectComposition({ serveUrl, id, browserExecutable, chromiumOptions });
  const common = { serveUrl, browserExecutable, chromiumOptions, concurrency: Math.max(1, os.cpus().length - 1), timeoutInMilliseconds: 180000 };
  const dir = path.join('out/chunks', id);
  mkdirSync(dir, { recursive: true });
  const audio = path.join(dir, 'audio.aac');
  if (!existsSync(audio)) {
    // audio pass without the WebGL scene (much faster)
    const inputProps = { ...composition.props, video: false };
    const audioComp = await selectComposition({ serveUrl, id, browserExecutable, chromiumOptions, inputProps });
    await renderMedia({ ...common, composition: audioComp, inputProps, codec: 'aac', audioBitrate: '160k', outputLocation: `${audio}.tmp.aac` });
    renameSync(`${audio}.tmp.aac`, audio);
  }
  const N = composition.durationInFrames;
  const parts = [];
  for (let a = 0; a < N; a += CHUNK) {
    const b = Math.min(N, a + CHUNK) - 1;
    const file = path.join(dir, `${String(a).padStart(6, '0')}.mp4`);
    parts.push(file);
    if (existsSync(file)) continue;
    const tmp = `${file}.tmp.mp4`;
    await renderMedia({ ...common, composition, codec: 'h264', crf: 20, muted: true, frameRange: [a, b], outputLocation: tmp });
    renameSync(tmp, file);
    console.log(`${id}: ${Math.round(((b + 1) / N) * 100)}% (frames ${a}-${b})`);
  }
  const list = path.join(dir, 'list.txt');
  writeFileSync(list, parts.map((f) => `file '${path.resolve(f)}'`).join('\n'));
  const out = path.join(OUT, `${id}.mp4`);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-i', audio,
    '-map', '0:v', '-map', '1:a', '-c', 'copy', '-movflags', '+faststart', out]);
  // cover: a frame of the first line, with the hook on screen
  await renderStill({ ...common, composition, frame: 45, output: path.join(OUT, `${id}.jpg`), imageFormat: 'jpeg', jpegQuality: 92 });
  console.log(`\n✓ ${out} (${(statSync(out).size / 1e6).toFixed(1)} MB, ${(N / composition.fps).toFixed(1)}s)`);
  console.log(`DONE ${id}`);
}
