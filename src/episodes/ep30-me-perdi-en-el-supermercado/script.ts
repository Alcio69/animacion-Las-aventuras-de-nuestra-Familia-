import type { Episode } from '../../engine/script';

/**
 * Capítulo 30 — Me perdí en el supermercado (valor: seguridad; qué hacer si te pierdes).
 * Set `bg: 'supermarket'`; guest `sofia` (store employee). Luna pushes a 'cart' prop.
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const episode: Episode = {
  id: 'ep30-me-perdi-en-el-supermercado',
  number: 30,
  title: 'Me perdí en el supermercado',
  subtitle: 'Tini se distrae mirando juguetes y pierde de vista a su mamá… ¿qué tiene que hacer?',
  music: 'adventure',
  thumb: {
    bg: 'supermarket',
    text: '¡ME PERDÍ!',
    prop: 'cart',
    exprs: { mama: 'love', hija: 'worried', sofia: 'happy' },
    cast: ['mama', 'hija', 'sofia'],
  },
  scenes: [
    {
      bg: 'supermarket',
      cast: {
        hija: { x: 620, mood: 'happy' },
        mama: { x: 980, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'cart', id: 'carrito', x: 1200, y: 900 },
        { say: 'mama', text: 'Quédate cerquita de mamá, Tini. Hoy hay mucha gente en el supermercado.', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¡Sí, mamá! Me quedo cerquita.', expr: 'happy', act: 'nod' },
        { do: 'walk', who: 'mama', to: 2250, dur: 3.2 },
        { moveProp: 'carrito', x: 2400, y: 900, dur: 3.2, with: true },
        { do: 'turn', who: 'hija', with: true },
        { say: 'hija', text: '¡Qué lindos juguetes hay en esa góndola!', expr: 'excited', act: 'point', with: true, delay: 0.4 },
        { wait: 0.8 },
        { do: 'turn', who: 'hija' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¿Dónde estás, mamá? ¡No te puedo ver!', expr: 'worried', act: 'tremble' },
        { fx: 'exclaim', x: 620, y: 480, with: true },
      ],
    },
    {
      bg: 'supermarket',
      zoom: [1.08, 1.14],
      cast: {
        hija: { x: 760, mood: 'worried' },
        sofia: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: 'Mamá me enseñó qué hacer si me pierdo. Primero, quedarme quieta en un lugar.', expr: 'worried', act: 'think' },
        { say: 'hija', text: 'Después, buscar a alguien que trabaje aquí. ¡Esa señora tiene el chaleco del supermercado!', expr: 'happy', act: 'point' },
        { do: 'walk', who: 'sofia', to: 1120 },
        { say: 'hija', text: 'Disculpe, señora. Me perdí. Me llamo Martina y mi mamá se llama Luna.', expr: 'worried' },
        { say: 'sofia', text: 'Hiciste muy bien en quedarte quieta y pedir ayuda, Martina. Vamos a llamar a tu mamá.', expr: 'love', act: 'nod' },
        { sfx: 'ding' },
        { say: 'sofia', text: 'Atención, por favor: Luna, su hija Martina la espera en la caja.', expr: 'happy', act: 'wave' },
      ],
    },
    {
      bg: 'supermarket',
      cast: {
        mama: { x: -250, mood: 'worried' },
        hija: { x: 900, mood: 'worried' },
        sofia: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { do: 'run', who: 'mama', to: 620 },
        { mood: 'love', who: ['mama', 'hija'] },
        { say: 'mama', text: '¡Mi amor! ¡Aquí estás, Tini! ¡Qué susto me di!', expr: 'love', act: 'hug' },
        { do: 'hug', who: 'hija', dur: 2, with: true },
        { fx: 'hearts', x: 760, y: 450, dur: 2, with: true },
        { say: 'mama', text: 'Lo hiciste todo muy bien. Estoy muy orgullosa de ti.', expr: 'proud', act: 'nod' },
        { say: 'hija', text: 'Y la próxima vez me quedo cerquita de ti, mamá. ¡Prometido!', expr: 'happy', act: 'nod' },
        { say: 'sofia', text: '¡Qué niña tan valiente! Cuídense mucho las dos.', expr: 'happy', act: 'clap' },
        { sfx: 'sparkle', with: true },
        { say: 'narrador', text: 'Si te pierdes: quédate quieto, busca a alguien que trabaje allí y di tu nombre y el de tus papás.', delay: 0.4 },
      ],
    },
  ],
  youtube: {
    title: 'Me Perdí en el Supermercado 🛒 Qué Hacer si te Pierdes | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Tini se distrae mirando juguetes en el supermercado… ¡y pierde de vista a su mamá Luna! 😟🛒 Pero recuerda lo que le enseñaron: quedarse quieta, buscar a alguien que trabaje allí y decir su nombre y el de su mamá. 💛 Un cuento infantil para enseñar a los niños qué hacer si se pierden.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Qué hacer si nos perdemos: quedarnos quietos
• A pedir ayuda a una persona que trabaja en el lugar
• A saber nuestro nombre y el de nuestros papás

👶 Ideal para niños de 3 a 8 años. Dibujos animados 3D en español, seguridad para niños, qué hacer si me pierdo, niño perdido en el supermercado.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#seguridad #niñoperdido #quehacersimepierdo #supermercado #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #español`,
    tags: [
      'qué hacer si me pierdo',
      'seguridad para niños',
      'niño perdido',
      'perdido en el supermercado',
      'cuento sobre seguridad',
      'pedir ayuda niños',
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
