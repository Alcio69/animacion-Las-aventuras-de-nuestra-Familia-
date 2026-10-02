import React from 'react';
import type { Design } from './design';
import { Brow, Eye, FACES, Mouth } from './Face';
import type { Pose } from './types';

const INK = '#2A1A16';

/** Head centered at (0,0). Fill gradients are defined by the parent (Character) using uid. */
export const Head: React.FC<{ d: Design; pose: Pose; uid: string }> = ({ d, pose, uid }) => {
  const R = d.headR;
  const spec = FACES[pose.expr];
  const cat = d.species === 'cat';
  const furFill = `url(#${uid}-fur)`;
  // 3/4 turn: facial features slide toward the side we look at (yaw) + small gaze shift
  const yaw = Math.max(-1, Math.min(1, pose.yaw));
  const fx = yaw * R * 0.34 + (yaw < 0 ? -1 : 1) * pose.lookX * R * 0.05;
  const fy = pose.lookY * R * 0.06;
  const s = R * (cat ? 0.19 : 0.17) * d.eyeScale;
  const eyeY = cat ? -R * 0.06 : -R * 0.1;
  const eyeX = R * (cat ? 0.38 : 0.36);
  const browColor = d.id === 'mama' ? '#77708A' : d.fur.dark;
  const outline = d.id === 'mama' ? '#0E0D12' : d.fur.dark;

  const ears = cat ? (
    <CatEars d={d} R={R} pose={pose} uid={uid} />
  ) : null;

  return (
    <g>
      {ears}
      {/* head shape */}
      {cat ? (
        <g>
          <path
            d={`M ${-R * 0.95} ${R * 0.05}
                C ${-R * 1.05} ${-R * 0.75} ${-R * 0.5} ${-R * 0.92} 0 ${-R * 0.92}
                C ${R * 0.5} ${-R * 0.92} ${R * 1.05} ${-R * 0.75} ${R * 0.95} ${R * 0.05}
                L ${R * 1.13} ${R * 0.24} L ${R * 0.93} ${R * 0.32} L ${R * 1.05} ${R * 0.47} L ${R * 0.8} ${R * 0.5}
                C ${R * 0.55} ${R * 0.8} ${-R * 0.55} ${R * 0.8} ${-R * 0.8} ${R * 0.5}
                L ${-R * 1.05} ${R * 0.47} L ${-R * 0.93} ${R * 0.32} L ${-R * 1.13} ${R * 0.24} Z`}
            fill={furFill}
            stroke={outline}
            strokeWidth={3.5}
            strokeLinejoin="round"
          />
        </g>
      ) : (
        <path
          d={`M ${-R * 0.98} ${R * 0.02}
              C ${-R * 1.02} ${-R * 0.7} ${-R * 0.55} ${-R * 0.97} 0 ${-R * 0.97}
              C ${R * 0.55} ${-R * 0.97} ${R * 1.02} ${-R * 0.7} ${R * 0.98} ${R * 0.02}
              C ${R * 0.95} ${R * 0.55} ${R * 0.55} ${R * 0.82} 0 ${R * 0.82}
              C ${-R * 0.55} ${R * 0.82} ${-R * 0.95} ${R * 0.55} ${-R * 0.98} ${R * 0.02} Z`}
          fill={furFill}
          stroke={outline}
          strokeWidth={3.5}
        />
      )}
      {/* rim light + core shadow give the head volume */}
      <ellipse cx={0} cy={-R * 0.05} rx={R * 1.0} ry={R * 0.88} fill={`url(#${uid}-rim)`} />
      {/* soft top highlight */}
      <ellipse cx={-R * 0.28 + fx * 0.5} cy={-R * 0.58} rx={R * 0.38} ry={R * 0.2} fill="#fff" opacity={d.id === 'mama' ? 0.08 : 0.16} />

      {d.fur.stripe && (
        <g fill={d.fur.stripe} transform={`translate(${fx * 0.6} 0)`}>
          {[-0.2, 0, 0.2].map((k) => (
            <path
              key={k}
              d={`M ${R * k - R * 0.06} ${-R * 0.92} Q ${R * k} ${-R * 0.6} ${R * k + R * 0.06} ${-R * 0.92} Z`}
              transform={`rotate(${k * 40} ${R * k} ${-R * 0.9})`}
            />
          ))}
          <path d={`M ${-R * 1.02} ${-R * 0.02} Q ${-R * 0.8} ${R * 0.02} ${-R * 0.72} ${R * 0.08} Q ${-R * 0.85} ${R * 0.1} ${-R * 1.0} ${R * 0.1} Z`} />
          <path d={`M ${R * 1.02} ${-R * 0.02} Q ${R * 0.8} ${R * 0.02} ${R * 0.72} ${R * 0.08} Q ${R * 0.85} ${R * 0.1} ${R * 1.0} ${R * 0.1} Z`} />
        </g>
      )}

      {!cat && <DogEars d={d} R={R} pose={pose} uid={uid} />}

      <g transform={`translate(${fx} ${fy})`}>
        {/* muzzle */}
        {cat ? (
          <g>
            <ellipse cx={0} cy={R * 0.4} rx={R * 0.2} ry={R * 0.13} fill={d.fur.muzzle} />
            <ellipse cx={-R * 0.13} cy={R * 0.3} rx={R * 0.18} ry={R * 0.14} fill={d.fur.muzzle} />
            <ellipse cx={R * 0.13} cy={R * 0.3} rx={R * 0.18} ry={R * 0.14} fill={d.fur.muzzle} />
          </g>
        ) : (
          <g>
            <ellipse cx={0} cy={R * 0.38} rx={R * 0.52} ry={R * 0.37} fill={d.fur.muzzle} />
            <ellipse cx={0} cy={R * 0.12} rx={R * 0.16} ry={R * 0.28} fill={d.fur.muzzle} />
          </g>
        )}

        {/* blush */}
        {(spec.blush || d.extras.includes('blush')) && (
          <g fill="#FF6F8E" opacity={spec.blush ? 0.45 : 0.25}>
            <ellipse cx={-R * (cat ? 0.55 : 0.6)} cy={R * 0.28} rx={R * 0.15} ry={R * 0.08} />
            <ellipse cx={R * (cat ? 0.55 : 0.6)} cy={R * 0.28} rx={R * 0.15} ry={R * 0.08} />
          </g>
        )}

        {/* eyes + brows */}
        {([-1, 1] as const).map((side) => {
          // the eye on the far side gets narrower and closer to the center
          const farK = side * yaw < 0 ? 1 - Math.abs(yaw) * 0.38 : 1 + Math.abs(yaw) * 0.04;
          const ex = side * eyeX * (side * yaw < 0 ? 1 - Math.abs(yaw) * 0.3 : 1);
          return (
            <g key={side} transform={`translate(${ex} 0) scale(${farK} 1) translate(${-ex} 0)`}>
              <Eye d={d} uid={uid} side={side} cx={ex} cy={eyeY} s={s} pose={pose} spec={spec} />
              <Brow d={d} side={side} cx={ex} cy={eyeY} s={s} spec={{ ...spec, browRaise: spec.browRaise + pose.brow * 0.35 }} color={browColor} />
            </g>
          );
        })}

        {/* nose + mouth */}
        {cat ? (
          <g>
            <g transform={`translate(0 ${R * 0.45})`}>
              <Mouth w={R * 0.34} spec={spec} open={pose.mouth} species="cat" />
            </g>
            <path
              d={`M ${-R * 0.085} ${R * 0.17} Q 0 ${R * 0.14} ${R * 0.085} ${R * 0.17} Q ${R * 0.06} ${R * 0.25} 0 ${R * 0.27} Q ${-R * 0.06} ${R * 0.25} ${-R * 0.085} ${R * 0.17} Z`}
              fill="#EE7F95"
              stroke={INK}
              strokeOpacity={0.4}
              strokeWidth={1.5}
            />
            <line x1={0} y1={R * 0.27} x2={0} y2={R * 0.42} stroke={INK} strokeWidth={R * 0.025} strokeLinecap="round" />
            {/* whiskers */}
            <g stroke={d.id === 'mama' ? '#D9D3E3' : '#FFF6EA'} strokeWidth={R * 0.018} strokeLinecap="round" opacity={0.9}>
              {[-1, 1].map((sd) => (
                <g key={sd}>
                  <line x1={sd * R * 0.3} y1={R * 0.3} x2={sd * R * 0.95} y2={R * 0.2} />
                  <line x1={sd * R * 0.3} y1={R * 0.36} x2={sd * R * 0.98} y2={R * 0.38} />
                  <line x1={sd * R * 0.3} y1={R * 0.42} x2={sd * R * 0.9} y2={R * 0.55} />
                </g>
              ))}
            </g>
          </g>
        ) : (
          <g>
            <line x1={0} y1={R * 0.24} x2={0} y2={R * 0.44} stroke={INK} strokeWidth={R * 0.04} strokeLinecap="round" />
            <g transform={`translate(0 ${R * 0.44})`}>
              <Mouth w={R * 0.46} spec={spec} open={pose.mouth} species="dog" />
            </g>
            <path
              d={`M ${-R * 0.19} ${R * 0.06} Q 0 ${-R * 0.02} ${R * 0.19} ${R * 0.06} Q ${R * 0.2} ${R * 0.2} 0 ${R * 0.27} Q ${-R * 0.2} ${R * 0.2} ${-R * 0.19} ${R * 0.06} Z`}
              fill="#2B1F1B"
            />
            <ellipse cx={-R * 0.06} cy={R * 0.08} rx={R * 0.06} ry={R * 0.03} fill="#fff" opacity={0.55} />
            {/* freckle dots */}
            <g fill={d.fur.dark} opacity={0.5}>
              <circle cx={-R * 0.3} cy={R * 0.32} r={R * 0.018} />
              <circle cx={-R * 0.36} cy={R * 0.38} r={R * 0.018} />
              <circle cx={R * 0.3} cy={R * 0.32} r={R * 0.018} />
              <circle cx={R * 0.36} cy={R * 0.38} r={R * 0.018} />
            </g>
          </g>
        )}
      </g>

      {d.extras.includes('bow') && (
        <g transform={`translate(${R * 0.55} ${-R * 0.72}) rotate(${-20 + Math.sin(pose.t * 3) * 3})`}>
          <path d={`M 0 0 L ${-R * 0.3} ${-R * 0.18} Q ${-R * 0.36} 0 ${-R * 0.3} ${R * 0.18} Z`} fill="#F06CA0" stroke="#C23E77" strokeWidth={2.5} strokeLinejoin="round" />
          <path d={`M 0 0 L ${R * 0.3} ${-R * 0.18} Q ${R * 0.36} 0 ${R * 0.3} ${R * 0.18} Z`} fill="#F06CA0" stroke="#C23E77" strokeWidth={2.5} strokeLinejoin="round" />
          <circle r={R * 0.08} fill="#FF8FBC" stroke="#C23E77" strokeWidth={2.5} />
        </g>
      )}
    </g>
  );
};

