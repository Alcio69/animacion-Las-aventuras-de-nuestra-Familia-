'use client';

import React from 'react';
import { Character } from '../src/characters/Character';
import { DESIGNS } from '../src/characters/design';
import { restPose, type CharId, type Expression } from '../src/characters/types';
import { Logo } from '../src/engine/Logo';

/** Static (non-video) renders of the logo and the characters for the website. */
export const LogoArt = () => (
  <svg className="logo" viewBox="-480 -230 960 450" role="img" aria-label="Las Aventuras de Nuestra Familia">
    <Logo t={0.3} />
  </svg>
);

export const FamilyArt = () => {
  const ids: CharId[] = ['papa', 'mama', 'hijo', 'hija'];
  const exprs: Expression[] = ['happy', 'love', 'excited', 'laugh'];
  return (
    <svg className="family" viewBox="0 330 1600 600" role="img" aria-label="La familia">
      {ids.map((id, i) => {
        const p = restPose(0.4);
        p.expr = exprs[i];
        if (i === 3) p.armR = { up: 125, bend: 35 };
        if (i === 0) {
          p.armL = { up: 38, bend: -112 };
          p.armR = { up: 38, bend: -112 };
        }
        return <Character key={id} id={id} pose={p} x={260 + i * 360} y={900} />;
      })}
    </svg>
  );
};

export const CharacterArt = ({ id }: { id: CharId }) => {
  const d = DESIGNS[id];
  const p = restPose(0.4);
  p.expr = 'happy';
  p.lookX = 0.3;
  const h = d.legH + d.torsoH + d.headR * 2.4;
  return (
    <svg viewBox={`-260 ${-h - 10} 520 ${h + 30}`}>
      <Character id={id} pose={p} />
    </svg>
  );
};
