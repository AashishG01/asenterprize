import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { SceneLivingRoom, SceneBathroom, SceneKitchen, SceneCommercial, ScenePatio } from './LuxuryScenes';

export default function VirtualRoom() {
  const [activeRoom, setActiveRoom] = useState('Living');
  const [floorUrl, setFloorUrl] = useState('');
  const [ltUrl, setLtUrl] = useState('');
  const [hlUrl, setHlUrl] = useState('');
  const [dkUrl, setDkUrl] = useState('');

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail.floor) setFloorUrl(e.detail.floor);
      if (e.detail.lt) setLtUrl(e.detail.lt);
      if (e.detail.hl) setHlUrl(e.detail.hl);
      if (e.detail.dk) setDkUrl(e.detail.dk);
      if (e.detail.room) setActiveRoom(e.detail.room);
    };
    window.addEventListener('update-virtual-room', handleUpdate);
    return () => window.removeEventListener('update-virtual-room', handleUpdate);
  }, []);

  const defaultFloor = '/textures/floors/floor-1.jpg';
  const defaultWall = '/textures/concepts/10841-DK.jpg';

  const floorTex = useTexture(floorUrl || defaultFloor);
  const wallLT = useTexture(ltUrl || defaultWall);
  const wallHL = useTexture(hlUrl || defaultWall);
  const wallDK = useTexture(dkUrl || defaultWall);

  // Infinite Floor (20m x 20m)
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(20, 20); 

  [wallLT, wallHL, wallDK].forEach(t => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    // Feature wall is expanded to 10m wide x 3m tall. Tile is 0.3x0.45m
    t.repeat.set(10, 1);
  });

  // Human Eye Camera: Placed INSIDE the room!
  // Y=1.0 (sitting/low standing), Distance Z=1.2 (deep inside), X=1.2 (right side)
  useFrame((state) => {
    const targetX = 1.2;
    const targetY = 1.0; 
    const targetZ = 1.2; 

    const px = state.pointer.x * 0.15;
    const py = state.pointer.y * 0.15;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + px, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + py, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    // Look at the feature wall (z=-2.25), slightly left (x=-0.8), and down (y=0.5)
    // This creates the perfect corner shot where Floor = 50%, Feature Wall = 40%, Side Wall = 10%
    state.camera.lookAt(-0.8, 0.5, -2.25); 
  });

  return (
    <>
      <Environment preset="apartment" environmentIntensity={0.3} />
      <ambientLight intensity={1.2} color="#ffffff" />
      
      {/* Sunlight coming from the right window (X=2.5) */}
      <directionalLight 
        position={[8, 4, 1]} 
        intensity={3} 
        color="#fff5e6" // Warm white sunlight
        castShadow 
        shadow-mapSize={[1024, 1024]} 
        shadow-bias={-0.0001}
      />
      
      {activeRoom === 'Living' && <SceneLivingRoom floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
      {activeRoom === 'Bathroom' && <SceneBathroom floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
      {activeRoom === 'Kitchen' && <SceneKitchen floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
      {activeRoom === 'Commercial' && <SceneCommercial floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
      {activeRoom === 'Patio' && <ScenePatio floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
    </>
  );
}
