import * as THREE from 'three';

// Single Unified Feature Wall
export function SceneProductView({ floorTex, wallLT }: any) {
  // Pure product visualization
  const wallMat = new THREE.MeshStandardMaterial({
    map: wallLT,
    roughness: 0.8, // Matte showroom finish
    metalness: 0,
  });
  
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTex,
    roughness: 0.8, // Matte showroom finish
    metalness: 0,
  });

  return (
    <group>
      {/* Massive Continuous Architectural Wall (16m wide x 8m tall) */}
      <mesh position={[0, 4, -2.25]}>
        <planeGeometry args={[16, 8]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Shallow Grounding Floor Strip (16m wide x 4m deep) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.25]}>
        <planeGeometry args={[16, 4]} />
        <primitive object={floorMat} attach="material" />
      </mesh>
    </group>
  );
}
