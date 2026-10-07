import { useThree } from '@react-three/fiber';
import { ThreeCanvas } from '@remotion/three';
import React, { useLayoutEffect } from 'react';
import { AbsoluteFill, Html5Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { DESIGNS } from '../characters/design';
import type { CharId } from '../characters/types';
import { restPose } from '../characters/types';
import { solveCharacter } from '../engine/animate';
import { FONT } from '../engine/fonts';
import { Logo } from '../engine/Logo';
import { SceneAudio, Subtitle, TitleCard } from '../engine/Overlays';
import type { Background, Episode } from '../engine/script';
import { FPS, INTRO_SEC, propAt, type CompiledScene, type LineEv } from '../engine/timeline';
import { FxView } from '../props/Props';
import { Character3D } from './Character3D';
import { Lights3D } from './Lights3D';
import { Prop3D } from './Props3D';
import { COUNTER_TOP, COUNTER_Z, Set3D } from './Sets3D';

const ORDER = Object.keys(DESIGNS) as CharId[];
const FAMILY: CharId[] = ['papa', 'mama', 'hijo', 'hija'];
/** Script coordinates (px) → world. */
export const toX = (x: number) => (x - 960) / 100;
export const toZ = (y: number) => (y - 930) / 60;
const TABLE_TOP = 1.61;
const propPos = (bg: Background, x: number, y: number): [number, number, number] => {
  // high up in the air (e.g. a ball stuck in a tree): real height, just in front of the characters' plane
  if (y < 520) return [toX(x), (930 - y) / 100, 0.3];
  if (y >= 880) return [toX(x), 0, toZ(y) - 0.5];
  // outdoors there is no table: any height is real height (balls flying, falling from trees)
  if (bg === 'park' || bg === 'beach') return [toX(x), (930 - y) / 100, 0.3];
  if (bg === 'kitchen' && y < 700) return [toX(x), COUNTER_TOP, COUNTER_Z];
  // between the floor (y=880) and the table / hand height (y=760) blend smoothly, so props can fly up onto a table
  if (y > 760) {
    const k = (880 - y) / 120;
    return [toX(x), TABLE_TOP * k, toZ(880) - 0.5 + (-0.9 - (toZ(880) - 0.5)) * k];
  }
  return [toX(x), TABLE_TOP, -0.9];
};

const CameraRig: React.FC<{ x: number; dist: number; y?: number; lookY?: number }> = ({ x, dist, y = 4.1, lookY = 2.7 }) => {
  const { camera } = useThree();
  useLayoutEffect(() => {
    camera.position.set(x, y, dist);
    camera.lookAt(x, lookY, 0);
    camera.updateProjectionMatrix();
  });
  return null;
};

const onCreated = ({ gl }: { gl: THREE.WebGLRenderer }) => {
  gl.toneMapping = THREE.NeutralToneMapping;
  gl.toneMappingExposure = 1.05;
  gl.shadowMap.type = THREE.VSMShadowMap;
};

export const Canvas3D: React.FC<{ children: React.ReactNode; transparent?: boolean }> = ({ children }) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas width={width} height={height} shadows camera={{ fov: 30, near: 0.1, far: 200, position: [0, 4, 17.5] }} onCreated={onCreated} gl={{ antialias: true, alpha: true }}>
      {children}
    </ThreeCanvas>
  );
};

