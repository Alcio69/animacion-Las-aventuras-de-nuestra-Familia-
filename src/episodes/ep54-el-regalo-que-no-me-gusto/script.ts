import type { Episode } from '../../engine/script';

/**
 * Capítulo 54 — El regalo que no me gustó (especial de Navidad; valor: gratitud, un regalo es cariño; reparar con
 * la abuela). Abuela gives Lio a knitted reindeer sweater; he makes a face and says it's ugly. Luna explains, Lio
 * apologizes, learns abuela knitted one just like it for Max as a boy, and wears it proudly at Christmas dinner.
 * Guest: `abuela`. Costume `sweater` = abuela's knitted reindeer sweater. Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep54-el-regalo-que-no-me-gusto',
  number: 54,
  title: 'El regalo que no me gustó',
  subtitle: 'La abuela le teje a Lio un suéter de reno para Navidad… y a él no le gusta. ¿Cómo se agradece un regalo?',
  music: 'happy',
  thumb: { bg: 'living', variant: 'christmas', text: '¡NO ME GUSTÓ!', prop: 'sweater', hero: ['hijo'], exprs: { hijo: 'angry' } },
  scenes: [
    {
      bg: 'living',
      variant: 'christmas',
      cast: {
        hijo: { x: 500, mood: 'excited' },
        hija: { x: 880, mood: 'excited' },
        abuela: { x: 1160, mood: 'happy', facing: -1 },
        mama: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'abuela', text: '¡Feliz Navidad, mis amores! Les traje un regalito a cada uno.', expr: 'happy', act: 'wave' },
        { prop: 'book', id: 'libroTini', x: 1020, y: 760 },
        { sfx: 'pop', with: true },
        { say: 'hija', text: '¡Un libro de cuentos con dibujos! ¡Me encanta, abuela!', expr: 'excited', act: 'jump' },
        { prop: 'sweater', id: 'sueter', x: 690, y: 760 },
        { sfx: 'whoosh', with: true },
        { mood: 'surprised', who: 'hijo' },
        { say: 'hijo', text: '¿Un suéter con un reno? ¡Qué feo! Yo quería un videojuego.', expr: 'angry', act: 'shake' },
        { mood: 'sad', who: 'abuela' },
        { fx: 'sweat', x: 1160, y: 440, with: true },
        { say: 'abuela', text: 'Ah, perdón, Lio. No sabía que no te iba a gustar.', expr: 'sad', act: 'shrug' },
        { mood: 'surprised', who: ['hija', 'mama'] },
        { say: 'mama', text: 'Mi amor, ven un momento conmigo a la cocina, por favor.', expr: 'surprised', act: 'point' },
        { removeProp: 'sueter' },
        { removeProp: 'libroTini', with: true },
        { do: 'walk', who: ['hijo', 'mama'], to: 2250 },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hijo: { x: 800, mood: 'angry' },
        mama: { x: 1150, mood: 'worried', facing: -1 },
      },
      steps: [
        { say: 'mama', text: '¿Viste la carita de la abuela? Se puso muy triste.', expr: 'worried', act: 'nod' },
        { say: 'hijo', text: 'Pero es que no me gustó, mamá. ¿Tengo que mentir?', expr: 'angry', act: 'shrug' },
        { say: 'mama', text: 'No tienes que mentir. Pero un regalo es el cariño que alguien puso en pensarlo, y en hacerlo para ti.', expr: 'happy', act: 'hug' },
        { say: 'mama', text: '¿Sabes cuánto tardó la abuela en tejer ese suéter? Un mes entero, todas las tardes.', expr: 'happy', act: 'point' },
        { mood: 'surprised', who: 'hijo' },
        { fx: 'exclaim', x: 800, y: 440, with: true },
        { say: 'hijo', text: '¿Un mes entero? ¡No lo sabía! Me porté muy mal con ella.', expr: 'sad', act: 'shrug' },
        { say: 'mama', text: 'Siempre podemos arreglarlo. Podemos dar las gracias por el cariño, aunque el regalo no sea lo que esperábamos.', expr: 'happy', act: 'nod' },
        { do: 'nod', who: 'hijo', dur: 1.4 },
        { mood: 'neutral', who: 'hijo' },
      ],
    },
    {
      bg: 'living',
      variant: 'christmas',
      cast: {
        hijo: { x: 2250, mood: 'sad' },
        abuela: { x: 1120, mood: 'sad', facing: -1 },
        papa: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { do: 'walk', who: 'hijo', to: 800 },
        { say: 'hijo', text: 'Perdón, abuela. Fui muy maleducado. Gracias por tejerlo para mí.', expr: 'sad', act: 'hug' },
        { mood: 'happy', who: 'abuela' },
        { say: 'abuela', text: 'Gracias por decírmelo, mi amor. Lo hice pensando en ti, en cada puntada.', expr: 'happy', act: 'hug' },
        { do: 'hug', who: ['hijo', 'abuela'], dur: 1.8 },
        { fx: 'hearts', x: 960, y: 440, with: true },
        { say: 'hijo', text: '¿Y por qué elegiste un reno, abuela?', expr: 'neutral', act: 'shrug' },
        { say: 'abuela', text: 'Porque cuando tu papá era chiquito, yo le tejí uno igualito, ¡y le encantaba!', expr: 'laugh', act: 'point' },
        { say: 'papa', text: '¡Es verdad! Era mi suéter favorito. ¡Lo usaba todos los días!', expr: 'laugh', act: 'cheer' },
        { sfx: 'giggle', with: true },
        { mood: 'excited', who: 'hijo' },
        { costume: 'sweater', who: 'hijo' },
        { fx: 'sparkle', x: 800, y: 560, with: true },
        { sfx: 'poof', with: true },
        { say: 'hijo', text: '¡Entonces ahora es mi suéter favorito también! ¡Somos el equipo reno!', expr: 'excited', act: 'jump' },
        { sfx: 'tada', with: true },
      ],
    },
    {
      bg: 'living',
      variant: 'christmas',
      cast: {
        hijo: { x: 520, mood: 'happy', costume: 'sweater' },
        hija: { x: 780, mood: 'happy' },
        abuela: { x: 1040, mood: 'happy', facing: -1 },
        mama: { x: 1300, mood: 'happy', facing: -1 },
        papa: { x: 1550, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'En la cena de Navidad...', dur: 1.6 },
        { say: 'hija', text: '¡Te queda muy lindo ese suéter, hermano!', expr: 'happy', act: 'point' },
        { say: 'hijo', text: 'Gracias, hermanita. Lo más lindo del regalo es el cariño de la abuela.', expr: 'proud', act: 'nod' },
        { say: 'abuela', text: 'Esta es la mejor Navidad de todas. ¡Los quiero muchísimo!', expr: 'happy', act: 'cheer' },
        { fx: 'confetti', x: 960, y: 420, with: true },
        { sfx: 'tada', with: true },
        { do: 'dance', who: ['hijo', 'hija', 'abuela', 'mama', 'papa'], dur: 3.2, expr: 'laugh' },
        { say: 'narrador', text: 'Un regalo es una muestra de cariño. Aunque no sea lo que esperábamos, siempre podemos decir gracias.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'El Regalo que No me Gustó 🎄 Cuento de Navidad sobre Agradecer | Dibujos Animados para Niños en Español',
    description: `¡Llegó la Navidad y la abuela trae regalos! 🎁 Tini recibe un libro de cuentos… y Lio, un suéter tejido con un reno. 🦌 "¡Qué feo! Yo quería un videojuego." La abuela se pone muy triste. 😢 Luna le explica a Lio que un regalo es el cariño que alguien puso en pensarlo y en hacerlo, y que la abuela tardó un mes entero en tejerlo. Lio le pide perdón… ¡y descubre un secreto: la abuela le tejió uno igualito a Max cuando era chiquito! 💛 Un cuento de Navidad corto sobre la gratitud y el valor de los regalos.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que un regalo es una muestra de cariño, aunque no sea lo que esperábamos
• A decir gracias sin mentir: agradecer el cariño y el esfuerzo
• Que cuando lastimamos a alguien, siempre podemos pedir perdón y arreglarlo

👨‍👩‍👧 Para papás y maestras: antes de abrir los regalos de Navidad, practiquen en casa qué decir cuando algo no nos gusta ("¡Gracias por pensar en mí!"). No se trata de fingir, sino de valorar el cariño de quien lo regala.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#navidad #dibujosanimados #cuentosinfantiles`,
    tags: [
      'cuento de navidad',
      'navidad para niños',
      'gratitud para niños',
      'agradecer un regalo',
      'regalo que no me gustó',
      'abuela',
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
