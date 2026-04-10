'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useScrollToSection } from '@/components/portfolio/SmoothScrollProvider'

/* ============================================
   Mouse Follow Glow Effect Component
============================================ */
export function MouseFollowGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-30 hidden lg:block"
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
        opacity: isVisible ? 0.15 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-primary blur-[100px]" />
    </motion.div>
  )
}

/* ============================================
   Scroll Progress Indicator Component
============================================ */
export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left z-50"
      style={{ scaleX }}
    />
  )
}

/* ============================================
   Parallax Background Elements
============================================ */
export function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        style={{
          y: useSpring(scrollYProgress, { stiffness: 50, damping: 30 }),
        }}
      />
      <motion.div
        className="absolute top-3/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        style={{
          y: useSpring(scrollYProgress, { stiffness: 30, damping: 30 }),
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-secondary/5 blur-3xl"
      />
    </div>
  )
}

/* ============================================
   Section Reveal Animation Wrapper
============================================ */
export function SectionReveal({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ============================================
   Grid Background Pattern
============================================ */
export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

/* ============================================
   Floating Action Indicators
============================================ */
export function FloatingIndicators() {
  const scrollToId = useScrollToSection()

  return (
    <>
      {/* Scroll indicator dots - shows current section */}
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
        {['home', 'about', 'projects', 'skills', 'timeline', 'certificates', 'contact'].map((section) => (
          <motion.button
            key={section}
            type="button"
            onClick={() => scrollToId(section)}
            className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </>
  )
}

/* ============================================
   Noise Texture Overlay
============================================ */
export function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}