export const Scene3DView: React.FC<{ cs: CompiledScene; audio: boolean }> = ({ cs, audio }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const sc = cs.scene;
  const k = Math.min(1, t / cs.dur);
  const ease = (x: number) => x * x * (3 - 2 * x);
  const [z0, z1] = sc.zoom ?? [1.08, 1.13];
  const [f0, f1] = sc.focus ?? [960, 960];
  const zoom = z0 + (z1 - z0) * ease(k);
  const focus = f0 + (f1 - f0) * ease(k);
  // slow orbit drift = depth parallax (something a 3D camera does for free)
  const drift = Math.sin((cs.start + t) * 0.18) * 0.6;
  const camX = toX(Math.max(960 / zoom, Math.min(1920 - 960 / zoom, focus))) + drift;
  const dist = 18.5 / zoom;
  // 2D overlay camera (for fx particles) mirrors the 2D framing
  const camX2 = Math.max(960 / zoom, Math.min(1920 - 960 / zoom, focus));
  const camY2 = 1080 - 540 / zoom;

  const iris = Math.min(1, t / 0.45, (cs.dur - t) / 0.35);
  const irisR = Math.max(0, ease(Math.max(0, iris))) * 120;
  const line = cs.events.find((e): e is LineEv => e.kind === 'line' && e.t0 <= t && t < e.t1);
  const title = cs.events.find((e) => e.kind === 'title' && e.t0 <= t && t < e.t1);
  const night = (sc.bg === 'bedroom' && sc.variant !== 'day') || sc.variant === 'night' || sc.variant === 'halloween';
  // lightning: a quick double flash when a thunder sfx plays
  const flash = cs.events.reduce((m, e) => {
    if (e.kind !== 'sfx' || e.sfx !== 'thunder') return m;
    const d = t - e.t0;
    return d < 0 || d > 0.5 ? m : Math.max(m, Math.max(0, 1 - d / 0.12), d > 0.18 ? Math.max(0, 0.7 - (d - 0.18) / 0.15) : 0);
  }, 0);

  return (
    <AbsoluteFill
      style={{ clipPath: `circle(${irisR}% at 50% 50%)`, background: night ? '#2A2560' : '#FCE9D2', filter: sc.flashback ? 'sepia(0.5) saturate(0.9) brightness(1.04)' : undefined }}
    >
      <Canvas3D>
        <CameraRig x={camX} dist={dist} />
        <Lights3D night={night} target={[camX, 2.5, 0]} dim={sc.variant === 'rain' ? 1 : 0} flash={flash} />
        <Set3D bg={sc.bg} variant={sc.variant} t={t + cs.start} />
        {cs.events.map((e, i) => {
          if (e.kind !== 'prop' || t < e.t0 || t > e.t1) return null;
          const pop = Math.min(1.08, spring({ frame: Math.round((t - e.t0) * FPS), fps: FPS, config: { damping: 9 } }));
          const out = e.t1 - t < 0.25 ? (e.t1 - t) / 0.25 : 1;
          const pa = propAt(e, t);
          const pos = propPos(sc.bg, pa.x, pa.y);
          return (
            <group key={i} position={[pos[0], pos[1] + pa.lift / 100, pos[2]]} scale={Math.max(0.001, e.scale * pop * out)}>
              <Prop3D kind={e.prop} t={t} spin={pa.spin} />
            </group>
          );
        })}
        {ORDER.map((id) => {
          const s = solveCharacter(cs, id, t);
          if (!s || s.visible <= 0.01) return null;
          return <Character3D key={id} id={id} pose={s.pose} position={[toX(s.x), 0, toZ(s.y)]} scale={s.scale * (0.6 + 0.4 * s.visible)} />;
        })}
      </Canvas3D>
      <AbsoluteFill>
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          <defs>
            <radialGradient id="vig3" cx="50%" cy="45%" r="75%">
              <stop offset="62%" stopColor="#2B1B4D" stopOpacity={0} />
              <stop offset="100%" stopColor="#2B1B4D" stopOpacity={0.25} />
            </radialGradient>
          </defs>
          <g transform={`translate(960 540) scale(${zoom}) translate(${-camX2} ${-camY2})`}>
            {cs.events.map((e, i) => {
              if (e.kind !== 'fx' || t < e.t0 || t > e.t1) return null;
              return (
                <g key={i} transform={`translate(${e.x} ${e.y})`}>
                  <FxView fx={e.fx} k={(t - e.t0) / (e.t1 - e.t0)} t={t - e.t0} />
                </g>
              );
            })}
          </g>
          <rect width={1920} height={1080} fill="url(#vig3)" />
          {flash > 0 && <rect width={1920} height={1080} fill="#F3F6FF" opacity={flash * 0.35} />}
          {title && title.kind === 'title' && <TitleCard text={title.text} k={(t - title.t0) / (title.t1 - title.t0)} />}
        </svg>
      </AbsoluteFill>
      {line && <Subtitle line={line} t={t} />}
      {audio && <SceneAudio cs={cs} />}
    </AbsoluteFill>
  );
};

