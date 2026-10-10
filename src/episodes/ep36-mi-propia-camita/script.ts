import type { Episode } from '../../engine/script';

/**
 * Capítulo 36 — Mi propia camita (valor: independencia y confianza al dormir solos; el amor de la familia acompaña siempre).
 * Tini tries to sleep the whole night in her new bed; in a dream (park at night) "Luna" (the moon / mom) watches over her.
 * Bedroom = night, bedroom 'day' = morning. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep36-mi-propia-camita',
  number: 36,
  title: 'Mi propia camita',
  subtitle: 'Tini quiere dormir toda la noche en su cama nueva… pero en la mitad de la noche le da miedo',
  music: 'calm',
  thumb: { bg: 'bedroom', text: '¡DUERMO SOLITA!', prop: 'teddy', exprs: { hija: 'proud', mama: 'love', papa: 'happy', hijo: 'laugh' } },
  scenes: [
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 640, mood: 'excited' },
        mama: { x: 1150, mood: 'love', facing: -1 },
        papa: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 860, y: HAND },
        { say: 'mama', text: 'Hoy es la primera noche en tu cama nueva, hija. ¿Estás lista?', expr: 'love', act: 'point' },
        { say: 'hija', text: '¡Claro que sí! Esta noche voy a dormir solita, como mi hermano.', expr: 'proud', act: 'cheer' },
        { say: 'papa', text: 'Si te despiertas, abraza a tu osito y vuelve a cerrar los ojos.', expr: 'love', act: 'nod' },
        { say: 'mama', text: 'Que sueñes cosas lindas, mi amor.', expr: 'love', act: 'hug' },
        { do: 'walk', who: ['mama', 'papa'], to: 2250 },
        { mood: 'sleepy', who: 'hija' },
        { fx: 'zzz', x: 660, y: 420, dur: 2.2 },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 640, mood: 'worried' },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 860, y: HAND },
        { title: 'En la mitad de la noche...', dur: 1.8 },
        { do: 'look', who: 'hija', dur: 1.4 },
        { say: 'hija', text: 'Está todo muy oscuro y muy callado. Mejor me voy a la cama de mamá y papá.', expr: 'worried', act: 'tremble' },
        { do: 'walk', who: 'hija', to: 2250 },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 640, mood: 'sad' },
        hijo: { x: 400, mood: 'happy' },
        papa: { x: 1150, mood: 'happy', facing: -1 },
        mama: { x: 1420, mood: 'love', facing: -1 },
      },
      steps: [
        { title: 'A la mañana siguiente...', dur: 1.8 },
        { say: 'papa', text: '¡Buenos días! Anoche alguien vino a dormir a nuestra cama, ¿no?', expr: 'wink', act: 'point' },
        { say: 'hija', text: 'Quería dormir solita toda la noche, pero me dio un poquito de miedo.', expr: 'sad', act: 'shrug' },
        { say: 'hijo', text: 'Eso también me pasaba a mí, hermanita. Después te acostumbras.', expr: 'happy', act: 'nod' },
        { say: 'mama', text: 'Está bien, mi amor. Aprender lleva tiempo. Esta noche lo intentamos otra vez.', expr: 'love', act: 'hug' },
      ],
    },
    {
      bg: 'park',
      variant: 'night',
      cast: {
        hija: { x: 700, mood: 'surprised' },
        mama: { x: 1180, mood: 'love', facing: -1 },
      },
      steps: [
        { title: 'Esa noche, Tini tuvo un sueño...', dur: 2 },
        { fx: 'stars', x: 960, y: 260, dur: 3 },
        { sfx: 'sparkle', with: true },
        { say: 'hija', text: '¡Qué lindo es el cielo! ¡Está lleno de estrellas!', expr: 'excited', act: 'point' },
        { say: 'mama', text: 'Soy Luna, y desde el cielo te cuido toda la noche.', expr: 'love', act: 'wave' },
        { say: 'hija', text: '¿Toda la noche, mamá? ¿Aunque yo esté dormida?', expr: 'surprised' },
        { say: 'mama', text: 'Toda la noche. Aunque no me veas, siempre estoy cerquita.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 940, y: 480, with: true },
        { do: 'dance', who: ['hija', 'mama'], dur: 2.6, expr: 'laugh' },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hija: { x: 640, mood: 'excited' },
        mama: { x: 1150, mood: 'happy', facing: -1 },
        papa: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 860, y: HAND },
        { say: 'hija', text: '¡Buenos días, familia! ¡Dormí toda la noche en mi propia cama!', expr: 'excited', act: 'jump' },
        { fx: 'confetti', x: 960, y: 300, dur: 2.5, with: true },
        { sfx: 'tada', with: true },
        { say: 'papa', text: '¡Muy bien, campeona! ¡Qué valiente eres!', expr: 'proud', act: 'clap' },
        { say: 'hija', text: 'Tuve un sueño muy lindo: la luna me cuidaba. ¡Y eras tú, mamá!', expr: 'love', act: 'hug' },
        { say: 'mama', text: '¿Te das cuenta? Siempre estuvimos cerquita.', expr: 'love', act: 'nod' },
        { do: 'dance', who: ['hija', 'mama', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Aunque durmamos solitos, el amor de nuestra familia nos acompaña toda la noche.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Mi Propia Camita 🌙 Dormir Solito | Dibujos Animados para Niños en Español',
    description: `¡Tini estrena su cama nueva y quiere dormir toda la noche solita, como su hermano Lio! 🛏️ Pero en la mitad de la noche todo está muy oscuro… y termina en la cama de Max y Luna. 🌙 Esa noche, en un sueño lleno de estrellas, descubre un secreto: aunque no la vea, su mamá siempre la cuida. ✨ Un cuento infantil corto para animarse a dormir en su propia cama.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que aprender a dormir solitos lleva tiempo, y está bien
• Que podemos intentarlo otra vez
• Que el amor de la familia nos acompaña aunque estemos dormidos

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué te ayuda a dormir tranquilo en tu cama? ¿Tienes un osito o algo especial?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#cuentosparadormir #dibujosanimados #cuentosinfantiles`,
    tags: [
      'dormir solo',
      'dormir en su propia cama',
      'cuentos para dormir',
      'miedo a la noche',
      'colecho',
      'independencia para niños',
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
