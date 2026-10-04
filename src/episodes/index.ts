import type { Episode } from '../engine/script';
import ep01 from './ep01-la-torta-sorpresa/script';
import ep02 from './ep02-la-pelota-de-todos/script';
import ep03 from './ep03-un-dia-de-lluvia/script';
import ep04 from './ep04-no-me-gusta-el-brocoli/script';
import ep05 from './ep05-no-quiero-ir-al-dentista/script';
import ep06 from './ep06-mi-primera-pijamada/script';

/** Every chapter, in order. Add new ones here. */
export const EPISODES: Episode[] = [ep01, ep02, ep03, ep04, ep05, ep06];

export const getEpisode = (id: string) => EPISODES.find((e) => e.id === id);
