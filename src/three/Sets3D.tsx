import { RoundedBox } from '@react-three/drei';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { Background } from '../engine/script';
import { Pumpkin3D, XmasTree3D } from './Props3D';

/** Backgrounds in 3D. Characters stand on z≈0, the back wall is at z=WALL. */
export const WALL = -4.6;
export const COUNTER_TOP = 2.9;
export const COUNTER_Z = -3.4;

// ---------- procedural textures (no downloads) ----------
const texCache = new Map<string, THREE.Texture>();
const canvasTex = (key: string, w: number, h: number, draw: (c: CanvasRenderingContext2D) => void, repeat?: [number, number]) => {
  if (texCache.has(key)) return texCache.get(key)!;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  draw(cv.getContext('2d')!);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
  }
  texCache.set(key, t);
  return t;
};
const rnd = (i: number) => {
  const x = Math.sin(i * 91.7) * 43758.5453;
  return x - Math.floor(x);
};
const wood = (a: string, b: string) =>
  canvasTex(`wood${a}`, 512, 512, (c) => {
    c.fillStyle = a;
    c.fillRect(0, 0, 512, 512);
    for (let r = 0; r < 8; r++) {
      for (let k = 0; k < 3; k++) {
        const x0 = ((r * 173 + k * 210) % 512) - 60;
        c.fillStyle = rnd(r * 7 + k) > 0.5 ? a : b;
        c.fillRect(x0, r * 64, 260, 64);
        c.fillStyle = 'rgba(80,40,10,0.18)';
        c.fillRect(x0, r * 64, 2, 64);
      }
      c.fillStyle = 'rgba(80,40,10,0.25)';
      c.fillRect(0, r * 64, 512, 2);
      for (let g = 0; g < 6; g++) {
        c.fillStyle = 'rgba(90,50,20,0.06)';
        c.fillRect(0, r * 64 + 8 + g * 9, 512, 2);
      }
    }
  }, [4, 2]);
const dotsWall = (bg: string, dot: string) =>
  canvasTex(`dots${bg}`, 256, 256, (c) => {
    c.fillStyle = bg;
    c.fillRect(0, 0, 256, 256);
    c.fillStyle = dot;
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        c.beginPath();
        c.arc(i * 64 + (j % 2) * 32 + 16, j * 64 + 16, 5, 0, Math.PI * 2);
        c.fill();
      }
  }, [8, 4]);
const tiles = (a: string, b: string, key: string, rep: [number, number]) =>
  canvasTex(key, 256, 256, (c) => {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        c.fillStyle = (i + j) % 2 ? a : b;
        c.fillRect(i * 64, j * 64, 64, 64);
      }
    c.strokeStyle = 'rgba(0,0,0,0.08)';
    c.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      c.beginPath();
      c.moveTo(i * 64, 0);
      c.lineTo(i * 64, 256);
      c.moveTo(0, i * 64);
      c.lineTo(256, i * 64);
      c.stroke();
    }
  }, rep);
const sky = (top: string, bottom: string, key: string) =>
  canvasTex(key, 4, 256, (c) => {
    const g = c.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    c.fillStyle = g;
    c.fillRect(0, 0, 4, 256);
  });
const grass = () =>
  canvasTex('grass', 512, 512, (c) => {
    c.fillStyle = '#6DB553';
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 2500; i++) {
      c.fillStyle = rnd(i) > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(20,80,20,0.08)';
      c.fillRect(rnd(i + 1) * 512, rnd(i + 2) * 512, 3, 9);
    }
  }, [10, 6]);

const std = (color: string, o: Partial<THREE.MeshStandardMaterialParameters> = {}) => <meshStandardMaterial color={color} roughness={0.75} {...o} />;
type V3 = [number, number, number];
const Box: React.FC<{ a: V3; p: V3; c: string; r?: number; rot?: V3; e?: number }> = ({ a, p, c, r = 0.08, rot, e }) => (
  <RoundedBox args={a} radius={Math.min(r, Math.min(...a) / 2 - 0.001)} smoothness={3} position={p} rotation={rot} castShadow receiveShadow>
    {std(c, e ? { emissive: c, emissiveIntensity: e } : {})}
  </RoundedBox>
);
const Sph: React.FC<{ p: V3; s: V3 | number; c: string; e?: number }> = ({ p, s, c, e }) => (
  <mesh position={p} scale={typeof s === 'number' ? [s, s, s] : s} castShadow receiveShadow>
    <sphereGeometry args={[1, 32, 20]} />
    {std(c, e ? { emissive: c, emissiveIntensity: e } : {})}
  </mesh>
);
const Cyl: React.FC<{ p: V3; r: number; r2?: number; h: number; c: string; rot?: V3; e?: number; seg?: number }> = ({ p, r, r2, h, c, rot, e, seg = 32 }) => (
  <mesh position={p} rotation={rot} castShadow receiveShadow>
    <cylinderGeometry args={[r, r2 ?? r, h, seg]} />
    {std(c, e ? { emissive: c, emissiveIntensity: e } : {})}
  </mesh>
);

const Cloud3D: React.FC<{ p: V3; s?: number; c?: string }> = ({ p, s = 1, c = '#FFFFFF' }) => (
  <group position={p} scale={s}>
    {[
      [0, 0, 0, 1],
      [-0.9, -0.2, 0, 0.75],
      [0.9, -0.15, 0, 0.8],
      [0.35, 0.45, 0, 0.7],
    ].map(([x, y, z, r], i) => (
      <mesh key={i} position={[x, y, z]} scale={[r, r * 0.8, r * 0.6]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.35} roughness={1} />
      </mesh>
    ))}
  </group>
);

export type Weather = 'rain' | 'rainbow' | 'snow' | undefined;
const RAINBOW = ['#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C', '#4DABF7', '#9775FA'];

