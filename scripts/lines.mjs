// Prints every spoken line of every episode as JSON (used by scripts/voices.py).
import { readdirSync, existsSync, readFileSync } from 'node:fs';
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
// Shorts may add lines of their own (src/shorts/index.ts imports the episodes without extensions, so read it as text).
const shorts = readFileSync(new URL('../src/shorts/index.ts', import.meta.url), 'utf8');
for (const [, speaker, text] of shorts.matchAll(/say: '(\w+)', text: '([^']*)'/g)) {
  const key = voiceKey(speaker, text);
  if (!out.some((l) => l.key === key)) out.push({ episode: 'shorts', speaker, text, key });
}
process.stdout.write(JSON.stringify(out));
