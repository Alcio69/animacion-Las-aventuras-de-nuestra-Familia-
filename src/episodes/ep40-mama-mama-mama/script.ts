import type { Episode } from '../../engine/script';

/**
 * Capítulo 40 — ¡Mamá, mamá, mamá! (valor: esperar el turno para hablar; no interrumpir; "la mano mágica").
 * Lio keeps interrupting while Luna talks with Grandma; Luna teaches him the "magic hand" (hand on the arm and wait).
 * Drawing "in the hand" at y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep40-mama-mama-mama',
  number: 40,
  title: '¡Mamá, mamá, mamá!',
  subtitle: 'Lio interrumpe todo el tiempo… hasta que Luna le enseña la mano mágica',
  music: 'happy',
  thumb: { bg: 'living', text: '¡MAMÁ, MAMÁ!', prop: 'drawing', hero: ['hijo', 'mama'], exprs: { hijo: 'excited', mama: 'worried' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: -250, mood: 'excited' },
        mama: { x: 1100, mood: 'happy' },
        abuela: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'abuela', text: 'Y entonces tu papá se subió al árbol más alto del jardín...', expr: 'happy', act: 'point' },
        { do: 'run', who: 'hijo', to: 760, with: true, delay: 1.2 },
        { say: 'hijo', text: '¡Vengan a ver lo que hice! ¡Mamá, mamá, mamá!', expr: 'excited', act: 'jump' },
        { do: 'turn', who: 'mama' },
        { say: 'mama', text: 'Un momentito, hijo. Estoy hablando con la abuela.', expr: 'happy' },
        { do: 'turn', who: 'mama' },
        { say: 'abuela', text: 'Como te decía, el árbol era altísimo, y tu papá...', expr: 'happy' },
        { say: 'hijo', text: '¡Escúchame, mamá! ¡Es muy, muy importante!', expr: 'worried', act: 'tremble' },
        { mood: 'surprised', who: 'abuela' },
        { fx: 'question', x: 1420, y: 420, dur: 1.4, with: true },
        { say: 'abuela', text: '¡No puede ser! Me olvidé lo que estaba contando.', expr: 'surprised', act: 'shrug' },
        { sfx: 'giggle', with: true, delay: 1 },
        { mood: 'worried', who: 'mama' },
        { do: 'turn', who: 'mama' },
        { say: 'mama', text: 'Mira, hijo: cuando interrumpes, la abuela pierde el hilo de su historia.', expr: 'worried', act: 'point' },
        { mood: 'sad', who: 'hijo' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 720, mood: 'sad' },
        mama: { x: 1080, mood: 'love', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Te voy a enseñar un truco que se llama la mano mágica.', expr: 'wink', act: 'wave' },
        { fx: 'sparkle', x: 900, y: 560, with: true },
        { sfx: 'sparkle', with: true },
        { mood: 'surprised', who: 'hijo' },
        { say: 'mama', text: 'Cuando quieras decirme algo y yo esté hablando, apoya tu mano en mi brazo, y espera.', expr: 'happy', act: 'point' },
        { say: 'mama', text: 'Yo pongo mi mano sobre la tuya. Eso quiere decir: ya te vi, y en un ratito te escucho.', expr: 'love', act: 'hug' },
        { say: 'hijo', text: '¿Y si es algo urgente, como que alguien se lastimó?', expr: 'worried', act: 'think' },
        { say: 'mama', text: 'Si es urgente, me avisas enseguida. ¡Eso siempre!', expr: 'proud', act: 'nod' },
        { mood: 'happy', who: 'hijo' },
        { say: 'hijo', text: '¡Entendido, mamá! Voy a usar la mano mágica.', expr: 'happy', act: 'cheer' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 620, mood: 'happy' },
        mama: { x: 1100, mood: 'happy' },
        abuela: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Un ratito después...', dur: 1.6 },
        { say: 'abuela', text: 'Y así fue como tu papá aprendió a bajar de los árboles.', expr: 'laugh', act: 'point' },
        { do: 'walk', who: 'hijo', to: 850, with: true, delay: 0.8 },
        { do: 'hug', who: 'hijo', dur: 1.6 },
        { fx: 'hearts', x: 975, y: 520, dur: 1.6, with: true },
        { do: 'nod', who: 'mama', dur: 1.2, with: true },
        { say: 'abuela', text: '¡Qué paciente es Lio! Ahora te toca hablar a ti.', expr: 'love', act: 'point' },
        { do: 'turn', who: 'mama' },
        { say: 'mama', text: 'Gracias por esperar, hijo. ¿Qué querías contarme?', expr: 'love' },
        { prop: 'drawing', id: 'dibujo', x: 950, y: HAND },
        { sfx: 'sparkle', with: true },
        { say: 'hijo', text: '¡Les hice un dibujo de toda la familia!', expr: 'excited', act: 'cheer' },
        { say: 'abuela', text: '¡Es hermoso! Y esperaste tu turno como un campeón.', expr: 'love', act: 'clap' },
        { do: 'dance', who: ['hijo', 'mama', 'abuela'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Esperar el turno para hablar es una forma de mostrar respeto y cariño.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Mamá, Mamá, Mamá! ✋ No Interrumpir | Dibujos Animados para Niños en Español',
    description: `La abuela está contando una historia muy divertida… pero Lio no para de interrumpir: "¡Mamá, mamá, mamá!" 😅 ¡Tanto, que la abuela se olvida de lo que estaba contando! Entonces Luna le enseña un truco: la mano mágica ✋✨, para avisar que quiere hablar y esperar su turno. Un cuento infantil corto sobre la paciencia y el respeto al hablar.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• A esperar nuestro turno para hablar
• El truco de la mano mágica para no interrumpir
• Que si es algo urgente, siempre podemos avisar

👨‍👩‍👧 Para papás y maestras: después del video, ¡practiquen juntos la mano mágica! Pregúntenles a los chicos "¿Qué hacemos cuando queremos hablar y alguien está hablando?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#nointerrumpir #dibujosanimados #cuentosinfantiles`,
    tags: [
      'no interrumpir',
      'niños que interrumpen',
      'la mano mágica',
      'esperar el turno',
      'paciencia para niños',
      'respeto al hablar',
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
