import React, { useId } from 'react';
import { DESIGNS, type Design } from './design';
import { Head } from './Head';
import type { Arm, CharId, Pose } from './types';

/**
 * 2.5D vector rig. Origin = point between the feet on the floor.
 * `pose.yaw` turns the body continuously from front view (0) to 3/4 / profile (±1):
 * features slide, far limbs go behind the torso, the tail swings to the back.
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
  const yaw = pose.yaw !== 0 ? pose.yaw : facing * 0.15;
  const a = Math.min(1, Math.abs(yaw));
  const sy: 1 | -1 = yaw < 0 ? -1 : 1;
  const P = { ...pose, yaw };
  const hipY = -d.legH;
  const shoulderY = hipY - d.torsoH;
  const headY = shoulderY - d.headR * 0.72;
  const sq = pose.squash;
  const shadowK = Math.max(0.4, 1 - pose.lift / 400);
  const far = sy; // limbs on this side are behind the body when turned
  const farLimbsBehind = a > 0.28;

  const legs = ([-1, 1] as const).map((side) => (
    <Leg key={side} d={d} side={side} swing={side < 0 ? pose.legL : pose.legR} knee={side < 0 ? pose.kneeL : pose.kneeR} hipY={hipY} uid={uid} yaw={yaw} dim={farLimbsBehind && side === far} />
  ));
  const arm = (side: -1 | 1) => (
    <ArmView key={side} d={d} side={side} arm={side < 0 ? pose.armL : pose.armR} swing={side < 0 ? pose.swingL : pose.swingR} shoulderY={shoulderY} uid={uid} yaw={yaw} dim={farLimbsBehind && side === far} />
  );

  return (
    <g transform={`translate(${x} ${y}) scale(${scale} ${scale})`}>
      <Defs d={d} uid={uid} />
      <ellipse cx={pose.hipX * 0.3} cy={0} rx={d.torsoBottom * 1.05 * shadowK} ry={20 * shadowK} fill={`url(#${uid}-shadow)`} />

      <g transform={`translate(0 ${-pose.lift}) scale(${1 / Math.sqrt(sq)} ${sq})`}>
        <Tail d={d} pose={P} hipY={hipY} />
        {d.extras.includes('backpack') && <BackpackBack d={d} shoulderY={shoulderY + pose.bob} yaw={yaw} />}
        {farLimbsBehind ? legs.filter((_, i) => (i === 0 ? -1 : 1) === far) : null}
        {legs.filter((_, i) => !farLimbsBehind || (i === 0 ? -1 : 1) !== far)}

        <g transform={`translate(${pose.hipX} ${pose.bob}) rotate(${pose.bodyTilt} 0 ${hipY})`}>
          {farLimbsBehind && arm(far)}
          <Pelvis d={d} hipY={hipY} uid={uid} yaw={yaw} />
          <Torso d={d} shoulderY={shoulderY} uid={uid} yaw={yaw} breath={pose.breath} />
          {/* ambient occlusion under the chin */}
          <ellipse cx={yaw * 10} cy={shoulderY + 6} rx={d.headR * 0.62} ry={d.headR * 0.2} fill={`url(#${uid}-ao)`} />
          <g transform={`translate(${yaw * d.headR * 0.08} ${headY + pose.bob * 0.25}) rotate(${pose.headTilt} 0 ${d.headR * 0.7})`}>
            <Head d={d} pose={P} uid={uid} />
          </g>
          {([-1, 1] as const).filter((s) => !(farLimbsBehind && s === far)).map((s) => arm(s))}
        </g>
      </g>
    </g>
  );
};

