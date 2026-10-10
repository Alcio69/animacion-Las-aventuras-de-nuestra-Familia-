import type { Episode } from '../../engine/script';

/**
 * Capítulo 37 — Cada uno a su ritmo (valor: no compararse; cada uno aprende a su tiempo; practicar un poquito cada día).
 * Lola already reads whole stories and Tini doesn't; with practice and family support Tini reads her first page.
 * Book "in the hand" at y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep37-cada-uno-a-su-ritmo',
  number: 37,
  title: 'Cada uno a su ritmo',
  subtitle: 'Lola ya lee cuentos enteros y Tini todavía no… ¿será la peor de la clase?',
  music: 'happy',
  thumb: { bg: 'school', text: '¡YA SÉ LEER!', prop: 'book', exprs: { hija: 'proud', lola: 'excited', maestra: 'happy', hijo: 'laugh' }, cast: ['lola', 'hija', 'maestra', 'hijo'] },
  scenes: [
    {
      bg: 'school',
      cast: {
        lola: { x: 560, mood: 'happy' },
        hija: { x: 840, mood: 'happy' },
        maestra: { x: 1330, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'book', id: 'libro', x: 700, y: HAND },
        { say: 'maestra', text: 'Lola, ¿nos lees la primera página del cuento?', expr: 'happy', act: 'point' },
        { say: 'lola', text: 'Había una vez un gatito que quería volar hasta las nubes.', expr: 'happy' },
        { say: 'maestra', text: '¡Muy bien, Lola! Ahora te toca a ti, Tini.', expr: 'proud', act: 'clap' },
        { mood: 'worried', who: 'hija' },
        { fx: 'sweat', x: 840, y: 480, with: true },
        { say: 'hija', text: 'Es que yo todavía no sé leer tan rápido, maestra.', expr: 'worried', act: 'shrug' },
        { say: 'maestra', text: 'No te preocupes, Tini. Puedes leer otro día.', expr: 'love', act: 'nod' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 560, mood: 'sad' },
        hijo: { x: 820, mood: 'happy' },
        mama: { x: 1200, mood: 'love', facing: -1 },
        papa: { x: 1460, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: 'Mi amiga Lola ya sabe leer cuentos enteros y yo no. ¡Soy la peor de la clase!', expr: 'sad', act: 'tremble' },
        { say: 'mama', text: 'No eres la peor, hija. Cada uno aprende a su ritmo.', expr: 'love', act: 'hug' },
        { say: 'mama', text: '¿Sabes? Yo tardé muchísimo en aprender a andar en bicicleta. Mis amigas ya andaban y yo no.', expr: 'happy' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¿De verdad, mamá? ¿Y cómo hiciste?', expr: 'surprised' },
        { say: 'mama', text: 'Practiqué un poquito todos los días, sin apuro. ¡Y un día lo logré!', expr: 'proud', act: 'nod' },
        { say: 'papa', text: 'Y mira todo lo que tú sí sabes hacer: dibujas hermoso, cantas lindísimo y cuidas muy bien a Burbuja.', expr: 'love', act: 'point' },
        { say: 'hijo', text: '¡Y yo te ayudo a practicar todas las noches, hermanita!', expr: 'excited', act: 'cheer' },
        { mood: 'happy', who: 'hija' },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 640, mood: 'happy' },
        hijo: { x: 1000, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'book', id: 'libro', x: 820, y: HAND },
        { title: 'Cada noche, un ratito...', dur: 1.8 },
        { say: 'hija', text: 'Había una vez... un gatito... que quería volar.', expr: 'happy', act: 'think' },
        { say: 'hijo', text: '¡Muy bien! ¡Cada día lees mejor, hermanita!', expr: 'excited', act: 'clap' },
        { fx: 'stars', x: 820, y: 460, with: true },
        { sfx: 'sparkle', with: true },
      ],
    },
    {
      bg: 'school',
      cast: {
        lola: { x: 560, mood: 'happy' },
        hija: { x: 840, mood: 'happy' },
        maestra: { x: 1330, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'book', id: 'libro', x: 700, y: HAND },
        { title: 'Unas semanas después...', dur: 1.8 },
        { say: 'maestra', text: 'Hoy es un buen día para leer. ¿Te animas, Tini?', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¡Claro que sí! Había una vez un gatito que quería volar hasta las nubes.', expr: 'proud', act: 'nod' },
        { fx: 'confetti', x: 840, y: 320, dur: 2.5, with: true, delay: 2 },
        { sfx: 'tada', with: true },
        { say: 'lola', text: '¡Muy bien, amiga! ¡Qué lindo leíste!', expr: 'excited', act: 'clap' },
        { say: 'maestra', text: 'Practicaste un poquito todos los días, y se nota muchísimo.', expr: 'proud', act: 'clap' },
        { say: 'hija', text: '¡Me siento muy orgullosa de mí misma!', expr: 'proud', act: 'cheer' },
        { do: 'dance', who: ['lola', 'hija'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'No hace falta compararse: cada uno aprende a su ritmo, y todos podemos lograrlo.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Cada Uno a su Ritmo 📖 No Compararse | Dibujos Animados para Niños en Español',
    description: `En la escuela, Lola ya lee cuentos enteros… y Tini todavía no. 📖😢 "¡Soy la peor de la clase!", dice. Pero Luna le cuenta que de chiquita tardó muchísimo en aprender a andar en bici, Max le recuerda todo lo que ella sí sabe hacer y Lio la ayuda a practicar cada noche. 💛 ¿Se animará Tini a leer delante de todos? Un cuento infantil corto sobre no compararse y aprender a su tiempo.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que cada uno aprende a su ritmo
• Que no hace falta compararse con los demás
• Que practicar un poquito cada día da resultados

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué cosa te costó aprender y ahora sabes hacer muy bien?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#autoestima #dibujosanimados #cuentosinfantiles`,
    tags: [
      'no compararse',
      'autoestima para niños',
      'aprender a leer',
      'cada niño a su ritmo',
      'frustración en niños',
      'perseverancia para niños',
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