const Window3D: React.FC<{ p: V3; w: number; h: number; t: number; night?: boolean; curtain?: string; weather?: Weather }> = ({ p, w, h, t, night, curtain, weather }) => {
  const rain = weather === 'rain';
  const skyT = useMemo(
    () =>
      rain
        ? sky('#6E7C96', '#AEB9CB', 'skyR')
        : weather === 'snow'
          ? sky('#3D5A9E', '#9DB4E0', 'skySnow')
          : sky(night ? '#1B2550' : '#6CBDF2', night ? '#3B3F7A' : '#D3EEFF', night ? 'skyN' : 'skyD'),
    [night, rain, weather],
  );
  return (
    <group position={p}>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={skyT} />
      </mesh>
      {rain ? (
        <>
          <Cloud3D p={[(((t * 0.05 + 0.2) % 1.4) - 0.7) * w, h * 0.25, -0.03]} s={0.45} c="#8C96A8" />
          <Cloud3D p={[(((t * 0.04 + 0.8) % 1.4) - 0.7) * w, h * 0.12, -0.035]} s={0.38} c="#7A8497" />
          {/* raindrops: thin streaks falling diagonally behind the glass */}
          {Array.from({ length: 46 }).map((_, i) => {
            const fall = (t * (5.5 + rnd(i) * 2) + rnd(i + 7) * h) % h;
            return (
              <mesh key={i} position={[(rnd(i + 2) - 0.5) * w * 0.95 - fall * 0.08, h / 2 - fall, -0.025]} rotation={[0, 0, 0.08]}>
                <planeGeometry args={[0.025, 0.28]} />
                <meshBasicMaterial color="#E7F1FF" transparent opacity={0.75} />
              </mesh>
            );
          })}
          <mesh position={[0, -h * 0.42, -0.04]} scale={[w * 0.7, h * 0.2, 0.05]}>
            <sphereGeometry args={[1, 24, 12]} />
            <meshBasicMaterial color="#6E9A5C" />
          </mesh>
        </>
      ) : weather === 'snow' ? (
        <>
          {Array.from({ length: 40 }).map((_, i) => {
            const fall = (t * (0.35 + rnd(i) * 0.3) + rnd(i + 7) * h) % h;
            return <Sph key={i} p={[(rnd(i + 2) - 0.5) * w * 0.95 + Math.sin(t + i) * 0.08, h / 2 - fall, -0.025]} s={0.035 + rnd(i + 4) * 0.03} c="#FFFFFF" e={0.6} />;
          })}
          <mesh position={[0, -h * 0.42, -0.04]} scale={[w * 0.7, h * 0.2, 0.05]}>
            <sphereGeometry args={[1, 24, 12]} />
            <meshBasicMaterial color="#F1F3F5" />
          </mesh>
        </>
      ) : night ? (
        <>
          <Sph p={[w * 0.22, h * 0.2, -0.02]} s={0.42} c="#FFF4C2" e={1.2} />
          {Array.from({ length: 10 }).map((_, i) => (
            <Sph key={i} p={[(rnd(i) - 0.5) * w * 0.9, (rnd(i + 3) - 0.3) * h * 0.8, -0.03]} s={0.04 + 0.03 * Math.sin(t * 2 + i) ** 2} c="#FFFFFF" e={2} />
          ))}
        </>
      ) : (
        <>
          {weather === 'rainbow' &&
            RAINBOW.map((c, i) => (
              <mesh key={c} position={[0, -h * 0.45, -0.045]} scale={[1, 0.85, 1]}>
                <torusGeometry args={[w * 0.42 - i * 0.075, 0.04, 8, 48, Math.PI]} />
                <meshBasicMaterial color={c} />
              </mesh>
            ))}
          <Cloud3D p={[(((t * 0.12 + 0.3) % 1.4) - 0.7) * w, h * 0.18, -0.03]} s={0.32} />
          <Cloud3D p={[(((t * 0.07 + 0.9) % 1.4) - 0.7) * w, -h * 0.05, -0.03]} s={0.22} />
          <mesh position={[0, -h * 0.42, -0.04]} scale={[w * 0.7, h * 0.2, 0.05]}>
            <sphereGeometry args={[1, 24, 12]} />
            <meshBasicMaterial color="#9BD37A" />
          </mesh>
        </>
      )}
      {/* frame */}
      <Box a={[w + 0.3, 0.18, 0.2]} p={[0, h / 2 + 0.05, 0]} c="#FFFFFF" />
      <Box a={[w + 0.5, 0.2, 0.45]} p={[0, -h / 2 - 0.05, 0.12]} c="#FFFFFF" />
      <Box a={[0.18, h + 0.2, 0.2]} p={[-w / 2 - 0.05, 0, 0]} c="#FFFFFF" />
      <Box a={[0.18, h + 0.2, 0.2]} p={[w / 2 + 0.05, 0, 0]} c="#FFFFFF" />
      <Box a={[0.1, h, 0.1]} p={[0, 0, 0]} c="#FFFFFF" />
      <Box a={[w, 0.1, 0.1]} p={[0, 0, 0]} c="#FFFFFF" />
      {curtain && (
        <>
          <Cyl p={[0, h / 2 + 0.45, 0.35]} r={0.05} h={w + 1.6} c="#B08968" rot={[0, 0, Math.PI / 2]} />
          {[-1, 1].map((sd) => (
            <group key={sd} position={[sd * (w / 2 + 0.35), 0, 0.35]}>
              {[0, 1, 2].map((k) => (
                <Cyl key={k} p={[sd * (k - 1) * 0.16, 0, 0]} r={0.13} h={h + 0.9} c={curtain} seg={16} />
              ))}
            </group>
          ))}
        </>
      )}
    </group>
  );
};

const Plant3D: React.FC<{ p: V3; s?: number; t: number }> = ({ p, s = 1, t }) => (
  <group position={p} scale={s}>
    <Cyl p={[0, 0.45, 0]} r={0.5} r2={0.38} h={0.9} c="#E07A5F" />
    <Cyl p={[0, 0.92, 0]} r={0.56} h={0.14} c="#EE8D72" />
    {[-0.6, -0.25, 0.1, 0.45, 0.8, -0.95].map((a, i) => (
      <group key={i} position={[0, 1.0, 0]} rotation={[Math.sin(i * 2) * 0.3, i * 1.1, a + Math.sin(t * 1.2 + i) * 0.04]}>
        <mesh position={[0, 0.75, 0]} scale={[0.2, 0.8, 0.07]} castShadow>
          <sphereGeometry args={[1, 16, 12]} />
          {std(i % 2 ? '#4E9F5A' : '#66B86F')}
        </mesh>
      </group>
    ))}
  </group>
);

