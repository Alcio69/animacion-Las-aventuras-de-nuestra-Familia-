import type { Episode } from '../../engine/script';

/**
 * Capítulo 31 — ¡Yo no fui! (valor: decir la verdad aunque tengamos miedo al castigo; una mentira puede hacer que otro pague por algo que no hizo).
 * Cookies on the kitchen counter (y=562). Different from ep09 (hiding a broken vase): here Lio blames his sister.
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const COUNTER = 562;

const episode: Episode = {
  id: 'ep31-yo-no-fui',
  number: 31,
  title: '¡Yo no fui!',
  subtitle: 'Lio se come las galletitas a escondidas… y le echa la culpa a Tini',
  music: 'happy',
  thumb: { bg: 'kitchen', text: '¡YO NO FUI!', prop: 'cookiePlate', exprs: { hijo: 'worried', hija: 'sad', mama: 'surprised', papa: 'worried' } },
  scenes: [
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 560, mood: 'happy' },
        mama: { x: 1220, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'cookiePlate', id: 'galletas', x: 960, y: COUNTER, scale: 1.3 },
        { say: 'mama', text: 'Preparé galletitas para la merienda de todos. Hay que esperar hasta la tarde, ¿sí?', expr: 'happy', act: 'point' },
        { say: 'hijo', text: 'Está bien, mamá. Esperamos hasta la tarde.', expr: 'happy', act: 'nod' },
        { do: 'walk', who: 'mama', to: 2250 },
        { mood: 'wink', who: 'hijo' },
        { say: 'hijo', text: 'Si me como una sola galletita, nadie se va a dar cuenta.', expr: 'wink', act: 'look' },
        { do: 'walk', who: 'hijo', to: 820 },
        { removeProp: 'galletas' },
        { prop: 'emptyPlate', id: 'plato', x: 960, y: COUNTER, scale: 1.3, with: true },
        { sfx: 'pop', with: true },
        { say: 'hijo', text: '¡Están riquísimas! Bueno... una más. Y otra más.', expr: 'laugh' },
        { sfx: 'pop', with: true, delay: 0.8 },
        { sfx: 'pop', with: true, delay: 1.4 },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 440, mood: 'neutral' },
        hija: { x: 700, mood: 'happy' },
        mama: { x: 1220, mood: 'happy', facing: -1 },
        papa: { x: 1480, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'emptyPlate', id: 'plato', x: 960, y: COUNTER, scale: 1.3 },
        { title: 'Esa tarde...', dur: 1.6 },
        { say: 'mama', text: '¡A merendar! Pero... ¿quién se comió todas las galletitas?', expr: 'surprised', act: 'point' },
        { mood: 'worried', who: 'hijo' },
        { fx: 'sweat', x: 440, y: 500, with: true },
        { say: 'hijo', text: '¡Yo no fui! Seguro fue mi hermanita.', expr: 'worried', act: 'shake' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¡No es verdad! ¡Yo no me comí ninguna!', expr: 'sad', act: 'shake' },
        { say: 'mama', text: 'Si fuiste tú, hoy te quedas sin postre, hija.', expr: 'neutral', act: 'hips' },
        { mood: 'sad', who: 'hija' },
        { do: 'tremble', who: 'hija', dur: 1.2 },
        { say: 'hijo', text: 'Mi hermanita está triste por mi culpa. Siento un nudo en la panza.', expr: 'sad' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 440, mood: 'sad' },
        hija: { x: 700, mood: 'sad' },
        mama: { x: 1220, mood: 'neutral', facing: -1 },
        papa: { x: 1480, mood: 'neutral', facing: -1 },
      },
      steps: [
        { prop: 'emptyPlate', id: 'plato', x: 960, y: COUNTER, scale: 1.3 },
        { do: 'walk', who: 'hijo', to: 960 },
        { say: 'hijo', text: 'Mamá, papá: tengo que decirles algo. Fui yo. Me comí las galletitas y dije una mentira.', expr: 'sad' },
        { do: 'turn', who: 'hijo' },
        { say: 'hijo', text: 'Perdón, hermanita. No fue justo echarte la culpa.', expr: 'sad' },
        { say: 'papa', text: 'Gracias por decir la verdad, hijo. Cuando mentimos, otro puede pagar por algo que no hizo.', expr: 'love', act: 'nod' },
        { say: 'mama', text: 'Hoy te quedas sin postre. Pero ahora te creemos, y eso vale muchísimo.', expr: 'love', act: 'hug' },
        { mood: 'happy', who: 'hija' },
        { say: 'hija', text: 'Ya te perdoné, hermano. ¿Mañana hacemos galletitas todos juntos?', expr: 'happy', act: 'hug' },
        { mood: 'happy', who: 'hijo' },
        { say: 'hijo', text: '¡Claro que sí! Y esta vez esperamos hasta la merienda.', expr: 'laugh', act: 'cheer' },
        { fx: 'hearts', x: 830, y: 500, with: true },
        { sfx: 'sparkle', with: true },
        { do: 'dance', who: ['hijo', 'hija', 'mama', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Decir la verdad da un poquito de miedo, pero siempre nos hace sentir mejor.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Yo No Fui! 🍪 Decir la Verdad | Dibujos Animados para Niños en Español',
    description: `Luna prepara galletitas para la merienda 🍪 y Lio no puede esperar: se come una… ¡y después todas! Cuando Luna pregunta quién fue, Lio dice "¡Yo no fui!" y le echa la culpa a su hermanita Tini. 😟 Pero ver a Tini triste le hace sentir un nudo en la panza… 💛 Un cuento infantil corto sobre las mentiras y el valor de decir la verdad.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que cuando mentimos, otro puede pagar por algo que no hizo
• A decir la verdad aunque tengamos miedo
• Que la verdad hace que los demás confíen en nosotros

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Cómo se sintió Lio después de mentir? ¿Y cómo se sintió cuando dijo la verdad?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#decirlaverdad #dibujosanimados #cuentosinfantiles`,
    tags: [
      'decir la verdad',
      'mentiras en niños',
      'niños que mienten',
      'yo no fui',
      'honestidad para niños',
      'echar la culpa',
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
