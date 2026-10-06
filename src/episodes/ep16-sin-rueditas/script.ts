import type { Episode } from '../../engine/script';

/**
 * Capítulo 16 — ¡Sin rueditas! (valor: perseverancia, no rendirse).
 * Hija rides a bicycle (`vehicle: 'bike'`); `fall` tips her over and she gets back up.
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const episode: Episode = {
  id: 'ep16-sin-rueditas',
  number: 16,
  title: '¡Sin rueditas!',
  subtitle: 'Tini quiere andar en bici sin rueditas… pero se cae una y otra vez',
  music: 'adventure',
  thumb: { bg: 'park', text: '¡SIN RUEDITAS!', prop: 'star', exprs: { hija: 'excited', hijo: 'excited', papa: 'proud', mama: 'love' }, cast: ['papa', 'hija', 'hijo', 'mama'] },
  scenes: [
    {
      bg: 'park',
      cast: {
        hija: { x: 640, mood: 'excited', vehicle: 'bike' },
        papa: { x: 440, mood: 'happy' },
        hijo: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: 'Papá, ¡hoy quiero andar en bicicleta sin rueditas!', expr: 'excited' },
        { say: 'papa', text: '¡Muy bien! Al principio yo te sostengo, ¿sí?', expr: 'happy', act: 'nod' },
        { do: 'walk', who: 'hija', to: 960, dur: 2.2 },
        { do: 'walk', who: 'papa', to: 770, dur: 2.2, with: true },
        { do: 'fall', who: 'hija' },
        { sfx: 'poof', with: true, delay: 0.5 },
        { mood: 'surprised', who: ['papa', 'hijo'], with: true },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: 'Me caí de la bici. No puedo, es muy difícil.', expr: 'sad' },
        { say: 'hijo', text: 'Yo también me caí un montón de veces. ¡No te rindas, hermanita!', expr: 'happy', act: 'cheer' },
      ],
    },
    {
      bg: 'park',
      cast: {
        hija: { x: 620, mood: 'worried', vehicle: 'bike' },
        papa: { x: 430, mood: 'happy' },
        hijo: { x: 1350, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Segundo intento...', dur: 1.4 },
        { do: 'walk', who: 'hija', to: 1000, dur: 2.4 },
        { do: 'walk', who: 'papa', to: 820, dur: 2.4, with: true },
        { do: 'fall', who: 'hija' },
        { sfx: 'poof', with: true, delay: 0.5 },
        { say: 'hija', text: 'Otra vez me caí...', expr: 'sad' },
        { say: 'papa', text: 'Cada vez que te caes, aprendes algo nuevo. Mira al frente, pedalea fuerte, ¡y vuelve a intentarlo!', expr: 'love', act: 'point' },
        { do: 'think', who: 'hija', dur: 1.4 },
        { mood: 'proud', who: 'hija' },
        { say: 'hija', text: '¡Está bien! ¡Una vez más!', expr: 'proud', act: 'nod' },
      ],
    },
    {
      bg: 'park',
      variant: 'sunset',
      cast: {
        hija: { x: 560, mood: 'excited', vehicle: 'bike' },
        papa: { x: 420, mood: 'happy' },
        hijo: { x: 1530, mood: 'happy', facing: -1 },
        mama: { x: -250, mood: 'happy' },
      },
      steps: [
        { title: 'Tercer intento...', dur: 1.4 },
        { do: 'walk', who: 'hija', to: 1220, dur: 3.6 },
        { do: 'walk', who: 'papa', to: 760, dur: 2.2, with: true },
        { say: 'hija', text: '¡Papá, mira! ¡Estoy andando sola!', expr: 'excited', with: true, delay: 1.6 },
        { mood: 'excited', who: ['papa', 'hijo'] },
        { do: 'walk', who: 'mama', to: 500 },
        { say: 'hijo', text: '¡Lo lograste, hermanita!', expr: 'excited', act: 'cheer' },
        { fx: 'confetti', x: 960, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'papa', text: '¡Lo lograste porque no te rendiste!', expr: 'proud', act: 'cheer' },
        { do: 'dance', who: ['papa', 'hijo', 'mama'], dur: 2.8, expr: 'laugh' },
        { say: 'narrador', text: 'Si te caes, te levantas y lo intentas otra vez. ¡Así se aprende!', with: true, delay: 0.6 },
      ],
    },
  ],
  youtube: {
    title: '¡Sin Rueditas! 🚲 Aprender a Andar en Bici | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `¡Tini quiere andar en bici sin rueditas! 🚲 Pero se cae una vez… y otra vez… 😢 Con la ayuda de Max y el aliento de su hermano, aprende que el secreto es no rendirse. 💪🌅 Un cuento infantil sobre la perseverancia y aprender cosas nuevas.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que equivocarse es parte de aprender
• A no rendirnos cuando algo es difícil
• Que con práctica y esfuerzo, ¡todo se logra!

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, aprender a andar en bicicleta, perseverancia y educación emocional para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#bicicleta #sinrueditas #perseverancia #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #videosparaniños #español`,
    tags: [
      'andar en bici sin rueditas',
      'aprender a andar en bicicleta',
      'perseverancia para niños',
      'no rendirse',
      'cuentos con valores',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'educación emocional para niños',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
