// Prints every spoken line of every episode as JSON (used by scripts/voices.py).
import { readdirSync, existsSync } from 'node:fs';
import { voiceKey } from '../src/engine/hash.ts';

const dir = new URL('../src/episodes/', import.meta.url);
const out = [];
for (const name of readdirSync(dir).sort()) {
  const file = new URL(`${name}/script.ts`, dir);
  if (!existsSync(file)) continue;
  const ep = (await import(file.href)).default;
  for (const scene of ep.scenes)
    for (const step of scene.steps)
      if ('say' in step) out.push({ episode: ep.id, speaker: step.say, text: step.text, key: voiceKey(step.say, step.text) });
}
process.stdout.write(JSON.stringify(out));
