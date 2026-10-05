export type CharId = 'papa' | 'mama' | 'hijo' | 'hija' | 'dentista' | 'lola';

/** The four main characters (intro, outro, thumbnails, website). Guests like `dentista` only appear when cast. */
export const FAMILY: CharId[] = ['papa', 'mama', 'hijo', 'hija'];

export type Expression =
  | 'neutral'
  | 'happy'
  | 'laugh'
  | 'excited'
  | 'surprised'
  | 'sad'
  | 'angry'
  | 'worried'
  | 'wink'
  | 'love'
  | 'sleepy'
  | 'proud';

export type Arm = {
  /** Shoulder angle in degrees. 0 = hanging down, 90 = horizontal out, 170 = straight up. */
  up: number;
  /** Elbow bend in degrees (positive bends the forearm upward/outward). */
  bend: number;
};

/** Everything needed to draw a character on a single frame. */
export type Pose = {
  expr: Expression;
  /** 0..1 mouth opening (driven by voice amplitude). */
  mouth: number;
  /** 0..1 eyelids closing. */
  blink: number;
  lookX: number;
  lookY: number;
  armL: Arm;
  armR: Arm;
  /** Arm swing forward(+)/back(-) in degrees (walking). */
  swingL: number;
  swingR: number;
  /** Leg swing in degrees. */
  legL: number;
  legR: number;
  bodyTilt: number;
  headTilt: number;
  /** Vertical offset of the whole upper body (breathing, bouncing). */
  bob: number;
  /** 1 = normal, <1 = squashed, >1 = stretched. */
  squash: number;
  /** Seconds, used for secondary motion (tail, ears). */
  t: number;
  /** Tail wag intensity 0..1+. */
  wag: number;
  /** Height above the floor (jumps). The shadow stays on the floor. */
  lift: number;
  /** Body turn: -1 = profile facing left, 0 = facing camera, 1 = profile facing right. */
  yaw: number;
  /** Knee bend in degrees (0 = straight). */
  kneeL: number;
  kneeR: number;
  /** Sideways weight shift of the upper body (px). */
  hipX: number;
  /** Extra eyebrow raise for emphasis (0..1). */
  brow: number;
  /** Body velocity (px/s) for secondary motion of ears, tail, hair. */
  vx: number;
  vy: number;
  /** Breathing 0..1 (chest expansion). */
  breath: number;
};

export const restPose = (t = 0): Pose => ({
  expr: 'neutral',
  mouth: 0,
  blink: 0,
  lookX: 0,
  lookY: 0,
  armL: { up: 8, bend: 10 },
  armR: { up: 8, bend: 10 },
  swingL: 0,
  swingR: 0,
  legL: 0,
  legR: 0,
  bodyTilt: 0,
  headTilt: 0,
  bob: 0,
  squash: 1,
  t,
  wag: 0.3,
  lift: 0,
  yaw: 0,
  kneeL: 0,
  kneeR: 0,
  hipX: 0,
  brow: 0,
  vx: 0,
  vy: 0,
  breath: 0,
});
