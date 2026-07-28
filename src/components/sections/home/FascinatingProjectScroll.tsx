import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'
import { APPLE_EASE, useIsDesktop } from '../../../lib/utils'
import { portfolioData } from '../../../data/portfolioData'

const projects = portfolioData.projects

export const FascinatingProjectScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={containerRef} className="relative bg-background py-10 sm:py-16" aria-label="Featured projects">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(6,12,26,0) 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 mb-2.5"
          >
            <Sparkles className="size-3 text-primary-light" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-primary-light font-heading">
              Selected Works
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: APPLE_EASE }}
            className="font-heading font-extrabold tracking-tight text-white text-2xl sm:text-4xl md:text-5xl"
          >
            Featured Projects <span className="text-gradient">& Case Studies</span>
          </motion.h2>
        </div>

        <Link
          to="/works"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white hover:border-white/20 transition-all font-heading font-semibold shrink-0"
        >
          <span>All Projects ({projects.length}+)</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Desktop Stacked Card Scroll Experience vs Mobile Responsive Layout */}
      {isDesktop ? (
        <div className="relative" style={{ height: `${projects.length * 55}vh` }}>
          {projects.map((project, i) => (
            <DesktopStackedCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6">
          {projects.map((project, i) => (
            <MobileProjectCard key={project.id} project={project} index={i} total={projects.length} />
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-10 sm:mt-12 text-center">
        <Link
          to="/works"
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-semibold text-xs sm:text-sm text-white font-heading bg-primary/20 border border-primary/40 hover:bg-primary/30 transition-all shadow-lg hover:scale-[1.02]"
        >
          <span>Explore Detailed Architecture & Case Studies</span>
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}

interface DesktopStackedCardProps {
  project: (typeof projects)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}

const DesktopStackedCard = ({ project, index, total, scrollYProgress }: DesktopStackedCardProps) => {
  const cardStart = index / total
  const cardEnd = (index + 1) / total

  // Scale down smoothly as next card covers it
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    index === total - 1 ? [1, 1] : [1, 0.94]
  )

  // Darkening overlay as next card slides on top
  const overlayOpacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    index === total - 1 ? [0, 0] : [0, 0.4]
  )

  const topOffset = 85 + index * 18

  return (
    <motion.div
      style={{
        scale,
        top: `${topOffset}px`,
      }}
      className="sticky w-full max-w-7xl mx-auto px-6 lg:px-12 mb-8"
    >
      <div
        className="relative w-full rounded-3xl overflow-hidden group/card transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, rgba(13,25,48,0.92) 0%, rgba(6,12,26,0.98) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.1)',
        }}
      >
        {/* Darkening depth overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-30 transition-opacity"
        />

        <div className="grid grid-cols-12 min-h-[420px] lg:min-h-[460px]">
          {/* Left Content (5 cols) */}
          <div className="col-span-5 p-7 lg:p-9 flex flex-col justify-between relative z-10">
            <div>
              {/* Category Badge & Index */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full font-heading"
                    style={{
                      background: `${project.color}18`,
                      color: project.color,
                      border: `1px solid ${project.color}35`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{project.year}</span>
                </div>

                <span className="font-mono text-xs font-bold text-zinc-500">
                  0{index + 1} / 0{total}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold tracking-tight text-white mb-3 text-2xl lg:text-3xl">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-300 text-xs lg:text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Key Results / Metrics */}
              <div className="flex items-center gap-3 mb-5">
                {project.results?.slice(0, 2).map((res, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-[11px]">
                    <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                    <span className="text-zinc-400 font-mono">{res.label}:</span>
                    <span className="text-white font-bold font-mono">{res.value}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-0.5 rounded-md text-zinc-300 font-heading font-medium bg-white/5 border border-white/8"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-3 border-t border-white/8">
              <Link
                to={`/works/${project.id}`}
                className="group/btn px-4 py-2 rounded-full font-semibold text-xs text-white font-heading flex items-center gap-2 bg-primary hover:bg-primary-dark transition-all shadow-md"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="size-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 font-heading"
                >
                  <ExternalLink className="size-3.5" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Mockup Display (7 cols) */}
          <div className="col-span-7 relative overflow-hidden flex flex-col bg-slate-950/60 border-l border-white/8">
            {/* Browser Mockup Top Bar */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/8 flex items-center justify-between z-20">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-yellow-500/80" />
                <span className="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-black/50 border border-white/6 text-[10px] text-zinc-400 font-mono truncate max-w-[220px]">
                {project.live ? project.live.replace('https://', '') : `https://${project.id}.app`}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live</span>
              </div>
            </div>

            {/* Project Image Frame */}
            <div className="relative flex-1 overflow-hidden group/img">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                loading="eager"
              />

              {/* Gradient edge overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(13,25,48,0.8) 0%, transparent 40%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const MobileProjectCard = ({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0]
  index: number
  total: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: APPLE_EASE }}
      className="rounded-2xl overflow-hidden bg-card/60 border border-white/10 backdrop-blur-xl p-4 flex flex-col gap-3.5"
    >
      <div className="relative h-44 w-full rounded-xl overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-primary-light border border-primary/30">
          {project.category}
        </div>
        <div className="absolute top-2.5 right-2.5 text-[10px] font-mono text-zinc-400 bg-black/70 px-2 py-0.5 rounded">
          0{index + 1} / 0{total}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-white text-lg mb-1.5">{project.title}</h3>
        <p className="text-zinc-400 text-xs leading-relaxed mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-300">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to={`/works/${project.id}`}
            className="flex-1 text-center py-2 rounded-xl font-heading text-xs font-semibold bg-primary text-white flex items-center justify-center gap-1.5"
          >
            <span>Case Study</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-white/10 text-zinc-300 hover:text-white"
            >
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
