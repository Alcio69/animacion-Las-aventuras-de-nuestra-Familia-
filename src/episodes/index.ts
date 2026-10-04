import type { Episode } from '../engine/script';
import ep01 from './ep01-la-torta-sorpresa/script';
import ep02 from './ep02-la-pelota-de-todos/script';
import ep03 from './ep03-un-dia-de-lluvia/script';
import ep04 from './ep04-no-me-gusta-el-brocoli/script';

/** Every chapter, in order. Add new ones here. */
export const EPISODES: Episode[] = [ep01, ep02, ep03, ep04];

export const getEpisode = (id: string) => EPISODES.find((e) => e.id === id);
