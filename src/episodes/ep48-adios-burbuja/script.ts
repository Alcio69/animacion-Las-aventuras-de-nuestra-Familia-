import type { Episode } from '../../engine/script';

/**
 * Capítulo 48 — Adiós, Burbuja (valor: el duelo; explicar la muerte con palabras simples y verdaderas; está bien
 * estar triste; los recuerdos se quedan). Burbuja is Tini's goldfish from ch. 27.
 * No euphemisms ("se durmió", "se fue de viaje"): the body stopped working and does not come back. Not her fault.
 * Fishbowl on a table (y=760). Keep characters between x≈400 and x≈1550. No dance at the end (gentle tone).
 */
const TABLE = { x: 980, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep48-adios-burbuja',
  number: 48,
  title: 'Adiós, Burbuja',
  subtitle: 'El pececito de Tini se murió… ¿cómo se despide a alguien que queremos?',
  music: 'calm',
  thumb: { bg: 'living', text: '¡ADIÓS, BURBUJA!', prop: 'fishbowlStill', hero: ['hija'], exprs: { hija: 'sad' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hija: { x: 700, mood: 'happy' },
        papa: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'fishbowlStill', id: 'pecera', x: TABLE.x, y: ON_TABLE, scale: 1.7, with: true },
        { prop: 'fishFood', id: 'comida', x: 800, y: ON_TABLE },
        { say: 'hija', text: '¡Buenos días, Burbuja! Te traje tu desayuno.', expr: 'happy', act: 'wave' },
        { do: 'look', who: 'hija', dur: 1.2 },
        { mood: 'worried', who: 'hija' },
        { say: 'hija', text: 'Papá, ven rápido, por favor. ¡Burbuja no se mueve!', expr: 'worried', act: 'tremble' },
        { do: 'walk', who: 'papa', to: 1170 },
        { do: 'think', who: 'papa', dur: 1.2 },
        { mood: 'sad', who: 'papa' },
        { say: 'papa', text: 'Mi amor, tengo que decirte algo triste. Burbuja se murió.', expr: 'sad', act: 'hug' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¿Se murió? ¿Pero se va a despertar?', expr: 'surprised', act: 'shrug' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 460, mood: 'sad' },
        hija: { x: 700, mood: 'sad' },
        papa: { x: 1170, mood: 'sad', facing: -1 },
        mama: { x: 1420, mood: 'sad', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'fishbowlStill', id: 'pecera', x: TABLE.x, y: ON_TABLE, scale: 1.7, with: true },
        { say: 'mama', text: 'No, hija. Cuando un ser vivo se muere, su cuerpo deja de funcionar, y no vuelve.', expr: 'sad', act: 'nod' },
        { say: 'mama', text: 'Burbuja ya no come, ya no nada, y no siente dolor.', expr: 'sad' },
        { do: 'tremble', who: 'hija', dur: 1.4 },
        { say: 'hija', text: '¿Fue mi culpa? Yo siempre le daba de comer.', expr: 'sad', act: 'shrug' },
        { say: 'papa', text: 'No fue tu culpa. Los pececitos viven poquito tiempo, y tú lo cuidaste con mucho amor.', expr: 'sad', act: 'hug' },
        { do: 'walk', who: 'hijo', to: 580 },
        { do: 'hug', who: ['hijo', 'hija'], dur: 1.8 },
        { say: 'hijo', text: 'Yo también estoy triste, hermanita. Burbuja era muy lindo.', expr: 'sad' },
      ],
    },
    {
      bg: 'park',
      variant: 'sunset',
      cast: {
        hijo: { x: 480, mood: 'sad' },
        hija: { x: 720, mood: 'sad' },
        papa: { x: 1180, mood: 'sad', facing: -1 },
        mama: { x: 1430, mood: 'sad', facing: -1 },
      },
      steps: [
        { prop: 'flowerPot', id: 'flores', x: 950, y: 950 },
        { title: 'Esa tarde, en el jardín...', dur: 1.8 },
        { say: 'mama', text: 'Hagamos una despedida para Burbuja. Cada uno puede contar un recuerdo lindo.', expr: 'sad', act: 'point' },
        { say: 'hijo', text: 'Yo me acuerdo de cuando hacía burbujitas. Por eso le pusiste ese nombre.', expr: 'sad', act: 'nod' },
        { prop: 'drawing', id: 'dibujo', x: 840, y: ON_TABLE },
        { say: 'hija', text: 'Te hice un dibujo, Burbuja. Te voy a extrañar mucho.', expr: 'sad', act: 'wave' },
        { fx: 'hearts', x: 900, y: 520, with: true, delay: 1 },
        { say: 'papa', text: 'Está bien estar triste. Cuando queremos mucho a alguien, nos duele despedirnos.', expr: 'sad', act: 'hug' },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 700, mood: 'sad' },
        mama: { x: 1080, mood: 'sad', facing: -1 },
      },
      steps: [
        { prop: 'drawing', id: 'dibujo', x: 880, y: ON_TABLE },
        { title: 'Esa noche...', dur: 1.6 },
        { say: 'hija', text: 'Todavía estoy un poco triste, mamá.', expr: 'sad' },
        { say: 'mama', text: 'Es normal, mi amor. La tristeza se va haciendo más chiquita con el tiempo.', expr: 'sad', act: 'hug' },
        { say: 'mama', text: 'Y los recuerdos lindos de Burbuja se quedan con nosotros para siempre.', expr: 'sad', act: 'nod' },
        { mood: 'happy', who: 'hija' },
        { say: 'hija', text: 'Entonces me voy a acordar de Burbuja todos los días.', expr: 'happy', act: 'nod' },
        { do: 'hug', who: ['hija', 'mama'], dur: 2 },
        { fx: 'hearts', x: 890, y: 460, with: true },
        { fx: 'stars', x: 960, y: 300, dur: 3 },
        { say: 'narrador', text: 'Cuando alguien que queremos se va, está bien estar triste. El amor y los recuerdos se quedan con nosotros.', with: true, delay: 0.4 },
      ],
      tail: 1.4,
    },
  ],
  youtube: {
    title: 'Adiós, Burbuja 🐠 Cómo Explicar la Muerte a los Niños | Dibujos Animados para Niños en Español',
    description: `Una mañana, Tini va a darle de comer a su pececito Burbuja… pero Burbuja no se mueve. 🐠💔 "¿Se va a despertar?", pregunta. Max y Luna le explican con palabras simples y con mucho amor que Burbuja se murió: su cuerpo dejó de funcionar y no vuelve. Esa tarde, la familia le hace una despedida en el jardín, y cada uno cuenta su recuerdo favorito. 🌅 Un cuento infantil corto y tierno para acompañar a los chicos cuando pierden a alguien que quieren.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que está bien estar triste cuando alguien que queremos se muere
• Que no es culpa nuestra
• Que el amor y los recuerdos lindos se quedan con nosotros

👨‍👩‍👧 Para papás y maestras: a los chicos los ayuda que les hablemos con palabras simples y verdaderas ("se murió, su cuerpo dejó de funcionar"), en vez de "se durmió" o "se fue de viaje", que pueden confundirlos o asustarlos. Pregúntenles: "¿Qué recuerdo lindo tienes de alguien que extrañas?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#duelo #dibujosanimados #cuentosinfantiles`,
    tags: [
      'cómo explicar la muerte a un niño',
      'muerte de una mascota',
      'duelo infantil',
      'se murió mi mascota',
      'tristeza en niños',
      'despedida',
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