const DogEars: React.FC<{ d: Design; R: number; pose: Pose; uid: string }> = ({ d, R, pose, uid }) => {
  // ears lag behind motion: they swing against horizontal speed and lift when falling
  const flop = Math.sin(pose.t * 2.2) * 2 + pose.bob * 0.3 - Math.max(-14, Math.min(14, pose.vy * 0.03));
  const drag = Math.max(-12, Math.min(12, pose.vx * 0.025));
  return (
    <g>
      {([-1, 1] as const).map((side) => (
        <g key={side} transform={`translate(${-pose.yaw * R * 0.12} 0) rotate(${side * -flop - drag} ${side * R * 0.62} ${-R * 0.62})`}>
          <path
            d={`M ${side * R * 0.42} ${-R * 0.8}
                C ${side * R * 1.0} ${-R * 0.92} ${side * R * 1.28} ${-R * 0.5} ${side * R * 1.2} ${R * 0.12}
                C ${side * R * 1.15} ${R * 0.45} ${side * R * 0.95} ${R * 0.5} ${side * R * 0.85} ${R * 0.3}
                C ${side * R * 0.78} ${-R * 0.05} ${side * R * 0.8} ${-R * 0.42} ${side * R * 0.42} ${-R * 0.8} Z`}
            fill={`url(#${uid}-ear)`}
            stroke={d.fur.dark}
            strokeWidth={3.5}
            strokeLinejoin="round"
          />
        </g>
      ))}
    </g>
  );
};

