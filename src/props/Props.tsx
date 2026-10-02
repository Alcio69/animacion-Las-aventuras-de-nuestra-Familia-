import React from 'react';
import type { Fx, PropKind } from '../engine/script';

/** Props are drawn with their base at (0,0) (they sit on the floor / counter). */
export const PropView: React.FC<{ kind: PropKind; t: number }> = ({ kind, t }) => {
  switch (kind) {
    case 'table':
      return (
        <g>
          <rect x={-18} y={-150} width={36} height={150} fill="#B07A4F" />
          <ellipse cx={0} cy={-2} rx={70} ry={12} fill="#9C6A43" />
          <path d="M -190 -160 L 190 -160 L 175 -70 Q 120 -50 90 -80 Q 40 -50 0 -80 Q -40 -50 -90 -80 Q -120 -50 -175 -70 Z" fill="#FFF0F6" stroke="#E599B9" strokeWidth={4} />
          <ellipse cx={0} cy={-160} rx={190} ry={26} fill="#FFDEEB" stroke="#E599B9" strokeWidth={4} />
        </g>
      );
    case 'cake':
      return (
        <g>
          <ellipse cx={0} cy={0} rx={130} ry={18} fill="#E9ECEF" stroke="#ADB5BD" strokeWidth={3} />
          <rect x={-105} y={-110} width={210} height={105} rx={18} fill="#F8C4D8" stroke="#D6869F" strokeWidth={4} />
          <rect x={-105} y={-70} width={210} height={16} fill="#FFF0F6" />
          <rect x={-80} y={-175} width={160} height={70} rx={16} fill="#FFDEEB" stroke="#D6869F" strokeWidth={4} />
          <path d="M -105 -100 Q -90 -70 -75 -100 Q -60 -70 -45 -100 Q -30 -70 -15 -100 Q 0 -70 15 -100 Q 30 -70 45 -100 Q 60 -70 75 -100 Q 90 -70 105 -100 L 105 -110 L -105 -110 Z" fill="#FFFFFF" />
          {[-50, 0, 50].map((x, i) => (
            <g key={x}>
              <rect x={x - 6} y={-225} width={12} height={50} rx={4} fill={['#74C0FC', '#FFD43B', '#B197FC'][i]} />
              <ellipse cx={x} cy={-238 + Math.sin(t * 20 + i) * 1.5} rx={7 + Math.sin(t * 15 + i)} ry={13} fill="#FFA94D" />
              <ellipse cx={x} cy={-235} rx={3.5} ry={7} fill="#FFF3BF" />
            </g>
          ))}
          {[-70, -35, 35, 70].map((x) => (
            <circle key={x} cx={x} cy={-30} r={8} fill="#E03131" />
          ))}
        </g>
      );
    case 'bowl':
      return (
        <g>
          <path d="M -90 -70 Q -90 0 0 0 Q 90 0 90 -70 Z" fill="#A5D8FF" stroke="#4DABF7" strokeWidth={4} />
          <ellipse cx={0} cy={-70} rx={90} ry={18} fill="#FFF9DB" stroke="#4DABF7" strokeWidth={4} />
          <g transform={`rotate(${Math.sin(t * 8) * 12} 0 -70)`}>
            <line x1={0} y1={-70} x2={40} y2={-170} stroke="#868E96" strokeWidth={7} strokeLinecap="round" />
            <ellipse cx={0} cy={-80} rx={16} ry={26} fill="none" stroke="#ADB5BD" strokeWidth={4} transform="rotate(22 0 -80)" />
          </g>
        </g>
      );
    case 'flour':
      return (
        <g>
          <path d="M -55 0 L -60 -120 Q -40 -140 -20 -125 Q 0 -140 20 -125 Q 40 -140 60 -120 L 55 0 Z" fill="#F8F9FA" stroke="#CED4DA" strokeWidth={4} />
          <rect x={-40} y={-80} width={80} height={46} rx={8} fill="#FFD43B" />
          <text x={0} y={-48} textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight={700} fontSize={22} fill="#7048E8">
            HARINA
          </text>
        </g>
      );
    case 'ball':
      return (
        <g transform={`translate(0 -45) rotate(${t * 60})`}>
          <circle r={45} fill="#FF6B6B" stroke="#C92A2A" strokeWidth={4} />
          <path d="M -45 0 Q 0 -25 45 0" stroke="#FFF" strokeWidth={10} fill="none" />
          <path d="M -40 20 Q 0 0 40 20" stroke="#FFD43B" strokeWidth={10} fill="none" />
        </g>
      );
    case 'balloon':
      return (
        <g transform={`rotate(${Math.sin(t * 1.5) * 5})`}>
          <path d="M 0 0 Q 15 -60 0 -120 T 0 -230" stroke="#868E96" strokeWidth={3} fill="none" />
          <ellipse cx={0} cy={-300} rx={55} ry={68} fill="#F06595" />
          <ellipse cx={-18} cy={-325} rx={12} ry={20} fill="#fff" opacity={0.5} />
          <path d="M -8 -232 L 8 -232 L 0 -244 Z" fill="#F06595" />
        </g>
      );
    case 'gift':
      return (
        <g>
          <rect x={-70} y={-110} width={140} height={110} rx={8} fill="#9775FA" stroke="#6741D9" strokeWidth={4} />
          <rect x={-80} y={-135} width={160} height={36} rx={8} fill="#B197FC" stroke="#6741D9" strokeWidth={4} />
          <rect x={-12} y={-135} width={24} height={135} fill="#FFD43B" />
          <path d="M 0 -135 Q -50 -190 -45 -140 Z M 0 -135 Q 50 -190 45 -140 Z" fill="#FFD43B" stroke="#F59F00" strokeWidth={3} />
        </g>
      );
    case 'book':
      return (
        <g transform="translate(0 -30)">
          <path d="M 0 0 L -80 -10 L -80 -70 L 0 -60 Z" fill="#74C0FC" stroke="#1C7ED6" strokeWidth={4} />
          <path d="M 0 0 L 80 -10 L 80 -70 L 0 -60 Z" fill="#A5D8FF" stroke="#1C7ED6" strokeWidth={4} />
        </g>
      );
    case 'cookie':
      return (
        <g transform="translate(0 -30)">
          <circle r={30} fill="#E8B26A" stroke="#B9813F" strokeWidth={3} />
          {[[-10, -8], [8, -12], [12, 8], [-6, 12]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4.5} fill="#5C3A1E" />
          ))}
        </g>
      );
    case 'star':
      return <path transform={`translate(0 -60) rotate(${t * 40}) scale(1.6)`} d="M 0 -30 L 9 -9 L 30 -9 L 13 5 L 19 27 L 0 14 L -19 27 L -13 5 L -30 -9 L -9 -9 Z" fill="#FFD43B" stroke="#F59F00" strokeWidth={3} />;
    case 'heart':
      return (
        <path
          transform={`translate(0 -60) scale(${1.8 + Math.sin(t * 6) * 0.1})`}
          d="M 0 22 C -40 -5 -20 -35 0 -14 C 20 -35 40 -5 0 22 Z"
          fill="#F0426B"
          stroke="#B51D45"
          strokeWidth={2}
        />
      );
    case 'plant':
    default:
      return (
        <g>
          <path d="M -40 0 L -50 -70 L 50 -70 L 40 0 Z" fill="#E07A5F" />
          <circle cx={0} cy={-110} r={50} fill="#66B86F" />
        </g>
      );
  }
};

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Particle effects. k = 0..1 progress, t = seconds since start. */
export const FxView: React.FC<{ fx: Fx; k: number; t: number }> = ({ fx, k, t }) => {
  const fade = Math.min(1, (1 - k) * 4, k * 8);
  switch (fx) {
    case 'hearts':
    case 'stars':
    case 'sparkle':
      return (
        <g opacity={fade}>
          {Array.from({ length: 9 }).map((_, i) => {
            const a = rnd(i) * Math.PI * 2;
            const r = 40 + k * (140 + rnd(i + 9) * 120);
            const x = Math.cos(a) * r;
            const y = Math.sin(a) * r * 0.7 - k * 120;
            const s = 0.6 + rnd(i + 3) * 0.8;
            return fx === 'hearts' ? (
              <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M 0 22 C -40 -5 -20 -35 0 -14 C 20 -35 40 -5 0 22 Z" fill={i % 2 ? '#F06595' : '#FF8787'} />
            ) : (
              <path
                key={i}
                transform={`translate(${x} ${y}) rotate(${t * 180 + i * 40}) scale(${s * (fx === 'sparkle' ? 0.6 : 1)})`}
                d="M 0 -30 L 9 -9 L 30 -9 L 13 5 L 19 27 L 0 14 L -19 27 L -13 5 L -30 -9 L -9 -9 Z"
                fill={fx === 'sparkle' ? '#FFFFFF' : ['#FFD43B', '#FFA94D', '#74C0FC'][i % 3]}
              />
            );
          })}
        </g>
      );
    case 'confetti':
      return (
        <g>
          {Array.from({ length: 70 }).map((_, i) => {
            const x = (rnd(i) - 0.5) * 1900;
            const y = -600 + ((rnd(i + 70) * 400 + t * (260 + rnd(i + 5) * 200)) % 1300);
            const c = ['#FF6B6B', '#FFD43B', '#69DB7C', '#4DABF7', '#B197FC', '#F783AC'][i % 6];
            return <rect key={i} x={x} y={y} width={16} height={9} fill={c} opacity={fade} transform={`rotate(${t * 300 * (rnd(i) - 0.5) + i * 20} ${x} ${y})`} />;
          })}
        </g>
      );
    case 'flour':
      return (
        <g opacity={fade}>
          {Array.from({ length: 22 }).map((_, i) => {
            const a = rnd(i) * Math.PI * 2;
            const burst = 1 - Math.pow(1 - Math.min(1, k * 2.5), 3);
            const r = burst * (60 + rnd(i + 2) * 240);
            return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r * 0.7 - k * 80} r={(50 + rnd(i + 4) * 60) * (0.4 + burst * 0.8)} fill={i % 3 ? '#FFFFFF' : '#F1F3F5'} opacity={0.92} />;
          })}
        </g>
      );
    case 'zzz':
      return (
        <g opacity={fade} fontFamily="Fredoka, sans-serif" fontWeight={700} fill="#E5DBFF">
          {[0, 1, 2].map((i) => {
            const q = (k * 2 + i * 0.33) % 1;
            return (
              <text key={i} x={q * 60} y={-q * 140} fontSize={30 + q * 30} opacity={1 - q}>
                Z
              </text>
            );
          })}
        </g>
      );
    case 'question':
    case 'exclaim':
      return (
        <g transform={`translate(0 ${-Math.abs(Math.sin(t * 6)) * 12}) scale(${Math.min(1, k * 8)})`} opacity={fade}>
          <circle r={42} fill="#FFFFFF" stroke="#343A40" strokeWidth={4} />
          <text y={22} textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight={700} fontSize={64} fill={fx === 'question' ? '#7048E8' : '#F03E3E'}>
            {fx === 'question' ? '?' : '!'}
          </text>
        </g>
      );
    case 'sweat':
      return <path opacity={fade} transform={`translate(0 ${k * 40})`} d="M 0 -20 Q 16 6 0 14 Q -16 6 0 -20 Z" fill="#74C0FC" stroke="#1C7ED6" strokeWidth={2} />;
    default:
      return null;
  }
};
