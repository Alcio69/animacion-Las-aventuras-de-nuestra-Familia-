import type { Episode } from '../../engine/script';

/**
 * Capítulo 33 — ¡Cinco minutitos más! (valor: rutinas; dormir temprano y preparar las cosas la noche anterior).
 * Lio doesn't want to get up for school, runs late and forgets things; that night he goes to bed early and wakes up on time.
 * Bedroom 'day' = morning, plain bedroom = night. Keep characters between x≈400 and x≈1550.
 */
const COUNTER = 562;
const HAND = 760;

const episode: Episode = {
  id: 'ep33-cinco-minutitos-mas',
  number: 33,
  title: '¡Cinco minutitos más!',
  subtitle: 'Lio no se quiere levantar para ir a la escuela… y llega tarde',
  music: 'happy',
  thumb: { bg: 'bedroom', variant: 'day', text: '¡5 MINUTITOS MÁS!', prop: 'book', exprs: { hijo: 'sleepy', mama: 'surprised', hija: 'laugh', papa: 'laugh' } },
  scenes: [
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: 640, mood: 'sleepy' },
        mama: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { fx: 'zzz', x: 660, y: 420, dur: 2.4 },
        { sfx: 'ding' },
        { sfx: 'ding', delay: 0.5 },
        { do: 'walk', who: 'mama', to: 1250 },
        { say: 'mama', text: '¡Buenos días! ¡Arriba, hijo! Es hora de ir a la escuela.', expr: 'happy', act: 'wave' },
        { say: 'hijo', text: 'Cinco minutitos más, mamá. Tengo muchísimo sueño.', expr: 'sleepy', act: 'shake' },
        { fx: 'zzz', x: 660, y: 420, dur: 2.2 },
        { wait: 0.8 },
        { say: 'mama', text: 'Ya pasaron los cinco minutos. ¡Vamos que llegamos tarde!', expr: 'worried', act: 'point' },
        { mood: 'surprised', who: 'hijo' },
        { fx: 'exclaim', x: 640, y: 440, with: true },
        { say: 'hijo', text: '¡No puede ser! ¡Ya es muy tarde!', expr: 'surprised', act: 'jump' },
        { do: 'run', who: 'hijo', to: 2250 },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 820, mood: 'happy' },
        papa: { x: 1300, mood: 'happy', facing: -1 },
        hijo: { x: -250, mood: 'worried' },
      },
      steps: [
        { prop: 'cookiePlate', id: 'desayuno', x: 1000, y: COUNTER },
        { prop: 'teacup', id: 'leche', x: 1180, y: COUNTER, with: true },
        { prop: 'book', id: 'cuaderno', x: 760, y: COUNTER, with: true },
        { do: 'run', who: 'hijo', to: 520 },
        { say: 'hijo', text: '¡Me voy, me voy! ¡Llego tarde a la escuela!', expr: 'worried', act: 'wave' },
        { say: 'hija', text: '¡Hermano, te olvidaste de desayunar!', expr: 'surprised', act: 'point' },
        { say: 'papa', text: '¿Y tu cuaderno de tarea? Quedó sobre la mesada.', expr: 'worried', act: 'point' },
        { mood: 'sad', who: 'hijo' },
        { fx: 'sweat', x: 520, y: 480, with: true },
        { say: 'hijo', text: '¡Por levantarme tarde me olvidé de todo!', expr: 'sad', act: 'shrug' },
      ],
    },
    {
      bg: 'school',
      cast: {
        benja: { x: 600, mood: 'happy' },
        maestra: { x: 1300, mood: 'happy', facing: -1 },
        hijo: { x: -250, mood: 'worried' },
      },
      steps: [
        { do: 'run', who: 'hijo', to: 900 },
        { say: 'maestra', text: 'Llegaste tarde, Lio. La clase ya empezó.', expr: 'neutral', act: 'hips' },
        { say: 'hijo', text: 'Perdón, maestra. Me quedé dormido y me olvidé la tarea.', expr: 'sad' },
        { say: 'benja', text: 'No te preocupes, Lio. Mañana va a salir mejor.', expr: 'happy', act: 'hug' },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hijo: { x: 640, mood: 'neutral' },
        papa: { x: 1250, mood: 'love', facing: -1 },
      },
      steps: [
        { title: 'Esa noche...', dur: 1.6 },
        { say: 'papa', text: '¿Sabes por qué te costó tanto levantarte? Anoche te dormiste muy tarde, hijo.', expr: 'love' },
        { say: 'hijo', text: '¡Ya sé! Esta noche me voy a dormir temprano. ¡Y dejo el cuaderno listo!', expr: 'excited', act: 'point' },
        { prop: 'book', id: 'cuaderno', x: 900, y: HAND },
        { sfx: 'pop', with: true },
        { say: 'papa', text: '¡Muy buena idea! Que descanses, campeón.', expr: 'proud', act: 'hug' },
        { mood: 'sleepy', who: 'hijo' },
        { fx: 'zzz', x: 660, y: 420, dur: 2 },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: 640, mood: 'happy' },
        mama: { x: 1250, mood: 'happy', facing: -1 },
        hija: { x: 1500, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'book', id: 'cuaderno', x: 900, y: HAND },
        { title: 'A la mañana siguiente...', dur: 1.8 },
        { sfx: 'ding' },
        { say: 'hijo', text: '¡Buenos días! ¡Me desperté solito y con mucha energía!', expr: 'excited', act: 'cheer' },
        { fx: 'stars', x: 640, y: 420, with: true },
        { say: 'mama', text: '¡Qué bien, hijo! Hoy vas a llegar a tiempo.', expr: 'proud', act: 'clap' },
        { say: 'hija', text: '¡Y hoy desayunamos juntos, hermano!', expr: 'laugh', act: 'jump' },
        { do: 'dance', who: ['hijo', 'mama', 'hija'], dur: 2.6, expr: 'laugh' },
        { say: 'narrador', text: 'Dormir temprano y preparar todo la noche anterior hace que las mañanas sean más felices.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Cinco Minutitos Más! ⏰ No Quiero Levantarme | Dibujos Animados para Niños en Español',
    description: `¡Suena el despertador! ⏰ Pero Lio no se quiere levantar para ir a la escuela: "Cinco minutitos más, mamá…" 😴 Cuando por fin se despierta, ¡es tardísimo! Sale corriendo sin desayunar, se olvida el cuaderno y llega tarde a clase. 😟 Esa noche, Max lo ayuda a descubrir el secreto de las mañanas felices. ☀️ Un cuento infantil corto sobre las rutinas y la hora de levantarse.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que dormir temprano nos ayuda a levantarnos con energía
• A preparar la mochila la noche anterior
• Que las mañanas tranquilas empiezan la noche antes

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué podemos dejar listo a la noche para que la mañana sea más fácil? ¡Armen juntos su rutina!"

📺 Más capítulos de Las Aventuras de Nuestra Familia, ¡uno nuevo cada semana! Suscríbete para no perderte ninguno.

#rutinas #dibujosanimados #cuentosinfantiles`,
    tags: [
      'no quiero levantarme',
      'levantarse temprano',
      'rutina de la mañana',
      'ir a la escuela',
      'llegar tarde',
      'hábitos para niños',
      'rutinas para niños',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
