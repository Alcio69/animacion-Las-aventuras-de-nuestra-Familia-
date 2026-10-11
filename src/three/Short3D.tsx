import React, { useMemo } from 'react';
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { DESIGNS } from '../characters/design';
import type { CharId } from '../characters/types';
import { solveCharacter } from '../engine/animate';
import { FONT, ensureFonts } from '../engine/fonts';
import { Logo } from '../engine/Logo';
import { SceneAudio, TitleCard } from '../engine/Overlays';
import { FPS, compileScene, propAt, type CompiledScene, type LineEv } from '../engine/timeline';
import { FxView } from '../props/Props';
import { episodeOf, type Short } from '../shorts';
import { Character3D } from './Character3D';
import { Lights3D } from './Lights3D';
import { Prop3D } from './Props3D';
import { CameraRig, Canvas3D, Family3D, propPos, toX, toZ } from './Scene3D';
import { Set3D } from './Sets3D';

/**
 * Vertical Short (1080x1920): the hook on top for the whole video, the scene framed for a phone,
 * big subtitles above the platforms' bottom UI, and a short end card pointing to the full chapter.
 * Safe zones (TikTok / Reels / Shorts): text stays between y≈200 and y≈1500 and away from the right rail.
 */
export const END_SEC = 3;
const W = 1080;
const H = 1920;
const FOV = 30;
const TAN = Math.tan(((FOV / 2) * Math.PI) / 180);
/** Screen y where the floor line (script y=930) sits. */
const FLOOR_Y = 1250;

const ORDER = Object.keys(DESIGNS) as CharId[];

export const compileShort = (short: Short) => {
  let t = 0;
  const scenes = short.scenes.map((s, i) => {
    const c = compileScene(s, i, t);
    t += c.dur;
    return c;
  });
  const totalSec = t + END_SEC;
  return { scenes, sceneSec: t, totalSec, totalFrames: Math.ceil(totalSec * FPS) };
};

