import type { Episode } from '../../engine/script';

/**
 * Capítulo 51 — ¡Me da miedo la vacuna! (valor: enfrentar el miedo; decir la verdad sobre lo que va a pasar;
 * herramientas: abrazo, respirar, contar, mirar a otro lado). Lio gets his school vaccine at Doctora Paz's office.
 * Honest framing: "un pinchacito que pasa rápido". No needle is shown. 'dentist' set = the doctor's office.
 * "In the hand" y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep51-me-da-miedo-la-vacuna',
  number: 51,
  title: '¡Me da miedo la vacuna!',
  subtitle: 'Lio tiene que ponerse una vacuna… ¡y está muerto de miedo!',
  music: 'happy',
  thumb: { bg: 'dentist', text: '¿VA A DOLER?', prop: 'bandaid', hero: ['hijo'], exprs: { hijo: 'worried' } },
  scenes: [
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 640, mood: 'happy' },
        papa: { x: 1000, mood: 'happy', facing: -1 },
        mama: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Mañana vamos a ver a la doctora Paz, hijo. Te toca una vacuna.', expr: 'happy', act: 'point' },
        { mood: 'worried', who: 'hijo' },
        { fx: 'sweat', x: 640, y: 470, with: true },
        { say: 'hijo', text: '¿Una vacuna? ¡No quiero! ¿Me va a doler mucho?', expr: 'worried', act: 'tremble' },
        { say: 'papa', text: 'Te voy a decir la verdad: vas a sentir un pinchacito, como un pellizco, y pasa muy rápido.', expr: 'love', act: 'nod' },
        { say: 'mama', text: 'Y vamos a estar contigo todo el tiempo. Te podemos abrazar fuerte.', expr: 'love', act: 'hug' },
        { say: 'hijo', text: 'Igual me da mucho miedo, mamá.', expr: 'sad', act: 'shrug' },
        { say: 'papa', text: 'Tener miedo está bien. Ser valiente es tener miedo, y hacerlo igual.', expr: 'proud', act: 'point' },
      ],
    },
    {
      bg: 'dentist',
      cast: {
        hijo: { x: 600, mood: 'worried' },
        mama: { x: 860, mood: 'love' },
        pediatra: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Al día siguiente...', dur: 1.6 },
        { say: 'pediatra', text: '¿Sabes para qué sirven las vacunas, Lio?', expr: 'happy', act: 'wave' },
        { say: 'hijo', text: 'No sé... ¿para que me duela el brazo?', expr: 'worried', act: 'shrug' },
        { sfx: 'giggle', with: true, delay: 1.6 },
        { say: 'pediatra', text: 'Las vacunas son como un escudo: entrenan a tu cuerpo para defenderse de los gérmenes.', expr: 'happy', act: 'point' },
        { fx: 'sparkle', x: 600, y: 520, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'pediatra', text: 'Te doy un truco: abraza a mamá, mira para otro lado, y contamos juntos hasta cinco.', expr: 'love', act: 'nod' },
        { do: 'walk', who: 'mama', to: 760 },
        { do: 'hug', who: ['hijo', 'mama'], dur: 4.6 },
        { say: 'hijo', text: 'Uno, dos, tres, cuatro, cinco.', expr: 'worried' },
        { sfx: 'pop', with: true, delay: 1.6 },
        { prop: 'bandaid', id: 'curita', x: 1010, y: HAND, scale: 2.2 },
        { mood: 'surprised', who: 'hijo' },
        { say: 'hijo', text: '¿Eso fue todo? ¡Fue solo un pinchacito!', expr: 'surprised', act: 'jump' },
        { say: 'pediatra', text: '¡Muy bien, Lio! Fuiste muy valiente. Aquí tienes una estrella de valiente.', expr: 'proud', act: 'clap' },
        { prop: 'star', id: 'estrella', x: 1080, y: HAND, scale: 1.3 },
        { sfx: 'tada', with: true },
        { fx: 'stars', x: 640, y: 480, with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'proud' },
        hija: { x: 800, mood: 'excited' },
        papa: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'star', id: 'estrella', x: 1030, y: HAND, scale: 1.3 },
        { title: 'Esa tarde...', dur: 1.6 },
        { say: 'hija', text: '¿Y te dolió mucho la vacuna, hermano?', expr: 'surprised', act: 'point' },
        { say: 'hijo', text: 'Fue solo un pinchacito. Tenía miedo, pero lo hice igual. ¡Soy un escudo contra los gérmenes!', expr: 'proud', act: 'cheer' },
        { say: 'papa', text: '¡Qué valiente fuiste, campeón! Estoy muy orgulloso.', expr: 'proud', act: 'clap' },
        { do: 'dance', who: ['hijo', 'hija', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Las vacunas nos cuidan. Y ser valiente es tener miedo, y animarse igual.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Me Da Miedo la Vacuna! 💉 Cuento para Ir a Vacunarse | Dibujos Animados para Niños en Español',
    description: `¡A Lio le toca una vacuna y está muerto de miedo! 😰 "¿Me va a doler mucho?" Max le dice la verdad: es un pinchacito, como un pellizco, y pasa muy rápido. En el consultorio, la doctora Paz le explica que las vacunas son como un escudo que entrena al cuerpo para defenderse de los gérmenes 🛡️, y le enseña un truco: abrazar a mamá, mirar para otro lado y contar hasta cinco. ¿Se animará Lio? ⭐ Un cuento infantil corto para perderle el miedo a las vacunas.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Para qué sirven las vacunas: son un escudo para nuestro cuerpo
• Trucos para el miedo: abrazar, respirar, mirar a otro lado y contar
• Que ser valiente es tener miedo y animarse igual

👨‍👩‍👧 Para papás y maestras: decirles la verdad ("es un pinchacito que pasa rápido") les da más confianza que decir "no te va a doler". Miren el video juntos antes de ir a vacunarse.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#vacunas #dibujosanimados #cuentosinfantiles`,
    tags: [
      'miedo a las vacunas',
      'cuento para vacunarse',
      'vacunas para niños',
      'miedo a las agujas',
      'ir al pediatra',
      'valentía para niños',
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
