import type { Episode } from '../engine/script';
import ep01 from './ep01-la-torta-sorpresa/script';
import ep02 from './ep02-la-pelota-de-todos/script';
import ep03 from './ep03-un-dia-de-lluvia/script';
import ep04 from './ep04-no-me-gusta-el-brocoli/script';
import ep05 from './ep05-no-quiero-ir-al-dentista/script';
import ep06 from './ep06-mi-primera-pijamada/script';
import ep07 from './ep07-a-ordenar-mi-cuarto/script';
import ep08 from './ep08-el-primer-dia-de-escuela/script';
import ep09 from './ep09-fue-sin-querer/script';
import ep10 from './ep10-hermanos-al-rescate/script';
import ep11 from './ep11-no-quiero-dormir/script';
import ep12 from './ep12-mi-amigo-tomi/script';
import ep13 from './ep13-quiero-ganar-siempre/script';
import ep14 from './ep14-la-abuela-viene-de-visita/script';
import ep15 from './ep15-los-papas-de-benja/script';
import ep16 from './ep16-sin-rueditas/script';

/** Every chapter, in order. Add new ones here. */
export const EPISODES: Episode[] = [ep01, ep02, ep03, ep04, ep05, ep06, ep07, ep08, ep09, ep10, ep11, ep12, ep13, ep14, ep15, ep16];

export const getEpisode = (id: string) => EPISODES.find((e) => e.id === id);
