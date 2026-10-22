import type { Episode } from '../../engine/script';

/**
 * Capítulo 43 — Mi primer diente flojo (valor: enfrentar un miedo nuevo; los cambios del cuerpo al crecer).
 * Tini's first wobbly tooth falls out while eating an apple; the Tooth Mouse (Ratón Pérez) leaves a coin.
 * "In the hand" y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep43-mi-primer-diente-flojo',
  number: 43,
  title: 'Mi primer diente flojo',
  subtitle: 'A Tini se le mueve un diente… ¿le va a doler? ¿y quién es el Ratón Pérez?',
  music: 'happy',
  thumb: { bg: 'bedroom', variant: 'day', text: '¡SE ME MUEVE!', prop: 'tooth', hero: ['hija'], exprs: { hija: 'worried' } },
  scenes: [
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hija: { x: 640, mood: 'worried' },
        hijo: { x: 920, mood: 'happy' },
        mama: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: '¡Mamá, se me mueve un diente! ¿Me va a doler mucho?', expr: 'worried', act: 'tremble' },
        { fx: 'sweat', x: 640, y: 480, with: true },
        { say: 'mama', text: 'Es tu primer diente flojo, mi amor. Eso pasa porque estás creciendo.', expr: 'love', act: 'hug' },
        { say: 'hijo', text: 'A mí se me cayeron un montón, hermanita. ¡No duele casi nada!', expr: 'happy', act: 'nod' },
        { say: 'hija', text: '¿Y si me quedo sin dientes para siempre?', expr: 'worried', act: 'shrug' },
        { say: 'mama', text: 'Debajo está saliendo un diente nuevo, más grande y más fuerte.', expr: 'happy', act: 'point' },
        { fx: 'sparkle', x: 640, y: 500, with: true },
        { sfx: 'sparkle', with: true },
        { mood: 'surprised', who: 'hija' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 700, mood: 'happy' },
        hijo: { x: 1000, mood: 'happy', facing: -1 },
        papa: { x: 1320, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'apple', id: 'manzana', x: 900, y: HAND },
        { say: 'hijo', text: '¿Quieres una manzana, hermanita? Está bien crocante.', expr: 'happy', act: 'point' },
        { moveProp: 'manzana', x: 760, y: HAND, dur: 0.7, arc: 60 },
        { removeProp: 'manzana', delay: 0.6 },
        { sfx: 'pop', with: true },
        { mood: 'surprised', who: 'hija' },
        { fx: 'exclaim', x: 700, y: 470, with: true },
        { prop: 'tooth', id: 'diente', x: 790, y: HAND },
        { sfx: 'sparkle', with: true },
        { say: 'hija', text: '¡Se me cayó el diente! ¡Y no me dolió nada!', expr: 'excited', act: 'jump' },
        { say: 'papa', text: '¡Felicitaciones! Esta noche seguro viene el Ratón Pérez.', expr: 'proud', act: 'clap' },
        { say: 'hija', text: '¿El Ratón Pérez? ¿Quién es ese ratón?', expr: 'surprised', act: 'think' },
        { say: 'hijo', text: 'Si dejas el diente debajo de la almohada, a la mañana te deja una sorpresa.', expr: 'wink', act: 'point' },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 700, mood: 'sleepy' },
      },
      steps: [
        { prop: 'tooth', id: 'diente', x: 860, y: HAND },
        { title: 'Esa noche...', dur: 1.6 },
        { say: 'hija', text: 'Buenas noches, Ratón Pérez. Te dejo mi diente debajo de la almohada.', expr: 'sleepy', act: 'wave' },
        { removeProp: 'diente' },
        { fx: 'sparkle', x: 860, y: 640, with: true },
        { fx: 'zzz', x: 720, y: 420, dur: 2.4 },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hija: { x: 640, mood: 'excited' },
        mama: { x: 1050, mood: 'happy', facing: -1 },
        papa: { x: 1330, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'coin', id: 'moneda', x: 820, y: HAND },
        { sfx: 'tada', with: true },
        { fx: 'stars', x: 820, y: 560, with: true },
        { say: 'hija', text: '¡Vengan a ver! ¡El Ratón Pérez me dejó una moneda!', expr: 'excited', act: 'jump' },
        { say: 'mama', text: '¡Qué emoción! Ahora tienes una sonrisa de niña grande.', expr: 'love', act: 'clap' },
        { say: 'hija', text: '¡Ya no tengo miedo! ¡Quiero que se me caigan todos!', expr: 'laugh', act: 'cheer' },
        { sfx: 'giggle', with: true, delay: 1.5 },
        { do: 'dance', who: ['hija', 'mama', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Los dientes de leche se caen para dejar lugar a dientes nuevos. ¡Crecer es una aventura!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Mi Primer Diente Flojo 🦷 El Ratón Pérez | Dibujos Animados para Niños en Español',
    description: `¡A Tini se le mueve un diente! 🦷😟 "¿Me va a doler? ¿Y si me quedo sin dientes para siempre?" Luna le explica que es porque está creciendo, y Lio le cuenta que a él se le cayeron un montón. Pero mientras come una manzana… ¡se le cae! 🍎 Y esa noche, el Ratón Pérez tiene una sorpresa para ella. ✨ Un cuento infantil corto para perderle el miedo al primer diente flojo.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que los dientes de leche se caen porque estamos creciendo
• Que debajo sale un diente nuevo y más fuerte
• A enfrentar los miedos con ayuda de la familia

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Ya se te movió algún diente? ¿Qué le pedirías al Ratón Pérez?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#ratonperez #dibujosanimados #cuentosinfantiles`,
    tags: [
      'diente flojo',
      'mi primer diente',
      'ratón pérez',
      'se me cayó un diente',
      'dientes de leche',
      'miedo a que se caiga el diente',
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