const Frame3D: React.FC<{ p: V3; w: number; h: number; c: string; children?: React.ReactNode }> = ({ p, w, h, c, children }) => (
  <group position={p}>
    <Box a={[w + 0.16, h + 0.16, 0.08]} p={[0, 0, 0]} c="#C08552" r={0.03} />
    <mesh position={[0, 0, 0.05]}>
      <planeGeometry args={[w, h]} />
      {std(c)}
    </mesh>
    <group position={[0, 0, 0.07]}>{children}</group>
  </group>
);

const Room: React.FC<{ wall: THREE.Texture; floor: THREE.Texture; wallTint?: string }> = ({ wall, floor }) => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 3]} receiveShadow>
      <planeGeometry args={[44, 16]} />
      <meshStandardMaterial map={floor} roughness={0.55} />
    </mesh>
    <mesh position={[0, 7, WALL]} receiveShadow>
      <planeGeometry args={[44, 14]} />
      <meshStandardMaterial map={wall} roughness={0.95} />
    </mesh>
  </>
);

/** Bunting across the wall (triangle flags). */
const Bunting3D: React.FC<{ y: number; colors: string[]; t: number }> = ({ y, colors, t }) => (
  <group position={[0, y, WALL + 0.25]}>
    {Array.from({ length: 21 }, (_, i) => {
      const x = (i - 10) * 0.95;
      const sag = Math.cos((x / 10) * Math.PI) * 0.35;
      return (
        <mesh key={i} position={[x, -sag, 0]} rotation={[0, 0, Math.PI + Math.sin(t * 1.5 + i) * 0.06]}>
          <coneGeometry args={[0.32, 0.6, 3]} />
          {std(colors[i % colors.length])}
        </mesh>
      );
    })}
  </group>
);

const Bat3D: React.FC<{ p: V3; t: number; s?: number }> = ({ p, t, s = 1 }) => (
  <group position={p} scale={s} rotation={[0, 0, Math.sin(t * 2 + p[0]) * 0.15]}>
    <Sph p={[0, 0, 0]} s={[0.16, 0.2, 0.08]} c="#2B2A33" />
    {[-1, 1].map((sd) => (
      <mesh key={sd} position={[sd * 0.32, 0.05, 0]} rotation={[0, 0, sd * (0.3 + Math.sin(t * 6) * 0.25)]} scale={[1, 0.45, 0.1]}>
        <coneGeometry args={[0.3, 0.6, 3]} />
        {std('#2B2A33')}
      </mesh>
    ))}
  </group>
);

/** String of small glowing bulbs along the top of the wall. */
const Lights3DString: React.FC<{ y: number; t: number; colors: string[] }> = ({ y, t, colors }) => (
  <group position={[0, y, WALL + 0.3]}>
    {Array.from({ length: 34 }, (_, i) => {
      const x = (i - 16.5) * 0.6;
      const on = Math.sin(t * 3 + i * 1.3) > -0.3;
      return (
        <mesh key={i} position={[x, -Math.cos((x / 10) * Math.PI) * 0.25, 0]}>
          <sphereGeometry args={[0.08, 10, 8]} />
          <meshBasicMaterial color={on ? colors[i % colors.length] : '#666'} toneMapped={false} />
        </mesh>
      );
    })}
  </group>
);

