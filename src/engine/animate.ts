import { DESIGNS } from '../characters/design';
import { restPose, type Arm, type CharId, type Expression, type Pose } from '../characters/types';
import type { ActEv, CompiledScene, LineEv } from './timeline';
import { FPS, voiceInfo } from './timeline';

/**
 * Natural motion engine.
 *
 * 1. `targetPose` says where every body part WANTS to be at time t (actions, idle, talk).
 * 2. `solveCharacter` runs those targets through spring-like filters, sampled over the
 *    last frames, so nothing snaps: weight lags, heads follow the body a bit later,
 *    eyes dart quickly, arms overshoot and settle. Deterministic per frame (render-safe).
 */
export type CharState = { pose: Pose; x: number; y: number; facing: 1 | -1; scale: number; visible: number };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const smooth = (k: number) => k * k * (3 - 2 * k);
const easeOutBack = (k: number) => {
  const c = 1.9;
  return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
};
const lerpArm = (a: Arm, b: Arm, k: number): Arm => ({ up: lerp(a.up, b.up, k), bend: lerp(a.bend, b.bend, k) });
const SEED_FIXED: Partial<Record<CharId, number>> = { papa: 11, mama: 23, hijo: 37, hija: 53, dentista: 67, lola: 79 };
const SEED = new Proxy(SEED_FIXED as Record<CharId, number>, {
  get: (o, k: string) => o[k as CharId] ?? [...k].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 997, 7),
});

/** Smooth 1D value noise in [-1, 1]. */
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};
export const noise = (t: number, seed: number) => {
  const i = Math.floor(t);
  const f = t - i;
  return lerp(hash(i + seed * 17), hash(i + 1 + seed * 17), smooth(f));
};
/** Piecewise-constant random value (for eye darts), changes every ~period seconds. */
const stepNoise = (t: number, seed: number, period: number) => hash(Math.floor(t / period + hash(seed) * 0.5) + seed * 31);

/** Action envelope: eases in with a little overshoot, eases out smoothly. */
const env = (t: number, e: ActEv, rampIn = 0.28, rampOut = 0.3) => {
  const a = clamp((t - e.t0) / rampIn);
  const b = clamp((e.t1 - t) / rampOut);
  return Math.min(easeOutBack(a), smooth(b));
};

type Raw = { pose: Pose; x: number; y: number; scale: number; visible: number; speaking: boolean };

const walkX = (from: number, e: ActEv, t: number) => {
  // ease-in/ease-out travel: accelerate, cruise, decelerate (no sliding starts)
  const k = clamp((t - e.t0) / (e.t1 - e.t0));
  const ramp = Math.min(0.25, 0.35 / Math.max(0.6, e.t1 - e.t0));
  let p: number;
  if (k < ramp) p = (k * k) / (2 * ramp * (1 - ramp));
  else if (k > 1 - ramp) p = 1 - ((1 - k) * (1 - k)) / (2 * ramp * (1 - ramp));
  else p = (k - ramp / 2) / (1 - ramp);
  return lerp(from, e.to!, p);
};

const xAt = (cs: CompiledScene, id: CharId, t: number): number | null => {
  const cast = cs.scene.cast[id];
  if (!cast) return null;
  let x = cast.x;
  for (const e of cs.events) {
    if (e.kind !== 'act' || e.who !== id || e.t0 > t) continue;
    if ((e.action === 'walk' || e.action === 'run') && e.to !== undefined) x = walkX(x, e, t);
  }
  return x;
};

const COSTUMES = ['ghost', 'witch', 'pumpkin', 'santa'];

