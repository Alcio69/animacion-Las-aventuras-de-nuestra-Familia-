import type { Episode } from '../../engine/script';

/**
 * Capítulo 6 — Mi primera pijamada (valor: enfrentar el miedo a dormir fuera de casa).
 * Floor is y=930. Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const HAND = 760; // props at y=760 float at chest height (as if held)

const episode: Episode = {
  id: 'ep06-mi-primera-pijamada',
  number: 6,
  title: 'Mi primera pijamada',
  subtitle: 'Tini está invitada a su primera pijamada… pero le da miedo dormir lejos de casa',
  music: 'calm',
  thumb: { bg: 'bedroom', text: '¡TENGO MIEDO!', prop: 'teddy', exprs: { hija: 'worried', hijo: 'happy', papa: 'love', mama: 'happy' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'excited' },
        mama: { x: 960, mood: 'happy', facing: -1 },
        hijo: { x: 1250, mood: 'happy', facing: -1 },
        papa: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: '¡Mamá! ¡Mi amiga Lola me invitó a su pijamada del sábado!', expr: 'excited', act: 'jump' },
        { say: 'mama', text: '¡Qué lindo! Tu primera pijamada.', expr: 'happy', act: 'clap' },
        { mood: 'worried', who: 'hija' },
        { say: 'hija', text: 'Pero, ¿y si me da miedo dormir lejos de casa?', expr: 'worried', act: 'shrug' },
        { mood: 'love', who: 'mama', with: true },
        { say: 'hijo', text: 'Yo también tuve miedo en mi primera pijamada.', expr: 'happy' },
        { do: 'walk', who: 'papa', to: 1500 },
        { say: 'papa', text: '¡Tengo una idea! Esta noche hacemos una pijamada de práctica, aquí en casa.', expr: 'excited', act: 'cheer' },
        { mood: 'excited', who: ['hija', 'hijo'] },
        { sfx: 'tada', with: true },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        mama: { x: 480, mood: 'happy' },
        hija: { x: 760, mood: 'happy' },
        hijo: { x: 1060, mood: 'excited', facing: -1 },
        papa: { x: 1360, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Esa noche...', dur: 1.8 },
        { prop: 'flashlight', id: 'linterna', x: 1180, y: HAND },
        { sfx: 'pop', with: true },
        { say: 'hijo', text: '¡Bienvenidos a la pijamada! Traje la linterna.', expr: 'excited', act: 'wave' },
        { mood: 'worried', who: 'hija' },
        { say: 'hija', text: 'Está muy oscuro. Tengo un poquito de miedo.', expr: 'worried', act: 'tremble' },
        { say: 'mama', text: 'Cuando tengas miedo, abraza a tu osito y respira despacio.', expr: 'love', act: 'hug' },
        { prop: 'teddy', id: 'osito', x: 860, y: HAND },
        { sfx: 'sparkle', with: true },
        { fx: 'hearts', x: 820, y: 520, dur: 1.6, with: true },
        { mood: 'love', who: 'hija' },
        { say: 'hija', text: 'Respiro despacio. ¡Ya me siento mejor!', expr: 'happy', act: 'nod' },
        { say: 'papa', text: 'Y recuerda: siempre puedes llamarnos cuando quieras.', expr: 'love' },
        { mood: 'sleepy', who: ['hija', 'hijo', 'mama', 'papa'] },
        { say: 'hija', text: 'Qué sueño. Buenas noches, familia.', expr: 'sleepy' },
        { fx: 'zzz', x: 800, y: 430, dur: 2.5, with: true, delay: 0.5 },
        { fx: 'zzz', x: 1100, y: 400, dur: 2.5, with: true, delay: 0.9 },
        { wait: 1.2 },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'excited' },
        mama: { x: 960, mood: 'happy', facing: -1 },
        papa: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'El sábado...', dur: 1.6 },
        { prop: 'teddy', id: 'osito', x: 760, y: HAND },
        { say: 'hija', text: '¡Ya estoy lista para mi pijamada! Llevo a mi osito.', expr: 'excited', act: 'jump' },
        { say: 'mama', text: '¡Qué valiente eres, hija!', expr: 'love', act: 'hug' },
        { say: 'hija', text: '¡Ya no tengo miedo! ¡Va a ser muy divertido!', expr: 'laugh', act: 'cheer' },
        { fx: 'hearts', x: 640, y: 480, with: true, delay: 0.4 },
        { do: 'dance', who: ['hija', 'mama', 'papa'], dur: 3, expr: 'laugh' },
        { fx: 'stars', x: 960, y: 380, dur: 2.2, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Con un poco de práctica, los miedos se hacen chiquitos.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Mi Primera Pijamada 🌙 ¡Tengo Miedo! | Las Aventuras de Nuestra Familia | Cuentos para Dormir',
    description: `¡Tini está invitada a su primera pijamada! 🎉 Pero… ¿y si le da miedo dormir lejos de casa? 😟🌙 Max tiene una gran idea: ¡una pijamada de práctica en casa, con linterna y osito incluidos! 🧸🔦 Un cuento infantil para perderle el miedo a la oscuridad y a dormir fuera de casa.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que está bien sentir miedo ante algo nuevo
• Un truco para calmarnos: abrazar al osito y respirar despacio
• Que practicar hace que los miedos se hagan chiquitos

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, cuentos para dormir, miedo a la oscuridad y educación emocional para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#pijamada #miedoaladormir #cuentosparadormir #cuentosinfantiles #dibujosanimados #cuentosparaniños #educacionemocional #animacion3d #videosparaniños #español`,
    tags: [
      'primera pijamada',
      'pijamada',
      'miedo a dormir fuera de casa',
      'miedo a la oscuridad',
      'cuentos para dormir',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'educación emocional para niños',
      'cuentos con valores',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