const Living3D: React.FC<{ t: number; weather?: Weather; deco?: 'halloween' | 'christmas' }> = ({ t, weather, deco }) => {
  const wall = useMemo(() => dotsWall('#FFEBD4', '#F3C9A0'), []);
  const floor = useMemo(() => wood('#DDA16B', '#CF915C'), []);
  return (
    <group>
      <Room wall={wall} floor={floor} />
      {/* wainscot */}
      <Box a={[44, 2.2, 0.15]} p={[0, 1.1, WALL + 0.08]} c="#F3CDA3" r={0.02} />
      <Box a={[44, 0.14, 0.25]} p={[0, 2.22, WALL + 0.12]} c="#E9BC8E" r={0.02} />
      <Box a={[44, 0.25, 0.2]} p={[0, 0.12, WALL + 0.14]} c="#E2B386" r={0.02} />
      <Window3D p={[-6.2, 5.1, WALL + 0.1]} w={3.6} h={3.3} t={t} curtain="#C9A7E8" weather={weather} night={deco === 'halloween'} />
      {deco === 'halloween' && (
        <group>
          <Bunting3D y={8.2} colors={['#FD7E14', '#7048E8', '#2B2A33']} t={t} />
          <Bat3D p={[-3.0, 7.3, WALL + 0.2]} t={t} />
          <Bat3D p={[3.6, 7.1, WALL + 0.2]} t={t} s={0.8} />
          <Bat3D p={[4.6, 7.6, WALL + 0.2]} t={t} s={0.6} />
          <group position={[-8.6, 0, WALL + 1.4]}>
            <Pumpkin3D t={t} s={1.1} />
          </group>
          <group position={[-7.5, 0, WALL + 1.9]}>
            <Pumpkin3D t={t + 1} s={0.7} />
          </group>
          <group position={[10.2, 0, WALL + 3.4]}>
            <Pumpkin3D t={t + 2} s={0.9} />
          </group>
          <pointLight position={[-8, 1.5, WALL + 3]} intensity={5} distance={6} color="#FF922B" />
        </group>
      )}
      {deco === 'christmas' && (
        <group>
          <Lights3DString y={8.3} t={t} colors={['#FFD43B', '#FF6B6B', '#69DB7C', '#4DABF7']} />
          <group position={[-9.3, 0, WALL + 1.8]}>
            <XmasTree3D t={t} s={1.15} />
          </group>
          <pointLight position={[-9, 3, WALL + 3.5]} intensity={4} distance={7} color="#FFE8A3" />
        </group>
      )}
      <Frame3D p={[-1.6, 6.1, WALL + 0.1]} w={1.5} h={1.2} c="#BDE0FE">
        <Sph p={[0, 0, 0]} s={[0.32, 0.32, 0.05]} c="#FFD166" />
      </Frame3D>
      <Frame3D p={[0.3, 6.3, WALL + 0.1]} w={1.3} h={1.7} c="#FFD6E0">
        <mesh scale={0.32} position={[0, -0.05, 0]}>
          <extrudeGeometry
            args={[
              (() => {
                const sh = new THREE.Shape();
                sh.moveTo(0, -0.6);
                sh.bezierCurveTo(-1.2, 0.1, -0.6, 1.0, 0, 0.45);
                sh.bezierCurveTo(0.6, 1.0, 1.2, 0.1, 0, -0.6);
                return sh;
              })(),
              { depth: 0.2, bevelEnabled: false },
            ]}
          />
          {std('#F0426B')}
        </mesh>
      </Frame3D>
      <Frame3D p={[2.1, 5.9, WALL + 0.1]} w={1.2} h={1.0} c="#CDEAC0">
        <Sph p={[0, -0.1, 0]} s={[0.18, 0.14, 0.05]} c="#8B5E3C" />
      </Frame3D>
      {/* sofa */}
      <group position={[6.6, 0, WALL + 1.6]}>
        <Box a={[5.6, 1.1, 2.0]} p={[0, 0.85, 0]} c="#4FB0A5" r={0.35} />
        <Box a={[5.2, 1.7, 0.6]} p={[0, 2.0, -0.75]} c="#5CC2B6" r={0.3} />
        <Box a={[0.8, 1.7, 2.1]} p={[-2.8, 1.25, 0]} c="#5CC2B6" r={0.35} />
        <Box a={[0.8, 1.7, 2.1]} p={[2.8, 1.25, 0]} c="#5CC2B6" r={0.35} />
        <Box a={[1.3, 1.0, 0.35]} p={[-1.3, 2.0, -0.35]} c="#FFD166" r={0.3} rot={[0, 0, -0.12]} />
        <Box a={[1.3, 1.0, 0.35]} p={[1.3, 2.0, -0.35]} c="#F497B6" r={0.3} rot={[0, 0, 0.12]} />
        {[-2.5, 2.5].map((x) => (
          <Cyl key={x} p={[x, 0.15, 0.6]} r={0.12} h={0.3} c="#7A5235" />
        ))}
      </group>
      {/* floor lamp */}
      <group position={[2.6, 0, WALL + 0.9]}>
        <Cyl p={[0, 0.06, 0]} r={0.5} h={0.12} c="#8C6A4F" />
        <Cyl p={[0, 2.3, 0]} r={0.06} h={4.5} c="#8C6A4F" />
        <Cyl p={[0, 4.75, 0]} r={0.45} r2={0.75} h={0.9} c="#FFE8A3" e={0.6} />
        <pointLight position={[0, 4.3, 0.6]} intensity={6} distance={7} color="#FFD98A" />
      </group>
      {deco !== 'christmas' && <Plant3D p={[-3.3, 0, WALL + 0.9]} s={1.1} t={t} />}
      {/* rug */}
      <mesh position={[0, 0.02, 0.4]} scale={[7.2, 1, 2.3]} receiveShadow>
        <cylinderGeometry args={[1, 1, 0.04, 64]} />
        {std('#8EC5E8', { roughness: 1 })}
      </mesh>
      <mesh position={[0, 0.045, 0.4]} scale={[6.6, 1, 2.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 1, 64]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

const Kitchen3D: React.FC<{ t: number }> = ({ t }) => {
  const wall = useMemo(() => tiles('#E9F7F1', '#DCF1E8', 'ktwall', [12, 4]), []);
  const floor = useMemo(() => tiles('#F1E3D3', '#E3CDB6', 'ktfloor', [14, 5]), []);
  return (
    <group>
      <Room wall={wall} floor={floor} />
      {/* upper cabinets */}
      {[-8.2, -6.2, -4.2, 3.9, 5.8].map((x) => (
        <group key={x} position={[x, 7.2, WALL + 0.5]}>
          <Box a={[1.85, 2.4, 1.0]} p={[0, 0, 0]} c="#FFF8EC" r={0.1} />
          <Box a={[0.12, 0.45, 0.1]} p={[0.65, -0.85, 0.52]} c="#B08968" r={0.04} />
        </group>
      ))}
      <Window3D p={[0, 6.3, WALL + 0.1]} w={3.8} h={2.6} t={t} curtain="#F7B2BD" />
      {/* utensil rail */}
      <Cyl p={[0, 4.65, WALL + 0.3]} r={0.04} h={4.6} c="#B08968" rot={[0, 0, Math.PI / 2]} />
      {[-1.8, -0.8, 1.0, 1.9].map((x, i) => (
        <group key={x} position={[x, 4.62, WALL + 0.35]} rotation={[0, 0, Math.sin(t * 1.5 + i) * 0.05]}>
          <Cyl p={[0, -0.35, 0]} r={0.03} h={0.7} c="#8D99AE" />
          {i % 2 ? <Cyl p={[0, -0.85, 0]} r={0.3} h={0.06} c="#8D99AE" rot={[Math.PI / 2, 0, 0]} /> : <Sph p={[0, -0.9, 0]} s={[0.17, 0.27, 0.06]} c="#EF8354" />}
        </group>
      ))}
      {/* counter */}
      <Box a={[17, COUNTER_TOP - 0.25, 2.1]} p={[-1.6, (COUNTER_TOP - 0.25) / 2, COUNTER_Z]} c="#9FD3C3" r={0.06} />
      {[-9, -6.4, -3.8, -1.2, 1.4, 4.0].map((x) => (
        <group key={x}>
          <Box a={[2.3, COUNTER_TOP - 0.7, 0.08]} p={[x + 1.15, (COUNTER_TOP - 0.25) / 2, COUNTER_Z + 1.07]} c="#AEDCCD" r={0.04} />
          <Box a={[0.45, 0.1, 0.1]} p={[x + 1.15, COUNTER_TOP - 0.65, COUNTER_Z + 1.14]} c="#5E8C7E" r={0.04} />
        </group>
      ))}
      <Box a={[17.3, 0.25, 2.4]} p={[-1.6, COUNTER_TOP - 0.12, COUNTER_Z + 0.05]} c="#E6C9A8" r={0.06} />
      {/* stove */}
      <Box a={[2.4, 0.08, 1.4]} p={[-5.5, COUNTER_TOP + 0.04, COUNTER_Z]} c="#4A4E69" r={0.03} />
      {[-6.0, -5.0].map((x) => (
        <Cyl key={x} p={[x, COUNTER_TOP + 0.1, COUNTER_Z]} r={0.32} h={0.04} c="#22223B" />
      ))}
      {/* fridge */}
      <group position={[8.6, 0, WALL + 1.3]}>
        <Box a={[2.7, 6.2, 2.2]} p={[0, 3.1, 0]} c="#F8F9FA" r={0.3} />
        <Box a={[2.72, 0.06, 2.22]} p={[0, 4.1, 0]} c="#CED4DA" r={0.02} />
        <Box a={[0.14, 1.0, 0.14]} p={[-1.0, 4.9, 1.15]} c="#ADB5BD" r={0.05} />
        <Box a={[0.14, 1.4, 0.14]} p={[-1.0, 3.2, 1.15]} c="#ADB5BD" r={0.05} />
        <Box a={[0.9, 0.7, 0.03]} p={[0.3, 3.4, 1.12]} c="#FFF3BF" r={0.01} rot={[0, 0, -0.08]} />
        <Sph p={[0.3, 3.4, 1.14]} s={[0.2, 0.2, 0.02]} c="#FFA94D" />
        <Sph p={[0.6, 5.6, 1.13]} s={0.12} c="#F03E3E" />
        <Sph p={[0.1, 5.4, 1.13]} s={0.12} c="#37B24D" />
      </group>
    </group>
  );
};

const Tree3D: React.FC<{ p: V3; s?: number; c?: string; t: number }> = ({ p, s = 1, c = '#5BAA4A', t }) => (
  <group position={p} scale={s}>
    <Cyl p={[0, 1.2, 0]} r={0.25} r2={0.38} h={2.4} c="#8B5E3C" />
    <group rotation={[0, 0, Math.sin(t * 0.9 + p[0]) * 0.02]}>
      <Sph p={[0, 3.4, 0]} s={1.6} c={c} />
      <Sph p={[-1.1, 2.8, 0.3]} s={1.15} c={c} />
      <Sph p={[1.1, 2.9, 0.2]} s={1.1} c={c} />
      <Sph p={[0.2, 2.7, 1.0]} s={1.0} c={c} />
    </group>
  </group>
);

const Park3D: React.FC<{ t: number; variant?: string }> = ({ t, variant }) => {
  const sunset = variant === 'sunset';
  const night = variant === 'night';
  const skyT = useMemo(
    () => (night ? sky('#141A45', '#4B3E8C', 'skyPN') : sky(sunset ? '#FF9E7A' : '#5DB8F2', sunset ? '#FFE3A3' : '#DDF2FF', sunset ? 'skyS' : 'skyP')),
    [sunset, night],
  );
  const g = useMemo(() => grass(), []);
  return (
    <group>
      <mesh position={[0, 12, -30]}>
        <planeGeometry args={[120, 50]} />
        <meshBasicMaterial map={skyT} />
      </mesh>
      <Sph p={[14, 16, -28]} s={2.2} c={night ? '#FFF4C2' : sunset ? '#FFB347' : '#FFE066'} e={1.2} />
      {night &&
        Array.from({ length: 40 }).map((_, i) => (
          <Sph key={i} p={[(rnd(i) - 0.5) * 70, 9 + rnd(i + 3) * 20, -29]} s={0.08 + 0.06 * Math.sin(t * 2 + i) ** 2} c="#FFFFFF" e={2} />
        ))}
      {night &&
        [-6, 6].map((x) => (
          <group key={x} position={[x, 0, -3.5]}>
            <Cyl p={[0, 2.2, 0]} r={0.09} h={4.4} c="#343A40" />
            <Sph p={[0, 4.6, 0]} s={0.38} c="#FFE8A3" e={2} />
            <pointLight position={[0, 4.4, 0.5]} intensity={10} distance={9} color="#FFD98A" />
          </group>
        ))}
      {!night && [0, 1, 2].map((i) => (
        <Cloud3D key={i} p={[(((t * (0.25 + i * 0.07) + i * 9) % 60) - 30), 13 + i * 2.5, -26]} s={1.8 + i * 0.4} />
      ))}
      <mesh position={[-10, -6, -22]} scale={[22, 10, 6]}>
        <sphereGeometry args={[1, 32, 16]} />
        {std('#9ED37F')}
      </mesh>
      <mesh position={[14, -7, -20]} scale={[24, 10, 6]}>
        <sphereGeometry args={[1, 32, 16]} />
        {std('#8CCB6E')}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2]} receiveShadow>
        <planeGeometry args={[80, 40]} />
        <meshStandardMaterial map={g} roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2]} scale={[4, 12, 1]} receiveShadow>
        <circleGeometry args={[1, 48]} />
        {std('#E9D5A8', { roughness: 1 })}
      </mesh>
      <Tree3D p={[-8.5, 0, -6]} s={1.3} t={t} />
      <Tree3D p={[7.5, 0, -8]} s={1.1} c="#4F9D44" t={t} />
      <Tree3D p={[11, 0, -4]} s={1.4} t={t} />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = (rnd(i) - 0.5) * 24;
        if (Math.abs(x) < 3) return null;
        const col = ['#FF6B9A', '#FFD43B', '#FFFFFF', '#B197FC'][i % 4];
        return (
          <group key={i} position={[x, 0, -3 + rnd(i + 5) * 6]} rotation={[0, 0, Math.sin(t * 2 + i) * 0.1]}>
            <Cyl p={[0, 0.2, 0]} r={0.025} h={0.4} c="#3F8F3A" seg={6} />
            <Sph p={[0, 0.45, 0]} s={[0.16, 0.12, 0.16]} c={col} />
            <Sph p={[0, 0.48, 0.05]} s={0.06} c="#F59F00" />
          </group>
        );
      })}
    </group>
  );
};