const Defs: React.FC<{ d: Design; uid: string }> = ({ d, uid }) => (
  <defs>
    <radialGradient id={`${uid}-fur`} cx="38%" cy="28%" r="78%">
      <stop offset="0%" stopColor={d.fur.light} />
      <stop offset="50%" stopColor={d.fur.base} />
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
    {/* rim light from the right + soft core shadow from the left */}
    <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#000" stopOpacity={0.14} />
      <stop offset="30%" stopColor="#000" stopOpacity={0} />
      <stop offset="78%" stopColor="#fff" stopOpacity={0} />
      <stop offset="100%" stopColor="#fff" stopOpacity={0.32} />
    </linearGradient>
    <radialGradient id={`${uid}-ao`}>
      <stop offset="0%" stopColor="#000" stopOpacity={0.32} />
      <stop offset="100%" stopColor="#000" stopOpacity={0} />
    </radialGradient>
    <radialGradient id={`${uid}-shadow`}>
      <stop offset="0%" stopColor="#3B2A1A" stopOpacity={0.38} />
      <stop offset="60%" stopColor="#3B2A1A" stopOpacity={0.16} />
      <stop offset="100%" stopColor="#3B2A1A" stopOpacity={0} />
    </radialGradient>
  </defs>
);

const Tail: React.FC<{ d: Design; pose: Pose; hipY: number }> = ({ d, pose, hipY }) => {
  // tail sits on the back side of the body and drags behind fast motion
  const side = Math.max(-1, Math.min(1, 0.6 - pose.yaw * 1.6)) >= 0 ? 1 : -1;
  const ax = d.torsoBottom * (0.2 - pose.yaw * 0.3);
  const drag = Math.max(-25, Math.min(25, -pose.vx * 0.04)) * side;
  if (d.species === 'dog') {
    const a = Math.sin(pose.t * 14) * 22 * pose.wag;
    return (
      <g transform={`translate(${ax} ${hipY + 10}) scale(${side} 1) rotate(${a - 10 + drag})`}>
        <path d="M 0 0 C 50 10 95 -10 110 -70" stroke={d.fur.dark} strokeWidth={30 * (d.headR / 96)} strokeLinecap="round" fill="none" />
        <path d="M 0 0 C 50 10 95 -10 110 -70" stroke={d.fur.base} strokeWidth={22 * (d.headR / 96)} strokeLinecap="round" fill="none" />
        <path d="M 10 -2 C 55 6 92 -14 104 -64" stroke={d.fur.light} strokeWidth={6 * (d.headR / 96)} strokeLinecap="round" fill="none" opacity={0.6} />
      </g>
    );
  }
  const k = d.headR / 90;
  const sway = Math.sin(pose.t * 2.1) * 12 + drag;
  const curl = Math.sin(pose.t * 1.6 + 1) * 20;
  const p = `M 0 0 C ${60 * k} ${20 * k} ${115 * k} ${-5 * k} ${110 * k} ${-80 * k} S ${(150 + curl) * k} ${-170 * k} ${(118 + curl) * k} ${-200 * k}`;
  return (
    <g transform={`translate(${ax} ${hipY + 15}) scale(${side} 1) rotate(${sway - 5})`}>
      <path d={p} stroke={d.id === 'mama' ? '#0E0D12' : d.fur.dark} strokeWidth={24 * k} strokeLinecap="round" fill="none" />
      <path d={p} stroke={d.fur.base} strokeWidth={17 * k} strokeLinecap="round" fill="none" />
      {d.fur.stripe && <path d={p} stroke={d.fur.stripe} strokeWidth={17 * k} strokeDasharray={`${10 * k} ${22 * k}`} fill="none" />}
      <path d={p} stroke="#fff" strokeWidth={4 * k} strokeLinecap="round" fill="none" opacity={0.18} transform="translate(-4 -2)" />
    </g>
  );
};

