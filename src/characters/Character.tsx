import React, { useId } from 'react';
import { DESIGNS, type Design } from './design';
import { Head } from './Head';
import type { Arm, CharId, Pose } from './types';

/**
 * Draws one family member. Origin = point between the feet on the floor.
 * Everything is vector, so it stays crisp at any resolution.
 */
export const Character: React.FC<{
  id: CharId;
  pose: Pose;
  x?: number;
  y?: number;
  scale?: number;
  facing?: 1 | -1;
}> = ({ id, pose, x = 0, y = 0, scale = 1, facing = 1 }) => {
  const d = DESIGNS[id];
  const uid = `c${id}${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const hipY = -d.legH;
  const shoulderY = hipY - d.torsoH;
  const headY = shoulderY - d.headR * 0.72;
  const sq = pose.squash;
  const shadowK = Math.max(0.4, 1 - pose.lift / 400);

  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`}>
      <Defs d={d} uid={uid} />
      {/* floor shadow */}
      <ellipse cx={0} cy={0} rx={d.torsoBottom * 0.95 * shadowK} ry={16 * shadowK} fill="#000" opacity={0.16 * shadowK} />

      <g transform={`translate(0 ${-pose.lift}) scale(${1 / Math.sqrt(sq)} ${sq})`}>
        <Tail d={d} pose={pose} hipY={hipY} />
        {d.extras.includes('backpack') && <BackpackBack d={d} shoulderY={shoulderY + pose.bob} />}

        <Leg d={d} side={-1} angle={pose.legL} hipY={hipY} uid={uid} />
        <Leg d={d} side={1} angle={pose.legR} hipY={hipY} uid={uid} />

        <g transform={`rotate(${pose.bodyTilt} 0 ${hipY}) translate(0 ${pose.bob})`}>
          <Pelvis d={d} hipY={hipY} uid={uid} />
          <Torso d={d} shoulderY={shoulderY} uid={uid} />
          <g transform={`translate(0 ${headY}) rotate(${pose.headTilt} 0 ${d.headR * 0.7}) translate(0 ${pose.bob * 0.35})`}>
            <Head d={d} pose={pose} uid={uid} />
          </g>
          <ArmView d={d} side={-1} arm={pose.armL} shoulderY={shoulderY} uid={uid} />
          <ArmView d={d} side={1} arm={pose.armR} shoulderY={shoulderY} uid={uid} />
        </g>
      </g>
    </g>
  );
};

