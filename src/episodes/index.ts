import type { Episode } from '../engine/script';
import ep01 from './ep01-la-torta-sorpresa/script';

/** Every chapter, in order. Add new ones here. */
export const EPISODES: Episode[] = [ep01];

export const getEpisode = (id: string) => EPISODES.find((e) => e.id === id);
