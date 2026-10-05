import type { Episode } from '../../engine/script';

/**
 * Capítulo 14 — La abuela viene de visita (valor: paciencia y cariño con los mayores).
 * Guest: `abuela` (Papá's mom). Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const COUNTER = 562;
const HAND = 760;

const episode: Episode = {
  id: 'ep14-la-abuela-viene-de-visita',
  number: 14,
  title: 'La abuela viene de visita',
  subtitle: 'La abuela camina despacito y repite sus historias… ¿se van a aburrir?',
  music: 'calm',
  thumb: { bg: 'kitchen', text: '¡LLEGÓ LA ABUELA!', prop: 'cookie', exprs: { hijo: 'excited', hija: 'love', papa: 'laugh', mama: 'happy' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'happy' },
        hija: { x: 820, mood: 'happy' },
        mama: { x: 1120, mood: 'excited', facing: -1 },
        abuela: { x: 2250, mood: 'love', facing: -1 },
      },
      steps: [
        { sfx: 'doorbell' },
        { say: 'mama', text: '¡Chicos, vengan rápido! ¡La abuela vino a visitarnos!', expr: 'excited', act: 'cheer' },
        { do: 'walk', who: 'abuela', to: 1420, dur: 3.4 },
        { say: 'abuela', text: '¡Mis nietos queridos! ¿Les conté cuando su papá era chiquito y se cayó en el barro?', expr: 'love', act: 'wave' },
        { mood: 'sleepy', who: 'hija' },
        { say: 'hija', text: 'Ya nos contó esa historia tres veces.', expr: 'sleepy' },
        { say: 'hijo', text: 'Y camina tan despacito...', expr: 'worried' },
        { mood: 'worried', who: 'mama' },
        { say: 'mama', text: 'La abuela tiene mucho para enseñarles. Solo hay que tener un poquito de paciencia.', expr: 'love', act: 'point' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 560, mood: 'happy' },
        hija: { x: 820, mood: 'happy' },
        abuela: { x: 1180, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'bowl', id: 'bowl', x: 1000, y: COUNTER },
        { say: 'abuela', text: '¿Quieren aprender mi receta secreta de galletitas?', expr: 'wink', act: 'point' },
        { mood: 'excited', who: ['hijo', 'hija'] },
        { say: 'hija', text: '¡Sí, abuela! ¡Queremos aprender!', expr: 'excited', act: 'jump' },
        { fx: 'flour', x: 1000, y: 500, dur: 1.6 },
        { sfx: 'poof', with: true },
        { sfx: 'giggle', with: true, delay: 0.5 },
        { mood: 'laugh', who: ['hijo', 'hija', 'abuela'], with: true },
        { title: 'Un ratito después...', dur: 1.6 },
        { removeProp: 'bowl' },
        { prop: 'cookie', id: 'g1', x: 900, y: COUNTER },
        { prop: 'cookie', id: 'g2', x: 1000, y: COUNTER, with: true, delay: 0.15 },
        { prop: 'cookie', id: 'g3', x: 1100, y: COUNTER, with: true, delay: 0.3 },
        { fx: 'sparkle', x: 1000, y: 480, with: true },
        { sfx: 'ding', with: true },
        { say: 'hijo', text: '¡Están deliciosas, abuela! ¡Las mejores del mundo!', expr: 'love', act: 'cheer' },
        { say: 'abuela', text: 'El secreto es hacerlas con mucho amor, y con la ayuda de mis nietos.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 1180, y: 460, with: true, delay: 0.4 },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 480, mood: 'happy' },
        hija: { x: 720, mood: 'happy' },
        abuela: { x: 1160, mood: 'happy', facing: -1 },
        papa: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 940, y: 900 },
        { prop: 'book', id: 'album', x: 940, y: HAND, with: true },
        { say: 'abuela', text: 'Y miren esta foto. ¡Es su papá cuando era un bebé!', expr: 'laugh', act: 'point' },
        { mood: 'laugh', who: ['hijo', 'hija'] },
        { sfx: 'giggle', with: true },
        { do: 'run', who: 'papa', to: 1430 },
        { say: 'papa', text: '¡Mamá! ¡Esa foto no, por favor!', expr: 'surprised', act: 'shake' },
        { mood: 'laugh', who: 'abuela' },
        { say: 'hija', text: 'Abuela, ¿nos cuentas otra historia de cuando papá era chiquito?', expr: 'love' },
        { say: 'abuela', text: '¡Claro que sí, mis amores! Las veces que quieran.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 940, y: 470, with: true, delay: 0.4 },
        { do: 'dance', who: ['hijo', 'hija', 'papa'], dur: 2.6, expr: 'laugh' },
        { say: 'narrador', text: 'Los abuelos guardan los tesoros más lindos: sus historias y su amor.', with: true, delay: 0.6 },
      ],
    },
  ],
  youtube: {
    title: 'La Abuela Viene de Visita 👵 Paciencia y Amor | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `¡Llegó la abuela! 👵💜 Camina despacito y cuenta las mismas historias… y al principio Hijo e Hija se aburren un poco. Pero la abuela tiene una receta secreta de galletitas 🍪 y fotos de Papá cuando era bebé. 📸😂 Un cuento infantil sobre el amor a los abuelos y la paciencia.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• A tener paciencia con nuestros mayores
• Que los abuelos tienen mucho para enseñarnos
• A valorar las historias de la familia

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuentos sobre abuelos, familia, respeto y valores para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#abuela #abuelos #familia #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #videosparaniños #español`,
    tags: [
      'abuela',
      'abuelos y nietos',
      'cuento de la abuela',
      'paciencia para niños',
      'respeto a los mayores',
      'familia',
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
