import { useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { SceneProductView } from "./LuxuryScenes";

export default function VirtualRoom() {
  const [ltUrl, setLtUrl] = useState("");

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail.lt) setLtUrl(e.detail.lt);
      if (e.detail.dk) setLtUrl(e.detail.dk);
      if (e.detail.wall) setLtUrl(e.detail.wall);
    };

    window.addEventListener("update-virtual-room", handleUpdate);
    return () => window.removeEventListener("update-virtual-room", handleUpdate);
  }, []);

  const wallTex = useTexture(ltUrl || "/textures/concepts/10841-DK.jpg");

  useEffect(() => {
    wallTex.colorSpace = THREE.SRGBColorSpace;
  }, [wallTex]);

  return (
    <>
      {/* Luxury studio lighting */}
      <ambientLight intensity={1.8} color="#ffffff" />

      {/* Main key light - warm, from top-right */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Fill light - cooler, from left */}
      <directionalLight
        position={[-5, 3, 2]}
        intensity={0.6}
        color="#f0f0ff"
      />

      {/* Rim light from below for subtle depth */}
      <directionalLight
        position={[0, -2, 3]}
        intensity={0.3}
        color="#ffffff"
      />

      <SceneProductView wallLT={wallTex} />
    </>
  );
}