const Leg: React.FC<{ d: Design; side: -1 | 1; swing: number; knee: number; hipY: number; uid: string; yaw: number; dim: boolean }> = ({
  d,
  side,
  swing,
  knee,
  hipY,
  uid,
  yaw,
  dim,
}) => {
  const a = Math.min(1, Math.abs(yaw));
  const sy = yaw < 0 ? -1 : 1;
  const hx = side * d.torsoBottom * 0.24 * (1 - 0.6 * a) + sy * a * 6;
  const L = d.legH;
  const th = L * 0.5;
  const sh = L * 0.5;
  const w = d.legW;
  const front = 1 - a;
  // thigh: forward swing visible when turned; squats bow the knees outward in front view
  const thighRot = -sy * swing * Math.max(a, 0.3) + side * knee * 0.22 * front;
  const shinRot = sy * knee * a - side * knee * 0.42 * front;
  const shinScale = 1 - (1 - Math.cos((knee * Math.PI) / 180)) * front * 0.5;
  const footRot = -(thighRot + shinRot) * 0.85;
  const toe: 1 | -1 = a > 0.35 ? sy : side;
  const jeans = d.bottom.kind === 'jeans';
  const shorts = !jeans;
  const pantsFill = `url(#${uid}-bottom)`;
  return (
    <g transform={`translate(${hx} ${hipY}) rotate(${thighRot})`} style={dim ? { filter: 'brightness(0.86)' } : undefined}>
      {/* thigh */}
      {shorts ? (
        <>
          <rect x={-w * 0.3} y={th * 0.6} width={w * 0.6} height={th * 0.5} rx={w * 0.3} fill={`url(#${uid}-limb)`} stroke={d.fur.dark} strokeWidth={2.5} />
          <path
            d={`M ${-w * 0.56} 0 L ${w * 0.56} 0 L ${w * 0.62} ${th} Q ${w * 0.62} ${th + 6} ${w * 0.55} ${th + 6} L ${-w * 0.55} ${th + 6} Q ${-w * 0.62} ${th + 6} ${-w * 0.62} ${th} Z`}
            fill={pantsFill}
            stroke={d.bottom.dark}
            strokeWidth={3}
          />
        </>
      ) : (
        <rect x={-w / 2} y={-6} width={w} height={th + 18} rx={w * 0.42} fill={pantsFill} stroke={d.bottom.dark} strokeWidth={3} />
      )}
      {/* shin */}
      <g transform={`translate(0 ${th}) rotate(${shinRot}) scale(1 ${shinScale})`}>
        {shorts ? (
          <>
            <rect x={-w * 0.3} y={-6} width={w * 0.6} height={sh} rx={w * 0.3} fill={`url(#${uid}-limb)`} stroke={d.fur.dark} strokeWidth={2.5} />
            <rect x={-w * 0.33} y={sh - 26} width={w * 0.66} height={14} rx={6} fill="#FFFFFF" stroke="#D8D2C8" strokeWidth={2} />
          </>
        ) : (
          <>
            <path
              d={`M ${-w * 0.48} -14 L ${w * 0.48} -14 L ${w * 0.45} ${sh - 14} Q ${w * 0.45} ${sh - 6} ${w * 0.38} ${sh - 6} L ${-w * 0.38} ${sh - 6} Q ${-w * 0.45} ${sh - 6} ${-w * 0.45} ${sh - 14} Z`}
              fill={pantsFill}
              stroke={d.bottom.dark}
              strokeWidth={3}
            />
            {d.id === 'papa' && <rect x={-w * 0.5} y={sh - 28} width={w} height={16} rx={5} fill="#4A64A0" stroke={d.bottom.dark} strokeWidth={2.5} />}
            <line x1={side * w * 0.18} y1={-6} x2={side * w * 0.2} y2={sh - 30} stroke={d.bottom.dark} strokeWidth={2} strokeDasharray="5 6" opacity={0.6} />
          </>
        )}
        <g transform={`translate(0 ${sh}) scale(1 ${1 / shinScale}) rotate(${footRot})`}>
          <Shoe d={d} toe={toe} profile={a} />
        </g>
      </g>
      {/* knee crease shading */}
      {!shorts && knee > 8 && <ellipse cx={0} cy={th} rx={w * 0.38} ry={5} fill="#000" opacity={Math.min(0.18, knee / 300)} />}
    </g>
  );
};

