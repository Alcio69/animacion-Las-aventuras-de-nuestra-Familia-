import type { Episode } from '../../engine/script';

/**
 * Capítulo 50 — Mi compañero Juanchi (valor: inclusión; el autismo explicado a los chicos; ser distinto no está mal).
 * Juanchi (autistic) joins Tini's class: loud noises bother him, eye contact is hard for him, he loves trains.
 * Careful framing: specific to Juanchi ("a Juanchi le cuesta…"), never "enfermedad". Keep characters x≈400–1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep50-mi-companero-juanchi',
  number: 50,
  title: 'Mi compañero Juanchi',
  subtitle: 'Llega un compañero nuevo a la clase de Tini… y no se parece a nadie',
  music: 'calm',
  thumb: { bg: 'school', text: '¿POR QUÉ NO ME MIRA?', prop: 'trainToy', hero: ['hija', 'juanchi'], exprs: { hija: 'surprised', juanchi: 'neutral' } },
  scenes: [
    {
      bg: 'school',
      cast: {
        hija: { x: 520, mood: 'happy' },
        mati: { x: 760, mood: 'happy' },
        juanchi: { x: 1040, mood: 'neutral' },
        maestra: { x: 1360, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'trainToy', id: 'tren', x: 1110, y: HAND },
        { say: 'maestra', text: 'Chicos, les presento a Juanchi. Desde hoy es su nuevo compañero.', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¡Hola, Juanchi! ¡Bienvenido a nuestra clase!', expr: 'excited', act: 'wave' },
        { do: 'look', who: 'juanchi', dur: 1.4 },
        { mood: 'surprised', who: 'mati' },
        { say: 'mati', text: '¿Por qué no nos mira ni nos saluda? Es un poco raro.', expr: 'surprised', act: 'shrug' },
        { sfx: 'ding' },
        { sfx: 'ding', with: true, delay: 0.3 },
        { sfx: 'ding', with: true, delay: 0.6 },
        { mood: 'worried', who: 'juanchi' },
        { do: 'tremble', who: 'juanchi', dur: 1.6 },
        { say: 'juanchi', text: '¡Ese ruido es muy fuerte! ¡No me gusta!', expr: 'worried', act: 'shake' },
        { mood: 'worried', who: 'hija' },
      ],
    },
    {
      bg: 'school',
      cast: {
        hija: { x: 560, mood: 'worried' },
        mati: { x: 820, mood: 'neutral' },
        maestra: { x: 1220, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'maestra', text: 'Juanchi tiene autismo. Su cerebro siente los ruidos, las luces y las cosas de otra manera.', expr: 'happy', act: 'nod' },
        { say: 'maestra', text: 'Los ruidos fuertes le molestan muchísimo, y mirar a los ojos le cuesta.', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¿Y quiere tener amigos, maestra?', expr: 'worried', act: 'think' },
        { say: 'maestra', text: '¡Claro que sí! Quiere tener amigos, a su manera. Y no es raro: es distinto, como cada uno de nosotros.', expr: 'happy', act: 'hug' },
        { mood: 'happy', who: 'hija' },
        { say: 'mati', text: 'Entonces le voy a pedir perdón por decir que era raro.', expr: 'love', act: 'nod' },
      ],
    },
    {
      bg: 'park',
      cast: {
        juanchi: { x: 680, mood: 'neutral' },
        hija: { x: 1000, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'trainToy', id: 'tren', x: 820, y: 960, scale: 1.4 },
        { title: 'En el recreo...', dur: 1.6 },
        { say: 'hija', text: '¡Qué lindo tren! ¿Te gustan mucho los trenes, Juanchi?', expr: 'happy', act: 'point' },
        { mood: 'happy', who: 'juanchi' },
        { say: 'juanchi', text: 'Me gustan muchísimo los trenes. Este es un tren a vapor, y tiene ocho ruedas.', expr: 'happy', act: 'nod' },
        { say: 'hija', text: '¡Sabes un montón! ¿Jugamos juntos con el tren?', expr: 'excited', act: 'clap' },
        { say: 'juanchi', text: 'Me gustaría. Pero sin gritar, por favor.', expr: 'neutral' },
        { say: 'hija', text: '¡Claro! Vamos a jugar bien bajito.', expr: 'love', act: 'nod' },
        { moveProp: 'tren', x: 920, y: 960, dur: 1.4 },
        { moveProp: 'tren', x: 800, y: 960, dur: 1.4 },
        { mood: 'happy', who: 'hija' },
      ],
    },
    {
      bg: 'park',
      cast: {
        juanchi: { x: 600, mood: 'happy' },
        hija: { x: 880, mood: 'happy' },
        mati: { x: 2250, mood: 'love', facing: -1 },
      },
      steps: [
        { prop: 'trainToy', id: 'tren', x: 740, y: 960, scale: 1.4 },
        { do: 'walk', who: 'mati', to: 1160 },
        { say: 'mati', text: 'Perdón por decir que eras raro, Juanchi. ¿Puedo jugar con ustedes?', expr: 'love', act: 'shrug' },
        { say: 'juanchi', text: 'Bueno. Yo manejo el tren, y tú pones las vías.', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¡Y yo soy la pasajera del tren!', expr: 'laugh', act: 'cheer' },
        { moveProp: 'tren', x: 1000, y: 960, dur: 1.6 },
        { sfx: 'sparkle', with: true },
        { fx: 'stars', x: 880, y: 500, with: true },
        { do: 'dance', who: ['juanchi', 'hija', 'mati'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Todos somos distintos, y eso está bien. Cuando nos entendemos, todos podemos ser amigos.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Mi Compañero Juanchi 🧩 ¿Qué es el Autismo? | Dibujos Animados para Niños en Español',
    description: `¡Llega un compañero nuevo a la clase de Tini! Se llama Juanchi, no mira a los ojos, no saluda… y cuando suena el timbre, ¡se tapa los oídos! 🔔😣 "Es raro", dice Mati. Pero la maestra les explica que Juanchi tiene autismo: su cerebro siente los ruidos y las cosas de otra manera. 🧩💛 En el recreo, Tini descubre que a Juanchi le encantan los trenes… ¡y nace una amistad! 🚂 Un cuento infantil corto para entender el autismo con empatía.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que algunas personas sienten los ruidos y las cosas de otra manera
• Que ser distinto no está mal: cada uno es único
• A ser amigos de todos, respetando cómo es cada uno

👨‍👩‍👧 Para papás y maestras: cada niño autista es distinto. Pregúntenles a los chicos "¿Qué podemos hacer para que un compañero nuevo se sienta bienvenido?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#autismo #dibujosanimados #cuentosinfantiles`,
    tags: [
      'autismo',
      'autismo para niños',
      'qué es el autismo',
      'explicar el autismo a niños',
      'TEA',
      'inclusión escolar',
      'empatía para niños',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
