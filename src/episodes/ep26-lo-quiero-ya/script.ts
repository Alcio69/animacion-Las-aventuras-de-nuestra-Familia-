import type { Episode } from '../../engine/script';

/**
 * Capítulo 26 — ¡Lo quiero ya! (valor: la paciencia; las cosas lindas llevan su tiempo).
 * Lio plants a seed with Max: 'pot' → 'sprout' → 'flowerPot' on a small table (y=760 = on the table).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const TABLE = { x: 960, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep26-lo-quiero-ya',
  number: 26,
  title: '¡Lo quiero ya!',
  subtitle: 'Lio planta una semilla y quiere ver la flor enseguida… pero las plantas no tienen apuro',
  music: 'calm',
  thumb: { bg: 'living', text: '¡LO QUIERO YA!', prop: 'flowerPot', exprs: { papa: 'happy', mama: 'love', hijo: 'excited', hija: 'laugh' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 640, mood: 'excited' },
        papa: { x: 1280, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'pot', id: 'maceta', x: TABLE.x, y: ON_TABLE, with: true },
        { say: 'papa', text: 'Lio, esta es una semilla de girasol. ¿La plantamos juntos?', expr: 'happy', act: 'point' },
        { say: 'hijo', text: '¡Claro que sí! Listo, ya la planté. ¿Cuándo sale la flor?', expr: 'excited', act: 'cheer' },
        { fx: 'sparkle', x: TABLE.x, y: 600, with: true },
        { say: 'papa', text: 'Las plantas crecen despacito. Hay que regarla un poquito cada día y tener paciencia.', expr: 'love', act: 'nod' },
        { mood: 'worried', who: 'hijo' },
        { say: 'hijo', text: '¿Despacito? ¡Pero yo quiero ver la flor ahora mismo!', expr: 'worried', act: 'shake' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 640, mood: 'worried' },
        hija: { x: -250, mood: 'happy' },
        papa: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'pot', id: 'maceta', x: TABLE.x, y: ON_TABLE, with: true },
        { title: 'Al día siguiente...', dur: 1.6 },
        { say: 'hijo', text: '¡Todavía no creció nada! Le voy a echar muchísima agua para que crezca más rápido.', expr: 'angry', act: 'hips' },
        { prop: 'wateringCan', id: 'regadera', x: 830, y: ON_TABLE },
        { sfx: 'whoosh', with: true },
        { do: 'walk', who: 'hija', to: 420 },
        { say: 'hija', text: '¡Hermano, cuidado! ¡La vas a ahogar con tanta agua!', expr: 'surprised', act: 'point' },
        { removeProp: 'regadera' },
        { say: 'papa', text: 'Demasiada agua no la ayuda. Cada cosa tiene su tiempo, hijo.', expr: 'love', act: 'nod' },
        { mood: 'sad', who: 'hijo' },
        { say: 'hijo', text: 'Tener que esperar es muy difícil.', expr: 'sad', act: 'shrug' },
        { say: 'papa', text: 'Lo sé. Mientras esperamos, ¿jugamos a la pelota? Así el tiempo pasa más rápido.', expr: 'wink', act: 'point' },
        { mood: 'happy', who: ['hijo', 'hija'] },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 460, mood: 'happy' },
        hijo: { x: 700, mood: 'happy' },
        papa: { x: 1260, mood: 'happy', facing: -1 },
        mama: { x: 1500, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'sprout', id: 'brote', x: TABLE.x, y: ON_TABLE, with: true },
        { title: 'Unos días después...', dur: 1.6 },
        { mood: 'excited', who: 'hijo' },
        { say: 'hijo', text: '¡Papá, mira! ¡Salió una plantita verde!', expr: 'excited', act: 'point' },
        { fx: 'sparkle', x: TABLE.x, y: 600, with: true },
        { title: 'Dos semanas después...', dur: 1.6 },
        { removeProp: 'brote' },
        { prop: 'flowerPot', id: 'flor', x: TABLE.x, y: ON_TABLE, with: true },
        { fx: 'stars', x: TABLE.x, y: 560, with: true },
        { sfx: 'tada', with: true },
        { say: 'hija', text: '¡Una flor! ¡Es la flor más linda del mundo!', expr: 'laugh', act: 'clap' },
        { say: 'hijo', text: 'Tuve que esperar mucho... ¡pero valió la pena!', expr: 'proud', act: 'cheer' },
        { say: 'mama', text: 'Estoy muy orgullosa de ti, hijo. La regaste con paciencia todos los días.', expr: 'love', act: 'hug' },
        { do: 'dance', who: ['hija', 'hijo', 'papa', 'mama'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Las cosas más lindas necesitan tiempo. ¡La paciencia también florece!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Lo Quiero Ya! 🌱 La Paciencia | Dibujos Animados para Niños en Español',
    description: `Lio planta una semilla de girasol con Max… ¡y quiere ver la flor enseguida! 🌱 Como no crece, la riega muchísimo y Tini tiene que avisarle: "¡La vas a ahogar!" 😅 Día a día, con un poquito de agua y mucha paciencia, llega la sorpresa. 🌻 Un cuento infantil corto para aprender a esperar.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que las cosas lindas necesitan tiempo
• A esperar haciendo otras cosas divertidas
• Que cuidar una planta un poquito cada día da frutos

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué es lo que más te cuesta esperar? ¡Planten juntos una semilla y miren cómo crece!"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#paciencia #dibujosanimados #cuentosinfantiles`,
    tags: [
      'paciencia para niños',
      'cuento sobre la paciencia',
      'aprender a esperar',
      'cómo crece una planta',
      'plantar una semilla',
      'impaciencia en niños',
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
