import type { Episode } from '../../engine/script';

/**
 * Capítulo 4 — ¡No me gusta el brócoli! (valor: animarse a probar cosas nuevas).
 * Floor is y=930. Screen x goes 0 (left) → 1920 (right). Off-screen: -250 / 2250.
 * Dining table in the middle of the kitchen (x=960); food on the table uses y=760.
 */
const TABLE = { x: 960, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep04-no-me-gusta-el-brocoli',
  number: 4,
  title: '¡No me gusta el brócoli!',
  subtitle: 'Tini no quiere ni probarlo… ¿podrá Max hacerle cambiar de idea?',
  music: 'happy',
  thumb: { bg: 'kitchen', text: '¡NO ME GUSTA!', prop: 'plate', exprs: { hija: 'angry', hijo: 'laugh', papa: 'excited', mama: 'worried' } },
  scenes: [
    {
      bg: 'kitchen',
      cast: {
        papa: { x: 430, mood: 'happy' },
        hija: { x: 680, mood: 'happy' },
        hijo: { x: 1250, mood: 'happy', facing: -1 },
        mama: { x: 1500, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'plate', id: 'plato', x: 960, y: ON_TABLE, with: true, delay: 0.3 },
        { sfx: 'pop', with: true, delay: 0.3 },
        { say: 'mama', text: '¡A comer! Hoy preparé brócoli.', expr: 'happy', act: 'wave' },
        { say: 'hija', text: '¡No! ¡El brócoli no me gusta!', expr: 'angry', act: 'shake' },
        { mood: 'surprised', who: ['papa', 'mama'], with: true },
        { say: 'hijo', text: '¡Parecen arbolitos verdes!', expr: 'laugh', act: 'point' },
        { sfx: 'giggle', with: true, delay: 1 },
        { say: 'mama', text: '¿Alguna vez lo probaste?', expr: 'worried' },
        { say: 'hija', text: 'No. Pero tiene cara de feo.', expr: 'angry', act: 'hips', pause: 0.6 },
        { mood: 'neutral', who: ['papa', 'mama'] },
      ],
    },
    {
      bg: 'kitchen',
      zoom: [1.04, 1.1],
      cast: {
        papa: { x: 430, mood: 'neutral' },
        hija: { x: 680, mood: 'angry' },
        hijo: { x: 1250, mood: 'happy', facing: -1 },
        mama: { x: 1500, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'plate', id: 'plato', x: 960, y: ON_TABLE, with: true },
        { do: 'think', who: 'papa', dur: 1.6 },
        { fx: 'exclaim', x: 430, y: 330, dur: 1.2 },
        { sfx: 'ding', with: true },
        { say: 'papa', text: '¡Un momento! Estos no son brócolis comunes.', expr: 'excited', act: 'point' },
        { say: 'papa', text: '¡Son árboles mágicos! Los dinosaurios gigantes los comían para ser fuertes.', expr: 'excited', act: 'cheer' },
        { fx: 'sparkle', x: 960, y: 690, dur: 1.8, with: true },
        { sfx: 'sparkle', with: true },
        { mood: 'surprised', who: 'hija', with: true },
        { say: 'hijo', text: '¡Yo soy un dinosaurio gigante!', expr: 'excited', act: 'jump' },
        { prop: 'broccoli', id: 'b1', x: 1030, y: ON_TABLE },
        { moveProp: 'b1', x: 1230, y: ON_TABLE, dur: 1, arc: 170 },
        { removeProp: 'b1' },
        { sfx: 'pop', with: true },
        { say: 'hijo', text: '¡Qué rico está!', expr: 'love', act: 'clap' },
        { fx: 'hearts', x: 1250, y: 420, with: true },
        { mood: 'worried', who: 'hija' },
        { do: 'think', who: 'hija', dur: 1.8 },
        { fx: 'question', x: 680, y: 470, dur: 1.6, with: true },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        papa: { x: 430, mood: 'happy' },
        hija: { x: 680, mood: 'worried' },
        hijo: { x: 1250, mood: 'happy', facing: -1 },
        mama: { x: 1500, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'plate', id: 'plato', x: 960, y: ON_TABLE, with: true },
        { say: 'hija', text: 'Bueno, voy a probar un pedacito chiquito.', expr: 'worried' },
        { prop: 'broccoli', id: 'b2', x: 890, y: ON_TABLE },
        { moveProp: 'b2', x: 700, y: ON_TABLE, dur: 1.1, arc: 150 },
        { removeProp: 'b2' },
        { sfx: 'pop', with: true },
        { mood: 'sleepy', who: 'hija' },
        { wait: 0.9 },
        { mood: 'surprised', who: 'hija' },
        { fx: 'exclaim', x: 680, y: 470, dur: 1, with: true },
        { wait: 0.6 },
        { say: 'hija', text: '¡Está riquísimo! ¡Quiero más!', expr: 'love', act: 'jump' },
        { fx: 'hearts', x: 680, y: 480, with: true, delay: 0.3 },
        { sfx: 'tada', with: true },
        { mood: 'laugh', who: ['papa', 'hijo', 'mama'], with: true },
        { say: 'papa', text: '¡Tenemos una nueva dinosaurio en la familia!', expr: 'laugh', act: 'clap' },
        { say: 'mama', text: 'A veces, las cosas nuevas nos sorprenden.', expr: 'love', act: 'hug' },
        { do: 'dance', who: ['papa', 'mama', 'hijo', 'hija'], dur: 3.2, expr: 'laugh' },
        { fx: 'stars', x: 960, y: 380, dur: 2.2, with: true },
        { say: 'narrador', text: 'Probar cosas nuevas puede ser una deliciosa aventura.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡No Me Gusta el Brócoli! 🥦 Comer Verduras | Dibujos Animados para Niños en Español',
    description: `¡Tini no quiere ni probar el brócoli! 🥦😖 "Tiene cara de feo", dice… Pero Max tiene una idea genial: ¿y si en realidad son árboles mágicos que comen los dinosaurios? 🦖 Un cuento infantil corto para niños que no quieren comer verduras.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que no hay que decir "no me gusta" sin probar
• A animarnos a probar comidas nuevas
• Que las verduras pueden ser divertidas (¡y muy ricas!)

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué comida nueva te animarías a probar esta semana? ¡Pueden inventarle un nombre divertido juntos!"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#dibujosanimados #cuentosinfantiles #comersano`,
    tags: [
      'dibujos animados para niños',
      'dibujos animados en español',
      'cuentos infantiles',
      'cuentos para niños',
      'no me gusta el brócoli',
      'comer verduras',
      'niños que no comen verduras',
      'alimentación saludable para niños',
      'probar comidas nuevas',
      'videos para niños',
      'cuentos con valores',
      'animación 3d infantil',
      'caricaturas en español',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
