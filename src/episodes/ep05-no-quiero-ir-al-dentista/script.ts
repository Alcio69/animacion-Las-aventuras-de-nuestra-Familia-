import type { Episode } from '../../engine/script';

/**
 * Capítulo 5 — ¡No quiero ir al dentista! (valor: enfrentar miedos / cuidar los dientes).
 * Guest character: `dentista` (grey schnauzer in a white coat).
 * Floor is y=930. Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const HAND = 760; // props at y=760 float at chest height (as if held)

const episode: Episode = {
  id: 'ep05-no-quiero-ir-al-dentista',
  number: 5,
  title: '¡No quiero ir al dentista!',
  subtitle: 'Hijo tiene miedo de su primera visita al dentista…',
  music: 'happy',
  thumb: { bg: 'dentist', text: '¡NO QUIERO IR!', prop: 'toothbrush', exprs: { hijo: 'worried', hija: 'happy', papa: 'surprised', mama: 'love' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 700, mood: 'happy' },
        mama: { x: 1100, mood: 'happy', facing: -1 },
        hija: { x: 1400, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Hijo, prepárate. Hoy vamos al dentista.', expr: 'happy', act: 'wave' },
        { mood: 'surprised', who: 'hijo' },
        { fx: 'exclaim', x: 700, y: 380, dur: 1, with: true },
        { say: 'hijo', text: '¿Al dentista? ¡No quiero ir! ¿Y si me duele?', expr: 'worried', act: 'tremble' },
        { fx: 'sweat', x: 760, y: 420, dur: 1.2, with: true, delay: 0.4 },
        { say: 'hija', text: 'Yo fui el mes pasado, ¡y me regalaron una estrella!', expr: 'excited', act: 'jump' },
        { say: 'mama', text: 'El dentista es un amigo que cuida tu sonrisa.', expr: 'love', act: 'hug' },
        { mood: 'worried', who: 'hijo' },
        { say: 'hijo', text: 'Bueno. Pero tú me acompañas, ¿sí?', expr: 'worried' },
        { do: 'nod', who: 'mama', expr: 'love' },
      ],
    },
    {
      bg: 'dentist',
      cast: {
        mama: { x: 420, mood: 'happy' },
        hijo: { x: 720, mood: 'worried' },
        dentista: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'dentista', text: '¡Hola, Hijo! Bienvenido. Hoy solo vamos a contar tus dientes.', expr: 'happy', act: 'wave' },
        { say: 'hijo', text: '¿Solo contarlos? ¿No me va a doler?', expr: 'worried', act: 'shrug' },
        { say: 'dentista', text: 'Para nada. Abre la boca bien grande, como un león.', expr: 'happy', act: 'point' },
        { mood: 'surprised', who: 'hijo' },
        { do: 'cheer', who: 'hijo', dur: 1.2, expr: 'surprised', with: true, delay: 0.3 },
        { wait: 0.6 },
        { say: 'dentista', text: 'Uno, dos, tres, cuatro... ¡Qué dientes tan limpios!', expr: 'excited', act: 'clap' },
        { fx: 'sparkle', x: 720, y: 400, dur: 1.8, with: true, delay: 1.5 },
        { sfx: 'sparkle', with: true, delay: 1.5 },
        { prop: 'star', id: 'estrella', x: 960, y: HAND },
        { sfx: 'ding', with: true },
        { say: 'dentista', text: '¡Te ganaste la estrella de los valientes!', expr: 'proud', act: 'hips' },
        { mood: 'excited', who: ['hijo', 'mama'] },
        { say: 'hijo', text: '¡Gracias, doctor! ¡No me dolió nada!', expr: 'excited', act: 'jump' },
        { fx: 'stars', x: 720, y: 420, with: true, delay: 0.3 },
      ],
    },
    {
      bg: 'living',
      variant: 'rainbow',
      cast: {
        hijo: { x: 640, mood: 'excited' },
        hija: { x: 950, mood: 'happy' },
        papa: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { say: 'hijo', text: '¡Papá! ¡Fui al dentista y fui muy valiente!', expr: 'excited', act: 'cheer' },
        { say: 'papa', text: '¡Muy bien, campeón! Para tener dientes fuertes, hay que cepillarlos todos los días.', expr: 'proud', act: 'hips' },
        { prop: 'toothbrush', id: 'c1', x: 760, y: HAND },
        { prop: 'toothbrush', id: 'c2', x: 1060, y: HAND, with: true, delay: 0.2 },
        { sfx: 'pop', with: true },
        { say: 'hija', text: '¡Vamos a cepillarnos juntos!', expr: 'excited', act: 'jump' },
        { do: 'dance', who: ['hijo', 'hija', 'papa'], dur: 3, expr: 'laugh' },
        { fx: 'sparkle', x: 900, y: 450, dur: 2, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Visitar al dentista es una forma de cuidar nuestra sonrisa.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡No Quiero Ir al Dentista! 🦷 Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `Hijo tiene que ir al dentista y está muy asustado: "¿Y si me duele?" 😟🦷 Pero el dentista resulta ser súper amable… ¡y hasta le regala la estrella de los valientes! ⭐ Un cuento infantil para perderle el miedo al dentista y aprender a cuidar los dientes.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Papá (un labrador juguetón), Mamá (una gatita negra muy inteligente), Hijo (un perrito aventurero) e Hija (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• Que el dentista es nuestro amigo
• A ser valientes aunque tengamos miedo
• Que hay que cepillarse los dientes todos los días

👶 Ideal para niños de 2 a 8 años. Dibujos animados 3D en español, primera visita al dentista, hábitos saludables y videos educativos para niños.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#dentista #miedoaldentista #cepillarselosdientes #cuentosinfantiles #dibujosanimados #cuentosparaniños #habitossaludables #animacion3d #videosparaniños #español`,
    tags: [
      'ir al dentista',
      'miedo al dentista',
      'primera visita al dentista',
      'cepillarse los dientes',
      'cuidar los dientes niños',
      'cuentos para niños',
      'cuentos infantiles',
      'dibujos animados en español',
      'cuentos con valores',
      'hábitos saludables',
      'videos para niños',
      'animación 3d infantil',
      'las aventuras de nuestra familia',
    ],
  },
};

export default episode;
