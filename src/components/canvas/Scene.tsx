import { Canvas } from '@react-three/fiber';
import { View, Preload } from '@react-three/drei';
import { Suspense } from 'react';
import CustomEnvironment from './CustomEnvironment';

export default function Scene() {
  return (
    <>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 8], fov: 28 }}
        eventSource={document.getElementById('root')!}
        className="canvas-container"
      >
        <Suspense fallback={null}>
          <View.Port />
          <CustomEnvironment />
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}
