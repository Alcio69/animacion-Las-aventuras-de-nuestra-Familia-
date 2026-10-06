import type { Episode } from '../../engine/script';

/**
 * Capítulo 17 — ¡Halloween sin miedo! (valor: enfrentar los miedos; debajo de cada disfraz hay alguien conocido).
 * Costumes: `costume` in cast or `{ costume, who }` steps (ghost, witch, pumpkin).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const episode: Episode = {
  id: 'ep17-halloween-sin-miedo',
  number: 17,
  title: '¡Halloween sin miedo!',
  subtitle: 'A Tini le dan miedo los disfraces… ¿quién se esconde debajo de esa sábana?',
  music: 'adventure',
  thumb: {
    bg: 'living',
    variant: 'halloween',
    text: '¡HALLOWEEN SIN MIEDO!',
    prop: 'pumpkin',
    exprs: { papa: 'laugh', mama: 'wink', hijo: 'excited', hija: 'laugh' },
    costumes: { papa: 'ghost', mama: 'witch', hijo: 'pumpkin', hija: 'witch' },
  },
  scenes: [
    {
      bg: 'living',
      variant: 'halloween',
      cast: {
        hijo: { x: 540, mood: 'excited', costume: 'pumpkin' },
        hija: { x: 820, mood: 'happy' },
        mama: { x: 1160, mood: 'happy', facing: -1, costume: 'witch' },
      },
      steps: [
        { say: 'hijo', text: '¡Esta noche es Halloween! ¡Vamos a pedir dulces por el barrio!', expr: 'excited', act: 'cheer' },
        { say: 'mama', text: 'Hija, ¿todavía no elegiste tu disfraz?', expr: 'happy' },
        { mood: 'worried', who: 'hija' },
        { say: 'hija', text: 'No quiero disfrazarme. Los disfraces me dan mucho miedo.', expr: 'worried', act: 'tremble' },
        { fx: 'sweat', x: 860, y: 520, with: true },
        { say: 'mama', text: 'Está bien sentir miedo. Vamos juntas, y si algo te asusta, me das la mano.', expr: 'love', act: 'hug' },
        { say: 'hija', text: 'Bueno... pero me quedo muy cerquita de ti, mamá.', expr: 'worried', act: 'nod' },
      ],
    },
    {
      bg: 'park',
      variant: 'night',
      cast: {
        hijo: { x: 520, mood: 'excited', costume: 'pumpkin' },
        hija: { x: 780, mood: 'worried' },
        mama: { x: 1020, mood: 'happy', facing: -1, costume: 'witch' },
        papa: { x: 2250, mood: 'happy', facing: -1, costume: 'ghost' },
      },
      steps: [
        { prop: 'pumpkin', id: 'c1', x: 420, y: 880 },
        { prop: 'pumpkin', id: 'c2', x: 1500, y: 880, with: true },
        { title: 'Esa noche...', dur: 1.6 },
        { say: 'hijo', text: '¡Qué lindas calabazas! ¡Brillan en la oscuridad!', expr: 'excited', act: 'point' },
        { do: 'walk', who: 'papa', to: 1320, dur: 3 },
        { sfx: 'whoosh', with: true, delay: 0.5 },
        { mood: 'surprised', who: ['hija', 'hijo'] },
        { say: 'papa', text: '¡Hola a todos! ¡Soy un fantasma muy, muy asustador!', expr: 'laugh', act: 'wave' },
        { do: 'tremble', who: 'hija', dur: 1.4 },
        { fx: 'exclaim', x: 780, y: 500, with: true },
        { say: 'hija', text: '¡Mamá! ¡Hay un fantasma de verdad!', expr: 'worried', act: 'tremble' },
        { say: 'mama', text: 'Mira bien, hija. ¿Quién crees que está debajo de esa sábana?', expr: 'wink', act: 'point' },
        { do: 'think', who: 'hija', dur: 1.6 },
        { fx: 'question', x: 780, y: 480, dur: 1.4, with: true },
        { costume: 'none', who: 'papa' },
        { fx: 'sparkle', x: 1320, y: 560, with: true },
        { sfx: 'poof', with: true },
        { say: 'papa', text: '¡Sorpresa! ¡Soy yo, tu papá! ¡No era un fantasma de verdad!', expr: 'laugh', act: 'cheer' },
        { mood: 'laugh', who: ['hija', 'hijo'] },
        { sfx: 'giggle', with: true },
        { say: 'hija', text: '¡Eras tú, papá! ¡Eras tú todo el tiempo!', expr: 'laugh', act: 'jump' },
        { say: 'papa', text: 'Debajo de cada disfraz hay alguien que solo quiere divertirse, igual que tú.', expr: 'love', act: 'hug' },
      ],
    },
    {
      bg: 'living',
      variant: 'halloween',
      cast: {
        papa: { x: 460, mood: 'happy' },
        hija: { x: 740, mood: 'excited' },
        hijo: { x: 1020, mood: 'happy', facing: -1, costume: 'pumpkin' },
        mama: { x: 1300, mood: 'happy', facing: -1, costume: 'witch' },
      },
      steps: [
        { prop: 'candy', id: 'dulces', x: 880, y: 900 },
        { say: 'hija', text: '¡Papá, préstame la sábana! ¡Ahora yo quiero ser un fantasma!', expr: 'excited', act: 'jump' },
        { costume: 'ghost', who: 'hija' },
        { fx: 'sparkle', x: 740, y: 560, with: true },
        { sfx: 'poof', with: true },
        { say: 'hija', text: '¡Ahora soy el fantasma más simpático del mundo!', expr: 'laugh', act: 'cheer' },
        { say: 'mama', text: '¡Y también el más valiente de todos!', expr: 'proud', act: 'clap' },
        { do: 'dance', who: ['papa', 'hija', 'hijo', 'mama'], dur: 3, expr: 'laugh' },
        { fx: 'confetti', x: 900, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Cuando miramos de cerca, muchos miedos desaparecen. ¡Feliz Halloween!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Halloween Sin Miedo! 🎃 Cuento de Halloween para Niños | Las Aventuras de Nuestra Familia',
    description: `¡Es noche de Halloween! 🎃👻 Lio está disfrazado de calabaza y Luna de bruja, pero a Tini los disfraces le dan mucho miedo… Cuando aparece un fantasma en el parque, descubre un secreto: ¡debajo de cada disfraz hay alguien conocido! Un cuento de Halloween para niños, divertido y nada aterrador, sobre cómo enfrentar los miedos.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que sentir miedo está bien
• A mirar de cerca lo que nos asusta
• Que Halloween es para divertirse en familia

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, Halloween para niños, disfraces, calabazas y fantasmas que no dan miedo.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#halloween #halloweenparaniños #cuentodehalloween #miedo #cuentosinfantiles #dibujosanimados #cuentosparaniños #animacion3d #videosparaniños #español`,
    tags: [
      'halloween para niños',
      'cuento de halloween',
      'halloween infantil',
      'halloween sin miedo',
      'fantasma para niños',
      'disfraces de halloween',
      'miedo en niños',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
