import * as THREE from 'three';
import { useEffect } from 'react';

export function SceneProductView({ wallLT }: any) {

  useEffect(() => {
    if (!wallLT) return;

    wallLT.colorSpace = THREE.SRGBColorSpace;
    wallLT.wrapS = THREE.RepeatWrapping;
    wallLT.wrapT = THREE.RepeatWrapping;

    // Tile repeat: 20 cols x 10 rows for realistic 300x450 scale on 12x7 board
    wallLT.repeat.set(20, 10);

    wallLT.anisotropy = 16;
    wallLT.needsUpdate = true;
  }, [wallLT]);

  return (
    <group position={[0, 0, 0]}>

      {/* Background Wall - radial gradient effect via two layers */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[30, 18]} />
        <meshStandardMaterial color="#171717" roughness={1} metalness={0} />
      </mesh>

      {/* Subtle spotlight circle on background */}
      <mesh position={[0, 0, -0.48]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#2a2a2a" roughness={1} metalness={0} transparent opacity={0.5} />
      </mesh>

      {/* Outer Frame - dark premium border */}
      <mesh position={[0, 0, -0.06]} castShadow receiveShadow>
        <boxGeometry args={[12.4, 7.4, 0.12]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Inner Frame Bevel */}
      <mesh position={[0, 0, -0.01]} castShadow receiveShadow>
        <boxGeometry args={[12.15, 7.15, 0.08]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* TILE DISPLAY PANEL - the hero */}
      <mesh position={[0, 0, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[12, 7, 0.12]} />
        <meshStandardMaterial
          map={wallLT}
          roughness={0.65}
          metalness={0}
        />
      </mesh>

      {/* Shadow ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.8, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 10]} />
        <shadowMaterial opacity={0.15} />
      </mesh>

    </group>
  );
}
