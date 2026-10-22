import type { Episode } from '../../engine/script';

/**
 * Capítulo 46 — ¡Te extraño, papá! (valor: extrañar a alguien; el amor sigue aunque esté lejos; esperar).
 * Max travels 3 days for work; a countdown calendar, a video call and a welcome party. Max's call is an off-screen
 * voice (tablet on screen). "In the hand" y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep46-te-extrano-papa',
  number: 46,
  title: '¡Te extraño, papá!',
  subtitle: 'Max se va de viaje por trabajo tres días… ¡y Lio y Tini lo extrañan muchísimo!',
  music: 'calm',
  thumb: { bg: 'living', text: '¡TE EXTRAÑO!', prop: 'suitcase', hero: ['hija'], exprs: { hija: 'sad' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 520, mood: 'happy' },
        hija: { x: 780, mood: 'happy' },
        papa: { x: 1200, mood: 'love', facing: -1 },
      },
      steps: [
        { prop: 'suitcase', id: 'valija', x: 1400, y: 960 },
        { say: 'papa', text: 'Chicos, mañana me voy de viaje por trabajo. Vuelvo en tres días.', expr: 'love', act: 'point' },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: '¡Pero tres días es muchísimo tiempo, papá!', expr: 'sad', act: 'tremble' },
        { mood: 'worried', who: 'hijo' },
        { say: 'hijo', text: '¿Y quién nos va a leer el cuento a la noche?', expr: 'worried', act: 'shrug' },
        { say: 'papa', text: 'Aunque esté lejos, los voy a pensar todo el tiempo. Y los voy a llamar todas las noches.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 960, y: 440, with: true, delay: 1 },
        { say: 'papa', text: 'Mamá les va a leer el cuento. ¡Y cuando vuelva, les cuento todo!', expr: 'happy', act: 'nod' },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hijo: { x: 560, mood: 'sad' },
        hija: { x: 820, mood: 'sad' },
        mama: { x: 1200, mood: 'love', facing: -1 },
      },
      steps: [
        { prop: 'calendar', id: 'calendario', x: 1000, y: HAND },
        { title: 'Esa noche...', dur: 1.6 },
        { say: 'hija', text: 'Extraño mucho a papá. La casa está muy rara sin él.', expr: 'sad' },
        { say: 'mama', text: 'Yo también lo extraño. Extrañar es una forma de querer.', expr: 'love', act: 'hug' },
        { say: 'mama', text: 'Hagamos un calendario: cada noche tachamos un día, hasta que vuelva papá.', expr: 'happy', act: 'point' },
        { mood: 'excited', who: 'hijo' },
        { say: 'hijo', text: '¡Y le hacemos dibujos para cuando llegue!', expr: 'excited', act: 'cheer' },
        { prop: 'tablet', id: 'tablet', x: 1080, y: HAND },
        { sfx: 'ding', with: true },
        { mood: 'excited', who: 'hija' },
        { say: 'papa', text: '¡Hola, mis amores! Los extraño muchísimo. ¿Ya tacharon un día?', expr: 'love' },
        { say: 'hija', text: '¡Claro que sí, papá! ¡Ya falta poquito!', expr: 'excited', act: 'jump' },
        { fx: 'hearts', x: 1080, y: 560, with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 520, mood: 'excited' },
        hija: { x: 780, mood: 'excited' },
        mama: { x: 1080, mood: 'happy', facing: -1 },
        papa: { x: 2250, mood: 'excited', facing: -1 },
      },
      steps: [
        { title: 'Tres días después...', dur: 1.6 },
        { sfx: 'doorbell' },
        { do: 'walk', who: 'papa', to: 1360, dur: 2.6 },
        { say: 'hija', text: '¡Papá volvió a casa! ¡Te extrañamos muchísimo!', expr: 'excited', act: 'jump' },
        { fx: 'confetti', x: 960, y: 320, dur: 2.5, with: true },
        { sfx: 'tada', with: true },
        { say: 'papa', text: 'Y yo a ustedes. ¡Fueron los tres días más largos del mundo!', expr: 'love', act: 'hug' },
        { prop: 'drawing', id: 'dibujo', x: 650, y: HAND },
        { sfx: 'sparkle', with: true },
        { say: 'hijo', text: '¡Te hicimos un dibujo de bienvenida, papá!', expr: 'excited', act: 'cheer' },
        { say: 'mama', text: '¡Qué lindo es estar todos juntos otra vez!', expr: 'love', act: 'clap' },
        { do: 'dance', who: ['hijo', 'hija', 'mama', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Extrañar es una forma de querer. Y aunque estemos lejos, el amor nos mantiene cerca.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Te Extraño, Papá! ✈️ Cuando Papá Viaja por Trabajo | Dibujos Animados para Niños en Español',
    description: `Max se va de viaje por trabajo… ¡tres días! ✈️😢 "¡Es muchísimo tiempo, papá!", dice Tini. "¿Y quién nos va a leer el cuento?", pregunta Lio. Esa noche lo extrañan mucho, pero Luna tiene una idea: un calendario para tachar los días 📅, dibujos para cuando vuelva y una videollamada con papá. 💛 ¡Y cuando Max llega, lo reciben con una fiesta! Un cuento infantil corto sobre extrañar a alguien que queremos.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que extrañar es una forma de querer
• Ideas para la espera: un calendario, dibujos y llamadas
• Que aunque estemos lejos, el amor nos mantiene cerca

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿A quién extrañas cuando no está? ¿Qué te ayuda a esperar?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#familia #dibujosanimados #cuentosinfantiles`,
    tags: [
      'te extraño papá',
      'papá viaja por trabajo',
      'extrañar a alguien',
      'ansiedad por separación',
      'cuando mamá o papá viaja',
      'emociones para niños',
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
