import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, ArrowRight, Play } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { ThreeDIntroCanvas } from './intro/ThreeDIntroCanvas'
import { introAudio } from '../lib/introAudio'

export function LoadingScreen() {
  const isLoading = useAppStore((s) => s.isLoading)
  const finishLoading = useAppStore((s) => s.finishLoading)
  const soundEnabled = useAppStore((s) => s.soundEnabled)
  const toggleSound = useAppStore((s) => s.toggleSound)

  const [progress, setProgress] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [isFlashActive, setIsFlashActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const hasStartedAudio = useRef(false)
  const hasFinishedRef = useRef(false)

  // Direct skip to portfolio
  const skipIntro = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    introAudio.stopAll()
    finishLoading()
  }, [finishLoading])

  // Lightweight mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [skipIntro])

  // Ambient sound on start
  useEffect(() => {
    if (isLoading && soundEnabled && !hasStartedAudio.current) {
      hasStartedAudio.current = true
      introAudio.playAmbientSubHum()
    }
  }, [isLoading, soundEnabled])

  // Fast & snappy loading progression: ~1.4 seconds total build-up
  useEffect(() => {
    if (!isLoading) return

    const startTime = performance.now()
    const DURATION = 1400 // 1.4s fast build-up

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime
      const pct = Math.min(Math.floor((elapsed / DURATION) * 100), 100)

      setProgress(pct)

      if (pct >= 100) {
        clearInterval(timer)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isLoading])

  // Trigger camera zoom into "M"
  const triggerZoomSequence = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true

    setIsZooming(true)

    if (soundEnabled) {
      introAudio.playNetflixTudum()
    }

    // Flash light portal at 0.35s
    setTimeout(() => {
      setIsFlashActive(true)
    }, 350)

    // Finish loading into portfolio at 0.55s
    setTimeout(() => {
      introAudio.stopAll()
      finishLoading()
    }, 550)
  }, [soundEnabled, finishLoading])

  useEffect(() => {
    if (progress === 100 && !isZooming) {
      triggerZoomSequence()
    }
  }, [progress, isZooming, triggerZoomSequence])

  if (!isLoading) return null

  // Word 1: "USMAN" (Bold White) -> Target letter 'M' is at index 2
  const firstName = ['U', 'S', 'M', 'A', 'N']
  // Word 2: "KHATRI" (Electric Blue)
  const lastName = ['K', 'H', 'A', 'T', 'R', 'I']
  const targetIndex = 2 // 'M'

  return (
    <motion.div
      key="cinematic-movie-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-between py-8 px-6 overflow-hidden pointer-events-auto select-none font-['Outfit',sans-serif] transform-gpu"
    >
      {/* 3D WebGL Canvas Scene - Light & High Performance */}
      <ThreeDIntroCanvas progress={progress} isZooming={isZooming} mousePos={mousePos} />

      {/* Modern Minimal Crisp Background Overlay - No Heavy Blur Filters */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-[#030712] pointer-events-none" />

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-30 w-full max-w-6xl flex items-center justify-between text-xs font-semibold tracking-wider text-zinc-400 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="flex items-center gap-2">
          <Play className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
          <span className="text-zinc-200 text-xs tracking-widest font-bold">
            USMAN KHATRI
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors shadow-sm"
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-blue-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          <button
            onClick={skipIntro}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wider transition-colors shadow-md"
          >
            <span>SKIP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CENTER TITLE CARD (ZOOM DIRECTLY INTO 'M') */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center select-none">
        
        <div className="flex flex-col items-center justify-center relative transform-gpu">
          {/* WORD 1: USMAN (BOLD WHITE) */}
          <div className="flex items-center justify-center text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tight text-white uppercase leading-none font-['Outfit',sans-serif]">
            {firstName.map((char, idx) => {
              const isM = idx === targetIndex

              return (
                <div key={`usman-${idx}`} className="relative inline-block px-1 sm:px-2">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      isZooming
                        ? isM
                          ? {
                              // 'M' expands as camera dives straight through it
                              scale: [1, 6, 45],
                              opacity: [1, 1, 0],
                            }
                          : {
                              // Surrounding letters separate and fade out instantly
                              scale: 0.4,
                              opacity: 0,
                              x: idx < targetIndex ? -250 : 250,
                            }
                        : {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            x: 0,
                          }
                    }
                    transition={{
                      duration: isZooming ? 0.5 : 0.4,
                      delay: isZooming ? 0 : idx * 0.04,
                      ease: isZooming ? [0.7, 0, 0.84, 0] : [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${
                      isM
                        ? 'text-white font-black relative z-30'
                        : 'text-zinc-100 font-extrabold'
                    }`}
                    style={{
                      transformOrigin: 'center center',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {char}
                  </motion.span>
                </div>
              )
            })}
          </div>

          {/* WORD 2: KHATRI (ELECTRIC BLUE) */}
          <div className="flex items-center justify-center text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tight text-blue-500 uppercase leading-none mt-1 sm:mt-2 font-['Outfit',sans-serif]">
            {lastName.map((char, idx) => (
              <motion.span
                key={`khatri-${idx}`}
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isZooming
                    ? {
                        scale: 0.4,
                        opacity: 0,
                        y: 180,
                      }
                    : {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                      }
                }
                transition={{
                  duration: isZooming ? 0.4 : 0.4,
                  delay: isZooming ? 0 : (firstName.length + idx) * 0.04,
                  ease: isZooming ? [0.7, 0, 0.84, 0] : [0.22, 1, 0.36, 1],
                }}
                className="inline-block px-1 sm:px-2 text-blue-500 font-black"
                style={{
                  willChange: 'transform, opacity',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM PROGRESS BAR */}
      <div className="relative z-30 w-full max-w-xs flex flex-col items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-blue-500 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-wider text-zinc-400">
          <span className="text-zinc-400 font-semibold uppercase">LOADING</span>
          <span className="text-white font-bold">{progress}%</span>
        </div>
      </div>

      {/* CRISP WHITE FLASH REVEAL */}
      <AnimatePresence>
        {isFlashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[10000] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
