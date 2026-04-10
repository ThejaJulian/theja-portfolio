'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const TOTAL_MS = 1600

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    let hideTimer: ReturnType<typeof setTimeout> | undefined

    function tick() {
      const elapsed = performance.now() - start
      const p = Math.min(100, (elapsed / TOTAL_MS) * 100)
      setProgress(p)

      if (p >= 100) {
        hideTimer = setTimeout(() => setLoading(false), 320)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="gradient-dark fixed inset-0 z-[100] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              <span className="text-foreground">Theja</span>
              <span className="glow-text ml-2 text-primary">Khruomo</span>
            </h1>
          </motion.div>

          <div className="w-64 md:w-80">
            <div className="h-1 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.15 }}
                className="glow-primary h-full rounded-full bg-gradient-to-r from-primary to-accent"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center font-mono text-sm text-muted-foreground"
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="size-2 rounded-full bg-primary"
              />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.28, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute size-32 rounded-full border border-primary/20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
