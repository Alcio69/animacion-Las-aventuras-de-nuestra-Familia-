// Update the subtitle name tags of already-rendered 3D chapters without re-rendering the 3D:
// renders only the subtitles (transparent ProRes 4444) and composites them over public/episodes/<id>-3d.mp4.
// Only valid when no spoken line changed since the video was rendered: the patch replaces the picture, not the voices.
// Chapters whose lines changed (e.g. ep05, ep12, ep20 after the name change) need a full render. The video length is checked too.
// Usage: node scripts/patch-subs.mjs ep02-xxx ep03-yyy ...
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ids = process.argv.slice(2);
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
mkdirSync('out/patch', { recursive: true });

for (const id of ids) {
  const video = `public/episodes/${id}-3d.mp4`;
  const composition = await selectComposition({ serveUrl, id: `${id}-subs`, browserExecutable });
  const frames = Number(
    execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v', '-count_packets', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', video]).toString().trim(),
  );
  if (Math.abs(frames - composition.durationInFrames) > 1) {
    console.log(`SKIP ${id}: timing changed (video ${frames} frames, script ${composition.durationInFrames}) → needs a full render`);
    continue;
  }
  const layer = `out/patch/${id}-subs.mov`;
  await renderMedia({
    serveUrl, composition, browserExecutable, outputLocation: layer,
    codec: 'prores', proResProfile: '4444', imageFormat: 'png', pixelFormat: 'yuva444p10le', muted: true,
    concurrency: Math.max(1, os.cpus().length - 1),
  });
  const tmp = `out/patch/${id}-3d.mp4`;
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', video, '-i', layer,
    '-filter_complex', '[0:v][1:v]overlay=0:0:format=auto[v]', '-map', '[v]', '-map', '0:a',
    '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', tmp]);
  renameSync(tmp, video);
  rmSync(layer, { force: true });
  console.log(`PATCHED ${id}`);
}
