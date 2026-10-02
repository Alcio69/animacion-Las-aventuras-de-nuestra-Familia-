import { RoundedBox } from '@react-three/drei';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { DESIGNS, type Design } from '../characters/design';
import { FACES } from '../characters/Face';
import type { CharId, Pose } from '../characters/types';

/** 1 world unit = 100 px of the 2D design, so both styles share proportions and scripts. */
export const S = 0.01;
const DEG = Math.PI / 180;
type V3 = [number, number, number];

// ---------- materials (cached per character) ----------
const matCache = new Map<string, ReturnType<typeof makeMats>>();
const physical = (color: string, o: Partial<THREE.MeshPhysicalMaterialParameters> = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.7, ...o });
const fabric = (color: string) => physical(color, { roughness: 0.9, sheen: 0.6, sheenRoughness: 0.8, sheenColor: new THREE.Color('#ffffff') });
const makeMats = (d: Design) => ({
  fur: physical(d.fur.base, { roughness: 0.62, sheen: 1, sheenRoughness: 0.45, sheenColor: new THREE.Color(d.fur.light) }),
  furLight: physical(d.fur.muzzle, { roughness: 0.65, sheen: 0.8, sheenRoughness: 0.5, sheenColor: new THREE.Color('#ffffff') }),
  ear: physical(d.fur.ear, { roughness: 0.7, sheen: 0.8, sheenColor: new THREE.Color(d.fur.light) }),
  stripe: physical(d.fur.stripe ?? d.fur.dark, { roughness: 0.7 }),
  pink: physical('#F4A3B4', { roughness: 0.6 }),
  top: fabric(d.top.base),
  topDark: fabric(d.top.dark),
  inner: fabric(d.inner ?? '#ffffff'),
  bottom: fabric(d.bottom.base),
  bottomDark: fabric(d.bottom.dark),
  shoe: physical(d.shoes.base, { roughness: 0.45 }),
  shoeDark: physical(d.shoes.dark, { roughness: 0.5 }),
  sole: physical(d.shoes.sole, { roughness: 0.6 }),
  eye: physical('#FFFFFF', { roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05 }),
  iris: physical(d.iris, { roughness: 0.2, clearcoat: 1 }),
  pupil: physical('#0B0706', { roughness: 0.1, clearcoat: 1 }),
  glint: new THREE.MeshBasicMaterial({ color: '#FFFFFF' }),
  nose: physical(d.species === 'dog' ? '#241915' : '#EE7F95', { roughness: 0.18, clearcoat: 1 }),
  ink: physical(d.id === 'mama' ? '#8C849E' : '#3A2516', { roughness: 0.8 }),
  mouth: physical('#5A1622', { roughness: 0.5 }),
  tongue: physical('#F27F94', { roughness: 0.35 }),
  white: physical('#FAFAFA', { roughness: 0.5 }),
  bow: physical('#F06CA0', { roughness: 0.4, clearcoat: 0.6 }),
  gold: physical('#FFD43B', { roughness: 0.3, metalness: 0.3 }),
  bag: fabric('#3B4252'),
  heart: physical('#F0426B', { roughness: 0.3, clearcoat: 1 }),
  whisker: new THREE.MeshBasicMaterial({ color: d.id === 'mama' ? '#D9D3E3' : '#FFF6EA' }),
});
const useMats = (d: Design) => {
  if (!matCache.has(d.id)) matCache.set(d.id, makeMats(d));
  return matCache.get(d.id)!;
};