const Bedroom3D: React.FC<{ t: number; day?: boolean }> = ({ t, day }) => {
  const wall = useMemo(() => (day ? dotsWall('#D3F0E5', '#B2E5D1') : dotsWall('#45428A', '#5A55A8')), [day]);
  const floor = useMemo(() => wood('#8C6A8F', '#7D5E82'), []);
  return (
    <group>
      <Room wall={wall} floor={floor} />
      <Window3D p={[4.8, 5.4, WALL + 0.1]} w={3.6} h={3.2} t={t} night={!day} curtain={day ? '#74C0FC' : '#7B6FD0'} />
      <group position={[-6.2, 0, WALL + 2.0]}>
        <Box a={[0.4, 3.0, 3.2]} p={[-3.0, 1.5, 0]} c="#C08552" r={0.12} />
        <Box a={[6.0, 0.9, 3.0]} p={[0, 1.0, 0]} c="#FFFFFF" r={0.3} />
        <Box a={[5.0, 0.5, 3.1]} p={[0.5, 1.5, 0]} c="#74C0FC" r={0.25} />
        <Box a={[1.5, 0.5, 1.0]} p={[-2.1, 1.75, 0]} c="#FFF0F6" r={0.24} />
        <Box a={[0.4, 2.0, 3.2]} p={[3.0, 1.0, 0]} c="#C08552" r={0.12} />
      </group>
      <group position={[0.5, 0, WALL + 0.8]}>
        <Box a={[1.4, 1.6, 1.0]} p={[0, 0.8, 0]} c="#9775FA" r={0.12} />
        <Sph p={[0, 2.0, 0]} s={0.4} c="#FFE8A3" e={1.5} />
        <pointLight position={[0, 2.2, 0.8]} intensity={8} distance={8} color="#FFD98A" />
      </group>
    </group>
  );
};

