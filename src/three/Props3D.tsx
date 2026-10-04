import { RoundedBox } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';
import type { PropKind } from '../engine/script';

type V3 = [number, number, number];
const M: React.FC<{ c: string; e?: number; r?: number }> = ({ c, e, r = 0.55 }) => (
  <meshPhysicalMaterial color={c} roughness={r} clearcoat={0.3} emissive={e ? c : '#000'} emissiveIntensity={e ?? 0} />
);
const Cyl: React.FC<{ p: V3; r: number; r2?: number; h: number; c: string; e?: number }> = ({ p, r, r2, h, c, e }) => (
  <mesh position={p} castShadow receiveShadow>
    <cylinderGeometry args={[r, r2 ?? r, h, 40]} />
    <M c={c} e={e} />
  </mesh>
);
const Sph: React.FC<{ p: V3; s: V3 | number; c: string; e?: number }> = ({ p, s, c, e }) => (
  <mesh position={p} scale={typeof s === 'number' ? [s, s, s] : s} castShadow>
    <sphereGeometry args={[1, 24, 16]} />
    <M c={c} e={e} />
  </mesh>
);
const heart = (() => {
  const sh = new THREE.Shape();
  sh.moveTo(0, -0.6);
  sh.bezierCurveTo(-1.2, 0.1, -0.6, 1.0, 0, 0.45);
  sh.bezierCurveTo(0.6, 1.0, 1.2, 0.1, 0, -0.6);
  return new THREE.ExtrudeGeometry(sh, { depth: 0.25, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.1, bevelSegments: 3 });
})();
const star = (() => {
  const sh = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.45 : 1;
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    if (i) sh.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    else sh.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  return new THREE.ExtrudeGeometry(sh, { depth: 0.25, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 2 });
})();

/** One broccoli "little tree": pale stem + bumpy green crown. */
const Broccoli3D: React.FC = () => (
  <group>
    <Cyl p={[0, 0.14, 0]} r={0.07} r2={0.1} h={0.28} c="#B5D99C" />
    {[
      [0, 0.38, 0, 0.17],
      [-0.13, 0.33, 0.05, 0.13],
      [0.13, 0.33, -0.03, 0.13],
      [0.02, 0.32, 0.13, 0.12],
      [-0.03, 0.31, -0.13, 0.12],
    ].map(([x, y, z, r], i) => (
      <Sph key={i} p={[x, y, z]} s={r} c={i % 2 ? '#2F9E44' : '#37B24D'} />
    ))}
  </group>
);

