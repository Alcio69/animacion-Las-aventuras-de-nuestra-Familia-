// Render one or more frames as PNG to check how a scene looks (fast, no audio).
// Usage: node scripts/still.mjs <compositionId> <frame[,frame...]> [outDir]
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
for (const f of frames.split(',').map(Number)) {
  const output = path.join(outDir, `${id}-${f}.png`);
  await renderStill({ serveUrl, composition, frame: Math.min(f, composition.durationInFrames - 1), output, browserExecutable, chromiumOptions: { gl: process.env.GL || 'angle' } });
  console.log('  ', output);
}