const Dentist3D: React.FC<{ t: number }> = ({ t }) => {
  const wall = useMemo(() => tiles('#E7F5FF', '#DCEEFB', 'dtwall', [12, 5]), []);
  const floor = useMemo(() => tiles('#F8F9FA', '#E9ECEF', 'dtfloor', [14, 5]), []);
  return (
    <group>
      <Room wall={wall} floor={floor} />
      <Box a={[44, 1.6, 0.15]} p={[0, 0.8, WALL + 0.08]} c="#A5D8FF" r={0.02} />
      <Window3D p={[6.4, 5.4, WALL + 0.1]} w={3.2} h={2.8} t={t} curtain="#96F2D7" />
      {/* tooth poster */}
      <Frame3D p={[-6.6, 5.6, WALL + 0.1]} w={1.9} h={2.3} c="#C3FAE8">
        <Sph p={[0, 0.25, 0]} s={[0.5, 0.42, 0.12]} c="#FFFFFF" />
        <Sph p={[-0.22, -0.25, 0]} s={[0.18, 0.4, 0.1]} c="#FFFFFF" />
        <Sph p={[0.22, -0.25, 0]} s={[0.18, 0.4, 0.1]} c="#FFFFFF" />
        <Sph p={[-0.15, 0.32, 0.1]} s={0.05} c="#343A40" />
        <Sph p={[0.15, 0.32, 0.1]} s={0.05} c="#343A40" />
        <mesh position={[0, 0.16, 0.11]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.12, 0.025, 8, 20, Math.PI]} />
          {std('#343A40')}
        </mesh>
      </Frame3D>
      <Frame3D p={[-3.9, 6.0, WALL + 0.1]} w={1.3} h={1.0} c="#FFE3E3">
        <Sph p={[0, 0, 0]} s={[0.3, 0.3, 0.05]} c="#FFD43B" />
      </Frame3D>
      {/* dentist chair */}
      <group position={[-2.6, 0, WALL + 2.4]} rotation={[0, 0.35, 0]}>
        <Cyl p={[0, 0.1, 0]} r={0.9} h={0.2} c="#ADB5BD" />
        <Cyl p={[0, 0.7, 0]} r={0.22} h={1.1} c="#CED4DA" />
        <Box a={[1.6, 0.45, 2.2]} p={[0, 1.4, 0.2]} c="#4DABF7" r={0.2} />
        <Box a={[1.5, 2.2, 0.45]} p={[0, 2.5, -0.95]} c="#4DABF7" r={0.2} rot={[-0.35, 0, 0]} />
        <Box a={[0.9, 0.5, 0.4]} p={[0, 3.75, -1.35]} c="#74C0FC" r={0.18} rot={[-0.35, 0, 0]} />
        <Box a={[1.4, 0.3, 1.3]} p={[0, 1.1, 1.65]} c="#4DABF7" r={0.14} rot={[0.5, 0, 0]} />
        {[-1, 1].map((sd) => (
          <Box key={sd} a={[0.25, 0.25, 1.4]} p={[sd * 0.95, 1.9, 0.1]} c="#339AF0" r={0.1} />
        ))}
      </group>
      {/* overhead lamp */}
      <group position={[-1.2, 0, WALL + 0.6]}>
        <Cyl p={[0, 4.2, 0]} r={0.08} h={8.4} c="#DEE2E6" />
        <Cyl p={[-0.9, 6.3, 0.8]} r={0.06} h={2.4} c="#DEE2E6" rot={[0.6, 0, 1.1]} />
        <group position={[-1.7, 5.6, 1.6]} rotation={[0.9, 0, 0.3]}>
          <Cyl p={[0, 0, 0]} r={0.55} r2={0.4} h={0.25} c="#F1F3F5" />
          <Cyl p={[0, -0.14, 0]} r={0.42} h={0.04} c="#FFF9DB" e={1.6} />
        </group>
        <pointLight position={[-1.7, 5.0, 2.2]} intensity={5} distance={7} color="#FFFBEA" />
      </group>
      {/* tool cabinet */}
      <group position={[2.9, 0, WALL + 1.0]}>
        <Box a={[2.4, 2.6, 1.4]} p={[0, 1.3, 0]} c="#FFFFFF" r={0.12} />
        {[0.6, 1.4, 2.2].map((y) => (
          <Box key={y} a={[2.1, 0.06, 0.06]} p={[0, y, 0.72]} c="#CED4DA" r={0.02} />
        ))}
        <Cyl p={[-0.6, 2.85, 0]} r={0.18} h={0.5} c="#63E6BE" />
        <Cyl p={[0.0, 2.8, 0.1]} r={0.15} h={0.4} c="#FFA8A8" />
        <Plant3D p={[0.65, 2.6, 0]} s={0.45} t={t} />
      </group>
    </group>
  );
};

const chalkboard = () =>
  canvasTex('chalk', 1024, 512, (c) => {
    c.fillStyle = '#2F5D50';
    c.fillRect(0, 0, 1024, 512);
    for (let i = 0; i < 400; i++) {
      c.fillStyle = 'rgba(255,255,255,0.03)';
      c.fillRect(rnd(i) * 1024, rnd(i + 1) * 512, 30, 3);
    }
    c.fillStyle = '#F8F9FA';
    c.font = 'bold 120px sans-serif';
    c.textAlign = 'center';
    c.fillText('¡Hola!', 512, 190);
    c.font = 'bold 90px sans-serif';
    c.fillStyle = '#FFE066';
    c.fillText('A  B  C', 300, 380);
    c.fillStyle = '#99E9F2';
    c.fillText('1 + 2 = 3', 740, 380);
  });

