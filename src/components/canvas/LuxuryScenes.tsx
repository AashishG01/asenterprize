import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Standardized materials matching user specs
const createFloorMaterial = (texture: THREE.Texture | null) => {
  return new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.25, // Satin finish
    metalness: 0,
    envMapIntensity: 0.3,
  });
};

const createWallMaterial = (texture: THREE.Texture | null) => {
  return new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.35,
    metalness: 0,
    envMapIntensity: 0.2,
  });
};

// Enclosed Room Wrapper
const EnclosedArchitecture = ({ children, floorTex, dk, hl, lt, isPatio = false }: any) => {
  return (
    <group>
      {/* Infinite Floor to prevent black edges */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <primitive object={createFloorMaterial(floorTex)} attach="material" />
      </mesh>
      
      {/* Infinite Ceiling */}
      {!isPatio && (
        <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f0eee9" roughness={0.9} />
        </mesh>
      )}

      {/* Feature Back Wall (z = -2.25) - Expanded to fill FOV */}
      <group position={[0, 1.5, -2.25]}>
        {/* Dark Base (40% = 1.2m) */}
        <mesh position={[0, -0.9, 0]} receiveShadow castShadow>
          <planeGeometry args={[10, 1.2]} />
          <primitive object={createWallMaterial(dk)} attach="material" />
        </mesh>
        {/* Highlighter Middle (10% = 0.3m) */}
        <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
          <planeGeometry args={[10, 0.3]} />
          <primitive object={createWallMaterial(hl)} attach="material" />
        </mesh>
        {/* Light Top (50% = 1.5m) */}
        <mesh position={[0, 0.75, 0]} receiveShadow castShadow>
          <planeGeometry args={[10, 1.5]} />
          <primitive object={createWallMaterial(lt)} attach="material" />
        </mesh>
      </group>

      {/* Left Wall (Neutral Microcement) x = -3 (pushed back for breathing room) */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[20, 3]} />
        <meshStandardMaterial color={isPatio ? "#8B7355" : "#e8e6e1"} roughness={0.8} />
      </mesh>

      {/* Right Window Wall x = 3.5 */}
      {!isPatio ? (
        <group position={[3.5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[0, 1.25, 0]} receiveShadow castShadow>
            <planeGeometry args={[20, 0.5]} />
            <meshStandardMaterial color="#e8e6e1" roughness={0.8} />
          </mesh>
          <mesh position={[0, -1.25, 0]} receiveShadow castShadow>
            <planeGeometry args={[20, 0.5]} />
            <meshStandardMaterial color="#e8e6e1" roughness={0.8} />
          </mesh>
        </group>
      ) : null}

      {/* Furniture */}
      {children}
    </group>
  );
};

// 1. Luxury Living Room
export function SceneLivingRoom(props: any) {
  return (
    <EnclosedArchitecture {...props}>
      {/* Lower Profile Sofa to avoid blocking tiles */}
      <RoundedBox args={[2.8, 0.6, 1.0]} position={[0, 0.3, 0]} radius={0.1} castShadow receiveShadow>
        <meshStandardMaterial color="#e8e5df" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[2.8, 0.5, 0.4]} position={[0, 0.85, -0.3]} radius={0.1} castShadow receiveShadow>
        <meshStandardMaterial color="#e8e5df" roughness={0.9} />
      </RoundedBox>
      
      {/* Minimalist Coffee Table */}
      <RoundedBox args={[1.6, 0.25, 0.8]} position={[0, 0.125, 1.2]} radius={0.05} castShadow receiveShadow>
        <meshStandardMaterial color="#222" roughness={0.4} />
      </RoundedBox>

      {/* Area Rug */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, 0.8]} receiveShadow>
        <planeGeometry args={[3.2, 2.0]} />
        <meshStandardMaterial color="#dcd9d4" roughness={1} />
      </mesh>
    </EnclosedArchitecture>
  );
}

// 2. Premium Bathroom
export function SceneBathroom(props: any) {
  return (
    <EnclosedArchitecture {...props}>
      {/* Floating Wooden Vanity (Pushed right to expose feature wall) */}
      <RoundedBox args={[2.5, 0.5, 0.8]} position={[0.5, 0.9, -1.85]} radius={0.02} castShadow receiveShadow>
        <meshStandardMaterial color="#5c4033" roughness={0.6} />
      </RoundedBox>
      
      {/* White Ceramic Sink */}
      <RoundedBox args={[1.2, 0.12, 0.6]} position={[0.5, 1.21, -1.75]} radius={0.04} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </RoundedBox>

      {/* Massive Frameless Mirror */}
      <mesh position={[0.5, 1.9, -2.24]}>
        <planeGeometry args={[2.5, 1.0]} />
        <meshStandardMaterial color="#aaa" metalness={1} roughness={0.05} envMapIntensity={2} />
      </mesh>

      {/* Under-vanity LED strip */}
      <rectAreaLight width={2.5} height={0.2} color="#ffeedd" intensity={5} position={[0.5, 0.7, -1.8]} rotation={[-Math.PI/2, 0, 0]} />
    </EnclosedArchitecture>
  );
}

// 3. Modern Kitchen
export function SceneKitchen(props: any) {
  return (
    <EnclosedArchitecture {...props}>
      {/* Central Island - Lower Profile */}
      <RoundedBox args={[2.8, 0.8, 1.2]} position={[0, 0.4, -0.8]} radius={0.02} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.1} />
      </RoundedBox>

      {/* Sleek Metal Pendant Lights */}
      <mesh position={[-1.0, 2.2, -0.8]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 1.6]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.0, 2.2, -0.8]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 1.6]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
    </EnclosedArchitecture>
  );
}

// 4. Commercial Lobby
export function SceneCommercial(props: any) {
  return (
    <EnclosedArchitecture {...props}>
      {/* Geometric Reception Desk */}
      <mesh position={[0, 0.6, -0.5]} castShadow receiveShadow rotation={[0, Math.PI/12, 0]}>
        <boxGeometry args={[4, 1.2, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0} />
      </mesh>
      <mesh position={[-1, 0.7, -0.3]} castShadow receiveShadow rotation={[0, Math.PI/12, 0]}>
        <boxGeometry args={[4.2, 1.4, 0.2]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
    </EnclosedArchitecture>
  );
}

// 5. Outdoor Patio
export function ScenePatio(props: any) {
  return (
    <EnclosedArchitecture {...props} isPatio>
      {/* Simple outdoor stone bench */}
      <RoundedBox args={[3, 0.4, 0.8]} position={[0, 0.2, -1.5]} radius={0.05} castShadow receiveShadow>
        <meshStandardMaterial color="#555" roughness={0.9} />
      </RoundedBox>
    </EnclosedArchitecture>
  );
}
