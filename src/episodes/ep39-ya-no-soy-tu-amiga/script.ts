import type { Episode } from '../../engine/script';

/**
 * Capítulo 39 — ¡Ya no soy tu amiga! (valor: pensar distinto no es motivo para pelear; conversar, buscar una idea
 * para todos, jugar por turnos y pedir perdón).
 * Renu (black-and-white kitten) and Lari (brown tabby) fight over what to play; Tini, in the middle, shows them they
 * don't need to fight and invents a game that mixes both ideas. Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep39-ya-no-soy-tu-amiga',
  number: 39,
  title: '¡Ya no soy tu amiga!',
  subtitle: 'Renu y Lari se pelean en el parque… ¿podrá Tini ayudarlas a no pelear?',
  music: 'happy',
  thumb: { bg: 'park', text: '¡NO SOY TU AMIGA!', prop: 'ball', hero: ['lari', 'renu'], exprs: { lari: 'angry', renu: 'angry' } },
  scenes: [
    {
      bg: 'park',
      cast: {
        renu: { x: 560, mood: 'happy' },
        hija: { x: 900, mood: 'happy' },
        lari: { x: 1240, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 730, y: 960 },
        { say: 'renu', text: '¡Juguemos a la pelota! Es el juego más divertido del mundo.', expr: 'excited', act: 'point' },
        { say: 'lari', text: '¡No, mejor juguemos a la mamá y el bebé! Yo quiero ser la mamá.', expr: 'happy', act: 'wave' },
        { mood: 'angry', who: 'renu' },
        { say: 'renu', text: '¡Ese juego es aburrido! Siempre quieres jugar a lo mismo.', expr: 'angry', act: 'hips' },
        { mood: 'angry', who: 'lari' },
        { say: 'lari', text: '¡Y tú siempre quieres mandar! ¡Ya no soy tu amiga!', expr: 'angry', act: 'shake' },
        { sfx: 'drum', with: true, delay: 0.4 },
        { say: 'renu', text: '¡Yo tampoco quiero ser tu amiga!', expr: 'angry', act: 'hips' },
        { mood: 'worried', who: 'hija' },
        { fx: 'sweat', x: 900, y: 500, with: true },
      ],
    },
    {
      bg: 'park',
      cast: {
        renu: { x: 560, mood: 'angry' },
        hija: { x: 900, mood: 'worried' },
        lari: { x: 1240, mood: 'angry', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 730, y: 960 },
        { say: 'hija', text: '¡Esperen, chicas! No hace falta pelearse.', expr: 'worried', act: 'wave' },
        { mood: 'surprised', who: ['renu', 'lari'] },
        { say: 'hija', text: 'Cuando pensamos distinto, podemos conversar y buscar una idea para las tres.', expr: 'happy', act: 'nod' },
        { say: 'lari', text: '¿Y cuál es tu idea? ¡Cuéntanos!', expr: 'surprised', act: 'shrug' },
        { do: 'think', who: 'hija', dur: 1.6 },
        { fx: 'question', x: 900, y: 470, dur: 1.4, with: true },
        { sfx: 'ding' },
        { mood: 'excited', who: 'hija', with: true },
        { say: 'hija', text: '¡Ya sé! Un juego con las dos cosas: la mamá lleva a su bebé a jugar a la pelota.', expr: 'excited', act: 'cheer' },
        { mood: 'happy', who: ['renu', 'lari'] },
        { say: 'renu', text: '¡Qué buena idea! Así jugamos todas juntas.', expr: 'happy', act: 'clap' },
        { mood: 'love', who: 'lari' },
        { say: 'lari', text: 'Perdón por gritarte, Renu. No quise decir que ya no era tu amiga.', expr: 'love' },
        { mood: 'love', who: 'renu' },
        { say: 'renu', text: 'Yo también te pido perdón, Lari. ¡Somos amigas!', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 900, y: 470, with: true },
        { sfx: 'sparkle', with: true },
      ],
    },
    {
      bg: 'park',
      cast: {
        renu: { x: 560, mood: 'laugh' },
        hija: { x: 900, mood: 'laugh' },
        lari: { x: 1240, mood: 'laugh', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 1100, y: 960 },
        { title: 'Un ratito después...', dur: 1.6 },
        { say: 'lari', text: '¡Vamos, bebé, atrapa la pelota con mamá!', expr: 'laugh', act: 'point' },
        { moveProp: 'pelota', x: 680, y: 960, dur: 1, arc: 180 },
        { sfx: 'boing', with: true },
        { say: 'renu', text: '¡Este juego inventado es el mejor de todos!', expr: 'laugh', act: 'jump' },
        { moveProp: 'pelota', x: 1000, y: 960, dur: 1, arc: 180 },
        { sfx: 'boing', with: true },
        { say: 'hija', text: '¡Y mañana elegimos por turnos! Primero una, y después la otra.', expr: 'happy', act: 'clap' },
        { sfx: 'giggle', with: true, delay: 1 },
        { do: 'dance', who: ['renu', 'hija', 'lari'], dur: 3, expr: 'laugh' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 620, mood: 'proud' },
        mama: { x: 1020, mood: 'happy', facing: -1 },
        papa: { x: 1320, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Esa tarde...', dur: 1.6 },
        { say: 'hija', text: 'Mamá, papá: mis amigas se iban a pelear, y yo las ayudé a buscar una idea para todas.', expr: 'proud', act: 'cheer' },
        { say: 'mama', text: '¡Qué orgullo, hija! Cuando pensamos distinto, no hace falta pelear: se puede conversar.', expr: 'love', act: 'hug' },
        { say: 'papa', text: 'Y si no se ponen de acuerdo, pueden jugar por turnos. ¡Así todos ganan!', expr: 'proud', act: 'clap' },
        { fx: 'stars', x: 900, y: 380, dur: 2.2, with: true },
        { do: 'dance', who: ['hija', 'mama', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Pensar distinto no es motivo para pelear: conversando, siempre encontramos una idea para todos.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Ya No Soy Tu Amiga! 💔 No Hace Falta Pelear | Dibujos Animados para Niños en Español',
    description: `Renu quiere jugar a la pelota ⚽ y Lari quiere jugar a la mamá y el bebé 👶… ¡y se pelean tanto que Lari grita "¡Ya no soy tu amiga!"! 💔 Tini, en el medio, les muestra que no hace falta pelearse: cuando pensamos distinto, podemos conversar y buscar una idea para todas. ¿Qué juego se le ocurrirá? 💛 Un cuento infantil corto sobre la amistad y cómo resolver los desacuerdos sin pelear.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que pensar distinto no es motivo para pelear
• A conversar y buscar una idea que sirva para todos
• A jugar por turnos y a pedir perdón

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Qué podemos hacer cuando un amigo quiere jugar a otra cosa?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#amistad #dibujosanimados #cuentosinfantiles`,
    tags: [
      'ya no soy tu amiga',
      'peleas entre amigos',
      'amistad para niños',
      'resolver conflictos niños',
      'no pelear',
      'jugar por turnos',
      'pedir perdón',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
