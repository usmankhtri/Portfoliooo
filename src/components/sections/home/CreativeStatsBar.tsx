import React from 'react'
import { motion } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import { Rocket, ShieldCheck, Zap, Code } from 'lucide-react'

interface StatBadgeProps {
  value: string
  label: string
  sublabel: string
  icon: React.ElementType
  color: string
  borderColor: string
  bgColor: string
  index: number
}

const STATS_DATA: Omit<StatBadgeProps, 'index'>[] = [
  {
    value: '12+',
    label: 'Production Apps Shipped',
    sublabel: 'Full-Stack MERN & PWAs',
    icon: Rocket,
    color: '#60A5FA',
    borderColor: 'rgba(96,165,250,0.25)',
    bgColor: 'rgba(96,165,250,0.08)',
  },
  {
    value: '3+ Yrs',
    label: 'Professional Experience',
    sublabel: 'Web & AI Product Engineering',
    icon: Code,
    color: '#A78BFA',
    borderColor: 'rgba(167,139,250,0.25)',
    bgColor: 'rgba(167,139,250,0.08)',
  },
  {
    value: '100%',
    label: 'Client Satisfaction Rate',
    sublabel: 'On-time Delivery & Clean Code',
    icon: ShieldCheck,
    color: '#34D399',
    borderColor: 'rgba(52,211,153,0.25)',
    bgColor: 'rgba(52,211,153,0.08)',
  },
  {
    value: '<100ms',
    label: 'Avg Performance Latency',
    sublabel: 'Optimized Vitals & WebSockets',
    icon: Zap,
    color: '#FBBF24',
    borderColor: 'rgba(251,191,36,0.25)',
    bgColor: 'rgba(251,191,36,0.08)',
  },
]

export const CreativeStatsBar = () => {
  return (
    <section className="relative py-12 bg-background border-b border-white/5 overflow-hidden" aria-label="Key Performance Indicators">
      {/* Background glow lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.2) 0%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS_DATA.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: APPLE_EASE, delay: index * 0.1 }}
                className="group relative p-5 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/8 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex items-center gap-4 shadow-lg hover:-translate-y-1"
              >
                {/* Glowing Icon Wrapper */}
                <div
                  className="size-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: stat.bgColor, border: `1px solid ${stat.borderColor}` }}
                >
                  <Icon className="size-6 transition-transform group-hover:rotate-6" style={{ color: stat.color }} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <span
                    className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-none mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-heading font-bold text-xs text-white leading-snug">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    {stat.sublabel}
                  </span>
                </div>

                {/* Decorative corner accent */}
                <div
                  className="absolute top-2 right-2 size-1.5 rounded-full opacity-60 group-hover:scale-125 transition-transform"
                  style={{ background: stat.color }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