// ---------- tiny primitives ----------
const SPHERE = new THREE.SphereGeometry(1, 40, 28);
const CAP = new THREE.CapsuleGeometry(0.5, 1, 10, 24);
const Ball: React.FC<{ p?: V3; s: V3 | number; m: THREE.Material; r?: V3; shadow?: boolean }> = ({ p = [0, 0, 0], s, m, r, shadow = true }) => (
  <mesh geometry={SPHERE} material={m} position={p} scale={typeof s === 'number' ? [s, s, s] : s} rotation={r} castShadow={shadow} receiveShadow />
);
/** Capsule hanging DOWN from the origin: radius r, total length L. */
const Limb: React.FC<{ r: number; L: number; m: THREE.Material; z?: number }> = ({ r, L, m, z = 1 }) => (
  <mesh geometry={CAP} material={m} position={[0, -L / 2, 0]} scale={[r * 2, L / 2, r * 2 * z]} castShadow receiveShadow />
);
const heartShape = (() => {
  const sh = new THREE.Shape();
  sh.moveTo(0, -0.6);
  sh.bezierCurveTo(-1.2, 0.1, -0.6, 1.0, 0, 0.45);
  sh.bezierCurveTo(0.6, 1.0, 1.2, 0.1, 0, -0.6);
  return new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.12, bevelSegments: 4 });
})();
const arc = (radius: number, tube: number, angle: number) => new THREE.TorusGeometry(radius, tube, 8, 24, angle);

// ---------- character ----------
export const Character3D: React.FC<{ id: CharId; pose: Pose; position: V3; scale?: number; opacity?: number }> = ({ id, pose, position, scale = 1 }) => {
  const d = DESIGNS[id];
  const m = useMats(d);
  const R = d.headR * S;
  const hipY = d.legH * S;
  const shoulderY = hipY + d.torsoH * S;
  const headY = shoulderY + R * 0.72;
  const tw = d.torsoTop * S;
  const bw = d.torsoBottom * S;
  const depth = tw * 0.7;
  const sq = pose.squash;
  const yaw = pose.yaw * 1.2;
  const lookSide = pose.yaw < 0 ? -1 : 1;

  return (
    <group position={position} scale={scale}>
      <group rotation={[0, yaw, 0]} position={[0, pose.lift * S, 0]} scale={[1 / Math.sqrt(sq), sq, 1 / Math.sqrt(sq)]}>
        <Tail3D d={d} m={m} pose={pose} hipY={hipY} bw={bw} />
        {([-1, 1] as const).map((side) => (
          <Leg3D key={side} d={d} m={m} side={side} swing={side < 0 ? pose.legL : pose.legR} knee={side < 0 ? pose.kneeL : pose.kneeR} hipY={hipY} bw={bw} />
        ))}
        <group position={[pose.hipX * S, -pose.bob * S, 0]} rotation={[0, 0, -pose.bodyTilt * DEG]}>
          {/* pelvis */}
          <Ball p={[0, hipY + 0.2, 0]} s={[bw * 0.47, 0.26, depth * 0.52]} m={m.bottom} />
          <Torso3D d={d} m={m} hipY={hipY} tw={tw} bw={bw} depth={depth} breath={pose.breath} />
          {/* neck */}
          <mesh position={[0, shoulderY + 0.05, 0]} castShadow material={m.fur}>
            <cylinderGeometry args={[R * 0.25, R * 0.3, 0.4, 20]} />
          </mesh>
          <group
            position={[0, headY, 0]}
            rotation={[(pose.lookY * 0.28 - 0.04) * 1, lookSide * pose.lookX * 0.3, -pose.headTilt * DEG]}
          >
            <Head3D d={d} m={m} pose={pose} R={R} />
          </group>
          {([-1, 1] as const).map((side) => (
            <Arm3D key={side} d={d} m={m} side={side} arm={side < 0 ? pose.armL : pose.armR} swing={side < 0 ? pose.swingL : pose.swingR} shoulderY={shoulderY} tw={tw} />
          ))}
        </group>
      </group>
    </group>
  );
};

type M = ReturnType<typeof makeMats>;

