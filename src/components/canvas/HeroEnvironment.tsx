import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import MonumentSlab from './MonumentSlab';

export default function HeroEnvironment() {
  const group = useRef<THREE.Group>(null);
  
  // High-end textures for the monument
  const tiles = useMemo(() => [
    '/textures/concepts/10841-DK.jpg', // Main center
    '/textures/concepts/11481-DK.jpg', // Left
    '/textures/concepts/10596-DK.jpg', // Right
    '/textures/concepts/ELE-1010.jpg', // Top
    '/textures/floors/floor-1.jpg',    // Bottom
    '/textures/walls/wall-1.jpg',      // Back Left
    '/textures/concepts/10370-DK.jpg', // Back Right
  ], []);

  useFrame((state) => {
    // 1. Calculate Cinematic Scroll Progress
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 2;
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // 2. Camera Cinematic Pullback
    // Start very close (z=5), pull back to see full monument (z=14)
    const targetZ = THREE.MathUtils.lerp(5, 14, progress * 2); 
    const targetY = THREE.MathUtils.lerp(0, 1, progress * 1.5);

    // 3. Ultra-subtle Parallax (Apple style)
    const parallaxX = state.pointer.x * 0.2;
    const parallaxY = state.pointer.y * 0.1;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, parallaxX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + parallaxY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <SoftShadows size={30} samples={16} focus={0.5} />
      {/* Subtle volumetric fog to hide the background gracefully */}
      <fog attach="fog" args={['#111111', 10, 30]} />
      
      {/* Luxury Showroom Lighting */}
      <ambientLight intensity={0.4} />
      {/* Warm Sunlight */}
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={2.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Cool fill light */}
      <directionalLight position={[-10, 5, -5]} intensity={1} color="#e0f0ff" />
      {/* Golden rim light */}
      <directionalLight position={[0, -5, -10]} intensity={1.5} color="#d4af37" />

      <group ref={group}>
        {/* Central Masterpiece */}
        <MonumentSlab 
          url={tiles[0]} 
          position={[0, 0, 1]} 
          scale={[2.5, 3.5, 0.2]} 
          separationDirection={[0, 0, 1.5]} 
        />
        
        {/* Left Wing */}
        <MonumentSlab 
          url={tiles[1]} 
          position={[-2.4, -0.2, 0.5]} 
          scale={[2, 3, 0.2]} 
          rotation={[0, 0.1, 0]} 
          separationDirection={[-1.5, -0.5, 0.8]}
        />
        
        {/* Right Wing */}
        <MonumentSlab 
          url={tiles[2]} 
          position={[2.4, 0.2, 0.2]} 
          scale={[1.8, 2.8, 0.2]} 
          rotation={[0, -0.1, 0]} 
          separationDirection={[1.5, 0.5, 0.8]}
        />
        
        {/* Background Support Left */}
        <MonumentSlab 
          url={tiles[5]} 
          position={[-1.5, 1.5, -0.5]} 
          scale={[2, 2, 0.2]} 
          rotation={[0, 0, 0]} 
          separationDirection={[-1, 1.5, -1]}
        />
        
        {/* Background Support Right */}
        <MonumentSlab 
          url={tiles[6]} 
          position={[1.5, -1.5, -0.5]} 
          scale={[2.2, 1.5, 0.2]} 
          rotation={[0, 0, 0]} 
          separationDirection={[1, -1.5, -1]}
        />
        
        {/* Horizontal Cross Beam */}
        <MonumentSlab 
          url={tiles[4]} 
          position={[0, -2, 0]} 
          scale={[5, 1.2, 0.15]} 
          rotation={[0, 0, 0]} 
          separationDirection={[0, -2, -0.5]}
        />
      </group>
    </>
  );
}
