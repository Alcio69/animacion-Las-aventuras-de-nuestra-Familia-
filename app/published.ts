import fs from 'node:fs';
import path from 'node:path';
import { EPISODES } from '../src/episodes';

/** Chapters whose 3D video is already rendered (scripts can be committed before their render finishes). */
export const PUBLISHED = EPISODES.filter((e) => fs.existsSync(path.join(process.cwd(), 'public', 'episodes', `${e.id}-3d.mp4`)));
