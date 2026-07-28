import { useEffect, useRef, useState } from 'react'
import { APPLE_EASE } from '../../lib/utils'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { portfolioData } from '../../data/portfolioData'
import { HeroWireframe } from './hero/HeroWireframe'

const ROLES = portfolioData.hero.roles

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
})

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 100])

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      style={{ minHeight: '100svh' }}
      aria-label="Hero section"
    >
      {/* Background Grid & Ambient Lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        initial={prefersReducedMotion ? false : { opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: APPLE_EASE }}
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 600px at 70% 45%, rgba(37,99,235,0.12) 0%, transparent 70%), radial-gradient(circle 500px at 20% 30%, rgba(96,165,250,0.06) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Wireframe background element */}
      <HeroWireframe />

      <div
        className="relative z-10 w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12"
        style={{ paddingTop: 'clamp(5.5rem, 13vh, 8rem)', paddingBottom: 'clamp(3.5rem, 9vh, 6.5rem)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

          {/* LEFT: Text & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Available for work badge */}
            <motion.div {...fadeUp(0.1)} className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-md max-w-full">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-emerald-400 font-heading truncate">
                  Available for Projects
                </span>
              </div>
            </motion.div>

            {/* Main Name Heading */}
            <motion.h1
              {...fadeUp(0.2)}
              className="font-heading font-extrabold leading-[0.95] tracking-tighter mb-4 text-white"
              style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.25rem)' }}
            >
              Usman <span className="text-gradient">Khatri</span>
            </motion.h1>

            {/* Smooth Animated Role Switcher */}
            <motion.div {...fadeUp(0.3)} className="h-8 sm:h-9 mb-6 overflow-hidden flex items-center">
              <div className="flex items-center gap-2.5">
                <Sparkles className="size-4 text-primary-light shrink-0" />
                <div className="relative h-7 sm:h-8 overflow-hidden w-[280px] sm:w-[340px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROLES[roleIndex]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: APPLE_EASE }}
                      className="absolute inset-0 font-heading font-semibold text-base sm:text-lg md:text-xl text-primary-light tracking-wide flex items-center"
                    >
                      {ROLES[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.4)}
              className="text-zinc-400 max-w-xl leading-relaxed mb-8 text-sm sm:text-base md:text-lg"
            >
              Architecting high-performance digital products where robust engineering precision meets seamless user experiences. Specializing in MERN Stack, PWAs & AI Workflows.
            </motion.p>

            {/* Quick Proof Metrics Strip */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-9 pt-1 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium">
                <CheckCircle2 className="size-4 text-primary-light" />
                <span>12+ Projects Shipped</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium">
                <CheckCircle2 className="size-4 text-primary-light" />
                <span>3+ Yrs Experience</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium">
                <CheckCircle2 className="size-4 text-primary-light" />
                <span>100% Client Satisfaction</span>
              </div>
            </motion.div>

            {/* CTA Buttons & Social */}
            <motion.div {...fadeUp(0.6)} className="flex flex-wrap items-center gap-4">
              <Link
                to="/works"
                className="group px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white font-heading flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  boxShadow: '0 0 28px rgba(37,99,235,0.35), 0 4px 14px rgba(37,99,235,0.2)',
                }}
              >
                <span>View Selected Works</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-zinc-200 font-heading border border-white/12 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all text-center"
              >
                Let's Connect
              </Link>

              <div className="flex items-center gap-4 ml-auto sm:ml-2 pt-2 sm:pt-0">
                <a
                  href="https://github.com/usmankhatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all text-xs font-medium"
                >
                  <FiGithub className="size-4" />
                  <span>GitHub</span>
                </a>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                  <MapPin className="size-3.5" />
                  <span>Hyderabad, PK</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Photo Frame (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: APPLE_EASE, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(37,99,235,0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'scale(1.1)',
              }}
            />

            {/* Clean Portrait Container */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px] rounded-3xl overflow-hidden bg-card/40 border border-white/10"
              style={{
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(37, 99, 235, 0.15)',
              }}
            >
              {/* Photo */}
              <img
                src="/usman.png"
                alt="Usman Khatri"
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
                style={{ aspectRatio: '4/5', display: 'block' }}
                loading="eager"
                decoding="async"
              />

              {/* Bottom Gradient Overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, #060C1A 0%, rgba(6,12,26,0.6) 60%, transparent 100%)',
                }}
              />

              {/* Minimal Core Stack Footer */}
              <div
                className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-heading tracking-wider font-semibold text-zinc-400">Core Stack</span>
                  <span className="text-[10px] text-primary-light font-mono">MERN + AI</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium font-heading bg-primary/15 text-primary-light border border-primary/25"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden sm:flex absolute left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          style={{ bottom: 'max(1.2rem, calc(var(--safe-bottom) + 1.2rem))' }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-heading">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      )}
    </section>
  )
}
