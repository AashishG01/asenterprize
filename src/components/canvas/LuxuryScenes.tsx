
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Standardized materials
const createFloorMaterial = (texture: THREE.Texture | null, isPolished = false) => {
  return new THREE.MeshStandardMaterial({
    map: texture,
    roughness: isPolished ? 0.15 : 0.35,
    metalness: 0,
    envMapIntensity: 1,
  });
};

const createWallMaterial = (texture: THREE.Texture | null) => {
  return new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.3,
    metalness: 0,
    envMapIntensity: 0.5,
  });
};

// Common Geometry
const Floor = ({ texture }: { texture: THREE.Texture | null }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
    <planeGeometry args={[20, 20]} />
    <primitive object={createFloorMaterial(texture, true)} attach="material" />
  </mesh>
);

const WallConcept = ({ dk, hl, lt, width, height, position, rotation }: any) => {
  const dkHeight = height * 0.4;
  const hlHeight = height * 0.1;
  const ltHeight = height * 0.5;
  
  return (
    <group position={position} rotation={rotation}>
      {/* Dark Base */}
      <mesh position={[0, -height/2 + dkHeight/2, 0]} receiveShadow castShadow>
        <planeGeometry args={[width, dkHeight]} />
        <primitive object={createWallMaterial(dk)} attach="material" />
      </mesh>
      {/* Highlighter Middle */}
      <mesh position={[0, -height/2 + dkHeight + hlHeight/2, 0]} receiveShadow castShadow>
        <planeGeometry args={[width, hlHeight]} />
        <primitive object={createWallMaterial(hl)} attach="material" />
      </mesh>
      {/* Light Top */}
      <mesh position={[0, height/2 - ltHeight/2, 0]} receiveShadow castShadow>
        <planeGeometry args={[width, ltHeight]} />
        <primitive object={createWallMaterial(lt)} attach="material" />
      </mesh>
    </group>
  );
};

// 1. Luxury Living Room
export function SceneLivingRoom({ floorTex, wallDK, wallHL, wallLT }: any) {
  return (
    <group>
      <Floor texture={floorTex} />
      {/* Back Wall */}
      <WallConcept dk={wallDK} hl={wallHL} lt={wallLT} width={10} height={6} position={[0, 1, -4]} rotation={[0, 0, 0]} />
      {/* Left Wall */}
      <mesh position={[-5, 1, 1]} rotation={[0, Math.PI/2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.8} />
      </mesh>
      
      {/* Architectural Sofa (Boucle) */}
      <RoundedBox args={[3, 0.6, 1]} position={[0, -1.7, 0]} radius={0.1} castShadow receiveShadow>
        <meshStandardMaterial color="#e8e5df" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[3, 0.6, 0.4]} position={[0, -1.1, -0.3]} radius={0.1} castShadow receiveShadow>
        <meshStandardMaterial color="#e8e5df" roughness={0.9} />
      </RoundedBox>
      
      {/* Monolithic Coffee Table (Stone) */}
      <RoundedBox args={[1.5, 0.3, 0.8]} position={[0, -1.85, 1.5]} radius={0.05} castShadow receiveShadow>
        <meshStandardMaterial color="#222" roughness={0.4} />
      </RoundedBox>

      {/* Area Rug */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1.99, 0.5]} receiveShadow>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#dcd9d4" roughness={1} />
      </mesh>
    </group>
  );
}

// 2. Premium Bathroom
export function SceneBathroom({ floorTex, wallDK, wallHL, wallLT }: any) {
  return (
    <group>
      <Floor texture={floorTex} />
      <WallConcept dk={wallDK} hl={wallHL} lt={wallLT} width={8} height={5} position={[0, 0.5, -3]} rotation={[0, 0, 0]} />
      
      {/* Floating Wooden Vanity */}
      <RoundedBox args={[2.5, 0.4, 0.8]} position={[0, -0.5, -2.5]} radius={0.02} castShadow receiveShadow>
        <meshStandardMaterial color="#5c4033" roughness={0.6} />
      </RoundedBox>
      
      {/* White Ceramic Sink */}
      <RoundedBox args={[1.2, 0.1, 0.5]} position={[0, -0.25, -2.4]} radius={0.05} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </RoundedBox>

      {/* Massive Frameless Mirror */}
      <mesh position={[0, 1, -2.95]}>
        <planeGeometry args={[2.5, 2]} />
        <meshStandardMaterial color="#aaa" metalness={1} roughness={0.05} envMapIntensity={2} />
      </mesh>

      {/* Under-vanity LED strip */}
      <rectAreaLight width={2.5} height={0.2} color="#ffeedd" intensity={5} position={[0, -0.7, -2.5]} rotation={[-Math.PI/2, 0, 0]} />
    </group>
  );
}

// 3. Modern Kitchen
export function SceneKitchen({ floorTex, wallDK, wallHL, wallLT }: any) {
  return (
    <group>
      <Floor texture={floorTex} />
      <WallConcept dk={wallDK} hl={wallHL} lt={wallLT} width={10} height={6} position={[0, 1, -4]} rotation={[0, 0, 0]} />
      
      {/* Massive Central Island */}
      <RoundedBox args={[4, 1.2, 1.5]} position={[0, -1.4, -0.5]} radius={0.02} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.1} />
      </RoundedBox>

      {/* Sleek Metal Pendant Lights */}
      <cylinderGeometry args={[0.05, 0.05, 1.5]} />
      <mesh position={[-1, 1, -0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1, 1, -0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pendant Lights Glow */}
      <pointLight position={[-1, 0.2, -0.5]} intensity={0.5} color="#ffeedd" distance={3} />
      <pointLight position={[1, 0.2, -0.5]} intensity={0.5} color="#ffeedd" distance={3} />
    </group>
  );
}

// 4. Commercial Lobby
export function SceneCommercial({ floorTex, wallDK, wallHL, wallLT }: any) {
  return (
    <group>
      <Floor texture={floorTex} />
      {/* Double Height Wall */}
      <WallConcept dk={wallDK} hl={wallHL} lt={wallLT} width={12} height={10} position={[0, 3, -5]} rotation={[0, 0, 0]} />
      
      {/* Geometric Reception Desk */}
      <mesh position={[0, -1.2, -1]} castShadow receiveShadow rotation={[0, Math.PI/12, 0]}>
        <boxGeometry args={[4, 1.6, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0} />
      </mesh>
      <mesh position={[-1, -1.1, -0.8]} castShadow receiveShadow rotation={[0, Math.PI/12, 0]}>
        <boxGeometry args={[4.2, 1.8, 0.2]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Decorative Indoor Plant Box */}
      <RoundedBox args={[1, 0.8, 1]} position={[3, -1.6, -2]} radius={0.05} castShadow>
        <meshStandardMaterial color="#333" roughness={0.8} />
      </RoundedBox>
    </group>
  );
}
