import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThreeDIntroCanvasProps {
  progress: number
  isZooming: boolean
  mousePos: { x: number; y: number }
}

export function ThreeDIntroCanvas({ isZooming, mousePos }: ThreeDIntroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isZoomingRef = useRef(isZooming)
  const mouseRef = useRef(mousePos)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    isZoomingRef.current = isZooming
  }, [isZooming])

  useEffect(() => {
    mouseRef.current = mousePos
  }, [mousePos])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer | null = null
    let animationFrameId: number | null = null
    let particleGeo: THREE.BufferGeometry | null = null
    let particleMat: THREE.PointsMaterial | null = null

    try {
      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        500
      )
      camera.position.set(0, 0, 30)

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      })
      // Capped pixel ratio to max 1.25 for buttery smooth performance without GPU strain
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
      renderer.setSize(window.innerWidth, window.innerHeight)

      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault()
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
      })

      container.appendChild(renderer.domElement)

      // Light, efficient particle grid (250 points instead of 800)
      const particleCount = 250
      particleGeo = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const particleColors = new Float32Array(particleCount * 3)

      const colorBlue = new THREE.Color(0x2563eb)
      const colorLight = new THREE.Color(0x93c5fd)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100

        const color = Math.random() > 0.4 ? colorBlue : colorLight
        particleColors[i * 3] = color.r
        particleColors[i * 3 + 1] = color.g
        particleColors[i * 3 + 2] = color.b
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

      particleMat = new THREE.PointsMaterial({
        size: 0.8,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        depthWrite: false,
      })

      const particleSystem = new THREE.Points(particleGeo, particleMat)
      scene.add(particleSystem)

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)

        // Smooth lightweight camera movement
        const targetX = mouseRef.current.x * 1.5
        const targetY = mouseRef.current.y * 1.0
        camera.position.x += (targetX - camera.position.x) * 0.04
        camera.position.y += (targetY - camera.position.y) * 0.04

        if (isZoomingRef.current) {
          // Camera flys straight forward into the M portal
          camera.position.z -= 1.4
          if (particleMat) {
            particleMat.opacity *= 0.92
          }
        } else {
          // Super lightweight group movement - NO GPU buffer array mutations!
          particleSystem.rotation.y += 0.0005
          particleSystem.position.z += 0.03
          if (particleSystem.position.z > 20) {
            particleSystem.position.z = -20
          }
        }

        if (renderer) {
          renderer.render(scene, camera)
        }
      }

      animationFrameId = requestAnimationFrame(animate)

      const handleResize = () => {
        if (!renderer) return
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
        if (renderer) {
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }
        if (particleGeo) particleGeo.dispose()
        if (particleMat) particleMat.dispose()
      }
    } catch {
      requestAnimationFrame(() => {
        setWebglSupported(false)
      })
    }
  }, [])

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#030712]" />
    )
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    />
  )
}
