/**
 * Episode script format (the only thing you edit to make a new chapter).
 *
 * A scene is a list of STEPS that run one after another.
 * Add `with: true` to a step to run it at the same time as the previous one
 * (e.g. Hija jumps while Papá talks). `delay` shifts it a bit.
 *
 * This file must stay type-only (no JSX, no runtime imports) so Node can read
 * the scripts directly to generate voices.
 */
import type { CharId, Expression } from '../characters/types';

export type Speaker = CharId | 'narrador';
export type Background = 'living' | 'kitchen' | 'park' | 'bedroom' | 'dentist' | 'school' | 'beach';
export type Action =
  | 'walk' // move to `to` (x in px, 0..1920) — sets facing automatically
  | 'run' // like walk, faster legs
  | 'jump'
  | 'wave'
  | 'cheer' // both arms up, bouncing
  | 'dance'
  | 'clap'
  | 'think' // paw on chin, looking up
  | 'point' // point towards facing direction
  | 'shrug'
  | 'hug' // open arms
  | 'hips' // paws on hips (proud/annoyed)
  | 'nod'
  | 'shake' // shake head "no"
  | 'tremble' // scared shake
  | 'sneeze'
  | 'turn' // flip facing
  | 'look' // set gaze: `look` value -1..1
  | 'hide'
  | 'show'
  | 'fall'; // tip over (e.g. off a bike) and get back up

export type PropKind = 'table' | 'cake' | 'bowl' | 'flour' | 'ball' | 'balloon' | 'gift' | 'book' | 'star' | 'heart' | 'cookie' | 'plant' | 'plate' | 'broccoli' | 'teddy' | 'flashlight' | 'toothbrush'
  | 'toybox' | 'block' | 'car' | 'vase' | 'vaseBroken' | 'vaseFixed' | 'drawing' | 'tree' | 'glass'
  | 'pumpkin' | 'candy' | 'tablet' | 'timer' | 'xmasTree' | 'letter'
  | 'baby' | 'crib' | 'suitcase' | 'sandcastle' | 'umbrella';
export type Fx = 'hearts' | 'stars' | 'confetti' | 'flour' | 'sparkle' | 'zzz' | 'question' | 'exclaim' | 'sweat';
export type Sfx = 'pop' | 'boing' | 'whoosh' | 'ding' | 'sparkle' | 'poof' | 'tada' | 'drum' | 'doorbell' | 'giggle' | 'thunder' | 'crash';

export type Costume = 'ghost' | 'witch' | 'pumpkin' | 'santa';

export type Step =
  | {
      /** Speech line: voice + subtitles + lip sync. */
      say: Speaker;
      text: string;
      expr?: Expression;
      /** Optional body action performed while talking. */
      act?: Action;
      with?: boolean;
      delay?: number;
      /** Extra pause after the line, seconds (default 0.25). */
      pause?: number;
    }
  | {
      do: Action;
      who: CharId | CharId[];
      /** Seconds (defaults depend on the action). */
      dur?: number;
      /** walk/run target x. */
      to?: number;
      /** look target -1..1 */
      look?: number;
      expr?: Expression;
      with?: boolean;
      delay?: number;
    }
  | { mood: Expression; who: CharId | CharId[]; with?: boolean; delay?: number }
  /** Put on / take off a costume (instant: pair it with fx 'sparkle' + sfx 'poof'). */
  | { costume: Costume | 'none'; who: CharId | CharId[]; with?: boolean; delay?: number }
  | { wait: number }
  | { prop: PropKind; id?: string; x: number; y: number; scale?: number; with?: boolean; delay?: number }
  | { removeProp: string; with?: boolean; delay?: number }
  /** Move a prop to (x, y) in `dur` seconds; `arc` = jump height in px (a thrown/bouncing ball), `bounces` extra hops. */
  | { moveProp: string; x: number; y: number; dur?: number; arc?: number; bounces?: number; with?: boolean; delay?: number }
  | { fx: Fx; x: number; y: number; dur?: number; with?: boolean; delay?: number }
  | { sfx: Sfx; with?: boolean; delay?: number }
  | { title: string; dur?: number; with?: boolean; delay?: number };

export type CastEntry = {
  x: number;
  /** Floor y (default 930). */
  y?: number;
  facing?: 1 | -1;
  mood?: Expression;
  scale?: number;
  hidden?: boolean;
  /** Character rides/sits in something for the whole scene. */
  vehicle?: 'wheelchair' | 'bike';
  /** Costume worn from the start of the scene. */
  costume?: Costume;
};

export type Scene = {
  bg: Background;
  /** Background variant: park 'sunset'; living 'rain' | 'rainbow'; bedroom 'day'. */
  variant?: string;
  cast: Partial<Record<CharId, CastEntry>>;
  steps: Step[];
  /** Camera zoom at start and end of scene (default [1, 1.04]). */
  zoom?: [number, number];
  /** Camera focus x at start and end (default center 960). */
  focus?: [number, number];
  /** Looping background sound for the whole scene. */
  ambience?: 'rain';
  /** Extra seconds at the end of the scene (default 0.8). */
  tail?: number;
  /** A memory: warm sepia tone over the whole scene. */
  flashback?: boolean;
};

export type Episode = {
  id: string;
  number: number;
  title: string;
  /** Short line shown under the title card. */
  subtitle?: string;
  scenes: Scene[];
  music?: 'happy' | 'calm' | 'adventure';
  /** YouTube thumbnail (1280x720). Big short text sells clicks: 2-4 words. */
  /** `cast` = who appears (default: the 4 family members), e.g. ['hijo', 'abuela', 'hija']. */
  thumb?: { bg?: Background; variant?: string; text?: string; prop?: PropKind; exprs?: Partial<Record<CharId, Expression>>; cast?: CharId[]; costumes?: Partial<Record<CharId, Costume>> };
  youtube: {
    title: string;
    description: string;
    tags: string[];
  };
};
