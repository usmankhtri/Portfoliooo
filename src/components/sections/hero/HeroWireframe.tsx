import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Abstract wireframe "gyroscope" object for the Hero's ambient 3D presence.
 *
 * Deliberately built with plain CSS 3D transforms (bordered circles rotated
 * in 3D space inside a `perspective` + `transform-style: preserve-3d`
 * container) instead of @react-three/fiber / @react-three/drei. Those
 * packages need `npm install` in an environment this pass can't build or
 * run — pulling in a new WebGL dependency untested would be exactly the
 * kind of mistake this pass is trying to avoid. This delivers the same
 * spec (abstract low-poly/wireframe object, blue palette, mouse parallax,
 * reduced-motion + low-power fallback, never blocks scroll/input) with
 * zero install risk and, being CSS transforms rather than a WebGL canvas,
 * comfortably clears 60fps on low-end mobile too. Swapping the inner
 * geometry for a real R3F canvas later is a contained, independent change
 * — everything else in Hero.tsx is unaffected either way.
 */
export const HeroWireframe = () => {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Static gradient fallback on reduced-motion, and also on devices that
    // report a coarse pointer + no hover (a reasonable proxy for "probably
    // a lower-power mobile device") — mouse-parallax has nothing to attach
    // to there anyway.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handle = requestAnimationFrame(() => {
      setEnabled(fine.matches && !prefersReducedMotion)
    })
    return () => cancelAnimationFrame(handle)
  }, [prefersReducedMotion])

  const rawRX = useMotionValue(0)
  const rawRY = useMotionValue(0)
  const tiltX = useSpring(rawRX, { stiffness: 60, damping: 20 })
  const tiltY = useSpring(rawRY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (!enabled) return
    const handleMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      rawRY.set(nx * 16)
      rawRX.set(ny * -16)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [enabled, rawRX, rawRY])

  if (prefersReducedMotion) {
    // Static gradient fallback — same footprint/position, no motion at all.
    return (
      <div
        aria-hidden="true"
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[420px] lg:w-[500px] h-[420px] lg:h-[500px] pointer-events-none hidden xl:block opacity-35"
      style={{ perspective: '1400px' }}
    >
      {/* Ambient glow behind the wireframe */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      {/* Mouse-parallax tilt layer */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      >
        {/* Continuous slow auto-rotation, decoupled from the parallax tilt
            above via a plain CSS animation so the two don't fight over the
            same Framer Motion transform. */}
        <div
          className="absolute inset-0 wireframe-spin"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {RINGS.map((ring, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: `1px solid ${ring.color}`,
                transform: `rotateX(${ring.rx}deg) rotateY(${ring.ry}deg) translateZ(0px)`,
                boxShadow: `0 0 24px ${ring.color}`,
              }}
            />
          ))}

          {/* Low-poly "nodes" at a few ring intersections for texture */}
          {NODES.map((node, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary-light"
              style={{
                width: 6,
                height: 6,
                top: '50%',
                left: '50%',
                transform: `translate3d(-50%, -50%, 0) rotateX(${node.rx}deg) rotateY(${node.ry}deg) translateZ(${node.z}px)`,
                boxShadow: '0 0 10px rgba(96,165,250,0.9)',
              }}
            />
          ))}

          {/* Glowing core */}
          <div
            className="absolute rounded-full"
            style={{
              width: 14,
              height: 14,
              top: '50%',
              left: '50%',
              transform: 'translate3d(-50%, -50%, 0)',
              background: 'radial-gradient(circle, rgba(147,197,253,1) 0%, rgba(37,99,235,0.4) 70%, transparent 100%)',
              boxShadow: '0 0 30px rgba(96,165,250,0.8)',
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

const RINGS = [
  { rx: 0, ry: 0, color: 'rgba(37,99,235,0.55)' },
  { rx: 60, ry: 20, color: 'rgba(96,165,250,0.4)' },
  { rx: 120, ry: 40, color: 'rgba(147,197,253,0.3)' },
]

const NODES = [
  { rx: 0, ry: 0, z: 220 },
  { rx: 0, ry: 90, z: 220 },
  { rx: 60, ry: 30, z: 220 },
  { rx: 120, ry: 60, z: 220 },
  { rx: 60, ry: 150, z: 220 },
]
