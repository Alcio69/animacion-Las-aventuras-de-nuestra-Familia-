import React, { useMemo } from 'react';
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundView } from '../backgrounds/Backgrounds';
import { Character } from '../characters/Character';
import { DESIGNS } from '../characters/design';
import { restPose, type CharId } from '../characters/types';
import { FxView, PropView } from '../props/Props';
import { solveCharacter } from './animate';
import { FONT, ensureFonts } from './fonts';
import { Logo } from './Logo';
import { SceneAudio, Subtitle, TitleCard } from './Overlays';
import { Intro3D, Outro3D, Scene3DView } from '../three/Scene3D';
import type { Episode } from './script';
import { FPS, INTRO_SEC, OUTRO_SEC, compileEpisode, type CompiledScene, type LineEv } from './timeline';

export type EpisodeStyle = '2d' | '3d';
export type EpisodeProps = { episode: Episode; audio?: boolean; style?: EpisodeStyle };

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, audio = true, style = '2d' }) => {
  const three = style === '3d';
  ensureFonts();
  const compiled = useMemo(() => compileEpisode(episode), [episode]);
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
            const fadeOut = interpolate(f, [total - 45, total - 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (talking ? 0.09 : 0.22) * fadeOut;
          }}
        />
      )}
      <Sequence durationInFrames={Math.round(INTRO_SEC * FPS)} name="Intro">
        {three ? <Intro3D episode={episode} audio={audio} /> : <Intro episode={episode} audio={audio} />}
      </Sequence>
      {compiled.scenes.map((cs) => (
        <Sequence key={cs.index} from={Math.round(cs.start * FPS)} durationInFrames={Math.round(cs.dur * FPS)} name={`Escena ${cs.index + 1}`}>
          {three ? <Scene3DView cs={cs} audio={audio} /> : <SceneView cs={cs} audio={audio} />}
        </Sequence>
      ))}
      <Sequence from={Math.round((compiled.totalSec - OUTRO_SEC) * FPS)} name="Outro">
        {three ? <Outro3D audio={audio} /> : <Outro audio={audio} />}
      </Sequence>
    </AbsoluteFill>
  );
};

const ORDER: CharId[] = ['papa', 'mama', 'hijo', 'hija'];

export const SceneView: React.FC<{ cs: CompiledScene; audio: boolean }> = ({ cs, audio }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const sc = cs.scene;
  const k = Math.min(1, t / cs.dur);
  const ease = (x: number) => x * x * (3 - 2 * x);
  const [z0, z1] = sc.zoom ?? [1.08, 1.13];
  const [f0, f1] = sc.focus ?? [960, 960];
  const zoom = z0 + (z1 - z0) * ease(k);
  const focus = f0 + (f1 - f0) * ease(k);
  const camX = Math.max(960 / zoom, Math.min(1920 - 960 / zoom, focus));
  const camY = 1080 - 540 / zoom; // keep the floor anchored to the bottom

  const chars = ORDER.map((id) => ({ id, s: solveCharacter(cs, id, t) }))
    .filter((c) => c.s && c.s.visible > 0)
    .sort((a, b) => a.s!.y - b.s!.y);

  const iris = Math.min(1, t / 0.45, (cs.dur - t) / 0.35);
  const irisR = Math.max(0, ease(Math.max(0, iris))) * 120;

  const line = cs.events.find((e): e is LineEv => e.kind === 'line' && e.t0 <= t && t < e.t1);
  const title = cs.events.find((e) => e.kind === 'title' && e.t0 <= t && t < e.t1);

  return (
    <AbsoluteFill style={{ clipPath: `circle(${irisR}% at 50% 50%)` }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        <g transform={`translate(960 540) scale(${zoom}) translate(${-camX} ${-camY})`}>
          <defs>
            <filter id="dof" x="-2%" y="-2%" width="104%" height="104%">
              <feGaussianBlur stdDeviation={2.4} />
            </filter>
            <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
              <stop offset="60%" stopColor="#2B1B4D" stopOpacity={0} />
              <stop offset="100%" stopColor="#2B1B4D" stopOpacity={0.28} />
            </radialGradient>
            <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF4D6" stopOpacity={0.35} />
              <stop offset="50%" stopColor="#FFF4D6" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* background slightly out of focus = cinematic depth, characters pop */}
          <g filter="url(#dof)">
            <BackgroundView bg={sc.bg} variant={sc.variant} t={t + cs.start} />
          </g>
          {cs.events.map((e, i) => {
            if (e.kind !== 'prop' || t < e.t0 || t > e.t1) return null;
            const pop = Math.min(1, spring({ frame: Math.round((t - e.t0) * FPS), fps: FPS, config: { damping: 9 } }));
            const out = e.t1 - t < 0.25 ? (e.t1 - t) / 0.25 : 1;
            return (
              <g key={i} transform={`translate(${e.x} ${e.y}) scale(${e.scale * pop * out})`}>
                <PropView kind={e.prop} t={t} />
              </g>
            );
          })}
          {chars.map(({ id, s }) => (
            <g key={id} opacity={Math.min(1, s!.visible * 1.5)}>
              <Character id={id} pose={s!.pose} x={s!.x} y={s!.y} scale={s!.scale * (0.85 + 0.15 * s!.visible)} />
            </g>
          ))}
          {cs.events.map((e, i) => {
            if (e.kind !== 'fx' || t < e.t0 || t > e.t1) return null;
            return (
              <g key={i} transform={`translate(${e.x} ${e.y})`}>
                <FxView fx={e.fx} k={(t - e.t0) / (e.t1 - e.t0)} t={t - e.t0} />
              </g>
            );
          })}
        </g>
        <rect width={1920} height={1080} fill="url(#sunbeam)" style={{ mixBlendMode: 'screen' }} />
        <rect width={1920} height={1080} fill="url(#vignette)" />
        {title && title.kind === 'title' && <TitleCard text={title.text} k={(t - title.t0) / (title.t1 - title.t0)} />}
      </svg>
      {line && <Subtitle line={line} t={t} />}
      {audio && <SceneAudio cs={cs} />}
    </AbsoluteFill>
  );
};

