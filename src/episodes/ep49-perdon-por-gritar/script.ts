import type { Episode } from '../../engine/script';

/**
 * Capítulo 49 — ¡Perdón por gritar! (valor: los grandes también se equivocan; reparar después de un enojo; un plan
 * para la calma). Max, tired, yells at the kids; he calms down, apologizes, and the family builds a calm corner.
 * Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep49-perdon-por-gritar',
  number: 49,
  title: '¡Perdón por gritar!',
  subtitle: 'Max está muy cansado y les grita a los chicos… ¿qué hace un papá cuando se equivoca?',
  music: 'calm',
  thumb: { bg: 'living', text: '¡PERDÓN POR GRITAR!', prop: 'ball', hero: ['papa'], exprs: { papa: 'sad' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'angry' },
        hija: { x: 820, mood: 'angry', facing: -1 },
        papa: { x: 1320, mood: 'sleepy', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 690, y: 960 },
        { say: 'hijo', text: '¡Es mi pelota! ¡Yo la vi primero!', expr: 'angry', act: 'point' },
        { say: 'hija', text: '¡No es verdad! ¡Me toca a mí, me toca a mí!', expr: 'angry', act: 'shake' },
        { say: 'papa', text: 'Chicos, por favor, bajen la voz. Estoy muy cansado.', expr: 'sleepy', act: 'shrug' },
        { say: 'hijo', text: '¡Dámela ahora mismo, es mía!', expr: 'angry', act: 'tremble' },
        { say: 'hija', text: '¡Papá, mi hermano no me deja jugar!', expr: 'angry', act: 'hips' },
        { mood: 'angry', who: 'papa' },
        { do: 'jump', who: 'papa', dur: 0.6 },
        { sfx: 'drum', with: true },
        { say: 'papa', text: '¡BASTA YA, LOS DOS! ¡NO PUEDO MÁS!', expr: 'angry', act: 'tremble' },
        { mood: 'surprised', who: ['hijo', 'hija'] },
        { fx: 'exclaim', x: 690, y: 450, with: true },
        { mood: 'sad', who: ['hijo', 'hija'] },
        { wait: 0.6 },
        { mood: 'sad', who: 'papa' },
        { do: 'walk', who: 'papa', to: 2250 },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        papa: { x: 900, mood: 'sad' },
        mama: { x: 1250, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'papa', text: 'Les grité a los chicos. No estuvo bien, y ahora me siento muy mal.', expr: 'sad', act: 'shrug' },
        { say: 'mama', text: 'Todos nos equivocamos a veces. Respira profundo, y cuando estés tranquilo, habla con ellos.', expr: 'sad', act: 'hug' },
        { do: 'nod', who: 'papa', dur: 1.6 },
        { fx: 'sparkle', x: 900, y: 500, with: true },
        { mood: 'neutral', who: 'papa' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'sad' },
        hija: { x: 800, mood: 'sad' },
        papa: { x: 2250, mood: 'sad', facing: -1 },
      },
      steps: [
        { do: 'walk', who: 'papa', to: 1080 },
        { say: 'papa', text: 'Chicos, perdón por gritarles. Estaba muy cansado, pero eso no es culpa de ustedes.', expr: 'sad', act: 'hug' },
        { say: 'hija', text: 'Papá, nos asustamos muchísimo.', expr: 'sad' },
        { say: 'papa', text: 'Tienen razón. Gritar no estuvo bien. Los papás también nos equivocamos.', expr: 'sad', act: 'nod' },
        { say: 'hijo', text: 'Nosotros también te pedimos perdón por pelear tanto.', expr: 'sad', act: 'shrug' },
        { mood: 'happy', who: ['hijo', 'hija'] },
        { do: 'hug', who: ['hijo', 'hija', 'papa'], dur: 1.8 },
        { fx: 'hearts', x: 820, y: 450, with: true },
        { say: 'papa', text: 'Hagamos un plan: cuando alguien se enoja, respira profundo y cuenta hasta diez.', expr: 'happy', act: 'point' },
        { say: 'hija', text: '¡Y armamos un rincón de la calma, con almohadones y cuentos!', expr: 'excited', act: 'cheer' },
        { sfx: 'sparkle', with: true },
      ],
    },
    {
      bg: 'bedroom',
      variant: 'day',
      cast: {
        hijo: { x: 640, mood: 'angry' },
        hija: { x: 1000, mood: 'happy', facing: -1 },
        papa: { x: 1340, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'teddy', id: 'osito', x: 820, y: 960 },
        { prop: 'book', id: 'libro', x: 900, y: 960, with: true },
        { title: 'Unos días después...', dur: 1.6 },
        { say: 'hijo', text: 'Me enojé porque perdí el juego. Voy a mi rincón de la calma.', expr: 'angry', act: 'shrug' },
        { do: 'think', who: 'hijo', dur: 2.2 },
        { fx: 'sparkle', x: 640, y: 480, with: true },
        { mood: 'happy', who: 'hijo' },
        { say: 'hijo', text: 'Ya respiré, y conté hasta diez. ¡Ahora estoy tranquilo!', expr: 'happy', act: 'nod' },
        { say: 'papa', text: '¡Muy bien, campeón! Y yo también uso el plan cuando me enojo.', expr: 'proud', act: 'clap' },
        { do: 'dance', who: ['hijo', 'hija', 'papa'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Todos nos enojamos a veces, también los grandes. Pedir perdón y volver a abrazarnos nos hace más fuertes.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Perdón por Gritar! 💛 Los Papás También se Equivocan | Dibujos Animados para Niños en Español',
    description: `Lio y Tini no paran de pelear por la pelota, y Max está muy, muy cansado… hasta que grita: "¡BASTA YA!" 😣 Los chicos se asustan, y Max se siente muy mal. Entonces respira, se calma y hace algo muy valiente: les pide perdón. 💛 Juntos arman un plan para cuando alguien se enoja: respirar, contar hasta diez y un rincón de la calma. Un cuento infantil corto sobre el enojo, pedir perdón y reparar.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que todos nos enojamos a veces, también los grandes
• Que pedir perdón nos hace más fuertes
• Un plan para la calma: respirar, contar hasta diez y el rincón de la calma

👨‍👩‍👧 Para papás y maestras: a todos se nos escapa un grito alguna vez. Volver, pedir perdón y explicar que no es culpa de ellos les enseña muchísimo. Armen juntos su propio rincón de la calma.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#crianzarespetuosa #dibujosanimados #cuentosinfantiles`,
    tags: [
      'perdón por gritar',
      'le grité a mi hijo',
      'manejar el enojo',
      'rincón de la calma',
      'pedir perdón',
      'crianza respetuosa',
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
