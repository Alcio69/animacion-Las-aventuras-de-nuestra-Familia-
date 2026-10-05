import type { Episode } from '../../engine/script';

/**
 * Capítulo 8 — El primer día de escuela (valor: animarse a lo nuevo, hacer amigos).
 * Guest: `lola` (Hija's best friend, from ep06). This episode tells how they met.
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep08-el-primer-dia-de-escuela',
  number: 8,
  title: 'El primer día de escuela',
  subtitle: 'Hija tiene miedo de su primer día… ¿y si no tiene amigos?',
  music: 'happy',
  thumb: { bg: 'school', text: '¡PRIMER DÍA!', prop: 'drawing', exprs: { hija: 'worried', hijo: 'happy', mama: 'love', papa: 'excited' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'worried' },
        mama: { x: 960, mood: 'happy', facing: -1 },
        hijo: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Hace un tiempo...', dur: 1.8 },
        { say: 'mama', text: '¡Hija, hoy es tu primer día de escuela!', expr: 'excited', act: 'cheer' },
        { say: 'hija', text: 'No quiero ir. ¿Y si nadie quiere ser mi amigo?', expr: 'sad', act: 'shake' },
        { say: 'hijo', text: 'Yo también tenía miedo el primer día. ¡Y ahora tengo un montón de amigos!', expr: 'happy', act: 'wave' },
        { say: 'mama', text: 'Vas a ver que te va a encantar. Y a la salida, yo te espero.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 800, y: 460, with: true, delay: 0.6 },
        { mood: 'worried', who: 'hija' },
        { do: 'nod', who: 'hija' },
      ],
    },
    {
      bg: 'school',
      cast: {
        mama: { x: 480, mood: 'love' },
        hija: { x: 760, mood: 'worried' },
        lola: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Que tengas un lindo día, mi amor.', expr: 'love', act: 'wave' },
        { do: 'wave', who: 'hija', with: true, delay: 0.5 },
        { do: 'walk', who: 'mama', to: -250 },
        { mood: 'sad', who: 'hija', with: true },
        { wait: 0.8 },
        { do: 'walk', who: 'lola', to: 1150 },
        { say: 'lola', text: '¡Hola! Me llamo Lola. ¿Quieres ser mi amiga?', expr: 'happy', act: 'wave' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¡Sí! ¡Me encantaría!', expr: 'excited', act: 'jump' },
        { prop: 'drawing', id: 'dibujo', x: 1050, y: HAND },
        { sfx: 'pop', with: true },
        { say: 'lola', text: '¿Te gusta dibujar? ¡Dibujemos juntas!', expr: 'excited', act: 'cheer' },
        { sfx: 'giggle', with: true, delay: 1.2 },
        { mood: 'laugh', who: ['hija', 'lola'] },
        { do: 'dance', who: ['hija', 'lola'], dur: 2.4 },
        { fx: 'stars', x: 950, y: 420, dur: 2, with: true },
      ],
    },
    {
      bg: 'school',
      cast: {
        hija: { x: 700, mood: 'excited' },
        lola: { x: 980, mood: 'happy', facing: -1 },
        mama: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'A la salida...', dur: 1.6 },
        { do: 'walk', who: 'mama', to: 1350 },
        { say: 'mama', text: '¿Cómo te fue, hija?', expr: 'happy' },
        { say: 'hija', text: '¡Súper bien! ¡Ella es Lola, mi nueva amiga!', expr: 'excited', act: 'point' },
        { say: 'lola', text: '¡Hasta mañana, amiga!', expr: 'happy', act: 'wave' },
        { say: 'hija', text: '¡Mamá, mañana quiero volver a la escuela!', expr: 'laugh', act: 'cheer' },
        { fx: 'hearts', x: 700, y: 480, with: true, delay: 0.4 },
        { sfx: 'tada', with: true },
        { do: 'dance', who: ['hija', 'lola', 'mama'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Lo nuevo puede dar miedo al principio, pero también puede ser maravilloso.', with: true, delay: 0.6 },
      ],
    },
  ],
  youtube: {
    title: 'Mi Primer Día de Escuela 🎒 ¡No Quiero Ir! | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `¡Hoy es el primer día de escuela de Hija! 🎒 Pero tiene miedo: "¿Y si nadie quiere ser mi amigo?" 😟 Así fue como conoció a Lola, ¡su mejor amiga! 💛 Un cuento infantil para acompañar a los niños en el comienzo de clases y en la adaptación escolar.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que está bien sentir miedo en el primer día de clases
• Cómo hacer nuevos amigos
• Que mamá y papá siempre vuelven a buscarnos

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, adaptación escolar, primer día de jardín o escuela y educación emocional para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#primerdiadeescuela #vueltaaclases #adaptacionescolar #cuentosinfantiles #dibujosanimados #cuentosparaniños #amistad #animacion3d #videosparaniños #español`,
    tags: [
      'primer día de escuela',
      'primer día de clases',
      'adaptación escolar',
      'no quiero ir a la escuela',
      'vuelta a clases',
      'hacer amigos',
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
