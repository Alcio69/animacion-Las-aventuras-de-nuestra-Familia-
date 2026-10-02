import type { CharId, Expression } from '../characters/types';
import voices from '../voices.json';
import { voiceKey } from './hash';
import type { Action, Episode, Fx, PropKind, Scene, Sfx, Speaker } from './script';

export const FPS = 30;
export const INTRO_SEC = 3.6;
export const OUTRO_SEC = 5;

type VoiceInfo = { d: number; a: number[] };
const VOICES = voices as Record<string, VoiceInfo>;

export const voiceInfo = (speaker: Speaker, text: string): (VoiceInfo & { key: string }) | null => {
  const key = voiceKey(speaker, text);
  const v = VOICES[key];
  return v ? { ...v, key } : null;
};

export type ActEv = { kind: 'act'; who: CharId; action: Action; t0: number; t1: number; to?: number; look?: number; expr?: Expression };
export type MoodEv = { kind: 'mood'; who: CharId; t0: number; mood: Expression };
export type LineEv = { kind: 'line'; who: Speaker; text: string; t0: number; t1: number; voiceEnd: number; expr?: Expression; key: string; hasVoice: boolean };
export type PropEv = { kind: 'prop'; prop: PropKind; id: string; x: number; y: number; scale: number; t0: number; t1: number };
export type FxEv = { kind: 'fx'; fx: Fx; x: number; y: number; t0: number; t1: number };
export type SfxEv = { kind: 'sfx'; sfx: Sfx; t0: number };
export type TitleEv = { kind: 'title'; text: string; t0: number; t1: number };
export type Ev = ActEv | MoodEv | LineEv | PropEv | FxEv | SfxEv | TitleEv;

export type CompiledScene = { scene: Scene; index: number; start: number; dur: number; events: Ev[] };
export type CompiledEpisode = { ep: Episode; scenes: CompiledScene[]; totalSec: number; totalFrames: number };

const DEFAULT_DUR: Record<Action, number> = {
  walk: 1.5,
  run: 0.9,
  jump: 0.85,
  wave: 1.6,
  cheer: 1.6,
  dance: 2.6,
  clap: 1.4,
  think: 1.8,
  point: 1.3,
  shrug: 1.1,
  hug: 1.6,
  hips: 1.6,
  nod: 0.8,
  shake: 1.0,
  tremble: 1.4,
  sneeze: 1.4,
  turn: 0.25,
  look: 0.3,
  hide: 0.4,
  show: 0.4,
};

/** Rough speaking time when a voice file hasn't been generated yet. */
const estimateSpeech = (text: string) => 0.5 + text.length * 0.062;

const asList = (w: CharId | CharId[]) => (Array.isArray(w) ? w : [w]);

export const compileScene = (scene: Scene, index: number, start: number): CompiledScene => {
  const events: Ev[] = [];
  let cursor = 0.35; // small breath after the iris-in
  let prevStart = cursor;
  const xs: Partial<Record<CharId, number>> = {};
  for (const [id, c] of Object.entries(scene.cast)) xs[id as CharId] = c!.x;
  let propN = 0;
  const openProps: Record<string, PropEv> = {};

  for (const step of scene.steps) {
    if ('wait' in step) {
      cursor += step.wait;
      prevStart = cursor;
      continue;
    }
    const parallel = 'with' in step && step.with;
    const delay = ('delay' in step && step.delay) || 0;
    const t0 = (parallel ? prevStart : cursor) + delay;
    let dur = 0;

    if ('say' in step) {
      const v = voiceInfo(step.say, step.text);
      const speak = v ? v.d : estimateSpeech(step.text);
      dur = speak + (step.pause ?? 0.35);
      events.push({ kind: 'line', who: step.say, text: step.text, t0, t1: t0 + dur, voiceEnd: t0 + speak, expr: step.expr, key: voiceKey(step.say, step.text), hasVoice: !!v });
      if (step.act && step.say !== 'narrador') {
        events.push({ kind: 'act', who: step.say, action: step.act, t0, t1: t0 + Math.max(speak, DEFAULT_DUR[step.act]) });
      }
    } else if ('do' in step) {
      for (const who of asList(step.who)) {
        let d = step.dur ?? DEFAULT_DUR[step.do];
        if ((step.do === 'walk' || step.do === 'run') && step.to !== undefined && step.dur === undefined) {
          const dist = Math.abs(step.to - (xs[who] ?? 960));
          d = Math.max(0.6, dist / (step.do === 'walk' ? 360 : 820));
        }
        if (step.to !== undefined) xs[who] = step.to;
        events.push({ kind: 'act', who, action: step.do, t0, t1: t0 + d, to: step.to, look: step.look, expr: step.expr });
        dur = Math.max(dur, d);
      }
    } else if ('mood' in step) {
      for (const who of asList(step.who)) events.push({ kind: 'mood', who, t0, mood: step.mood });
    } else if ('prop' in step) {
      const id = step.id ?? `p${propN++}`;
      const ev: PropEv = { kind: 'prop', prop: step.prop, id, x: step.x, y: step.y, scale: step.scale ?? 1, t0, t1: Infinity };
      openProps[id] = ev;
      events.push(ev);
      dur = 0.3;
    } else if ('removeProp' in step) {
      if (openProps[step.removeProp]) openProps[step.removeProp].t1 = t0;
      dur = 0.3;
    } else if ('fx' in step) {
      const d = step.dur ?? 1.6;
      events.push({ kind: 'fx', fx: step.fx, x: step.x, y: step.y, t0, t1: t0 + d });
      dur = 0.2;
    } else if ('sfx' in step) {
      events.push({ kind: 'sfx', sfx: step.sfx, t0 });
    } else if ('title' in step) {
      const d = step.dur ?? 2;
      events.push({ kind: 'title', text: step.title, t0, t1: t0 + d });
      dur = d;
    }

    if (!parallel) {
      prevStart = t0;
      cursor = t0 + dur;
    }
  }

  let end = cursor;
  for (const e of events) if ('t1' in e && Number.isFinite(e.t1)) end = Math.max(end, e.t1);
  const dur = end + (scene.tail ?? 0.8);
  for (const p of Object.values(openProps)) if (!Number.isFinite(p.t1)) p.t1 = dur + 1;
  return { scene, index, start, dur, events };
};

export const compileEpisode = (ep: Episode): CompiledEpisode => {
  let t = INTRO_SEC;
  const scenes = ep.scenes.map((s, i) => {
    const c = compileScene(s, i, t);
    t += c.dur;
    return c;
  });
  const totalSec = t + OUTRO_SEC;
  return { ep, scenes, totalSec, totalFrames: Math.ceil(totalSec * FPS) };
};
