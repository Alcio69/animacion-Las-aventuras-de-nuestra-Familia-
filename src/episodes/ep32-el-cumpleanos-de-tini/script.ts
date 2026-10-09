import type { Episode } from '../../engine/script';

/**
 * Capítulo 32 — El cumpleaños de Tini (valor: adaptarse cuando los planes cambian; agradecer lo que tenemos).
 * Tini turns 7; it rains, so the park party moves home. Living room with 'rain' variant, then the party.
 * Table at x=960 (y=900), cake on the table (y=742). Keep characters between x≈400 and x≈1550.
 */
const TABLE = { x: 960, y: 900 };

const episode: Episode = {
  id: 'ep32-el-cumpleanos-de-tini',
  number: 32,
  title: 'El cumpleaños de Tini',
  subtitle: 'Tini cumple siete años y quiere una fiesta en el parque… pero empieza a llover',
  music: 'happy',
  thumb: { bg: 'living', text: '¡MI CUMPLEAÑOS!', prop: 'cake', exprs: { hija: 'excited', hijo: 'laugh', mama: 'love', papa: 'laugh' } },
  scenes: [
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hija: { x: 700, mood: 'excited' },
        hijo: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: '¡Hoy es mi cumpleaños! ¡Ya tengo siete años!', expr: 'excited', act: 'jump' },
        { fx: 'stars', x: 700, y: 400, with: true },
        { do: 'run', who: 'hijo', to: 1200 },
        { say: 'hijo', text: '¡Feliz cumpleaños, hermanita! ¡Ya eres grande!', expr: 'laugh', act: 'cheer' },
        { say: 'hija', text: '¡Va a ser el mejor día del mundo! ¡Vamos a hacer la fiesta en el parque!', expr: 'excited', act: 'cheer' },
      ],
    },
    {
      bg: 'living',
      variant: 'rain',
      ambience: 'rain',
      cast: {
        hija: { x: 560, mood: 'happy' },
        hijo: { x: 820, mood: 'happy' },
        mama: { x: 1200, mood: 'happy', facing: -1 },
        papa: { x: 1460, mood: 'happy', facing: -1 },
      },
      steps: [
        { sfx: 'thunder' },
        { mood: 'surprised', who: ['hija', 'hijo'] },
        { say: 'hija', text: '¡Está lloviendo! ¡Ya no podemos hacer la fiesta en el parque!', expr: 'sad', act: 'tremble' },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: 'Mi cumpleaños está arruinado.', expr: 'sad' },
        { say: 'mama', text: 'La lluvia cambió los planes, mi amor. Pero la fiesta no se cancela: ¡la hacemos aquí!', expr: 'love', act: 'hug' },
        { say: 'papa', text: '¡Y tengo globos para todos!', expr: 'excited', act: 'cheer' },
        { prop: 'balloon', id: 'globo1', x: 380, y: 930 },
        { prop: 'balloon', id: 'globo2', x: 1600, y: 930, with: true, delay: 0.3 },
        { sfx: 'pop', with: true },
        { mood: 'happy', who: 'hija' },
        { say: 'hija', text: '¿En serio? ¡Una fiesta en casa! ¡Vamos a decorar!', expr: 'excited', act: 'jump' },
      ],
    },
    {
      bg: 'living',
      variant: 'rain',
      ambience: 'rain',
      cast: {
        lola: { x: 440, mood: 'happy' },
        hija: { x: 700, mood: 'excited' },
        hijo: { x: 1220, mood: 'happy', facing: -1 },
        mama: { x: 1480, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'balloon', id: 'globo1', x: 300, y: 930, with: true },
        { prop: 'balloon', id: 'globo2', x: 1650, y: 930, with: true },
        { title: 'Esa tarde...', dur: 1.6 },
        { say: 'lola', text: '¡Feliz cumpleaños, Tini! Te traje un regalo con un moño gigante.', expr: 'excited', act: 'wave' },
        { prop: 'gift', id: 'regalo', x: 560, y: 760 },
        { sfx: 'pop', with: true },
        { say: 'hijo', text: 'Y yo te hice un dibujo de toda la familia, hermanita.', expr: 'happy', act: 'point' },
        { prop: 'drawing', id: 'dibujo', x: 1080, y: 760 },
        { sfx: 'sparkle', with: true },
        { say: 'hija', text: '¡Gracias! ¡Me encantan los dos!', expr: 'love', act: 'hug' },
        { prop: 'cake', id: 'torta', x: TABLE.x, y: 742, scale: 0.8 },
        { fx: 'sparkle', x: TABLE.x, y: 560, with: true },
        { sfx: 'ding', with: true },
        { say: 'mama', text: '¡Llegó la torta! A pedir un deseo y a soplar las velitas.', expr: 'excited', act: 'point' },
        { do: 'think', who: 'hija', dur: 1.4 },
        { fx: 'stars', x: TABLE.x, y: 520, dur: 1.6 },
        { sfx: 'tada', with: true },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { do: 'cheer', who: ['lola', 'hijo', 'mama'], with: true },
        { say: 'hija', text: 'No fue la fiesta que yo imaginé... ¡fue todavía mejor! Gracias a todos.', expr: 'love', act: 'cheer' },
        { do: 'dance', who: ['lola', 'hija', 'hijo', 'mama'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Lo más lindo de un cumpleaños es festejarlo con quienes nos quieren.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'El Cumpleaños de Tini 🎂 ¡Cuando los Planes Cambian! | Dibujos Animados para Niños en Español',
    description: `¡Hoy Tini cumple siete años! 🎂🎉 Quiere hacer la fiesta en el parque… pero de repente empieza a llover. 🌧️😢 "Mi cumpleaños está arruinado", dice. Pero Max y Luna tienen una idea: ¡la fiesta se hace en casa, con globos, regalos, torta y su amiga Lola! 🎈 Un cuento infantil corto sobre cómo adaptarnos cuando los planes cambian.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que cuando los planes cambian, podemos buscar otra forma de divertirnos
• A dar las gracias por los regalos y el cariño
• Que lo más lindo es festejar con quienes nos quieren

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué harías si llueve el día de tu cumpleaños? ¿Cómo te gustaría festejarlo?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#cumpleaños #dibujosanimados #cuentosinfantiles`,
    tags: [
      'cumpleaños para niños',
      'cuento de cumpleaños',
      'fiesta de cumpleaños',
      'feliz cumpleaños',
      'frustración en niños',
      'cuando los planes cambian',
      'gratitud para niños',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
