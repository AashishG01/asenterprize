import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import MonumentSlab from './MonumentSlab';
import CustomEnvironment from './CustomEnvironment';

export default function HeroEnvironment() {
  const group = useRef<THREE.Group>(null);
  
  // High-end textures for the monument
  const tiles = useMemo(() => [
    '/textures/concepts/10841-DK.jpg', // Main center
    '/textures/concepts/11481-DK.jpg', // Left
    '/textures/concepts/10596-DK.jpg', // Right
    '/textures/concepts/ELE-1010.jpg', // Top
    '/textures/floors/floor-1.jpg',    // Bottom
    '/textures/walls/wall-1.jpg',      // Far Left
    '/textures/concepts/10370-DK.jpg', // Far Right
    '/textures/concepts/11311-KT-1.jpg', // Bottom Left
    '/textures/concepts/10804-DK.jpg', // Bottom Right
  ], []);

  useFrame((state) => {
    // 1. Calculate Cinematic Scroll Progress
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 2;
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // 2. Camera Cinematic Pullback
    // Start further back (z=8) to frame it well, pull back to (z=16) on scroll
    const targetZ = THREE.MathUtils.lerp(8, 16, progress * 2); 
    const targetY = THREE.MathUtils.lerp(0, 0, progress); // Keep camera centered vertically

    // 3. Ultra-subtle Parallax
    const parallaxX = state.pointer.x * 0.5;
    const parallaxY = state.pointer.y * 0.2;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, parallaxX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + parallaxY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <CustomEnvironment intensity={1.5} />
      
      {/* Subtle volumetric fog to give depth */}
      <fog attach="fog" args={['#111111', 10, 30]} />
      
      {/* Luxury Showroom Lighting */}
      <ambientLight intensity={0.6} />
      {/* Warm Sunlight */}
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={2.5} 
      />
      {/* Cool fill light */}
      <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#e0f0ff" />
      {/* Golden rim light */}
      <directionalLight position={[0, -5, -10]} intensity={2} color="#d4af37" />

      <group ref={group}>
        {/* Central Masterpiece */}
        <MonumentSlab 
          url={tiles[0]} 
          position={[0, 0, 1]} 
          scale={[2.5, 3.75, 0.2]} 
          separationDirection={[0, 0, 1.5]} 
        />
        
        {/* Top Center */}
        <MonumentSlab 
          url={tiles[3]} 
          position={[0, 3.9, 0.5]} 
          scale={[2, 3, 0.2]} 
          separationDirection={[0, 1.5, 0.5]}
        />
        
        {/* Bottom Center */}
        <MonumentSlab 
          url={tiles[4]} 
          position={[0, -3.9, 0.5]} 
          scale={[2, 3, 0.2]} 
          separationDirection={[0, -1.5, 0.5]}
        />
        
        {/* Left Wing */}
        <MonumentSlab 
          url={tiles[1]} 
          position={[-2.6, 0, 0.2]} 
          scale={[2, 3, 0.2]} 
          rotation={[0, 0.1, 0]} 
          separationDirection={[-1.5, 0, 0.8]}
        />
        
        {/* Right Wing */}
        <MonumentSlab 
          url={tiles[2]} 
          position={[2.6, 0, 0.2]} 
          scale={[2, 3, 0.2]} 
          rotation={[0, -0.1, 0]} 
          separationDirection={[1.5, 0, 0.8]}
        />
        
        {/* Bottom Left */}
        <MonumentSlab 
          url={tiles[7]} 
          position={[-2.4, -3.2, -0.2]} 
          scale={[1.8, 2.7, 0.2]} 
          rotation={[0, 0.15, 0]} 
          separationDirection={[-1, -1, -0.5]}
        />
        
        {/* Bottom Right */}
        <MonumentSlab 
          url={tiles[8]} 
          position={[2.4, -3.2, -0.2]} 
          scale={[1.8, 2.7, 0.2]} 
          rotation={[0, -0.15, 0]} 
          separationDirection={[1, -1, -0.5]}
        />
        
        {/* Far Background Support Left */}
        <MonumentSlab 
          url={tiles[5]} 
          position={[-4.5, 1.5, -1]} 
          scale={[1.8, 2.7, 0.2]} 
          rotation={[0, 0.2, 0]} 
          separationDirection={[-2, 1, -1]}
        />
        
        {/* Far Background Support Right */}
        <MonumentSlab 
          url={tiles[6]} 
          position={[4.5, -1.5, -1]} 
          scale={[1.8, 2.7, 0.2]} 
          rotation={[0, -0.2, 0]} 
          separationDirection={[2, -1, -1]}
        />
      </group>
    </>
  );
}