const School3D: React.FC<{ t: number }> = ({ t }) => {
  const wall = useMemo(() => dotsWall('#FFF4DB', '#FFE8A3'), []);
  const floor = useMemo(() => wood('#E3B57E', '#D6A56C'), []);
  const board = useMemo(() => chalkboard(), []);
  const flags = ['#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C', '#4DABF7', '#9775FA', '#F783AC'];
  return (
    <group>
      <Room wall={wall} floor={floor} />
      <Box a={[44, 1.8, 0.15]} p={[0, 0.9, WALL + 0.08]} c="#FFD8A8" r={0.02} />
      {/* chalkboard */}
      <Box a={[7.4, 3.6, 0.2]} p={[-1.0, 5.3, WALL + 0.12]} c="#B07A4F" r={0.08} />
      <mesh position={[-1.0, 5.3, WALL + 0.24]}>
        <planeGeometry args={[7.0, 3.2]} />
        <meshStandardMaterial map={board} roughness={0.95} />
      </mesh>
      <Box a={[7.0, 0.14, 0.4]} p={[-1.0, 3.45, WALL + 0.35]} c="#B07A4F" r={0.04} />
      {/* alphabet bunting */}
      {flags.map((c, i) => (
        <mesh key={c} position={[-8.6 + i * 2.5, 8.4 - Math.sin((i / 6) * Math.PI) * 0.4, WALL + 0.2]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.45, 0.9, 3]} />
          {std(c)}
        </mesh>
      ))}
      <Window3D p={[6.6, 5.4, WALL + 0.1]} w={3.0} h={2.8} t={t} curtain="#FFC078" />
      {/* clock */}
      <group position={[3.6, 7.4, WALL + 0.15]}>
        <Cyl p={[0, 0, 0]} r={0.55} h={0.12} c="#FFFFFF" rot={[Math.PI / 2, 0, 0]} />
        <Box a={[0.06, 0.4, 0.04]} p={[0, 0.15, 0.08]} c="#343A40" r={0.01} />
        <Box a={[0.3, 0.05, 0.04]} p={[0.12, 0, 0.08]} c="#343A40" r={0.01} rot={[0, 0, t * 0.2]} />
      </group>
      {/* kids' desks in the back */}
      {[-6.8, -3.8, 4.6].map((x) => (
        <group key={x} position={[x, 0, WALL + 2.0]}>
          <Box a={[2.0, 0.12, 1.2]} p={[0, 1.7, 0]} c="#FFD43B" r={0.04} />
          {[-0.85, 0.85].map((lx) => (
            <Cyl key={lx} p={[lx, 0.85, 0]} r={0.06} h={1.7} c="#868E96" />
          ))}
          <Box a={[0.9, 0.12, 0.9]} p={[0, 1.0, 1.1]} c="#4DABF7" r={0.04} />
          <Box a={[0.9, 0.9, 0.12]} p={[0, 1.5, 1.55]} c="#4DABF7" r={0.04} />
          <Box a={[0.5, 0.06, 0.35]} p={[0.3, 1.8, 0.1]} c="#FF8787" r={0.02} />
        </group>
      ))}
      <Plant3D p={[8.6, 0, WALL + 0.8]} s={1.0} t={t} />
    </group>
  );
};


const sand = () =>
  canvasTex('sand', 512, 512, (c) => {
    c.fillStyle = '#F2D59A';
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 3000; i++) {
      c.fillStyle = rnd(i) > 0.5 ? 'rgba(255,255,255,0.12)' : 'rgba(150,100,40,0.1)';
      c.fillRect(rnd(i + 1) * 512, rnd(i + 2) * 512, 3, 3);
    }
  }, [10, 6]);

const Palm3D: React.FC<{ p: V3; s?: number; t: number }> = ({ p, s = 1, t }) => (
  <group position={p} scale={s}>
    {Array.from({ length: 7 }, (_, i) => (
      <Cyl key={i} p={[i * i * 0.012, 0.45 + i * 0.85, 0]} r={0.26 - i * 0.015} r2={0.3 - i * 0.015} h={0.9} c={i % 2 ? '#A97142' : '#B97E4C'} rot={[0, 0, -i * 0.03]} />
    ))}
    <group position={[0.6, 6.2, 0]} rotation={[0, 0, Math.sin(t * 0.9) * 0.04]}>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.1, -0.35, Math.sin(a) * 1.1]} rotation={[Math.sin(a) * 0.6, -a, -Math.cos(a) * 0.6]} scale={[1.6, 0.08, 0.45]} castShadow>
            <sphereGeometry args={[1, 16, 8]} />
            {std(i % 2 ? '#3E9E45' : '#4CB052')}
          </mesh>
        );
      })}
      <Sph p={[0.1, -0.3, 0.2]} s={0.22} c="#7A4E2D" />
      <Sph p={[-0.2, -0.32, -0.1]} s={0.2} c="#6B4226" />
    </group>
  </group>
);

