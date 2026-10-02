import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BackgroundView } from '../backgrounds/Backgrounds';
import { Character } from '../characters/Character';
import { restPose, type CharId } from '../characters/types';
import { PropView } from '../props/Props';
import { FONT, ensureFonts } from './fonts';
import type { Episode } from './script';

/** YouTube thumbnail: huge readable text + big expressive faces. */
export const Thumbnail: React.FC<{ episode: Episode }> = ({ episode }) => {
  ensureFonts();
  const th = episode.thumb ?? {};
  const text = th.text ?? episode.title.toUpperCase();
  const ids: CharId[] = ['papa', 'mama', 'hijo', 'hija'];
  const xs = [330, 760, 1180, 1560];
  const size = Math.min(200, 1750 / (text.length * 0.62));
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        <BackgroundView bg={th.bg ?? episode.scenes[0].bg} t={0} />
        <rect width={1920} height={1080} fill="#FFF" opacity={0.15} />
        {th.prop && (
          <g transform="translate(960 1020) scale(2.1)">
            <PropView kind={th.prop} t={0} />
          </g>
        )}
        {ids.map((id, i) => {
          const p = restPose(0.4);
          p.expr = th.exprs?.[id] ?? 'excited';
          p.lookX = i < 2 ? 0.5 : -0.5;
          p.armR = { up: 120, bend: 35 };
          p.armL = { up: i % 2 ? 140 : 30, bend: 20 };
          return <Character key={id} id={id} pose={p} x={xs[i]} y={1280} scale={1.45} facing={i < 2 ? 1 : -1} />;
        })}
        <g transform="translate(960 230) rotate(-3)" fontFamily={FONT} fontWeight={700} textAnchor="middle">
          <text fontSize={size} fill="#FFF" stroke="#5F3DC4" strokeWidth={size * 0.2} paintOrder="stroke" strokeLinejoin="round">
            {text}
          </text>
          <text fontSize={size} fill="#FFD43B">
            {text}
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