const CatEars: React.FC<{ d: Design; R: number; pose: Pose; uid: string }> = ({ d, R, pose, uid }) => {
  // quick twitch every few seconds
  const tw = Math.max(0, Math.sin(pose.t * 1.3) - 0.92) * 60;
  const outline = d.id === 'mama' ? '#0E0D12' : d.fur.dark;
  return (
    <g>
      {([-1, 1] as const).map((side) => (
        <g key={side} transform={`translate(${-pose.yaw * R * 0.1} 0) rotate(${side * (side === 1 ? tw : 0) - Math.max(-10, Math.min(10, pose.vx * 0.02))} ${side * R * 0.55} ${-R * 0.6})`}>
          <path
            d={`M ${side * R * 0.92} ${-R * 0.25} Q ${side * R * 0.98} ${-R * 0.95} ${side * R * 0.86} ${-R * 1.22} Q ${side * R * 0.8} ${-R * 1.3} ${side * R * 0.7} ${-R * 1.2} Q ${side * R * 0.45} ${-R * 1.0} ${side * R * 0.15} ${-R * 0.82} Z`}
            fill={`url(#${uid}-fur)`}
            stroke={outline}
            strokeWidth={3.5}
            strokeLinejoin="round"
          />
          <path
            d={`M ${side * R * 0.78} ${-R * 0.45} Q ${side * R * 0.84} ${-R * 0.95} ${side * R * 0.8} ${-R * 1.1} Q ${side * R * 0.55} ${-R * 0.95} ${side * R * 0.32} ${-R * 0.8} Z`}
            fill={d.fur.ear}
          />
        </g>
      ))}
    </g>
  );
};
