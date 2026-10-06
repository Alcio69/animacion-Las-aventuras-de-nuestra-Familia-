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


/** Jack-o'-lantern with a glowing face (also used as set dressing). */
export const Pumpkin3D: React.FC<{ t: number; s?: number }> = ({ t, s = 1 }) => {
  const glow = 0.9 + Math.sin(t * 7) * 0.12 + Math.sin(t * 13) * 0.06;
  return (
    <group scale={s}>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, 0.5, 0]} rotation={[0, (i / 6) * Math.PI, 0]} scale={[0.36, 0.48, 0.62]} castShadow receiveShadow>
          <sphereGeometry args={[1, 24, 16]} />
          <M c={i % 2 ? '#F76707' : '#FD7E14'} r={0.5} />
        </mesh>
      ))}
      <Cyl p={[0, 1.02, 0]} r={0.07} r2={0.1} h={0.25} c="#5C940D" />
      {/* face */}
      {[-1, 1].map((sd) => (
        <mesh key={sd} position={[sd * 0.22, 0.62, 0.6]} rotation={[0, sd * 0.35, Math.PI]}>
          <coneGeometry args={[0.1, 0.14, 3]} />
          <meshBasicMaterial color="#FFD43B" toneMapped={false} opacity={glow} transparent />
        </mesh>
      ))}
      <mesh position={[0, 0.36, 0.58]} rotation={[-0.25, 0, 0]} scale={[1, 0.45, 0.3]}>
        <sphereGeometry args={[0.26, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshBasicMaterial color="#FFC300" toneMapped={false} opacity={glow} transparent />
      </mesh>
    </group>
  );
};

/** Christmas tree with twinkling lights and a star. */
export const XmasTree3D: React.FC<{ t: number; s?: number }> = ({ t, s = 1 }) => (
  <group scale={s}>
    <Cyl p={[0, 0.3, 0]} r={0.45} r2={0.38} h={0.6} c="#C92A2A" />
    <Cyl p={[0, 0.75, 0]} r={0.14} h={0.5} c="#8B5E3C" />
    {[0, 1, 2, 3].map((i) => (
      <mesh key={i} position={[0, 1.4 + i * 0.75, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.45 - i * 0.3, 1.3, 28]} />
        <M c={i % 2 ? '#2F9E44' : '#37B24D'} r={0.75} />
      </mesh>
    ))}
    {Array.from({ length: 22 }, (_, i) => {
      const y = 1.0 + (i / 22) * 2.9;
      const r = (1.5 - (y - 0.8) * 0.38) * 0.92;
      const a = i * 2.4;
      const on = Math.sin(t * 4 + i * 1.7) > -0.2;
      const c = ['#FFD43B', '#FF6B6B', '#4DABF7', '#F783AC', '#FFFFFF'][i % 5];
      return (
        <mesh key={i} position={[Math.sin(a) * r, y, Math.cos(a) * r]}>
          <sphereGeometry args={[0.075, 10, 8]} />
          <meshBasicMaterial color={on ? c : '#555'} toneMapped={false} />
        </mesh>
      );
    })}
    <mesh geometry={star} position={[0, 4.55, 0]} rotation={[0, t * 0.8, 0]} scale={0.38}>
      <M c="#FFD43B" e={1} />
    </mesh>
  </group>
);

