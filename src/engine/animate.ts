import { DESIGNS } from '../characters/design';
import { restPose, type Arm, type CharId, type Pose } from '../characters/types';
import type { ActEv, CompiledScene, LineEv } from './timeline';
import { FPS, voiceInfo } from './timeline';

export type CharState = { pose: Pose; x: number; y: number; facing: 1 | -1; scale: number; visible: number };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeInOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const lerpArm = (a: Arm, b: Arm, k: number): Arm => ({ up: lerp(a.up, b.up, k), bend: lerp(a.bend, b.bend, k) });
const PHASE: Record<CharId, number> = { papa: 0, mama: 1.7, hijo: 3.1, hija: 4.4 };

/** Envelope that eases an action in and out (0..1). */
const env = (t: number, e: ActEv, ramp = 0.18) => clamp(Math.min((t - e.t0) / ramp, (e.t1 - t) / ramp));

export const solveCharacter = (cs: CompiledScene, id: CharId, t: number): CharState | null => {
  const cast = cs.scene.cast[id];
  if (!cast) return null;
  const d = DESIGNS[id];
  const ph = PHASE[id];
  const pose = restPose(t);
  let x = cast.x;
  const y = cast.y ?? 930;
  let facing: 1 | -1 = cast.facing ?? 1;
  let mood = cast.mood ?? 'happy';
  let look = 0;
  let visible = cast.hidden ? 0 : 1;

  // ---- persistent state from past events ----
  const acts: ActEv[] = [];
  for (const e of cs.events) {
    if (e.kind === 'mood' && e.who === id && e.t0 <= t) mood = e.mood;
    if (e.kind !== 'act' || e.who !== id || e.t0 > t) continue;
    const k = clamp((t - e.t0) / (e.t1 - e.t0));
    if ((e.action === 'walk' || e.action === 'run') && e.to !== undefined) {
      const from = x;
      x = lerp(from, e.to, e.action === 'run' ? k : easeInOut(k) * 0.3 + k * 0.7);
      if (e.to !== from) facing = e.to > from ? 1 : -1;
    }
    if (e.action === 'turn' && t >= e.t0) facing = facing === 1 ? -1 : 1;
    if (e.action === 'look' && e.look !== undefined) look = e.look;
    if (e.action === 'hide') visible = 1 - k;
    if (e.action === 'show') visible = k;
    if (t < e.t1) acts.push(e);
  }
  pose.expr = mood;
  pose.lookX = look;

  // ---- idle life ----
  pose.bob = Math.sin(t * 2.3 + ph) * 2.2;
  const blinkCycle = (t + ph * 0.7) % 3.4;
  pose.blink = blinkCycle < 0.14 ? Math.sin((blinkCycle / 0.14) * Math.PI) : 0;
  pose.armL = { up: 8 + Math.sin(t * 2.3 + ph) * 2, bend: 12 };
  pose.armR = { up: 8 + Math.sin(t * 2.3 + ph + 0.5) * 2, bend: 12 };
  pose.wag = 0.35;

  // ---- dialogue: speaker lip-sync, listeners look at the speaker ----
  const line = cs.events.find((e): e is LineEv => e.kind === 'line' && e.t0 <= t && t < e.t1 && e.who !== 'narrador');
  if (line) {
    if (line.who === id) {
      const lt = t - line.t0;
      if (line.expr) pose.expr = line.expr;
      if (t < line.voiceEnd) {
        const v = voiceInfo(line.who, line.text);
        if (v) {
          const i = Math.floor(lt * FPS);
          const a = v.a[i] ?? 0;
          pose.mouth = clamp(a * 1.25);
        } else {
          pose.mouth = 0.25 + 0.35 * Math.abs(Math.sin(lt * 11)) * (Math.sin(lt * 3.3) > -0.6 ? 1 : 0);
        }
        pose.headTilt = Math.sin(lt * 4.2) * 3;
        pose.bob += Math.sin(lt * 8) * 1.5;
        pose.wag = 0.8;
      }
    } else if (line.who in cs.scene.cast) {
      const sx = solveX(cs, line.who as CharId, t);
      if (sx !== null && look === 0) {
        const dir = Math.sign(sx - x) * facing;
        pose.lookX = dir * 0.6;
        pose.headTilt = dir * 3;
      }
    }
  }

  // ---- active actions ----
  for (const e of acts) {
    const lt = t - e.t0;
    const k = clamp(lt / (e.t1 - e.t0));
    const w = env(t, e);
    if (e.expr) pose.expr = e.expr;
    switch (e.action) {
      case 'walk':
      case 'run': {
        const speed = e.action === 'run' ? 16 : 10;
        const amp = e.action === 'run' ? 32 : 22;
        const s = Math.sin(lt * speed);
        const ww = env(t, e, 0.12);
        pose.legL = s * amp * ww;
        pose.legR = -s * amp * ww;
        pose.armL = lerpArm(pose.armL, { up: 12 - s * amp * 0.8, bend: 20 }, ww);
        pose.armR = lerpArm(pose.armR, { up: 12 + s * amp * 0.8, bend: 20 }, ww);
        pose.bob += -Math.abs(Math.cos(lt * speed)) * (e.action === 'run' ? 10 : 6) * ww;
        pose.bodyTilt = (e.action === 'run' ? 7 : 2) * ww * facing;
        pose.wag = 1;
        break;
      }
      case 'jump': {
        const h = 150 * (d.headR / 96);
        if (k < 0.2) pose.squash = 1 - Math.sin((k / 0.2) * Math.PI) * 0.12;
        else if (k < 0.85) {
          const q = (k - 0.2) / 0.65;
          pose.lift = Math.sin(q * Math.PI) * h;
          pose.squash = 1 + Math.sin(q * Math.PI) * 0.06;
          pose.armL = { up: 150, bend: 20 };
          pose.armR = { up: 150, bend: 20 };
          pose.legL = -12;
          pose.legR = 12;
        } else pose.squash = 1 - Math.sin(((k - 0.85) / 0.15) * Math.PI) * 0.1;
        pose.wag = 1.4;
        break;
      }
      case 'wave': {
        pose.armR = lerpArm(pose.armR, { up: 122, bend: 25 + Math.sin(lt * 13) * 28 }, w);
        pose.headTilt += 5 * w;
        break;
      }
      case 'cheer': {
        const b = Math.abs(Math.sin(lt * 7.5));
        pose.armL = lerpArm(pose.armL, { up: 145 + b * 15, bend: 15 }, w);
        pose.armR = lerpArm(pose.armR, { up: 145 + b * 15, bend: 15 }, w);
        pose.lift += b * 28 * w;
        pose.wag = 1.5;
        break;
      }
      case 'dance': {
        const s = Math.sin(lt * 7);
        pose.armL = lerpArm(pose.armL, { up: 90 + s * 50, bend: 40 }, w);
        pose.armR = lerpArm(pose.armR, { up: 90 - s * 50, bend: 40 }, w);
        pose.bodyTilt += s * 7 * w;
        pose.legL = Math.max(0, s) * 18 * w;
        pose.legR = Math.min(0, s) * 18 * w;
        pose.bob += -Math.abs(Math.cos(lt * 7)) * 10 * w;
        pose.headTilt += -s * 6 * w;
        pose.wag = 1.5;
        break;
      }
      case 'clap': {
        const c = Math.sin(lt * 16);
        pose.armL = lerpArm(pose.armL, { up: 38, bend: -98 + c * 14 }, w);
        pose.armR = lerpArm(pose.armR, { up: 38, bend: -98 + c * 14 }, w);
        break;
      }
      case 'think': {
        pose.armR = lerpArm(pose.armR, { up: 22, bend: -150 }, w);
        pose.armL = lerpArm(pose.armL, { up: 30, bend: -95 }, w);
        pose.lookX = lerp(pose.lookX, 0.6, w);
        pose.lookY = lerp(pose.lookY, -0.7, w);
        pose.headTilt += 8 * w;
        break;
      }
      case 'point': {
        pose.armR = lerpArm(pose.armR, { up: 88, bend: 4 }, w);
        pose.lookX = lerp(pose.lookX, 0.8, w);
        break;
      }
      case 'shrug': {
        pose.armL = lerpArm(pose.armL, { up: 35, bend: 75 }, w);
        pose.armR = lerpArm(pose.armR, { up: 35, bend: 75 }, w);
        pose.bob -= 6 * w;
        pose.headTilt += 8 * w;
        break;
      }
      case 'hug': {
        pose.armL = lerpArm(pose.armL, { up: 72, bend: 35 }, w);
        pose.armR = lerpArm(pose.armR, { up: 72, bend: 35 }, w);
        break;
      }
      case 'hips': {
        pose.armL = lerpArm(pose.armL, { up: 38, bend: -112 }, w);
        pose.armR = lerpArm(pose.armR, { up: 38, bend: -112 }, w);
        break;
      }
      case 'nod': {
        pose.lookY = Math.sin(lt * 14) * 0.7 * w;
        pose.headTilt += Math.sin(lt * 14) * 2 * w;
        break;
      }
      case 'shake': {
        pose.lookX = Math.sin(lt * 15) * 0.9 * w;
        pose.headTilt += Math.sin(lt * 15) * 4 * w;
        break;
      }
      case 'tremble': {
        x += Math.sin(lt * 70) * 3 * w;
        pose.armL = lerpArm(pose.armL, { up: 30, bend: -120 }, w);
        pose.armR = lerpArm(pose.armR, { up: 30, bend: -120 }, w);
        break;
      }
      case 'sneeze': {
        if (k < 0.6) {
          pose.headTilt -= 10 * (k / 0.6);
          pose.squash = 1 + 0.05 * (k / 0.6);
          pose.mouth = 0.3 * (k / 0.6);
          pose.expr = 'sleepy';
        } else {
          const q = (k - 0.6) / 0.4;
          pose.headTilt += 12 * Math.sin(q * Math.PI);
          pose.squash = 1 - 0.1 * Math.sin(q * Math.PI);
          pose.expr = 'surprised';
          pose.mouth = 0.8 * (1 - q);
        }
        break;
      }
      default:
        break;
    }
  }

  return { pose, x, y, facing, scale: cast.scale ?? 1, visible };
};

/** Lightweight x lookup (used to make listeners look at the speaker). */
const solveX = (cs: CompiledScene, id: CharId, t: number): number | null => {
  const cast = cs.scene.cast[id];
  if (!cast) return null;
  let x = cast.x;
  for (const e of cs.events) {
    if (e.kind !== 'act' || e.who !== id || e.t0 > t) continue;
    if ((e.action === 'walk' || e.action === 'run') && e.to !== undefined) {
      const k = clamp((t - e.t0) / (e.t1 - e.t0));
      x = lerp(x, e.to, k);
    }
  }
  return x;
};
