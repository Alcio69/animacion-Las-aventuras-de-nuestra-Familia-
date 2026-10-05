import type { Episode } from '../../engine/script';

/**
 * Capítulo 10 — Hermanos al rescate (valor: superar los celos, trabajo en equipo).
 * In the park, a tree prop stands at x=1350; the ball gets stuck at y=360 (≈5.7 m up).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const HAND = 760;
const TREE = { x: 1350, y: 880 };

const episode: Episode = {
  id: 'ep10-hermanos-al-rescate',
  number: 10,
  title: 'Hermanos al rescate',
  subtitle: 'Hija está celosa de su hermano… hasta que la pelota queda atrapada en un árbol',
  music: 'adventure',
  thumb: { bg: 'park', text: '¡AL RESCATE!', prop: 'ball', exprs: { hijo: 'excited', hija: 'excited', papa: 'surprised', mama: 'happy' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 640, mood: 'excited' },
        hija: { x: 960, mood: 'happy', facing: -1 },
        papa: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'drawing', id: 'dibujo', x: 760, y: HAND },
        { say: 'hijo', text: '¡Papá, mira mi dibujo! Es nuestra familia.', expr: 'excited', act: 'jump' },
        { say: 'papa', text: '¡Qué dibujo tan hermoso, campeón!', expr: 'love', act: 'clap' },
        { mood: 'angry', who: 'hija' },
        { say: 'hija', text: 'Yo también sé dibujar. ¡Y mucho mejor que tú!', expr: 'angry', act: 'hips' },
        { say: 'hijo', text: '¡No es cierto!', expr: 'angry', act: 'shake' },
        { say: 'hija', text: '¡Sí es cierto!', expr: 'angry', act: 'shake' },
        { mood: 'worried', who: 'papa' },
        { say: 'papa', text: 'Bueno, bueno. ¿Qué tal si vamos al parque a tomar un poco de aire?', expr: 'worried', act: 'shrug' },
      ],
    },
    {
      bg: 'park',
      cast: {
        hijo: { x: 560, mood: 'neutral' },
        hija: { x: 900, mood: 'angry', facing: -1 },
      },
      steps: [
        { prop: 'tree', id: 'arbol', x: TREE.x, y: TREE.y },
        { prop: 'ball', id: 'pelota', x: 700, y: 950, with: true },
        { moveProp: 'pelota', x: 1330, y: 360, dur: 1.2, arc: 150 },
        { do: 'jump', who: 'hijo', with: true },
        { sfx: 'boing', with: true, delay: 1.1 },
        { mood: 'surprised', who: ['hijo', 'hija'] },
        { say: 'hija', text: '¡No puede ser! ¡La pelota quedó atrapada en el árbol!', expr: 'surprised', act: 'point' },
        { do: 'walk', who: 'hijo', to: 1150 },
        { do: 'jump', who: 'hijo' },
        { say: 'hijo', text: 'No llego...', expr: 'sad' },
        { do: 'walk', who: 'hija', to: 1520 },
        { do: 'jump', who: 'hija' },
        { say: 'hija', text: 'Yo tampoco puedo llegar.', expr: 'sad' },
        { do: 'think', who: 'hijo', dur: 1.6 },
        { fx: 'question', x: 1150, y: 380, dur: 1.4, with: true },
        { say: 'hijo', text: '¿Y si empujamos el árbol los dos juntos?', expr: 'excited', act: 'point' },
        { say: 'hija', text: '¡Sí! ¡A la cuenta de tres!', expr: 'excited', act: 'cheer' },
        { do: 'tremble', who: ['hijo', 'hija'], dur: 1.6 },
        { moveProp: 'arbol', x: TREE.x + 4, y: TREE.y, dur: 1.6, arc: 10, bounces: 5, with: true },
        { sfx: 'whoosh', with: true },
        { moveProp: 'pelota', x: 1340, y: 960, dur: 1.2, arc: 40, bounces: 2 },
        { sfx: 'boing', with: true, delay: 0.7 },
        { mood: 'excited', who: ['hijo', 'hija'] },
        { say: 'hija', text: '¡Lo logramos!', expr: 'laugh', act: 'jump' },
        { fx: 'stars', x: 1340, y: 600, with: true },
      ],
    },
    {
      bg: 'park',
      variant: 'sunset',
      cast: {
        hijo: { x: 700, mood: 'happy' },
        hija: { x: 980, mood: 'happy', facing: -1 },
        papa: { x: 2250, mood: 'happy', facing: -1 },
        mama: { x: -250, mood: 'happy' },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 840, y: 960 },
        { say: 'hija', text: 'Perdón por enojarme, hermano. Tu dibujo es muy lindo.', expr: 'love' },
        { say: 'hijo', text: '¡Juntos somos un gran equipo, hermanita!', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 840, y: 470, with: true, delay: 0.4 },
        { do: 'walk', who: 'papa', to: 1300 },
        { do: 'walk', who: 'mama', to: 430, with: true },
        { say: 'papa', text: '¡Así me gusta! Hermanos que se ayudan.', expr: 'proud', act: 'hips' },
        { do: 'dance', who: ['hijo', 'hija', 'papa', 'mama'], dur: 3, expr: 'laugh' },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Cuando los hermanos se ayudan, no hay nada imposible.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Hermanos al Rescate 🌳 Celos entre Hermanos | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Hija se pone celosa porque Papá felicita el dibujo de su hermano… ¡y terminan peleando! 😤 Pero en el parque, la pelota queda atrapada en un árbol y solo trabajando juntos la pueden rescatar. 🌳⚽ Un cuento infantil sobre los celos entre hermanos y el trabajo en equipo.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que los celos se pasan cuando hablamos y nos perdonamos
• Que juntos somos más fuertes
• A ayudarnos entre hermanos

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, peleas y celos entre hermanos, trabajo en equipo y educación emocional para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#hermanos #celosentrehermanos #trabajoenequipo #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #videosparaniños #español`,
    tags: [
      'celos entre hermanos',
      'peleas entre hermanos',
      'hermanos',
      'trabajo en equipo',
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
