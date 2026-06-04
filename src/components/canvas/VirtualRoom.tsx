import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { SceneLivingRoom, SceneBathroom, SceneKitchen, SceneCommercial, ScenePatio, SceneProductView } from './LuxuryScenes';

export default function VirtualRoom() {
  const [viewMode, setViewMode] = useState('Product');
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
      if (e.detail.mode) setViewMode(e.detail.mode);
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

  useEffect(() => {
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(20, 20); 

    [wallLT, wallHL, wallDK].forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      if (viewMode === 'Product') {
        t.repeat.set(24, 2); // Larger wall 12x6m
      } else {
        t.repeat.set(10, 1); // Room feature wall 10x3m
      }
    });
  }, [viewMode, floorTex, wallLT, wallHL, wallDK]);

  useFrame((state) => {
    if (viewMode === 'Product') {
      // Direct front-on orthographic-style framing
      const targetX = 0;
      const targetY = 2.5; 
      const targetZ = 3.2; // Push back to frame 80% Wall, 20% Floor
      
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.08);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
      state.camera.lookAt(0, 1.8, -2.25); // Look mostly straight ahead at the wall
      
    } else {
      // Human Eye Camera: Placed INSIDE the room!
      const targetX = 1.2;
      const targetY = 1.0; 
      const targetZ = 1.2; 

      const px = state.pointer.x * 0.15;
      const py = state.pointer.y * 0.15;

      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + px, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + py, 0.05);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
      
      // Look at the feature wall (z=-2.25), slightly left (x=-0.8), and down (y=0.5)
      state.camera.lookAt(-0.8, 0.5, -2.25); 
    }
  });

  return (
    <>
      {viewMode === 'Room' && <Environment preset="apartment" environmentIntensity={0.3} />}
      
      <ambientLight intensity={viewMode === 'Product' ? 1.5 : 1.2} color="#ffffff" />
      
      <directionalLight 
        position={viewMode === 'Product' ? [0, 5, 3] : [8, 4, 1]} 
        intensity={viewMode === 'Product' ? 2 : 3} 
        color="#fff5e6" 
        castShadow={viewMode === 'Room'} 
        shadow-mapSize={[1024, 1024]} 
        shadow-bias={-0.0001}
      />
      
      {viewMode === 'Product' ? (
        <SceneProductView floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />
      ) : (
        <>
          {activeRoom === 'Living' && <SceneLivingRoom floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
          {activeRoom === 'Bathroom' && <SceneBathroom floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
          {activeRoom === 'Kitchen' && <SceneKitchen floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
          {activeRoom === 'Commercial' && <SceneCommercial floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
          {activeRoom === 'Patio' && <ScenePatio floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
        </>
      )}
    </>
  );
}
