import type { Episode } from '../engine/script';
import ep01 from './ep01-la-torta-sorpresa/script';
import ep02 from './ep02-la-pelota-de-todos/script';
import ep03 from './ep03-un-dia-de-lluvia/script';

/** Every chapter, in order. Add new ones here. */
export const EPISODES: Episode[] = [ep01, ep02, ep03];

export const getEpisode = (id: string) => EPISODES.find((e) => e.id === id);
