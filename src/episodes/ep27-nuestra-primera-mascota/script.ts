import type { Episode } from '../../engine/script';

/**
 * Capítulo 27 — Nuestra primera mascota (valor: responsabilidad; cuidar a un ser vivo todos los días).
 * Tini gets a goldfish called Burbuja ('fishbowl' on a small table, y=760 = on the table).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const TABLE = { x: 960, y: 900 };
const ON_TABLE = 760;

const episode: Episode = {
  id: 'ep27-nuestra-primera-mascota',
  number: 27,
  title: 'Nuestra primera mascota',
  subtitle: 'Tini promete cuidar a su pececito Burbuja… pero se olvida de darle de comer',
  music: 'happy',
  thumb: { bg: 'living', text: '¡UNA MASCOTA!', prop: 'fishbowl', exprs: { papa: 'happy', mama: 'love', hijo: 'excited', hija: 'excited' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'happy' },
        mama: { x: 1240, mood: 'happy', facing: -1 },
        papa: { x: 1480, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { say: 'papa', text: '¡Sorpresa, familia! Les traemos un nuevo integrante.', expr: 'excited', act: 'cheer' },
        { prop: 'fishbowl', id: 'pecera', x: TABLE.x, y: ON_TABLE },
        { fx: 'sparkle', x: TABLE.x, y: 600, with: true },
        { sfx: 'tada', with: true },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Un pececito! ¡Qué lindo! ¿Lo puedo cuidar yo, mamá?', expr: 'excited', act: 'jump' },
        { say: 'mama', text: 'Claro, hija. Pero cuidar una mascota es una gran responsabilidad: hay que darle de comer todos los días.', expr: 'love', act: 'point' },
        { say: 'hija', text: '¡Lo prometo! Se va a llamar Burbuja.', expr: 'proud', act: 'nod' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 460, mood: 'happy' },
        hijo: { x: 1260, mood: 'worried', facing: -1 },
        mama: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'fishbowl', id: 'pecera', x: TABLE.x, y: ON_TABLE, with: true },
        { prop: 'ball', id: 'pelota', x: 600, y: 960, with: true },
        { title: 'Tres días después...', dur: 1.6 },
        { say: 'hijo', text: '¿Hoy le diste de comer a Burbuja, Tini? Está nadando muy despacito.', expr: 'worried', act: 'point' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¡No puede ser! ¡Me olvidé! ¡Y ayer también!', expr: 'worried', act: 'tremble' },
        { fx: 'sweat', x: 460, y: 500, with: true },
        { do: 'walk', who: 'mama', to: 1500 },
        { say: 'mama', text: 'Burbuja depende de ti. Él no puede pedir comida, por eso tenemos que acordarnos nosotros.', expr: 'happy' },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: 'Perdón, Burbuja. No quise olvidarme de ti.', expr: 'sad' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 700, mood: 'happy' },
        hijo: { x: 440, mood: 'happy' },
        mama: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: TABLE.x, y: TABLE.y },
        { prop: 'fishbowl', id: 'pecera', x: TABLE.x, y: ON_TABLE, with: true },
        { say: 'hija', text: '¡Ya sé! Voy a hacer un cartel para acordarme todas las mañanas.', expr: 'excited', act: 'point' },
        { prop: 'drawing', id: 'cartel', x: 1080, y: ON_TABLE },
        { sfx: 'pop', with: true },
        { prop: 'fishFood', id: 'comida', x: 860, y: ON_TABLE },
        { say: 'hija', text: 'Aquí tienes tu comida, Burbuja. Un poquito, como dijo mamá.', expr: 'love' },
        { fx: 'sparkle', x: TABLE.x, y: 620, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'hijo', text: '¡Mira cómo nada de contento!', expr: 'laugh', act: 'clap' },
        { say: 'mama', text: '¡Muy bien, hija! Ahora sí eres una gran cuidadora.', expr: 'proud', act: 'hug' },
        { say: 'hija', text: '¡Cuidar a Burbuja me hace sentir grande!', expr: 'proud', act: 'cheer' },
        { do: 'dance', who: ['hija', 'hijo', 'mama'], dur: 2.8, expr: 'laugh' },
        { say: 'narrador', text: 'Una mascota necesita amor... ¡y que la cuidemos todos los días!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Nuestra Primera Mascota 🐠 La Responsabilidad | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `¡Llegó Burbuja, el pececito de la familia! 🐠 Tini promete cuidarlo y darle de comer todos los días… pero se olvida. 😢 Con ayuda de su mamá Luna, aprende que una mascota depende de nosotros y encuentra un truco para no olvidarse más. Un cuento infantil sobre la responsabilidad y el cuidado de las mascotas.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que tener una mascota es una gran responsabilidad
• A cumplir lo que prometemos
• A buscar ideas para no olvidarnos de nuestras tareas

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuidar una mascota, la responsabilidad en niños, mi primer pez.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#mascotas #responsabilidad #pez #cuidaranimales #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #español`,
    tags: [
      'responsabilidad para niños',
      'cuidar una mascota',
      'mascotas para niños',
      'mi primera mascota',
      'cuento sobre responsabilidad',
      'cuidar animales',
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
