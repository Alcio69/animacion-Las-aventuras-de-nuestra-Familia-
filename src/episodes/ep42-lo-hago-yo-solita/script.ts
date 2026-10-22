import type { Episode } from '../../engine/script';

/**
 * Capítulo 42 — ¡Lo hago yo solita! (valor: autonomía; se aprende de a poquito; pedir ayuda también es de grandes).
 * Tini wants to do everything alone, spills the milk; Max helps her learn step by step. Kitchen counter y=562.
 * Keep characters between x≈400 and x≈1550.
 */
const COUNTER = 562;

const episode: Episode = {
  id: 'ep42-lo-hago-yo-solita',
  number: 42,
  title: '¡Lo hago yo solita!',
  subtitle: 'Tini quiere hacer todo sola… hasta que se le vuelca la leche',
  music: 'happy',
  thumb: { bg: 'kitchen', text: '¡YO SOLITA!', prop: 'jug', hero: ['hija'], exprs: { hija: 'angry' } },
  scenes: [
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 760, mood: 'excited' },
        papa: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'jug', id: 'jarra', x: 1010, y: COUNTER },
        { prop: 'glass', id: 'vaso', x: 880, y: COUNTER, with: true },
        { say: 'hija', text: '¡Hoy quiero hacer todo solita! Ya soy grande.', expr: 'proud', act: 'cheer' },
        { say: 'papa', text: '¿Te ayudo a servir la leche, hija?', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¡No hace falta, papá! Yo puedo sola.', expr: 'proud', act: 'hips' },
        { moveProp: 'jarra', x: 930, y: COUNTER, dur: 0.8, arc: 50 },
        { wait: 0.3 },
        { moveProp: 'jarra', x: 860, y: 960, dur: 0.7, arc: 60 },
        { sfx: 'crash', with: true, delay: 0.5 },
        { prop: 'milkSpill', id: 'leche', x: 900, y: 975, with: true, delay: 0.6 },
        { mood: 'surprised', who: ['hija', 'papa'], with: true, delay: 0.5 },
        { fx: 'exclaim', x: 760, y: 470, with: true, delay: 0.6 },
        { mood: 'angry', who: 'hija' },
        { say: 'hija', text: '¡No me sale nada! ¡Soy un desastre!', expr: 'angry', act: 'tremble' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 760, mood: 'sad' },
        papa: { x: 1100, mood: 'love', facing: -1 },
      },
      steps: [
        { prop: 'milkSpill', id: 'leche', x: 900, y: 975 },
        { say: 'papa', text: 'No eres un desastre, hija. Estás aprendiendo, y aprender lleva tiempo.', expr: 'love', act: 'hug' },
        { say: 'papa', text: '¿Sabes un secreto? Los grandes también pedimos ayuda cuando algo nos cuesta.', expr: 'wink', act: 'point' },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¿En serio? ¿Tú también pides ayuda, papá?', expr: 'surprised' },
        { say: 'papa', text: '¡Claro! Cuando algo no me sale, le pido ayuda a mamá, o a tu hermano.', expr: 'happy', act: 'nod' },
        { say: 'papa', text: 'Probemos con una jarra más chiquita. Yo sostengo el vaso, y tú sirves.', expr: 'happy', act: 'point' },
        { mood: 'happy', who: 'hija' },
        { say: 'hija', text: '¡Bueno! Me ayudas un poquito, y el resto lo hago yo.', expr: 'happy', act: 'nod' },
        { removeProp: 'leche' },
        { fx: 'sparkle', x: 900, y: 880, with: true },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 760, mood: 'happy' },
        hijo: { x: 480, mood: 'happy' },
        papa: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'jug', id: 'jarrita', x: 1010, y: COUNTER, scale: 0.7 },
        { prop: 'glass', id: 'vaso', x: 900, y: COUNTER, with: true },
        { title: 'A la mañana siguiente...', dur: 1.6 },
        { moveProp: 'jarrita', x: 950, y: COUNTER, dur: 0.9, arc: 50 },
        { wait: 0.6 },
        { moveProp: 'jarrita', x: 1010, y: COUNTER, dur: 0.8, arc: 40 },
        { fx: 'sparkle', x: 900, y: 500, with: true },
        { sfx: 'ding', with: true },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Mira, papá! ¡Ahora me salió perfecto, y yo solita!', expr: 'excited', act: 'jump' },
        { say: 'hijo', text: '¡Muy bien, hermanita! ¡Y no se volcó ni una gota!', expr: 'excited', act: 'clap' },
        { say: 'hija', text: 'Y si algo me cuesta, pido ayuda. ¡Eso también es de grande!', expr: 'proud', act: 'cheer' },
        { say: 'papa', text: '¡Así se hace, campeona! Paso a paso, todo se aprende.', expr: 'proud', act: 'clap' },
        { do: 'dance', who: ['hijo', 'hija', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Hacer cosas solos se aprende de a poquito, y pedir ayuda también es de valientes.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Lo Hago Yo Solita! 🥛 Autonomía y Pedir Ayuda | Dibujos Animados para Niños en Español',
    description: `¡Tini quiere hacer todo solita! 💪 "No hace falta, papá, yo puedo sola"… pero al servir la leche, ¡se vuelca todo! 🥛😱 "¡Soy un desastre!", dice. Max le cuenta un secreto: los grandes también piden ayuda cuando algo les cuesta, y aprender lleva tiempo. ¿Lo logrará Tini a la mañana siguiente? 💛 Un cuento infantil corto sobre la autonomía, la frustración y pedir ayuda.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que hacer cosas solos se aprende de a poquito
• Que equivocarse es parte de aprender
• Que pedir ayuda también es de grandes

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué cosa aprendiste a hacer solito? ¿Qué te gustaría aprender ahora?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#autonomia #dibujosanimados #cuentosinfantiles`,
    tags: [
      'lo hago yo solo',
      'autonomía infantil',
      'pedir ayuda',
      'frustración en niños',
      'independencia para niños',
      'aprender de los errores',
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
