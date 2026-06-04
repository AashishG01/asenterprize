import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import CustomEnvironment from './CustomEnvironment';
import * as THREE from 'three';

export default function MapMarker() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
    }
    if (ring.current) {
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ring.current.scale.set(scale, scale, scale);
      (ring.current.material as THREE.MeshStandardMaterial).opacity = 0.5 - Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <>
      <CustomEnvironment />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      
      <group ref={group} position={[0, -1, 0]}>
        <Float floatIntensity={2} speed={2}>
          {/* Main Pin */}
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[0.5, 1.5, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh position={[0, 2.75, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh position={[0, 2.75, 0]}>
             <sphereGeometry args={[0.2, 16, 16]} />
             <meshStandardMaterial color="#222" metalness={0.1} roughness={0.9} />
          </mesh>
        </Float>
        
        {/* Base Ring / Radar effect */}
        <mesh ref={ring} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1, 1.2, 32]} />
          <meshStandardMaterial color="#d4af37" transparent opacity={0.5} emissive="#d4af37" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
           <circleGeometry args={[0.3, 32]} />
           <meshStandardMaterial color="#d4af37" />
        </mesh>
      </group>
    </>
  );
}
