import type { Episode } from '../../engine/script';

/**
 * Capítulo 34 — ¡A lavarse las manos! (valor: hábitos de higiene; los gérmenes no se ven).
 * Lio and Tini come back from the park and want to eat cookies without washing their hands. Hands are washed off screen.
 * Cookie plate on the kitchen counter (y=562). Keep characters between x≈400 and x≈1550.
 */
const COUNTER = 562;

const episode: Episode = {
  id: 'ep34-a-lavarse-las-manos',
  number: 34,
  title: '¡A lavarse las manos!',
  subtitle: 'Lio y Tini vuelven del parque y quieren comer sin lavarse las manos…',
  music: 'happy',
  thumb: { bg: 'kitchen', text: '¡MANOS LIMPIAS!', prop: 'cookiePlate', exprs: { hija: 'excited', hijo: 'laugh', mama: 'wink', papa: 'happy' } },
  scenes: [
    {
      bg: 'park',
      cast: {
        hija: { x: 620, mood: 'laugh' },
        hijo: { x: 900, mood: 'happy' },
        papa: { x: 1400, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 1120, y: 960 },
        { say: 'hija', text: '¡Me encanta jugar con la tierra del parque! ¡Hice una montaña gigante!', expr: 'laugh', act: 'jump' },
        { say: 'hijo', text: '¡Y yo encontré un caracol debajo de una piedra!', expr: 'excited', act: 'point' },
        { say: 'papa', text: '¡Chicos, a casa! Es hora de merendar.', expr: 'happy', act: 'wave' },
        { do: 'run', who: ['hija', 'hijo'], to: 2250 },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: -250, mood: 'excited' },
        hijo: { x: -250, mood: 'excited' },
        mama: { x: 1350, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'cookiePlate', id: 'galletas', x: 960, y: COUNTER, scale: 1.3 },
        { do: 'run', who: 'hija', to: 700 },
        { do: 'run', who: 'hijo', to: 440, with: true, delay: 0.3 },
        { say: 'hija', text: '¡Qué ricas galletitas! Quiero comer una ahora mismo.', expr: 'excited', act: 'point' },
        { say: 'mama', text: '¡Un momento! ¿Ya se lavaron las manos?', expr: 'surprised', act: 'hips' },
        { say: 'hija', text: 'No hace falta, mamá. ¡Mira, están limpias!', expr: 'happy', act: 'wave' },
        { say: 'mama', text: 'Parecen limpias, pero tienen bichitos chiquitos que no se ven: los gérmenes. Si comemos así, nos podemos enfermar.', expr: 'happy', act: 'point' },
        { fx: 'question', x: 700, y: 470, dur: 1.4, with: true },
        { mood: 'surprised', who: ['hija', 'hijo'] },
        { say: 'hijo', text: '¡Qué asco! ¡Yo no quiero comer gérmenes!', expr: 'surprised', act: 'shake' },
        { say: 'mama', text: 'Con agua y jabón se van todos. Hay que frotar bien las palmas, entre los dedos y las uñas.', expr: 'love', act: 'nod' },
        { do: 'run', who: ['hija', 'hijo'], to: -250 },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 440, mood: 'happy' },
        hija: { x: 700, mood: 'happy' },
        mama: { x: 1220, mood: 'happy', facing: -1 },
        papa: { x: 1480, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'cookiePlate', id: 'galletas', x: 960, y: COUNTER, scale: 1.3 },
        { title: 'Un ratito después...', dur: 1.6 },
        { fx: 'sparkle', x: 570, y: 600 },
        { sfx: 'sparkle', with: true },
        { say: 'hija', text: '¡Listo! ¡Frotamos con mucho jabón mientras contábamos hasta veinte!', expr: 'proud', act: 'cheer' },
        { say: 'hijo', text: '¡Y ahora tenemos las manos limpitas!', expr: 'laugh', act: 'cheer' },
        { say: 'mama', text: '¡Muy bien, chicos! Ahora sí, a merendar.', expr: 'proud', act: 'clap' },
        { say: 'papa', text: 'Y recuerden lavarlas siempre antes de comer, después de ir al baño y al volver de jugar.', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¡Lavarse las manos es súper fácil!', expr: 'laugh', act: 'jump' },
        { do: 'dance', who: ['hijo', 'hija', 'mama', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Agua, jabón y un poquito de tiempo: así cuidamos nuestra salud.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡A Lavarse las Manos! 🧼 Hábitos de Higiene | Dibujos Animados para Niños en Español',
    description: `Lio y Tini vuelven de jugar en el parque y corren directo a las galletitas… 🍪 ¡Pero Luna los frena! "¿Ya se lavaron las manos?" Tini dice que están limpias, pero Luna le cuenta un secreto: hay bichitos chiquitos que no se ven, ¡los gérmenes! 🦠🧼 Un cuento infantil corto para aprender a lavarse las manos.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que hay gérmenes que no se ven
• A lavarnos las manos con agua y jabón: palmas, entre los dedos y uñas
• Cuándo lavarnos: antes de comer, después del baño y al volver de jugar

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Cuándo tenemos que lavarnos las manos? ¡Lávenselas juntos contando hasta veinte!"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#lavarselasmanos #dibujosanimados #cuentosinfantiles`,
    tags: [
      'lavarse las manos',
      'higiene para niños',
      'hábitos de higiene',
      'gérmenes para niños',
      'lavado de manos niños',
      'hábitos saludables',
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
