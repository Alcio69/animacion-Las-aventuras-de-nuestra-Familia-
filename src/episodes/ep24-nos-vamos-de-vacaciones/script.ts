import type { Episode } from '../../engine/script';

/**
 * Capítulo 24 — ¡Nos vamos de vacaciones! (valor: disfrutar juntos; no frustrarse cuando algo sale distinto).
 * Packing at home, then the beach (`bg: 'beach'`, variant 'sunset'): a wave knocks the sand castle down.
 * At the beach every prop height is real (like the park). Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep24-nos-vamos-de-vacaciones',
  number: 24,
  title: '¡Nos vamos de vacaciones!',
  subtitle: 'La familia se va a la playa… ¡y una ola se lleva el castillo de arena!',
  music: 'happy',
  thumb: { bg: 'beach', text: '¡VACACIONES!', prop: 'sandcastle', exprs: { papa: 'laugh', mama: 'happy', hijo: 'excited', hija: 'excited' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 480, mood: 'excited' },
        hija: { x: 1280, mood: 'excited', facing: -1 },
        papa: { x: -250, mood: 'happy' },
      },
      steps: [
        { prop: 'suitcase', id: 'valija', x: 880, y: 900 },
        { say: 'hijo', text: '¡Mañana nos vamos de vacaciones a la playa! ¡No puedo esperar!', expr: 'excited', act: 'jump' },
        { say: 'hija', text: '¡Voy a llevar todos mis juguetes! ¡Los muñecos, los bloques y la pelota!', expr: 'laugh', act: 'cheer' },
        { prop: 'toybox', id: 'juguetes', x: 1060, y: 900 },
        { sfx: 'pop', with: true },
        { do: 'walk', who: 'papa', to: 680 },
        { say: 'papa', text: '¡Esa valija va a explotar! Elijan un juguete cada uno, ¿sí?', expr: 'laugh', act: 'point' },
        { sfx: 'giggle', with: true },
        { say: 'hijo', text: 'Entonces yo llevo la pala y el balde. ¡Para hacer castillos de arena!', expr: 'happy', act: 'nod' },
      ],
    },
    {
      bg: 'beach',
      cast: {
        hijo: { x: 520, mood: 'excited' },
        hija: { x: 1240, mood: 'excited', facing: -1 },
        papa: { x: 1500, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'umbrella', id: 'sombrilla', x: 330, y: 900 },
        { prop: 'sandcastle', id: 'castillo', x: 880, y: 900, with: true },
        { title: 'En la playa...', dur: 1.6 },
        { say: 'hija', text: '¡Nuestro castillo de arena es el más lindo de toda la playa!', expr: 'laugh', act: 'clap' },
        { sfx: 'whoosh', delay: 0.3 },
        { removeProp: 'castillo', delay: 0.5 },
        { fx: 'sparkle', x: 880, y: 760, with: true },
        { sfx: 'poof', with: true },
        { mood: 'surprised', who: ['hija', 'hijo'] },
        { say: 'hija', text: '¡No puede ser! ¡Una ola se llevó nuestro castillo!', expr: 'sad', act: 'tremble' },
        { mood: 'sad', who: ['hija', 'hijo'] },
        { say: 'hijo', text: 'Con todo lo que trabajamos... ¡Qué mala suerte!', expr: 'sad', act: 'shrug' },
        { say: 'papa', text: '¿Saben qué? ¡Podemos hacer uno nuevo, más grande y más lejos del agua!', expr: 'excited', act: 'cheer' },
        { mood: 'excited', who: ['hija', 'hijo'] },
        { say: 'hija', text: '¡Sí, papá! ¡Esta vez lo hacemos todos juntos!', expr: 'excited', act: 'jump' },
      ],
    },
    {
      bg: 'beach',
      variant: 'sunset',
      cast: {
        hijo: { x: 460, mood: 'happy' },
        hija: { x: 700, mood: 'happy' },
        papa: { x: 1220, mood: 'happy', facing: -1 },
        mama: { x: 1480, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'sandcastle', id: 'castillo2', x: 950, y: 900, scale: 1.35 },
        { sfx: 'tada', with: true },
        { fx: 'stars', x: 950, y: 520, with: true },
        { say: 'mama', text: '¡Qué castillo tan grande! ¡Es el mejor de todos!', expr: 'excited', act: 'clap' },
        { say: 'hijo', text: 'El primero se lo llevó el mar, pero este lo hicimos entre todos.', expr: 'proud', act: 'point' },
        { say: 'hija', text: '¡Estas son las mejores vacaciones del mundo!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hijo', 'hija', 'papa', 'mama'], dur: 3, expr: 'laugh' },
        { fx: 'confetti', x: 950, y: 300, dur: 3, with: true },
        { say: 'narrador', text: 'Las mejores vacaciones no son las perfectas: son las que compartimos en familia.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Nos Vamos de Vacaciones! 🏖️ Un Día en la Playa | Dibujos Animados para Niños en Español',
    description: `¡Llegaron las vacaciones! 🏖️☀️ La familia se va a la playa y Lio y Tini construyen el castillo de arena más lindo… ¡hasta que una ola se lo lleva! 🌊😢 Max tiene una idea: hacer uno nuevo, más grande y más lejos del agua, ¡todos juntos! 🏰 Un cuento infantil corto sobre la frustración y el trabajo en equipo.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• A no rendirnos cuando algo sale mal
• Que juntos podemos hacer cosas más grandes
• Que las mejores vacaciones son las que compartimos en familia

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué es lo que más te gusta hacer en vacaciones? ¿Qué harías si una ola se lleva tu castillo?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#vacaciones #dibujosanimados #cuentosinfantiles`,
    tags: [
      'vacaciones para niños',
      'vacaciones en la playa',
      'la playa dibujos animados',
      'castillo de arena',
      'verano en familia',
      'frustración en niños',
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
