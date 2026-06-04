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

  // 5m x 4.5m room scale textures
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(5, 4.5); 

  [wallLT, wallHL, wallDK].forEach(t => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(5, 1);
  });

  // Human Eye Camera: Y=1.55m, Distance=4.5m, Angle=-10deg
  useFrame((state) => {
    const targetY = 1.55; 
    const targetZ = 4.5; 

    const px = state.pointer.x * 0.1;
    const py = state.pointer.y * 0.1;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, px, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + py, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    // Look at center floor (Y=0.8 creates roughly -10 degree downward angle)
    state.camera.lookAt(0, 0.8, 0); 
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
