import type { Episode } from '../../engine/script';

/**
 * Capítulo 9 — ¡Fue sin querer! (valor: decir la verdad y pedir perdón).
 * A small table with Mamá's favourite vase stands at x=1350 (vase at y=760 = on the table).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const TABLE = { x: 1350, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep09-fue-sin-querer',
  number: 9,
  title: '¡Fue sin querer!',
  subtitle: 'Lio rompe el florero favorito de Luna… ¿lo va a esconder o va a decir la verdad?',
  music: 'happy',
  thumb: { bg: 'living', text: '¡FUE SIN QUERER!', prop: 'vaseBroken', exprs: { hijo: 'worried', mama: 'surprised', papa: 'surprised', hija: 'surprised' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 620, mood: 'happy' },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'vase', id: 'florero', x: TABLE.x, y: ON_TABLE, with: true },
        { prop: 'ball', id: 'pelota', x: 780, y: 960, with: true },
        { say: 'hijo', text: 'Mamá dice que no juegue a la pelota adentro... pero solo un poquito.', expr: 'wink' },
        { moveProp: 'pelota', x: 950, y: 960, dur: 1, arc: 120, bounces: 1 },
        { sfx: 'boing', with: true },
        { moveProp: 'pelota', x: 800, y: 960, dur: 1, arc: 140, bounces: 1 },
        { sfx: 'boing', with: true },
        { do: 'jump', who: 'hijo', with: true, delay: 0.2 },
        { moveProp: 'pelota', x: 1330, y: ON_TABLE, dur: 0.8, arc: 160 },
        { removeProp: 'florero' },
        { prop: 'vaseBroken', id: 'pedazos', x: 1250, y: 960, with: true },
        { sfx: 'crash', with: true },
        { moveProp: 'pelota', x: 1500, y: 960, dur: 0.8, arc: 80, bounces: 1, with: true },
        { mood: 'surprised', who: 'hijo', with: true },
        { fx: 'exclaim', x: 620, y: 380, dur: 1.2, with: true },
        { wait: 0.8 },
        { say: 'hijo', text: '¡No puede ser! ¡El florero favorito de mamá!', expr: 'worried', act: 'tremble' },
        { fx: 'sweat', x: 680, y: 420, dur: 1.4, with: true },
        { say: 'hijo', text: 'Si lo escondo, nadie se va a enterar.', expr: 'worried' },
        { do: 'run', who: 'hijo', to: 1100 },
        { moveProp: 'pedazos', x: 2100, y: 960, dur: 0.7 },
        { do: 'run', who: 'hijo', to: 620 },
        { mood: 'sad', who: 'hijo' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'sad' },
        hija: { x: 820, mood: 'happy', facing: -1 },
        mama: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { do: 'walk', who: 'mama', to: 1100 },
        { say: 'mama', text: '¿Alguien vio mi florero azul? Estaba aquí, en la mesa.', expr: 'worried', act: 'think' },
        { say: 'hija', text: 'Yo no lo vi, mamá.', expr: 'neutral', act: 'shrug' },
        { fx: 'sweat', x: 620, y: 420, dur: 1.6 },
        { do: 'think', who: 'hijo', dur: 1.8, with: true },
        { say: 'hijo', text: 'Mamá, tengo que decirte algo.', expr: 'sad' },
        { say: 'hijo', text: 'Estuve jugando a la pelota adentro y rompí tu florero. Fue sin querer. ¡Perdóname!', expr: 'sad' },
        { mood: 'surprised', who: 'hija' },
        { do: 'walk', who: 'mama', to: 820 },
        { do: 'walk', who: 'hija', to: 1100, with: true },
        { say: 'mama', text: 'Gracias por decirme la verdad, hijo. Eso es ser muy valiente.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 690, y: 450, with: true, delay: 0.6 },
        { mood: 'happy', who: 'hijo' },
        { say: 'mama', text: 'Ahora, ¡vamos a arreglarlo juntos!', expr: 'happy', act: 'cheer' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'happy' },
        mama: { x: 840, mood: 'happy', facing: -1 },
        hija: { x: 1120, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Un ratito después...', dur: 1.6 },
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'vaseFixed', id: 'florero', x: TABLE.x, y: ON_TABLE, with: true },
        { fx: 'sparkle', x: TABLE.x, y: 600, dur: 1.8, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'hijo', text: '¡Está como nuevo! Bueno, casi nuevo.', expr: 'laugh', act: 'point' },
        { sfx: 'giggle', with: true, delay: 1.4 },
        { say: 'mama', text: 'Y la pelota, ¿dónde se juega?', expr: 'wink', act: 'hips' },
        { say: 'hijo', text: '¡En el patio!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hijo', 'mama'], dur: 2.8, expr: 'laugh' },
        { fx: 'stars', x: 780, y: 400, dur: 2, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Decir la verdad siempre es lo mejor, aunque a veces cueste.', with: true, delay: 0.6 },
      ],
    },
  ],
  youtube: {
    title: '¡Fue Sin Querer! 💙 Decir la Verdad | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Lio juega a la pelota adentro de casa y… ¡CRASH! 💥 Rompe el florero favorito de Luna. ¿Lo va a esconder o va a decir la verdad? 😟💙 Un cuento infantil sobre la honestidad, pedir perdón y reparar los errores juntos.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que decir la verdad es ser valiente
• A pedir perdón cuando nos equivocamos
• Que los errores se pueden arreglar juntos

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuentos sobre la honestidad, valores y educación emocional para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#decirlaverdad #honestidad #pedirperdon #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #videosparaniños #español`,
    tags: [
      'decir la verdad',
      'honestidad para niños',
      'pedir perdón',
      'fue sin querer',
      'cuentos con valores',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'educación emocional para niños',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
