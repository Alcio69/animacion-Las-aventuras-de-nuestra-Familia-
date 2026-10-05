// Render chapters to MP4 + YouTube thumbnail, in both styles.
// Usage: npm run render                        → every chapter, 2D and 3D
//        npm run render -- ep02-xxx            → one chapter, both styles
//        npm run render -- ep02-xxx 3d         → one chapter, only 3D ("2d" for only 2D)
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const only = process.argv[2];
const styles = process.argv[3] ? [process.argv[3]] : ['2d', '3d'];
const OUT = 'public/episodes';
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
  let last = -1;
  await renderMedia({
    serveUrl,
    composition,
    codec: 'h264',
    crf: 23,
    audioBitrate: '160k',
    outputLocation,
    browserExecutable,
    chromiumOptions,
    concurrency: Math.max(1, os.cpus().length - 1),
    // 3D frames can take >30 s under load (shader compile at scene changes)
    timeoutInMilliseconds: 180000,
    onProgress: ({ progress }) => {
      const p = Math.floor(progress * 10);
      if (p !== last) process.stdout.write(`\r${id}: ${p * 10}%`), (last = p);
    },
  });
  const thumb = await selectComposition({ serveUrl, id: `${id}-thumb`, browserExecutable, chromiumOptions });
  await renderStill({ serveUrl, composition: thumb, output: path.join(OUT, `${id}.jpg`), imageFormat: 'jpeg', jpegQuality: 92, browserExecutable, chromiumOptions });
  console.log(`\n✓ ${outputLocation} (${(statSync(outputLocation).size / 1e6).toFixed(1)} MB, ${(composition.durationInFrames / composition.fps).toFixed(1)}s) + thumbnail`);
}
