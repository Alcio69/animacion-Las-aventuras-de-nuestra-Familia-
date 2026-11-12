import type { Episode } from '../../engine/script';

/**
 * Capítulo 55 — ¡Dijo una mala palabra! (valor: las palabras feas lastiman; decir el enojo con otras palabras).
 * Lio repeats a bad word he heard at school (never heard: a "boing" covers it), Tini copies it, and the family
 * invents funny "anger words". Keep characters between x≈400 and x≈1550.
 */
const TABLE = { x: 960, y: 900 };

const episode: Episode = {
  id: 'ep55-dijo-una-mala-palabra',
  number: 55,
  title: '¡Dijo una mala palabra!',
  subtitle: 'Lio escucha una palabra fea en la escuela, la dice en la cena… ¡y Tini la repite! ¿Qué hacemos con las malas palabras?',
  music: 'happy',
  thumb: { bg: 'kitchen', text: '¡MALA PALABRA!', hero: ['hija'], exprs: { hija: 'surprised' } },
  scenes: [
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 520, mood: 'happy' },
        hija: { x: 790, mood: 'happy' },
        mama: { x: 1130, mood: 'happy', facing: -1 },
        papa: { x: 1400, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'plate', id: 'plato', x: 960, y: 760, with: true },
        { say: 'papa', text: '¿Y qué tal estuvo la escuela hoy, hijo?', expr: 'happy', act: 'point' },
        { say: 'hijo', text: 'Más o menos. En el recreo, mi pelota se cayó en un charco, y yo grité muy fuerte...', expr: 'angry', act: 'shrug' },
        { do: 'shake', who: 'hijo', dur: 0.9 },
        { sfx: 'boing', with: true },
        { fx: 'exclaim', x: 1130, y: 440, with: true, delay: 0.3 },
        { mood: 'surprised', who: ['hija', 'mama', 'papa'] },
        { say: 'hija', text: '¡Mamá! ¡Mi hermano dijo una palabra fea!', expr: 'surprised', act: 'point' },
        { say: 'mama', text: '¿Y dónde escuchaste esa palabra, hijo?', expr: 'worried', act: 'shrug' },
        { mood: 'worried', who: 'hijo' },
        { say: 'hijo', text: 'Un chico grande la dijo en el recreo. Todos se reían, y yo también quise decirla.', expr: 'worried', act: 'shrug' },
        { mood: 'happy', who: ['mama', 'papa'] },
        { say: 'papa', text: 'Gracias por contarnos la verdad. Esa palabra es fea, porque puede lastimar y hacer sentir mal a otros.', expr: 'happy', act: 'nod' },
        { say: 'hijo', text: 'Pero yo no quería hacer sentir mal a nadie, papá.', expr: 'sad', act: 'shrug' },
        { say: 'mama', text: 'Lo sabemos, mi amor. Pero las palabras feas no nos ayudan a decir lo que sentimos.', expr: 'happy', act: 'hug' },
        { do: 'nod', who: 'hijo', dur: 1.4 },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 600, mood: 'happy' },
        mama: { x: 2250, mood: 'surprised', facing: -1 },
        hijo: { x: 2250, mood: 'worried', facing: -1 },
      },
      steps: [
        { title: 'Al día siguiente...', dur: 1.6 },
        { prop: 'block', id: 'b1', x: 820, y: 900, scale: 1.5 },
        { prop: 'block', id: 'b2', x: 940, y: 900, scale: 1.5, with: true },
        { prop: 'block', id: 'b3', x: 880, y: 820, scale: 1.5, with: true },
        { say: 'hija', text: '¡Voy a hacer la torre más alta del mundo!', expr: 'excited', act: 'cheer' },
        { moveProp: 'b3', x: 1060, y: 950, dur: 0.6, arc: 40, bounces: 1 },
        { sfx: 'crash', with: true },
        { mood: 'angry', who: 'hija' },
        { do: 'shake', who: 'hija', dur: 0.9 },
        { sfx: 'boing', with: true },
        { fx: 'exclaim', x: 600, y: 440, with: true, delay: 0.3 },
        { do: 'walk', who: 'mama', to: 1460 },
        { do: 'walk', who: 'hijo', to: 1200, with: true },
        { say: 'mama', text: 'Esa palabra no se dice, hija. Puede hacer sentir mal a otros.', expr: 'surprised', act: 'shake' },
        { say: 'hija', text: '¡Pero mi hermano la dijo ayer! ¡Y yo también quiero decirla!', expr: 'angry', act: 'hips' },
        { mood: 'sad', who: 'hijo' },
        { say: 'hijo', text: 'Perdón, hermanita. Yo te enseñé esa palabra, y no estuvo bien.', expr: 'sad', act: 'shrug' },
        { mood: 'happy', who: 'mama' },
        { say: 'mama', text: 'Está bien enojarse cuando algo sale mal. Pero podemos decir lo que sentimos con otras palabras.', expr: 'happy', act: 'nod' },
        { say: 'hijo', text: '¡Ya sé! ¡Inventemos palabras de enojo muy graciosas!', expr: 'excited', act: 'cheer' },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Estoy muy enojada! ¡Tomates con mermelada!', expr: 'laugh', act: 'jump' },
        { sfx: 'giggle', with: true },
        { say: 'hijo', text: '¡Rayos y centellas, pepinos voladores!', expr: 'laugh', act: 'cheer' },
        { sfx: 'giggle', with: true },
        { say: 'mama', text: '¡Me encantan! Así podemos decir que estamos enojados, sin lastimar a nadie.', expr: 'laugh', act: 'clap' },
        { do: 'dance', who: ['hija', 'hijo', 'mama'], dur: 2.4, expr: 'laugh' },
      ],
    },
    {
      bg: 'park',
      cast: {
        hijo: { x: 640, mood: 'happy' },
        hija: { x: 980, mood: 'happy', facing: -1 },
        papa: { x: 1360, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Unos días después...', dur: 1.4 },
        { prop: 'ball', id: 'pelota', x: 780, y: 960 },
        { say: 'hijo', text: '¡Voy a patear la pelota con todas mis fuerzas!', expr: 'excited', act: 'point' },
        { do: 'fall', who: 'hijo' },
        { sfx: 'boing', with: true },
        { mood: 'angry', who: 'hijo' },
        { say: 'hijo', text: '¡Ay, mi pie! ¡Rayos y centellas, pepinos voladores!', expr: 'angry', act: 'shake' },
        { sfx: 'giggle', with: true },
        { mood: 'laugh', who: ['hija', 'papa'] },
        { say: 'hija', text: '¡Esa es mi palabra de enojo favorita, hermano!', expr: 'laugh', act: 'clap' },
        { say: 'papa', text: '¡Muy bien, hijo! Dijiste lo que sentías, sin lastimar a nadie.', expr: 'proud', act: 'clap' },
        { mood: 'happy', who: 'hijo' },
        { say: 'hijo', text: '¡Y ya no estoy tan enojado! Me hizo reír a mí también.', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hijo', 'hija', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Las palabras feas pueden lastimar. Cuando estamos enojados, podemos decirlo con otras palabras, ¡y hasta reírnos un poco!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Dijo una Mala Palabra! 🤐 Groserías y Cómo Decir el Enojo | Dibujos Animados para Niños en Español',
    description: `¡Lio dijo una palabra fea en la cena! 😳 La escuchó en el recreo y quiso decirla, como los chicos grandes. Al día siguiente, a Tini se le cae la torre de bloques… ¡y la repite! 🧱 Max y Luna no gritan ni se ríen: les explican que hay palabras que lastiman, y que el enojo se puede decir de otra forma. Entonces inventan juntos "palabras de enojo graciosas": "¡Tomates con mermelada!", "¡Rayos y centellas, pepinos voladores!" 🥒😂 Un cuento infantil corto sobre las malas palabras y cómo expresar el enojo.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que las palabras feas pueden lastimar y hacer sentir mal a otros
• Que está bien enojarse, y podemos decirlo con otras palabras
• A contar la verdad y pedir perdón cuando enseñamos algo que no estuvo bien

👨‍👩‍👧 Para papás y maestras: cuando un niño dice una mala palabra, ayuda más mantener la calma, preguntar dónde la escuchó y ofrecerle otra forma de decir lo que siente, que reaccionar con un grito o con risa. ¡Inventen en casa sus propias palabras de enojo graciosas!

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!
🎵 ¡Síguenos también en TikTok! Las Aventuras de Nuestra Familia

#malaspalabras #dibujosanimados #cuentosinfantiles`,
    tags: [
      'malas palabras',
      'groserías niños',
      'mi hijo dice malas palabras',
      'palabras feas',
      'manejar el enojo',
      'emociones para niños',
      'dibujos animados',
      'dibujos animados para niños',
      'caricaturas',
      'videos para niños',
      'cuentos infantiles',
      'cuentos para niños',
      'historias para niños',
      'videos educativos para niños',
      'animación infantil',
      'dibujos animados en español',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
