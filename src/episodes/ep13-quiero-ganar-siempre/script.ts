import type { Episode } from '../../engine/script';

/**
 * Capítulo 13 — ¡Quiero ganar siempre! (valor: saber perder, deportividad).
 * Race in the park; the finish line is a tree at x=1500.
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const GOAL = 1500;

const episode: Episode = {
  id: 'ep13-quiero-ganar-siempre',
  number: 13,
  title: '¡Quiero ganar siempre!',
  subtitle: 'Hija pierde una carrera y se enoja muchísimo…',
  music: 'adventure',
  thumb: { bg: 'park', text: '¡NO VALE!', prop: 'star', exprs: { hija: 'angry', hijo: 'laugh', papa: 'surprised', mama: 'worried' } },
  scenes: [
    {
      bg: 'park',
      cast: {
        papa: { x: 440, mood: 'happy' },
        hijo: { x: 700, mood: 'excited' },
        hija: { x: 940, mood: 'excited' },
      },
      steps: [
        { prop: 'tree', id: 'meta', x: GOAL, y: 880 },
        { say: 'hija', text: '¡Hagamos una carrera hasta el árbol!', expr: 'excited', act: 'point' },
        { say: 'papa', text: '¡En sus marcas, listos... ya!', expr: 'excited', act: 'cheer' },
        { sfx: 'whoosh', with: true, delay: 1.8 },
        { do: 'run', who: 'hijo', to: GOAL - 100, dur: 1.5, with: true, delay: 1.8 },
        { do: 'run', who: 'hija', to: GOAL - 380, dur: 2.0, with: true, delay: 1.8 },
        { wait: 0.4 },
        { say: 'hijo', text: '¡Llegué primero! ¡Gané la carrera!', expr: 'laugh', act: 'cheer' },
        { mood: 'angry', who: 'hija' },
        { say: 'hija', text: '¡No vale! ¡Eso fue trampa! ¡No juego más!', expr: 'angry', act: 'shake' },
        { do: 'walk', who: 'hija', to: 760 },
        { mood: 'surprised', who: ['hijo', 'papa'], with: true },
      ],
    },
    {
      bg: 'park',
      zoom: [1.1, 1.16],
      cast: {
        hija: { x: 700, mood: 'angry', facing: -1 },
        papa: { x: 1000, mood: 'love', facing: -1 },
      },
      steps: [
        { say: 'papa', text: '¿Sabes un secreto? Cuando yo era chiquito, también me enojaba cuando perdía.', expr: 'love' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¿En serio, papá? ¿Tú también?', expr: 'surprised' },
        { say: 'papa', text: 'Así es. Pero aprendí algo muy importante: lo más lindo no es ganar, es divertirse jugando.', expr: 'proud', act: 'hips' },
        { do: 'think', who: 'hija', dur: 1.8 },
        { fx: 'question', x: 700, y: 470, dur: 1.6, with: true },
        { mood: 'happy', who: 'hija' },
        { say: 'hija', text: 'Tienes razón. ¡Voy a felicitar a mi hermano!', expr: 'happy', act: 'nod' },
      ],
    },
    {
      bg: 'park',
      cast: {
        hijo: { x: 1250, mood: 'worried', facing: -1 },
        hija: { x: 2250, mood: 'happy', facing: -1 },
        papa: { x: 520, mood: 'happy' },
      },
      steps: [
        { prop: 'tree', id: 'meta', x: GOAL, y: 880 },
        { do: 'walk', who: 'hija', to: 980 },
        { say: 'hija', text: 'Perdón por enojarme. ¡Corriste muy rápido, hermano!', expr: 'love', act: 'clap' },
        { say: 'hijo', text: '¡Gracias! ¿Jugamos otra carrera juntos?', expr: 'happy', act: 'wave' },
        { say: 'hija', text: '¡Claro que sí! No importa quién gane, ¡igual nos divertimos!', expr: 'laugh', act: 'cheer' },
        { do: 'run', who: 'hija', to: 800, dur: 1.6 },
        { do: 'run', who: 'hijo', to: 1080, dur: 1.6, with: true },
        { sfx: 'giggle', with: true, delay: 1 },
        { do: 'dance', who: ['hijo', 'hija', 'papa'], dur: 3, expr: 'laugh' },
        { fx: 'stars', x: 800, y: 400, dur: 2.2, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Ganar es lindo, pero jugar juntos es lo mejor de todo.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Quiero Ganar Siempre! 🏆 Saber Perder | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Hija pierde una carrera contra su hermano y se enoja muchísimo: "¡No vale! ¡No juego más!" 😤🏃 Pero Papá le cuenta un secreto de cuando era chiquito… Un cuento infantil sobre aprender a perder, la frustración y la deportividad.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que perder también es parte del juego
• A manejar la frustración y el enojo
• A felicitar a los demás cuando ganan

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuentos sobre la frustración, saber perder y educación emocional para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#saberperder #frustracion #educacionemocional #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #videosparaniños #español`,
    tags: [
      'saber perder',
      'niños que no saben perder',
      'frustración en niños',
      'enojo infantil',
      'deportividad',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'educación emocional para niños',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
