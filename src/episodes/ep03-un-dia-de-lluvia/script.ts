import type { Episode } from '../../engine/script';

/**
 * Capítulo 3 — Un día de lluvia (valor: imaginación / el aburrimiento se combate jugando juntos).
 * Floor is y=930. Screen x goes 0 (left) → 1920 (right). Off-screen: -250 / 2250.
 * The living-room window is on the left (x≈340).
 */
const episode: Episode = {
  id: 'ep03-un-dia-de-lluvia',
  number: 3,
  title: 'Un día de lluvia',
  subtitle: 'Llueve, no pueden salir… ¿será el día más aburrido del mundo?',
  music: 'calm',
  thumb: { bg: 'living', variant: 'rain', text: '¡ME ABURRO!', prop: 'balloon', exprs: { hijo: 'sad', hija: 'sleepy', papa: 'excited', mama: 'happy' } },
  scenes: [
    {
      bg: 'living',
      variant: 'rain',
      ambience: 'rain',
      zoom: [1.1, 1.18],
      focus: [820, 860],
      cast: {
        hijo: { x: 720, mood: 'sad', facing: -1 },
        hija: { x: 1000, mood: 'sad', facing: -1 },
      },
      steps: [
        { wait: 0.8 },
        { say: 'hijo', text: '¡Qué pena! Está lloviendo y no podemos ir al parque.', expr: 'sad', act: 'shrug' },
        { say: 'hija', text: 'Me aburro mucho. No hay nada para hacer.', expr: 'sleepy' },
        { fx: 'zzz', x: 1040, y: 420, dur: 2.2, with: true, delay: 0.5 },
        { wait: 0.6 },
        { sfx: 'thunder' },
        { mood: 'surprised', who: ['hijo', 'hija'], with: true, delay: 0.1 },
        { do: 'jump', who: 'hija', with: true, delay: 0.15 },
        { fx: 'exclaim', x: 1000, y: 380, dur: 1.2, with: true, delay: 0.15 },
        { wait: 1.2 },
        { say: 'hija', text: '¡Qué susto me dio ese trueno!', expr: 'surprised', act: 'tremble' },
        { mood: 'sad', who: ['hijo', 'hija'] },
        { say: 'hijo', text: 'Este va a ser el día más aburrido del mundo.', expr: 'sad' },
      ],
    },
    {
      bg: 'living',
      variant: 'rain',
      ambience: 'rain',
      cast: {
        hijo: { x: 680, mood: 'sad', facing: -1 },
        hija: { x: 960, mood: 'sad', facing: -1 },
        papa: { x: 2250, mood: 'happy', facing: -1 },
        mama: { x: -250, mood: 'happy' },
      },
      steps: [
        { do: 'walk', who: 'papa', to: 1340 },
        { say: 'papa', text: '¿Aburridos? ¡Yo tengo una idea!', expr: 'excited', act: 'wave' },
        { mood: 'surprised', who: ['hijo', 'hija'], with: true },
        { prop: 'balloon', id: 'globo', x: 1180, y: 930 },
        { sfx: 'pop', with: true },
        { say: 'papa', text: 'Juguemos a que el globo nunca toque el piso.', expr: 'happy', act: 'point' },
        { mood: 'excited', who: ['hijo', 'hija'] },
        { moveProp: 'globo', x: 980, y: 930, dur: 1.6, arc: 240 },
        { do: 'jump', who: 'hija', with: true, delay: 0.9 },
        { sfx: 'boing', with: true, delay: 1.2 },
        { moveProp: 'globo', x: 700, y: 930, dur: 1.6, arc: 280 },
        { do: 'jump', who: 'hijo', with: true, delay: 0.9 },
        { sfx: 'boing', with: true, delay: 1.2 },
        { moveProp: 'globo', x: 1180, y: 930, dur: 1.8, arc: 300 },
        { do: 'jump', who: 'papa', with: true, delay: 1.1 },
        { sfx: 'giggle', with: true, delay: 1.3 },
        { mood: 'laugh', who: ['hijo', 'hija', 'papa'] },
        { say: 'hija', text: '¡Esto es muy divertido!', expr: 'laugh', act: 'cheer' },
        { do: 'walk', who: 'mama', to: 400 },
        { say: 'mama', text: 'Y cuando se cansen, ¡les cuento una historia de piratas!', expr: 'happy', act: 'wave' },
        { say: 'hijo', text: '¡Sí! ¡Piratas!', expr: 'excited', act: 'jump' },
        { title: 'Un ratito después...', dur: 1.8 },
      ],
    },
    {
      bg: 'living',
      variant: 'rainbow',
      cast: {
        mama: { x: 560, mood: 'happy' },
        hija: { x: 860, mood: 'happy', facing: -1 },
        hijo: { x: 1120, mood: 'happy', facing: -1 },
        papa: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { wait: 0.4 },
        { say: 'hija', text: '¡Miren todos! ¡Dejó de llover y salió un arcoíris!', expr: 'excited', act: 'point' },
        { fx: 'sparkle', x: 340, y: 430, dur: 2, with: true, delay: 0.4 },
        { sfx: 'sparkle', with: true, delay: 0.4 },
        { say: 'hijo', text: '¡Fue el día de lluvia más divertido de todos!', expr: 'laugh', act: 'cheer' },
        { say: 'papa', text: 'Con un poco de imaginación, cualquier día es una aventura.', expr: 'proud', act: 'hips' },
        { do: 'dance', who: ['papa', 'mama', 'hijo', 'hija'], dur: 3.2, expr: 'laugh' },
        { fx: 'stars', x: 960, y: 380, dur: 2.2, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Cuando usamos la imaginación, nunca hay días aburridos.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Me Aburro! ☔ Un Día de Lluvia | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Llueve y no se puede salir a jugar… 🌧️ Lio y Tini están súper aburridos, ¡y encima un trueno los asusta! Pero Max y Luna tienen ideas geniales para convertir el día de lluvia en una aventura. 🎈🏴‍☠️🌈 Un cuento infantil sobre la imaginación y cómo jugar en casa.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Qué hacer cuando nos aburrimos
• Que la imaginación convierte cualquier día en una aventura
• Juegos para hacer en casa en familia (¡el globo que no toca el piso!)

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuentos cortos con valores, ideas para días de lluvia y videos educativos para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#diadelluvia #meaburro #cuentosinfantiles #dibujosanimados #cuentosparaniños #juegosencasa #imaginacion #animacion3d #videosparaniños #español`,
    tags: [
      'día de lluvia',
      'me aburro',
      'qué hacer cuando llueve',
      'juegos en casa para niños',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'cuentos con valores',
      'imaginación',
      'arcoíris',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