/** Family line-up used by the 3D intro, outro and thumbnail. */
const Family3D: React.FC<{
  t: number;
  frame: number;
  pop?: boolean;
  exprs?: Partial<Record<CharId, import('../characters/types').Expression>>;
  spacing?: number;
  ids?: CharId[];
  vehicles?: Partial<Record<CharId, number>>;
  costumes?: Partial<Record<CharId, string>>;
}> = ({ t, frame, pop, exprs, spacing = 3.3, ids = FAMILY, vehicles, costumes }) => {
  const mid = (ids.length - 1) / 2;
  const { fps } = useVideoConfig();
  return (
    <>
      {ids.map((id, i) => {
        const p = restPose(t);
        p.expr = exprs?.[id] ?? (i % 2 ? 'laugh' : 'excited');
        p.armR = { up: 122, bend: 28 + Math.sin(t * 11 + i) * 26 };
        p.yaw = (i - mid) * -0.12;
        p.vehicle = vehicles?.[id] ?? 0;
        p.costume = ['ghost', 'witch', 'pumpkin', 'santa', 'blanket'].indexOf(costumes?.[id] ?? '') + 1;
        if (p.vehicle) p.armR = { up: 122, bend: 20 };
        p.wag = 1.2;
        p.bob = Math.sin(t * 4 + i) * 3;
        const s = pop ? spring({ frame: frame - 10 - i * 6, fps, config: { damping: 10 } }) : 1;
        return <Character3D key={id} id={id} pose={p} position={[(i - mid) * spacing, -3 + 3 * s, 0]} />;
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[30, 48]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </>
  );
};

/** Guests shown in the thumbnail keep the vehicle they use in the episode (e.g. Tomi's wheelchair). */
const thumbVehicles = (episode: Episode, ids?: CharId[]) => {
  const v: Partial<Record<CharId, number>> = {};
  for (const sc of episode.scenes)
    for (const id of ids ?? []) {
      const veh = sc.cast[id]?.vehicle;
      if (veh) v[id] = veh === 'wheelchair' ? 1 : 2;
    }
  return v;
};

export const Intro3D: React.FC<{ episode: Episode; audio: boolean }> = ({ episode, audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const logoIn = spring({ frame, fps, config: { damping: 10 } });
  const titleIn = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const out = interpolate(frame, [INTRO_SEC * fps - 10, INTRO_SEC * fps], [1, 0], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ opacity: out, background: 'radial-gradient(circle at 50% 35%, #FFF3BF, #FFD8A8 60%, #FCC2D7)' }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: 'absolute' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d="M 960 380 L 3000 300 L 3000 460 Z" fill="#FFFFFF" opacity={0.18} transform={`rotate(${i * 22.5 + t * 12} 960 380)`} />
        ))}
      </svg>
      <Canvas3D>
        <CameraRig x={0} dist={19} y={3.2} lookY={4.6} />
        <Lights3D target={[0, 2.5, 0]} />
        <Family3D t={t} frame={frame} pop />
      </Canvas3D>
      <AbsoluteFill>
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          <g transform={`translate(960 250) scale(${logoIn * 0.85})`}>
            <Logo t={t} />
          </g>
          <g transform={`translate(960 505) scale(${titleIn})`} fontFamily={FONT} fontWeight={700} textAnchor="middle">
            <rect x={-560} y={-62} width={1120} height={110} rx={55} fill="#7048E8" />
            {/* long titles shrink to fit the pill */}
            <text y={18} fontSize={Math.min(58, 1060 / (`Capítulo ${episode.number}: ${episode.title}`.length * 0.52))} fill="#FFF">
              {`Capítulo ${episode.number}: ${episode.title}`}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
      {audio && <Html5Audio src={staticFile('audio/sfx-tada.mp3')} volume={0.5} />}
    </AbsoluteFill>
  );
};

