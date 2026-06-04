import { useState, useEffect, Suspense } from 'react';
import { useTexture, OrbitControls, MeshReflectorMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import CustomEnvironment from './CustomEnvironment';
// @ts-ignore
import manifest from '../../utils/manifest.json';

function TexturedPlane({ url, position, rotation, args, repeat }: any) {
  const texture = useTexture(url);
  // Ensure we don't mutate shared textures across renders improperly
  const clonedTexture = (texture as THREE.Texture).clone();
  clonedTexture.wrapS = THREE.RepeatWrapping;
  clonedTexture.wrapT = THREE.RepeatWrapping;
  clonedTexture.repeat.set(repeat[0], repeat[1]);
  clonedTexture.needsUpdate = true;

  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial map={clonedTexture} roughness={0.15} metalness={0.1} />
    </mesh>
  );
}

function WallAssembly({ dkUrl, hlUrl, ltUrl, position, rotation, width }: any) {
  // A standard wall is 10 units high.
  // DK (Dark): Bottom 3 units
  // HL (Highlighter): Middle 1.5 units
  // LT (Light): Top 5.5 units
  
  // Aspect ratio mapping for 1024x1536 (2:3) 300x450 tiles
  // 1 unit = 1 foot approx.
  // We want the tiles to look correct. A 300x450 tile is 1x1.5 feet.
  // If height is 3 units, that's 2 tiles high. Repeat Y = 2.
  // If width is 20 units, that's 20 tiles wide. Repeat X = 20.

  return (
    <group position={position} rotation={rotation}>
      {/* Dark Bottom */}
      {dkUrl && (
        <TexturedPlane 
          url={dkUrl} 
          position={[0, 1.5, 0]} 
          args={[width, 3]} 
          repeat={[width / 1.5, 3 / 1.5]} 
        />
      )}
      
      {/* Highlighter Middle */}
      {hlUrl && (
        <TexturedPlane 
          url={hlUrl} 
          position={[0, 3.75, 0]} 
          args={[width, 1.5]} 
          repeat={[width / 1.5, 1]} 
        />
      )}
      
      {/* Light Top */}
      {(ltUrl || dkUrl) && (
        <TexturedPlane 
          url={ltUrl || dkUrl} 
          position={[0, 7.25, 0]} 
          args={[width, 5.5]} 
          repeat={[width / 1.5, 5.5 / 1.5]} 
        />
      )}
    </group>
  );
}

function Floor({ url }: { url: string }) {
  const texture = useTexture(url);
  const cloned = (texture as THREE.Texture).clone();
  cloned.wrapS = THREE.RepeatWrapping;
  cloned.wrapT = THREE.RepeatWrapping;
  cloned.repeat.set(10, 10);
  cloned.needsUpdate = true;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        map={cloned}
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={0.1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#888888"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  );
}

export default function VirtualRoom() {
  const [selectedFloor, setSelectedFloor] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string>('');

  useEffect(() => {
    const handleUpdate = (e: any) => {
      setSelectedFloor(e.detail.floor);
      setSelectedConcept(e.detail.concept);
    };
    window.addEventListener('update-virtual-room', handleUpdate);
    return () => window.removeEventListener('update-virtual-room', handleUpdate);
  }, []);

  // Resolve URLs based on prefix
  const concepts = manifest.concepts;
  const dkUrl = concepts.find((c: string) => c.includes(`${selectedConcept}-DK`)) || concepts.find((c: string) => c.includes(`${selectedConcept}`));
  const hlUrl = concepts.find((c: string) => c.includes(`${selectedConcept}-HL`));
  const ltUrl = concepts.find((c: string) => c.includes(`${selectedConcept}-LT`));

  return (
    <>
      <ambientLight intensity={0.6} />
      <CustomEnvironment />
      <directionalLight castShadow position={[5, 10, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 8, 0]} intensity={1} color="#ffeebb" />

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={2}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 3}
      />

      <Suspense fallback={null}>
        <group position={[0, -2, 0]}>
          {/* Floor */}
          {selectedFloor && <Floor url={selectedFloor} />}
          
          {/* Back Wall */}
          <WallAssembly dkUrl={dkUrl} hlUrl={hlUrl} ltUrl={ltUrl} position={[0, 0, -10]} rotation={[0, 0, 0]} width={20} />
          
          {/* Left Wall */}
          <WallAssembly dkUrl={dkUrl} hlUrl={hlUrl} ltUrl={ltUrl} position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]} width={20} />
          
          {/* Right Wall */}
          <WallAssembly dkUrl={dkUrl} hlUrl={hlUrl} ltUrl={ltUrl} position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]} width={20} />

          {/* Luxury Props to give scale */}
          <mesh position={[0, 1, -5]} castShadow>
             <boxGeometry args={[4, 2, 2]} />
             <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh position={[0, 2.1, -5]} castShadow>
             <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
             <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} />
          </mesh>
        </group>
        <ContactShadows position={[0, -1.99, 0]} opacity={0.4} scale={20} blur={2} far={4} />
      </Suspense>
    </>
  );
}
