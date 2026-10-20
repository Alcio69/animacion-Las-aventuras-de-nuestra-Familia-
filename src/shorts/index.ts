import type { Scene } from '../engine/script';
import { EPISODES } from '../episodes';

/**
 * Vertical Shorts (1080x1920, YouTube Shorts / TikTok / Reels): one strong moment of a chapter, ~30 s.
 * Lines must be copied word for word from the chapter so the voices already exist (same speaker+text = same file).
 * Characters stand closer than in the 16:9 chapter (vertical frame): ~400 px apart.
 */
export type Short = {
  id: string;
  /** Full chapter this moment comes from (end card + "related video" link). */
  episode: string;
  /** Big text on top for the whole Short (the hook). Use \n for a line break. */
  hook: string;
  /**
   * TikTok / Reels version: hook addressed to PARENTS (their audience is adults; kid-looking hooks get the video
   * treated as content for under-13s and it is not shown). Max 2 lines. Rendered as an overlay over the YouTube
   * version → public/shorts/<id>-tiktok.mp4.
   */
  hookParents?: string;
  scenes: Scene[];
};

const COUNTER = 562;
const HAND = 760;

export const SHORTS: Short[] = [
  {
    id: 'short-01-la-palabra-magica',
    episode: 'ep35-las-palabras-magicas',
    hook: '¿Cuál es la\npalabra mágica?',
    scenes: [
      {
        bg: 'kitchen',
        cast: {
          hija: { x: 770, mood: 'neutral' },
          mama: { x: 1170, mood: 'happy', facing: -1 },
        },
        steps: [
          { prop: 'glass', id: 'vaso', x: 990, y: COUNTER },
          { say: 'hija', text: '¡Quiero jugo, mamá! ¡Dámelo ya mismo!', expr: 'angry', act: 'hips' },
          { mood: 'neutral', who: 'mama' },
          { say: 'mama', text: 'Así no me gusta que me pidas las cosas, hija. ¿Cuál es la palabra mágica?', expr: 'wink', act: 'point' },
          { do: 'think', who: 'hija', dur: 1.4 },
          { fx: 'question', x: 770, y: 470, dur: 1.4, with: true },
          { say: 'hija', text: '¿La palabra mágica es abracadabra?', expr: 'surprised', act: 'shrug' },
          { sfx: 'giggle' },
          { mood: 'laugh', who: 'mama', with: true },
          { say: 'mama', text: '¡Casi! La palabra mágica es por favor.', expr: 'laugh', act: 'nod' },
          { say: 'hija', text: 'Mamá, ¿me das un poquito de jugo, por favor?', expr: 'love' },
          { say: 'mama', text: '¡Claro que sí, mi amor! Pedido con tanta dulzura, da gusto.', expr: 'love', act: 'hug' },
          { moveProp: 'vaso', x: 870, y: HAND, dur: 0.8 },
          { fx: 'sparkle', x: 870, y: 640, with: true },
          { sfx: 'sparkle', with: true },
          { say: 'hija', text: '¡Mira, mamá, funcionó! ¡Es una palabra mágica de verdad!', expr: 'excited', act: 'jump' },
        ],
        tail: 0.5,
      },
    ],
  },
  {
    id: 'short-02-yo-no-fui',
    episode: 'ep31-yo-no-fui',
    hook: '¿Quién se comió\nlas galletitas?',
    scenes: [
      {
        bg: 'kitchen',
        cast: { hijo: { x: 760, mood: 'wink' } },
        steps: [
          { prop: 'cookiePlate', id: 'galletas', x: 1080, y: COUNTER, scale: 1.3 },
          { say: 'hijo', text: 'Si me como una sola galletita, nadie se va a dar cuenta.', expr: 'wink', act: 'look' },
          { do: 'walk', who: 'hijo', to: 900 },
          { removeProp: 'galletas' },
          { prop: 'emptyPlate', id: 'plato', x: 1080, y: COUNTER, scale: 1.3, with: true },
          { sfx: 'pop', with: true },
          { say: 'hijo', text: '¡Están riquísimas! Bueno... una más. Y otra más.', expr: 'laugh' },
          { sfx: 'pop', with: true, delay: 0.8 },
          { sfx: 'pop', with: true, delay: 1.4 },
        ],
        tail: 0.4,
      },
      {
        bg: 'kitchen',
        cast: {
          hijo: { x: 640, mood: 'neutral' },
          hija: { x: 940, mood: 'happy' },
          mama: { x: 1280, mood: 'happy', facing: -1 },
        },
        steps: [
          { prop: 'emptyPlate', id: 'plato', x: 960, y: COUNTER, scale: 1.3 },
          { say: 'mama', text: '¡A merendar! Pero... ¿quién se comió todas las galletitas?', expr: 'surprised', act: 'point' },
          { mood: 'worried', who: 'hijo' },
          { fx: 'sweat', x: 640, y: 500, with: true },
          { say: 'hijo', text: '¡Yo no fui! Seguro fue mi hermanita.', expr: 'worried', act: 'shake' },
          { mood: 'surprised', who: 'hija' },
          { say: 'hija', text: '¡No es verdad! ¡Yo no me comí ninguna!', expr: 'sad', act: 'shake' },
          { say: 'mama', text: 'Si fuiste tú, hoy te quedas sin postre, hija.', expr: 'neutral', act: 'hips' },
          { mood: 'sad', who: 'hija' },
          { do: 'tremble', who: 'hija', dur: 1.2 },
          { say: 'hijo', text: 'Mi hermanita está triste por mi culpa. Siento un nudo en la panza.', expr: 'sad' },
        ],
        tail: 0.5,
      },
    ],
  },
  {
    id: 'short-03-me-perdi',
    episode: 'ep30-me-perdi-en-el-supermercado',
    hook: '¿Qué hacer\nsi te pierdes?',
    scenes: [
      {
        bg: 'supermarket',
        cast: {
          hija: { x: 800, mood: 'surprised' },
          sofia: { x: 2250, mood: 'happy', facing: -1 },
        },
        steps: [
          { say: 'hija', text: '¿Dónde estás, mamá? ¡No te puedo ver!', expr: 'worried', act: 'tremble' },
          { fx: 'exclaim', x: 800, y: 480, with: true },
          { say: 'hija', text: 'Mamá me enseñó qué hacer si me pierdo. Primero, quedarme quieta en un lugar.', expr: 'worried', act: 'think' },
          { say: 'hija', text: 'Después, buscar a alguien que trabaje aquí. ¡Esa señora tiene el chaleco del supermercado!', expr: 'happy', act: 'point' },
          { do: 'walk', who: 'sofia', to: 1180 },
          { say: 'hija', text: 'Disculpe, señora. Me perdí. Me llamo Martina y mi mamá se llama Luna.', expr: 'worried' },
          { say: 'sofia', text: 'Hiciste muy bien en quedarte quieta y pedir ayuda, Martina. Vamos a llamar a tu mamá.', expr: 'love', act: 'nod' },
        ],
        tail: 0.4,
      },
      {
        bg: 'supermarket',
        cast: {
          mama: { x: -250, mood: 'worried' },
          hija: { x: 960, mood: 'worried', facing: -1 },
        },
        steps: [
          { do: 'run', who: 'mama', to: 620 },
          { mood: 'love', who: ['mama', 'hija'] },
          { say: 'mama', text: '¡Mi amor! ¡Aquí estás, Tini! ¡Qué susto me di!', expr: 'love', act: 'hug' },
          { do: 'hug', who: 'hija', dur: 2, with: true },
          { fx: 'hearts', x: 790, y: 450, dur: 2, with: true },
        ],
        tail: 0.5,
      },
    ],
  },
  {
    id: 'short-04-quiero-la-tablet',
    episode: 'ep18-quiero-la-tablet',
    hook: '¡No quiero\napagar la tablet!',
    scenes: [
      {
        bg: 'living',
        cast: {
          hijo: { x: 740, mood: 'happy' },
          mama: { x: 1220, mood: 'happy', facing: -1 },
        },
        steps: [
          { prop: 'table', id: 'mesa', x: 960, y: 900 },
          { prop: 'tablet', id: 'tablet', x: 900, y: HAND, with: true },
          { say: 'mama', text: 'Hijo, ya pasaste toda la tarde con la tablet. Es hora de apagarla.', expr: 'happy' },
          { say: 'hijo', text: '¡No! ¡Cinco minutos más, por favor, por favor!', expr: 'worried', act: 'shake' },
          { say: 'mama', text: 'Ya es hora, mi amor. Apágala, por favor.', expr: 'neutral', act: 'point' },
          { mood: 'angry', who: 'hijo' },
          { do: 'jump', who: 'hijo', dur: 0.8 },
          { sfx: 'drum', with: true },
          { fx: 'exclaim', x: 740, y: 480, with: true },
          { say: 'hijo', text: '¡No es justo! ¡Nunca me dejas hacer nada!', expr: 'angry', act: 'tremble' },
          { mood: 'love', who: 'mama' },
          { do: 'walk', who: 'mama', to: 1120 },
          { say: 'mama', text: 'Entiendo que estás enojado. Respira conmigo: aire adentro... y aire afuera.', expr: 'love', act: 'hug' },
          { do: 'nod', who: 'hijo', dur: 1.2 },
          { mood: 'sad', who: 'hijo', with: true },
          { say: 'mama', text: 'Hagamos un trato: mañana usas la tablet hasta que este reloj de arena se termine.', expr: 'happy', act: 'point' },
          { prop: 'timer', id: 'reloj', x: 1020, y: HAND, with: true, delay: 0.6 },
          { sfx: 'ding', with: true, delay: 0.6 },
        ],
        tail: 0.5,
      },
    ],
  },
  {
    id: 'short-05-no-me-gusta-el-brocoli',
    episode: 'ep04-no-me-gusta-el-brocoli',
    hook: '¡No me gusta\nel brócoli!',
    scenes: [
      {
        bg: 'kitchen',
        cast: {
          papa: { x: 580, mood: 'happy' },
          hija: { x: 880, mood: 'happy' },
          mama: { x: 1240, mood: 'happy', facing: -1 },
        },
        steps: [
          { prop: 'plate', id: 'plato', x: 1060, y: COUNTER },
          { say: 'mama', text: '¡A comer! Hoy preparé brócoli.', expr: 'happy', act: 'wave' },
          { say: 'hija', text: '¡No! ¡El brócoli no me gusta!', expr: 'angry', act: 'shake' },
          { mood: 'surprised', who: ['papa', 'mama'], with: true },
          { say: 'mama', text: '¿Alguna vez lo probaste?', expr: 'worried' },
          { say: 'hija', text: 'No. Pero tiene cara de feo.', expr: 'angry', act: 'hips', pause: 0.6 },
          { do: 'think', who: 'papa', dur: 1.4 },
          { fx: 'exclaim', x: 580, y: 330, dur: 1.2, with: true },
          { sfx: 'ding', with: true },
          { say: 'papa', text: '¡Un momento! Estos no son brócolis comunes.', expr: 'excited', act: 'point' },
          { say: 'papa', text: '¡Son árboles mágicos! Los dinosaurios gigantes los comían para ser fuertes.', expr: 'excited', act: 'cheer' },
          { fx: 'sparkle', x: 1060, y: 520, dur: 1.8, with: true },
          { sfx: 'sparkle', with: true },
          { mood: 'surprised', who: 'hija', with: true },
          { say: 'hija', text: 'Bueno, voy a probar un pedacito chiquito.', expr: 'worried' },
          { prop: 'broccoli', id: 'b2', x: 1010, y: COUNTER },
          { moveProp: 'b2', x: 930, y: COUNTER, dur: 0.9, arc: 150 },
          { removeProp: 'b2' },
          { sfx: 'pop', with: true },
          { mood: 'sleepy', who: 'hija' },
          { wait: 0.8 },
          { mood: 'surprised', who: 'hija' },
          { fx: 'exclaim', x: 880, y: 470, dur: 1, with: true },
          { wait: 0.5 },
          { say: 'hija', text: '¡Está riquísimo! ¡Quiero más!', expr: 'love', act: 'jump' },
          { fx: 'hearts', x: 880, y: 480, with: true, delay: 0.3 },
          { sfx: 'tada', with: true },
          { mood: 'laugh', who: ['papa', 'mama'], with: true },
        ],
        tail: 0.6,
      },
    ],
  },
  {
    id: 'short-06-no-quiero-dormir',
    episode: 'ep11-no-quiero-dormir',
    hook: 'Mil excusas\npara no dormir',
    scenes: [
      {
        bg: 'bedroom',
        cast: {
          hija: { x: 780, mood: 'excited' },
          mama: { x: 1180, mood: 'happy', facing: -1 },
        },
        steps: [
          { say: 'mama', text: 'Hija, ya es hora de dormir.', expr: 'love' },
          { say: 'hija', text: '¡Pero no tengo nada de sueño! ¡Quiero jugar un poquito más!', expr: 'excited', act: 'jump' },
          { say: 'mama', text: 'Bueno, pero solo cinco minutos.', expr: 'happy' },
          { say: 'hija', text: 'Mamá, ¡tengo mucha sed! ¿Me traes un vaso de agua?', expr: 'worried' },
          { prop: 'glass', id: 'vaso', x: 890, y: HAND },
          { sfx: 'pop', with: true },
          { say: 'hija', text: 'Mamá, ¡quiero otro cuento! ¡Uno más, por favor!', expr: 'excited', act: 'cheer' },
          { removeProp: 'vaso' },
          { prop: 'book', id: 'cuento', x: 1070, y: HAND, with: true },
          { sfx: 'pop', with: true },
          { mood: 'sleepy', who: 'mama' },
          { removeProp: 'cuento', delay: 1 },
          { mood: 'worried', who: 'hija' },
          { say: 'hija', text: 'Mamá, ¡creo que hay un monstruo en el armario!', expr: 'worried', act: 'tremble' },
          { fx: 'exclaim', x: 780, y: 420, dur: 1.2, with: true },
          { sfx: 'drum', with: true, delay: 0.3 },
          { mood: 'happy', who: 'mama' },
          { say: 'mama', text: 'Vamos a mirar juntas con la linterna.', expr: 'happy', act: 'point' },
          { prop: 'flashlight', id: 'linterna', x: 1080, y: HAND, with: true },
          { wait: 0.4 },
          { prop: 'teddy', id: 'osito', x: 980, y: 960 },
          { sfx: 'sparkle', with: true },
          { say: 'mama', text: '¡Mira! No era un monstruo. ¡Era tu osito!', expr: 'laugh' },
          { sfx: 'giggle', with: true, delay: 1 },
          { mood: 'laugh', who: 'hija', with: true, delay: 1 },
        ],
        tail: 0.6,
      },
    ],
  },
  {
    id: 'short-07-quiero-ganar-siempre',
    episode: 'ep13-quiero-ganar-siempre',
    hook: '¡Quiero ganar\nsiempre!',
    hookParents: '¿Tu hijo\nno sabe perder?',
    scenes: [
      {
        bg: 'park',
        cast: {
          hijo: { x: 700, mood: 'excited' },
          hija: { x: 960, mood: 'excited' },
        },
        steps: [
          { prop: 'tree', id: 'meta', x: 1500, y: 880 },
          { say: 'hija', text: '¡Hagamos una carrera hasta el árbol!', expr: 'excited', act: 'point' },
          { say: 'papa', text: '¡En sus marcas, listos... ya!', expr: 'excited' },
          { sfx: 'whoosh', with: true, delay: 1.8 },
          { do: 'run', who: 'hijo', to: 1330, dur: 1.4, with: true, delay: 1.8 },
          { do: 'run', who: 'hija', to: 1090, dur: 1.9, with: true, delay: 1.8 },
          { wait: 0.4 },
          { say: 'hijo', text: '¡Llegué primero! ¡Gané la carrera!', expr: 'laugh', act: 'cheer' },
          { mood: 'angry', who: 'hija' },
          { say: 'hija', text: '¡No vale! ¡Eso fue trampa! ¡No juego más!', expr: 'angry', act: 'shake' },
          { mood: 'surprised', who: 'hijo', with: true },
        ],
        tail: 0.4,
      },
      {
        bg: 'park',
        cast: {
          hija: { x: 780, mood: 'angry' },
          papa: { x: 1180, mood: 'love', facing: -1 },
        },
        steps: [
          { say: 'papa', text: '¿Sabes un secreto? Cuando yo era chiquito, también me enojaba cuando perdía.', expr: 'love' },
          { mood: 'surprised', who: 'hija' },
          { say: 'hija', text: '¿En serio, papá? ¿Tú también?', expr: 'surprised' },
          { say: 'papa', text: 'Así es. Pero aprendí algo muy importante: lo más lindo no es ganar, es divertirse jugando.', expr: 'proud', act: 'hips' },
          { mood: 'happy', who: 'hija' },
          { say: 'hija', text: 'Tienes razón. ¡Voy a felicitar a mi hermano!', expr: 'happy', act: 'nod' },
          { fx: 'hearts', x: 780, y: 470, with: true, delay: 0.5 },
        ],
        tail: 0.5,
      },
    ],
  },
  {
    id: 'short-08-ya-no-soy-tu-amiga',
    episode: 'ep39-ya-no-soy-tu-amiga',
    hook: '¡Ya no soy\ntu amiga!',
    hookParents: '¿Tus hijos se\npelean al jugar?',
    scenes: [
      {
        bg: 'park',
        cast: {
          renu: { x: 650, mood: 'happy' },
          hija: { x: 900, mood: 'happy' },
          lari: { x: 1150, mood: 'happy', facing: -1 },
        },
        steps: [
          { prop: 'ball', id: 'pelota', x: 775, y: 960 },
          { say: 'renu', text: '¡Juguemos a la pelota! Es el juego más divertido del mundo.', expr: 'excited', act: 'point' },
          { say: 'lari', text: '¡No, mejor juguemos a la mamá y el bebé! Yo quiero ser la mamá.', expr: 'happy', act: 'wave' },
          { mood: 'angry', who: 'renu' },
          { say: 'renu', text: '¡Ese juego es aburrido! Siempre quieres jugar a lo mismo.', expr: 'angry', act: 'hips' },
          { mood: 'angry', who: 'lari' },
          { say: 'lari', text: '¡Y tú siempre quieres mandar! ¡Ya no soy tu amiga!', expr: 'angry', act: 'shake' },
          { sfx: 'drum', with: true, delay: 0.4 },
          { mood: 'worried', who: 'hija' },
          { fx: 'sweat', x: 900, y: 500, with: true },
          { say: 'hija', text: '¡Esperen, chicas! No hace falta pelearse.', expr: 'worried', act: 'wave' },
          { mood: 'surprised', who: ['renu', 'lari'] },
          { say: 'hija', text: 'Cuando pensamos distinto, podemos conversar y buscar una idea para las tres.', expr: 'happy', act: 'nod' },
          { sfx: 'ding' },
          { mood: 'excited', who: 'hija', with: true },
          { say: 'hija', text: '¡Ya sé! Un juego con las dos cosas: la mamá lleva a su bebé a jugar a la pelota.', expr: 'excited', act: 'cheer' },
          { mood: 'happy', who: ['renu', 'lari'] },
          { say: 'renu', text: '¡Qué buena idea! Así jugamos todas juntas.', expr: 'happy', act: 'clap' },
          { fx: 'hearts', x: 900, y: 470, with: true },
        ],
        tail: 0.5,
      },
    ],
  },
  {
    id: 'short-09-mama-mama-mama',
    episode: 'ep40-mama-mama-mama',
    hook: '¡Mamá, mamá,\nmamá!',
    hookParents: 'El truco para que\nno te interrumpa',
    scenes: [
      {
        bg: 'living',
        cast: {
          hijo: { x: -250, mood: 'excited' },
          mama: { x: 920, mood: 'happy' },
          abuela: { x: 1220, mood: 'happy', facing: -1 },
        },
        steps: [
          { say: 'abuela', text: 'Y entonces tu papá se subió al árbol más alto del jardín...', expr: 'happy', act: 'point' },
          { do: 'run', who: 'hijo', to: 640, with: true, delay: 1.2 },
          { say: 'hijo', text: '¡Vengan a ver lo que hice! ¡Mamá, mamá, mamá!', expr: 'excited', act: 'jump' },
          { do: 'turn', who: 'mama' },
          { say: 'mama', text: 'Un momentito, hijo. Estoy hablando con la abuela.', expr: 'happy' },
          { do: 'turn', who: 'mama' },
          { say: 'hijo', text: '¡Escúchame, mamá! ¡Es muy, muy importante!', expr: 'worried', act: 'tremble' },
          { mood: 'surprised', who: 'abuela' },
          { fx: 'question', x: 1220, y: 420, dur: 1.4, with: true },
          { say: 'abuela', text: '¡No puede ser! Me olvidé lo que estaba contando.', expr: 'surprised', act: 'shrug' },
          { sfx: 'giggle', with: true, delay: 1 },
        ],
        tail: 0.4,
      },
      {
        bg: 'living',
        cast: {
          hijo: { x: 760, mood: 'sad' },
          mama: { x: 1160, mood: 'love', facing: -1 },
        },
        steps: [
          { say: 'mama', text: 'Te voy a enseñar un truco que se llama la mano mágica.', expr: 'wink', act: 'wave' },
          { fx: 'sparkle', x: 960, y: 560, with: true },
          { sfx: 'sparkle', with: true },
          { mood: 'surprised', who: 'hijo' },
          { say: 'mama', text: 'Cuando quieras decirme algo y yo esté hablando, apoya tu mano en mi brazo, y espera.', expr: 'happy', act: 'point' },
          { say: 'mama', text: 'Yo pongo mi mano sobre la tuya. Eso quiere decir: ya te vi, y en un ratito te escucho.', expr: 'love', act: 'hug' },
          { mood: 'happy', who: 'hijo' },
        ],
        tail: 0.5,
      },
    ],
  },
];

export const episodeOf = (s: Short) => {
  const ep = EPISODES.find((e) => e.id === s.episode);
  if (!ep) throw new Error(`Short ${s.id}: unknown episode ${s.episode}`);
  return ep;
};