const Beach3D: React.FC<{ t: number; variant?: string }> = ({ t, variant }) => {
  const sunset = variant === 'sunset';
  const skyT = useMemo(() => sky(sunset ? '#FF8E72' : '#4DB6F0', sunset ? '#FFD8A0' : '#D6F1FF', sunset ? 'skyBS' : 'skyB'), [sunset]);
  const sd = useMemo(() => sand(), []);
  return (
    <group>
      <mesh position={[0, 12, -40]}>
        <planeGeometry args={[150, 50]} />
        <meshBasicMaterial map={skyT} />
      </mesh>
      <Sph p={[-16, sunset ? 6 : 15, -38]} s={2.6} c={sunset ? '#FF9F43' : '#FFE066'} e={1.3} />
      {[0, 1, 2].map((i) => (
        <Cloud3D key={i} p={[((t * (0.2 + i * 0.05) + i * 13) % 70) - 35, 13 + i * 2.2, -36]} s={1.6 + i * 0.4} c={sunset ? '#FFE3D3' : '#FFFFFF'} />
      ))}
      {/* sea */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -24]}>
        <planeGeometry args={[160, 34]} />
        {std(sunset ? '#4F9FC9' : '#38B6D8', { roughness: 0.25, metalness: 0.1 })}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -8.4]}>
        <planeGeometry args={[160, 3]} />
        {std('#63D3E8', { roughness: 0.3 })}
      </mesh>
      {/* foam lines coming and going */}
      {[0, 1, 2].map((i) => {
        const k = (t * 0.18 + i / 3) % 1;
        return (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -12 + k * 5]}>
            <planeGeometry args={[160, 0.18 + 0.2 * Math.sin(k * Math.PI)]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.85 * Math.sin(k * Math.PI)} />
          </mesh>
        );
      })}
      {/* sand */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 4]} receiveShadow>
        <planeGeometry args={[160, 26]} />
        <meshStandardMaterial map={sd} roughness={1} />
      </mesh>
      <Palm3D p={[-10.5, 0, -5]} s={1.1} t={t} />
      <Palm3D p={[11, 0, -6]} s={1.25} t={t + 2} />
      {/* shells and a starfish */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = (rnd(i + 40) - 0.5) * 22;
        if (Math.abs(x) < 4) return null;
        return <Sph key={i} p={[x, 0.06, -2 + rnd(i + 41) * 5]} s={[0.14, 0.07, 0.12]} c={['#FFF0F6', '#FFD8A8', '#FFC9C9'][i % 3]} />;
      })}
      <mesh position={[-6.5, 0.05, 2.5]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <circleGeometry args={[0.3, 5]} />
        {std('#FF8787')}
      </mesh>
    </group>
  );
};

const signTex = () =>
  canvasTex('smsign', 1024, 192, (c) => {
    c.fillStyle = '#E03131';
    c.fillRect(0, 0, 1024, 192);
    c.fillStyle = '#FFFFFF';
    c.font = 'bold 110px sans-serif';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('SUPERMERCADO', 512, 100);
  });

/** Supermarket: long shelves full of colourful products, a checkout on the right. */
const Supermarket3D: React.FC = () => {
  const wall = useMemo(() => tiles('#F8F9FA', '#EEF1F4', 'smwall', [12, 4]), []);
  const floor = useMemo(() => tiles('#F1F3F5', '#DEE2E6', 'smfloor', [14, 5]), []);
  const sign = useMemo(() => signTex(), []);
  const COLORS = ['#FF6B6B', '#FFD43B', '#69DB7C', '#4DABF7', '#F783AC', '#FF922B', '#B197FC', '#FFFFFF'];
  return (
    <group>
      <Room wall={wall} floor={floor} />
      <mesh position={[0, 8.6, WALL + 0.12]}>
        <planeGeometry args={[7, 1.3]} />
        <meshBasicMaterial map={sign} />
      </mesh>
      {/* shelves along the back wall */}
      {[-6.5, 0, 6.5].map((sx) => (
        <group key={sx} position={[sx, 0, WALL + 0.9]}>
          <Box a={[5.6, 5.2, 1.2]} p={[0, 2.6, -0.2]} c="#DEE2E6" r={0.04} />
          {[0.6, 1.9, 3.2, 4.5].map((y, row) => (
            <group key={y}>
              <Box a={[5.6, 0.1, 1.3]} p={[0, y - 0.35, 0.05]} c="#ADB5BD" r={0.02} />
              {Array.from({ length: 9 }, (_, i) => {
                const k = i + row * 9 + Math.round(sx);
                const tall = 0.45 + rnd(k + 5) * 0.4;
                return k % 3 === 0 ? (
                  <Cyl key={i} p={[-2.5 + i * 0.62, y - 0.3 + tall / 2, 0.25]} r={0.2} h={tall} c={COLORS[Math.abs(k) % COLORS.length]} seg={14} />
                ) : (
                  <Box key={i} a={[0.5, tall, 0.4]} p={[-2.5 + i * 0.62, y - 0.3 + tall / 2, 0.25]} c={COLORS[Math.abs(k + 3) % COLORS.length]} r={0.03} />
                );
              })}
            </group>
          ))}
        </group>
      ))}
      {/* fruit stand on the left */}
      <group position={[-9.6, 0, -1.5]}>
        <Box a={[2.6, 1.3, 1.6]} p={[0, 0.65, 0]} c="#B08968" r={0.08} />
        {Array.from({ length: 14 }, (_, i) => (
          <Sph key={i} p={[-1 + (i % 7) * 0.33, 1.42 + Math.floor(i / 7) * 0.12, -0.3 + Math.floor(i / 7) * 0.45]} s={0.17} c={i < 7 ? '#FF6B6B' : '#FCC419'} />
        ))}
      </group>
      {/* checkout on the right */}
      <group position={[10.2, 0, -1.2]}>
        <Box a={[3.2, 1.6, 1.4]} p={[0, 0.8, 0]} c="#495057" r={0.1} />
        <Box a={[3.0, 0.08, 1.2]} p={[0, 1.64, 0]} c="#212529" r={0.02} />
        <Box a={[0.8, 0.7, 0.6]} p={[0.9, 2.0, 0]} c="#E9ECEF" r={0.08} />
        <Box a={[0.6, 0.35, 0.05]} p={[0.9, 2.2, 0.31]} c="#69DB7C" r={0.02} e={0.4} />
      </group>
    </group>
  );
};

export const Set3D: React.FC<{ bg: Background; variant?: string; t: number }> = ({ bg, variant, t }) => {
  switch (bg) {
    case 'dentist':
      return <Dentist3D t={t} />;
    case 'school':
      return <School3D t={t} />;
    case 'kitchen':
      return <Kitchen3D t={t} />;
    case 'park':
      return <Park3D t={t} variant={variant} />;
    case 'beach':
      return <Beach3D t={t} variant={variant} />;
    case 'supermarket':
      return <Supermarket3D />;
    case 'bedroom':
      return <Bedroom3D t={t} day={variant === 'day'} />;
    default:
      return (
        <Living3D
          t={t}
          weather={variant === 'rain' || variant === 'rainbow' ? variant : variant === 'christmas' ? 'snow' : undefined}
          deco={variant === 'halloween' || variant === 'christmas' ? variant : undefined}
        />
      );
  }
};