/** Where the character wants to be at time t (before smoothing). */
export const targetPose = (cs: CompiledScene, id: CharId, t: number): Raw | null => {
  const cast = cs.scene.cast[id];
  if (!cast) return null;
  const d = DESIGNS[id];
  const sd = SEED[id];
  const pose = restPose(t);
  let x = cast.x;
  const y = cast.y ?? 930;
  let facing: 1 | -1 = cast.facing ?? 1;
  let mood: Expression = cast.mood ?? 'happy';
  let costume: string = cast.costume ?? 'none';
  let look: number | null = null;
  let visible = cast.hidden ? 0 : 1;

  const acts: ActEv[] = [];
  for (const e of cs.events) {
    if (e.kind === 'mood' && e.who === id && e.t0 <= t) mood = e.mood;
    if (e.kind === 'costume' && e.who === id && e.t0 <= t) costume = e.costume;
    if (e.kind !== 'act' || e.who !== id || e.t0 > t) continue;
    const k = clamp((t - e.t0) / (e.t1 - e.t0));
    if ((e.action === 'walk' || e.action === 'run') && e.to !== undefined) {
      const from = x;
      x = walkX(from, e, t);
      if (e.to !== from) facing = e.to > from ? 1 : -1;
    }
    if (e.action === 'turn') facing = facing === 1 ? -1 : 1;
    if (e.action === 'look' && e.look !== undefined) look = e.look;
    if (e.action === 'hide') visible = 1 - smooth(k);
    if (e.action === 'show') visible = smooth(k);
    if (t < e.t1) acts.push(e);
  }
  pose.expr = mood;
  pose.costume = COSTUMES.indexOf(costume) + 1;

  // ---- idle life: breathing, weight shifts, micro head motion, eye darts ----
  pose.breath = (Math.sin(t * 1.9 + sd) + 1) / 2;
  pose.bob = pose.breath * 1.6;
  pose.hipX = noise(t * 0.35, sd) * 7;
  pose.bodyTilt = noise(t * 0.3, sd + 1) * 1.6;
  pose.headTilt = noise(t * 0.45, sd + 2) * 4;
  pose.lookX = stepNoise(t, sd, 1.7) * 0.25;
  pose.lookY = stepNoise(t, sd + 5, 2.3) * 0.12;
  pose.armL = { up: 9 + noise(t * 0.5, sd + 3) * 4, bend: 14 + noise(t * 0.6, sd + 4) * 6 };
  pose.armR = { up: 9 + noise(t * 0.5, sd + 6) * 4, bend: 14 + noise(t * 0.6, sd + 7) * 6 };
  pose.kneeL = 3 + Math.max(0, pose.hipX) * 0.8; // weight on one leg, the other relaxes
  pose.kneeR = 3 + Math.max(0, -pose.hipX) * 0.8;
  pose.wag = 0.3 + Math.max(0, noise(t * 0.4, sd + 8)) * 0.5;
  pose.yaw = facing * 0.18;

  // ---- dialogue ----
  let speaking = false;
  const line = cs.events.find((e): e is LineEv => e.kind === 'line' && e.t0 <= t && t < e.t1 && e.who !== 'narrador');
  if (line) {
    if (line.who === id) {
      const lt = t - line.t0;
      if (line.expr) pose.expr = line.expr;
      if (t < line.voiceEnd) {
        speaking = true;
        const v = voiceInfo(line.who, line.text);
        const amp = (i: number) => (v ? (v.a[i] ?? 0) : 0.4 + 0.4 * Math.abs(Math.sin(i / 3)));
        const i = Math.floor(lt * FPS);
        pose.mouth = v ? clamp(amp(i) * 1.25) : 0.25 + 0.35 * Math.abs(Math.sin(lt * 11));
        // emphasis = slow loudness envelope → drives head nods, brows and hand beats
        let emph = 0;
        for (let j = -6; j <= 0; j++) emph += amp(i + j);
        emph /= 7;
        pose.brow = clamp(emph * 0.9);
        pose.lookY += -0.15 + (amp(i) - emph) * 0.6;
        pose.headTilt += noise(lt * 1.3, sd + 9) * 6;
        pose.bodyTilt += emph * 2 * facing;
        // talking hands (one arm, alternating per line) unless the line has its own action
        if (!acts.some((a) => a.t0 <= t && t < a.t1)) {
          const right = Math.round(line.t0 * 3) % 2 === 0;
          const g = { up: 22 + emph * 40 + noise(lt * 1.7, sd) * 8, bend: -55 - emph * 40 };
          if (right) pose.armR = g;
          else pose.armL = g;
        }
        pose.wag = 0.9;
      }
    } else if (line.who in cs.scene.cast) {
      const sx = xAt(cs, line.who as CharId, t);
      if (sx !== null && look === null) {
        const dir = Math.sign(sx - x) || facing;
        pose.yaw = dir * 0.38;
        pose.lookX = 0.55 + stepNoise(t, sd, 2.1) * 0.12;
        pose.headTilt += 3 + noise(t * 0.8, sd) * 3;
        // listeners nod now and then
        const nodK = (t - line.t0) % 2.7;
        if (nodK > 1.2 && nodK < 1.7) pose.lookY += Math.sin(((nodK - 1.2) / 0.5) * Math.PI * 2) * 0.35;
      }
    }
  }
  if (look !== null) {
    pose.yaw = look * 0.5;
    pose.lookX = Math.abs(look) * 0.6;
  }

  // ---- actions ----
  for (const e of acts) {
    const lt = t - e.t0;
    const dur = e.t1 - e.t0;
    const k = clamp(lt / dur);
    const w = env(t, e);
    if (e.expr) pose.expr = e.expr;
    switch (e.action) {
      case 'walk':
      case 'run': {
        const run = e.action === 'run';
        const from = xAt(cs, id, e.t0) ?? x;
        const dist = Math.abs(x - from);
        const stride = (run ? 210 : 150) * (d.legH / 150);
        const ph = (dist / stride) * Math.PI;
        // speed factor: legs calm down as the character decelerates
        const x2 = walkX(from, e, Math.min(e.t1, t + 1 / FPS));
        const sp = clamp((Math.abs(x2 - x) * FPS) / (run ? 700 : 300));
        const amp = (run ? 34 : 24) * sp;
        const s = Math.sin(ph);
        pose.legL = s * amp;
        pose.legR = -s * amp;
        pose.kneeL = Math.max(0, Math.sin(ph + Math.PI / 2)) * (run ? 70 : 42) * sp + 4;
        pose.kneeR = Math.max(0, Math.sin(ph - Math.PI / 2)) * (run ? 70 : 42) * sp + 4;
        pose.armL = { up: 9, bend: 18 + (run ? 70 : 20) * sp };
        pose.armR = { up: 9, bend: 18 + (run ? 70 : 20) * sp };
        pose.swingL = -Math.sin(ph - 0.35) * amp * 1.1;
        pose.swingR = Math.sin(ph - 0.35) * amp * 1.1;
        pose.bob = (Math.abs(s) * (run ? 12 : 7) - 3) * sp;
        pose.bodyTilt = (run ? 9 : 3) * sp * facing;
        pose.hipX = Math.sin(ph) * 3 * sp;
        pose.yaw = facing * lerp(0.18, 0.85, smooth(clamp(sp * 1.6)));
        pose.lookX = 0.35;
        pose.wag = 1;
        break;
      }
      case 'jump': {
        const h = 150 * (d.headR / 96);
        if (k < 0.28) {
          // anticipation: crouch, arms swing back
          const q = smooth(k / 0.28);
          pose.squash = 1 - q * 0.1;
          pose.kneeL = pose.kneeR = q * 55;
          pose.bob = q * 22;
          pose.swingL = pose.swingR = -40 * q;
          pose.lookY = 0.3 * q;
        } else if (k < 0.8) {
          const q = (k - 0.28) / 0.52;
          pose.lift = Math.sin(q * Math.PI) * h;
          pose.squash = 1 + Math.max(0, 1 - q * 3) * 0.1;
          pose.armL = { up: 155, bend: 20 };
          pose.armR = { up: 155, bend: 20 };
          pose.kneeL = 25 + q * 20;
          pose.kneeR = 35 + q * 15;
          pose.lookY = -0.4;
        } else {
          const q = (k - 0.8) / 0.2;
          const land = Math.sin(q * Math.PI);
          pose.squash = 1 - land * 0.09;
          pose.kneeL = pose.kneeR = land * 45;
          pose.bob = land * 18;
          pose.armL = { up: 60 * (1 - q), bend: 20 };
          pose.armR = { up: 60 * (1 - q), bend: 20 };
        }
        pose.wag = 1.4;
        break;
      }
      case 'wave': {
        pose.armR = lerpArm(pose.armR, { up: 118, bend: 28 + Math.sin(lt * 11) * 26 }, w);
        pose.headTilt += 6 * w;
        pose.hipX -= 5 * w;
        pose.yaw *= 1 - 0.6 * w;
        break;
      }
      case 'cheer': {
        const b = Math.abs(Math.sin(lt * 6.5));
        pose.armL = lerpArm(pose.armL, { up: 140 + b * 18, bend: 15 + b * 10 }, w);
        pose.armR = lerpArm(pose.armR, { up: 140 + (1 - b) * 18, bend: 15 + b * 10 }, w);
        pose.lift += b * 26 * w;
        pose.kneeL += (1 - b) * 30 * w;
        pose.kneeR += (1 - b) * 30 * w;
        pose.yaw *= 1 - 0.7 * w;
        pose.wag = 1.5;
        break;
      }
      case 'dance': {
        const s = Math.sin(lt * 6.3);
        const c = Math.cos(lt * 6.3);
        pose.armL = lerpArm(pose.armL, { up: 95 + s * 45, bend: 45 + c * 20 }, w);
        pose.armR = lerpArm(pose.armR, { up: 95 - s * 45, bend: 45 - c * 20 }, w);
        pose.bodyTilt += s * 8 * w;
        pose.hipX += s * 14 * w;
        pose.kneeL += Math.max(0, s) * 35 * w;
        pose.kneeR += Math.max(0, -s) * 35 * w;
        pose.bob += Math.abs(c) * 10 * w;
        pose.headTilt += -s * 8 * w;
        pose.yaw = lerp(pose.yaw, s * 0.35, w);
        pose.wag = 1.5;
        break;
      }
      case 'clap': {
        const c = Math.pow(Math.abs(Math.sin(lt * 7.5)), 0.6);
        pose.armL = lerpArm(pose.armL, { up: 34, bend: -88 - c * 26 }, w);
        pose.armR = lerpArm(pose.armR, { up: 34, bend: -88 - c * 26 }, w);
        pose.bob += c * 3 * w;
        pose.yaw *= 1 - 0.8 * w;
        break;
      }
      case 'think': {
        pose.armR = lerpArm(pose.armR, { up: 24, bend: -148 }, w);
        pose.armL = lerpArm(pose.armL, { up: 30, bend: -100 }, w);
        pose.lookX = lerp(pose.lookX, 0.65, w);
        pose.lookY = lerp(pose.lookY, -0.75, w);
        pose.headTilt += (10 + Math.sin(lt * 1.5) * 3) * w;
        pose.hipX += 6 * w;
        break;
      }
      case 'point': {
        pose.armR = lerpArm(pose.armR, { up: 82 + Math.sin(lt * 4) * 3, bend: 6 }, w);
        pose.lookX = lerp(pose.lookX, 0.85, w);
        pose.yaw = lerp(pose.yaw, facing * 0.55, w);
        pose.bodyTilt += 3 * facing * w;
        break;
      }
      case 'shrug': {
        pose.armL = lerpArm(pose.armL, { up: 32, bend: 78 }, w);
        pose.armR = lerpArm(pose.armR, { up: 32, bend: 78 }, w);
        pose.bob -= 8 * w;
        pose.headTilt += 9 * w;
        pose.brow = Math.max(pose.brow, w);
        break;
      }
      case 'hug': {
        pose.armL = lerpArm(pose.armL, { up: 70, bend: 38 + Math.sin(lt * 3) * 5 }, w);
        pose.armR = lerpArm(pose.armR, { up: 70, bend: 38 + Math.sin(lt * 3) * 5 }, w);
        pose.yaw *= 1 - 0.8 * w;
        pose.bob -= 4 * w;
        break;
      }
      case 'hips': {
        pose.armL = lerpArm(pose.armL, { up: 40, bend: -112 }, w);
        pose.armR = lerpArm(pose.armR, { up: 40, bend: -112 }, w);
        pose.hipX += 9 * w;
        pose.bodyTilt -= 3 * w;
        pose.headTilt += 5 * w;
        break;
      }
      case 'nod':
        pose.lookY = lerp(pose.lookY, Math.sin(lt * 12) * 0.7, w);
        break;
      case 'shake':
        pose.lookX = lerp(pose.lookX, Math.sin(lt * 13) * 0.9, w);
        pose.headTilt += Math.sin(lt * 13) * 4 * w;
        break;
      case 'tremble':
        x += Math.sin(lt * 55) * 2.5 * w;
        pose.armL = lerpArm(pose.armL, { up: 28, bend: -125 }, w);
        pose.armR = lerpArm(pose.armR, { up: 28, bend: -125 }, w);
        pose.kneeL += 20 * w;
        pose.kneeR += 20 * w;
        break;
      case 'fall': {
        // lose balance, tip over sideways, then get back up
        const down = k < 0.35 ? smooth(k / 0.35) : k < 0.62 ? 1 : 1 - smooth((k - 0.62) / 0.38);
        pose.tip = 72 * down;
        pose.expr = k < 0.35 ? 'surprised' : k < 0.75 ? 'sad' : pose.expr;
        pose.armL = lerpArm(pose.armL, { up: 70, bend: 40 }, down);
        pose.armR = lerpArm(pose.armR, { up: 70, bend: 40 }, down);
        break;
      }
      case 'sneeze':
        if (k < 0.65) {
          const q = smooth(k / 0.65);
          pose.headTilt -= 12 * q;
          pose.lookY -= 0.6 * q;
          pose.squash = 1 + 0.05 * q;
          pose.mouth = 0.3 * q;
          pose.expr = 'sleepy';
        } else {
          const q = (k - 0.65) / 0.35;
          pose.headTilt += 14 * Math.sin(q * Math.PI);
          pose.lookY += 0.5 * Math.sin(q * Math.PI);
          pose.squash = 1 - 0.1 * Math.sin(q * Math.PI);
          pose.bob += 10 * Math.sin(q * Math.PI);
          pose.expr = 'surprised';
          pose.mouth = 0.8 * (1 - q);
        }
        break;
      default:
        break;
    }
  }
  // ---- vehicles: wheelchair / bicycle override the legs (and the hands while moving) ----
  if (cast.vehicle) {
    const moving = acts.some((a) => (a.action === 'walk' || a.action === 'run') && t < a.t1);
    const busyArms = acts.some((a) => a.action !== 'walk' && a.action !== 'run' && a.action !== 'fall' && t < a.t1);
    pose.roll = x;
    pose.hipX *= 0.3;
    if (cast.vehicle === 'wheelchair') {
      pose.vehicle = 1;
      pose.legL = pose.legR = 84;
      pose.kneeL = pose.kneeR = 86;
      pose.swingL = pose.swingR = 0;
      pose.lift = -d.legH * 0.45 + pose.lift * 0.15;
      pose.bob *= 0.5;
      pose.bodyTilt = 0;
      if (moving && !busyArms) {
        const ph = x / 55;
        pose.armL = { up: 16, bend: -25 + Math.sin(ph) * 20 };
        pose.armR = { up: 16, bend: -25 + Math.sin(ph) * 20 };
        pose.swingL = pose.swingR = 20 + Math.sin(ph) * 22;
      }
    } else {
      pose.vehicle = 2;
      const ph = x / 40;
      pose.legL = 48 + Math.sin(ph) * 26;
      pose.legR = 48 + Math.sin(ph + Math.PI) * 26;
      pose.kneeL = 72 + Math.sin(ph) * 30;
      pose.kneeR = 72 + Math.sin(ph + Math.PI) * 30;
      pose.lift = -d.legH * 0.08;
      pose.bob *= 0.4;
      pose.bodyTilt = 0;
      if (!busyArms) {
        pose.armL = { up: 10, bend: -10 };
        pose.armR = { up: 10, bend: -10 };
        pose.swingL = pose.swingR = 62;
      }
    }
  }
  return { pose, x, y, scale: cast.scale ?? 1, visible, speaking };
};