export const Short3D: React.FC<{ short: Short; audio?: boolean; video?: boolean }> = ({ short, audio = true, video = true }) => {
  ensureFonts();
  const compiled = useMemo(() => compileShort(short), [short]);
  const episode = episodeOf(short);
  const lines = useMemo(
    () => compiled.scenes.flatMap((s) => s.events.filter((e): e is LineEv => e.kind === 'line').map((l) => [s.start + l.t0, s.start + l.voiceEnd] as const)),
    [compiled],
  );
  const total = compiled.totalFrames;
  return (
    <AbsoluteFill style={{ background: '#2B1B4D', fontFamily: FONT }}>
      {audio && (
        <Html5Audio
          src={staticFile(`audio/music-${episode.music ?? 'happy'}.mp3`)}
          loop
          volume={(f) => {
            const t = f / FPS;
            const talking = lines.some(([a, b]) => t > a - 0.2 && t < b + 0.2);
            const fadeOut = interpolate(f, [total - 30, total - 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (talking ? 0.09 : 0.22) * fadeOut;
          }}
        />
      )}
      {compiled.scenes.map((cs) => (
        <Sequence key={cs.index} from={Math.round(cs.start * FPS)} durationInFrames={Math.round(cs.dur * FPS)} name={`Escena ${cs.index + 1}`}>
          {video ? <ShortScene cs={cs} audio={audio} first={cs.index === 0} /> : audio && <SceneAudio cs={cs} />}
        </Sequence>
      ))}
      {video && (
        <Sequence durationInFrames={Math.round(compiled.sceneSec * FPS)} name="Gancho">
          <Hook text={short.hook} />
        </Sequence>
      )}
      <Sequence from={Math.round(compiled.sceneSec * FPS)} name="Cierre">
        <EndCard number={episode.number} title={episode.title} audio={audio} video={video} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** Camera framing: centred between the visible characters, leaning a little towards whoever is talking. */
const frameAt = (cs: CompiledScene, t: number) => {
  const xs: number[] = [];
  for (const id of ORDER) {
    const s = solveCharacter(cs, id, t);
    if (s && s.visible > 0.5 && s.x > 150 && s.x < 1770) xs.push(s.x);
  }
  if (!xs.length) return { cx: 960, span: 0 };
  const lo = Math.min(...xs);
  const hi = Math.max(...xs);
  let cx = (lo + hi) / 2;
  const line = cs.events.find((e): e is LineEv => e.kind === 'line' && e.t0 <= t && t < e.t1);
  if (line && line.who !== 'narrador') {
    const s = solveCharacter(cs, line.who as CharId, t);
    if (s && s.visible > 0.5) cx += (s.x - cx) * 0.08;
  }
  return { cx, span: hi - lo };
};

const ShortScene: React.FC<{ cs: CompiledScene; audio: boolean; first: boolean }> = ({ cs, audio, first }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const sc = cs.scene;
  const ease = (x: number) => x * x * (3 - 2 * x);

  // smooth camera: average the framing over ±0.6 s (frames are rendered independently, so no state)
  const N = 9;
  let cx = 0;
  let span = 0;
  for (let i = 0; i < N; i++) {
    const f = frameAt(cs, Math.max(0, Math.min(cs.dur, t + ((i / (N - 1)) * 2 - 1) * 0.6)));
    cx += f.cx / N;
    span += f.span / N;
  }
  // visible width in world units: the cast plus margin; slow push-in over the scene
  const push = 1 - 0.06 * ease(Math.min(1, t / cs.dur));
  const widthU = Math.max(7.6, span / 100 + 3.9) * push;
  const ppu = W / widthU; // screen px per world unit
  const dist = H / 2 / ppu / TAN;
  const camX = toX(cx) + Math.sin((cs.start + t) * 0.18) * 0.15;
  const lookY = (FLOOR_Y - H / 2) / ppu;
  const camY = lookY + 1.1;

  // project script coordinates (fx) to the screen with the same camera
  const cam = useMemo(() => new THREE.PerspectiveCamera(FOV, W / H, 0.1, 200), []);
  cam.position.set(camX, camY, dist);
  cam.lookAt(camX, lookY, 0);
  cam.updateMatrixWorld();
  const project = (x: number, y: number) => {
    const v = new THREE.Vector3(toX(x), (930 - y) / 100, 0.3).project(cam);
    return [(v.x + 1) * (W / 2), (1 - v.y) * (H / 2)] as const;
  };

  const iris = first ? Math.min(1, (cs.dur - t) / 0.35) : Math.min(1, t / 0.45, (cs.dur - t) / 0.35);
  const irisR = Math.max(0, ease(Math.max(0, iris))) * 120;
  const line = cs.events.find((e): e is LineEv => e.kind === 'line' && e.t0 <= t && t < e.t1);
  const title = cs.events.find((e) => e.kind === 'title' && e.t0 <= t && t < e.t1);
  const night = (sc.bg === 'bedroom' && sc.variant !== 'day') || sc.variant === 'night' || sc.variant === 'halloween';

  return (
    <AbsoluteFill style={{ clipPath: `circle(${irisR}% at 50% 50%)`, background: night ? '#2A2560' : '#FCE9D2', filter: sc.flashback ? 'sepia(0.5) saturate(0.9) brightness(1.04)' : undefined }}>
      <Canvas3D>
        <CameraRig x={camX} dist={dist} y={camY} lookY={lookY} />
        <Lights3D night={night} target={[camX, 2.5, 0]} dim={sc.variant === 'rain' ? 1 : 0} />
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
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
          <defs>
            <linearGradient id="shortTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2B1B4D" stopOpacity={0.45} />
              <stop offset="1" stopColor="#2B1B4D" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="shortBottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2B1B4D" stopOpacity={0} />
              <stop offset="1" stopColor="#2B1B4D" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          {cs.events.map((e, i) => {
            if (e.kind !== 'fx' || t < e.t0 || t > e.t1) return null;
            const [px, py] = project(e.x, e.y);
            return (
              <g key={i} transform={`translate(${px} ${py}) scale(${ppu / 100})`}>
                <FxView fx={e.fx} k={(t - e.t0) / (e.t1 - e.t0)} t={t - e.t0} />
              </g>
            );
          })}
          <rect width={W} height={560} fill="url(#shortTop)" />
          <rect y={H - 520} width={W} height={520} fill="url(#shortBottom)" />
          {title && title.kind === 'title' && (
            <g transform={`translate(${W / 2 - 960 * 0.95} 560) scale(0.95)`}>
              <TitleCard text={title.text} k={(t - title.t0) / (title.t1 - title.t0)} />
            </g>
          )}
        </svg>
      </AbsoluteFill>
      {line && <ShortSubtitle line={line} t={t} />}
      {audio && <SceneAudio cs={cs} />}
    </AbsoluteFill>
  );
};

/** Big two-line hook on top, like the chapter thumbnails (white outline, yellow fill). */
const Hook: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 9 } });
  const rows = text.split('\n');
  const longest = Math.max(...rows.map((r) => r.length));
  const size = Math.min(104, 960 / (longest * 0.56));
  const wob = Math.sin((frame / fps) * 2.2) * 1.2;
  return (
    <AbsoluteFill>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        <g transform={`translate(${W / 2} ${250}) scale(${pop}) rotate(${-3 + wob})`} fontFamily={FONT} fontWeight={700} textAnchor="middle" strokeLinejoin="round">
          {rows.map((r, i) => (
            <g key={i} transform={`translate(0 ${i * size * 1.08})`}>
              <text fontSize={size} fill="#FFF" stroke="#5F3DC4" strokeWidth={size * 0.24} paintOrder="stroke">
                {r}
              </text>
              <text fontSize={size} fill="#FFD43B">
                {r}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/** Subtitle for a phone screen: bigger text, narrower box, kept left of the platforms' right-hand buttons. */
const ShortSubtitle: React.FC<{ line: LineEv; t: number }> = ({ line, t }) => {
  const appear = Math.min(1, (t - line.t0) / 0.15, (line.t1 - t) / 0.15);
  const isNarr = line.who === 'narrador';
  const color = isNarr ? '#5F3DC4' : DESIGNS[line.who as CharId].accent;
  const name = isNarr ? 'Narrador' : DESIGNS[line.who as CharId].name;
  return (
    <div style={{ position: 'absolute', left: 56, right: 140, top: 1300, display: 'flex', justifyContent: 'center', opacity: appear, transform: `translateY(${(1 - appear) * 20}px)` }}>
      <div
        style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 34,
          padding: '40px 34px 24px',
          boxShadow: '0 8px 0 rgba(0,0,0,0.14)',
          border: `6px solid ${color}`,
          textAlign: 'center',
        }}
      >
        <span style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', background: color, color: '#fff', borderRadius: 20, padding: '4px 22px', fontSize: 36, fontWeight: 700, whiteSpace: 'nowrap', border: '4px solid #fff' }}>
          {name}
        </span>
        <span style={{ color: '#2B2140', fontSize: 52, fontWeight: 700, lineHeight: 1.18, fontStyle: isNarr ? 'italic' : 'normal' }}>{line.text}</span>
      </div>
    </div>
  );
};

/** End card: logo, the family and the full chapter to watch next. */
const EndCard: React.FC<{ number: number; title: string; audio: boolean; video: boolean }> = ({ number, title, audio, video }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const inK = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const pill = spring({ frame: frame - 10, fps, config: { damping: 10 } });
  const label = `Capítulo ${number}: ${title}`;
  if (!video) return audio ? <Html5Audio src={staticFile('audio/sfx-sparkle.mp3')} volume={0.4} /> : null;
  return (
    <AbsoluteFill style={{ opacity: inK, background: 'linear-gradient(#B197FC, #7048E8)' }}>
      <Canvas3D>
        <CameraRig x={0} dist={32} y={3.0} lookY={0.9} />
        <Lights3D target={[0, 2.5, 0]} />
        <Family3D t={t} frame={frame} spacing={2.05} exprs={{ papa: 'happy', mama: 'happy', hijo: 'laugh', hija: 'laugh' }} />
      </Canvas3D>
      <AbsoluteFill>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
          <g transform={`translate(${W / 2} 330) scale(1.0)`}>
            <Logo t={t} />
          </g>
          <g fontFamily={FONT} fontWeight={700} textAnchor="middle">
            <text x={W / 2} y={1250} fontSize={58} fill="#FFF" stroke="#5F3DC4" strokeWidth={12} paintOrder="stroke">
              ¿Quieres ver cómo sigue?
            </text>
            <g transform={`translate(${W / 2} 1360) scale(${pill})`}>
              <rect x={-470} y={-52} width={940} height={100} rx={50} fill="#FA5252" stroke="#FFF" strokeWidth={6} />
              <text y={15} fontSize={Math.min(46, 880 / (label.length * 0.52))} fill="#FFF">
                {label}
              </text>
            </g>
            <text x={W / 2} y={1470} fontSize={44} fill="#FFF">
              Capítulo completo en nuestro canal
            </text>
          </g>
        </svg>
      </AbsoluteFill>
      {audio && <Html5Audio src={staticFile('audio/sfx-sparkle.mp3')} volume={0.4} />}
    </AbsoluteFill>
  );
};
