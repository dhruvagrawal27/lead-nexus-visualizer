
import React from 'react';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';

const LoadingScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#00ffff" intensity={0.8} />
      
      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <mesh>
          <torusGeometry args={[2, 0.5, 16, 100]} />
          <MeshDistortMaterial
            color="#00ffff"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, -2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#6600ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </>
  );
};

export default LoadingScene;
