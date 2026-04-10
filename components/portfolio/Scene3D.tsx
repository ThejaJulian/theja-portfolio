'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, PerformanceMonitor, Stars } from '@react-three/drei'
import Laptop3D from './three/Laptop3D'
import GlowingSphere from './three/GlowingSphere'
import FloatingParticles from './three/FloatingParticles'
import { OrbitalRing } from './three/OrbitalDecor'

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[6, 10, 4]} intensity={0.85} color="#e0f2fe" />
      <pointLight position={[8, 6, 6]} intensity={0.65} color="#22d3ee" />
      <pointLight position={[-8, -4, -4]} intensity={0.4} color="#2dd4bf" />
      <spotLight position={[0, 8, 2]} angle={0.35} penumbra={0.85} intensity={0.45} color="#ffffff" />

      <Stars radius={90} depth={45} count={1600} factor={3.2} saturation={0} fade speed={0.45} />

      <Laptop3D />
      <GlowingSphere />
      <FloatingParticles />

      <OrbitalRing radius={2.85} color="#06b6d4" speed={0.16} />
      <OrbitalRing radius={3.35} color="#14b8a6" speed={-0.12} />

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.45}
        scale={12}
        blur={2.4}
        far={5}
        color="#000000"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.42}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3.2}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function Scene3D() {
  const [dpr, setDpr] = useState(1.25)

  return (
    <div className="absolute inset-0 -z-10 min-h-[100dvh]">
      <Canvas
        camera={{ position: [0, 0.2, 5.8], fov: 48, near: 0.1, far: 120 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, dpr]}
        frameloop="always"
      >
        <PerformanceMonitor
          flipflops={4}
          onIncline={() => setDpr(1.85)}
          onDecline={() => setDpr(1)}
        />
        <SceneContent />
      </Canvas>
    </div>
  )
}
