'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from '@react-three/drei'
import * as THREE from 'three'

const COUNT = 72

export default function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const rng = (i: number) => {
      const x = Math.sin(i * 12.9898) * 43758.5453
      return x - Math.floor(x)
    }
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (rng(i) - 0.5) * 14
      pos[i * 3 + 1] = (rng(i + 17) - 0.5) * 9
      pos[i * 3 + 2] = (rng(i + 31) - 0.5) * 9
    }
    return pos
  }, [])

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.018
  })

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <pointsMaterial size={0.045} color="#22d3ee" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}
