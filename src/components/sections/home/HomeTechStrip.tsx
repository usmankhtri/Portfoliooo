import React from 'react'
import { motion } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiGraphql,
  SiPython,
  SiGit,
  SiRedis,
  SiVite,
  SiFramer,
  SiRedux,
  SiHtml5,
} from 'react-icons/si'

interface TechBadgeItem {
  name: string
  icon: React.ElementType
  color: string
  tag: string
}

const TECH_LIST: TechBadgeItem[] = [
  { name: 'React 19', icon: SiReact, color: '#61DAFB', tag: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', tag: 'Language' },
  { name: 'Next.js 15', icon: SiNextdotjs, color: '#FFFFFF', tag: 'Framework' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', tag: 'Runtime' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', tag: 'Styling' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', tag: 'Database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', tag: 'Database' },
  { name: 'Express.js', icon: SiExpress, color: '#E0E0E0', tag: 'Backend' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', tag: 'Language' },
  { name: 'Python', icon: SiPython, color: '#3776AB', tag: 'Language' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', tag: 'DevOps' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', tag: 'API' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D', tag: 'Caching' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF', tag: 'Animation' },
  { name: 'Vite', icon: SiVite, color: '#646CFF', tag: 'Tooling' },
  { name: 'Git & GitHub', icon: SiGit, color: '#F05032', tag: 'Version Control' },
  { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC', tag: 'State' },
  { name: 'HTML5 & CSS3', icon: SiHtml5, color: '#E34F26', tag: 'Core Web' },
]

const ROW1 = TECH_LIST.slice(0, 9)
const ROW2 = TECH_LIST.slice(9)

export const HomeTechStrip = () => {
  return (
    <section className="relative py-14 sm:py-16 bg-background overflow-hidden border-b border-white/5" aria-label="Frameworks & Languages">
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.3) 0%, rgba(6,12,26,0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 mb-8 sm:mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 mb-3">
            <span className="size-1.5 rounded-full bg-primary-light animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-primary-light font-heading">
              Frameworks & Languages
            </span>
          </div>

          <h2 className="font-heading font-extrabold tracking-tight text-white text-2xl sm:text-3xl md:text-4xl">
            Powering Digital Products with <span className="text-gradient">Modern Tech</span>
          </h2>
        </motion.div>
      </div>

      {/* Animated Infinite Marquee Rows */}
      <div className="relative w-full space-y-3.5 overflow-hidden py-1" aria-hidden="true">
        {/* Row 1 - Left Marquee */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex items-center gap-3.5 shrink-0 min-w-full animate-marquee group-hover:[animation-play-state:paused]">
            {ROW1.concat(ROW1).map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={`row1-${idx}-${item.name}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-card/60 backdrop-blur-md border border-white/8 hover:border-primary/40 hover:bg-card/90 transition-all duration-300 shadow-sm shrink-0 cursor-default"
                >
                  <div
                    className="size-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="size-3.5" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-bold text-white font-heading whitespace-nowrap">{item.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded text-zinc-400 bg-white/5 border border-white/5 font-mono">
                    {item.tag}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Row 2 - Right Marquee */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex items-center gap-3.5 shrink-0 min-w-full animate-marquee-reverse group-hover:[animation-play-state:paused]">
            {ROW2.concat(ROW2).map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={`row2-${idx}-${item.name}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-card/60 backdrop-blur-md border border-white/8 hover:border-primary/40 hover:bg-card/90 transition-all duration-300 shadow-sm shrink-0 cursor-default"
                >
                  <div
                    className="size-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="size-3.5" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-bold text-white font-heading whitespace-nowrap">{item.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded text-zinc-400 bg-white/5 border border-white/5 font-mono">
                    {item.tag}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Side Edge Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
