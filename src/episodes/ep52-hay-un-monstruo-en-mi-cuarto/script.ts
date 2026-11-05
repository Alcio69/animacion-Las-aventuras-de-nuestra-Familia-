import type { Episode } from '../../engine/script';

/**
 * Capítulo 52 — ¡Hay un monstruo en mi cuarto! (valor: pesadillas y miedo a la oscuridad; primero escuchar, después
 * explicar). Tini wakes up from a nightmare; her parents look under the bed with her, Lio teaches her to draw the
 * monster funny, and the family builds a "brave kit". Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep52-hay-un-monstruo-en-mi-cuarto',
  number: 52,
  title: '¡Hay un monstruo en mi cuarto!',
  subtitle: 'Tini tuvo una pesadilla y cree que hay un monstruo debajo de su cama… ¿cómo se vence el miedo de noche?',
  music: 'calm',
  thumb: { bg: 'bedroom', text: '¡HAY UN MONSTRUO!', prop: 'flashlight', hero: ['hija'], exprs: { hija: 'surprised' } },
  scenes: [
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 700, mood: 'sleepy' },
        mama: { x: 2250, mood: 'worried', facing: -1 },
        papa: { x: 2250, mood: 'worried', facing: -1 },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 520, y: 960 },
        { fx: 'zzz', x: 700, y: 480 },
        { wait: 1.2 },
        { sfx: 'drum' },
        { mood: 'surprised', who: 'hija' },
        { fx: 'exclaim', x: 700, y: 450, with: true },
        { do: 'tremble', who: 'hija', dur: 1.2 },
        { say: 'hija', text: '¡Por favor, vengan rápido! ¡Tengo mucho miedo, mamá!', expr: 'surprised', act: 'tremble' },
        { do: 'run', who: 'mama', to: 1000 },
        { do: 'run', who: 'papa', to: 1300, with: true },
        { say: 'mama', text: '¿Qué pasó, mi amor? Aquí estamos, tranquila.', expr: 'worried', act: 'hug' },
        { say: 'hija', text: 'Soñé con un monstruo gigante, y ahora creo que está debajo de mi cama.', expr: 'worried', act: 'point' },
        { say: 'papa', text: 'Ese sueño te asustó mucho, ¿verdad? Te entiendo, los sueños feos dan mucho miedo.', expr: 'worried', act: 'nod' },
        { say: 'hija', text: '¿Y si el monstruo es de verdad, papá?', expr: 'worried', act: 'shrug' },
        { say: 'mama', text: 'Los sueños son como películas que inventa nuestra cabeza mientras dormimos. A veces son lindos, y a veces son feos.', expr: 'happy', act: 'nod' },
        { mood: 'happy', who: ['mama', 'papa'] },
        { prop: 'flashlight', id: 'linterna', x: 1150, y: 760, scale: 1.4 },
        { say: 'papa', text: '¿Quieres que miremos juntos debajo de la cama, con la linterna?', expr: 'happy', act: 'point' },
        { say: 'hija', text: 'Bueno, pero tú vas primero, papá.', expr: 'worried', act: 'tremble' },
        { do: 'look', who: 'papa', dur: 1.6 },
        { sfx: 'whoosh', with: true },
        { fx: 'question', x: 1300, y: 420, with: true },
        { say: 'papa', text: 'A ver, a ver... ¡Solo hay un calcetín perdido y mucho polvo!', expr: 'surprised', act: 'shrug' },
        { sfx: 'giggle', with: true },
        { mood: 'laugh', who: 'hija' },
        { say: 'hija', text: '¡No hay ningún monstruo! ¡Solo un calcetín!', expr: 'laugh', act: 'clap' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'sleepy' },
        hijo: { x: 1180, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 900, y: 900 },
        { title: 'A la mañana siguiente...', dur: 1.6 },
        { say: 'hijo', text: '¿Tuviste una pesadilla, hermanita? A mí también me pasaba cuando era más chico.', expr: 'happy', act: 'nod' },
        { say: 'hija', text: '¿De verdad, hermano? ¿Y qué hacías cuando tenías miedo?', expr: 'surprised', act: 'shrug' },
        { say: 'hijo', text: 'Dibujaba al monstruo, y le ponía algo muy gracioso. ¡Así ya no daba miedo!', expr: 'excited', act: 'point' },
        { mood: 'excited', who: 'hija' },
        { do: 'think', who: 'hija', dur: 1.8 },
        { prop: 'monsterDrawing', id: 'dibujo', x: 900, y: 760, scale: 1.8 },
        { sfx: 'sparkle', with: true },
        { fx: 'sparkle', x: 900, y: 600, with: true },
        { say: 'hija', text: 'Le puse un moño rosa, y unos zapatos de payaso enormes.', expr: 'laugh', act: 'cheer' },
        { sfx: 'giggle', with: true },
        { say: 'hijo', text: '¡Ese monstruo es muy gracioso! ¡Parece que quiere bailar con nosotros!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hija', 'hijo'], dur: 2.4, expr: 'laugh' },
      ],
    },
    {
      bg: 'bedroom',
      cast: {
        hija: { x: 700, mood: 'happy' },
        mama: { x: 1000, mood: 'happy', facing: -1 },
        papa: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 520, y: 960 },
        { prop: 'flashlight', id: 'linterna', x: 600, y: 960, with: true },
        { title: 'Esa noche...', dur: 1.4 },
        { say: 'mama', text: 'Armemos tu kit valiente: tu linterna, tu osito guardián, y el dibujo de tu monstruo gracioso.', expr: 'happy', act: 'point' },
        { say: 'papa', text: 'Y si te despiertas asustada, puedes venir a buscarnos. Siempre vamos a estar aquí.', expr: 'happy', act: 'hug' },
        { say: 'hija', text: 'Esta noche me vas a cuidar, mi osito guardián.', expr: 'happy', act: 'hug' },
        { fx: 'hearts', x: 600, y: 520, with: true },
        { say: 'mama', text: 'Ahora respira profundo conmigo: tomamos aire, y lo soltamos despacito.', expr: 'happy', act: 'nod' },
        { do: 'nod', who: 'hija', dur: 1.6 },
        { say: 'hija', text: 'Ya no tengo tanto miedo. Buenas noches, mamá. Buenas noches, papá.', expr: 'sleepy' },
        { mood: 'sleepy', who: 'hija' },
        { fx: 'zzz', x: 700, y: 480, with: true },
        { do: 'walk', who: ['mama', 'papa'], to: 2250 },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hija: { x: 700, mood: 'excited' },
        papa: { x: 1100, mood: 'happy', facing: -1 },
        hijo: { x: 1400, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'A la mañana siguiente...', dur: 1.4 },
        { say: 'hija', text: '¡Dormí toda la noche en mi camita! ¡Soy muy valiente!', expr: 'excited', act: 'jump' },
        { sfx: 'tada', with: true },
        { fx: 'stars', x: 700, y: 460, with: true },
        { say: 'papa', text: '¡Claro que eres valiente! Tener miedo es normal, y tú lo enfrentaste.', expr: 'proud', act: 'clap' },
        { say: 'hijo', text: '¡Y tu monstruo gracioso también durmió toda la noche!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hija', 'papa', 'hijo'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Los sueños feos no son de verdad. Cuando tenemos miedo de noche, podemos contarlo y pedir un abrazo.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Hay un Monstruo en mi Cuarto! 👻 Pesadillas y Miedo a la Oscuridad | Dibujos Animados para Niños en Español',
    description: `¡Tini se despierta asustada en medio de la noche! 😱 Soñó con un monstruo gigante y cree que está escondido debajo de su cama. Max y Luna no le dicen "los monstruos no existen, a dormir": primero la escuchan y la abrazan 💛, después miran juntos con la linterna… ¡y solo encuentran un calcetín! 🧦 Al día siguiente, Lio le enseña un truco: dibujar al monstruo y ponerle algo gracioso. Con su kit valiente (la linterna, el osito guardián y el dibujo), ¿podrá Tini dormir toda la noche? 🌙 Un cuento infantil corto para las pesadillas y el miedo a la oscuridad.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que los sueños son como películas que inventa nuestra cabeza, y no son de verdad
• Trucos para el miedo de noche: dibujar al monstruo gracioso, el osito guardián y respirar profundo
• Que tener miedo es normal, y siempre podemos pedir un abrazo

👨‍👩‍👧 Para papás y maestras: cuando un niño tiene una pesadilla, ayuda más escucharlo y validar su miedo ("ese sueño te asustó mucho") que decirle "no pasa nada". Armen juntos su propio kit valiente para la noche.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#pesadillas #dibujosanimados #cuentosinfantiles`,
    tags: [
      'pesadillas',
      'miedo a la oscuridad',
      'mi hijo tiene pesadillas',
      'monstruo debajo de la cama',
      'miedo de noche',
      'cuentos para dormir',
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
