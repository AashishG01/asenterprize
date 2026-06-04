import { Environment, Lightformer } from '@react-three/drei';

export default function CustomEnvironment({ intensity = 1 }: { intensity?: number }) {
  return (
    <Environment resolution={256} environmentIntensity={intensity}>
      <group rotation={[-Math.PI / 4, -0.3, 0]}>
        <Lightformer form="ring" intensity={5} scale={10} position={[-5, 5, -5]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2} scale={10} position={[5, 5, 5]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={3} scale={20} position={[0, -5, 0]} target={[0, 0, 0]} />
        {/* Fill lights */}
        <Lightformer form="rect" intensity={1} scale={10} position={[-10, 0, 5]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1} scale={10} position={[10, 0, -5]} target={[0, 0, 0]} />
      </group>
    </Environment>
  );
}
