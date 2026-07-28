import { useState, forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = !!props.value || !!props.defaultValue
    const floatLabel = focused || hasValue

    return (
      <div className="relative w-full">
        <motion.label
          animate={{ y: floatLabel ? -24 : 0, scale: floatLabel ? 0.82 : 1, color: focused ? '#60A5FA' : '#71717A' }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="absolute left-4 top-3.5 text-sm font-medium pointer-events-none origin-left z-10 text-zinc-500"
        >
          {label}
        </motion.label>

        <input
          ref={ref}
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={cn(
            'w-full pt-6 pb-2.5 px-4 rounded-xl text-sm text-white outline-none transition-all duration-300',
            'bg-[rgba(10,23,40,0.6)] border',
            focused ? 'border-primary/60 shadow-[0_0_0_3px_rgba(37,99,235,0.12)]' : 'border-white/8',
            error ? 'border-red-500/60' : '',
            className,
          )}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-1.5 text-xs text-red-400 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
AnimatedInput.displayName = 'AnimatedInput'

interface AnimatedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const AnimatedTextarea = forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = !!props.value || !!props.defaultValue
    const floatLabel = focused || hasValue

    return (
      <div className="relative w-full">
        <motion.label
          animate={{ y: floatLabel ? -20 : 0, scale: floatLabel ? 0.82 : 1, color: focused ? '#60A5FA' : '#71717A' }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="absolute left-4 top-3.5 text-sm font-medium pointer-events-none origin-left z-10 text-zinc-500"
        >
          {label}
        </motion.label>

        <textarea
          ref={ref}
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={cn(
            'w-full pt-6 pb-3 px-4 rounded-xl text-sm text-white outline-none transition-all duration-300 resize-none',
            'bg-[rgba(10,23,40,0.6)] border',
            focused ? 'border-primary/60 shadow-[0_0_0_3px_rgba(37,99,235,0.12)]' : 'border-white/8',
            error ? 'border-red-500/60' : '',
            className,
          )}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-1.5 text-xs text-red-400 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
AnimatedTextarea.displayName = 'AnimatedTextarea'
