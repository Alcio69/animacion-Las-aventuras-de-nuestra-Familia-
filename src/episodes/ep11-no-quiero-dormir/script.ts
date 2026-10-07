import type { Episode } from '../../engine/script';

/**
 * Capítulo 11 — ¡No quiero dormir! (valor: la rutina de la noche).
 * Night bedroom. Props at y=760 float at chest height (as if held).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep11-no-quiero-dormir',
  number: 11,
  title: '¡No quiero dormir!',
  subtitle: 'Tini inventa mil excusas para no ir a la cama…',
  music: 'calm',
  thumb: { bg: 'bedroom', text: '¡NO QUIERO DORMIR!', prop: 'teddy', exprs: { hija: 'angry', mama: 'sleepy', papa: 'sleepy', hijo: 'laugh' } },
  scenes: [
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 740, mood: 'excited' },
        mama: { x: 1150, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Hija, ya es hora de dormir.', expr: 'love' },
        { say: 'hija', text: '¡Pero no tengo nada de sueño! ¡Quiero jugar un poquito más!', expr: 'excited', act: 'jump' },
        { say: 'mama', text: 'Bueno, pero solo cinco minutos.', expr: 'happy' },
        { say: 'hija', text: 'Mamá, ¡tengo mucha sed! ¿Me traes un vaso de agua?', expr: 'worried' },
        { prop: 'glass', id: 'vaso', x: 860, y: HAND },
        { sfx: 'pop', with: true },
        { say: 'hija', text: 'Mamá, ¡quiero otro cuento! ¡Uno más, por favor!', expr: 'excited', act: 'cheer' },
        { removeProp: 'vaso' },
        { prop: 'book', id: 'cuento', x: 1050, y: HAND, with: true },
        { sfx: 'pop', with: true },
        { mood: 'sleepy', who: 'mama' },
        { removeProp: 'cuento', delay: 1 },
        { mood: 'worried', who: 'hija' },
        { say: 'hija', text: 'Mamá, ¡creo que hay un monstruo en el armario!', expr: 'worried', act: 'tremble' },
        { fx: 'exclaim', x: 740, y: 420, dur: 1.2, with: true },
        { sfx: 'drum', with: true, delay: 0.3 },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 740, mood: 'worried' },
        mama: { x: 1150, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'flashlight', id: 'linterna', x: 1260, y: HAND },
        { say: 'mama', text: 'Vamos a mirar juntas con la linterna.', expr: 'happy', act: 'point' },
        { wait: 0.6 },
        { prop: 'teddy', id: 'osito', x: 960, y: 960 },
        { sfx: 'sparkle', with: true },
        { say: 'mama', text: '¡Mira! No era un monstruo. ¡Era tu osito!', expr: 'laugh' },
        { sfx: 'giggle', with: true, delay: 1 },
        { mood: 'laugh', who: 'hija' },
        { removeProp: 'linterna' },
        { say: 'mama', text: 'Ahora te voy a enseñar la rutina mágica para dormir.', expr: 'love', act: 'wave' },
        { mood: 'excited', who: 'hija' },
        { say: 'mama', text: 'Primero, el pijama. Después, a lavarse los dientes.', expr: 'happy', act: 'point' },
        { prop: 'toothbrush', id: 'cepillo', x: 860, y: HAND },
        { sfx: 'pop', with: true },
        { removeProp: 'cepillo', delay: 1.6 },
        { say: 'mama', text: 'Luego, un cuento cortito. Y al final, un abrazo bien grande.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 900, y: 470, with: true, delay: 1.5 },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 740, mood: 'sleepy' },
        mama: { x: 1050, mood: 'love', facing: -1 },
        papa: { x: 1350, mood: 'love', facing: -1 },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 850, y: HAND },
        { say: 'hija', text: 'Me gusta la rutina mágica. Qué sueño tengo.', expr: 'sleepy' },
        { fx: 'zzz', x: 760, y: 430, dur: 2.5, with: true, delay: 0.8 },
        { say: 'papa', text: 'Buenas noches, princesa.', expr: 'love' },
        { say: 'mama', text: 'Dulces sueños, mi amor.', expr: 'love' },
        { mood: 'sleepy', who: ['hija', 'mama', 'papa'] },
        { fx: 'stars', x: 960, y: 360, dur: 2.4, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'narrador', text: 'Con una rutina tranquila, dormir es mucho más fácil. ¡Dulces sueños!', with: true, delay: 0.8 },
        { fx: 'zzz', x: 1060, y: 400, dur: 2.5, with: true, delay: 1.5 },
      ],
    },
  ],
  youtube: {
    title: '¡No Quiero Dormir! 🌙 La Rutina Mágica | Dibujos Animados para Niños en Español',
    description: `Tini no tiene nada de sueño… 🌙 Primero quiere jugar, después tiene sed, después quiere otro cuento… ¡y hasta cree que hay un monstruo en el armario! 😱 Pero Luna tiene un secreto: la rutina mágica para dormir. 🧸💤 Un cuento infantil corto para la hora de dormir.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Una rutina para dormir: pijama, dientes, cuento y abrazo
• Que los monstruos del armario no son reales
• Que descansar nos ayuda a crecer sanos

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Cuál es tu rutina mágica para dormir? ¡Armen juntos la suya esta noche!"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#cuentosparadormir #dibujosanimados #cuentosinfantiles`,
    tags: [
      'cuentos para dormir',
      'no quiero dormir',
      'rutina para dormir niños',
      'hora de dormir',
      'miedo a los monstruos',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'videos para dormir niños',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
