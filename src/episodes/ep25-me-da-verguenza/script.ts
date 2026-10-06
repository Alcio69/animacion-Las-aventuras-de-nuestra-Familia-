import type { Episode } from '../../engine/script';

/**
 * Capítulo 25 — ¡Me da vergüenza! (valor: la timidez; animarse de a poquito; la valentía no es no tener miedo).
 * Hija has to sing at the school show; she practises at home with a teddy audience, then sings for her class.
 * Guests: `lola`, `nico`, `mati`, `maestra`. Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep25-me-da-verguenza',
  number: 25,
  title: '¡Me da vergüenza!',
  subtitle: 'Tini tiene que cantar en el acto de la escuela… pero es muy tímida',
  music: 'calm',
  thumb: {
    bg: 'school',
    text: '¡ME DA VERGÜENZA!',
    prop: 'star',
    exprs: { lola: 'excited', hija: 'worried', maestra: 'love', nico: 'happy' },
    cast: ['lola', 'hija', 'maestra', 'nico'],
  },
  scenes: [
    {
      bg: 'school',
      cast: {
        hija: { x: 560, mood: 'happy' },
        lola: { x: 800, mood: 'happy' },
        maestra: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'maestra', text: 'El viernes es el acto de la escuela. Tini, ¿te gustaría cantar una canción?', expr: 'happy', act: 'point' },
        { mood: 'worried', who: 'hija' },
        { fx: 'sweat', x: 560, y: 500, with: true },
        { say: 'hija', text: '¿Yo? No sé... me da mucha vergüenza cantar delante de todos.', expr: 'worried', act: 'tremble' },
        { say: 'lola', text: '¡Pero cantas lindísimo! Yo te escuché en el recreo.', expr: 'excited', act: 'clap' },
        { say: 'maestra', text: 'Piénsalo tranquila. No tienes que decidir ahora.', expr: 'love', act: 'nod' },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hija: { x: 700, mood: 'worried' },
        mama: { x: 1180, mood: 'love', facing: -1 },
      },
      steps: [
        { title: 'Esa tarde, en casa...', dur: 1.6 },
        { say: 'hija', text: 'Mamá, quiero cantar en el acto, pero cuando todos me miran me pongo muy colorada.', expr: 'sad' },
        { say: 'mama', text: 'A mí también me pasaba cuando era chiquita. La timidez no tiene nada de malo.', expr: 'love', act: 'hug' },
        { say: 'mama', text: 'Te propongo un truco: practiquemos con un público muy especial.', expr: 'wink', act: 'point' },
        { prop: 'teddy', id: 'oso1', x: 930, y: 900 },
        { sfx: 'pop', with: true },
        { prop: 'teddy', id: 'oso2', x: 1010, y: 900, delay: 0.25 },
        { sfx: 'pop', with: true },
        { mood: 'laugh', who: 'hija' },
        { sfx: 'giggle', with: true },
        { say: 'hija', text: '¡Mis ositos son el público! Bueno, voy a intentarlo.', expr: 'laugh', act: 'clap' },
        { do: 'dance', who: 'hija', dur: 2.4, expr: 'happy' },
        { fx: 'stars', x: 700, y: 460, dur: 2, with: true },
        { say: 'mama', text: '¡Muy bien! La valentía no es no tener miedo: es animarse aunque tengamos un poquito.', expr: 'proud', act: 'clap' },
      ],
    },
    {
      bg: 'school',
      cast: {
        nico: { x: 420, mood: 'happy' },
        lola: { x: 640, mood: 'excited' },
        hija: { x: 960, mood: 'worried' },
        maestra: { x: 1220, mood: 'happy', facing: -1 },
        mati: { x: 1460, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'El día del acto...', dur: 1.6 },
        { say: 'maestra', text: 'Y ahora, ¡un fuerte aplauso para Tini!', expr: 'excited', act: 'clap' },
        { do: 'clap', who: ['nico', 'lola', 'mati'], dur: 1.6, with: true },
        { say: 'hija', text: 'Tengo un poquito de miedo... pero me voy a animar. ¡Ahí va mi canción!', expr: 'worried', act: 'nod' },
        { mood: 'happy', who: 'hija' },
        { do: 'dance', who: 'hija', dur: 3, expr: 'happy' },
        { fx: 'stars', x: 960, y: 420, dur: 3, with: true },
        { sfx: 'sparkle', with: true },
        { sfx: 'tada', delay: 0.2 },
        { do: 'cheer', who: ['nico', 'lola', 'mati'], dur: 2, with: true },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { say: 'lola', text: '¡Cantaste increíble, amiga! ¡Eres muy valiente!', expr: 'excited', act: 'hug' },
        { mood: 'proud', who: 'hija' },
        { say: 'hija', text: '¡Pude hacerlo! Y lo mejor es que me divertí muchísimo.', expr: 'proud', act: 'cheer' },
        { say: 'narrador', text: 'Ser tímido está bien. Paso a paso, todos podemos animarnos a brillar.', delay: 0.4 },
      ],
    },
  ],
  youtube: {
    title: '¡Me Da Vergüenza! 🙈 La Timidez en Niños | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `La maestra invita a Tini a cantar en el acto de la escuela… ¡pero a ella le da muchísima vergüenza! 🙈 Luna le enseña un truco: practicar con un público de ositos. 🧸🎤 Un cuento infantil sobre la timidez, la vergüenza y cómo animarse de a poquito.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que ser tímido no tiene nada de malo
• A practicar para sentirnos más seguros
• Que la valentía es animarse aunque tengamos un poquito de miedo

👶 Ideal para niños de 3 a 8 años. Dibujos animados 3D en español, la timidez en niños, vergüenza, hablar en público, autoestima y educación emocional.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#timidez #vergüenza #niñostimidos #autoestima #educacionemocional #cuentosinfantiles #dibujosanimados #cuentosparaniños #animacion3d #español`,
    tags: [
      'timidez en niños',
      'niños tímidos',
      'me da vergüenza',
      'vergüenza para niños',
      'autoestima para niños',
      'hablar en público niños',
      'educación emocional para niños',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
