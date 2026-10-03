import { Environment, Lightformer } from '@react-three/drei';
import React from 'react';

/** Soft "animated feature" lighting: warm key with soft shadows, cool fill, rim, and studio reflections. */
/** `dim` (0..1) = overcast/rainy day; `flash` (0..1) = lightning. */
export const Lights3D: React.FC<{ night?: boolean; target?: [number, number, number]; dim?: number; flash?: number }> = ({ night, target = [0, 2.5, 0], dim = 0, flash = 0 }) => (
  <>
    <hemisphereLight args={[night ? '#8C9BFF' : dim ? '#C9D3E6' : '#FFF4E0', night ? '#2B2450' : '#C9A27A', (night ? 0.55 : 0.9 - dim * 0.25) + flash * 1.5]} />
    <directionalLight
      position={[target[0] - 6, 11, 9]}
      intensity={(night ? 1.1 : 2.4 - dim * 1.2) + flash * 2}
      color={night ? '#C9D3FF' : dim ? '#DDE4F2' : '#FFF1DA'}
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-camera-left={-12}
      shadow-camera-right={12}
      shadow-camera-top={10}
      shadow-camera-bottom={-4}
      shadow-camera-near={1}
      shadow-camera-far={40}
      shadow-bias={-0.0004}
      shadow-normalBias={0.03}
      shadow-radius={6}
    />
    <directionalLight position={[target[0] + 8, 5, 6]} intensity={night ? 0.3 : 0.7} color="#DCE8FF" />
    <directionalLight position={[target[0] + 2, 7, -8]} intensity={night ? 0.9 : 1.6} color={night ? '#B197FC' : '#FFFFFF'} />
    <Environment resolution={128} frames={1}>
      <Lightformer intensity={2} position={[0, 6, 6]} scale={[12, 6, 1]} color="#FFF4E6" />
      <Lightformer intensity={1} position={[-8, 3, 0]} rotation-y={Math.PI / 2} scale={[10, 6, 1]} color="#FFE3C2" />
      <Lightformer intensity={1} position={[8, 3, 0]} rotation-y={-Math.PI / 2} scale={[10, 6, 1]} color="#D6E4FF" />
    </Environment>
  </>
);
