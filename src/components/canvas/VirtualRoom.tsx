import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { SceneLivingRoom, SceneBathroom, SceneKitchen, SceneCommercial } from './LuxuryScenes';

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

  // Use a fallback if URL is empty initially
  const defaultFloor = '/textures/floors/floor-1.jpg';
  const defaultWall = '/textures/concepts/10841-DK.jpg';

  const floorTex = useTexture(floorUrl || defaultFloor);
  const wallLT = useTexture(ltUrl || defaultWall);
  const wallHL = useTexture(hlUrl || defaultWall);
  const wallDK = useTexture(dkUrl || defaultWall);

  // Configure textures
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(5, 5);

  [wallLT, wallHL, wallDK].forEach(t => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 2);
  });

  // Cinematic Camera & Parallax
  useFrame((state) => {
    let targetZ = 6;
    let targetY = 0;
    
    if (activeRoom === 'Living') { targetZ = 6; targetY = 0; }
    else if (activeRoom === 'Bathroom') { targetZ = 4.5; targetY = 0.5; }
    else if (activeRoom === 'Kitchen') { targetZ = 5.5; targetY = 0; }
    else if (activeRoom === 'Commercial') { targetZ = 8; targetY = 1; }

    const px = state.pointer.x * 0.5;
    const py = state.pointer.y * 0.5;

    // Offset the camera target UP so the room renders higher on the screen
    // This perfectly counter-balances the UI overlay sitting at the bottom!
    const cameraOffsetY = 1.2;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, px, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + py + cameraOffsetY, 0.03);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.03);
    state.camera.lookAt(0, targetY + cameraOffsetY, 0);
  });

  return (
    <>
      <Environment preset="apartment" environmentIntensity={0.8} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
      
      {activeRoom === 'Living' && <SceneLivingRoom floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
      {activeRoom === 'Bathroom' && <SceneBathroom floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
      {activeRoom === 'Kitchen' && <SceneKitchen floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
      {activeRoom === 'Commercial' && <SceneCommercial floorTex={floorTex} wallDK={wallDK} wallHL={wallHL} wallLT={wallLT} />}
    </>
  );
}
