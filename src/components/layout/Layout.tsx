import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Respect prefers-reduced-motion: skip Lenis's inertia smoothing entirely
    // and fall back to plain native scrolling. Scroll-linked Framer Motion
    // animations elsewhere already branch on useReducedMotion(), so between
    // the two, motion-sensitive visitors get a fully static experience.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let lenis: import('lenis').default | undefined
    let rafId: number
    let cancelled = false

    // Dynamic import (not a top-level `import Lenis from 'lenis'`) so this
    // module is never evaluated during SSR/prerendering — some scroll libs
    // touch `window` at their module's top level, which would throw in
    // Node's renderToString. This only ever runs client-side, inside an
    // effect, which is exactly where it's needed anyway.
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return

      lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        // Lenis drives scroll (it does NOT use a transformed wrapper here, so
        // it updates real window.scrollY every frame via its own rAF loop).
        // Framer Motion's useScroll() just reads that same native scroll
        // position from a passive 'scroll' listener — it does not run a
        // second animation loop of its own, so the two never fight. Keep it
        // this way: don't introduce a Lenis `wrapper`/`content` option (which
        // switches to transform-based virtual scroll) without also rewiring
        // every useScroll() call to Lenis's 'scroll' event, or they will drift.
      })

      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background noise">
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(37,99,235,0.4) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {children}
      <Footer />
      <Navbar />
    </div>
  )
}
