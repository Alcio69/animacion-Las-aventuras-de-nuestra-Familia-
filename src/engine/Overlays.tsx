import React from 'react';
import { Html5Audio, Sequence, staticFile } from 'remotion';
import { DESIGNS } from '../characters/design';
import type { CharId } from '../characters/types';
import { FONT } from './fonts';
import { FPS, type CompiledScene, type LineEv } from './timeline';

/** Layers shared by the 2D and 3D versions: subtitles, title cards and per-scene audio. */
export const SceneAudio: React.FC<{ cs: CompiledScene }> = ({ cs }) => (
  <>
    {cs.scene.ambience && <Html5Audio src={staticFile(`audio/amb-${cs.scene.ambience}.mp3`)} loop volume={0.35} />}
    {cs.events.map((e, i) => {
          if (e.kind === 'line' && e.hasVoice)
            return (
              <Sequence key={i} from={Math.round(e.t0 * FPS)} name={`voz ${e.who}`}>
                <Html5Audio src={staticFile(`voices/${e.key}.mp3`)} />
              </Sequence>
            );
          if (e.kind === 'sfx')
            return (
              <Sequence key={i} from={Math.round(e.t0 * FPS)} name={`sfx ${e.sfx}`}>
                <Html5Audio src={staticFile(`audio/sfx-${e.sfx}.mp3`)} volume={0.55} />
              </Sequence>
            );
          return null;
        })}
  </>
);

export const Subtitle: React.FC<{ line: LineEv; t: number }> = ({ line, t }) => {
  const appear = Math.min(1, (t - line.t0) / 0.15, (line.t1 - t) / 0.15);
  const isNarr = line.who === 'narrador';
  const color = isNarr ? '#5F3DC4' : DESIGNS[line.who as CharId].accent;
  const name = isNarr ? 'Narrador' : DESIGNS[line.who as CharId].name;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 46, display: 'flex', justifyContent: 'center', opacity: appear, transform: `translateY(${(1 - appear) * 20}px)` }}>
      <div
        style={{
          maxWidth: 1500,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          background: 'rgba(255,255,255,0.94)',
          borderRadius: 30,
          padding: '16px 32px 16px 18px',
          boxShadow: '0 8px 0 rgba(0,0,0,0.12)',
          border: `5px solid ${color}`,
        }}
      >
        <span style={{ background: color, color: '#fff', borderRadius: 18, padding: '4px 16px', fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap' }}>{name}</span>
        <span style={{ color: '#2B2140', fontSize: 42, fontWeight: 600, lineHeight: 1.15, fontStyle: isNarr ? 'italic' : 'normal' }}>{line.text}</span>
      </div>
    </div>
  );
};

export const TitleCard: React.FC<{ text: string; k: number }> = ({ text, k }) => {
  const s = Math.min(1, k * 6, (1 - k) * 6);
  return (
    <g transform={`translate(960 200) scale(${0.6 + 0.4 * s}) rotate(${-3})`} opacity={s} fontFamily={FONT} fontWeight={700} textAnchor="middle">
      <rect x={-460} y={-80} width={920} height={130} rx={60} fill="#FFF" stroke="#7048E8" strokeWidth={8} />
      <text y={20} fontSize={70} fill="#7048E8">
        {text}
      </text>
    </g>
  );
};

