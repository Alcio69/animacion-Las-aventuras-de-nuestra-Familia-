import type { Episode } from '../../engine/script';

/**
 * Capítulo 44 — ¡No quiero dar un beso! (valor: nuestro cuerpo es nuestro; elegir cómo saludar; respetar el "no").
 * Grandma asks Tini for a kiss; Luna helps them find another greeting (high five). Lio learns to stop tickling when
 * his sister says no. Gentle tone: nobody is "the bad one". Keep characters between x≈400 and x≈1550.
 */
const episode: Episode = {
  id: 'ep44-no-quiero-dar-un-beso',
  number: 44,
  title: '¡No quiero dar un beso!',
  subtitle: 'La abuela le pide un beso a Tini… pero ella no tiene ganas',
  music: 'calm',
  thumb: { bg: 'living', text: '¿UN BESO?', prop: 'heart', hero: ['hija'], exprs: { hija: 'worried' } },
  scenes: [
    {
      bg: 'living',
      cast: {
        hijo: { x: 520, mood: 'happy' },
        hija: { x: 780, mood: 'happy' },
        mama: { x: 1040, mood: 'happy', facing: -1 },
        abuela: { x: 2250, mood: 'love', facing: -1 },
      },
      steps: [
        { sfx: 'doorbell' },
        { do: 'walk', who: 'abuela', to: 1360, dur: 3 },
        { say: 'abuela', text: '¡Mis nietos queridos! ¿Quién le da un besito a su abuela?', expr: 'love', act: 'wave' },
        { do: 'walk', who: 'hijo', to: 1180 },
        { do: 'hug', who: ['hijo', 'abuela'], dur: 1.6 },
        { fx: 'hearts', x: 1270, y: 440, with: true },
        { do: 'walk', who: 'hijo', to: 520 },
        { mood: 'worried', who: 'hija' },
        { say: 'hija', text: 'Es que ahora no tengo ganas de dar un beso.', expr: 'worried', act: 'shrug' },
        { mood: 'sad', who: 'abuela' },
        { say: 'abuela', text: '¿No me quieres dar un beso, Tini?', expr: 'sad' },
      ],
    },
    {
      bg: 'living',
      cast: {
        hija: { x: 640, mood: 'worried' },
        mama: { x: 960, mood: 'love', facing: -1 },
        abuela: { x: 1300, mood: 'sad', facing: -1 },
      },
      steps: [
        { say: 'mama', text: 'Mira, abuela: Tini te quiere muchísimo. Pero cada uno puede elegir cómo saludar.', expr: 'love', act: 'nod' },
        { do: 'turn', who: 'mama' },
        { say: 'mama', text: 'Tienes tres opciones: un abrazo, chocar los cinco, o decirle hola. ¿Cuál eliges?', expr: 'happy', act: 'point' },
        { do: 'think', who: 'hija', dur: 1.4 },
        { fx: 'question', x: 640, y: 470, dur: 1.4, with: true },
        { mood: 'excited', who: 'hija' },
        { say: 'hija', text: '¡Quiero chocar los cinco con la abuela!', expr: 'excited', act: 'cheer' },
        { do: 'walk', who: 'hija', to: 1040 },
        { mood: 'laugh', who: 'abuela' },
        { say: 'abuela', text: '¡Choca esos cinco, mi amor! ¡Me encanta este saludo nuevo!', expr: 'laugh', act: 'cheer' },
        { sfx: 'pop', with: true, delay: 0.6 },
        { fx: 'sparkle', x: 1170, y: 560, with: true, delay: 0.6 },
        { sfx: 'giggle', with: true, delay: 1.2 },
      ],
    },
    {
      bg: 'living',
      cast: {
        hijo: { x: 560, mood: 'laugh' },
        hija: { x: 820, mood: 'laugh' },
        mama: { x: 1120, mood: 'happy', facing: -1 },
        abuela: { x: 1400, mood: 'happy', facing: -1 },
      },
      steps: [
        { title: 'Un ratito después...', dur: 1.6 },
        { do: 'point', who: 'hijo', dur: 1.2 },
        { sfx: 'giggle', with: true },
        { say: 'hija', text: '¡Basta de cosquillas, hermano! Ya no quiero más.', expr: 'worried', act: 'shake' },
        { mood: 'neutral', who: 'hijo' },
        { say: 'hijo', text: 'Está bien, hermanita. Si dices que no, yo paro.', expr: 'happy', act: 'nod' },
        { say: 'mama', text: '¡Muy bien, hijo! Cuando alguien dice que no, lo respetamos.', expr: 'proud', act: 'clap' },
        { say: 'abuela', text: 'Y yo aprendí un saludo nuevo. ¡Choca esos cinco, Lio!', expr: 'laugh', act: 'cheer' },
        { do: 'dance', who: ['hijo', 'hija', 'mama', 'abuela'], dur: 3, expr: 'laugh' },
        { say: 'narrador', text: 'Nuestro cuerpo es nuestro: podemos elegir cómo saludar, y siempre respetamos el no de los demás.', with: true, delay: 0.8 },
      ],
    },
  ],
  youtube: {
    title: '¡No Quiero Dar un Beso! 🙅‍♀️ Elegir Cómo Saludar | Dibujos Animados para Niños en Español',
    description: `¡La abuela vino de visita! 👵💛 Lio corre a darle un beso, pero Tini no tiene ganas… "¿No me quieres dar un beso?", pregunta la abuela. Entonces Luna les explica algo muy importante: cada uno puede elegir cómo saludar. ¿Un abrazo, chocar los cinco o decir hola? ✋ Y después, Lio aprende a parar las cosquillas cuando su hermana dice "no". Un cuento infantil corto sobre el respeto por nuestro cuerpo y el de los demás.

🐶🐱 Las Aventuras de Nuestra Familia: dibujos animados 3D en español para niños de 2 a 8 años. Max (el papá labrador), Luna (la mamá gatita), Lio (10 años) y Tini (7 años) viven historias cortas con valores para ver en familia.

✨ En este capítulo aprendemos:
• Que nuestro cuerpo es nuestro
• Que podemos elegir cómo saludar: un abrazo, chocar los cinco o decir hola
• A respetar cuando alguien dice "no"

👨‍👩‍👧 Para papás y maestras: después del video, pregúntenles a los chicos "¿Cómo te gusta saludar a las personas que quieres?"

📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!

#respeto #dibujosanimados #cuentosinfantiles`,
    tags: [
      'no quiero dar un beso',
      'elegir cómo saludar',
      'respeto por el cuerpo',
      'consentimiento para niños',
      'respetar el no',
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
