import type { Episode } from '../../engine/script';

/**
 * Capítulo 56 — ¡No quiero hacer la tarea! (valor: no dejar todo para último momento; cortar una tarea grande en
 * pedacitos, con el reloj de arena y descansos). Lio postpones his planets project, panics the night before, and
 * Max teaches him the "pedacitos" trick; Tini keeps him company. Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep56-no-quiero-hacer-la-tarea',
  number: 56,
  title: '¡No quiero hacer la tarea!',
  subtitle: 'Lio dejó su trabajo de los planetas para el último día… ¡y ahora parece imposible! Max le enseña un truco.',
  music: 'happy',
  thumb: { bg: 'school', text: '¡ES IMPOSIBLE!', prop: 'book', hero: ['hijo'], exprs: { hijo: 'angry' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 640, mood: 'happy' },
        mama: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 820, y: 960 },
        { say: 'mama', text: '¿Ya empezaste tu trabajo sobre los planetas, hijo? Es para el viernes.', expr: 'happy', act: 'point' },
        { say: 'hijo', text: 'Todavía no, mamá. Lo hago después. Primero quiero jugar un ratito más.', expr: 'happy', act: 'shrug' },
        { title: 'Al otro día...', dur: 1.4 },
        { say: 'mama', text: '¿Ya empezaste hoy el trabajo de los planetas, hijo?', expr: 'worried', act: 'shrug' },
        { say: 'hijo', text: '¡Lo hago mañana, mamá! Todavía tengo mucho tiempo.', expr: 'happy', act: 'wave' },
        { mood: 'worried', who: 'mama' },
        { fx: 'question', x: 1250, y: 430, with: true },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hijo: { x: 640, mood: 'angry' },
        hija: { x: 2250, mood: 'surprised', facing: -1 },
        papa: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'El jueves a la noche...', dur: 1.6 },
        { prop: 'table', id: 'mesa', x: 900, y: 900 },
        { prop: 'book', id: 'libro', x: 900, y: 760, scale: 1.6, with: true },
        { say: 'hijo', text: '¡Es imposible! ¡Es demasiado! ¡Nunca lo voy a terminar!', expr: 'angry', act: 'tremble' },
        { fx: 'sweat', x: 640, y: 440, with: true },
        { do: 'walk', who: 'hija', to: 1150 },
        { say: 'hija', text: '¿Qué te pasa, hermano? ¿Por qué estás tan enojado?', expr: 'surprised', act: 'shrug' },
        { say: 'hijo', text: 'Tengo que escribir sobre todos los planetas, ¡y es para mañana!', expr: 'sad', act: 'point' },
        { do: 'walk', who: 'papa', to: 1420 },
        { say: 'papa', text: 'Te entiendo, hijo. Cuando una tarea parece gigante, dan ganas de no empezar nunca.', expr: 'happy', act: 'nod' },
        { say: 'papa', text: '¿Sabes qué hago yo en el trabajo? Corto la tarea en pedacitos, y hago un pedacito por vez.', expr: 'happy', act: 'point' },
        { prop: 'timer', id: 'reloj', x: 1060, y: 760 },
        { sfx: 'ding', with: true },
        { say: 'papa', text: 'Con el reloj de arena, trabajas un pedacito, y después descansas un ratito.', expr: 'happy', act: 'nod' },
        { mood: 'neutral', who: 'hijo' },
        { say: 'hijo', text: 'Bueno. Primero el Sol. Después, Mercurio y Venus.', expr: 'neutral', act: 'nod' },
        { mood: 'happy', who: 'hija' },
        { say: 'hija', text: '¡Yo te acompaño! Voy a hacer mi tarea de dibujo, al lado tuyo, hermano.', expr: 'happy', act: 'cheer' },
        { do: 'think', who: ['hijo', 'hija'], dur: 2 },
        { fx: 'stars', x: 900, y: 480, with: true },
        { sfx: 'ding' },
        { say: 'papa', text: '¡Ya terminaste tres pedacitos! ¿Viste que sí puedes?', expr: 'proud', act: 'clap' },
        { mood: 'excited', who: 'hijo' },
        { do: 'think', who: 'hijo', dur: 1.6 },
        { sfx: 'tada' },
        { say: 'hijo', text: '¡Ya terminé todo el trabajo! ¡No era imposible, papá!', expr: 'excited', act: 'jump' },
        { fx: 'confetti', x: 900, y: 420, with: true },
        { say: 'papa', text: 'Y la próxima vez, podemos empezar antes, así no se junta todo al final.', expr: 'happy', act: 'nod' },
        { say: 'hijo', text: '¡Trato hecho! Voy a hacer un pedacito cada día, papá.', expr: 'proud', act: 'nod' },
        { do: 'hug', who: ['hijo', 'hija', 'papa'], dur: 1.6 },
        { fx: 'hearts', x: 1000, y: 450, with: true },
      ],
    },
    {
      bg: 'school',
      cast: {
        hijo: { x: 660, mood: 'happy' },
        benja: { x: 940, mood: 'happy', facing: -1 },
        maestra: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'El viernes, en la escuela...', dur: 1.6 },
        { say: 'maestra', text: '¡Muy buen trabajo sobre los planetas, Lio! Se nota que te esforzaste.', expr: 'proud', act: 'clap' },
        { say: 'hijo', text: '¡Gracias, maestra! Lo corté en pedacitos, y lo hice un poco cada vez.', expr: 'proud', act: 'point' },
        { say: 'benja', text: '¡Qué buen truco, Lio! Lo voy a probar con mi tarea de matemáticas.', expr: 'excited', act: 'cheer' },
        { sfx: 'tada', with: true },
        { fx: 'stars', x: 800, y: 440, with: true },
        { do: 'dance', who: ['hijo', 'benja'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Cuando una tarea parece muy grande, podemos cortarla en pedacitos, y hacer un pedacito por vez.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡No Quiero Hacer la Tarea! 📚 El Truco de los Pedacitos | Dibujos Animados para Niños en Español',
    description: `Lio tiene que hacer un trabajo sobre los planetas 🪐… pero siempre dice "¡lo hago después!". El jueves a la noche se da cuenta de que es para mañana: "¡Es imposible! ¡Es demasiado!" 😫 Max le enseña su truco: cortar la tarea en pedacitos y hacer uno por vez, con el reloj de arena y descansos cortos ⏳. Tini lo acompaña haciendo su tarea de dibujo, ¡y Lio descubre que no era imposible! 🌟 Un cuento infantil corto para dejar de postergar la tarea.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que dejar todo para el final hace que la tarea parezca imposible
• El truco de los pedacitos: dividir una tarea grande y hacer una parte por vez
• A usar el reloj de arena para trabajar un ratito y descansar otro

👨‍👩‍👧 Para papás y maestras: cuando un niño siente que la tarea es "demasiado", ayúdenlo a dividirla en pasos chiquitos y a celebrar cada uno. Un reloj o temporizador con descansos cortos ayuda mucho a empezar.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!
🎵 ¡Síguenos también en TikTok! Las Aventuras de Nuestra Familia

#tareas #dibujosanimados #cuentosinfantiles`,
    tags: [
      'tarea escolar',
      'no quiere hacer la tarea',
      'hábitos de estudio',
      'organización para niños',
      'postergar',
      'regreso a clases',
      'dibujos animados',
      'dibujos animados para niños',
      'caricaturas',
      'videos para niños',
      'cuentos infantiles',
      'cuentos para niños',
      'historias para niños',
      'videos educativos para niños',
      'animación infantil',
      'dibujos animados en español',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
