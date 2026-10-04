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
  subtitle: 'Hija no quiere ni probarlo… ¿podrá Papá hacerle cambiar de idea?',
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
    title: '¡No Me Gusta el Brócoli! 🥦 Las Aventuras de Nuestra Familia | Cuentos para Niños que No Quieren Comer',
    description: `¡Hija no quiere ni probar el brócoli! 🥦😖 "Tiene cara de feo", dice… Pero Papá tiene una idea genial: ¿y si en realidad son árboles mágicos que comen los dinosaurios? 🦖 Un cuento infantil para niños que no quieren comer verduras y para animarse a probar cosas nuevas.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que no hay que decir "no me gusta" sin probar
• A animarnos a probar comidas nuevas
• Que las verduras pueden ser divertidas (¡y muy ricas!)

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuentos cortos con valores, alimentación saludable para niños y videos educativos.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#nomegusta #brocoli #verdurasparaniños #cuentosinfantiles #dibujosanimados #cuentosparaniños #comersano #animacion3d #videosparaniños #español`,
    tags: [
      'no me gusta el brócoli',
      'niños que no quieren comer',
      'verduras para niños',
      'probar comidas nuevas',
      'alimentación saludable para niños',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'cuentos con valores',
      'videos para niños',
      'animación 3d infantil',
      'hora de comer',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
