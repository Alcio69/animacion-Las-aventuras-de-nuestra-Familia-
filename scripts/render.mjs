// Render chapters to MP4 + YouTube thumbnail, in both styles.
// Usage: npm run render                        → every chapter, 2D and 3D
//        npm run render -- ep02-xxx            → one chapter, both styles
//        npm run render -- ep02-xxx 3d         → one chapter, only 3D ("2d" for only 2D)
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, renameSync, statSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const only = process.argv[2];
const styles = process.argv[3] ? [process.argv[3]] : ['2d', '3d'];
const OUT = 'public/episodes';
const CHUNK = 240; // frames per resumable chunk (8 s)
mkdirSync(OUT, { recursive: true });
const browserExecutable = (() => {
  try {
    const dir = readdirSync('/opt/pw-browsers').find((d) => d.startsWith('chromium_headless_shell'));
    return dir ? `/opt/pw-browsers/${dir}/chrome-linux/headless_shell` : null;
  } catch {
    return null;
  }
})();

const ids = readdirSync('src/episodes').filter((d) => d.startsWith('ep') && (!only || d === only));
if (!ids.length) throw new Error(`No chapter found: ${only}`);
const serveUrl = await bundle({ entryPoint: path.resolve('remotion/index.ts') });

const chromiumOptions = { gl: 'angle' };
for (const base of ids)
for (const style of styles) {
  const id = style === '3d' ? `${base}-3d` : base;
  const composition = await selectComposition({ serveUrl, id, browserExecutable, chromiumOptions });
  const outputLocation = path.join(OUT, `${id}.mp4`);
  // Resumable: render in chunks (video only) kept in out/chunks/<id>/; chunks already on disk are skipped,
  // so a killed render (container restart) continues where it stopped. Then audio + concat with ffmpeg.
  const dir = path.join('out/chunks', id);
  mkdirSync(dir, { recursive: true });
  const common = {
    serveUrl, composition, browserExecutable, chromiumOptions,
    concurrency: Math.max(1, os.cpus().length - 1),
    // 3D frames can take >30 s under load (shader compile at scene changes)
    timeoutInMilliseconds: 180000,
  };
  const audio = path.join(dir, 'audio.aac');
  if (!existsSync(audio)) {
    // Same soundtrack in both styles: take it from the 2D composition (renders much faster than WebGL).
    const audioComp = await selectComposition({ serveUrl, id: base, browserExecutable, chromiumOptions });
    await renderMedia({ ...common, composition: audioComp, codec: 'aac', audioBitrate: '160k', outputLocation: `${audio}.tmp.aac` });
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
    await renderMedia({ ...common, codec: 'h264', crf: 23, muted: true, frameRange: [a, b], outputLocation: tmp });
    renameSync(tmp, file);
    console.log(`${id}: ${Math.round(((b + 1) / N) * 100)}% (frames ${a}-${b})`);
  }
  const list = path.join(dir, 'list.txt');
  writeFileSync(list, parts.map((f) => `file '${path.resolve(f)}'`).join('\n'));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-i', audio,
    '-map', '0:v', '-map', '1:a', '-c', 'copy', '-movflags', '+faststart', outputLocation]);
  const thumb = await selectComposition({ serveUrl, id: `${id}-thumb`, browserExecutable, chromiumOptions });
  await renderStill({ serveUrl, composition: thumb, output: path.join(OUT, `${id}.jpg`), imageFormat: 'jpeg', jpegQuality: 92, browserExecutable, chromiumOptions });
  console.log(`\n✓ ${outputLocation} (${(statSync(outputLocation).size / 1e6).toFixed(1)} MB, ${(composition.durationInFrames / composition.fps).toFixed(1)}s) + thumbnail`);
}
