import type { Episode } from '../../engine/script';

/**
 * Capítulo 12 — Mi amigo Tomi (valor: inclusión; ser diferentes nos hace especiales).
 * Guests: `tomi` (bunny, uses a wheelchair → `vehicle: 'wheelchair'`), `benja` (classmate).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const episode: Episode = {
  id: 'ep12-mi-amigo-tomi',
  number: 12,
  title: 'Mi amigo Tomi',
  subtitle: 'Llega un compañero nuevo que usa silla de ruedas… ¿podrá jugar con ellos?',
  music: 'happy',
  thumb: { bg: 'park', text: '¡UN AMIGO NUEVO!', prop: 'ball', exprs: { hijo: 'excited', hija: 'happy', papa: 'love', mama: 'love' } },
  scenes: [
    {
      bg: 'school',
      cast: {
        hijo: { x: 560, mood: 'happy' },
        benja: { x: 820, mood: 'happy' },
        tomi: { x: 2250, mood: 'happy', facing: -1, vehicle: 'wheelchair' },
      },
      steps: [
        { say: 'hijo', text: '¡Vengan a ver! Llegó un compañero nuevo a la escuela.', expr: 'surprised', act: 'point' },
        { do: 'walk', who: 'tomi', to: 1250 },
        { say: 'tomi', text: '¡Hola! Me llamo Tomi. Me mudé hace poquito.', expr: 'happy', act: 'wave' },
        { say: 'benja', text: 'Hijo, Tomi usa silla de ruedas. ¿Cómo va a jugar con nosotros?', expr: 'worried' },
        { say: 'hijo', text: 'No sé. A lo mejor no puede jugar a la pelota.', expr: 'worried', act: 'shrug' },
        { mood: 'sad', who: 'tomi' },
        { wait: 0.6 },
        { mood: 'proud', who: 'tomi' },
        { say: 'tomi', text: 'Yo puedo jugar a muchísimas cosas. ¡Solo que a veces las juego distinto!', expr: 'proud', act: 'hips' },
        { mood: 'surprised', who: ['hijo', 'benja'] },
        { say: 'tomi', text: 'En el recreo les enseño mi juego favorito. ¿Vamos?', expr: 'excited', act: 'cheer' },
      ],
    },
    {
      bg: 'park',
      cast: {
        hijo: { x: 520, mood: 'happy' },
        benja: { x: 800, mood: 'happy' },
        tomi: { x: 1180, mood: 'excited', facing: -1, vehicle: 'wheelchair' },
      },
      steps: [
        { title: 'En el recreo...', dur: 1.6 },
        { prop: 'ball', id: 'pelota', x: 1080, y: 960 },
        { say: 'tomi', text: '¡Juguemos a pasarnos la pelota bien rápido!', expr: 'excited', act: 'point' },
        { moveProp: 'pelota', x: 620, y: 960, dur: 1, arc: 240 },
        { sfx: 'boing', with: true, delay: 0.9 },
        { do: 'jump', who: 'hijo', with: true, delay: 0.5 },
        { moveProp: 'pelota', x: 1450, y: 960, dur: 1.2, arc: 260 },
        { do: 'run', who: 'tomi', to: 1420, with: true, delay: 0.1 },
        { sfx: 'boing', with: true, delay: 1.1 },
        { do: 'run', who: 'tomi', to: 1180 },
        { moveProp: 'pelota', x: 1080, y: 960, dur: 0.6, with: true },
        { mood: 'excited', who: ['hijo', 'benja'] },
        { say: 'hijo', text: '¡Tomi, eres súper rápido con tu silla!', expr: 'excited', act: 'cheer' },
        { say: 'benja', text: '¡Y lanzas la pelota mejor que nadie!', expr: 'laugh', act: 'clap' },
        { mood: 'sad', who: 'hijo' },
        { say: 'hijo', text: 'Perdón, Tomi. Pensé que no ibas a poder jugar.', expr: 'sad' },
        { say: 'tomi', text: 'No pasa nada. Todos somos diferentes, ¡y eso es lo divertido!', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 1100, y: 520, with: true, delay: 0.5 },
      ],
    },
    {
      bg: 'park',
      variant: 'sunset',
      cast: {
        hijo: { x: 560, mood: 'happy' },
        tomi: { x: 860, mood: 'happy', vehicle: 'wheelchair' },
        benja: { x: 1160, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hijo', text: '¿Mañana jugamos otra vez, amigo?', expr: 'happy', act: 'wave' },
        { say: 'tomi', text: '¡Claro que sí! ¡Ahora somos un equipo!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hijo', 'tomi', 'benja'], dur: 3, expr: 'laugh' },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Ser diferentes nos hace especiales. ¡Y todos podemos jugar juntos!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Mi Amigo Tomi 🐰 Un Amigo Diferente | Las Aventuras de Nuestra Familia | Cuentos sobre Inclusión',
    description: `A la escuela de Hijo llega Tomi, un compañero nuevo que usa silla de ruedas. 🐰♿ Al principio los chicos piensan que no va a poder jugar con ellos… ¡pero Tomi les demuestra que es el más rápido del recreo! ⚽ Un cuento infantil sobre la inclusión, la diversidad y la amistad.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que todos somos diferentes, y eso es lo lindo
• A no juzgar sin conocer
• Que todos podemos jugar juntos

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuentos sobre inclusión, diversidad, discapacidad y amistad para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#inclusion #diversidad #amistad #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #videosparaniños #español`,
    tags: [
      'inclusión para niños',
      'cuento sobre inclusión',
      'diversidad para niños',
      'amigo en silla de ruedas',
      'discapacidad cuento infantil',
      'amistad',
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
