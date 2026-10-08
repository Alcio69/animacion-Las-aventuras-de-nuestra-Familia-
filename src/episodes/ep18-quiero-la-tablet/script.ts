import type { Episode } from '../../engine/script';

/**
 * Capítulo 18 — ¡Quiero la tablet! (valor: manejar el berrinche, límites con las pantallas, jugar juntos).
 * A small table at x=900 holds the tablet / sand timer (y=760 = on the table).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const TABLE = { x: 900, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep18-quiero-la-tablet',
  number: 18,
  title: '¡Quiero la tablet!',
  subtitle: 'Lio no quiere soltar la tablet… ¡y se arma un berrinche!',
  music: 'happy',
  thumb: { bg: 'living', text: '¡QUIERO LA TABLET!', prop: 'tablet', exprs: { hijo: 'angry', mama: 'surprised', papa: 'worried', hija: 'surprised' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 640, mood: 'happy' },
        hija: { x: 420, mood: 'happy' },
        mama: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'tablet', id: 'tablet', x: TABLE.x - 40, y: ON_TABLE, with: true },
        { title: 'Toda la tarde con la tablet...', dur: 1.8 },
        { say: 'hija', text: 'Hermano, ¿quieres jugar a los bloques conmigo?', expr: 'happy', act: 'wave' },
        { say: 'hijo', text: '¡Ahora no puedo! ¡Estoy jugando con la tablet!', expr: 'neutral', act: 'shake' },
        { mood: 'sad', who: 'hija' },
        { say: 'mama', text: 'Hijo, ya pasaste toda la tarde con la tablet. Es hora de apagarla.', expr: 'happy' },
        { say: 'hijo', text: '¡No! ¡Cinco minutos más, por favor, por favor!', expr: 'worried', act: 'shake' },
        { say: 'mama', text: 'Ya es hora, mi amor. Apágala, por favor.', expr: 'neutral', act: 'point' },
        { mood: 'angry', who: 'hijo' },
        { do: 'jump', who: 'hijo', dur: 0.8 },
        { sfx: 'drum', with: true },
        { fx: 'exclaim', x: 640, y: 480, with: true },
        { say: 'hijo', text: '¡No es justo! ¡Nunca me dejas hacer nada!', expr: 'angry', act: 'tremble' },
        { mood: 'love', who: 'mama' },
        { do: 'walk', who: 'mama', to: 1120 },
        { say: 'mama', text: 'Entiendo que estás enojado. Respira conmigo: aire adentro... y aire afuera.', expr: 'love', act: 'hug' },
        { do: 'nod', who: 'hijo', dur: 1.2 },
        { mood: 'sad', who: 'hijo', with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 640, mood: 'sad' },
        hija: { x: 420, mood: 'happy' },
        mama: { x: 1160, mood: 'love', facing: -1 },
        papa: { x: 2250, mood: 'excited', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'timer', id: 'reloj', x: TABLE.x - 40, y: ON_TABLE, with: true },
        { say: 'mama', text: 'Hagamos un trato: mañana usas la tablet hasta que este reloj de arena se termine.', expr: 'happy', act: 'point' },
        { say: 'hijo', text: '¿Y ahora qué hago? Me voy a aburrir muchísimo.', expr: 'sad', act: 'shrug' },
        { do: 'walk', who: 'papa', to: 1440 },
        { say: 'papa', text: '¿Aburrirte? ¡Yo tengo una idea mucho mejor!', expr: 'excited', act: 'cheer' },
        { say: 'papa', text: '¡Construyamos el castillo más alto del mundo! ¿Quién se anima?', expr: 'happy', act: 'point' },
        { mood: 'excited', who: ['hija', 'hijo'] },
        { say: 'hija', text: '¡Yo quiero! ¡Vamos a hacerlo todos juntos!', expr: 'excited', act: 'jump' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 460, mood: 'excited' },
        hijo: { x: 720, mood: 'happy' },
        papa: { x: 1180, mood: 'happy', facing: -1 },
        mama: { x: 1440, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'block', id: 'b1', x: 880, y: 900, scale: 1.7 },
        { sfx: 'pop', with: true },
        { prop: 'block', id: 'b2', x: 1000, y: 900, scale: 1.7, delay: 0.3 },
        { sfx: 'pop', with: true },
        { prop: 'block', id: 'b3', x: 940, y: 820, scale: 1.7, delay: 0.3 },
        { sfx: 'pop', with: true },
        { prop: 'star', id: 'cima', x: 940, y: 700, delay: 0.3 },
        { sfx: 'ding', with: true },
        { fx: 'sparkle', x: 940, y: 560, with: true },
        { mood: 'laugh', who: ['hija', 'hijo'] },
        { say: 'hijo', text: '¡Nuestro castillo quedó increíble! ¡Esto es más divertido que la tablet!', expr: 'laugh', act: 'cheer' },
        { say: 'mama', text: 'La tablet está bien un ratito. Pero jugar juntos es lo mejor de todo.', expr: 'love', act: 'nod' },
        { say: 'hijo', text: 'Perdón por enojarme, mamá. Mañana uso el reloj de arena.', expr: 'love', act: 'hug' },
        { do: 'dance', who: ['hija', 'hijo', 'papa', 'mama'], dur: 3, expr: 'laugh' },
        { fx: 'confetti', x: 940, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Las pantallas pueden esperar. ¡El mejor juego es el que compartimos!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Quiero la Tablet! 📱 Berrinches y Pantallas | Dibujos Animados para Niños en Español',
    description: `Lio pasó toda la tarde con la tablet 📱 y cuando Luna le pide que la apague… ¡se arma un berrinche! 😤 Luna lo ayuda a calmarse respirando, le propone un trato con un reloj de arena ⏳ y Max tiene una idea: ¡construir el castillo más alto del mundo! 🏰 Un cuento infantil corto sobre los berrinches y el tiempo de pantalla.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• A calmarnos respirando cuando estamos enojados
• Que las pantallas están bien un ratito
• Que jugar juntos es lo más divertido

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué te gusta jugar sin pantallas? ¡Armen juntos su propio reloj de arena para la tablet!"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#berrinches #dibujosanimados #cuentosinfantiles`,
    tags: [
      'berrinches',
      'berrinches en niños',
      'rabietas',
      'niños y pantallas',
      'tiempo de pantalla niños',
      'quiero la tablet',
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
