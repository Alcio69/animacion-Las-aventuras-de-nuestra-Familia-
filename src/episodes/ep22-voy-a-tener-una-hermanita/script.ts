import type { Episode } from '../../engine/script';

/**
 * Capítulo 22 — ¡Voy a tener una hermanita! (valor: celos del hermano mayor; el amor no se reparte, se multiplica).
 * Hijo remembers when he was little (flashback scenes: `flashback: true`, Hijo at scale 0.78) and baby Hija arrived
 * (prop 'baby' inside a 'crib': the crib mattress is at y=760).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const SMALL = 0.78;

const episode: Episode = {
  id: 'ep22-voy-a-tener-una-hermanita',
  number: 22,
  title: '¡Voy a tener una hermanita!',
  subtitle: 'Hijo recuerda cuando era chiquito y se enteró de que iba a tener una hermanita…',
  music: 'calm',
  thumb: { bg: 'bedroom', variant: 'day', text: '¡UNA HERMANITA!', prop: 'baby', exprs: { papa: 'love', mama: 'love', hijo: 'surprised', hija: 'laugh' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'happy' },
        hijo: { x: 960, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'book', id: 'album', x: 800, y: 760 },
        { say: 'hija', text: 'Hermano, ¿te pusiste contento cuando supiste que ibas a tener una hermanita?', expr: 'happy', act: 'point' },
        { say: 'hijo', text: 'Bueno... al principio no tanto. ¿Quieres que te cuente?', expr: 'wink', act: 'shrug' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¡Claro que sí! ¡Cuéntame todo!', expr: 'excited', act: 'jump' },
      ],
    },
    {
      bg: 'living',
      flashback: true,
      cast: {
        hijo: { x: 640, mood: 'happy', scale: SMALL },
        mama: { x: 980, mood: 'love', facing: -1 },
        papa: { x: 1260, mood: 'love', facing: -1 },
      },
      steps: [
        { title: 'Hace siete años...', dur: 2 },
        { say: 'papa', text: 'Hijo, tenemos una noticia muy especial para ti.', expr: 'love' },
        { say: 'mama', text: '¡Mi amor, vas a tener una hermanita! Llega muy pronto.', expr: 'excited', act: 'hug' },
        { fx: 'hearts', x: 1000, y: 480, with: true, delay: 0.3 },
        { mood: 'surprised', who: 'hijo' },
        { say: 'hijo', text: '¿Una hermanita? ¿Y si después me quieren menos a mí?', expr: 'worried', act: 'tremble' },
        { say: 'mama', text: 'El amor de mamá y papá no se reparte, mi amor. Se multiplica.', expr: 'love', act: 'nod' },
        { say: 'papa', text: 'Tú siempre vas a ser nuestro primer tesoro.', expr: 'love', act: 'hug' },
        { mood: 'neutral', who: 'hijo' },
        { say: 'hijo', text: 'Bueno, no sé. No estoy muy seguro de querer una hermanita.', expr: 'sad', act: 'shrug' },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      flashback: true,
      zoom: [1.12, 1.18],
      focus: [980, 940],
      cast: {
        hijo: { x: 520, mood: 'sad', scale: SMALL },
        mama: { x: 1240, mood: 'love', facing: -1 },
        papa: { x: 1480, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'crib', id: 'cuna', x: 900, y: 900 },
        { prop: 'baby', id: 'bebe', x: 900, y: 760, with: true },
        { title: 'Unos meses después...', dur: 1.8 },
        { say: 'hijo', text: 'Todos miran a la bebé. Ya nadie quiere jugar conmigo.', expr: 'sad', act: 'shrug' },
        { say: 'mama', text: 'Hijo, ¿nos ayudas a cuidarla? Los hermanos mayores son muy importantes.', expr: 'love', act: 'point' },
        { do: 'think', who: 'hijo', dur: 1.6 },
        { say: 'hijo', text: 'Bueno... le voy a prestar mi osito favorito.', expr: 'happy' },
        { do: 'walk', who: 'hijo', to: 700 },
        { prop: 'teddy', id: 'osito', x: 820, y: 760 },
        { sfx: 'pop', with: true },
        { sfx: 'giggle', delay: 0.4 },
        { mood: 'excited', who: 'hijo' },
        { say: 'hijo', text: '¡Se rió conmigo! ¡A mi hermanita le gusto mucho!', expr: 'excited', act: 'cheer' },
        { fx: 'hearts', x: 860, y: 480, with: true, delay: 0.3 },
        { say: 'papa', text: '¿Te das cuenta? Ahora tienes a alguien que te va a querer muchísimo.', expr: 'proud', act: 'nod' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'laugh' },
        hijo: { x: 960, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: '¡Y desde ese día soy tu hermana favorita!', expr: 'laugh', act: 'hug' },
        { say: 'hijo', text: '¡Eres mi única hermana! Pero sí, eres la mejor de todas.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 800, y: 470, dur: 2, with: true },
        { sfx: 'sparkle', with: true },
        { do: 'dance', who: ['hija', 'hijo'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'El amor de una familia no se divide: ¡crece cada vez que llega alguien nuevo!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Voy a Tener una Hermanita! 👶 Celos del Hermano Mayor | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Hija le pregunta a su hermano: "¿Te pusiste contento cuando yo iba a nacer?" 👶 Y Hijo recuerda cuando era chiquito y se enteró de que iba a tener una hermanita… ¡y tuvo un poquito de celos! 💛 Un cuento infantil para preparar a los niños para la llegada de un hermanito o hermanita, y hablar de los celos entre hermanos.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que sentir celos es normal
• Que el amor de mamá y papá no se reparte: se multiplica
• Lo especial que es ser hermano mayor

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, llegada de un hermanito, celos entre hermanos, hermano mayor, nuevo bebé en la familia.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#celos #hermanito #nuevobebe #hermanomayor #celosentrehermanos #cuentosinfantiles #dibujosanimados #cuentosparaniños #animacion3d #español`,
    tags: [
      'celos entre hermanos',
      'llegada de un hermanito',
      'voy a tener un hermanito',
      'nuevo bebé en la familia',
      'hermano mayor',
      'celos del bebé',
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
