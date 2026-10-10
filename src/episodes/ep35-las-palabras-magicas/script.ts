import type { Episode } from '../../engine/script';

/**
 * Capítulo 35 — Las palabras mágicas (valor: buenos modales; por favor, gracias y perdón).
 * Tini asks for things in a bossy way; she learns the three "magic words". Kitchen (counter y=562), then the living room.
 * Keep characters between x≈400 and x≈1550.
 */
const COUNTER = 562;
const HAND = 760;

const episode: Episode = {
  id: 'ep35-las-palabras-magicas',
  number: 35,
  title: 'Las palabras mágicas',
  subtitle: 'Tini pide las cosas a los gritos… hasta que descubre tres palabras mágicas',
  music: 'happy',
  thumb: { bg: 'living', text: '¡POR FAVOR!', prop: 'star', exprs: { hija: 'excited', mama: 'wink', hijo: 'laugh', papa: 'happy' } },
  scenes: [
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 620, mood: 'neutral' },
        mama: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'glass', id: 'vaso', x: 1000, y: COUNTER },
        { say: 'hija', text: '¡Quiero jugo, mamá! ¡Dámelo ya mismo!', expr: 'angry', act: 'hips' },
        { mood: 'neutral', who: 'mama' },
        { say: 'mama', text: 'Así no me gusta que me pidas las cosas, hija. ¿Cuál es la palabra mágica?', expr: 'wink', act: 'point' },
        { do: 'think', who: 'hija', dur: 1.4 },
        { fx: 'question', x: 620, y: 470, dur: 1.4, with: true },
        { say: 'hija', text: '¿La palabra mágica es abracadabra?', expr: 'surprised', act: 'shrug' },
        { sfx: 'giggle' },
        { mood: 'laugh', who: 'mama', with: true },
        { say: 'mama', text: '¡Casi! La palabra mágica es por favor.', expr: 'laugh', act: 'nod' },
        { say: 'hija', text: 'Mamá, ¿me das un poquito de jugo, por favor?', expr: 'love' },
        { say: 'mama', text: '¡Claro que sí, mi amor! Pedido con tanta dulzura, da gusto.', expr: 'love', act: 'hug' },
        { moveProp: 'vaso', x: 720, y: HAND, dur: 0.8 },
        { fx: 'sparkle', x: 720, y: 640, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'hija', text: '¡Mira, mamá, funcionó! ¡Es una palabra mágica de verdad!', expr: 'excited', act: 'jump' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 560, mood: 'happy' },
        hijo: { x: 1150, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'car', id: 'autito', x: 1340, y: 950 },
        { prop: 'block', id: 'b1', x: 900, y: 950, with: true },
        { prop: 'block', id: 'b2', x: 960, y: 950, with: true },
        { prop: 'block', id: 'b3', x: 930, y: 860, with: true },
        { say: 'hija', text: 'Hermano, ¿me prestas tu autito, por favor?', expr: 'love', act: 'point' },
        { say: 'hijo', text: '¡Claro! Como me lo pediste tan lindo, te lo presto.', expr: 'happy', act: 'nod' },
        { moveProp: 'autito', x: 760, y: 950, dur: 1.2 },
        { say: 'hija', text: '¡Muchas gracias, hermano!', expr: 'laugh', act: 'clap' },
        { do: 'walk', who: 'hija', to: 800 },
        { moveProp: 'b3', x: 1010, y: 960, dur: 0.5, arc: 60 },
        { sfx: 'crash', with: true },
        { mood: 'surprised', who: ['hija', 'hijo'], with: true },
        { say: 'hija', text: '¡No puede ser! Perdón, hermano. Tiré tu torre sin querer.', expr: 'worried', act: 'tremble' },
        { say: 'hijo', text: 'No pasa nada, hermanita. ¡La armamos otra vez juntos!', expr: 'happy', act: 'hug' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 560, mood: 'excited' },
        hijo: { x: 820, mood: 'happy' },
        papa: { x: 1250, mood: 'happy', facing: -1 },
        mama: { x: 1500, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: 'Papá, hoy aprendí tres palabras mágicas: por favor, gracias y perdón.', expr: 'excited', act: 'cheer' },
        { say: 'papa', text: '¡Son las palabras más poderosas del mundo! Hacen felices a todos.', expr: 'proud', act: 'clap' },
        { say: 'mama', text: 'Y no se gastan nunca: se pueden usar todos los días.', expr: 'wink', act: 'point' },
        { do: 'dance', who: ['hija', 'hijo', 'papa', 'mama'], dur: 3, expr: 'laugh' },
        { fx: 'stars', x: 960, y: 400, dur: 2.5, with: true },
        { say: 'narrador', text: 'Por favor, gracias y perdón: tres palabras mágicas que abren todos los corazones.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Las Palabras Mágicas ✨ Por Favor, Gracias y Perdón | Dibujos Animados para Niños en Español',
    description: `"¡Quiero jugo, mamá! ¡Dámelo ya mismo!" 😤 Tini pide las cosas a los gritos… hasta que Luna le pregunta cuál es la palabra mágica. ¿Será "abracadabra"? 😂 Tini descubre que hay tres palabras mágicas de verdad: por favor, gracias y perdón. ✨ Un cuento infantil corto sobre los buenos modales y la amabilidad.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• A pedir las cosas por favor
• A dar las gracias
• A pedir perdón cuando nos equivocamos

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Cuáles son las tres palabras mágicas? ¡Jueguen a usarlas todo el día!"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#buenosmodales #dibujosanimados #cuentosinfantiles`,
    tags: [
      'palabras mágicas',
      'por favor y gracias',
      'buenos modales para niños',
      'pedir perdón',
      'cortesía para niños',
      'amabilidad',
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