export const Outro3D: React.FC<{ audio: boolean }> = ({ audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const inK = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const btn = spring({ frame: frame - 25, fps, config: { damping: 8 } });
  return (
    <AbsoluteFill style={{ opacity: inK, background: 'linear-gradient(#B197FC, #7048E8)' }}>
      <Canvas3D>
        <CameraRig x={0} dist={18} y={3.0} lookY={3.9} />
        <Lights3D target={[0, 2.5, 0]} />
        <Family3D t={t} frame={frame} exprs={{ papa: 'happy', mama: 'happy', hijo: 'happy', hija: 'happy' }} />
      </Canvas3D>
      <AbsoluteFill>
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          <g transform="translate(960 150) scale(0.55)">
            <Logo t={t} />
          </g>
          <g fontFamily={FONT} fontWeight={700} textAnchor="middle">
            <text x={960} y={350} fontSize={64} fill="#FFF" stroke="#5F3DC4" strokeWidth={12} paintOrder="stroke">
              ¡Hasta la próxima aventura!
            </text>
            <g transform={`translate(960 1010) scale(${btn})`}>
              <rect x={-250} y={-48} width={500} height={92} rx={46} fill="#FA5252" stroke="#FFF" strokeWidth={6} />
              <text y={16} fontSize={44} fill="#FFF">
                🔔 ¡Suscríbete!
              </text>
            </g>
          </g>
        </svg>
      </AbsoluteFill>
      {audio && <Html5Audio src={staticFile('audio/sfx-sparkle.mp3')} volume={0.4} />}
    </AbsoluteFill>
  );
};

export const Thumbnail3D: React.FC<{ episode: Episode }> = ({ episode }) => {
  const th = episode.thumb ?? {};
  const text = th.text ?? episode.title.toUpperCase();
  const size = Math.min(200, 1560 / (text.length * 0.62));
  const bg = th.bg ?? episode.scenes[0].bg;
  return (
    <AbsoluteFill style={{ background: '#FCE9D2' }}>
      <Canvas3D>
        <CameraRig x={0} dist={12.5} y={4.2} lookY={3.4} />
        <Lights3D target={[0, 2.5, 0]} dim={th.variant === 'rain' ? 0.6 : 0} night={th.variant === 'night' || th.variant === 'halloween'} />
        <Set3D bg={bg} variant={th.variant} t={0.7} />
        {th.prop && (
          <group position={bg === 'kitchen' ? [0, COUNTER_TOP, COUNTER_Z] : [0, 0, -1]} scale={1.2}>
            <Prop3D kind={th.prop} t={0} />
          </group>
        )}
        <Family3D t={0.4} frame={100} exprs={th.exprs} ids={th.cast} vehicles={thumbVehicles(episode, th.cast)} costumes={th.costumes} spacing={th.cast && th.cast.length > 4 ? 2.3 : 3.1} />
      </Canvas3D>
      <AbsoluteFill>
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          <g transform="translate(960 210) rotate(-3)" fontFamily={FONT} fontWeight={700} textAnchor="middle">
            <text fontSize={size} fill="#FFF" stroke="#5F3DC4" strokeWidth={size * 0.2} paintOrder="stroke" strokeLinejoin="round">
              {text}
            </text>
            <text fontSize={size} fill="#FFD43B">
              {text}
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
