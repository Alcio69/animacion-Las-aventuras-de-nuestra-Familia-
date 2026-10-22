import type { Episode } from '../../engine/script';

/**
 * Capítulo 45 — ¡Me equivoqué! (valor: los errores son parte de aprender; frustración y perfeccionismo).
 * Lio's school drawing gets a crooked line; Max turns it into a rainbow; the teacher praises the idea.
 * Drawing "on the table / in the hand" y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep45-me-equivoque',
  number: 45,
  title: '¡Me equivoqué!',
  subtitle: 'A Lio le sale una línea torcida en su dibujo… ¡y lo quiere romper!',
  music: 'happy',
  thumb: { bg: 'living', text: '¡ME SALIÓ MAL!', prop: 'drawing', hero: ['hijo'], exprs: { hijo: 'angry' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 700, mood: 'excited' },
        hija: { x: 1120, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 920, y: 900 },
        { prop: 'drawing', id: 'dibujo', x: 900, y: HAND, with: true },
        { say: 'hijo', text: '¡Mi dibujo para la escuela está quedando increíble!', expr: 'excited', act: 'point' },
        { sfx: 'whoosh', with: true, delay: 2.2 },
        { mood: 'surprised', who: 'hijo', with: true, delay: 2.4 },
        { fx: 'exclaim', x: 700, y: 470, with: true, delay: 2.4 },
        { mood: 'angry', who: 'hijo' },
        { say: 'hijo', text: '¡No puede ser! ¡Me salió una línea torcida! ¡Está todo arruinado!', expr: 'angry', act: 'tremble' },
        { mood: 'worried', who: 'hija' },
        { say: 'hijo', text: '¡Lo voy a romper, y no dibujo nunca más!', expr: 'angry', act: 'hips' },
        { sfx: 'drum', with: true, delay: 0.4 },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 640, mood: 'angry' },
        hija: { x: 440, mood: 'worried' },
        papa: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 920, y: 900 },
        { prop: 'drawing', id: 'dibujo', x: 900, y: HAND, with: true },
        { say: 'papa', text: '¡Espera, campeón! Antes de romperlo, déjame ver ese dibujo.', expr: 'happy', act: 'wave' },
        { do: 'think', who: 'papa', dur: 1.4 },
        { say: 'papa', text: '¿Sabes qué veo? Esta línea torcida puede ser el comienzo de un arcoíris.', expr: 'excited', act: 'point' },
        { fx: 'sparkle', x: 900, y: 620, with: true },
        { sfx: 'sparkle', with: true },
        { mood: 'surprised', who: 'hijo' },
        { say: 'hijo', text: '¿Un arcoíris? ¡No se me había ocurrido!', expr: 'surprised', act: 'think' },
        { say: 'papa', text: 'Los errores no arruinan las cosas. A veces nos ayudan a inventar algo nuevo.', expr: 'love', act: 'nod' },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Yo te ayudo a pintar los colores, hermano!', expr: 'excited', act: 'jump' },
        { mood: 'happy', who: 'hijo' },
      ],
    },
    {
      bg: 'school',
      cast: {
        benja: { x: 560, mood: 'happy' },
        hijo: { x: 840, mood: 'proud' },
        maestra: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'drawing', id: 'dibujo', x: 960, y: HAND },
        { title: 'Al día siguiente...', dur: 1.6 },
        { say: 'maestra', text: '¡Qué dibujo tan original, Lio! ¿Cómo se te ocurrió el arcoíris?', expr: 'surprised', act: 'point' },
        { say: 'hijo', text: 'Me salió una línea torcida, y la convertí en un arcoíris.', expr: 'proud', act: 'nod' },
        { say: 'maestra', text: '¡Eso es aprender! Los errores nos enseñan muchísimo.', expr: 'proud', act: 'clap' },
        { fx: 'stars', x: 960, y: 520, with: true },
        { say: 'benja', text: '¡Qué buena idea! Yo también quiero probar a hacer un arcoíris.', expr: 'excited', act: 'jump' },
        { do: 'dance', who: ['benja', 'hijo', 'maestra'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Equivocarse es parte de aprender. ¡Cada error puede ser el comienzo de algo nuevo!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Me Equivoqué! ✏️ Los Errores Son Parte de Aprender | Dibujos Animados para Niños en Español',
    description: `Lio está haciendo un dibujo increíble para la escuela… ¡hasta que le sale una línea torcida! ✏️😤 "¡Está todo arruinado! ¡Lo voy a romper!" Pero Max mira el dibujo y ve algo distinto: esa línea torcida puede ser el comienzo de un arcoíris 🌈. ¿Qué dirá la maestra? Un cuento infantil corto sobre la frustración, los errores y la creatividad.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que equivocarse es parte de aprender
• Que un error no arruina todo
• Que a veces los errores nos ayudan a inventar algo nuevo

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué haces cuando algo te sale distinto de lo que querías?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#errores #dibujosanimados #cuentosinfantiles`,
    tags: [
      'me equivoqué',
      'aprender de los errores',
      'frustración en niños',
      'perfeccionismo infantil',
      'tolerancia a la frustración',
      'creatividad para niños',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
