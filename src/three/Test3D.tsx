import { ThreeCanvas } from '@remotion/three';
import React from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { restPose, type CharId } from '../characters/types';
import { Character3D } from './Character3D';
import { Lights3D } from './Lights3D';

const IDS: CharId[] = ['papa', 'mama', 'hijo', 'hija'];

export const Test3D: React.FC = () => {
  const t = useCurrentFrame() / 30;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(#FFF7EC, #FBE0C8)' }}>
      <ThreeCanvas width={1920} height={1080} shadows="soft" camera={{ position: [0, 4.2, 17], fov: 30 }} onCreated={({ camera, gl }) => {
          camera.lookAt(0, 2.6, 0);
          gl.toneMapping = THREE.NeutralToneMapping;
        }}>
        <Lights3D />
        {IDS.map((id, i) => {
          const p = restPose(t);
          p.expr = (['happy', 'love', 'excited', 'laugh'] as const)[i];
          p.yaw = [0.25, -0.2, 0.5, -0.4][i];
          if (id === 'hija') p.armR = { up: 125, bend: 30 };
          if (id === 'papa') p.armL = { up: 38, bend: -112 };
          if (id === 'hijo') {
            p.legL = 22; p.legR = -22; p.kneeR = 40; p.swingL = -25; p.swingR = 25;
          }
          return <Character3D key={id} id={id} pose={p} position={[-5.4 + i * 3.6, 0, 0]} />;
        })}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 40]} />
          <meshStandardMaterial color="#F3D9BE" />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
