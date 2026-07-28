import React, { useState } from 'react'
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
  SiRedux,
  SiFramer,
  SiHtml5,
  SiCss,
} from 'react-icons/si'
import { Layers, Cpu, Database, Wrench, Sparkles } from 'lucide-react'

interface TechItem {
  name: string
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools & Cloud'
  icon: React.ElementType
  color: string
  level: string
}

const TECH_ITEMS: TechItem[] = [
  { name: 'TypeScript', category: 'Frontend', icon: SiTypescript, color: '#3178C6', level: 'Primary' },
  { name: 'React 19', category: 'Frontend', icon: SiReact, color: '#61DAFB', level: 'Expert' },
  { name: 'Next.js 15', category: 'Frontend', icon: SiNextdotjs, color: '#FFFFFF', level: 'Advanced' },
  { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: '#5FA04E', level: 'Expert' },
  { name: 'Express.js', category: 'Backend', icon: SiExpress, color: '#E0E0E0', level: 'Advanced' },
  { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#47A248', level: 'Expert' },
  { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql, color: '#4169E1', level: 'Advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4', level: 'Expert' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', icon: SiJavascript, color: '#F7DF1E', level: 'Primary' },
  { name: 'Python', category: 'Backend', icon: SiPython, color: '#3776AB', level: 'Proficient' },
  { name: 'Docker', category: 'Tools & Cloud', icon: SiDocker, color: '#2496ED', level: 'Intermediate' },
  { name: 'GraphQL', category: 'Backend', icon: SiGraphql, color: '#E10098', level: 'Advanced' },
  { name: 'Redis', category: 'Database', icon: SiRedis, color: '#DC382D', level: 'Advanced' },
  { name: 'Framer Motion', category: 'Frontend', icon: SiFramer, color: '#0055FF', level: 'Expert' },
  { name: 'Vite', category: 'Tools & Cloud', icon: SiVite, color: '#646CFF', level: 'Advanced' },
  { name: 'Git & GitHub', category: 'Tools & Cloud', icon: SiGit, color: '#F05032', level: 'Expert' },
  { name: 'HTML5', category: 'Frontend', icon: SiHtml5, color: '#E34F26', level: 'Core' },
  { name: 'CSS3', category: 'Frontend', icon: SiCss, color: '#1572B6', level: 'Core' },
  { name: 'Redux Toolkit', category: 'Frontend', icon: SiRedux, color: '#764ABC', level: 'Proficient' },
  { name: 'AI Workflows (Gemini API)', category: 'Tools & Cloud', icon: Sparkles, color: '#60A5FA', level: 'Integration' },
]

const ROW1_ITEMS = TECH_ITEMS.slice(0, 10)
const ROW2_ITEMS = TECH_ITEMS.slice(10)

const CATEGORIES = [
  {
    name: 'Frontend & UI',
    icon: Layers,
    description: 'Component-driven, pixel-perfect, accessible Web Apps & PWAs',
    techs: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit', 'Vite'],
  },
  {
    name: 'Backend & APIs',
    icon: Cpu,
    description: 'Scalable RESTful & GraphQL web services and microservices',
    techs: ['Node.js', 'Express.js', 'Python', 'GraphQL', 'REST Architecture'],
  },
  {
    name: 'Databases & Caching',
    icon: Database,
    description: 'Relational & NoSQL persistence with high-throughput query caching',
    techs: ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose', 'Prisma ORM'],
  },
  {
    name: 'DevOps, AI & Tooling',
    icon: Wrench,
    description: 'Modern workflow automation, containerization & AI model integrations',
    techs: ['Docker', 'Git & GitHub', 'OpenAI / Gemini API', 'PWA Engineering', 'CI/CD Pipelines'],
  },
]

export const TechStackSection = () => {
  const [activeTab, setActiveTab] = useState<string>('All')

  const filteredItems = activeTab === 'All' ? TECH_ITEMS : TECH_ITEMS.filter((i) => i.category === activeTab)

  return (
    <section className="relative py-20 bg-background overflow-hidden border-b border-white/5" aria-label="Frameworks and Tech Stack">
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.25) 0%, rgba(6,12,26,0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 mb-4">
            <span className="size-1.5 rounded-full bg-primary-light animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-light font-heading">
              Frameworks & Arsenal
            </span>
          </div>

          <h2
            className="font-heading font-extrabold tracking-tighter text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            Engineering with <span className="text-gradient">Modern Tech Stack.</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Crafting resilient digital products powered by battle-tested frameworks, typed languages, and high-performance cloud tooling.
          </p>
        </motion.div>
      </div>

      {/* Dual Animated Infinite Marquee Rows with Icons */}
      <div className="relative w-full space-y-4 my-8 overflow-hidden py-2" aria-hidden="true">
        {/* Row 1 - Left Marquee */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex items-center gap-4 shrink-0 min-w-full animate-marquee group-hover:[animation-play-state:paused]">
            {ROW1_ITEMS.concat(ROW1_ITEMS).map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={`row1-${idx}-${item.name}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/60 backdrop-blur-md border border-white/8 hover:border-primary/40 hover:bg-card/90 transition-all duration-300 shadow-sm shrink-0 cursor-default"
                >
                  <div
                    className="size-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="size-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white font-heading whitespace-nowrap">{item.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Row 2 - Right Marquee */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex items-center gap-4 shrink-0 min-w-full animate-marquee-reverse group-hover:[animation-play-state:paused]">
            {ROW2_ITEMS.concat(ROW2_ITEMS).map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={`row2-${idx}-${item.name}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/60 backdrop-blur-md border border-white/8 hover:border-primary/40 hover:bg-card/90 transition-all duration-300 shadow-sm shrink-0 cursor-default"
                >
                  <div
                    className="size-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="size-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white font-heading whitespace-nowrap">{item.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Gradient Edge Blurs */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Categorized Interactive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 relative z-10">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['All', 'Frontend', 'Backend', 'Database', 'Tools & Cloud'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-heading transition-all duration-200 ${
                activeTab === category
                  ? 'bg-primary text-white shadow-md shadow-primary/25 border border-primary-light/30'
                  : 'bg-card/50 text-zinc-400 border border-white/5 hover:border-white/15 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filtered Icon Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group p-4 rounded-2xl bg-card/40 border border-white/6 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex flex-col items-center text-center gap-2.5 relative overflow-hidden"
              >
                <div
                  className="size-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  <Icon className="size-6 transition-transform group-hover:rotate-6" style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-heading">{item.name}</h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.category}</p>
                </div>
                <span
                  className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded-full font-mono text-zinc-400 bg-white/5 border border-white/5"
                >
                  {item.level}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* 4 Pillars Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: APPLE_EASE }}
                className="p-5 rounded-2xl bg-card/30 border border-white/6 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-sm">{cat.name}</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{cat.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {cat.techs.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium text-zinc-300 bg-white/5 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
