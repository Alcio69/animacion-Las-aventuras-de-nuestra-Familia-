import type { Episode } from '../../engine/script';

/**
 * Capítulo 29 — ¡Cuidemos el planeta! (valor: ecología; juntar la basura, reciclar, cuidar el agua y la energía).
 * Park with litter ('trash') and recycling bins ('recycleBins'); last scene at home (kitchen).
 * Keep characters between x≈400 and x≈1550 for the 3D camera.
 */
const episode: Episode = {
  id: 'ep29-cuidemos-el-planeta',
  number: 29,
  title: '¡Cuidemos el planeta!',
  subtitle: 'La familia encuentra basura en el parque y se convierte en guardiana del planeta',
  music: 'adventure',
  thumb: { bg: 'park', text: '¡CUIDEMOS EL PLANETA!', prop: 'recycleBins', exprs: { papa: 'proud', mama: 'happy', hijo: 'excited', hija: 'excited' } },
  scenes: [
    {
      bg: 'park',
      cast: {
        hija: { x: 520, mood: 'happy' },
        hijo: { x: 760, mood: 'happy' },
        papa: { x: 1300, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'trash', id: 'b1', x: 640, y: 960 },
        { prop: 'trash', id: 'b2', x: 1040, y: 950, with: true },
        { prop: 'trash', id: 'b3', x: 1440, y: 960, with: true },
        { mood: 'surprised', who: 'hija' },
        { say: 'hija', text: '¡Qué feo! Hay botellas y bolsas tiradas en el pasto.', expr: 'surprised', act: 'point' },
        { mood: 'sad', who: 'hijo' },
        { say: 'hijo', text: 'Los pajaritos y los perritos se pueden lastimar con esa basura.', expr: 'sad' },
        { say: 'papa', text: '¿Y si la juntamos entre todos? ¡Seamos los guardianes del parque!', expr: 'excited', act: 'cheer' },
        { mood: 'excited', who: ['hija', 'hijo'] },
        { removeProp: 'b1', delay: 0.3 },
        { fx: 'sparkle', x: 640, y: 860, with: true },
        { sfx: 'pop', with: true },
        { removeProp: 'b2', delay: 0.4 },
        { fx: 'sparkle', x: 1040, y: 860, with: true },
        { sfx: 'pop', with: true },
        { removeProp: 'b3', delay: 0.4 },
        { fx: 'sparkle', x: 1440, y: 860, with: true },
        { sfx: 'pop', with: true },
        { say: 'hija', text: '¡Listo! ¡El parque quedó limpito!', expr: 'laugh', act: 'jump' },
      ],
    },
    {
      bg: 'park',
      cast: {
        hija: { x: 460, mood: 'happy' },
        hijo: { x: 700, mood: 'happy' },
        papa: { x: 1400, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'recycleBins', id: 'tachos', x: 1060, y: 900, scale: 1.5 },
        { say: 'papa', text: 'Ahora la separamos: el plástico va al amarillo, el papel al azul y el vidrio al verde.', expr: 'happy', act: 'point' },
        { say: 'hijo', text: '¡La botella de plástico va al amarillo!', expr: 'excited', act: 'point' },
        { sfx: 'pop', with: true, delay: 1.2 },
        { say: 'hija', text: '¡Y este papel arrugado va al azul!', expr: 'excited', act: 'point' },
        { sfx: 'pop', with: true, delay: 1.2 },
        { say: 'papa', text: 'Así la basura se puede usar otra vez para hacer cosas nuevas. ¡Eso se llama reciclar!', expr: 'proud', act: 'clap' },
        { fx: 'stars', x: 1060, y: 600, with: true },
      ],
    },
    {
      bg: 'kitchen',
      cast: {
        hija: { x: 520, mood: 'happy' },
        hijo: { x: 760, mood: 'happy' },
        mama: { x: 1260, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'De vuelta en casa...', dur: 1.6 },
        { say: 'hija', text: 'Mamá, ¿sabías que si cerramos la llave del agua mientras nos lavamos los dientes, cuidamos el planeta?', expr: 'excited', act: 'point' },
        { say: 'mama', text: '¡Muy bien, hija! Y si apagamos la luz al salir de un cuarto, también cuidamos la energía.', expr: 'proud', act: 'nod' },
        { say: 'hijo', text: '¡Somos los guardianes del planeta!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hija', 'hijo', 'mama'], dur: 3, expr: 'laugh' },
        { fx: 'confetti', x: 900, y: 300, dur: 3, with: true },
        { sfx: 'tada', with: true },
        { say: 'narrador', text: 'Pequeñas acciones de todos los días cuidan nuestro planeta. ¡Tú también puedes ayudar!', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Cuidemos el Planeta! ♻️ Reciclar para Niños | Las Aventuras de Nuestra Familia | Cuentos para Niños',
    description: `En el parque, Lio y Tini encuentran botellas y bolsas tiradas en el pasto. 😟 Con su papá Max juntan la basura, aprenden a separarla para reciclar ♻️ y en casa descubren cómo cuidar el agua y la energía. 🌍 Un cuento infantil sobre ecología, reciclaje y el cuidado del medio ambiente.

🐶🐱 En "Las Aventuras de Nuestra Familia" acompañamos a Max, el papá (un labrador juguetón), Luna, la mamá (una gatita negra muy inteligente), Lio (un perrito aventurero) y Martina, "Tini" (una gatita naranja súper divertida) en historias cortas con valores para toda la familia.

✨ En este capítulo aprendemos:
• A no tirar basura y a juntarla
• A separar los residuos para reciclar
• A cuidar el agua y la energía en casa

👶 Ideal para niños de 2 a 8 años y para usar en el aula. Dibujos animados 3D en español, reciclaje para niños, cuidado del medio ambiente, ecología, día de la Tierra.

🔔 ¡Suscríbete y activa la campanita para ver un nuevo capítulo cada semana!

#reciclaje #medioambiente #ecologia #cuidarelplaneta #cuentosinfantiles #dibujosanimados #cuentosparaniños #valores #animacion3d #español`,
    tags: [
      'reciclaje para niños',
      'cuidar el planeta',
      'medio ambiente para niños',
      'ecología para niños',
      'cuidar el agua',
      'día de la tierra',
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
