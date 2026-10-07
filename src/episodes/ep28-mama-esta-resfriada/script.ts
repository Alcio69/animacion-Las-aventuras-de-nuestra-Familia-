import type { Episode } from '../../engine/script';

/**
 * Capítulo 28 — Mamá está resfriada (valor: empatía; cuidar a quien nos cuida).
 * Luna wears `costume: 'blanket'` while sick; tea is made in the kitchen (counter y=562), then brought to her (y=760 = in hand).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const COUNTER = 562;
const HAND = 760;

const episode: Episode = {
  id: 'ep28-mama-esta-resfriada',
  number: 28,
  title: 'Mamá está resfriada',
  subtitle: 'Luna se enferma y esta vez Lio y Tini son los que cuidan',
  music: 'calm',
  thumb: {
    bg: 'bedroom',
    variant: 'day',
    text: '¡HOY TE CUIDAMOS!',
    prop: 'teacup',
    exprs: { papa: 'happy', mama: 'love', hijo: 'love', hija: 'love' },
    costumes: { mama: 'blanket' },
  },
  scenes: [
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: 520, mood: 'worried' },
        hija: { x: 780, mood: 'worried' },
        mama: { x: 1200, mood: 'sleepy', facing: -1, costume: 'blanket' },
      },
      steps: [
        { prop: 'thermometer', id: 'termometro', x: 1060, y: HAND },
        { say: 'hijo', text: 'Mamá, ¿estás bien? Tienes los ojos muy cansados.', expr: 'worried' },
        { do: 'sneeze', who: 'mama' },
        { say: 'mama', text: 'Estoy resfriada, mi amor. Hoy necesito quedarme en la cama y descansar.', expr: 'sleepy' },
        { say: 'hija', text: 'Mamá siempre nos cuida cuando nosotros estamos enfermos.', expr: 'sad' },
        { mood: 'proud', who: 'hijo' },
        { say: 'hijo', text: '¡Ya sé! ¡Hoy la cuidamos nosotros!', expr: 'proud', act: 'cheer' },
        { mood: 'love', who: 'mama' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 540, mood: 'excited' },
        hija: { x: 800, mood: 'excited' },
        papa: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'papa', text: '¿Qué le podemos preparar a mamá para que se sienta mejor?', expr: 'happy', act: 'think' },
        { say: 'hija', text: '¡Un té calentito con miel! A mí me gusta cuando estoy enferma.', expr: 'excited', act: 'jump' },
        { prop: 'teacup', id: 'te', x: 1000, y: COUNTER },
        { sfx: 'ding', with: true },
        { say: 'hijo', text: 'Y yo le hago un dibujo bien lindo para que se ponga contenta.', expr: 'happy', act: 'point' },
        { prop: 'drawing', id: 'dibujo', x: 700, y: HAND },
        { sfx: 'pop', with: true },
        { say: 'papa', text: '¡Qué buena idea! Y si ordenamos la casa entre todos, mamá puede descansar tranquila.', expr: 'proud', act: 'nod' },
        { say: 'hija', text: '¡Claro que sí! ¡Somos un gran equipo!', expr: 'laugh', act: 'cheer' },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: -250, mood: 'happy' },
        hija: { x: -250, mood: 'happy' },
        mama: { x: 1240, mood: 'sleepy', facing: -1, costume: 'blanket' },
      },
      steps: [
        { do: 'walk', who: 'hija', to: 820 },
        { do: 'walk', who: 'hijo', to: 560, with: true, delay: 0.3 },
        { prop: 'teacup', id: 'te', x: 1000, y: HAND },
        { prop: 'drawing', id: 'dibujo', x: 700, y: HAND, with: true },
        { say: 'hija', text: 'Mamá, te trajimos un té calentito y un dibujo.', expr: 'love' },
        { say: 'hijo', text: 'Y ordenamos todos los juguetes sin que nadie nos lo pidiera.', expr: 'proud', act: 'nod' },
        { mood: 'love', who: 'mama' },
        { say: 'mama', text: '¡Qué hermosos son, mis amores! Con tanto cariño ya me siento mucho mejor.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 1000, y: 460, dur: 2, with: true, delay: 0.3 },
        { do: 'hug', who: ['hijo', 'hija'], dur: 2, with: true },
        { say: 'narrador', text: 'Cuando alguien que queremos está enfermo, un poco de cariño es el mejor remedio.', delay: 0.4 },
      ],
    },
  ],
  youtube: {
    title: 'Mamá Está Resfriada 🤒 Empatía y Ayudar en Casa | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Luna se despierta resfriada y tiene que quedarse en la cama. 🤒 Lio y Tini, que siempre son cuidados por su mamá, deciden que hoy les toca a ellos: le preparan un té calentito, le hacen un dibujo y ordenan sin que nadie se lo pida. 💛 Un cuento infantil sobre la empatía, ayudar en casa y cuidar a quien nos cuida.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• A ponernos en el lugar del otro
• A ayudar en casa cuando alguien lo necesita
• Que el cariño también cura

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, empatía para niños, ayudar en casa, cuidar a mamá, cuando alguien está enfermo.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#empatia #ayudarencasa #mama #cuidar #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #español`,
    tags: [
      'empatía para niños',
      'ayudar en casa',
      'cuidar a mamá',
      'mamá enferma cuento',
      'cuento sobre empatía',
      'niños que ayudan',
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
