// Render one or more frames as PNG to check how a scene looks (fast, no audio).
// Usage: node scripts/still.mjs <compositionId> <frame[,frame...] | auto:N> [outDir]
//        auto:N = N frames evenly spread between the intro and the outro + a contact sheet (sheet.png)
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const [id = 'personajes', frames = '0', outDir = 'out/stills'] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const browserExecutable = (() => {
  try {
    const dir = readdirSync('/opt/pw-browsers').find((d) => d.startsWith('chromium_headless_shell'));
    return dir ? `/opt/pw-browsers/${dir}/chrome-linux/headless_shell` : null;
  } catch {
    return null;
  }
})();
const serveUrl = await bundle({ entryPoint: path.resolve('remotion/index.ts') });
const composition = await selectComposition({ serveUrl, id, browserExecutable, chromiumOptions: { gl: process.env.GL || 'angle' } });
console.log(`${id}: ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(1)}s)`);
const N = composition.durationInFrames;
const list = frames.startsWith('auto:')
  ? Array.from({ length: Number(frames.slice(5)) }, (_, i) => Math.round(110 + ((N - 260) * (i + 0.5)) / Number(frames.slice(5))))
  : frames.split(',').map(Number);
const outs = [];
for (const f of list) {
  const output = path.join(outDir, `${id}-${f}.png`);
  await renderStill({ serveUrl, composition, frame: Math.min(f, composition.durationInFrames - 1), output, browserExecutable, chromiumOptions: { gl: process.env.GL || 'angle' } });
  console.log('  ', output);
  outs.push(output);
}
if (frames.startsWith('auto:')) {
  const { execFileSync } = await import('node:child_process');
  const cols = 4;
  const rows = Math.ceil(outs.length / cols);
  const ins = outs.flatMap((o) => ['-i', o]);
  const layout = outs.map((_, i) => `${(i % cols) ? Array(i % cols).fill('w0').join('+') : '0'}_${Math.floor(i / cols) ? Array(Math.floor(i / cols)).fill('h0').join('+') : '0'}`).join('|');
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...ins, '-filter_complex', `xstack=inputs=${outs.length}:layout=${layout}:fill=black,scale=${cols * 400}:-1`, path.join(outDir, 'sheet.png')]);
  console.log('   sheet:', path.join(outDir, 'sheet.png'), `(${rows}x${cols})`);
}
