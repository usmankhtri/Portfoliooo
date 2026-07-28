import { useState, useEffect } from 'react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= minWidth
    }
    return true
  })

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= minWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [minWidth])

  return isDesktop
}