/** A child's crayon drawing (sun, house, family) as a canvas texture. */
let drawingCache: THREE.Texture | null = null;
const drawingTex = () => {
  if (drawingCache) return drawingCache;
  const cv = document.createElement('canvas');
  cv.width = 300;
  cv.height = 210;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#FFFDF5';
  c.fillRect(0, 0, 300, 210);
  c.lineWidth = 6;
  c.lineCap = 'round';
  c.fillStyle = '#FFD43B';
  c.beginPath();
  c.arc(250, 45, 26, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = '#FF922B';
  c.strokeRect(50, 100, 90, 80);
  c.beginPath();
  c.moveTo(40, 100);
  c.lineTo(95, 55);
  c.lineTo(150, 100);
  c.stroke();
  c.fillStyle = '#69DB7C';
  c.fillRect(0, 185, 300, 25);
  ['#F59F00', '#212529', '#F59F00', '#E8590C'].forEach((col, i) => {
    c.fillStyle = col;
    c.beginPath();
    c.arc(180 + i * 28, 150 - (i > 1 ? -8 : 0), 11 - (i > 1 ? 2 : 0), 0, Math.PI * 2);
    c.fill();
    c.fillRect(175 + i * 28, 160, 10, 24);
  });
  drawingCache = new THREE.CanvasTexture(cv);
  drawingCache.colorSpace = THREE.SRGBColorSpace;
  return drawingCache;
};

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
    case 'toybox':
      return (
        <group>
          <RoundedBox args={[2.0, 1.2, 1.2]} radius={0.08} position={[0, 0.6, 0]} castShadow>
            <M c="#C08552" />
          </RoundedBox>
          <RoundedBox args={[2.1, 0.18, 1.3]} radius={0.06} position={[0, 1.35, -0.55]} rotation={[-1.1, 0, 0]} castShadow>
            <M c="#A86F42" />
          </RoundedBox>
          <mesh geometry={star} position={[0, 0.65, 0.62]} scale={0.28}>
            <M c="#FFD43B" />
          </mesh>
        </group>
      );
    case 'block':
      return (
        <group position={[0, 0.25, 0]} rotation={[0, 0.5 + spin * 0.02, (-spin * Math.PI) / 180]}>
          <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.06} castShadow>
            <M c="#FF6B6B" />
          </RoundedBox>
          <mesh position={[0, 0, 0.26]}>
            <planeGeometry args={[0.28, 0.28]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      );
    case 'car':
      return (
        <group rotation={[0, 0.4, (-spin * Math.PI) / 360]}>
          <RoundedBox args={[1.0, 0.32, 0.55]} radius={0.1} position={[0, 0.3, 0]} castShadow>
            <M c="#4DABF7" />
          </RoundedBox>
          <RoundedBox args={[0.55, 0.28, 0.5]} radius={0.1} position={[-0.05, 0.56, 0]} castShadow>
            <M c="#D0EBFF" />
          </RoundedBox>
          {[-0.32, 0.32].map((x) =>
            [-0.28, 0.28].map((z) => (
              <mesh key={`${x}${z}`} position={[x, 0.13, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.13, 0.13, 0.08, 20]} />
                <M c="#343A40" />
              </mesh>
            )),
          )}
        </group>
      );
    case 'vase':
    case 'vaseFixed':
      return (
        <group>
          <mesh position={[0, 0, 0]} castShadow>
            <latheGeometry args={[[0, 0, 0.35, 0, 0.42, 0.25, 0.4, 0.6, 0.22, 0.85, 0.26, 1.0].reduce<THREE.Vector2[]>((a, v, i, arr) => (i % 2 ? a : [...a, new THREE.Vector2(arr[i], arr[i + 1])]), []), 40]} />
            <meshPhysicalMaterial color="#5C7CFA" roughness={0.2} clearcoat={1} side={THREE.DoubleSide} />
          </mesh>
          {kind === 'vaseFixed' &&
            [
              [0.05, 0.35, 0.4],
              [-0.1, 0.55, -0.5],
            ].map(([x, y, r], i) => (
              <RoundedBox key={i} args={[0.5, 0.09, 0.02]} radius={0.01} position={[x, y, 0.4]} rotation={[0, 0, r]}>
                <M c="#FFF3BF" />
              </RoundedBox>
            ))}
          {[-0.15, 0, 0.15].map((x, i) => (
            <group key={x} position={[x, 0.95, 0]} rotation={[0, 0, -x * 1.5]}>
              <Cyl p={[0, 0.3, 0]} r={0.02} h={0.6} c="#2F9E44" />
              <Sph p={[0, 0.65, 0]} s={0.13} c={['#FF8787', '#FFD43B', '#DA77F2'][i]} />
              <Sph p={[0, 0.65, 0.05]} s={0.05} c="#FFF3BF" />
            </group>
          ))}
        </group>
      );
    case 'vaseBroken':
      return (
        <group>
          {[
            [-0.4, 0.3, 0.1, 0.8],
            [0.3, -0.2, 0.2, -0.6],
            [0.05, 0.35, -0.2, 2.2],
            [-0.15, -0.35, 0.3, 1.2],
            [0.45, 0.2, -0.1, -1.6],
          ].map(([x, z, ry, rz], i) => (
            <mesh key={i} position={[x, 0.06, z]} rotation={[0.3, ry, rz]} castShadow>
              <boxGeometry args={[0.32, 0.08, 0.22]} />
              <meshPhysicalMaterial color="#5C7CFA" roughness={0.2} clearcoat={1} />
            </mesh>
          ))}
          {[-0.3, 0.1, 0.4].map((x, i) => (
            <group key={x} position={[x, 0.06, 0.3 - i * 0.2]} rotation={[0, i, Math.PI / 2]}>
              <Cyl p={[0, 0.3, 0]} r={0.02} h={0.6} c="#2F9E44" />
              <Sph p={[0, 0.65, 0]} s={0.13} c={['#FF8787', '#FFD43B', '#DA77F2'][i]} />
            </group>
          ))}
        </group>
      );
    case 'drawing': {
      return (
        <group position={[0, 0.2, 0.2]} rotation={[0, 0, -0.08]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.8, 0.02]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[1.0, 0.7]} />
            <meshBasicMaterial map={drawingTex()} toneMapped={false} />
          </mesh>
        </group>
      );
    }
    case 'tree':
      // sways by itself; `spin` (from a moveProp shake) makes it wobble
      return (
        <group rotation={[0, 0, (Math.sin(t * 1.1) * 0.6 - spin * 0.6) * (Math.PI / 180)]}>
          <Cyl p={[0, 1.6, 0]} r={0.32} r2={0.48} h={3.2} c="#8B5E3C" />
          <Sph p={[0, 4.5, 0]} s={1.9} c="#5BAA4A" />
          <Sph p={[-1.4, 3.8, 0.3]} s={1.35} c="#4F9D44" />
          <Sph p={[1.4, 3.9, 0.2]} s={1.3} c="#5BAA4A" />
          <Sph p={[0.2, 3.6, 1.2]} s={1.2} c="#66B86F" />
          {[
            [-0.8, 4.0, 1.5],
            [0.9, 4.6, 1.3],
            [0.3, 5.3, 1.1],
          ].map(([x, y, z], i) => (
            <Sph key={i} p={[x, y, z]} s={0.16} c="#FF6B6B" />
          ))}
        </group>
      );
    case 'glass':
      return (
        <group>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.2, 0.17, 0.6, 32, 1, true]} />
            <meshPhysicalMaterial color="#E7F5FF" transparent opacity={0.35} roughness={0.05} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.185, 0.165, 0.42, 32]} />
            <meshPhysicalMaterial color="#74C0FC" transparent opacity={0.75} roughness={0.05} />
          </mesh>
        </group>
      );
    case 'pumpkin':
      return <Pumpkin3D t={t} s={0.75} />;
    case 'candy':
      // trick-or-treat bucket full of sweets
      return (
        <group scale={0.7}>
          <Cyl p={[0, 0.38, 0]} r={0.5} r2={0.4} h={0.76} c="#FD7E14" />
          {[-1, 1].map((sd) => (
            <mesh key={sd} position={[sd * 0.16, 0.45, 0.47]} rotation={[0, 0, Math.PI]}>
              <coneGeometry args={[0.07, 0.11, 3]} />
              <M c="#2B1A0E" />
            </mesh>
          ))}
          <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.5, 0.03, 8, 32, Math.PI]} />
            <M c="#343A40" />
          </mesh>
          {Array.from({ length: 7 }, (_, i) => (
            <Sph key={i} p={[Math.sin(i * 2.1) * 0.25, 0.8 + (i % 3) * 0.05, Math.cos(i * 2.1) * 0.25]} s={[0.13, 0.09, 0.09]} c={['#FF6B6B', '#FFD43B', '#9775FA', '#51CF66'][i % 4]} />
          ))}
        </group>
      );
    case 'tablet': {
      const glow = 0.8 + Math.sin(t * 3) * 0.1;
      return (
        <group position={[0, 0.5, 0]} rotation={[-0.35, 0, 0]}>
          <RoundedBox args={[1.05, 0.75, 0.07]} radius={0.05} castShadow>
            <M c="#343A40" r={0.3} />
          </RoundedBox>
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[0.92, 0.62]} />
            <meshBasicMaterial color="#4DABF7" toneMapped={false} opacity={glow} transparent />
          </mesh>
          {[[-0.2, 0.1, '#FFD43B'], [0.15, -0.08, '#FF6B6B'], [0.28, 0.14, '#69DB7C']].map(([x, y, c], i) => (
            <mesh key={i} position={[x as number, y as number, 0.05]}>
              <circleGeometry args={[0.09, 16]} />
              <meshBasicMaterial color={c as string} toneMapped={false} />
            </mesh>
          ))}
        </group>
      );
    }
    case 'timer':
      // sand timer (hourglass); sand flows over ~10 s
      return (
        <group scale={0.8}>
          <Cyl p={[0, 0.05, 0]} r={0.36} h={0.1} c="#8B5E3C" />
          <Cyl p={[0, 1.15, 0]} r={0.36} h={0.1} c="#8B5E3C" />
          {[-1, 1].map((sd) => (
            <Cyl key={sd} p={[sd * 0.3, 0.6, 0]} r={0.035} h={1.0} c="#8B5E3C" />
          ))}
          <mesh position={[0, 0.6, 0]}>
            <latheGeometry args={[[0.02, 0.28, 0.06, 0.3, 0.02].map((r, i) => new THREE.Vector2(r + 0.02, i * 0.25 - 0.5))]} />
            <meshPhysicalMaterial color="#E7F5FF" transparent opacity={0.4} roughness={0.05} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.3, 0]} scale={[1, 0.3 + 0.7 * ((t / 10) % 1), 1]}>
            <coneGeometry args={[0.22, 0.4, 20]} />
            <M c="#FAB005" />
          </mesh>
        </group>
      );
    case 'xmasTree':
      return <XmasTree3D t={t} s={0.8} />;
    case 'letter':
      // a letter to Santa, lying on the table
      return (
        <group position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0.15]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.75, 0.95, 0.02]} />
            <M c="#FFF9DB" r={0.9} />
          </mesh>
          {Array.from({ length: 6 }, (_, i) => (
            <mesh key={i} position={[-0.05 + (i % 2) * 0.04, 0.32 - i * 0.12, 0.012]}>
              <planeGeometry args={[0.5 - (i % 3) * 0.08, 0.025]} />
              <meshBasicMaterial color={i ? '#4C6EF5' : '#E03131'} />
            </mesh>
          ))}
        </group>
      );
    case 'baby': {
      // baby Hija: an orange kitten wrapped in a pink blanket, sleeping peacefully
      const br = 1 + Math.sin(t * 2.2) * 0.02;
      return (
        <group position={[0, 0.25, 0]} rotation={[0, 0, 0.1]}>
          <mesh position={[0.2, 0, 0]} scale={[0.55 * br, 0.26 * br, 0.32]} castShadow>
            <sphereGeometry args={[1, 24, 16]} />
            <M c="#F8BCD6" r={0.85} />
          </mesh>
          <Sph p={[-0.32, 0.1, 0]} s={0.27} c="#F39136" />
          <Sph p={[-0.36, 0.04, 0.2]} s={[0.12, 0.08, 0.08]} c="#FFE6C8" />
          {[-1, 1].map((sd) => (
            <mesh key={sd} position={[-0.3 + sd * 0.15, 0.33, 0]} rotation={[0, 0, -sd * 0.4]}>
              <coneGeometry args={[0.09, 0.16, 12]} />
              <M c="#F39136" />
            </mesh>
          ))}
          {/* closed eyes */}
          {[-1, 1].map((sd) => (
            <mesh key={sd} position={[-0.36 + sd * 0.09, 0.14, 0.24]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.035, 0.012, 6, 12, Math.PI]} />
              <M c="#3A2516" />
            </mesh>
          ))}
          <Sph p={[-0.22, 0.32, 0.12]} s={[0.07, 0.05, 0.04]} c="#F2809F" />
        </group>
      );
    }
    case 'crib':
      // wooden baby crib; its mattress is at "table" height (y=760) so a baby prop at y=760 lies inside
      return (
        <group>
          <RoundedBox args={[2.3, 0.18, 1.2]} radius={0.05} position={[0, 1.45, 0]} castShadow receiveShadow>
            <M c="#FFF0F6" r={0.9} />
          </RoundedBox>
          {[-1, 1].map((sx) =>
            [-1, 1].map((sz) => <Cyl key={`${sx}${sz}`} p={[sx * 1.15, 1.15, sz * 0.6]} r={0.07} h={2.3} c="#E9C9A0" />),
          )}
          {[-1, 1].map((sz) => (
            <group key={sz}>
              <Cyl p={[0, 2.25, sz * 0.6]} r={0.05} h={2.3} c="#E9C9A0" />
              {Array.from({ length: 9 }, (_, i) => (
                <Cyl key={i} p={[-1.0 + i * 0.25, 1.85, sz * 0.6]} r={0.025} h={0.8} c="#F3DCC0" />
              ))}
            </group>
          ))}
          <RoundedBox args={[2.3, 0.6, 0.1]} radius={0.04} position={[0, 1.1, 0]} castShadow>
            <M c="#E9C9A0" />
          </RoundedBox>
        </group>
      );
    case 'suitcase':
      return (
        <group>
          <RoundedBox args={[1.3, 0.95, 0.5]} radius={0.12} position={[0, 0.55, 0]} castShadow>
            <M c="#FF922B" r={0.45} />
          </RoundedBox>
          <RoundedBox args={[0.5, 0.08, 0.12]} radius={0.04} position={[0, 1.08, 0]}>
            <M c="#495057" />
          </RoundedBox>
          {[-0.4, 0.4].map((x) => (
            <RoundedBox key={x} args={[0.08, 0.97, 0.53]} radius={0.03} position={[x, 0.55, 0]}>
              <M c="#E8590C" />
            </RoundedBox>
          ))}
          <mesh position={[0.1, 0.62, 0.26]}>
            <circleGeometry args={[0.13, 20]} />
            <meshBasicMaterial color="#4DABF7" />
          </mesh>
          <mesh position={[-0.15, 0.4, 0.26]} rotation={[0, 0, 0.3]}>
            <planeGeometry args={[0.22, 0.14]} />
            <meshBasicMaterial color="#FFD43B" />
          </mesh>
        </group>
      );
    case 'sandcastle':
      return (
        <group>
          <Cyl p={[0, 0.3, 0]} r={0.8} r2={0.9} h={0.6} c="#E9C46A" />
          <Cyl p={[0, 0.85, 0]} r={0.5} r2={0.6} h={0.5} c="#EDCB7C" />
          {[-1, 1].map((sd) => (
            <group key={sd}>
              <Cyl p={[sd * 0.75, 0.75, 0.2]} r={0.2} r2={0.24} h={0.9} c="#E9C46A" />
              <mesh position={[sd * 0.75, 1.32, 0.2]}>
                <coneGeometry args={[0.24, 0.3, 16]} />
                <M c="#DDB45A" />
              </mesh>
            </group>
          ))}
          <Cyl p={[0, 1.4, 0]} r={0.025} h={0.6} c="#8B5E3C" />
          <mesh position={[0.15, 1.6, 0]} rotation={[0, 0, Math.sin(t * 5) * 0.15]}>
            <planeGeometry args={[0.3, 0.2]} />
            <meshBasicMaterial color="#FF6B6B" side={THREE.DoubleSide} />
          </mesh>
        </group>
      );
    case 'umbrella':
      // beach umbrella with a striped canopy and a towel
      return (
        <group>
          <Cyl p={[0, 1.7, 0]} r={0.05} h={3.4} c="#F1F3F5" />
          {Array.from({ length: 8 }, (_, i) => (
            <mesh key={i} position={[0, 3.45, 0]} castShadow>
              <coneGeometry args={[1.8, 0.7, 24, 1, true, (i / 8) * Math.PI * 2, Math.PI / 4]} />
              <meshPhysicalMaterial color={i % 2 ? '#FFFFFF' : '#FF6B6B'} roughness={0.7} side={THREE.DoubleSide} />
            </mesh>
          ))}
          <mesh position={[0.9, 0.02, 0.6]} rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow>
            <planeGeometry args={[1.0, 1.9]} />
            <meshStandardMaterial color="#4DABF7" />
          </mesh>
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
