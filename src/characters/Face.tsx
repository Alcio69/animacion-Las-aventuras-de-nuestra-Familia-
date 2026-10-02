import React from 'react';
import type { Design } from './design';
import type { Expression, Pose } from './types';

/** What each expression does to eyes, brows and mouth. */
type FaceSpec = {
  eyes: 'open' | 'happy' | 'wide' | 'wink' | 'love' | 'sleepy' | 'sad';
  brow: number; // angle: + = inner ends down (angry), - = inner ends up (sad/worried)
  browRaise: number; // px factor
  mouth: 'smile' | 'grin' | 'o' | 'frown' | 'flat' | 'tongue' | 'smirk';
  blush: boolean;
};

export const FACES: Record<Expression, FaceSpec> = {
  neutral: { eyes: 'open', brow: 0, browRaise: 0, mouth: 'smile', blush: false },
  happy: { eyes: 'open', brow: -4, browRaise: 0.15, mouth: 'grin', blush: false },
  laugh: { eyes: 'happy', brow: -6, browRaise: 0.25, mouth: 'grin', blush: true },
  excited: { eyes: 'wide', brow: -8, browRaise: 0.35, mouth: 'tongue', blush: true },
  surprised: { eyes: 'wide', brow: -6, browRaise: 0.55, mouth: 'o', blush: false },
  sad: { eyes: 'sad', brow: -22, browRaise: 0.1, mouth: 'frown', blush: false },
  angry: { eyes: 'open', brow: 24, browRaise: -0.15, mouth: 'flat', blush: false },
  worried: { eyes: 'open', brow: -18, browRaise: 0.25, mouth: 'flat', blush: false },
  wink: { eyes: 'wink', brow: -4, browRaise: 0.2, mouth: 'smirk', blush: false },
  love: { eyes: 'love', brow: -6, browRaise: 0.2, mouth: 'grin', blush: true },
  sleepy: { eyes: 'sleepy', brow: -4, browRaise: -0.05, mouth: 'smile', blush: false },
  proud: { eyes: 'happy', brow: 2, browRaise: 0.1, mouth: 'smirk', blush: true },
};

const INK = '#2A1A16';
const MOUTH = '#6B1F2C';
const TONGUE = '#F27F94';

