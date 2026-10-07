import type { Episode } from '../../engine/script';

/**
 * Capítulo 2 — La pelota de todos (valor: compartir).
 * Floor is y=930. Screen x goes 0 (left) → 1920 (right). Off-screen: -250 / 2250.
 */
const episode: Episode = {
  id: 'ep02-la-pelota-de-todos',
  number: 2,
  title: 'La pelota de todos',
  subtitle: 'Lio estrena una pelota… ¿la va a compartir con su hermana?',
  music: 'happy',
  thumb: { bg: 'park', text: '¡ES MÍA!', prop: 'ball', exprs: { hijo: 'angry', hija: 'sad', papa: 'surprised', mama: 'worried' } },
  scenes: [
    {
      bg: 'park',
      cast: {
        hijo: { x: 820, mood: 'excited' },
        hija: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 1000, y: 930 },
        { sfx: 'pop', with: true },
        { say: 'hijo', text: '¡Miren mi pelota nueva! ¡Es la más linda del mundo!', act: 'cheer' },
        { moveProp: 'pelota', x: 1250, y: 930, dur: 1.4, arc: 170, bounces: 2 },
        { sfx: 'boing', with: true },
        { do: 'run', who: 'hijo', to: 1100, with: true, delay: 0.2 },
        { do: 'walk', who: 'hija', to: 1550 },
        { say: 'hija', text: '¡Qué linda! ¿Puedo jugar contigo?', expr: 'happy', act: 'wave' },
        { say: 'hijo', text: '¡No! Es mía. Es solo para mí.', expr: 'angry', act: 'hips' },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: 'Bueno...', expr: 'sad', pause: 0.6 },
        { do: 'walk', who: 'hija', to: 1800, dur: 1.8 },
        { mood: 'neutral', who: 'hijo', with: true },
      ],
    },
    {
      bg: 'park',
      zoom: [1.12, 1.2],
      cast: {
        hijo: { x: 820, mood: 'neutral' },
        mama: { x: 2250, mood: 'worried', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 640, y: 930 },
        { do: 'walk', who: 'mama', to: 1180 },
        { say: 'mama', text: 'Hijo, ¿por qué tu hermana está tan triste?', expr: 'worried' },
        { say: 'hijo', text: 'Porque no le quise prestar mi pelota...', expr: 'sad', act: 'shrug' },
        { say: 'mama', text: 'Jugar solo puede ser divertido. Pero jugar juntos es el doble de divertido.', expr: 'happy' },
        { do: 'think', who: 'hijo', dur: 2 },
        { fx: 'question', x: 820, y: 330, dur: 1.8, with: true },
        { mood: 'excited', who: 'hijo' },
        { say: 'hijo', text: '¡Tienes razón, mamá! ¡Ya sé qué hacer!', act: 'jump' },
        { fx: 'sparkle', x: 820, y: 380, with: true, delay: 0.3 },
        { sfx: 'ding', with: true, delay: 0.3 },
      ],
    },
    {
      bg: 'park',
      cast: {
        hija: { x: 1360, mood: 'sad', facing: -1 },
        hijo: { x: 400, mood: 'happy' },
        papa: { x: 2250, mood: 'happy', facing: -1 },
        mama: { x: -250, mood: 'happy' },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 560, y: 930 },
        { do: 'walk', who: 'hijo', to: 980 },
        { moveProp: 'pelota', x: 1120, y: 930, dur: 1.5, with: true },
        { say: 'hijo', text: 'Hermanita, perdón. ¿Quieres jugar conmigo?', expr: 'love' },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Claro que sí! ¡Gracias, hermano!', act: 'jump' },
        { fx: 'hearts', x: 1360, y: 420, with: true },
        { moveProp: 'pelota', x: 1240, y: 930, dur: 1.1, arc: 220, bounces: 1 },
        { sfx: 'boing', with: true },
        { moveProp: 'pelota', x: 1080, y: 930, dur: 1.1, arc: 240, bounces: 1 },
        { sfx: 'boing', with: true },
        { sfx: 'giggle', with: true, delay: 0.3 },
        { mood: 'laugh', who: ['hijo', 'hija'], with: true },
        { do: 'walk', who: 'papa', to: 1640 },
        { say: 'papa', text: '¿Y yo puedo jugar también?', expr: 'excited', act: 'wave' },
        { say: 'hijo', text: '¡Claro, papá! ¡Cuantos más, mejor!', expr: 'excited', act: 'cheer' },
        { do: 'walk', who: 'mama', to: 600, with: true },
        { moveProp: 'pelota', x: 1500, y: 960, dur: 1.2, arc: 260, bounces: 1 },
        { sfx: 'boing', with: true },
        { do: 'dance', who: ['papa', 'mama', 'hijo', 'hija'], dur: 3.2, expr: 'laugh' },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Cuando compartimos, la alegría se multiplica.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'La Pelota de Todos ⚽ Aprender a Compartir | Dibujos Animados para Niños en Español',
    description: `Lio estrena una pelota nueva y no se la quiere prestar a su hermanita Tini. 😢 Pero Luna le enseña un secreto: ¡jugar juntos es el doble de divertido! ⚽💛 Un cuento infantil corto sobre aprender a compartir.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que compartir multiplica la alegría
• A pedir perdón cuando lastimamos a alguien
• Que jugar juntos es más divertido que jugar solos

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué juguete te gusta compartir? ¿Y cuál te cuesta más prestar?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#dibujosanimados #cuentosinfantiles #compartir`,
    tags: [
      'dibujos animados para niños',
      'dibujos animados en español',
      'cuentos infantiles',
      'cuentos para niños',
      'aprender a compartir',
      'compartir para niños',
      'cuento sobre compartir',
      'hermanos',
      'celos entre hermanos',
      'videos para niños',
      'cuentos con valores',
      'animación 3d infantil',
      'caricaturas en español',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
