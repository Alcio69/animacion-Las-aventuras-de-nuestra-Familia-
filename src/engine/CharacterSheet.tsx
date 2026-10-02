import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../characters/Character';
import { DESIGNS } from '../characters/design';
import { Head } from '../characters/Head';
import { restPose, type CharId, type Expression } from '../characters/types';

const IDS: CharId[] = ['papa', 'mama', 'hijo', 'hija'];
const EXPRS: Expression[] = ['neutral', 'happy', 'laugh', 'excited', 'surprised', 'sad', 'angry', 'worried', 'wink', 'love', 'sleepy', 'proud'];

/** Model sheet: full bodies on top, expression row below. Good for checking design changes. */
export const CharacterSheet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#FFF7EC, #FBE7D3)' }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        {IDS.map((id, i) => {
          const p = restPose(t);
          p.expr = 'happy';
          p.lookX = 0.3;
          p.bob = Math.sin(t * 2 + i) * 3;
          p.yaw = [0.15, -0.55, 0.85, 0.45][i];
          if (id === 'hija') p.armR = { up: 118, bend: 30 + Math.sin(t * 10) * 20 };
          if (id === 'papa') p.armL = { up: 30, bend: -100 };
          if (id === 'hijo') {
            p.legL = 22; p.legR = -22; p.kneeR = 40; p.armL = { up: -15, bend: 20 }; p.armR = { up: 30, bend: 25 };
          }
          return (
            <g key={id}>
              <Character id={id} pose={p} x={260 + i * 470} y={600} />
              <text x={260 + i * 470} y={655} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={40} fill={DESIGNS[id].accent}>
                {DESIGNS[id].name}
              </text>
            </g>
          );
        })}
        {IDS.map((id, r) =>
          EXPRS.map((e, c) => {
            const p = restPose(t);
            p.expr = e;
            p.mouth = r === 3 && c === 0 ? 0.6 : 0;
            return (
              <g key={id + e} transform={`translate(${80 + c * 160} ${775 + r * 78}) scale(0.36)`}>
                <Head d={DESIGNS[id]} pose={p} uid={`sheet${id}`} />
              </g>
            );
          }),
        )}
        <defs>
          {IDS.map((id) => (
            <radialGradient key={id} id={`sheet${id}-fur`} cx="40%" cy="30%" r="75%">
              <stop offset="0%" stopColor={DESIGNS[id].fur.light} />
              <stop offset="55%" stopColor={DESIGNS[id].fur.base} />
              <stop offset="100%" stopColor={DESIGNS[id].fur.dark} />
            </radialGradient>
          ))}
          {IDS.map((id) => (
            <radialGradient key={id} id={`sheet${id}-ear`} cx="30%" cy="20%" r="90%">
              <stop offset="0%" stopColor={DESIGNS[id].fur.base} />
              <stop offset="100%" stopColor={DESIGNS[id].fur.ear} />
            </radialGradient>
          ))}
        </defs>
      </svg>
    </AbsoluteFill>
  );
};
