import type { Episode } from '../../engine/script';

/**
 * Capítulo 41 — ¡No me invitaron! (valor: que no nos inviten no significa que no nos quieran; hablar de lo que
 * sentimos; a los grandes también les pasa).
 * Max is sad because his friend Tito celebrated his birthday without inviting him; the kids and Luna help him.
 * Table at x=960 (cookies "on the table" y=760). Keep characters between x≈400 and x≈1550.
 */
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep41-no-me-invitaron',
  number: 41,
  title: '¡No me invitaron!',
  subtitle: 'Max está triste porque su amigo Tito festejó su cumpleaños y no lo invitó',
  music: 'calm',
  thumb: { bg: 'living', text: '¡NO ME INVITARON!', prop: 'gift', hero: ['papa'], exprs: { papa: 'sad' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'happy' },
        hija: { x: 820, mood: 'happy' },
        papa: { x: 1220, mood: 'sad', facing: -1 },
      },
      steps: [
        { mood: 'worried', who: 'hija' },
        { say: 'hija', text: '¿Estás bien, papá? Te veo muy callado.', expr: 'worried', act: 'point' },
        { say: 'papa', text: 'Mi amigo Tito festejó su cumpleaños ayer, y no me invitó.', expr: 'sad', act: 'shrug' },
        { mood: 'surprised', who: 'hijo' },
        { say: 'hijo', text: '¿Los papás también se ponen tristes por eso?', expr: 'surprised', act: 'think' },
        { say: 'papa', text: 'Claro que sí, campeón. A todos nos duele cuando nos dejan afuera.', expr: 'sad', act: 'nod' },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: 'A mí me pasó con la fiesta de Nico. Me sentí muy triste.', expr: 'sad' },
        { do: 'walk', who: 'hija', to: 960 },
        { do: 'hug', who: ['hija', 'papa'], dur: 1.8 },
        { fx: 'hearts', x: 1090, y: 460, with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 480, mood: 'happy' },
        hija: { x: 740, mood: 'happy' },
        papa: { x: 1080, mood: 'sad', facing: -1 },
        mama: { x: 1360, mood: 'love', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Sentirse triste está bien. Pero que no te inviten no quiere decir que no te quieran.', expr: 'love', act: 'hug' },
        { do: 'think', who: 'papa', dur: 1.4 },
        { say: 'papa', text: 'Tienes razón. Quizás fue una fiesta chiquita, solo con su familia.', expr: 'neutral', act: 'nod' },
        { say: 'mama', text: '¿Y si lo llamas para saludarlo por su cumpleaños?', expr: 'happy', act: 'point' },
        { mood: 'happy', who: 'papa' },
        { say: 'hijo', text: '¡Y mientras tanto, nosotros te hacemos compañía, papá!', expr: 'excited', act: 'cheer' },
        { say: 'hija', text: '¡Hagamos una merienda especial para ti!', expr: 'excited', act: 'jump' },
        { sfx: 'sparkle', with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 460, mood: 'happy' },
        hija: { x: 700, mood: 'happy' },
        papa: { x: 1220, mood: 'happy' },
        tito: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 960, y: 900 },
        { prop: 'cookiePlate', id: 'galletas', x: 880, y: ON_TABLE, with: true },
        { title: 'Un ratito después...', dur: 1.6 },
        { sfx: 'doorbell' },
        { do: 'walk', who: 'tito', to: 1500 },
        { say: 'tito', text: '¡Max, amigo! Gracias por llamarme para saludarme por mi cumpleaños.', expr: 'happy', act: 'wave' },
        { say: 'tito', text: 'Mi fiesta fue chiquita, solo con mi familia. ¿Te gustaría jugar al fútbol conmigo el sábado?', expr: 'happy', act: 'point' },
        { mood: 'excited', who: 'papa' },
        { say: 'papa', text: '¡Claro que sí, Tito! ¡Me encanta la idea!', expr: 'excited', act: 'cheer' },
        { do: 'turn', who: 'papa' },
        { say: 'hija', text: '¿Viste, papá? Tu amigo te quiere muchísimo.', expr: 'love', act: 'point' },
        { prop: 'cake', id: 'torta', x: 990, y: ON_TABLE },
        { sfx: 'tada', with: true },
        { fx: 'sparkle', x: 990, y: 640, with: true },
        { say: 'tito', text: 'Y traje torta de mi cumpleaños, para compartir con todos.', expr: 'laugh', act: 'clap' },
        { do: 'dance', who: ['hijo', 'hija', 'papa', 'tito'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Que no nos inviten a todo no significa que no nos quieran. Hablar de lo que sentimos siempre ayuda.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡No Me Invitaron! 🎂 Cuando No Nos Invitan a una Fiesta | Dibujos Animados para Niños en Español',
    description: `Max está muy callado… 😔 Su amigo Tito festejó su cumpleaños y no lo invitó. "¿Los papás también se ponen tristes por eso?", pregunta Lio. ¡Claro que sí! Tini cuenta que a ella le pasó con la fiesta de Nico, y Luna les explica algo muy importante: que no te inviten no quiere decir que no te quieran. 💛 ¿Qué pasará cuando Max llame a su amigo? 🎂 Un cuento infantil corto sobre la desilusión, la amistad y hablar de lo que sentimos.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que a todos nos duele quedar afuera, también a los grandes
• Que no ser invitados no significa que no nos quieran
• Que hablar de lo que sentimos siempre ayuda

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Alguna vez no te invitaron a algo? ¿Cómo te sentiste? ¿Qué te ayudó?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#emociones #dibujosanimados #cuentosinfantiles`,
    tags: [
      'no me invitaron',
      'no me invitaron al cumpleaños',
      'desilusión en niños',
      'manejar la tristeza',
      'amistad para niños',
      'emociones para niños',
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