const Defs: React.FC<{ d: Design; uid: string }> = ({ d, uid }) => (
  <defs>
    <radialGradient id={`${uid}-fur`} cx="40%" cy="30%" r="75%">
      <stop offset="0%" stopColor={d.fur.light} />
      <stop offset="55%" stopColor={d.fur.base} />
      <stop offset="100%" stopColor={d.fur.dark} />
    </radialGradient>
    <radialGradient id={`${uid}-ear`} cx="30%" cy="20%" r="90%">
      <stop offset="0%" stopColor={d.fur.base} />
      <stop offset="100%" stopColor={d.fur.ear} />
    </radialGradient>
    <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={d.top.light} />
      <stop offset="45%" stopColor={d.top.base} />
      <stop offset="100%" stopColor={d.top.dark} />
    </linearGradient>
    <linearGradient id={`${uid}-bottom`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={d.bottom.base} />
      <stop offset="100%" stopColor={d.bottom.dark} />
    </linearGradient>
    <linearGradient id={`${uid}-limb`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={d.fur.light} />
      <stop offset="100%" stopColor={d.fur.dark} />
    </linearGradient>
  </defs>
);

const Tail: React.FC<{ d: Design; pose: Pose; hipY: number }> = ({ d, pose, hipY }) => {
  if (d.species === 'dog') {
    const a = Math.sin(pose.t * 14) * 22 * pose.wag;
    return (
      <g transform={`translate(${d.torsoBottom * 0.2} ${hipY + 10}) rotate(${a - 10})`}>
        <path d="M 0 0 C 50 10 95 -10 110 -70" stroke={d.fur.dark} strokeWidth={30 * (d.headR / 96)} strokeLinecap="round" fill="none" />
        <path d="M 0 0 C 50 10 95 -10 110 -70" stroke={d.fur.base} strokeWidth={22 * (d.headR / 96)} strokeLinecap="round" fill="none" />
      </g>
    );
  }
  const k = d.headR / 90;
  const sway = Math.sin(pose.t * 2.1) * 14;
  const curl = Math.sin(pose.t * 1.6 + 1) * 20;
  const p = `M 0 0 C ${60 * k} ${20 * k} ${115 * k} ${-5 * k} ${110 * k} ${-80 * k} S ${(150 + curl) * k} ${-170 * k} ${(118 + curl) * k} ${-200 * k}`;
  return (
    <g transform={`translate(${d.torsoBottom * 0.15} ${hipY + 15}) rotate(${sway - 5})`}>
      <path d={p} stroke={d.id === 'mama' ? '#0E0D12' : d.fur.dark} strokeWidth={24 * k} strokeLinecap="round" fill="none" />
      <path d={p} stroke={d.fur.base} strokeWidth={17 * k} strokeLinecap="round" fill="none" />
      {d.fur.stripe && <path d={p} stroke={d.fur.stripe} strokeWidth={17 * k} strokeDasharray={`${10 * k} ${22 * k}`} fill="none" />}
    </g>
  );
};

const Leg: React.FC<{ d: Design; side: -1 | 1; angle: number; hipY: number; uid: string }> = ({ d, side, angle, hipY, uid }) => {
  const hx = side * d.torsoBottom * 0.24;
  const L = d.legH;
  const w = d.legW;
  const shoe = <Shoe d={d} side={side} L={L} />;
  if (d.bottom.kind === 'jeans') {
    return (
      <g transform={`translate(${hx} ${hipY}) rotate(${angle})`}>
        <path
          d={`M ${-w / 2} 0 L ${w / 2} 0 L ${w * 0.47} ${L - 14} Q ${w * 0.47} ${L - 6} ${w * 0.4} ${L - 6} L ${-w * 0.4} ${L - 6} Q ${-w * 0.47} ${L - 6} ${-w * 0.47} ${L - 14} Z`}
          fill={`url(#${uid}-bottom)`}
          stroke={d.bottom.dark}
          strokeWidth={3}
        />
        {d.id === 'papa' && <rect x={-w * 0.5} y={L - 28} width={w} height={16} rx={5} fill="#4A64A0" stroke={d.bottom.dark} strokeWidth={2.5} />}
        <line x1={side * w * 0.18} y1={10} x2={side * w * 0.22} y2={L - 30} stroke={d.bottom.dark} strokeWidth={2} strokeDasharray="5 6" opacity={0.6} />
        {shoe}
      </g>
    );
  }
  // shorts / overall shorts: fur legs below
  const sl = L * 0.5;
  return (
    <g transform={`translate(${hx} ${hipY}) rotate(${angle})`}>
      <rect x={-w * 0.3} y={sl - 10} width={w * 0.6} height={L - sl} rx={w * 0.3} fill={`url(#${uid}-limb)`} stroke={d.fur.dark} strokeWidth={2.5} />
      <rect x={-w * 0.33} y={L - 26} width={w * 0.66} height={14} rx={6} fill="#FFFFFF" stroke="#D8D2C8" strokeWidth={2} />
      <path
        d={`M ${-w * 0.55} 0 L ${w * 0.55} 0 L ${w * 0.62} ${sl} Q ${w * 0.62} ${sl + 6} ${w * 0.55} ${sl + 6} L ${-w * 0.55} ${sl + 6} Q ${-w * 0.62} ${sl + 6} ${-w * 0.62} ${sl} Z`}
        fill={`url(#${uid}-bottom)`}
        stroke={d.bottom.dark}
        strokeWidth={3}
      />
      {d.bottom.kind === 'shorts' && <rect x={side > 0 ? w * 0.1 : -w * 0.5} y={sl * 0.35} width={w * 0.4} height={sl * 0.42} rx={4} fill={d.bottom.dark} opacity={0.6} />}
      {shoe}
    </g>
  );
};

const Shoe: React.FC<{ d: Design; side: -1 | 1; L: number }> = ({ d, side, L }) => {
  const w = d.legW * 1.55;
  const h = d.legW * 0.62;
  const toe = side * w * 0.18;
  return (
    <g transform={`translate(${toe} ${L})`}>
      <path
        d={`M ${-w / 2} 0 Q ${-w / 2} ${-h * 1.1} ${-w * 0.05} ${-h * 1.05} Q ${w * 0.5} ${-h * 0.95} ${w / 2} ${-h * 0.15} L ${w / 2} 0 Z`}
        transform={side < 0 ? 'scale(-1 1)' : undefined}
        fill={d.shoes.base}
        stroke={d.shoes.dark}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        d={`M ${-w * 0.2} ${-h * 0.95} Q ${w * 0.1} ${-h * 0.98} ${w * 0.2} ${-h * 0.6}`}
        transform={side < 0 ? 'scale(-1 1)' : undefined}
        stroke={d.id === 'papa' ? d.shoes.dark : '#FFFFFF'}
        strokeWidth={4}
        strokeDasharray="2 7"
        strokeLinecap="round"
        fill="none"
      />
      <rect x={-w / 2 - 2} y={-h * 0.28} width={w + 4} height={h * 0.32} rx={h * 0.15} fill={d.shoes.sole} stroke={d.shoes.dark} strokeWidth={2.5} />
    </g>
  );
};

const Pelvis: React.FC<{ d: Design; hipY: number; uid: string }> = ({ d, hipY, uid }) => {
  const w = d.torsoBottom;
  const fill = d.bottom.kind === 'jeans' ? `url(#${uid}-bottom)` : d.bottom.base;
  return <path d={`M ${-w / 2} ${hipY - 24} L ${w / 2} ${hipY - 24} L ${w * 0.47} ${hipY + 26} L ${-w * 0.47} ${hipY + 26} Z`} fill={fill} stroke={d.bottom.dark} strokeWidth={3} strokeLinejoin="round" />;
};

const torsoPath = (tw: number, bw: number, h: number) => {
  const r = Math.min(tw * 0.32, 34);
  const bulge = Math.max(tw, bw) / 2 + 5;
  return `M ${-tw / 2} ${r} Q ${-tw / 2} 0 ${-tw / 2 + r} 0 L ${tw / 2 - r} 0 Q ${tw / 2} 0 ${tw / 2} ${r}
    Q ${bulge} ${h * 0.55} ${bw / 2} ${h - 8} Q ${bw / 2} ${h} ${bw / 2 - 8} ${h} L ${-bw / 2 + 8} ${h} Q ${-bw / 2} ${h} ${-bw / 2} ${h - 8}
    Q ${-bulge} ${h * 0.55} ${-tw / 2} ${r} Z`;
};

const Torso: React.FC<{ d: Design; shoulderY: number; uid: string }> = ({ d, shoulderY, uid }) => {
  const tw = d.torsoTop;
  const bw = d.torsoBottom;
  const h = d.torsoH;
  const dark = d.top.dark;
  const body = torsoPath(tw, bw, h);
  return (
    <g transform={`translate(0 ${shoulderY})`}>
      {/* neck */}
      <rect x={-d.headR * 0.22} y={-28} width={d.headR * 0.44} height={40} fill={d.fur.base} />

      {d.outfit === 'overalls' ? (
        <g>
          <path d={body} fill={d.inner} stroke="#D98AAE" strokeWidth={3} />
          <path d={`M ${-tw * 0.2} 2 Q 0 ${h * 0.16} ${tw * 0.2} 2`} fill={d.fur.base} stroke="#D98AAE" strokeWidth={3} />
          <path
            d={`M ${-bw * 0.36} ${h * 0.36} Q ${-bw * 0.36} ${h * 0.3} ${-bw * 0.3} ${h * 0.3} L ${bw * 0.3} ${h * 0.3} Q ${bw * 0.36} ${h * 0.3} ${bw * 0.36} ${h * 0.36} L ${bw * 0.5} ${h} L ${-bw * 0.5} ${h} Z`}
            fill={`url(#${uid}-top)`}
            stroke={dark}
            strokeWidth={3}
          />
          <rect x={-bw * 0.16} y={h * 0.45} width={bw * 0.32} height={h * 0.22} rx={5} fill={dark} opacity={0.55} />
          <g stroke={d.top.base} strokeWidth={12} strokeLinecap="round">
            <line x1={-bw * 0.3} y1={h * 0.34} x2={-tw * 0.36} y2={2} />
            <line x1={bw * 0.3} y1={h * 0.34} x2={tw * 0.36} y2={2} />
          </g>
          <circle cx={-bw * 0.28} cy={h * 0.37} r={6} fill="#FFD43B" stroke="#C99A00" strokeWidth={2} />
          <circle cx={bw * 0.28} cy={h * 0.37} r={6} fill="#FFD43B" stroke="#C99A00" strokeWidth={2} />
        </g>
      ) : (
        <g>
          {/* hood behind neck */}
          {(d.outfit === 'jacket' || d.outfit === 'hoodie') && (
            <path d={`M ${-tw * 0.36} 14 Q 0 -44 ${tw * 0.36} 14`} stroke={dark} strokeWidth={30} fill="none" strokeLinecap="round" />
          )}
          <path d={body} fill={`url(#${uid}-top)`} stroke={dark} strokeWidth={3} />
          {d.outfit === 'jacket' && (
            <g>
              <path d={`M ${-tw * 0.17} 0 L ${tw * 0.17} 0 L ${bw * 0.22} ${h - 2} L ${-bw * 0.22} ${h - 2} Z`} fill={d.inner} stroke="#D8CCB0" strokeWidth={2.5} />
              <path d={`M ${-tw * 0.17} 0 L ${-bw * 0.22} ${h}`} stroke={dark} strokeWidth={6} />
              <path d={`M ${tw * 0.17} 0 L ${bw * 0.22} ${h}`} stroke={dark} strokeWidth={6} />
              <path d={`M ${-tw * 0.17} 2 Q 0 26 ${tw * 0.17} 2`} fill={d.fur.base} stroke="#D8CCB0" strokeWidth={2.5} />
              <path d={`M ${-bw * 0.46} ${h * 0.62} L ${-bw * 0.3} ${h * 0.58}`} stroke={dark} strokeWidth={4} strokeLinecap="round" />
              <path d={`M ${bw * 0.46} ${h * 0.62} L ${bw * 0.3} ${h * 0.58}`} stroke={dark} strokeWidth={4} strokeLinecap="round" />
            </g>
          )}
          {d.outfit === 'hoodie' && (
            <g>
              <path d={`M ${-bw * 0.3} ${h * 0.58} L ${bw * 0.3} ${h * 0.58} L ${bw * 0.38} ${h - 14} L ${-bw * 0.38} ${h - 14} Z`} fill={dark} opacity={0.45} />
              <g stroke="#F4F4F4" strokeWidth={4} strokeLinecap="round">
                <line x1={-10} y1={6} x2={-13} y2={44} />
                <line x1={10} y1={6} x2={13} y2={44} />
              </g>
              <path d={`M ${-tw * 0.18} 2 Q 0 20 ${tw * 0.18} 2`} fill={d.fur.base} stroke={dark} strokeWidth={3} />
            </g>
          )}
          {d.outfit === 'sweater' && (
            <g>
              <rect x={-tw * 0.26} y={-20} width={tw * 0.52} height={34} rx={14} fill={d.top.light} stroke={dark} strokeWidth={3} />
              {[-2, -1, 0, 1, 2].map((i) => (
                <line key={i} x1={i * tw * 0.09} y1={-14} x2={i * tw * 0.09} y2={8} stroke={dark} strokeWidth={2} opacity={0.5} />
              ))}
              <path d={`M ${-tw * 0.1} ${h * 0.25} Q 0 ${h * 0.32} ${tw * 0.1} ${h * 0.25}`} stroke={dark} strokeWidth={2.5} fill="none" opacity={0.4} />
            </g>
          )}
          {/* ribbed hem */}
          <rect x={-bw / 2} y={h - 16} width={bw} height={16} rx={7} fill={dark} opacity={0.8} />
          {d.extras.includes('backpack') && (
            <g stroke="#2E3440" strokeWidth={12} strokeLinecap="round">
              <line x1={-tw * 0.38} y1={4} x2={-tw * 0.36} y2={h * 0.55} />
              <line x1={tw * 0.38} y1={4} x2={tw * 0.36} y2={h * 0.55} />
            </g>
          )}
        </g>
      )}
    </g>
  );
};

const BackpackBack: React.FC<{ d: Design; shoulderY: number }> = ({ d, shoulderY }) => {
  const w = d.torsoTop + 34;
  return (
    <g>
      <rect x={-w / 2} y={shoulderY - 6} width={w} height={d.torsoH * 0.88} rx={24} fill="#3B4252" stroke="#20242D" strokeWidth={3} />
      <rect x={-w / 2 - 6} y={shoulderY + d.torsoH * 0.4} width={22} height={d.torsoH * 0.36} rx={9} fill="#4C566A" stroke="#20242D" strokeWidth={3} />
      <rect x={w / 2 - 16} y={shoulderY + d.torsoH * 0.4} width={22} height={d.torsoH * 0.36} rx={9} fill="#4C566A" stroke="#20242D" strokeWidth={3} />
    </g>
  );
};

const ArmView: React.FC<{ d: Design; side: -1 | 1; arm: Arm; shoulderY: number; uid: string }> = ({ d, side, arm, shoulderY, uid }) => {
  const w = d.armW;
  const ua = d.armLen * 0.48;
  const fa = d.armLen * 0.45;
  const sx = side * (d.torsoTop / 2 - w * 0.42);
  const sy = shoulderY + w * 0.55;
  const rot = (deg: number) => (side < 0 ? deg : -deg);
  const shortSleeve = d.outfit === 'overalls';
  const sleeveFill = shortSleeve ? d.inner! : `url(#${uid}-top)`;
  const sleeveStroke = shortSleeve ? '#D98AAE' : d.top.dark;
  const furArm = `url(#${uid}-limb)`;
  return (
    <g transform={`translate(${sx} ${sy}) rotate(${rot(arm.up)})`}>
      {/* upper arm */}
      {shortSleeve && <rect x={-w * 0.4} y={-w * 0.3} width={w * 0.8} height={ua + w * 0.5} rx={w * 0.4} fill={furArm} stroke={d.fur.dark} strokeWidth={2.5} />}
      <rect
        x={-w / 2}
        y={-w / 2}
        width={w}
        height={shortSleeve ? ua * 0.6 + w / 2 : ua + w}
        rx={w / 2}
        fill={sleeveFill}
        stroke={sleeveStroke}
        strokeWidth={3}
      />
      <g transform={`translate(0 ${ua}) rotate(${rot(arm.bend)})`}>
        {shortSleeve ? (
          <rect x={-w * 0.4} y={-w * 0.4} width={w * 0.8} height={fa + w * 0.4} rx={w * 0.4} fill={furArm} stroke={d.fur.dark} strokeWidth={2.5} />
        ) : (
          <>
            <rect x={-w / 2} y={-w / 2} width={w} height={fa + w * 0.3} rx={w / 2} fill={sleeveFill} stroke={sleeveStroke} strokeWidth={3} />
            <rect x={-w * 0.52} y={fa - w * 0.35} width={w * 1.04} height={w * 0.42} rx={w * 0.2} fill={d.top.dark} />
          </>
        )}
        {/* paw */}
        <g transform={`translate(0 ${fa + w * 0.25})`}>
          <ellipse cx={0} cy={0} rx={w * 0.6} ry={w * 0.58} fill={`url(#${uid}-fur)`} stroke={d.id === 'mama' ? '#0E0D12' : d.fur.dark} strokeWidth={3} />
          <g stroke={d.id === 'mama' ? '#0E0D12' : d.fur.dark} strokeWidth={2.2} strokeLinecap="round" opacity={0.8}>
            <line x1={-w * 0.18} y1={w * 0.22} x2={-w * 0.2} y2={w * 0.5} />
            <line x1={w * 0.12} y1={w * 0.24} x2={w * 0.13} y2={w * 0.52} />
          </g>
        </g>
      </g>
    </g>
  );
};
