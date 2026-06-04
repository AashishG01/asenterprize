import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { SceneProductView } from './LuxuryScenes';

export default function VirtualRoom() {
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
    // Floor is 16m wide, 4m deep. Tile is 600x1200mm (0.6x1.2m)
    floorTex.repeat.set(16 / 0.6, 4 / 1.2); 

    [wallLT, wallHL, wallDK].forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      // Wall is 16m wide, 8m tall. Tile is 300x450mm (0.3x0.45m)
      t.repeat.set(16 / 0.3, 8 / 0.45); 
    });
  }, [floorTex, wallLT, wallHL, wallDK]);

  useFrame((state) => {
    // Direct front-on orthographic-style framing
    const targetX = 0;
    const targetY = 2.5; 
    const targetZ = 3.6; // Push back to frame 75-80% Wall, 5-10% Floor Strip
    
    // Slight parallax
    const px = state.pointer.x * 0.05;
    const py = state.pointer.y * 0.05;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + px, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + py, 0.08);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
    
    // Look straight ahead at the wall
    state.camera.lookAt(px, 1.8 + py, -2.25); 
  });

  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      
      <directionalLight 
        position={[0, 5, 3]} 
        intensity={2} 
        color="#fff5e6" 
        shadow-mapSize={[1024, 1024]} 
        shadow-bias={-0.0001}
      />
      
      <SceneProductView floorTex={floorTex} wallLT={wallLT} />
    </>
  );
}
