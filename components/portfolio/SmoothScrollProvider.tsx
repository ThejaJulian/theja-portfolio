'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { NAV_SCROLL_OFFSET } from '@/lib/smooth-scroll'

type ScrollApi = {
  scrollToId: (id: string) => void
}

const ScrollContext = createContext<ScrollApi | null>(null)

export function useScrollToSection() {
  const ctx = useContext(ScrollContext)
  const fallback = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }, [])
  return ctx?.scrollToId ?? fallback
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(el, { offset: -NAV_SCROLL_OFFSET, duration: 1.15 })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15,
    })
    lenisRef.current = lenis

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <ScrollContext.Provider value={{ scrollToId }}>{children}</ScrollContext.Provider>
}
