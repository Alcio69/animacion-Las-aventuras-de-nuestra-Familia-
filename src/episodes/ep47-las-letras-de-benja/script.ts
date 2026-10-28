import type { Episode } from '../../engine/script';

/**
 * Capítulo 47 — Las letras de Benja (valor: la dislexia es otra forma de aprender a leer, no tiene que ver con la
 * inteligencia; con ayuda, tiempo y amigos se avanza; cada uno tiene sus fortalezas).
 * Benja (Lio's friend) stumbles reading aloud; he thinks he's not smart; his mom explains a specialist found he has
 * dyslexia. Accurate framing: the brain takes longer to turn letters into sounds (not a vision problem, not an
 * illness). Book / drawing "in the hand" y=760. Keep characters between x≈400 and x≈1550.
 */
const HAND = 760;

const episode: Episode = {
  id: 'ep47-las-letras-de-benja',
  number: 47,
  title: 'Las letras de Benja',
  subtitle: 'A Benja le cuesta mucho leer… y cree que es tonto. ¿Qué le pasa?',
  music: 'calm',
  thumb: { bg: 'school', text: '¡ME CUESTA LEER!', prop: 'book', hero: ['benja'], exprs: { benja: 'sad' } },
  scenes: [
    {
      bg: 'school',
      cast: {
        benja: { x: 600, mood: 'happy' },
        hijo: { x: 880, mood: 'happy' },
        maestra: { x: 1320, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'book', id: 'libro', x: 690, y: HAND },
        { say: 'maestra', text: 'Benja, ¿nos lees en voz alta el cuento de hoy?', expr: 'happy', act: 'point' },
        { mood: 'worried', who: 'benja' },
        { say: 'benja', text: 'Había una vez... un... un dra... un dragón muy... muy gran...', expr: 'worried', act: 'tremble' },
        { fx: 'sweat', x: 600, y: 480, with: true },
        { sfx: 'giggle' },
        { mood: 'sad', who: 'benja', with: true },
        { mood: 'angry', who: 'hijo' },
        { say: 'hijo', text: '¡No es gracioso! Benja está haciendo su mejor esfuerzo.', expr: 'angry', act: 'shake' },
        { say: 'maestra', text: 'Tienes razón, Lio. En esta clase nadie se ríe de nadie.', expr: 'neutral', act: 'nod' },
        { mood: 'love', who: 'maestra' },
        { say: 'maestra', text: 'Gracias por intentarlo, Benja. Seguimos otro día.', expr: 'love' },
      ],
    },
    {
      bg: 'park',
      cast: {
        benja: { x: 720, mood: 'sad' },
        hijo: { x: 1040, mood: 'worried', facing: -1 },
      },
      steps: [
        { title: 'En el recreo...', dur: 1.6 },
        { say: 'benja', text: 'Creo que soy tonto. Leo y leo, y no me sale.', expr: 'sad', act: 'shrug' },
        { say: 'hijo', text: '¡No eres tonto! Eres el que mejor cuenta historias de toda la clase.', expr: 'love', act: 'point' },
        { say: 'benja', text: 'Pero todos leen rápido, y yo no. Me da mucha vergüenza.', expr: 'sad' },
        { do: 'walk', who: 'hijo', to: 900 },
        { do: 'hug', who: ['hijo', 'benja'], dur: 1.6 },
        { fx: 'hearts', x: 810, y: 470, with: true },
        { say: 'hijo', text: 'Ven a mi casa después de la escuela. Mis papás siempre saben qué hacer.', expr: 'happy', act: 'nod' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 460, mood: 'happy' },
        hija: { x: 690, mood: 'happy' },
        benja: { x: 920, mood: 'worried' },
        mama: { x: 1200, mood: 'love', facing: -1 },
        benjaMama: { x: 1460, mood: 'love', facing: -1 },
      },
      steps: [
        { say: 'benjaMama', text: 'Fuimos a ver a una especialista, y nos explicó por qué a Benja le cuesta tanto leer.', expr: 'love', act: 'nod' },
        { say: 'benjaMama', text: 'La especialista nos dijo que lo que tiene se llama dislexia.', expr: 'love', act: 'hug', pause: 0.6 },
        { mood: 'surprised', who: ['hijo', 'hija'] },
        { say: 'benja', text: 'Mi cabeza tarda más en convertir las letras en sonidos. Por eso leo más despacio.', expr: 'neutral', act: 'think' },
        { say: 'hija', text: '¿Es como estar enfermo, mamá?', expr: 'worried', act: 'shrug' },
        { say: 'mama', text: 'No es una enfermedad, hija. Es otra forma de aprender a leer, y no tiene nada que ver con ser inteligente.', expr: 'love', act: 'point' },
        { say: 'benjaMama', text: 'Con ayuda, más tiempo y mucha práctica, cada día va a leer mejor.', expr: 'proud', act: 'nod' },
        { mood: 'happy', who: 'benja' },
        { say: 'hija', text: '¿Y nosotros cómo te podemos ayudar, Benja?', expr: 'happy', act: 'point' },
        { say: 'benja', text: 'Pueden leer conmigo, sin apurarme. ¡Y nunca reírse!', expr: 'happy', act: 'wave' },
        { say: 'hijo', text: '¡Trato hecho, amigo! Leemos juntos, de a una página cada uno.', expr: 'excited', act: 'cheer' },
        { sfx: 'sparkle', with: true },
      ],
    },
    {
      bg: 'school',
      cast: {
        benja: { x: 540, mood: 'proud' },
        hijo: { x: 1060, mood: 'happy' },
        maestra: { x: 1380, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 800, y: 900 },
        { prop: 'dinoDrawing', id: 'dino', x: 800, y: HAND, scale: 1.5, with: true },
        { title: 'Unos días después...', dur: 1.6 },
        { say: 'maestra', text: 'Benja, hoy vas a contarnos lo que sabes de los dinosaurios, con tus propias palabras.', expr: 'happy', act: 'point' },
        { say: 'benja', text: '¡Los dinosaurios vivieron hace muchísimo tiempo! Algunos eran tan largos como tres autobuses.', expr: 'excited', act: 'cheer' },
        { fx: 'stars', x: 800, y: 560, with: true },
        { say: 'maestra', text: '¡Excelente, Benja! Sabes muchísimo, y lo contaste increíble.', expr: 'proud', act: 'clap' },
        { sfx: 'tada', with: true },
        { fx: 'confetti', x: 800, y: 320, dur: 2.5, with: true },
        { say: 'hijo', text: '¡Viste, amigo? ¡Eres el mejor contando historias!', expr: 'laugh', act: 'clap' },
        { say: 'benja', text: 'Y ahora leo con Lio todos los días. ¡Cada día me sale un poquito mejor!', expr: 'proud', act: 'nod' },
        { do: 'dance', who: ['benja', 'hijo', 'maestra'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Cada cerebro aprende a su manera. Con paciencia, ayuda y amigos, todos podemos brillar.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Las Letras de Benja 📚 ¿Qué es la Dislexia? | Dibujos Animados para Niños en Español',
    description: `A Benja le cuesta muchísimo leer en voz alta… 📚😟 Se traba, se pone colorado, y en el recreo le confiesa a Lio: "Creo que soy tonto". ¡Pero no lo es! Su mamá cuenta que fueron a ver a una especialista, y que Benja tiene dislexia: su cabeza tarda más en convertir las letras en sonidos. 💛 Luna les explica que no es una enfermedad ni tiene nada que ver con ser inteligente: es otra forma de aprender a leer. ¡Y con ayuda y amigos, Benja va a brillar! 🦕✨ Un cuento infantil corto para entender la dislexia con empatía.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que la dislexia es otra forma de aprender a leer, y no tiene que ver con ser inteligente
• Que con ayuda, tiempo y práctica, se avanza muchísimo
• A acompañar a un amigo: leer juntos, sin apurar y sin reírse

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Cómo podemos ayudar a un compañero al que algo le cuesta?" Si notan que a su hijo le cuesta leer mucho más que a sus compañeros, vale la pena consultar con una psicopedagoga o fonoaudióloga.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#dislexia #dibujosanimados #cuentosinfantiles`,
    tags: [
      'dislexia',
      'dislexia para niños',
      'qué es la dislexia',
      'dificultades para leer',
      'niño con dislexia',
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
