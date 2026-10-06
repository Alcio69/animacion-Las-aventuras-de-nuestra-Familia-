import type { Episode } from '../../engine/script';

/**
 * Capítulo 20 — No me gusta que se burlen de mí (valor: frenar el bullying; contarle a un adulto; defender a otros).
 * Guests: `lola` (Hija's best friend), `nico` and `mati` (classmates who tease), `maestra` (teacher).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const episode: Episode = {
  id: 'ep20-no-me-gusta-que-se-burlen',
  number: 20,
  title: 'No me gusta que se burlen de mí',
  subtitle: 'Dos compañeros se burlan del moño de Hija… ¿qué puede hacer?',
  music: 'calm',
  thumb: {
    bg: 'school',
    text: '¡NO TE BURLES!',
    prop: 'heart',
    exprs: { lola: 'proud', hija: 'sad', nico: 'laugh', mati: 'laugh' },
    cast: ['nico', 'hija', 'lola', 'mati'],
  },
  scenes: [
    {
      bg: 'school',
      cast: {
        hija: { x: 520, mood: 'happy' },
        lola: { x: 770, mood: 'happy' },
        nico: { x: 1100, mood: 'laugh', facing: -1 },
        mati: { x: 1360, mood: 'laugh', facing: -1 },
      },
      steps: [
        { say: 'hija', text: 'Lola, ¿te gusta mi moño nuevo? Me lo regaló mi abuela.', expr: 'happy' },
        { say: 'nico', text: '¡Qué moño tan grande! ¡Parece una mariposa gigante!', expr: 'laugh', act: 'point' },
        { sfx: 'giggle', with: true },
        { say: 'mati', text: '¡Moño de mariposa! ¡Moño de mariposa!', expr: 'laugh', act: 'clap' },
        { mood: 'sad', who: 'hija' },
        { say: 'hija', text: 'No me gusta que se burlen de mí.', expr: 'sad' },
        { say: 'nico', text: '¡Pero si es solo una broma!', expr: 'laugh', act: 'shrug' },
        { mood: 'proud', who: 'lola' },
        { say: 'lola', text: 'Una broma es cuando todos se ríen. Si a ella no le gusta, no es una broma.', expr: 'proud', act: 'hips' },
        { mood: 'surprised', who: ['nico', 'mati'] },
        { say: 'lola', text: 'Ven, Hija. Vamos a contarle a la maestra.', expr: 'love', act: 'hug' },
      ],
    },
    {
      bg: 'school',
      cast: {
        hija: { x: 560, mood: 'sad' },
        lola: { x: 800, mood: 'happy' },
        maestra: { x: 1220, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hija', text: 'Maestra, unos compañeros se burlan de mi moño y me siento muy triste.', expr: 'sad' },
        { mood: 'love', who: 'maestra' },
        { say: 'maestra', text: 'Hiciste muy bien en contármelo. Pedir ayuda es de valientes.', expr: 'love', act: 'nod' },
        { say: 'maestra', text: 'Y tú, Lola, fuiste una gran amiga al defenderla.', expr: 'proud', act: 'clap' },
        { mood: 'proud', who: 'lola' },
        { say: 'maestra', text: 'No te preocupes, Hija. Voy a hablar con ellos ahora mismo.', expr: 'happy', act: 'hug' },
        { mood: 'happy', who: 'hija' },
      ],
    },
    {
      bg: 'school',
      cast: {
        nico: { x: 470, mood: 'worried' },
        mati: { x: 720, mood: 'worried' },
        maestra: { x: 1000, mood: 'happy', facing: -1 },
        hija: { x: 2250, mood: 'happy', facing: -1 },
        lola: { x: 2250, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'maestra', text: 'Cuando alguien se burla de otro, le hace daño, aunque parezca un juego. ¿Cómo te sentirías tú si se burlaran de ti?', expr: 'happy' },
        { mood: 'sad', who: ['nico', 'mati'] },
        { say: 'nico', text: 'Me sentiría muy triste. No lo había pensado así.', expr: 'sad' },
        { do: 'walk', who: 'hija', to: 1260 },
        { do: 'walk', who: 'lola', to: 1510, with: true, delay: 0.3 },
        { say: 'mati', text: 'Perdón, Hija. Te prometemos que no lo vamos a hacer nunca más.', expr: 'sad', act: 'nod' },
        { say: 'nico', text: 'Y la verdad... tu moño es muy lindo.', expr: 'love' },
        { mood: 'laugh', who: 'hija' },
        { say: 'hija', text: '¡Gracias! ¿Quieren jugar con nosotras en el recreo?', expr: 'laugh', act: 'wave' },
        { mood: 'excited', who: ['nico', 'mati'] },
        { say: 'mati', text: '¡Claro que sí! ¡Ahora somos todos amigos!', expr: 'excited', act: 'cheer' },
        { do: 'dance', who: ['nico', 'mati', 'hija', 'lola'], dur: 3, expr: 'laugh' },
        { fx: 'hearts', x: 960, y: 450, dur: 2.4, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'narrador', text: 'Si alguien se burla de ti, cuéntale a un adulto. ¡Y si ves que molestan a otro, defiéndelo!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: 'No Me Gusta que se Burlen de Mí 🛑 Bullying para Niños | Las Aventuras de Nuestra Familia | Cuentos con Valores',
    description: `En la escuela, dos compañeros se burlan del moño nuevo de Hija: "¡Moño de mariposa!" 😢 Su amiga Lola la defiende y juntas le cuentan a la maestra. 🛑💛 Un cuento infantil sobre el bullying y las burlas en la escuela: qué hacer si se burlan de ti, cómo defender a un amigo y por qué una "broma" que lastima no es una broma.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que burlarse de alguien lastima
• A pedir ayuda a un adulto
• A defender a un amigo
• A pedir perdón

👶 Ideal para niños de 3 a 8 años y para usar en el aula. Dibujos animados 3D en español, bullying para niños, acoso escolar, burlas en la escuela, empatía y respeto.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#bullying #bullyingparaniños #acosoescolar #empatia #respeto #cuentosinfantiles #dibujosanimados #cuentosparaniños #animacion3d #español`,
    tags: [
      'bullying para niños',
      'bullying',
      'acoso escolar',
      'burlas en la escuela',
      'cuento sobre bullying',
      'empatía para niños',
      'respeto',
      'cuentos con valores',
      'cuentos para niños',
      'dibujos animados en español',
      'videos para niños',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