// ---- spring filtering -------------------------------------------------------
/** Gamma-shaped kernel = smooth "follow" response; bigger `lag` = heavier/slower part. */
const kernel = (lag: number, n: number) => {
  const w = Array.from({ length: n }, (_, k) => Math.pow(k + 0.5, 1.2) * Math.exp(-(k + 0.5) / lag));
  const s = w.reduce((a, b) => a + b, 0);
  return w.map((v) => v / s);
};
const K_BODY = kernel(1.4, 10);
const K_HEAD = kernel(2.2, 14);
const K_ARMS = kernel(1.7, 12);
const K_FAST = kernel(0.6, 5);
const K_YAW = kernel(2.6, 16);
const N = 16;

export const solveCharacter = (cs: CompiledScene, id: CharId, t: number): CharState | null => {
  const now = targetPose(cs, id, t);
  if (!now) return null;
  const dt = 1 / FPS;
  const samples: Raw[] = [now];
  for (let k = 1; k < N; k++) samples.push(targetPose(cs, id, Math.max(0, t - k * dt))!);
  const f = (ker: number[], get: (r: Raw) => number) => ker.reduce((acc, w, k) => acc + w * get(samples[k]), 0);
  const fa = (ker: number[], get: (r: Raw) => Arm): Arm => ({ up: f(ker, (r) => get(r).up), bend: f(ker, (r) => get(r).bend) });

  const p = { ...now.pose };
  // body (legs stay exact: they must match the travelled distance → no foot sliding)
  p.bob = f(K_BODY, (r) => r.pose.bob);
  p.hipX = f(K_BODY, (r) => r.pose.hipX);
  p.bodyTilt = f(K_BODY, (r) => r.pose.bodyTilt);
  p.squash = f(K_FAST, (r) => r.pose.squash);
  p.lift = f(K_FAST, (r) => r.pose.lift);
  p.kneeL = f(K_FAST, (r) => r.pose.kneeL);
  p.kneeR = f(K_FAST, (r) => r.pose.kneeR);
  // arms follow with a touch of drag
  p.armL = fa(K_ARMS, (r) => r.pose.armL);
  p.armR = fa(K_ARMS, (r) => r.pose.armR);
  p.swingL = f(K_ARMS, (r) => r.pose.swingL);
  p.swingR = f(K_ARMS, (r) => r.pose.swingR);
  // head arrives later than the body (overlapping action)
  p.headTilt = f(K_HEAD, (r) => r.pose.headTilt);
  p.lookY = f(K_FAST, (r) => r.pose.lookY);
  p.lookX = f(K_FAST, (r) => r.pose.lookX);
  p.brow = f(K_BODY, (r) => r.pose.brow);
  p.yaw = f(K_YAW, (r) => r.pose.yaw);
  p.wag = f(K_HEAD, (r) => r.pose.wag);
  // velocities for ears/tail drag
  const back = samples[3];
  p.vx = (now.x - back.x) / (3 * dt);
  p.vy = (now.pose.lift - back.pose.lift) / (3 * dt);
  p.tip = f(K_FAST, (r) => r.pose.tip);
  if (now.pose.vehicle) p.lift = now.pose.lift + (p.lift - now.pose.lift) * 0.3;

  const facing: 1 | -1 = p.yaw < 0 ? -1 : 1;
  return { pose: p, x: now.x, y: now.y, facing, scale: now.scale, visible: f(K_BODY, (r) => r.visible) };
};
