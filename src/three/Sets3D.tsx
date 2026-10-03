import { RoundedBox } from '@react-three/drei';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { Background } from '../engine/script';

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

export type Weather = 'rain' | 'rainbow' | undefined;
const RAINBOW = ['#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C', '#4DABF7', '#9775FA'];

const Window3D: React.FC<{ p: V3; w: number; h: number; t: number; night?: boolean; curtain?: string; weather?: Weather }> = ({ p, w, h, t, night, curtain, weather }) => {
  const rain = weather === 'rain';
  const skyT = useMemo(
    () => (rain ? sky('#6E7C96', '#AEB9CB', 'skyR') : sky(night ? '#1B2550' : '#6CBDF2', night ? '#3B3F7A' : '#D3EEFF', night ? 'skyN' : 'skyD')),
    [night, rain],
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

const Living3D: React.FC<{ t: number; weather?: Weather }> = ({ t, weather }) => {
  const wall = useMemo(() => dotsWall('#FFEBD4', '#F3C9A0'), []);
  const floor = useMemo(() => wood('#DDA16B', '#CF915C'), []);
  return (
    <group>
      <Room wall={wall} floor={floor} />
      {/* wainscot */}
      <Box a={[44, 2.2, 0.15]} p={[0, 1.1, WALL + 0.08]} c="#F3CDA3" r={0.02} />
      <Box a={[44, 0.14, 0.25]} p={[0, 2.22, WALL + 0.12]} c="#E9BC8E" r={0.02} />
      <Box a={[44, 0.25, 0.2]} p={[0, 0.12, WALL + 0.14]} c="#E2B386" r={0.02} />
      <Window3D p={[-6.2, 5.1, WALL + 0.1]} w={3.6} h={3.3} t={t} curtain="#C9A7E8" weather={weather} />
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
      <Plant3D p={[-3.3, 0, WALL + 0.9]} s={1.1} t={t} />
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
  const skyT = useMemo(() => sky(sunset ? '#FF9E7A' : '#5DB8F2', sunset ? '#FFE3A3' : '#DDF2FF', sunset ? 'skyS' : 'skyP'), [sunset]);
  const g = useMemo(() => grass(), []);
  return (
    <group>
      <mesh position={[0, 12, -30]}>
        <planeGeometry args={[120, 50]} />
        <meshBasicMaterial map={skyT} />
      </mesh>
      <Sph p={[14, 16, -28]} s={2.2} c={sunset ? '#FFB347' : '#FFE066'} e={1.2} />
      {[0, 1, 2].map((i) => (
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

const Bedroom3D: React.FC<{ t: number }> = ({ t }) => {
  const wall = useMemo(() => dotsWall('#45428A', '#5A55A8'), []);
  const floor = useMemo(() => wood('#8C6A8F', '#7D5E82'), []);
  return (
    <group>
      <Room wall={wall} floor={floor} />
      <Window3D p={[4.8, 5.4, WALL + 0.1]} w={3.6} h={3.2} t={t} night curtain="#7B6FD0" />
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

export const Set3D: React.FC<{ bg: Background; variant?: string; t: number }> = ({ bg, variant, t }) => {
  switch (bg) {
    case 'kitchen':
      return <Kitchen3D t={t} />;
    case 'park':
      return <Park3D t={t} variant={variant} />;
    case 'bedroom':
      return <Bedroom3D t={t} />;
    default:
      return <Living3D t={t} weather={variant === 'rain' || variant === 'rainbow' ? variant : undefined} />;
  }
};
