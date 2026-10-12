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
];

export const episodeOf = (s: Short) => {
  const ep = EPISODES.find((e) => e.id === s.episode);
  if (!ep) throw new Error(`Short ${s.id}: unknown episode ${s.episode}`);
  return ep;
};
