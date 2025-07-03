
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import LoadingScene from './LoadingScene';

interface LoadingOverlayProps {
  currentMessage: string;
}

const LoadingOverlay = ({ currentMessage }: LoadingOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900"
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <LoadingScene />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 text-center">
        <motion.h2
          key={currentMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4"
        >
          {currentMessage}
        </motion.h2>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-4 h-4 bg-cyan-400 rounded-full mx-auto"
        />
        <p className="text-sm text-gray-400 mt-4">
          This may take up to 10 minutes for comprehensive results...
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
