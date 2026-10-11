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
];

export const episodeOf = (s: Short) => {
  const ep = EPISODES.find((e) => e.id === s.episode);
  if (!ep) throw new Error(`Short ${s.id}: unknown episode ${s.episode}`);
  return ep;
};
