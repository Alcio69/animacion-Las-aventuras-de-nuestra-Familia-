import type { Episode } from '../../engine/script';

/**
 * Capítulo 1 — La torta sorpresa (piloto).
 * Floor is y=930. Screen x goes 0 (left) → 1920 (right). Off-screen: -250 / 2200.
 */
const episode: Episode = {
  id: 'ep01-la-torta-sorpresa',
  number: 1,
  title: 'La torta sorpresa',
  subtitle: 'Max y los chicos preparan algo muy especial para Luna',
  music: 'happy',
  thumb: { bg: 'kitchen', text: '¡TORTA SORPRESA!', prop: 'cake', exprs: { hija: 'surprised', hijo: 'laugh', papa: 'excited', mama: 'love' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        papa: { x: 560, mood: 'happy' },
        mama: { x: 1500, mood: 'happy', facing: -1 },
        hijo: { x: 860, mood: 'happy' },
        hija: { x: 1130, mood: 'happy' },
      },
      steps: [
        { say: 'mama', text: '¡Voy a comprar flores! Vuelvo en un ratito.', act: 'wave' },
        { do: 'walk', who: 'mama', to: 2250 },
        { say: 'hija', text: '¡Papá! ¡Hoy es el cumpleaños de mamá!', expr: 'excited', act: 'jump' },
        { say: 'papa', text: '¡Es verdad! ¿Y si le hacemos una torta sorpresa?', act: 'think' },
        { say: 'hijo', text: '¡Sí! ¡Yo sé batir los huevos!', expr: 'excited', act: 'cheer' },
        { do: 'cheer', who: ['papa', 'hija'], with: true, delay: 0.3 },
        { sfx: 'tada', with: true },
      ],
    },
    {
      bg: 'kitchen',
      zoom: [1.02, 1.08],
      cast: {
        papa: { x: 780, mood: 'happy', facing: -1 },
        hijo: { x: 1080, mood: 'happy' },
        hija: { x: 1340, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'flour', id: 'harina', x: 330, y: 562 },
        { prop: 'bowl', id: 'bowl', x: 1180, y: 562, with: true, delay: 0.2 },
        { sfx: 'pop', with: true },
        { say: 'papa', text: 'Primero, la harina. ¡Con cuidado!', act: 'point' },
        { say: 'hija', text: '¡Yo la pongo! ¡Yo, yo, yo!', expr: 'excited', act: 'jump' },
        { do: 'run', who: 'hija', to: 450 },
        { fx: 'flour', x: 450, y: 720, dur: 2.2 },
        { sfx: 'poof', with: true },
        { mood: 'surprised', who: ['papa', 'hijo', 'hija'], with: true },
        { wait: 0.6 },
        { sfx: 'giggle' },
        { say: 'hijo', text: '¡Mira! ¡Hay harina por todos lados!', expr: 'laugh', act: 'clap' },
        { mood: 'laugh', who: ['papa', 'hija'], with: true },
        { say: 'papa', text: 'No importa. ¡Lo importante es hacerlo juntos!', expr: 'happy', act: 'hug' },
        { title: 'Un ratito después...', dur: 1.8 },
        { removeProp: 'bowl' },
        { prop: 'cake', id: 'torta', x: 1180, y: 562 },
        { fx: 'sparkle', x: 1180, y: 400, with: true },
        { sfx: 'ding', with: true },
        { mood: 'love', who: ['papa', 'hijo', 'hija'], with: true },
        { say: 'hijo', text: '¡Quedó hermosa!', expr: 'love', act: 'cheer' },
      ],
    },
    {
      bg: 'living',
      zoom: [1, 1.03],
      cast: {
        papa: { x: 380, mood: 'happy' },
        hijo: { x: 1000, mood: 'happy' },
        hija: { x: 1220, mood: 'happy' },
        mama: { x: 2250, facing: -1, mood: 'neutral' },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 700, y: 900 },
        { prop: 'cake', id: 'torta', x: 700, y: 742, scale: 0.8, with: true },
        { say: 'papa', text: '¡Silencio, ahí viene mamá!', expr: 'excited', act: 'point' },
        { sfx: 'doorbell' },
        { do: 'walk', who: 'mama', to: 1530 },
        { say: 'hija', text: '¡SORPRESA!', expr: 'excited', act: 'cheer' },
        { do: 'cheer', who: ['papa', 'hijo'], with: true },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'mama', text: '¡Una torta! Y está llena de harina... ¡como ustedes!', expr: 'laugh' },
        { say: 'papa', text: 'La hicimos con mucho amor.', expr: 'proud', act: 'hips' },
        { say: 'mama', text: '¡Es el mejor regalo del mundo! Los quiero mucho.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 1530, y: 520, with: true, delay: 0.5 },
        { do: 'dance', who: ['papa', 'mama', 'hijo', 'hija'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Y así, la familia aprendió que lo más rico de todo... es compartir.', with: true, delay: 0.6 },
      ],
    },
  ],
  youtube: {
    title: 'La Torta Sorpresa 🎂 Cumpleaños de Mamá | Dibujos Animados para Niños en Español',
    description: `¡Hoy es el cumpleaños de mamá! 🎂 Max, Lio y Tini le preparan a Luna una torta sorpresa… ¡pero la harina vuela por toda la cocina! 😂 Un cuento infantil corto sobre la familia, el trabajo en equipo y demostrar amor.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que lo importante es hacer las cosas juntos
• Que equivocarse también puede ser divertido
• A demostrar amor con pequeños detalles

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué sorpresa le harías tú a alguien que quieres?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#dibujosanimados #cuentosinfantiles #cumpleaños`,
    tags: [
      'dibujos animados para niños',
      'dibujos animados en español',
      'cuentos infantiles',
      'cuentos para niños',
      'cumpleaños de mamá',
      'feliz cumpleaños mamá',
      'torta sorpresa',
      'cuento de cumpleaños',
      'videos para niños',
      'cuentos con valores',
      'historias para niños',
      'animación 3d infantil',
      'caricaturas en español',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