const Shoe: React.FC<{ d: Design; toe: 1 | -1; profile: number }> = ({ d, toe, profile }) => {
  const w = d.legW * (1.45 + profile * 0.25);
  const h = d.legW * 0.62;
  const off = toe * w * (0.18 + profile * 0.12);
  return (
    <g transform={`translate(${off} 0)`}>
      <path
        d={`M ${-w / 2} 0 Q ${-w / 2} ${-h * 1.1} ${-w * 0.05} ${-h * 1.05} Q ${w * 0.5} ${-h * 0.95} ${w / 2} ${-h * 0.15} L ${w / 2} 0 Z`}
        transform={toe < 0 ? 'scale(-1 1)' : undefined}
        fill={d.shoes.base}
        stroke={d.shoes.dark}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        d={`M ${-w * 0.2} ${-h * 0.95} Q ${w * 0.1} ${-h * 0.98} ${w * 0.2} ${-h * 0.6}`}
        transform={toe < 0 ? 'scale(-1 1)' : undefined}
        stroke={d.id === 'papa' ? d.shoes.dark : '#FFFFFF'}
        strokeWidth={4}
        strokeDasharray="2 7"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={toe * w * 0.18} cy={-h * 0.72} rx={w * 0.14} ry={h * 0.12} fill="#fff" opacity={0.45} />
      <rect x={-w / 2 - 2} y={-h * 0.28} width={w + 4} height={h * 0.32} rx={h * 0.15} fill={d.shoes.sole} stroke={d.shoes.dark} strokeWidth={2.5} />
    </g>
  );
};

const Pelvis: React.FC<{ d: Design; hipY: number; uid: string; yaw: number }> = ({ d, hipY, uid, yaw }) => {
  const w = d.torsoBottom * (1 - 0.15 * Math.min(1, Math.abs(yaw)));
  const fill = d.bottom.kind === 'jeans' ? `url(#${uid}-bottom)` : d.bottom.base;
  return <path d={`M ${-w / 2} ${hipY - 24} L ${w / 2} ${hipY - 24} L ${w * 0.47} ${hipY + 26} Q 0 ${hipY + 34} ${-w * 0.47} ${hipY + 26} Z`} fill={fill} stroke={d.bottom.dark} strokeWidth={3} strokeLinejoin="round" />;
};

const torsoPath = (tw: number, bw: number, h: number) => {
  const r = Math.min(tw * 0.32, 34);
  const bulge = Math.max(tw, bw) / 2 + 5;
  return `M ${-tw / 2} ${r} Q ${-tw / 2} 0 ${-tw / 2 + r} 0 L ${tw / 2 - r} 0 Q ${tw / 2} 0 ${tw / 2} ${r}
    Q ${bulge} ${h * 0.55} ${bw / 2} ${h - 8} Q ${bw / 2} ${h} ${bw / 2 - 8} ${h} L ${-bw / 2 + 8} ${h} Q ${-bw / 2} ${h} ${-bw / 2} ${h - 8}
    Q ${-bulge} ${h * 0.55} ${-tw / 2} ${r} Z`;
};

