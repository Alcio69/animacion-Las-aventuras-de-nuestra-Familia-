import type { Episode } from '../../engine/script';

/**
 * Capítulo 21 — La carta a Papá Noel (valor: el valor de dar; el espíritu de la Navidad).
 * Living room with Christmas decorations (`variant: 'christmas'`: tree, lights, snow in the window).
 * Santa hats via `costume: 'santa'`. Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const TABLE = { x: 940, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep21-la-carta-a-papa-noel',
  number: 21,
  title: 'La carta a Papá Noel',
  subtitle: 'Hijo e Hija escriben una lista de regalos larguísima… pero descubren algo mejor',
  music: 'happy',
  thumb: {
    bg: 'living',
    variant: 'christmas',
    text: '¡QUERIDO PAPÁ NOEL!',
    prop: 'gift',
    exprs: { papa: 'laugh', mama: 'love', hijo: 'excited', hija: 'excited' },
    costumes: { papa: 'santa', mama: 'santa', hijo: 'santa', hija: 'santa' },
  },
  scenes: [
    {
      bg: 'living',
      variant: 'christmas',
      cast: {
        hijo: { x: 660, mood: 'excited' },
        hija: { x: 1220, mood: 'excited', facing: -1 },
        papa: { x: 2250, mood: 'happy', facing: -1, costume: 'santa' },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'letter', id: 'carta', x: TABLE.x, y: ON_TABLE, with: true },
        { say: 'hijo', text: 'Querido Papá Noel: yo quiero una bicicleta, un robot, un tren, una pelota y un dinosaurio.', expr: 'excited', act: 'think' },
        { say: 'hija', text: '¡Y yo quiero cien muñecas, un castillo y un unicornio de verdad!', expr: 'laugh', act: 'cheer' },
        { do: 'walk', who: 'papa', to: 1460 },
        { say: 'papa', text: '¡Esa lista es más larga que nuestro árbol de Navidad!', expr: 'laugh', act: 'point' },
        { sfx: 'giggle', with: true },
        { mood: 'laugh', who: ['hijo', 'hija'] },
      ],
    },
    {
      bg: 'living',
      variant: 'christmas',
      cast: {
        hijo: { x: 520, mood: 'happy' },
        hija: { x: 780, mood: 'happy' },
        mama: { x: 1260, mood: 'love', facing: -1 },
      },
      steps: [
        { prop: 'toybox', id: 'caja', x: 1020, y: 900 },
        { say: 'mama', text: 'Este año, ¿qué les parece si además de pedir, también regalamos algo?', expr: 'love' },
        { say: 'mama', text: 'Hay muchos niños que esta Navidad no van a recibir ningún regalo.', expr: 'sad' },
        { mood: 'sad', who: ['hijo', 'hija'] },
        { do: 'think', who: ['hijo', 'hija'], dur: 1.8 },
        { say: 'hijo', text: 'Yo tengo muchos autitos que ya casi no uso. ¡Los voy a regalar!', expr: 'happy', act: 'point' },
        { prop: 'car', id: 'auto', x: 980, y: 760 },
        { sfx: 'pop', with: true },
        { say: 'hija', text: 'Y yo puedo regalar mi osito. Bueno... uno de mis ositos.', expr: 'happy', act: 'hug' },
        { prop: 'teddy', id: 'osito', x: 1060, y: 760 },
        { sfx: 'pop', with: true },
        { say: 'mama', text: '¡Qué generosos son! Esos juguetes van a hacer muy felices a otros niños.', expr: 'proud', act: 'clap' },
        { fx: 'hearts', x: 1020, y: 520, with: true, delay: 0.3 },
      ],
    },
    {
      bg: 'living',
      variant: 'christmas',
      cast: {
        hijo: { x: 480, mood: 'happy' },
        hija: { x: 740, mood: 'happy' },
        papa: { x: 1180, mood: 'happy', facing: -1, costume: 'santa' },
        mama: { x: 1440, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'gift', id: 'regalo', x: 960, y: 900 },
        { sfx: 'sparkle', with: true },
        { fx: 'sparkle', x: 960, y: 640, with: true },
        { say: 'papa', text: '¡El regalo para los niños ya está listo! ¿Se ponen el gorro navideño?', expr: 'excited', act: 'cheer' },
        { costume: 'santa', who: ['hijo', 'hija', 'mama'] },
        { fx: 'stars', x: 900, y: 420, with: true },
        { sfx: 'poof', with: true },
        { mood: 'laugh', who: ['hijo', 'hija'] },
        { say: 'hija', text: '¡Qué lindo se siente regalar! Me siento feliz por dentro.', expr: 'love', act: 'hug' },
        { say: 'mama', text: 'Regalar con mucho amor: ese es el verdadero espíritu de la Navidad.', expr: 'love', act: 'nod' },
        { do: 'dance', who: ['hijo', 'hija', 'papa', 'mama'], dur: 3, expr: 'laugh' },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'En Navidad, el regalo más lindo es el que damos con amor. ¡Feliz Navidad!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'La Carta a Papá Noel 🎄 Cuento de Navidad para Niños | Las Aventuras de Nuestra Familia',
    description: `¡Llegó la Navidad! 🎄🎅 Hijo e Hija escriben su carta a Papá Noel con una lista de regalos larguísima… Pero Mamá les propone algo especial: regalar juguetes a niños que no van a recibir ninguno. 🎁💛 Un cuento de Navidad para niños sobre la generosidad y el verdadero espíritu navideño.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que dar hace tan feliz como recibir
• A compartir lo que tenemos
• El verdadero espíritu de la Navidad

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuento de Navidad, carta a Papá Noel, árbol de Navidad, valores navideños para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#navidad #navidadparaniños #cuentodenavidad #papanoel #cartaapapanoel #cuentosinfantiles #dibujosanimados #cuentosparaniños #animacion3d #español`,
    tags: [
      'navidad para niños',
      'cuento de navidad',
      'carta a papá noel',
      'papá noel',
      'cuentos navideños para niños',
      'espíritu navideño',
      'generosidad',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