export const Eye: React.FC<{
  d: Design;
  uid: string;
  side: -1 | 1;
  cx: number;
  cy: number;
  s: number;
  pose: Pose;
  spec: FaceSpec;
}> = ({ d, uid, side, cx, cy, s, pose, spec }) => {
  const cat = d.species === 'cat';
  let mode = spec.eyes;
  if (mode === 'wink') mode = side === -1 ? 'happy' : 'open';
  const lineW = s * 0.26;

  if (mode === 'happy') {
    return (
      <path
        d={`M ${cx - s * 0.95} ${cy + s * 0.25} Q ${cx} ${cy - s * 0.95} ${cx + s * 0.95} ${cy + s * 0.25}`}
        stroke={INK}
        strokeWidth={lineW}
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  if (mode === 'love') {
    const h = s * 1.1;
    return (
      <path
        transform={`translate(${cx} ${cy - h * 0.15}) scale(${1 + Math.sin(pose.t * 9) * 0.08})`}
        d={`M 0 ${h * 0.75} C ${-h * 1.3} ${-h * 0.05} ${-h * 0.55} ${-h * 0.95} 0 ${-h * 0.3} C ${h * 0.55} ${-h * 0.95} ${h * 1.3} ${-h * 0.05} 0 ${h * 0.75} Z`}
        fill="#F0426B"
        stroke="#B51D45"
        strokeWidth={s * 0.08}
      />
    );
  }

  const wide = mode === 'wide';
  const rx = s * (wide ? 1.05 : 1);
  const ry = s * (cat ? 1.12 : 1.18) * (wide ? 1.12 : 1);
  const irisR = s * (cat ? 0.8 : 0.72) * (wide ? 0.82 : 1);
  const lid = Math.min(1, pose.blink + (mode === 'sleepy' ? 0.5 : 0) + (mode === 'sad' ? 0.18 : 0));
  const lx = cx + pose.lookX * s * 0.32;
  const ly = cy + pose.lookY * s * 0.3 + (mode === 'sad' ? s * 0.18 : 0);
  const clip = `${uid}-eye${side}`;

  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
        </clipPath>
        <radialGradient id={`${clip}-iris`} cx="50%" cy="65%" r="60%">
          <stop offset="0%" stopColor={d.iris} stopOpacity={1} />
          <stop offset="55%" stopColor={d.iris} />
          <stop offset="100%" stopColor={d.irisDark} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#FFFFFF" stroke={INK} strokeOpacity={0.55} strokeWidth={s * 0.09} />
      <g clipPath={`url(#${clip})`}>
        <ellipse cx={cx} cy={cy + ry * 0.55} rx={rx} ry={ry * 0.5} fill="#E3E8F0" opacity={0.6} />
        <circle cx={lx} cy={ly} r={irisR} fill={`url(#${clip}-iris)`} />
        {cat ? (
          <ellipse cx={lx} cy={ly} rx={irisR * (wide ? 0.55 : 0.36)} ry={irisR * 0.78} fill="#111" />
        ) : (
          <circle cx={lx} cy={ly} r={irisR * (wide ? 0.42 : 0.52)} fill="#120C0A" />
        )}
        <circle cx={lx - irisR * 0.32} cy={ly - irisR * 0.38} r={irisR * 0.34} fill="#fff" />
        <circle cx={lx + irisR * 0.36} cy={ly + irisR * 0.34} r={irisR * 0.13} fill="#fff" opacity={0.9} />
        {/* eyelid */}
        {lid > 0.01 && (
          <rect
            x={cx - rx - 2}
            y={cy - ry - 2}
            width={rx * 2 + 4}
            height={(ry * 2 + 4) * lid}
            fill={d.fur.base}
          />
        )}
        {lid > 0.01 && (
          <line
            x1={cx - rx}
            x2={cx + rx}
            y1={cy - ry - 2 + (ry * 2 + 4) * lid}
            y2={cy - ry - 2 + (ry * 2 + 4) * lid}
            stroke={INK}
            strokeWidth={s * 0.14}
            strokeLinecap="round"
          />
        )}
      </g>
      {d.lashes && lid < 0.9 && (
        <g stroke={INK} strokeWidth={s * 0.13} strokeLinecap="round">
          <line x1={cx + side * rx * 0.72} y1={cy - ry * 0.7} x2={cx + side * rx * 1.12} y2={cy - ry * 1.02} />
          <line x1={cx + side * rx * 0.93} y1={cy - ry * 0.38} x2={cx + side * rx * 1.32} y2={cy - ry * 0.56} />
        </g>
      )}
    </g>
  );
};

export const Brow: React.FC<{ d: Design; side: -1 | 1; cx: number; cy: number; s: number; spec: FaceSpec; color: string }> = ({
  side,
  cx,
  cy,
  s,
  spec,
  color,
}) => {
  const y = cy - s * (1.55 + spec.browRaise);
  const len = s * 0.95;
  // inner end is towards the face center (-side direction)
  const ang = spec.brow * side * -1;
  return (
    <g transform={`translate(${cx} ${y}) rotate(${ang})`}>
      <path
        d={`M ${-len / 2} ${s * 0.08} Q 0 ${-s * 0.22} ${len / 2} ${s * 0.08}`}
        stroke={color}
        strokeWidth={s * 0.3}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
};

/** Mouth centered at (0,0), width w. */
export const Mouth: React.FC<{ w: number; spec: FaceSpec; open: number; species: 'dog' | 'cat' }> = ({ w, spec, open, species }) => {
  const sw = w * 0.085;
  const talking = open > 0.06;
  let kind = spec.mouth;
  if (talking && (kind === 'smile' || kind === 'smirk' || kind === 'flat')) kind = 'grin';

  if (kind === 'o') {
    const r = w * (0.17 + open * 0.12);
    return (
      <g>
        <ellipse cx={0} cy={w * 0.12} rx={r * 0.85} ry={r * 1.1} fill={MOUTH} stroke={INK} strokeWidth={sw * 0.8} />
        <ellipse cx={0} cy={w * 0.12 + r * 0.55} rx={r * 0.5} ry={r * 0.35} fill={TONGUE} />
      </g>
    );
  }
  if (kind === 'grin' || kind === 'tongue') {
    const h = w * (0.18 + (talking ? open * 0.42 : kind === 'tongue' ? 0.35 : 0.26));
    const top = species === 'dog' ? w * 0.02 : w * 0.0;
    const path = `M ${-w / 2} ${top} Q 0 ${top + w * 0.14} ${w / 2} ${top} Q ${w * 0.42} ${top + h * 1.25} 0 ${top + h * 1.3} Q ${-w * 0.42} ${top + h * 1.25} ${-w / 2} ${top} Z`;
    return (
      <g>
        <defs>
          <clipPath id={`m-${Math.round(w)}-${Math.round(h * 10)}`}>
            <path d={path} />
          </clipPath>
        </defs>
        <path d={path} fill={MOUTH} stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
        <g clipPath={`url(#m-${Math.round(w)}-${Math.round(h * 10)})`}>
          <ellipse cx={0} cy={top + h * 1.25} rx={w * 0.3} ry={h * 0.55} fill={TONGUE} />
          <rect x={-w * 0.3} y={top - 2} width={w * 0.6} height={w * 0.11} rx={w * 0.04} fill="#fff" />
        </g>
        {kind === 'tongue' && !talking && (
          <path
            d={`M ${-w * 0.16} ${top + h * 1.05} Q ${-w * 0.2} ${top + h * 1.9} 0 ${top + h * 1.95} Q ${w * 0.2} ${top + h * 1.9} ${w * 0.16} ${top + h * 1.05} Z`}
            fill={TONGUE}
            stroke="#C9536A"
            strokeWidth={sw * 0.7}
          />
        )}
      </g>
    );
  }
  if (kind === 'frown') {
    return (
      <path
        d={`M ${-w * 0.36} ${w * 0.2} Q 0 ${-w * 0.12} ${w * 0.36} ${w * 0.2}`}
        stroke={INK}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  if (kind === 'flat') {
    return (
      <path d={`M ${-w * 0.3} ${w * 0.08} Q 0 ${w * 0.02} ${w * 0.3} ${w * 0.1}`} stroke={INK} strokeWidth={sw} fill="none" strokeLinecap="round" />
    );
  }
  if (kind === 'smirk') {
    return (
      <path
        d={`M ${-w * 0.42} ${w * 0.02} Q ${-w * 0.1} ${w * 0.3} ${w * 0.3} ${w * 0.08} Q ${w * 0.42} ${w * 0.0} ${w * 0.48} ${-w * 0.08}`}
        stroke={INK}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  // smile: the classic "ω" pet smile
  return (
    <path
      d={`M ${-w / 2} ${-w * 0.02} Q ${-w / 4} ${w * 0.32} 0 ${w * 0.02} Q ${w / 4} ${w * 0.32} ${w / 2} ${-w * 0.02}`}
      stroke={INK}
      strokeWidth={sw}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};
