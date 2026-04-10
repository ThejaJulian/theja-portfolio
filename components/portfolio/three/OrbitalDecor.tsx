'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function OrbitalRing({
  radius,
  color,
  speed,
}: {
  radius: number
  color: string
  speed: number
}) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current) return
    const t = state.clock.elapsedTime * speed
    ringRef.current.rotation.x = t
    ringRef.current.rotation.z = t * 0.48
  })

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[radius, 0.018, 12, 96]} />
      <meshStandardMaterial color={color} transparent opacity={0.38} emissive={color} emissiveIntensity={0.28} />
    </mesh>
  )
}
