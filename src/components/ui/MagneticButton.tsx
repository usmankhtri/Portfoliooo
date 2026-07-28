import { useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export const MagneticButton = ({
  children,
  className,
  style,
  strength = 0.35,
  onClick,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 18 })
  const y = useSpring(rawY, { stiffness: 220, damping: 18 })
  const scale = useMotionValue(1)
  const springScale = useSpring(scale, { stiffness: 300, damping: 22 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) * strength)
    rawY.set((e.clientY - cy) * strength)
    scale.set(1.04)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    scale.set(1)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x, y, scale: springScale, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