/** 3D props, base at the origin. Sizes match the 2D props (100 px = 1 unit). */
export const Prop3D: React.FC<{ kind: PropKind; t: number; spin?: number }> = ({ kind, t, spin = 0 }) => {
  switch (kind) {
    case 'table':
      return (
        <group>
          <Cyl p={[0, 0.75, 0]} r={0.16} h={1.5} c="#B07A4F" />
          <Cyl p={[0, 0.05, 0]} r={0.7} h={0.1} c="#9C6A43" />
          <Cyl p={[0, 1.55, 0]} r={1.9} h={0.12} c="#FFDEEB" />
          <Cyl p={[0, 1.3, 0]} r={1.92} r2={2.05} h={0.5} c="#FFF0F6" />
        </group>
      );
    case 'cake':
      return (
        <group>
          <Cyl p={[0, 0.04, 0]} r={1.3} h={0.08} c="#E9ECEF" />
          <Cyl p={[0, 0.58, 0]} r={1.05} h={1.0} c="#F8C4D8" />
          <mesh position={[0, 1.08, 0]} castShadow>
            <torusGeometry args={[1.02, 0.1, 12, 48]} />
            <M c="#FFFFFF" r={0.3} />
          </mesh>
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <Sph key={i} p={[Math.cos(a) * 1.04, 0.95, Math.sin(a) * 1.04]} s={[0.12, 0.2, 0.12]} c="#FFFFFF" />;
          })}
          <Cyl p={[0, 1.45, 0]} r={0.78} h={0.7} c="#FFDEEB" />
          {[-0.4, 0, 0.4].map((x, i) => (
            <group key={x} position={[x, 1.8, 0.1 * (i - 1)]}>
              <Cyl p={[0, 0.25, 0]} r={0.06} h={0.5} c={['#74C0FC', '#FFD43B', '#B197FC'][i]} />
              <Sph p={[0, 0.6 + Math.sin(t * 20 + i) * 0.015, 0]} s={[0.07, 0.13, 0.07]} c="#FFA94D" e={2.5} />
            </group>
          ))}
          {[-0.6, -0.2, 0.2, 0.6].map((x) => (
            <Sph key={x} p={[x, 0.55, 1.03]} s={0.09} c="#E03131" />
          ))}
          <pointLight position={[0, 2.6, 0.4]} intensity={2} distance={3} color="#FFB347" />
        </group>
      );
    case 'bowl':
      return (
        <group>
          <mesh position={[0, 0.45, 0]} rotation={[Math.PI, 0, 0]} castShadow>
            <sphereGeometry args={[0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial color="#A5D8FF" roughness={0.2} clearcoat={1} side={THREE.DoubleSide} />
          </mesh>
          <Cyl p={[0, 0.42, 0]} r={0.84} h={0.04} c="#FFF9DB" />
          <group position={[0, 0.5, 0]} rotation={[0, 0, 0.35 + Math.sin(t * 8) * 0.12]}>
            <Cyl p={[0, 0.6, 0]} r={0.04} h={1.2} c="#868E96" />
          </group>
        </group>
      );
    case 'flour':
      return (
        <group>
          <RoundedBox args={[1.1, 1.3, 0.7]} radius={0.15} position={[0, 0.65, 0]} castShadow>
            <M c="#F8F9FA" r={0.9} />
          </RoundedBox>
          <RoundedBox args={[0.8, 0.45, 0.05]} radius={0.02} position={[0, 0.65, 0.36]}>
            <M c="#FFD43B" />
          </RoundedBox>
        </group>
      );
    case 'ball':
      // beach ball: coloured bands make the roll visible
      return (
        <group position={[0, 0.5, 0]} rotation={[0, 0, (-spin * Math.PI) / 180]}>
          <Sph p={[0, 0, 0]} s={0.5} c="#FF6B6B" />
          <mesh rotation={[0, 0, 0]} castShadow>
            <torusGeometry args={[0.47, 0.07, 12, 40]} />
            <M c="#FFFFFF" />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.47, 0.07, 12, 40]} />
            <M c="#FFD43B" />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[0.47, 0.07, 12, 40]} />
            <M c="#4DABF7" />
          </mesh>
        </group>
      );
    case 'balloon':
      return (
        <group rotation={[0, 0, Math.sin(t * 1.5) * 0.08]}>
          <Cyl p={[0, 1.2, 0]} r={0.01} h={2.4} c="#868E96" />
          <Sph p={[0, 3.0, 0]} s={[0.55, 0.68, 0.55]} c="#F06595" />
        </group>
      );
    case 'gift':
      return (
        <group>
          <RoundedBox args={[1.4, 1.1, 1.4]} radius={0.06} position={[0, 0.55, 0]} castShadow>
            <M c="#9775FA" />
          </RoundedBox>
          <RoundedBox args={[1.55, 0.3, 1.55]} radius={0.06} position={[0, 1.2, 0]} castShadow>
            <M c="#B197FC" />
          </RoundedBox>
          <RoundedBox args={[0.25, 1.4, 1.58]} radius={0.03} position={[0, 0.7, 0]}>
            <M c="#FFD43B" />
          </RoundedBox>
          <Sph p={[-0.25, 1.45, 0]} s={[0.3, 0.18, 0.15]} c="#FFD43B" />
          <Sph p={[0.25, 1.45, 0]} s={[0.3, 0.18, 0.15]} c="#FFD43B" />
        </group>
      );
    case 'book':
      return (
        <RoundedBox args={[1.4, 0.25, 1.0]} radius={0.04} position={[0, 0.13, 0]} castShadow>
          <M c="#74C0FC" />
        </RoundedBox>
      );
    case 'plate':
      return (
        <group>
          <Cyl p={[0, 0.04, 0]} r={0.95} r2={0.8} h={0.08} c="#FFFFFF" />
          <mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.7, 0.88, 48]} />
            <meshStandardMaterial color="#74C0FC" />
          </mesh>
          {[
            [-0.35, 0.1],
            [0.05, -0.15],
            [0.38, 0.12],
            [0.0, 0.3],
          ].map(([x, z], i) => (
            <group key={i} position={[x, 0.1, z]} rotation={[0, i * 1.3, 0.15 * (i - 1.5)]} scale={0.85}>
              <Broccoli3D />
            </group>
          ))}
        </group>
      );
    case 'broccoli':
      return (
        <group scale={1.1}>
          <Broccoli3D />
        </group>
      );
    case 'teddy':
      return (
        <group scale={0.9}>
          <Sph p={[0, 0.45, 0]} s={[0.42, 0.45, 0.36]} c="#B07A4F" />
          <Sph p={[0, 1.05, 0]} s={0.34} c="#B07A4F" />
          <Sph p={[0, 0.97, 0.28]} s={[0.15, 0.11, 0.1]} c="#E8C9A0" />
          <Sph p={[0, 1.02, 0.36]} s={0.05} c="#3B2A1A" />
          {[-1, 1].map((sd) => (
            <group key={sd}>
              <Sph p={[sd * 0.27, 1.32, 0]} s={0.13} c="#B07A4F" />
              <Sph p={[sd * 0.12, 1.12, 0.29]} s={0.04} c="#1A1A1A" />
              <Sph p={[sd * 0.42, 0.55, 0.05]} s={[0.13, 0.22, 0.13]} c="#B07A4F" />
              <Sph p={[sd * 0.22, 0.1, 0.12]} s={[0.15, 0.12, 0.2]} c="#B07A4F" />
            </group>
          ))}
          <Sph p={[0, 0.78, 0.3]} s={[0.12, 0.06, 0.05]} c="#F06595" />
        </group>
      );
    case 'flashlight':
      return (
        <group position={[0, 0.6, 0]} rotation={[0, 0, -0.5]}>
          <Cyl p={[0, 0, 0]} r={0.11} h={0.7} c="#FFD43B" />
          <Cyl p={[0, 0.42, 0]} r={0.17} r2={0.12} h={0.16} c="#FCC419" />
          <Cyl p={[0, 0.51, 0]} r={0.16} h={0.02} c="#FFF9DB" e={2} />
          <mesh position={[0, 1.6, 0]}>
            <coneGeometry args={[0.8, 2.2, 24, 1, true]} />
            <meshBasicMaterial color="#FFF3BF" transparent opacity={0.22} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      );
    case 'toothbrush':
      return (
        <group position={[0, 0.7, 0]} rotation={[0, 0, 0.3]}>
          <RoundedBox args={[0.12, 1.1, 0.1]} radius={0.04}>
            <M c="#4DABF7" />
          </RoundedBox>
          <RoundedBox args={[0.14, 0.26, 0.16]} radius={0.03} position={[0, 0.62, 0.08]}>
            <M c="#FFFFFF" />
          </RoundedBox>
        </group>
      );
    case 'cookie':
      return <Cyl p={[0, 0.06, 0]} r={0.32} h={0.1} c="#E8B26A" />;
    case 'star':
      return (
        <mesh geometry={star} position={[0, 0.8, 0]} rotation={[0, t * 1.2, 0]} scale={0.6} castShadow>
          <M c="#FFD43B" e={0.3} />
        </mesh>
      );
    case 'heart':
      return (
        <mesh geometry={heart} position={[0, 0.8, 0]} scale={0.8 + Math.sin(t * 6) * 0.05} castShadow>
          <M c="#F0426B" e={0.15} />
        </mesh>
      );
    default:
      return (
        <group>
          <Cyl p={[0, 0.35, 0]} r={0.4} r2={0.3} h={0.7} c="#E07A5F" />
          <Sph p={[0, 1.1, 0]} s={0.5} c="#66B86F" />
        </group>
      );
  }
};
