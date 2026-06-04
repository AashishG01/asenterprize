import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, MeshReflectorMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import CustomEnvironment from './CustomEnvironment';

export default function HeroEnvironment() {
  const group = useRef<THREE.Group>(null);
  
  // Use one of the luxury marble textures for the floor and walls
  const colorMap = useTexture('/textures/floors/floor-1.jpg');
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(4, 4);

  const wallMap = useTexture('/textures/walls/wall-1.jpg');
  wallMap.wrapS = THREE.RepeatWrapping;
  wallMap.wrapT = THREE.RepeatWrapping;
  wallMap.repeat.set(4, 2);

  const floatingTextures = [
    '/textures/concepts/10370-DK.jpg',
    '/textures/concepts/10596-DK.jpg',
    '/textures/concepts/10841-DK.jpg',
    '/textures/concepts/11481-DK.jpg',
    '/textures/concepts/ELE-1010.jpg'
  ];

  useFrame((state) => {
    if (group.current) {
      // Gentle cinematic camera movement
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 + Math.sin(state.clock.elapsedTime * 0.2) * 2, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2, 0.05);
      state.camera.lookAt(0, 1, 0);
    }
  });

  return (
    <group ref={group}>
      <CustomEnvironment intensity={0.5} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#d4af37" />

      {/* Floating Monoliths in the background */}
      {floatingTextures.map((url, i) => (
        <Float 
          key={url} 
          speed={1.5} 
          rotationIntensity={0.2} 
          floatIntensity={0.5} 
          position={[(i - 2) * 4, 2, -10 - (i % 2) * 2]}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 3, 0.2]} />
            <meshStandardMaterial 
              map={useTexture(url)} 
              roughness={0.1}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Reflective Luxury Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          map={colorMap}
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={0.1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
          mirror={1}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -20]} receiveShadow>
        <planeGeometry args={[50, 20]} />
        <meshStandardMaterial 
          map={wallMap}
          roughness={0.3}
          metalness={0.1}
          color="#222"
        />
      </mesh>
    </group>
  );
}
