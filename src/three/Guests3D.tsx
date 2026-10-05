import { ThreeCanvas } from '@remotion/three';
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { restPose, type CharId } from '../characters/types';
import { Character3D } from './Character3D';
import { Lights3D } from './Lights3D';

/** Model sheet for guest characters and vehicles (composition "invitados-3d"). */
export const Guests3D: React.FC = () => {
  const t = useCurrentFrame() / 30;
  const list: { id: CharId; x: number; vehicle?: number; yaw?: number }[] = [
    { id: 'abuela', x: -6.6 },
    { id: 'benjaPapa', x: -4.2 },
    { id: 'benjaMama', x: -1.9 },
    { id: 'benja', x: 0.2 },
    { id: 'tomi', x: 2.4, vehicle: 1, yaw: 0.35 },
    { id: 'hija', x: 5.4, vehicle: 2, yaw: 0.8 },
  ];
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#FFF7EC, #FBE0C8)' }}>
      <ThreeCanvas
        width={1920}
        height={1080}
        shadows
        camera={{ position: [0, 4.2, 17], fov: 30 }}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 2.6, 0);
          gl.toneMapping = THREE.NeutralToneMapping;
        }}
      >
        <Lights3D />
        {list.map(({ id, x, vehicle, yaw }) => {
          const p = restPose(t);
          p.expr = 'happy';
          p.yaw = yaw ?? 0.15;
          if (vehicle === 1) {
            p.vehicle = 1;
            p.legL = p.legR = 84;
            p.kneeL = p.kneeR = 86;
            p.lift = -96 * 0.45;
            p.armR = { up: 120, bend: 30 };
          }
          if (vehicle === 2) {
            p.vehicle = 2;
            p.roll = t * 200;
            const ph = p.roll / 40;
            p.legL = 48 + Math.sin(ph) * 26;
            p.legR = 48 + Math.sin(ph + Math.PI) * 26;
            p.kneeL = 72 + Math.sin(ph) * 30;
            p.kneeR = 72 + Math.sin(ph + Math.PI) * 30;
            p.lift = -86 * 0.08;
            p.swingL = p.swingR = 62;
            p.armL = p.armR = { up: 10, bend: -10 };
          }
          return <Character3D key={id} id={id} pose={p} position={[x, 0, 0]} />;
        })}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 40]} />
          <meshStandardMaterial color="#F3D9BE" />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
