import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { CharId } from '../characters/types';
import { restPose } from '../characters/types';
import type { Compilation } from '../compilations';
import { FONT, ensureFonts } from '../engine/fonts';
import { Logo } from '../engine/Logo';
import { Character3D } from './Character3D';
import { Lights3D } from './Lights3D';
import { CameraRig, Canvas3D } from './Scene3D';
import { Set3D } from './Sets3D';

/**
 * Compilation thumbnail (1280x720): the whole family close up and cheering (parents behind, kids in front),
 * huge text on the right and a duration pill — long videos sell "lots of episodes" at a glance.
 */
export const CompilationThumb3D: React.FC<{ comp: Compilation }> = ({ comp }) => {
  ensureFonts();
  const ids: CharId[] = ['papa', 'mama', 'hijo', 'hija'];
  const X = [-4.55, -1.4, -3.3, -2.3];
  const Z = [-0.3, -0.3, 1.6, 1.6];
  const poses = ids.map((id, i) => {
    const p = restPose(0.4 + i);
    p.expr = (['laugh', 'love', 'excited', 'laugh'] as const)[i];
    p.wag = 1.2;
    p.yaw = 0.15;
    p.armL = { up: 150, bend: 15 };
    p.armR = { up: 150, bend: 15 };
    if (id === 'mama') p.armL = { up: 60, bend: 40 };
    if (id === 'hija') p.lift = 18;
    return p;
  });
  const rows = comp.text.split('\n');
  const longest = Math.max(...rows.map((r) => r.length));
  const size = Math.min(170, 930 / (longest * 0.74));
  return (
    <AbsoluteFill style={{ background: '#CDEBFF' }}>
      <Canvas3D>
        <CameraRig x={0} dist={13} y={3.9} lookY={3.2} />
        <Lights3D target={[-2, 2.5, 0]} />
        <Set3D bg={comp.bg ?? 'park'} variant={comp.variant} t={2.2} />
        {ids.map((id, i) => (
          <Character3D key={id} id={id} pose={poses[i]} position={[X[i], 0, Z[i]]} />
        ))}
      </Canvas3D>
      <AbsoluteFill>
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          <defs>
            <radialGradient id="compGlow" cx="70%" cy="45%" r="45%">
              <stop offset="0%" stopColor="#FFF3BF" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#FFF3BF" stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect width={1920} height={1080} fill="url(#compGlow)" />
          <g transform={`translate(1400 ${size + 120}) rotate(-4)`} fontFamily={FONT} fontWeight={700} textAnchor="middle" strokeLinejoin="round">
            {rows.map((r, i) => (
              <g key={i} transform={`translate(0 ${i * size * 1.05})`}>
                <text fontSize={size} fill="#FFF" stroke="#5F3DC4" strokeWidth={size * 0.24} paintOrder="stroke">
                  {r}
                </text>
                <text fontSize={size} fill="#FFD43B">
                  {r}
                </text>
              </g>
            ))}
          </g>
          <g transform={`translate(1400 ${size * (rows.length * 1.05) + 260}) rotate(-4)`} fontFamily={FONT} fontWeight={700} textAnchor="middle">
            <rect x={-230} y={-70} width={460} height={124} rx={62} fill="#FA5252" stroke="#FFF" strokeWidth={8} />
            <text y={22} fontSize={78} fill="#FFF">
              {comp.badge}
            </text>
          </g>
          <g transform="translate(1400 985) scale(0.42)">
            <Logo t={0.2} />
          </g>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
