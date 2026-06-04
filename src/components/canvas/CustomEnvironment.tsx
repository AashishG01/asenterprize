import { Environment, Lightformer } from '@react-three/drei';

export default function CustomEnvironment({ intensity = 1 }: { intensity?: number }) {
  return (
    <Environment resolution={256} environmentIntensity={intensity}>
      <group rotation={[-Math.PI / 4, -0.3, 0]}>
        {/* Main Key Light */}
        <Lightformer form="ring" intensity={3} scale={10} position={[-5, 5, -5]} target={[0, 0, 0]} />
        {/* Fill Light */}
        <Lightformer form="rect" intensity={2} scale={10} position={[5, 5, 5]} target={[0, 0, 0]} />
        {/* Top/Overhead Soft Light */}
        <Lightformer form="circle" intensity={1} scale={20} position={[0, 10, 0]} target={[0, 0, 0]} />
        {/* Rim Lights */}
        <Lightformer form="rect" intensity={0.5} scale={10} position={[-10, 5, 5]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.5} scale={10} position={[10, 5, -5]} target={[0, 0, 0]} />
      </group>
    </Environment>
  );
}