const Torso3D: React.FC<{ d: Design; m: M; hipY: number; tw: number; bw: number; depth: number; breath: number }> = ({ d, m, hipY, tw, bw, depth, breath }) => {
  const h = d.torsoH * S;
  const cy = hipY + h / 2;
  const b = 1 + breath * 0.012;
  const base = d.outfit === 'overalls' ? m.inner : m.top;
  const frontZ = depth / 2;
  return (
    <group>
      <mesh geometry={CAP} material={base} position={[0, cy + 0.04, 0]} scale={[((tw + bw) / 2) * b, h / 2.05, depth * b]} castShadow receiveShadow />
      {/* hem */}
      {d.outfit !== 'overalls' && (
        <mesh position={[0, hipY + 0.16, 0]} material={m.topDark} castShadow>
          <cylinderGeometry args={[bw * 0.5, bw * 0.5, 0.16, 32]} />
        </mesh>
      )}
      {(d.outfit === 'jacket' || d.outfit === 'hoodie') && (
        <mesh position={[0, hipY + h - 0.02, -0.05]} rotation={[Math.PI / 2 - 0.25, 0, 0]} material={m.topDark} castShadow>
          <torusGeometry args={[tw * 0.26, 0.13, 14, 32]} />
        </mesh>
      )}
      {d.outfit === 'jacket' && (
        <group>
          <RoundedBox args={[tw * 0.34, h * 0.9, 0.12]} radius={0.05} position={[0, cy - 0.02, frontZ * 0.94]} material={m.inner} />
          {[-1, 1].map((sd) => (
            <mesh key={sd} position={[sd * tw * 0.18, cy - 0.02, frontZ * 1.0]} rotation={[0, 0, sd * 0.04]} material={m.topDark}>
              <boxGeometry args={[0.06, h * 0.85, 0.06]} />
            </mesh>
          ))}
        </group>
      )}
      {d.outfit === 'hoodie' && (
        <group>
          <RoundedBox args={[bw * 0.62, h * 0.3, 0.08]} radius={0.035} position={[0, hipY + h * 0.27, frontZ * 0.98]} material={m.topDark} castShadow />
          {[-1, 1].map((sd) => (
            <mesh key={sd} position={[sd * 0.1, hipY + h * 0.78, frontZ + 0.02]} material={m.white}>
              <cylinderGeometry args={[0.022, 0.022, 0.42, 8]} />
            </mesh>
          ))}
        </group>
      )}
      {d.outfit === 'sweater' && (
        <group>
          <mesh position={[0, hipY + h + 0.02, 0]} material={m.top} castShadow>
            <cylinderGeometry args={[tw * 0.27, tw * 0.3, 0.32, 28]} />
          </mesh>
          <mesh position={[0, hipY + h + 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.top} castShadow>
            <torusGeometry args={[tw * 0.25, 0.07, 12, 28]} />
          </mesh>
        </group>
      )}
      {d.outfit === 'overalls' && (
        <group>
          <RoundedBox args={[bw * 0.66, h * 0.62, depth * 0.35]} radius={0.05} position={[0, hipY + h * 0.3, frontZ * 0.62]} material={m.top} castShadow />
          <mesh position={[0, hipY + 0.05, 0]} material={m.top} castShadow>
            <cylinderGeometry args={[bw * 0.55, bw * 0.55, 0.36, 28]} />
          </mesh>
          {[-1, 1].map((sd) => (
            <group key={sd}>
              <mesh position={[sd * bw * 0.27, hipY + h * 0.8, frontZ * 0.75]} rotation={[0.3, 0, sd * 0.25]} material={m.top}>
                <boxGeometry args={[0.1, h * 0.5, 0.05]} />
              </mesh>
              <Ball p={[sd * bw * 0.27, hipY + h * 0.6, frontZ * 0.98]} s={0.055} m={m.gold} />
            </group>
          ))}
        </group>
      )}
      {d.extras.includes('backpack') && (
        <group>
          <RoundedBox args={[tw * 1.05, h * 0.95, 0.42]} radius={0.12} position={[0, cy + 0.05, -depth / 2 - 0.12]} material={m.bag} castShadow />
        </group>
      )}
    </group>
  );
};

const Leg3D: React.FC<{ d: Design; m: M; side: -1 | 1; swing: number; knee: number; hipY: number; bw: number }> = ({ d, m, side, swing, knee, hipY, bw }) => {
  const L = d.legH * S;
  const th = L * 0.5;
  const sh = L * 0.5;
  const r = (d.legW * S) / 2;
  const shorts = d.bottom.kind !== 'jeans';
  return (
    <group position={[side * bw * 0.24, hipY, 0]} rotation={[-swing * DEG, 0, side * 0.03]}>
      {shorts ? (
        <>
          <Limb r={r * 1.18} L={th + 0.05} m={m.bottom} />
          <group position={[0, -th * 0.6, 0]}>
            <Limb r={r * 0.62} L={th * 0.5} m={m.fur} />
          </group>
        </>
      ) : (
        <Limb r={r} L={th + r} m={m.bottom} />
      )}
      <group position={[0, -th, 0]} rotation={[knee * DEG, 0, 0]}>
        {shorts ? (
          <>
            <Limb r={r * 0.62} L={sh} m={m.fur} />
            <mesh position={[0, -sh + 0.22, 0]} material={m.white} castShadow>
              <cylinderGeometry args={[r * 0.7, r * 0.7, 0.14, 18]} />
            </mesh>
          </>
        ) : (
          <>
            <Limb r={r * 0.96} L={sh} m={m.bottom} />
            {d.id === 'papa' && (
              <mesh position={[0, -sh + 0.24, 0]} material={m.bottomDark} castShadow>
                <cylinderGeometry args={[r * 1.04, r * 1.04, 0.14, 20]} />
              </mesh>
            )}
          </>
        )}
        {/* shoe stays roughly flat on the floor */}
        <group position={[0, -sh + 0.1, 0]} rotation={[(swing - knee) * DEG * 0.85, side * 0.12, 0]}>
          <RoundedBox args={[r * 1.9, r * 1.0, r * 3.0]} radius={r * 0.45} smoothness={4} position={[0, r * 0.2, r * 0.6]} material={m.shoe} castShadow />
          <RoundedBox args={[r * 2.0, r * 0.32, r * 3.1]} radius={r * 0.15} smoothness={3} position={[0, -r * 0.2, r * 0.6]} material={m.sole} castShadow />
          <RoundedBox args={[r * 1.2, r * 0.25, r * 1.2]} radius={r * 0.1} position={[0, r * 0.68, r * 0.5]} material={m.shoeDark} />
        </group>
      </group>
    </group>
  );
};

const Arm3D: React.FC<{ d: Design; m: M; side: -1 | 1; arm: { up: number; bend: number }; swing: number; shoulderY: number; tw: number }> = ({
  d,
  m,
  side,
  arm,
  swing,
  shoulderY,
  tw,
}) => {
  const r = (d.armW * S) / 2;
  const ua = d.armLen * S * 0.48;
  const fa = d.armLen * S * 0.45;
  const sleeve = d.outfit === 'overalls' ? m.inner : m.top;
  const inward = Math.max(0, -arm.bend); // paws towards belly/hips → bring the arm forward
  return (
    <group position={[side * (tw / 2 - r * 0.6), shoulderY - r * 1.1, 0]} rotation={[-(swing + inward * 0.35) * DEG, 0, side * arm.up * DEG]}>
      <Ball s={r * 1.02} m={sleeve} />
      {d.outfit === 'overalls' ? (
        <>
          <Limb r={r * 1.15} L={ua * 0.55} m={sleeve} />
          <Limb r={r * 0.82} L={ua + r} m={m.fur} />
        </>
      ) : (
        <Limb r={r} L={ua + r} m={sleeve} />
      )}
      <group position={[0, -ua, 0]} rotation={[-inward * 0.45 * DEG, 0, side * arm.bend * DEG]}>
        {d.outfit === 'overalls' ? (
          <Limb r={r * 0.8} L={fa} m={m.fur} />
        ) : (
          <>
            <Limb r={r * 0.96} L={fa} m={sleeve} />
            <mesh position={[0, -fa + 0.08, 0]} material={m.topDark} castShadow>
              <cylinderGeometry args={[r * 1.02, r * 1.02, 0.12, 20]} />
            </mesh>
          </>
        )}
        {/* paw + thumb */}
        <Ball p={[0, -fa - r * 0.45, 0]} s={[r * 1.2, r * 1.15, r * 1.1]} m={m.fur} />
        <Ball p={[-side * r * 0.75, -fa - r * 0.2, r * 0.35]} s={[r * 0.38, r * 0.55, r * 0.38]} m={m.fur} />
      </group>
    </group>
  );
};

const Tail3D: React.FC<{ d: Design; m: M; pose: Pose; hipY: number; bw: number }> = ({ d, m, pose, hipY, bw }) => {
  const k = d.headR / 96;
  const dog = d.species === 'dog';
  const wag = dog ? Math.sin(pose.t * 14) * 0.45 * pose.wag : Math.sin(pose.t * 2.1) * 0.25;
  const drag = Math.max(-0.4, Math.min(0.4, -pose.vx * 0.0008));
  const curl = Math.sin(pose.t * 1.6 + 1) * 0.25;
  const geo = useMemo(() => {
    const pts = dog
      ? [
          [0, 0, 0],
          [0, 0.12, -0.38],
          [0, 0.5, -0.72],
          [0, 0.95, -0.78],
        ]
      : [
          [0, 0, 0],
          [0, -0.05, -0.55],
          [0, 0.45, -1.05],
          [0, 1.25, -1.05],
          [curl * 0.6, 1.85, -0.8],
          [curl, 2.1, -0.55],
        ];
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, y, z]) => new THREE.Vector3(x * k, y * k, z * k)));
    const tube = new THREE.TubeGeometry(curve, 40, (dog ? 0.12 : 0.085) * k, 14, false);
    // taper: shrink radius towards the tip
    const pos = tube.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      const seg = Math.floor(i / 15) / 40;
      const c = curve.getPointAt(Math.min(1, seg));
      v.fromBufferAttribute(pos, i).sub(c).multiplyScalar(dog ? 1 - seg * 0.45 : 1 - seg * 0.25).add(c);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    tube.computeVertexNormals();
    return tube;
  }, [dog, k, curl]);
  return (
    <group position={[0, hipY + 0.15, -bw * 0.32]} rotation={[0, wag + drag, 0]}>
      <mesh geometry={geo} material={m.fur} castShadow />
      <Ball p={[(dog ? 0 : curl) * k, (dog ? 0.95 : 2.1) * k, (dog ? -0.78 : -0.55) * k]} s={(dog ? 0.07 : 0.07) * k} m={m.fur} />
      {d.fur.stripe &&
        [0.35, 0.55, 0.75, 0.9].map((u, i) => {
          const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -0.05 * k, -0.55 * k), new THREE.Vector3(0, 0.45 * k, -1.05 * k), new THREE.Vector3(0, 1.25 * k, -1.05 * k), new THREE.Vector3(curl * 0.6 * k, 1.85 * k, -0.8 * k), new THREE.Vector3(curl * k, 2.1 * k, -0.55 * k)];
          const c = new THREE.CatmullRomCurve3(pts);
          const p = c.getPointAt(u);
          const tan = c.getTangentAt(u);
          const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), tan);
          return (
            <mesh key={i} position={p} quaternion={q} material={m.stripe}>
              <torusGeometry args={[0.083 * k * (1 - u * 0.25), 0.025 * k, 8, 20]} />
            </mesh>
          );
        })}
    </group>
  );
};

