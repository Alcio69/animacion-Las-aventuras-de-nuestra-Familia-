import type { Episode } from '../../engine/script';

/**
 * Capítulo 57 — Mi primera alcancía (valor: ahorrar, esperar y elegir). Tini wants a giant teddy "right now"; Luna
 * gives her a piggy bank (prop `piggyBank`). She saves coins helping at home, resists spending them on sweets, buys
 * the teddy and shares the two extra coins with Lio. Keep characters between x≈400 and x≈1550.
 */
const PIG = { x: 900, y: 760 };

const episode: Episode = {
  id: 'ep57-mi-primera-alcancia',
  number: 57,
  title: 'Mi primera alcancía',
  subtitle: 'Tini quiere un osito gigante… ¡ya mismo! Luna le regala una alcancía. ¿Podrá ahorrar las veinte monedas?',
  music: 'happy',
  thumb: { bg: 'bedroom', variant: 'day', text: '¿ME ALCANZA?', prop: 'piggyBank', hero: ['hija'], exprs: { hija: 'worried' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'excited' },
        mama: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'tablet', id: 'tablet', x: 800, y: 760 },
        { say: 'hija', text: '¡Mamá, ven a ver este osito gigante! ¡Lo quiero ya! ¿Me lo compras?', expr: 'excited', act: 'point' },
        { say: 'mama', text: 'Es muy lindo, hija. Pero hoy no lo vamos a comprar.', expr: 'happy', act: 'shake' },
        { mood: 'angry', who: 'hija' },
        { say: 'hija', text: '¡Pero yo lo quiero ahora mismo! ¡No es justo!', expr: 'angry', act: 'hips' },
        { removeProp: 'tablet' },
        { say: 'mama', text: '¿Y si lo compras con tu propio dinero, hija?', expr: 'happy', act: 'point' },
        { mood: 'surprised', who: 'hija' },
        { prop: 'table', id: 'mesa', x: PIG.x, y: 900 },
        { prop: 'piggyBank', id: 'alcancia', x: PIG.x, y: PIG.y, scale: 1.6, with: true },
        { fx: 'sparkle', x: PIG.x, y: 560, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'mama', text: 'Esta es tu primera alcancía. Cada vez que ayudes en casa, te ganas una moneda para guardar aquí.', expr: 'happy', act: 'nod' },
        { say: 'hija', text: '¿Y cuántas monedas tengo que juntar para el osito, mamá?', expr: 'surprised', act: 'shrug' },
        { say: 'mama', text: 'Veinte monedas. Va a llevar un tiempo, pero lo vas a lograr.', expr: 'happy', act: 'hug' },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Veinte monedas! ¡Voy a empezar hoy mismo!', expr: 'excited', act: 'jump' },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 640, mood: 'happy' },
        papa: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 950, y: 900 },
        { prop: 'plate', id: 'plato', x: 950, y: 760, with: true },
        { say: 'papa', text: 'Gracias por ayudarme a poner la mesa, hija. Aquí tienes una moneda.', expr: 'happy', act: 'point' },
        { prop: 'coin', id: 'moneda', x: 780, y: 760, scale: 1.6 },
        { sfx: 'ding', with: true },
        { say: 'hija', text: '¡Una moneda más para mi alcancía! Ya tengo cinco, papá.', expr: 'excited', act: 'cheer' },
        { sfx: 'tada', with: true },
      ],
    },
    {
      bg: 'park',
      cast: {
        hija: { x: 640, mood: 'happy' },
        hijo: { x: 1000, mood: 'excited', facing: -1 },
      },
      steps: [
        { title: 'Unos días después...', dur: 1.4 },
        { say: 'hijo', text: '¡Vamos a comprar golosinas al kiosco, hermanita! ¡Trae tus monedas!', expr: 'excited', act: 'point' },
        { do: 'think', who: 'hija', dur: 1.8 },
        { fx: 'question', x: 640, y: 440, with: true },
        { say: 'hija', text: 'Si me las gasto en golosinas, voy a tardar mucho más en comprar mi osito.', expr: 'worried', act: 'shrug' },
        { mood: 'proud', who: 'hija' },
        { say: 'hija', text: 'Mejor las guardo, hermano. ¡Estoy ahorrando!', expr: 'proud', act: 'nod' },
        { say: 'hijo', text: '¡Qué paciencia tienes, hermanita! A mí siempre me cuesta mucho ahorrar.', expr: 'surprised', act: 'clap' },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hija: { x: 640, mood: 'excited' },
        mama: { x: 1180, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: PIG.x, y: 900 },
        { prop: 'piggyBank', id: 'alcancia', x: PIG.x, y: PIG.y, scale: 1.6, with: true },
        { title: 'Muchos días después...', dur: 1.4 },
        { say: 'hija', text: '¡Veinte, veintiuno, y veintidós! ¡Ya tengo todas las monedas que necesito!', expr: 'excited', act: 'cheer' },
        { sfx: 'tada', with: true },
        { fx: 'confetti', x: 800, y: 420, with: true },
        { say: 'mama', text: '¡Lo lograste, hija! Ahorraste solita, día tras día. ¡Estoy muy orgullosa!', expr: 'proud', act: 'clap' },
        { do: 'hug', who: ['hija', 'mama'], dur: 1.6 },
        { fx: 'hearts', x: 900, y: 450, with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 540, mood: 'happy' },
        hijo: { x: 1080, mood: 'happy', facing: -1 },
        mama: { x: 1420, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 410, y: 960, scale: 1.8 },
        { prop: 'table', id: 'mesa', x: 810, y: 900, with: true },
        { say: 'hija', text: '¡Mi osito gigante! ¡Lo compré con mi propio dinero!', expr: 'excited', act: 'jump' },
        { sfx: 'sparkle', with: true },
        { prop: 'cookie', id: 'galleta', x: 810, y: 760, scale: 1.8 },
        { say: 'hija', text: 'Y con las dos monedas que me sobraron, te compré una galletita, hermano.', expr: 'happy', act: 'point' },
        { mood: 'surprised', who: 'hijo' },
        { say: 'hijo', text: '¿Para mí? ¡Qué buena hermanita eres! ¡Muchas gracias!', expr: 'excited', act: 'cheer' },
        { do: 'hug', who: ['hija', 'hijo'], dur: 1.6 },
        { fx: 'hearts', x: 810, y: 450, with: true },
        { say: 'mama', text: '¡Ahorrar y compartir! Es el mejor regalo de todos.', expr: 'proud', act: 'clap' },
        { do: 'dance', who: ['hija', 'hijo', 'mama'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Ahorrar es guardar un poquito cada día, para algo que queremos mucho. ¡Esperar vale la pena!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'Mi Primera Alcancía 🐷 Aprender a Ahorrar y Esperar | Dibujos Animados para Niños en Español',
    description: `¡Tini ve un osito gigante y lo quiere YA! 🧸 Pero Luna tiene una idea mejor: le regala su primera alcancía 🐷. Cada vez que ayuda en casa, Tini se gana una moneda 🪙. Tiene que juntar veinte… y un día Lio la invita a gastarlas en golosinas. ¿Podrá aguantarse? 🍬 Cuando por fin junta todas las monedas, Tini compra su osito… ¡y con las monedas que le sobraron le compra una galletita a su hermano! 💛 Un cuento infantil corto para enseñar a ahorrar, esperar y compartir.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que ahorrar es guardar un poquito cada día para algo que queremos mucho
• A esperar y a pensar antes de gastar
• Que lo que logramos con esfuerzo también se puede compartir

👨‍👩‍👧 Para papás y maestras: una alcancía transparente o un dibujo con casilleros para marcar cada moneda ayuda a que los niños VEAN cómo avanza su ahorro. Elijan juntos una meta chiquita y alcanzable.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!
🎵 ¡Síguenos también en TikTok! Las Aventuras de Nuestra Familia

#ahorro #dibujosanimados #cuentosinfantiles`,
    tags: [
      'ahorro para niños',
      'enseñar a ahorrar',
      'alcancía',
      'educación financiera para niños',
      'paciencia',
      'aprender a esperar',
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
