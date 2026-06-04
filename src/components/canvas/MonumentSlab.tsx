import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

export default function MonumentSlab({ 
  url, 
  position, 
  scale = [2, 3, 0.15],
  rotation = [0, 0, 0],
  separationDirection = [0, 0, 0]
}: { 
  url: string, 
  position: [number, number, number], 
  scale?: [number, number, number],
  rotation?: [number, number, number],
  separationDirection?: [number, number, number]
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(url);

  useFrame(() => {
    if (group.current) {
      // 1. Calculate Cinematic Scroll Progress
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 2;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      // 2. Separation Logic (Slabs float apart as you scroll)
      const sepPhase = Math.max(0, (progress - 0.1) * 2); // Starts after 10%
      const sepX = separationDirection[0] * sepPhase * 4;
      const sepY = separationDirection[1] * sepPhase * 4;
      const sepZ = separationDirection[2] * sepPhase * 4;

      // 3. Hover Physics (Overrides slightly)
      const targetX = position[0] + sepX;
      const targetY = position[1] + sepY;
      const targetZ = position[2] + sepZ + (hovered ? 0.5 : 0);
      
      const targetRotX = hovered ? rotation[0] - 0.05 : rotation[0];
      const targetRotY = hovered ? rotation[1] + 0.05 : rotation[1];

      // 4. Apply Smooth Dampening
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05);
      
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.1);
    }
  });

  return (
    <group 
      ref={group} 
      position={position} 
      rotation={new THREE.Euler(...rotation)}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setHovered(true); }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
    >
      {/* Subtle hover spotlight */}
      {hovered && (
        <SpotLight
          position={[0, 0, 3]}
          distance={8}
          angle={0.6}
          attenuation={5}
          anglePower={4}
          intensity={5}
          color="#f5d799"
          penumbra={1}
        />
      )}

      {/* The Marble/Tile Slab */}
      <RoundedBox args={scale as [number, number, number]} radius={0.02} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial 
          map={texture} 
          roughness={0.2}
          metalness={0.1}
        />
      </RoundedBox>

      {/* The Metallic Edge Trim */}
      <RoundedBox 
        args={[scale[0] + 0.04, scale[1] + 0.04, scale[2] - 0.02] as [number, number, number]} 
        radius={0.03} 
        smoothness={4} 
        position={[0, 0, -0.01]} 
        castShadow
      >
        <meshStandardMaterial 
          color="#d4af37" 
          roughness={0.2}
          metalness={0.9}
        />
      </RoundedBox>
    </group>
  );
}