const Head3D: React.FC<{ d: Design; m: M; pose: Pose; R: number }> = ({ d, m, pose, R }) => {
  const cat = d.species === 'cat';
  const spec = FACES[pose.expr];
  const er = R * (cat ? 0.26 : 0.25) * d.eyeScale;
  const eyeX = R * (cat ? 0.4 : 0.38);
  const eyeY = cat ? R * 0.1 : R * 0.15;
  const eyeZ = R * 0.68;
  const flop = Math.sin(pose.t * 2.2) * 0.04 + Math.max(-0.35, Math.min(0.35, pose.vy * 0.0006)) - pose.bob * 0.004;
  const blush = spec.blush || d.extras.includes('blush');
  return (
    <group>
      {/* skull */}
      <Ball s={cat ? [R * 1.04, R * 0.9, R * 0.92] : [R, R * 0.94, R * 0.95]} m={m.fur} />
      {cat ? (
        <>
          {/* cheek fluff */}
          {[-1, 1].map((sd) => (
            <group key={sd}>
              <Ball p={[sd * R * 0.78, -R * 0.32, R * 0.22]} s={[R * 0.32, R * 0.24, R * 0.3]} r={[0, 0, sd * 0.5]} m={m.fur} />
              <mesh position={[sd * R * 0.58, R * 0.8, R * 0.02]} rotation={[0.05, 0, -sd * 0.38]} scale={[1, 1, 0.6]} material={m.fur} castShadow>
                <coneGeometry args={[R * 0.4, R * 0.78, 28]} />
              </mesh>
              <mesh position={[sd * R * 0.57, R * 0.78, R * 0.15]} rotation={[0.1, 0, -sd * 0.38]} scale={[1, 1, 0.35]} material={m.ear}>
                <coneGeometry args={[R * 0.27, R * 0.56, 24]} />
              </mesh>
            </group>
          ))}
          {/* muzzle */}
          <Ball p={[-R * 0.13, -R * 0.3, R * 0.8]} s={[R * 0.19, R * 0.15, R * 0.14]} m={m.furLight} />
          <Ball p={[R * 0.13, -R * 0.3, R * 0.8]} s={[R * 0.19, R * 0.15, R * 0.14]} m={m.furLight} />
          <Ball p={[0, -R * 0.42, R * 0.78]} s={[R * 0.15, R * 0.1, R * 0.12]} m={m.furLight} />
          <Ball p={[0, -R * 0.17, R * 0.92]} s={[R * 0.09, R * 0.065, R * 0.06]} m={m.nose} />
          {d.fur.stripe &&
            [-0.2, 0, 0.2].map((x) => <Ball key={x} p={[R * x, R * 0.68, R * 0.6]} s={[R * 0.045, R * 0.17, R * 0.05]} r={[-0.75, 0, x * 1.2]} m={m.stripe} />)}
          {/* whiskers */}
          {[-1, 1].map((sd) =>
            [-0.12, 0, 0.12].map((a, i) => (
              <mesh key={`${sd}${i}`} position={[sd * R * 0.55, -R * 0.3 - a * R * 0.4, R * 0.72]} rotation={[0, sd * 0.35, Math.PI / 2 + sd * a * 1.4]} material={m.whisker}>
                <cylinderGeometry args={[R * 0.008, R * 0.008, R * 0.55, 5]} />
              </mesh>
            )),
          )}
        </>
      ) : (
        <>
          {/* floppy ears hinge at the top of the head */}
          {[-1, 1].map((sd) => (
            <group key={sd} position={[sd * R * 0.7, R * 0.52, -R * 0.02]} rotation={[0, 0, sd * (0.32 + flop)]}>
              <Ball p={[sd * R * 0.12, -R * 0.55, 0]} s={[R * 0.3, R * 0.62, R * 0.15]} r={[0, 0, sd * -0.12]} m={m.ear} />
            </group>
          ))}
          <Ball p={[0, -R * 0.33, R * 0.6]} s={[R * 0.52, R * 0.38, R * 0.45]} m={m.furLight} />
          <Ball p={[0, -R * 0.1, R * 0.62]} s={[R * 0.17, R * 0.3, R * 0.3]} m={m.furLight} />
          <Ball p={[0, -R * 0.14, R * 1.02]} s={[R * 0.18, R * 0.12, R * 0.12]} m={m.nose} />
          <Ball p={[-R * 0.05, -R * 0.1, R * 1.11]} s={[R * 0.05, R * 0.025, R * 0.02]} m={m.glint} shadow={false} />
        </>
      )}

      {blush &&
        [-1, 1].map((sd) => (
          <mesh key={sd} position={[sd * R * 0.6, -R * 0.2, R * 0.72]} rotation={[0, sd * 0.7, 0]} scale={[1, 0.55, 1]}>
            <circleGeometry args={[R * 0.13, 24]} />
            <meshBasicMaterial color="#FF6F8E" transparent opacity={spec.blush ? 0.55 : 0.3} depthWrite={false} />
          </mesh>
        ))}

      {([-1, 1] as const).map((sd) => (
        <Eye3D key={sd} d={d} m={m} pose={pose} side={sd} p={[sd * eyeX, eyeY, eyeZ]} r={er} />
      ))}
      {/* brows */}
      {([-1, 1] as const).map((sd) => {
        const raise = (spec.browRaise + pose.brow * 0.35) * er;
        return (
          <mesh
            key={sd}
            position={[sd * eyeX * 1.02, eyeY + er * 1.32 + raise, eyeZ + er * 0.45]}
            rotation={[0.2, sd * 0.3, (Math.PI / 2) + sd * spec.brow * DEG]}
            material={m.ink}
          >
            <capsuleGeometry args={[er * 0.14, er * 0.75, 6, 12]} />
          </mesh>
        );
      })}
      <Mouth3D m={m} pose={pose} R={R} cat={cat} />

      {d.extras.includes('bow') && (
        <group position={[R * 0.48, R * 0.86, R * 0.25]} rotation={[0.3, 0, -0.35]}>
          <mesh position={[-R * 0.16, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={m.bow} castShadow>
            <coneGeometry args={[R * 0.15, R * 0.3, 16]} />
          </mesh>
          <mesh position={[R * 0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={m.bow} castShadow>
            <coneGeometry args={[R * 0.15, R * 0.3, 16]} />
          </mesh>
          <Ball s={R * 0.08} m={m.bow} />
        </group>
      )}
    </group>
  );
};

const Eye3D: React.FC<{ d: Design; m: M; pose: Pose; side: -1 | 1; p: V3; r: number }> = ({ d, m, pose, side, p, r }) => {
  const spec = FACES[pose.expr];
  let mode = spec.eyes;
  if (mode === 'wink') mode = side === -1 ? 'happy' : 'open';
  const cat = d.species === 'cat';
  if (mode === 'love') {
    return (
      <mesh geometry={heartShape} material={m.heart} position={[p[0], p[1], p[2] + r * 0.2]} scale={r * (0.95 + Math.sin(pose.t * 9) * 0.08)} castShadow />
    );
  }
  const wide = mode === 'wide';
  const lidAmt = mode === 'happy' ? 1 : Math.min(1, pose.blink + (mode === 'sleepy' ? 0.55 : 0) + (mode === 'sad' ? 0.25 : 0));
  const lookX = (pose.yaw < 0 ? -1 : 1) * pose.lookX * 0.3;
  const lookY = -pose.lookY * 0.25 - (mode === 'sad' ? 0.15 : 0);
  const dir = new THREE.Vector3(lookX, lookY, 1).normalize();
  const iris = r * (cat ? 0.66 : 0.6) * (wide ? 0.85 : 1);
  const on = (k: number): V3 => [dir.x * r * k, dir.y * r * k, dir.z * r * k];
  const lidRot = -1.05 + lidAmt * (Math.PI / 2 + 1.05) - (wide ? 0.3 : 0);
  return (
    <group position={p} scale={[1, cat ? 1.08 : 1.12, 0.78]}>
      <Ball s={r} m={m.eye} shadow={false} />
      {mode !== 'happy' && (
        <>
          <Ball p={on(0.8)} s={[iris, iris, r * 0.3]} m={m.iris} shadow={false} />
          <Ball p={on(0.92)} s={cat ? [iris * (wide ? 0.55 : 0.32), iris * 0.78, r * 0.22] : [iris * 0.52, iris * 0.52, r * 0.22]} m={m.pupil} shadow={false} />
          <Ball p={[-r * 0.26 + dir.x * r * 0.45, r * 0.3 + dir.y * r * 0.45, r * 1.12]} s={[r * 0.16, r * 0.16, r * 0.05]} m={m.glint} shadow={false} />
          <Ball p={[r * 0.24 + dir.x * r * 0.45, -r * 0.18 + dir.y * r * 0.45, r * 1.12]} s={[r * 0.07, r * 0.07, r * 0.03]} m={m.glint} shadow={false} />
        </>
      )}
      {/* upper eyelid: a fur-coloured shell that rotates down to blink */}
      <mesh rotation={[lidRot, 0, 0]} material={m.fur}>
        <sphereGeometry args={[r * 1.07, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {mode === 'happy' && (
        <mesh position={[0, -r * 0.1, r * 1.04]} geometry={arc(r * 0.62, r * 0.13, Math.PI)} material={m.ink} />
      )}
      {d.lashes && mode !== 'happy' && (
        <mesh position={[side * r * 0.85, r * 0.75, r * 0.4]} rotation={[0, 0, side * -0.7]} material={m.ink}>
          <capsuleGeometry args={[r * 0.07, r * 0.4, 4, 8]} />
        </mesh>
      )}
    </group>
  );
};

const Mouth3D: React.FC<{ m: M; pose: Pose; R: number; cat: boolean }> = ({ m, pose, R, cat }) => {
  const spec = FACES[pose.expr];
  const talking = pose.mouth > 0.06;
  let kind = spec.mouth;
  if (talking && (kind === 'smile' || kind === 'smirk' || kind === 'flat')) kind = 'grin';
  const y = cat ? -R * 0.47 : -R * 0.5;
  const z = cat ? R * 0.84 : R * 0.95;
  const w = cat ? R * 0.17 : R * 0.24;
  if (kind === 'grin' || kind === 'tongue' || kind === 'o') {
    const open = kind === 'o' ? 0.5 + pose.mouth * 0.4 : talking ? pose.mouth : kind === 'tongue' ? 0.75 : 0.55;
    const h = w * (0.35 + open * 0.75);
    const ww = kind === 'o' ? w * 0.55 : w;
    return (
      <group position={[0, y - h * 0.35, z]} rotation={[-0.25, 0, 0]}>
        <Ball s={[ww, h, w * 0.35]} m={m.mouth} shadow={false} />
        <Ball p={[0, -h * 0.45, w * 0.12]} s={[ww * 0.62, h * 0.42, w * 0.25]} m={m.tongue} shadow={false} />
        {kind === 'tongue' && !talking && <Ball p={[0, -h * 1.05, w * 0.18]} s={[ww * 0.45, h * 0.6, w * 0.15]} m={m.tongue} />}
      </group>
    );
  }
  // closed shapes: a soft dark stroke on the muzzle
  const frown = kind === 'frown';
  return (
    <group position={[0, y + (frown ? -w * 0.15 : 0), z]} rotation={[-0.3, 0, frown ? 0 : Math.PI]}>
      <mesh geometry={arc(w * 0.75, w * 0.09, kind === 'flat' ? Math.PI * 0.35 : Math.PI * 0.85)} rotation={[0, 0, kind === 'flat' ? Math.PI * 0.32 : Math.PI * 0.075]} material={m.mouth} />
    </group>
  );
};
