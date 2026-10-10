import type { Episode } from '../../engine/script';

/**
 * Capítulo 38 — Un ratito para mamá y papá (valor: empatía con los papás; ellos también se cansan y necesitan tiempo para sí mismos).
 * After a long week Max and Luna are tired; Lio and Tini give them "an afternoon of rest" and play quietly on their own.
 * Book / teacup "in the hand" at y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep38-un-ratito-para-mama-y-papa',
  number: 38,
  title: 'Un ratito para mamá y papá',
  subtitle: 'Max y Luna están muy cansados… y Lio y Tini les hacen un regalo especial',
  music: 'calm',
  thumb: { bg: 'living', text: '¡A DESCANSAR!', prop: 'teacup', exprs: { papa: 'sleepy', mama: 'love', hijo: 'excited', hija: 'laugh' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 480, mood: 'excited' },
        hija: { x: 740, mood: 'excited' },
        papa: { x: 1180, mood: 'sleepy', facing: -1 },
        mama: { x: 1440, mood: 'sleepy', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 600, y: 960 },
        { say: 'hijo', text: '¿Jugamos a la pelota, papá? ¿Y a las escondidas? ¿Y a los caballitos?', expr: 'excited', act: 'jump' },
        { say: 'papa', text: 'Hoy estoy muy cansado, campeón. Trabajé muchísimo toda la semana.', expr: 'sleepy', act: 'shrug' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¡Pero tú siempre juegas con nosotros, papá!', expr: 'surprised', act: 'point' },
        { say: 'mama', text: 'Los papás también se cansan, mi amor. Y a veces necesitamos un ratito para nosotros.', expr: 'love', act: 'nod' },
        { say: 'hijo', text: '¿Un ratito para ustedes? ¿Y qué hacen en ese ratito?', expr: 'surprised', act: 'think' },
        { say: 'mama', text: 'Papá quiere leer su libro tranquilo, y yo quiero tomar un té calentito.', expr: 'happy', act: 'point' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 640, mood: 'happy' },
        hija: { x: 920, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hijo', text: '¡Ya sé, hermanita! Les regalamos una tarde de descanso.', expr: 'excited', act: 'point' },
        { say: 'hija', text: '¡Qué buena idea! Y nosotros jugamos solitos, sin hacer lío.', expr: 'excited', act: 'jump' },
        { prop: 'teacup', id: 'te', x: 1120, y: 562 },
        { sfx: 'ding', with: true },
        { say: 'hijo', text: 'Primero le preparamos el té a mamá. ¡Con mucho cuidado!', expr: 'proud', act: 'nod' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 480, mood: 'happy' },
        hija: { x: 740, mood: 'happy' },
        papa: { x: 1180, mood: 'happy', facing: -1 },
        mama: { x: 1440, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'book', id: 'libro', x: 1020, y: HAND },
        { prop: 'teacup', id: 'te', x: 1300, y: HAND, with: true },
        { prop: 'block', id: 'b1', x: 580, y: 950, with: true },
        { prop: 'block', id: 'b2', x: 640, y: 950, with: true },
        { prop: 'block', id: 'b3', x: 610, y: 860, with: true },
        { title: 'Esa tarde...', dur: 1.6 },
        { say: 'hija', text: 'Hablemos bajito, hermano, así papá y mamá descansan.', expr: 'wink' },
        { say: 'hijo', text: 'Muy bien. Hagamos la torre más alta del mundo, pero sin ruido.', expr: 'happy', act: 'nod' },
        { say: 'papa', text: 'Ahora sí puedo leer tranquilo. Gracias, chicos.', expr: 'love' },
        { say: 'mama', text: 'Este té está riquísimo. ¡Son los mejores!', expr: 'love', act: 'nod' },
        { fx: 'hearts', x: 1300, y: 480, with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 480, mood: 'happy' },
        hija: { x: 740, mood: 'happy' },
        papa: { x: 1180, mood: 'excited', facing: -1 },
        mama: { x: 1440, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 960, y: 960 },
        { title: 'Un rato después...', dur: 1.6 },
        { say: 'papa', text: '¡Ahora sí! ¡Tengo muchísima energía para jugar! ¿A qué jugamos?', expr: 'excited', act: 'cheer' },
        { say: 'mama', text: 'Descansar un ratito nos hizo muy bien. ¡Gracias por cuidarnos, mis amores!', expr: 'love', act: 'hug' },
        { say: 'hija', text: '¡A la pelota! ¡Todos juntos!', expr: 'laugh', act: 'jump' },
        { moveProp: 'pelota', x: 1180, y: 960, dur: 0.9, arc: 120 },
        { sfx: 'boing', with: true },
        { do: 'dance', who: ['hijo', 'hija', 'papa', 'mama'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Los papás también necesitan descansar. Un ratito para ellos es un regalo para toda la familia.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Un Ratito para Mamá y Papá ☕ Los Papás También Descansan | Dibujos Animados para Niños en Español',
    description: `Lio y Tini quieren jugar a la pelota, a las escondidas y a los caballitos… pero Max y Luna están muy cansados después de una semana larguísima. 😴 Luna les explica que los papás también necesitan un ratito para ellos. ¡Entonces los chicos tienen una idea! Les regalan una tarde de descanso: un té calentito, un libro tranquilo y juegos sin ruido. ☕📖 Un cuento infantil corto sobre la empatía con los papás.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que los papás también se cansan
• Que todos necesitamos un ratito para nosotros
• A cuidar a los que nos cuidan

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué podemos hacer para que mamá y papá descansen un ratito?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#familia #dibujosanimados #cuentosinfantiles`,
    tags: [
      'los papás también se cansan',
      'tiempo para los papás',
      'descanso de los padres',
      'empatía para niños',
      'cuidar a los papás',
      'jugar solos',
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
