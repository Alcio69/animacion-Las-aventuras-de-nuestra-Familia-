import type { Background } from './engine/script';

/**
 * Compilations (built with scripts/compilation.mjs from already-rendered chapters; only chapters already on YouTube).
 * `text` = big words on the thumbnail (use \n for two lines), `badge` = duration pill.
 */
export type Compilation = { id: string; episodes: string[]; text: string; badge: string; bg?: Background; variant?: string };

export const COMPILATIONS: Compilation[] = [
  {
    id: 'compilado-01-10',
    episodes: [
      'ep01-la-torta-sorpresa',
      'ep02-la-pelota-de-todos',
      'ep03-un-dia-de-lluvia',
      'ep04-no-me-gusta-el-brocoli',
      'ep05-no-quiero-ir-al-dentista',
      'ep06-mi-primera-pijamada',
      'ep07-a-ordenar-mi-cuarto',
      'ep08-el-primer-dia-de-escuela',
      'ep09-fue-sin-querer',
      'ep10-hermanos-al-rescate',
    ],
    text: '¡10 CAPÍTULOS\nSEGUIDOS!',
    badge: '+9 MIN',
  },
];
