import type { Episode } from '../../engine/script';

/**
 * Capítulo 53 — ¡Él empezó! (valor: resolver peleas entre hermanos sin un juez; el semáforo de la calma: rojo =
 * frenar y respirar, amarillo = decir qué siento y qué quiero, verde = buscar juntos una solución).
 * Lio and Tini fight over the TV remote; Max teaches them the traffic light, and later they use it alone in the park.
 * Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep53-el-empezo',
  number: 53,
  title: '¡Él empezó!',
  subtitle: 'Lio y Tini pelean por el control remoto… ¿quién empezó? Max tiene una idea mejor: el semáforo de la calma.',
  music: 'happy',
  thumb: { bg: 'living', text: '¡ÉL EMPEZÓ!', prop: 'remote', hero: ['hija', 'hijo'], exprs: { hija: 'angry', hijo: 'angry' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 620, mood: 'angry' },
        hija: { x: 900, mood: 'angry', facing: -1 },
        papa: { x: 2250, mood: 'surprised', facing: -1 },
      },
      steps: [
        { prop: 'remote', id: 'control', x: 760, y: 760 },
        { say: 'hijo', text: '¡Dame el control remoto! ¡Ahora empieza mi programa!', expr: 'angry', act: 'point' },
        { say: 'hija', text: '¡No es justo! ¡Siempre eliges el programa, hermano!', expr: 'angry', act: 'hips' },
        { say: 'hijo', text: '¡Pero ella me quitó el control primero!', expr: 'angry', act: 'shake' },
        { say: 'hija', text: '¡No es verdad! ¡Él empezó!', expr: 'angry', act: 'tremble' },
        { sfx: 'drum' },
        { do: 'walk', who: 'papa', to: 1250 },
        { say: 'papa', text: '¿Pero qué pasa aquí? Parece que hay dos chicos muy enojados.', expr: 'surprised', act: 'shrug' },
        { say: 'hija', text: '¡Papá, él empezó! ¡Me quiere quitar el control!', expr: 'angry', act: 'point' },
        { say: 'hijo', text: '¡No, papá! ¡Ella empezó primero!', expr: 'angry', act: 'shake' },
        { mood: 'happy', who: 'papa' },
        { say: 'papa', text: 'No voy a decidir quién empezó. Hoy les voy a enseñar a resolverlo ustedes solos.', expr: 'happy', act: 'nod' },
        { mood: 'surprised', who: ['hijo', 'hija'] },
        { fx: 'question', x: 760, y: 440, with: true },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'neutral' },
        hija: { x: 820, mood: 'neutral', facing: -1 },
        papa: { x: 1320, mood: 'happy', facing: -1 },
      },
      steps: [
        { prop: 'table', id: 'mesa', x: 1080, y: 900 },
        { prop: 'trafficLight', id: 'semaforo', x: 1080, y: 760, with: true },
        { fx: 'sparkle', x: 1080, y: 520, with: true },
        { sfx: 'sparkle', with: true },
        { say: 'papa', text: 'Este es el semáforo de la calma. Con el rojo, frenamos y respiramos profundo.', expr: 'happy', act: 'point' },
        { say: 'papa', text: 'Con el amarillo, cada uno dice qué siente y qué quiere, pero sin gritar.', expr: 'happy', act: 'nod' },
        { say: 'papa', text: 'Y con el verde, buscamos juntos una solución que sea buena para los dos.', expr: 'happy', act: 'cheer' },
        { say: 'hija', text: 'Primero, el rojo. Voy a respirar muy profundo.', expr: 'neutral', act: 'nod' },
        { do: 'nod', who: ['hijo', 'hija'], dur: 1.8 },
        { say: 'hija', text: 'Me siento triste, porque yo también quiero ver mi programa de animales.', expr: 'sad', act: 'shrug' },
        { say: 'hijo', text: 'Y yo me siento enojado, porque mi programa empieza ahora mismo.', expr: 'angry', act: 'shrug' },
        { say: 'papa', text: '¡Muy bien dicho, los dos! ¿Y ahora qué color sigue?', expr: 'proud', act: 'clap' },
        { prop: 'timer', id: 'reloj', x: 690, y: 760 },
        { say: 'hija', text: '¡El verde! ¿Y si usamos el reloj de arena para hacer turnos?', expr: 'excited', act: 'point' },
        { say: 'hijo', text: '¡Buena idea, hermanita! Primero mi programa, y después el tuyo.', expr: 'happy', act: 'nod' },
        { say: 'hija', text: 'Bueno, pero mañana me toca elegir a mí primero.', expr: 'happy', act: 'hips' },
        { say: 'hijo', text: '¡Trato hecho, hermanita! Dame esa mano.', expr: 'laugh', act: 'wave' },
        { sfx: 'pop', with: true },
        { fx: 'stars', x: 690, y: 460, with: true },
        { say: 'papa', text: '¡Lo resolvieron ustedes solos! Estoy muy orgulloso de los dos.', expr: 'proud', act: 'clap' },
        { do: 'hug', who: ['hijo', 'hija', 'papa'], dur: 1.8 },
        { fx: 'hearts', x: 820, y: 450, with: true },
      ],
    },
    {
      bg: 'park',
      cast: {
        hijo: { x: 640, mood: 'angry' },
        hija: { x: 960, mood: 'angry', facing: -1 },
        mama: { x: 1380, mood: 'worried', facing: -1 },
      },
      steps: [
        { prop: 'ball', id: 'pelota', x: 800, y: 960 },
        { title: 'Unos días después...', dur: 1.6 },
        { say: 'hija', text: '¡Me toca a mí patear la pelota!', expr: 'angry', act: 'point' },
        { say: 'hijo', text: '¡No, me toca a mí! Bueno, espera, hermanita. ¡Usemos el semáforo!', expr: 'angry', act: 'wave' },
        { mood: 'neutral', who: ['hijo', 'hija'] },
        { do: 'nod', who: ['hijo', 'hija'], dur: 1.6 },
        { say: 'hija', text: 'Yo quiero patear porque nunca hago goles.', expr: 'sad', act: 'shrug' },
        { say: 'hijo', text: '¡Ya sé! Yo soy el arquero, y tú pateas cinco veces.', expr: 'excited', act: 'cheer' },
        { mood: 'happy', who: ['hijo', 'hija', 'mama'] },
        { do: 'walk', who: 'hijo', to: 460 },
        { moveProp: 'pelota', x: 520, y: 760, dur: 0.8, arc: 160, bounces: 1, delay: 0.3 },
        { sfx: 'boing', with: true, delay: 0.3 },
        { say: 'hija', text: '¡Hice un gol, hermano! ¡Hice un gol!', expr: 'excited', act: 'jump' },
        { sfx: 'tada', with: true },
        { fx: 'confetti', x: 900, y: 420, with: true },
        { say: 'mama', text: '¡Qué lindo verlos así! Ya no necesitan que nadie los ayude a resolverlo.', expr: 'proud', act: 'clap' },
        { do: 'dance', who: ['hijo', 'hija', 'mama'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Pelear a veces es normal. Lo importante es frenar, decir lo que sentimos, y buscar juntos una solución.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡Él Empezó! 🚦 Peleas Entre Hermanos y el Semáforo de la Calma | Dibujos Animados para Niños en Español',
    description: `¡Lio y Tini pelean por el control remoto! 📺😠 "¡Él empezó!" "¡No, ella empezó!" Pero Max no hace de juez: les enseña el semáforo de la calma 🚦. Con el rojo, frenan y respiran. Con el amarillo, cada uno dice qué siente y qué quiere, sin gritar. Y con el verde, buscan juntos una solución. ⏳ Unos días después, en el parque, ¡los hermanos lo usan solitos! ⚽ Un cuento infantil corto para resolver las peleas entre hermanos.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• El semáforo de la calma: frenar, decir lo que sentimos y buscar una solución
• Que no importa quién empezó, sino cómo lo arreglamos
• A turnarnos y a ponernos en el lugar del otro

👨‍👩‍👧 Para papás y maestras: en vez de buscar al culpable, ayúdenlos a poner en palabras lo que sienten y a inventar ellos mismos la solución. Hagan su propio semáforo de cartulina y pónganlo en un lugar visible.

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#peleasentrehermanos #dibujosanimados #cuentosinfantiles`,
    tags: [
      'peleas entre hermanos',
      'mis hijos pelean',
      'semáforo de la calma',
      'resolver conflictos',
      'hermanos',
      'crianza respetuosa',
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