const Torso: React.FC<{ d: Design; shoulderY: number; uid: string; yaw: number; breath: number }> = ({ d, shoulderY, uid, yaw, breath }) => {
  const a = Math.min(1, Math.abs(yaw));
  const k = 1 - 0.16 * a;
  const tw = d.torsoTop * k * (1 + breath * 0.015);
  const bw = d.torsoBottom * k;
  const h = d.torsoH;
  const dark = d.top.dark;
  const body = torsoPath(tw, bw, h);
  const shift = yaw * tw * 0.2; // front details slide to the side we turn to
  const clip = `${uid}-torso`;
  return (
    <g transform={`translate(0 ${shoulderY})`}>
      <defs>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
      </defs>
      <rect x={-d.headR * 0.22} y={-28} width={d.headR * 0.44} height={40} fill={d.fur.base} />

      {d.outfit === 'overalls' ? (
        <g>
          <path d={body} fill={d.inner} stroke="#D98AAE" strokeWidth={3} />
          <g clipPath={`url(#${clip})`} transform={`translate(${shift} 0)`}>
            <path d={`M ${-tw * 0.2} 2 Q 0 ${h * 0.16} ${tw * 0.2} 2`} fill={d.fur.base} stroke="#D98AAE" strokeWidth={3} />
            <path
              d={`M ${-bw * 0.36} ${h * 0.36} Q ${-bw * 0.36} ${h * 0.3} ${-bw * 0.3} ${h * 0.3} L ${bw * 0.3} ${h * 0.3} Q ${bw * 0.36} ${h * 0.3} ${bw * 0.36} ${h * 0.36} L ${bw * 0.5} ${h + 4} L ${-bw * 0.5} ${h + 4} Z`}
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
        </g>
      ) : (
        <g>
          {(d.outfit === 'jacket' || d.outfit === 'hoodie') && (
            <path d={`M ${-tw * 0.36 - shift * 0.3} 14 Q ${-shift * 0.3} -44 ${tw * 0.36 - shift * 0.3} 14`} stroke={dark} strokeWidth={30} fill="none" strokeLinecap="round" />
          )}
          <path d={body} fill={`url(#${uid}-top)`} stroke={dark} strokeWidth={3} />
          <g clipPath={`url(#${clip})`}>
            <g transform={`translate(${shift} 0)`}>
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
                  <path d={`M ${-tw * 0.1} ${h * 0.25} Q 0 ${h * 0.32} ${tw * 0.1} ${h * 0.25}`} stroke={dark} strokeWidth={2.5} fill="none" opacity={0.4} />
                  {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
                    <line key={i} x1={i * tw * 0.12} y1={h - 14} x2={i * tw * 0.12} y2={h} stroke={dark} strokeWidth={2} opacity={0.5} />
                  ))}
                </g>
              )}
              {d.extras.includes('backpack') && (
                <g stroke="#2E3440" strokeWidth={12} strokeLinecap="round">
                  <line x1={-tw * 0.38} y1={4} x2={-tw * 0.36} y2={h * 0.55} />
                  <line x1={tw * 0.38} y1={4} x2={tw * 0.36} y2={h * 0.55} />
                </g>
              )}
            </g>
            <rect x={-bw / 2 - 10} y={h - 16} width={bw + 20} height={18} fill={dark} opacity={0.75} />
          </g>
          {d.outfit === 'sweater' && (
            <g transform={`translate(${shift * 0.6} 0)`}>
              <rect x={-tw * 0.26} y={-20} width={tw * 0.52} height={34} rx={14} fill={d.top.light} stroke={dark} strokeWidth={3} />
              {[-2, -1, 0, 1, 2].map((i) => (
                <line key={i} x1={i * tw * 0.09} y1={-14} x2={i * tw * 0.09} y2={8} stroke={dark} strokeWidth={2} opacity={0.5} />
              ))}
            </g>
          )}
        </g>
      )}
      {/* volume: core shadow + rim light */}
      <path d={body} fill={`url(#${uid}-rim)`} />
    </g>
  );
};

const BackpackBack: React.FC<{ d: Design; shoulderY: number; yaw: number }> = ({ d, shoulderY, yaw }) => {
  const w = d.torsoTop + 34;
  const off = -yaw * w * 0.35; // peeks out behind when turned
  return (
    <g transform={`translate(${off} 0)`}>
      <rect x={-w / 2} y={shoulderY - 6} width={w} height={d.torsoH * 0.88} rx={24} fill="#3B4252" stroke="#20242D" strokeWidth={3} />
      <rect x={-w / 2 - 6} y={shoulderY + d.torsoH * 0.4} width={22} height={d.torsoH * 0.36} rx={9} fill="#4C566A" stroke="#20242D" strokeWidth={3} />
      <rect x={w / 2 - 16} y={shoulderY + d.torsoH * 0.4} width={22} height={d.torsoH * 0.36} rx={9} fill="#4C566A" stroke="#20242D" strokeWidth={3} />
    </g>
  );
};

