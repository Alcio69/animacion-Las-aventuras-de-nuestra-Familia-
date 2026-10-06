import type { Episode } from '../../engine/script';

/**
 * Capítulo 19 — ¿Qué estoy sintiendo? (valor: reconocer y nombrar las emociones; calmarse respirando).
 * Hija's drawing falls and tears; Mamá helps her name what she feels (enojo, tristeza, miedo, alegría).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const TABLE = { x: 1000, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep19-que-estoy-sintiendo',
  number: 19,
  title: '¿Qué estoy sintiendo?',
  subtitle: 'Hija siente muchas cosas a la vez y no sabe qué le pasa…',
  music: 'calm',
  thumb: { bg: 'bedroom', variant: 'day', text: '¿QUÉ SIENTO?', prop: 'heart', exprs: { papa: 'surprised', mama: 'love', hijo: 'sad', hija: 'angry' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hija: { x: 800, mood: 'happy' },
        hijo: { x: -250, mood: 'excited' },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'drawing', id: 'dibujo', x: TABLE.x, y: ON_TABLE, with: true },
        { say: 'hija', text: 'Mi dibujo de la familia está quedando precioso. ¡Ya casi lo termino!', expr: 'happy', act: 'clap' },
        { do: 'run', who: 'hijo', to: 1250, dur: 1.2 },
        { sfx: 'whoosh', with: true, delay: 0.4 },
        { moveProp: 'dibujo', x: 1180, y: 960, dur: 0.8, arc: 60, with: true, delay: 0.5 },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¡Mi dibujo! ¡Se cayó al piso y se rompió una parte!', expr: 'surprised', act: 'point' },
        { mood: 'angry', who: 'hija' },
        { fx: 'exclaim', x: 800, y: 480, with: true },
        { say: 'hija', text: '¡Arruinaste mi dibujo! ¡Ya no te quiero hablar!', expr: 'angry', act: 'shake' },
        { do: 'turn', who: 'hijo' },
        { mood: 'worried', who: 'hijo', with: true },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: 'No sé qué me pasa. Tengo ganas de gritar y de llorar al mismo tiempo.', expr: 'sad', act: 'tremble' },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      zoom: [1.08, 1.14],
      cast: {
        hija: { x: 740, mood: 'sad' },
        mama: { x: 1060, mood: 'love', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Cuando sentimos muchas cosas a la vez, ayuda ponerles nombre. Vamos a descubrirlas juntas.', expr: 'love', act: 'hug' },
        { say: 'mama', text: 'Cuando sientes calor en la cara y ganas de gritar, eso se llama enojo.', expr: 'happy', act: 'point' },
        { mood: 'angry', who: 'hija' },
        { do: 'nod', who: 'hija', dur: 1 },
        { say: 'mama', text: 'Cuando tienes ganas de llorar, eso se llama tristeza.', expr: 'happy' },
        { mood: 'sad', who: 'hija' },
        { do: 'nod', who: 'hija', dur: 1 },
        { say: 'mama', text: 'Y cuando el corazón late muy rápido, a veces es miedo.', expr: 'happy' },
        { mood: 'worried', who: 'hija' },
        { say: 'mama', text: 'Todas las emociones están bien. Ninguna es mala. Lo importante es saber qué sentimos.', expr: 'love', act: 'nod' },
        { say: 'hija', text: 'Entonces siento enojo, y también un poquito de tristeza.', expr: 'sad', act: 'think' },
        { say: 'mama', text: '¡Muy bien! Ahora respiremos juntas: aire adentro, como oliendo una flor... y aire afuera.', expr: 'happy' },
        { mood: 'happy', who: 'hija' },
        { fx: 'sparkle', x: 740, y: 500, with: true },
        { say: 'hija', text: 'Ya me siento más tranquila. Voy a contarle a mi hermano cómo me siento.', expr: 'happy', act: 'nod' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'happy' },
        hijo: { x: 1180, mood: 'worried', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 910, y: TABLE.y },
        { say: 'hija', text: 'Hermano, me sentí enojada y triste cuando se cayó mi dibujo.', expr: 'happy' },
        { say: 'hijo', text: 'Perdón, hermanita. No me di cuenta. ¿Te ayudo a hacer uno nuevo?', expr: 'sad', act: 'hug' },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Claro que sí! ¡Hagamos uno juntos, todavía más lindo!', expr: 'excited', act: 'jump' },
        { title: 'Un ratito después...', dur: 1.6 },
        { prop: 'drawing', id: 'nuevo', x: 910, y: ON_TABLE },
        { fx: 'sparkle', x: 910, y: 560, with: true },
        { sfx: 'sparkle', with: true },
        { mood: 'laugh', who: ['hija', 'hijo'] },
        { say: 'hija', text: '¡Y ahora siento alegría! ¡Mucha, mucha alegría!', expr: 'laugh', act: 'cheer' },
        { fx: 'hearts', x: 900, y: 480, with: true, delay: 0.4 },
        { do: 'dance', who: ['hija', 'hijo'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Ponerle nombre a lo que sentimos nos ayuda a sentirnos mejor.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Las Emociones para Niños 🌈 ¿Qué Estoy Sintiendo? | Las Aventuras de Nuestra Familia | Educación Emocional',
    description: `A Hija se le rompe su dibujo y de repente siente muchas cosas a la vez: enojo, tristeza, ganas de gritar y de llorar… 😠😢 Mamá le enseña a ponerle nombre a cada emoción y a calmarse respirando. 🌈🌸 Un cuento infantil para aprender las emociones: enojo, tristeza, miedo y alegría.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• A reconocer y nombrar las emociones
• Que todas las emociones están bien
• A respirar para calmarnos
• A contar cómo nos sentimos

👶 Ideal para niños de 2 a 8 años y para usar en el aula. Dibujos animados 3D en español, las emociones para niños, educación emocional, el enojo, la tristeza, el miedo y la alegría.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#emociones #lasemociones #educacionemocional #emocionesparaniños #cuentosinfantiles #dibujosanimados #cuentosparaniños #animacion3d #videosparaniños #español`,
    tags: [
      'las emociones para niños',
      'emociones para niños',
      'educación emocional',
      'el enojo para niños',
      'la tristeza para niños',
      'cómo calmarse niños',
      'respiración para niños',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
