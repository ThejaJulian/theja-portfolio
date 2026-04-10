'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Instance, Instances, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { SCREEN_LINES, LINE_COLORS } from './code-line-data'

const ALUMINUM = '#3a3f4a'
const KEY_BG = '#0b1220'

function KeyGrid() {
  const positions = useMemo(() => {
    const pts: [number, number, number][] = []
    const cols = 11
    const rows = 4
    const sx = 0.22
    const sz = 0.2
    const startX = -((cols - 1) * sx) / 2
    const startZ = 0.15
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pts.push([startX + c * sx, 0.01, startZ - r * sz])
      }
    }
    return pts
  }, [])

  return (
    <Instances limit={50} range={50}>
      <boxGeometry args={[0.18, 0.018, 0.16]} />
      <meshPhysicalMaterial color={KEY_BG} metalness={0.35} roughness={0.55} />
      {positions.map((p, i) => (
        <Instance key={i} position={p} />
      ))}
    </Instances>
  )
}

export default function Laptop3D() {
  const rootRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!rootRef.current) return
    rootRef.current.rotation.y = Math.sin(t * 0.22) * 0.11 + 0.08
    rootRef.current.position.y = Math.sin(t * 0.35) * 0.06
  })

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.45}>
      <group ref={rootRef} position={[0, -0.35, 0]} scale={0.92}>
        {/* Chassis */}
        <RoundedBox args={[2.95, 0.16, 1.95]} radius={0.045} position={[0, -0.08, 0]}>
          <meshPhysicalMaterial
            color={ALUMINUM}
            metalness={0.88}
            roughness={0.32}
            clearcoat={0.35}
            clearcoatRoughness={0.4}
          />
        </RoundedBox>

        {/* Palm rest / deck */}
        <RoundedBox args={[2.75, 0.025, 1.65]} radius={0.02} position={[0, 0.02, 0.08]}>
          <meshPhysicalMaterial color="#151922" metalness={0.5} roughness={0.45} />
        </RoundedBox>

        <KeyGrid />

        {/* Trackpad */}
        <RoundedBox args={[0.78, 0.012, 0.52]} radius={0.04} position={[0, 0.025, 0.62]}>
          <meshPhysicalMaterial
            color="#1a2332"
            metalness={0.55}
            roughness={0.35}
            clearcoat={0.5}
          />
        </RoundedBox>

        {/* Hinge bar (runs along width) */}
        <mesh position={[0, 0.06, -0.96]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 2.82, 14]} />
          <meshPhysicalMaterial color="#2b3038" metalness={0.75} roughness={0.35} />
        </mesh>

        {/* Lid + display */}
        <group position={[0, 0.09, -0.96]} rotation={[-0.58, 0, 0]}>
          <RoundedBox args={[2.78, 1.72, 0.09]} radius={0.035} position={[0, 0.88, 0]}>
            <meshPhysicalMaterial color="#1c1f28" metalness={0.9} roughness={0.28} />
          </RoundedBox>

          {/* Bezel inner */}
          <mesh position={[0, 0.88, 0.045]}>
            <planeGeometry args={[2.52, 1.52]} />
            <meshStandardMaterial
              color="#050a12"
              metalness={0.15}
              roughness={0.35}
              emissive="#022c3c"
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* Glass / glare */}
          <mesh position={[0, 0.88, 0.052]}>
            <planeGeometry args={[2.52, 1.52]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0}
              roughness={0.05}
              transparent
              opacity={0.06}
              envMapIntensity={1.2}
            />
          </mesh>

          {SCREEN_LINES.map((line, i) => (
            <mesh key={i} position={[-0.02, 0.88 + line.y, 0.055]}>
              <planeGeometry args={[line.width * 0.72, 0.026]} />
              <meshStandardMaterial
                color={LINE_COLORS[line.hue]}
                emissive={LINE_COLORS[line.hue]}
                emissiveIntensity={0.45}
                toneMapped={false}
              />
            </mesh>
          ))}

          {/* Camera dot */}
          <mesh position={[0, 1.62, 0.048]}>
            <circleGeometry args={[0.025, 16]} />
            <meshStandardMaterial color="#0a0a10" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}