const Intro: React.FC<{ episode: Episode; audio: boolean }> = ({ episode, audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const logoIn = spring({ frame, fps, config: { damping: 10 } });
  const titleIn = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const out = interpolate(frame, [INTRO_SEC * fps - 10, INTRO_SEC * fps], [1, 0], { extrapolateLeft: 'clamp' });
  const ids: CharId[] = ['papa', 'mama', 'hijo', 'hija'];
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="intro-bg" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#FFF3BF" />
            <stop offset="60%" stopColor="#FFD8A8" />
            <stop offset="100%" stopColor="#FCC2D7" />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="url(#intro-bg)" />
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={i}
            d="M 960 380 L 3000 300 L 3000 460 Z"
            fill="#FFFFFF"
            opacity={0.18}
            transform={`rotate(${i * 22.5 + t * 12} 960 380)`}
          />
        ))}
        <g transform={`translate(960 285) scale(${logoIn * 0.95})`}>
          <Logo t={t} />
        </g>
        {ids.map((id, i) => {
          const p = restPose(t);
          p.expr = i % 2 ? 'laugh' : 'excited';
          p.armR = { up: 125, bend: 30 + Math.sin(t * 12 + i) * 25 };
          p.wag = 1.2;
          const pop = spring({ frame: frame - 12 - i * 6, fps, config: { damping: 9 } });
          return <Character key={id} id={id} pose={p} x={450 + i * 340} y={1250 - pop * 180} scale={0.78} />;
        })}
        <g transform={`translate(960 560) scale(${titleIn})`} fontFamily={FONT} fontWeight={700} textAnchor="middle">
          <rect x={-560} y={-62} width={1120} height={110} rx={55} fill="#7048E8" />
          <text y={18} fontSize={58} fill="#FFF">
            {`Capítulo ${episode.number}: ${episode.title}`}
          </text>
        </g>
      </svg>
      {audio && <Html5Audio src={staticFile('audio/sfx-tada.mp3')} volume={0.5} />}
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ audio: boolean }> = ({ audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const inK = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const btn = spring({ frame: frame - 25, fps, config: { damping: 8 } });
  const ids: CharId[] = ['papa', 'mama', 'hijo', 'hija'];
  return (
    <AbsoluteFill style={{ opacity: inK }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <linearGradient id="outro-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B197FC" />
            <stop offset="100%" stopColor="#7048E8" />
          </linearGradient>
        </defs>
        <rect width={1920} height={1080} fill="url(#outro-bg)" />
        {Array.from({ length: 24 }).map((_, i) => (
          <circle key={i} cx={(i * 173) % 1920} cy={((i * 97 + t * 40 * (1 + (i % 3))) % 1200) - 60} r={6 + (i % 4) * 3} fill="#FFF" opacity={0.25} />
        ))}
        <g transform="translate(960 190) scale(0.62)">
          <Logo t={t} />
        </g>
        {ids.map((id, i) => {
          const p = restPose(t);
          p.expr = 'happy';
          p.armR = { up: 122, bend: 25 + Math.sin(t * 12 + i * 1.3) * 28 };
          p.bob = Math.sin(t * 4 + i) * 4;
          p.wag = 1;
          return <Character key={id} id={id} pose={p} x={520 + i * 300} y={900} scale={0.95} />;
        })}
        <g fontFamily={FONT} fontWeight={700} textAnchor="middle">
          <text x={960} y={420} fontSize={64} fill="#FFF" stroke="#5F3DC4" strokeWidth={12} paintOrder="stroke">
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
      {audio && <Html5Audio src={staticFile('audio/sfx-sparkle.mp3')} volume={0.4} />}
    </AbsoluteFill>
  );
};
