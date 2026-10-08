import type { Episode } from '../../engine/script';

/**
 * Capítulo 23 — ¡No me hables así! (valor: respeto; se puede estar enojado y hablar con respeto; pedir perdón).
 * Mamá asks the kids to set the table; they answer her rudely. Papá helps them see how it felt.
 * Kitchen table at x=960 (plates at y=760 = on the table). Keep characters between x≈400 and x≈1550.
 */
const TABLE = { x: 960, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep23-no-me-hables-asi',
  number: 23,
  title: '¡No me hables así!',
  subtitle: 'Lio y Tini le contestan mal a Luna… y ella se pone muy triste',
  music: 'calm',
  thumb: { bg: 'kitchen', text: '¡NO ME HABLES ASÍ!', prop: 'plate', exprs: { hijo: 'angry', hija: 'angry', mama: 'sad', papa: 'surprised' } },
  scenes: [
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 480, mood: 'happy' },
        hija: { x: 720, mood: 'happy' },
        mama: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'ball', id: 'pelota', x: 600, y: 960, with: true },
        { say: 'mama', text: 'Chicos, la comida está casi lista. ¿Me ayudan a poner la mesa?', expr: 'happy', act: 'point' },
        { mood: 'angry', who: 'hijo' },
        { say: 'hijo', text: '¡Siempre nosotros! ¡Hazlo tú, que estamos jugando!', expr: 'angry', act: 'shake' },
        { mood: 'angry', who: 'hija' },
        { say: 'hija', text: '¡Es verdad! ¡Mamá, eres muy pesada!', expr: 'angry', act: 'hips' },
        { mood: 'sad', who: 'mama' },
        { wait: 0.8 },
        { say: 'mama', text: 'Me duele mucho que me hablen así.', expr: 'sad' },
        { do: 'walk', who: 'mama', to: 2250, dur: 2.6 },
        { mood: 'worried', who: ['hijo', 'hija'] },
        { fx: 'question', x: 600, y: 480, with: true },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 480, mood: 'worried' },
        hija: { x: 720, mood: 'worried' },
        papa: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { do: 'walk', who: 'papa', to: 1280 },
        { say: 'papa', text: 'Chicos, mamá está muy triste. ¿Qué pasó?', expr: 'worried' },
        { say: 'hijo', text: 'Nos pidió ayuda y le contestamos mal. Estábamos jugando y nos enojamos.', expr: 'sad', act: 'shrug' },
        { say: 'papa', text: 'Está bien enojarse. Pero aunque estemos enojados, siempre podemos hablar con respeto.', expr: 'love', act: 'nod' },
        { say: 'papa', text: '¿Cómo se sentirían ustedes si alguien que los quiere les hablara así?', expr: 'happy', act: 'point' },
        { do: 'think', who: ['hijo', 'hija'], dur: 1.6 },
        { mood: 'sad', who: ['hijo', 'hija'] },
        { say: 'hija', text: 'Nos sentiríamos muy tristes. Mamá siempre nos ayuda a nosotros.', expr: 'sad' },
        { say: 'hijo', text: '¡Ya sé! Vamos a pedirle perdón... ¡y a poner la mesa más linda del mundo!', expr: 'excited', act: 'cheer' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 520, mood: 'happy' },
        hija: { x: 760, mood: 'happy' },
        papa: { x: 1500, mood: 'happy', facing: -1 },
        mama: { x: 2250, mood: 'sad', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'plate', id: 'p1', x: 880, y: ON_TABLE, delay: 0.2 },
        { sfx: 'pop', with: true },
        { prop: 'plate', id: 'p2', x: 1040, y: ON_TABLE, delay: 0.3 },
        { sfx: 'pop', with: true },
        { prop: 'glass', id: 'v1', x: 960, y: ON_TABLE, delay: 0.3 },
        { sfx: 'ding', with: true },
        { do: 'walk', who: 'mama', to: 1260 },
        { mood: 'surprised', who: 'mama' },
        { say: 'hija', text: 'Perdón, mamá. No te teníamos que hablar así.', expr: 'love', act: 'hug' },
        { say: 'hijo', text: 'Perdón, mamá. Mira, ¡pusimos la mesa para todos!', expr: 'love', act: 'point' },
        { mood: 'love', who: 'mama' },
        { say: 'mama', text: '¡Gracias, mis amores! Así, con cariño, todo es mucho más lindo.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 1000, y: 460, dur: 2, with: true, delay: 0.3 },
        { do: 'dance', who: ['hijo', 'hija', 'papa', 'mama'], dur: 2.8, expr: 'laugh' },
        { say: 'narrador', text: 'Aunque estemos enojados, las palabras amables siempre ganan.', with: true, delay: 0.6 },
      ],
    },
  ],
  youtube: {
    title: '¡No Me Hables Así! 🙊 Respeto a los Papás | Dibujos Animados para Niños en Español',
    description: `Luna les pide ayuda a Lio y a Tini para poner la mesa… y ellos le contestan mal 😤 "¡Hazlo tú, que estamos jugando!" Luna se pone muy triste. Max les ayuda a pensar cómo se sentirían ellos, y los chicos preparan una sorpresa para pedir perdón. 🍽️💛 Un cuento infantil corto sobre el respeto y las palabras amables.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que aunque estemos enojados podemos hablar con respeto
• A pensar cómo se sienten los demás
• A pedir perdón y ayudar en casa

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Cómo te sientes cuando alguien te habla mal? ¿Qué palabras amables podemos usar en casa?"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#respeto #dibujosanimados #cuentosinfantiles`,
    tags: [
      'niños que contestan mal',
      'respeto a los papás',
      'respeto para niños',
      'buenos modales',
      'pedir perdón',
      'ayudar en casa',
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
