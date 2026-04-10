'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.26
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
      <Sphere ref={meshRef} args={[0.85, 48, 48]} position={[2.2, 0.35, -0.8]}>
        <MeshDistortMaterial
          color="#06b6d4"
          distort={0.32}
          speed={1.6}
          roughness={0.22}
          metalness={0.82}
          emissive="#06b6d4"
          emissiveIntensity={0.18}
        />
      </Sphere>
    </Float>
  )
}
