import type { Episode } from '../../engine/script';

/**
 * Capítulo 15 — Los papás de Benja (valor: aunque los papás se separen, el amor por los hijos no cambia).
 * Guests: `benja` (Hijo's classmate), `benjaPapa`, `benjaMama`.
 * Tone: gentle and reassuring. Key messages: it's not the child's fault; both parents keep loving him; two homes.
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const episode: Episode = {
  id: 'ep15-los-papas-de-benja',
  number: 15,
  title: 'Los papás de Benja',
  subtitle: 'Los papás de Benja van a vivir en casas separadas… y él tiene miedo',
  music: 'calm',
  thumb: { bg: 'school', text: 'DOS CASAS, UN AMOR', prop: 'heart', exprs: { hijo: 'love', hija: 'love', papa: 'love', mama: 'love' } },
  scenes: [
    {
      bg: 'school',
      cast: {
        hijo: { x: 620, mood: 'happy' },
        benja: { x: 920, mood: 'sad', facing: -1 },
      },
      steps: [
        { say: 'hijo', text: 'Benja, ¿qué te pasa? Hoy estás muy callado.', expr: 'worried' },
        { say: 'benja', text: 'Mis papás me dijeron que van a dejar de vivir juntos.', expr: 'sad' },
        { mood: 'worried', who: 'hijo' },
        { say: 'benja', text: '¿Y si es mi culpa? ¿Y si ya no me quieren?', expr: 'sad', act: 'tremble' },
        { do: 'walk', who: 'hijo', to: 700 },
        { say: 'hijo', text: 'No sé qué decirte, Benja. Pero yo soy tu amigo, y estoy aquí.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 800, y: 480, with: true, delay: 0.6 },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 620, mood: 'sad' },
        papa: { x: 960, mood: 'love', facing: -1 },
        mama: { x: 1260, mood: 'love', facing: -1 },
      },
      steps: [
        { title: 'Esa tarde, en casa...', dur: 1.8 },
        { say: 'hijo', text: 'Papá, mamá: los papás de Benja van a vivir en casas separadas. Él está muy triste.', expr: 'sad' },
        { say: 'mama', text: 'A veces los papás deciden no vivir más juntos. Es una decisión de grandes, y nunca es culpa de los hijos.', expr: 'love' },
        { say: 'papa', text: 'Y lo más importante: su mamá y su papá lo van a seguir queriendo siempre. Eso nunca cambia.', expr: 'love', act: 'nod' },
        { mood: 'surprised', who: 'hijo' },
        { say: 'hijo', text: '¿Aunque vivan en casas diferentes?', expr: 'surprised' },
        { say: 'mama', text: 'Aunque vivan en casas diferentes. El amor por un hijo no se muda: va con él a todas partes.', expr: 'love', act: 'hug' },
        { fx: 'hearts', x: 900, y: 460, with: true, delay: 0.6 },
        { mood: 'happy', who: 'hijo' },
        { say: 'hijo', text: '¡Mañana se lo voy a decir a Benja!', expr: 'happy', act: 'jump' },
      ],
    },
    {
      bg: 'school',
      cast: {
        hijo: { x: 640, mood: 'happy' },
        benja: { x: 900, mood: 'sad', facing: -1 },
        benjaPapa: { x: -250, mood: 'love' },
        benjaMama: { x: 2250, mood: 'love', facing: -1 },
      },
      steps: [
        { title: 'Al día siguiente...', dur: 1.6 },
        { say: 'hijo', text: 'Benja, no es tu culpa. Y tus papás te van a querer siempre, siempre.', expr: 'love', act: 'nod' },
        { do: 'walk', who: 'benjaMama', to: 1200 },
        { do: 'walk', who: 'benjaPapa', to: 400, with: true },
        { mood: 'surprised', who: 'benja' },
        { say: 'benjaMama', text: 'Hola, mi amor. Hoy vinimos los dos a buscarte.', expr: 'love', act: 'wave' },
        { say: 'benjaPapa', text: 'Vamos a vivir en casas distintas, campeón. Pero te vamos a querer siempre.', expr: 'love' },
        { say: 'benja', text: '¿Siempre, siempre? ¿Aunque vivan separados?', expr: 'surprised' },
        { say: 'benjaMama', text: 'Siempre, siempre. Eso nunca va a cambiar.', expr: 'love', act: 'hug' },
        { do: 'hug', who: 'benjaPapa', with: true },
        { fx: 'hearts', x: 900, y: 450, dur: 2, with: true, delay: 0.4 },
        { mood: 'happy', who: 'benja' },
        { say: 'benja', text: '¡Voy a tener dos casas llenas de amor!', expr: 'love', act: 'cheer' },
        { mood: 'love', who: 'hijo', with: true },
        { sfx: 'sparkle', with: true },
        { say: 'narrador', text: 'Aunque los papás vivan en casas distintas, el amor por sus hijos nunca se separa.', delay: 0.4 },
      ],
    },
  ],
  youtube: {
    title: 'Los Papás de Benja 💙 Cuando Papá y Mamá se Separan | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Benja, el compañero de Hijo, está muy triste: sus papás van a dejar de vivir juntos. 💙 Tiene miedo de que sea su culpa y de que ya no lo quieran… Con ayuda de Papá y Mamá, Hijo aprende algo muy importante para contarle a su amigo: el amor de los papás por sus hijos nunca se separa. 🏠❤️🏠

Un cuento infantil, cálido y tranquilizador, para acompañar a los niños cuando sus papás se separan o se divorcian.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que la separación de los papás nunca es culpa de los hijos
• Que mamá y papá los siguen queriendo siempre, aunque vivan en casas distintas
• A acompañar a un amigo que está triste

👶 Ideal para niños de 3 a 8 años. Dibujos animados 3D en español, separación y divorcio explicado a niños, dos casas, educación emocional.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#separacion #divorcio #doscasas #educacionemocional #cuentosinfantiles #dibujosanimados #cuentosparaniños #familia #animacion3d #español`,
    tags: [
      'separación de padres explicada a niños',
      'divorcio para niños',
      'cuento sobre separación',
      'papás separados',
      'dos casas',
      'educación emocional para niños',
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
