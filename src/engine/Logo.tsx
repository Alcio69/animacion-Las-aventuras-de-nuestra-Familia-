import React from 'react';
import { FONT } from './fonts';

const Paw: React.FC<{ x: number; y: number; s: number; r?: number; c: string }> = ({ x, y, s, r = 0, c }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill={c}>
    <ellipse cx={0} cy={8} rx={16} ry={13} />
    <circle cx={-15} cy={-10} r={7} />
    <circle cx={-5} cy={-19} r={7} />
    <circle cx={7} cy={-19} r={7} />
    <circle cx={17} cy={-9} r={7} />
  </g>
);

/** Series logo, centered on (0,0). About 900 x 330 at scale 1. */
export const Logo: React.FC<{ t?: number }> = ({ t = 0 }) => {
  const wob = (i: number) => Math.sin(t * 3 + i * 0.6) * 4;
  const big = 'Familia'.split('');
  const COLORS = ['#FF922B', '#F06595', '#7048E8', '#20C997', '#FCC419', '#4DABF7', '#FF6B6B'];
  return (
    <g fontFamily={FONT} fontWeight={700} textAnchor="middle" strokeLinejoin="round">
      <g transform={`rotate(-4) translate(0 ${wob(0)})`}>
        <text y={-95} fontSize={92} fill="#FFF" stroke="#5F3DC4" strokeWidth={18} paintOrder="stroke">
          Las Aventuras
        </text>
        <text y={-95} fontSize={92} fill="#7048E8">
          Las Aventuras
        </text>
      </g>
      <g transform={`rotate(-4) translate(0 ${wob(1)})`}>
        <text y={-5} fontSize={66} fill="#FFF" stroke="#5F3DC4" strokeWidth={16} paintOrder="stroke">
          de Nuestra
        </text>
        <text y={-5} fontSize={66} fill="#9775FA">
          de Nuestra
        </text>
      </g>
      <g transform={`rotate(-4) translate(0 ${130 + wob(2)})`}>
        <text fontSize={150} fill="#FFF" stroke="#5F3DC4" strokeWidth={22} paintOrder="stroke" letterSpacing={4}>
          Familia
        </text>
        <text fontSize={150} letterSpacing={4}>
          {big.map((ch, i) => (
            <tspan key={i} fill={COLORS[i]}>
              {ch}
            </tspan>
          ))}
        </text>
      </g>
      <Paw x={-420} y={60} s={1.6} r={-20} c="#9775FA" />
      <Paw x={410} y={-120} s={1.4} r={20} c="#FF922B" />
      <Paw x={460} y={-60} s={0.9} r={30} c="#FF922B" />
    </g>
  );
};
