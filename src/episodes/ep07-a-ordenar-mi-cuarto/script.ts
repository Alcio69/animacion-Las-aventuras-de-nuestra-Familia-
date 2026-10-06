import type { Episode } from '../../engine/script';

/**
 * Capítulo 7 — ¡A ordenar mi cuarto! (valor: orden y responsabilidad, convertidos en juego).
 * Toys lie on the floor in front of the characters (y=990). The toy box is at x=1150.
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const FLOOR = 990;
const BOX = { x: 1150, y: 880 };
const HAND = 760;

const toys = [
  { prop: 'ball', id: 'pelota', x: 560 },
  { prop: 'block', id: 'cubo', x: 760 },
  { prop: 'car', id: 'auto', x: 940 },
  { prop: 'book', id: 'libro', x: 1380 },
] as const;

const episode: Episode = {
  id: 'ep07-a-ordenar-mi-cuarto',
  number: 7,
  title: '¡A ordenar mi cuarto!',
  subtitle: 'El cuarto de Lio es un desastre… y su estrella de los valientes desapareció',
  music: 'happy',
  thumb: { bg: 'bedroom', variant: 'day', text: '¡QUÉ DESORDEN!', prop: 'toybox', exprs: { hijo: 'worried', papa: 'surprised', mama: 'laugh', hija: 'laugh' } },
  scenes: [
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: 680, mood: 'worried' },
        papa: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        ...toys.map((toy, i) => ({ prop: toy.prop, id: toy.id, x: toy.x, y: FLOOR, with: i > 0 })),
        { prop: 'toybox', id: 'baul', x: BOX.x, y: BOX.y, with: true },
        { say: 'hijo', text: '¿Dónde está mi estrella de los valientes? ¡No la encuentro por ningún lado!', expr: 'worried', act: 'think' },
        { do: 'walk', who: 'papa', to: 1450 },
        { say: 'papa', text: '¡Uy! Este cuarto parece que pasó un huracán.', expr: 'surprised' },
        { say: 'hijo', text: 'Es que ordenar es muy aburrido.', expr: 'sad', act: 'shrug' },
        { say: 'papa', text: '¿Aburrido? ¡Hagamos una carrera! A ver cuántos juguetes guardas antes de que termine la música.', expr: 'excited', act: 'cheer' },
        { mood: 'excited', who: 'hijo' },
        { sfx: 'drum', with: true, delay: 0.6 },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: 680, mood: 'excited' },
        papa: { x: 1450, mood: 'happy', facing: -1 },
      },
      steps: [
        ...toys.map((toy, i) => ({ prop: toy.prop, id: toy.id, x: toy.x, y: FLOOR, with: i > 0 })),
        { prop: 'toybox', id: 'baul', x: BOX.x, y: BOX.y, with: true },
        { title: '¡A guardar!', dur: 1.4 },
        // a quick race: run to each toy and toss it into the box
        ...toys.flatMap((toy) => [
          { do: 'run', who: 'hijo', to: toy.x + (toy.x > BOX.x ? -90 : 90) } as const,
          { moveProp: toy.id, x: BOX.x, y: BOX.y - 40, dur: 0.8, arc: 220 } as const,
          { removeProp: toy.id } as const,
          { sfx: 'pop', with: true } as const,
        ]),
        { do: 'clap', who: 'papa', dur: 1.2, with: true },
        { prop: 'star', id: 'estrella', x: 1380, y: HAND },
        { fx: 'sparkle', x: 1380, y: 600, dur: 1.8, with: true },
        { sfx: 'ding', with: true },
        { mood: 'surprised', who: 'hijo', with: true },
        { say: 'hijo', text: '¡Mi estrella de los valientes! ¡Estaba escondida debajo del libro!', expr: 'love', act: 'jump' },
        { fx: 'hearts', x: 1250, y: 450, with: true, delay: 0.3 },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: 1100, mood: 'happy' },
        papa: { x: 1450, mood: 'happy', facing: -1 },
        mama: { x: -250, mood: 'happy' },
        hija: { x: -250, mood: 'happy' },
      },
      steps: [
        { prop: 'toybox', id: 'baul', x: 760, y: BOX.y },
        { say: 'papa', text: 'Cuando todo está en su lugar, es mucho más fácil encontrar las cosas.', expr: 'proud', act: 'hips' },
        { do: 'walk', who: 'mama', to: 450 },
        { do: 'walk', who: 'hija', to: 720, with: true, delay: 0.3 },
        { say: 'mama', text: '¡Qué ordenado está este cuarto!', expr: 'surprised', act: 'clap' },
        { say: 'hijo', text: '¡Y ordenar fue súper divertido!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hijo', 'papa', 'mama', 'hija'], dur: 3, expr: 'laugh' },
        { fx: 'stars', x: 960, y: 380, dur: 2.2, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Ordenar también puede ser un juego, si lo hacemos con alegría.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡A Ordenar mi Cuarto! 🧸 Las Aventuras de Nuestra Familia | Cuentos para Niños sobre el Orden',
    description: `El cuarto de Lio parece que lo atravesó un huracán… 🌪️ ¡y su estrella de los valientes desapareció! Max tiene una idea genial: convertir el orden en una carrera divertida. 🏁🧸 Un cuento infantil para enseñar a los niños a ordenar sus juguetes jugando.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que ordenar puede ser un juego
• Que cuando todo está en su lugar es más fácil encontrar las cosas
• A ser responsables con nuestros juguetes

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, hábitos y rutinas para niños, cuentos con valores y videos educativos.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#ordenar #ordenarjuguetes #habitosparaniños #cuentosinfantiles #dibujosanimados #cuentosparaniños #responsabilidad #animacion3d #videosparaniños #español`,
    tags: [
      'ordenar el cuarto',
      'ordenar juguetes',
      'hábitos para niños',
      'responsabilidad para niños',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'cuentos con valores',
      'videos para niños',
      'animación 3d infantil',
      'rutinas para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