const ArmView: React.FC<{ d: Design; side: -1 | 1; arm: Arm; swing: number; shoulderY: number; uid: string; yaw: number; dim: boolean }> = ({ d, side, arm, swing, shoulderY, uid, yaw, dim }) => {
  const a = Math.min(1, Math.abs(yaw));
  const sy = yaw < 0 ? -1 : 1;
  const w = d.armW;
  const ua = d.armLen * 0.48;
  const fa = d.armLen * 0.45;
  const sx = side * (d.torsoTop / 2 - w * 0.42) * (1 - 0.55 * a) + sy * a * 4;
  const sy0 = shoulderY + w * 0.55;
  // front view: angles open outward; turned: swing forward/back along the walking direction
  const outward = (deg: number) => (side < 0 ? deg : -deg);
  const forward = (deg: number) => -sy * deg;
  const mix = (deg: number, rest = 0) => outward(deg) * (1 - a) + forward(deg - rest) * a;
  const shoulderRot = mix(arm.up, 6) + forward(swing) * Math.max(a, 0.25);
  const shortSleeve = d.outfit === 'overalls';
  const sleeveFill = shortSleeve ? d.inner! : `url(#${uid}-top)`;
  const sleeveStroke = shortSleeve ? '#D98AAE' : d.top.dark;
  const furArm = `url(#${uid}-limb)`;
  const outline = d.id === 'mama' ? '#0E0D12' : d.fur.dark;
  return (
    <g transform={`translate(${sx} ${sy0}) rotate(${shoulderRot})`} style={dim ? { filter: 'brightness(0.86)' } : undefined}>
      {shortSleeve && <rect x={-w * 0.4} y={-w * 0.3} width={w * 0.8} height={ua + w * 0.5} rx={w * 0.4} fill={furArm} stroke={d.fur.dark} strokeWidth={2.5} />}
      <rect x={-w / 2} y={-w / 2} width={w} height={shortSleeve ? ua * 0.6 + w / 2 : ua + w} rx={w / 2} fill={sleeveFill} stroke={sleeveStroke} strokeWidth={3} />
      <g transform={`translate(0 ${ua}) rotate(${mix(arm.bend)})`}>
        {shortSleeve ? (
          <rect x={-w * 0.4} y={-w * 0.4} width={w * 0.8} height={fa + w * 0.4} rx={w * 0.4} fill={furArm} stroke={d.fur.dark} strokeWidth={2.5} />
        ) : (
          <>
            <rect x={-w / 2} y={-w / 2} width={w} height={fa + w * 0.3} rx={w / 2} fill={sleeveFill} stroke={sleeveStroke} strokeWidth={3} />
            <rect x={-w * 0.52} y={fa - w * 0.35} width={w * 1.04} height={w * 0.42} rx={w * 0.2} fill={d.top.dark} />
          </>
        )}
        {/* paw with thumb */}
        <g transform={`translate(0 ${fa + w * 0.25})`}>
          <ellipse cx={side * -w * 0.42} cy={-w * 0.05} rx={w * 0.22} ry={w * 0.3} fill={`url(#${uid}-fur)`} stroke={outline} strokeWidth={2.5} transform={`rotate(${side * 25} ${side * -w * 0.42} 0)`} />
          <ellipse cx={0} cy={0} rx={w * 0.6} ry={w * 0.58} fill={`url(#${uid}-fur)`} stroke={outline} strokeWidth={3} />
          <ellipse cx={-w * 0.18} cy={-w * 0.2} rx={w * 0.2} ry={w * 0.13} fill="#fff" opacity={d.id === 'mama' ? 0.12 : 0.28} />
          <g stroke={outline} strokeWidth={2.2} strokeLinecap="round" opacity={0.8}>
            <line x1={-w * 0.18} y1={w * 0.22} x2={-w * 0.2} y2={w * 0.5} />
            <line x1={w * 0.12} y1={w * 0.24} x2={w * 0.13} y2={w * 0.52} />
          </g>
        </g>
      </g>
    </g>
  );
};
