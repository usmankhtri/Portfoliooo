import { useState } from 'react'
import { APPLE_EASE } from '../lib/utils'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { SEO } from '../components/SEO'
import { portfolioData } from '../data/portfolioData'
import { TechBadge } from '../components/ui/TechBadge'

const { projects } = portfolioData

export const Works = () => {
  const [hovered, setHovered] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <>
      <SEO
        title="Works"
        description="Selected projects by Usman Khatri — full-stack web apps, SaaS platforms, and AI-powered experiences."
        url="/works"
      />

      <main className="min-h-screen pt-16 sm:pt-20 pb-16">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="pt-10 sm:pt-16 mb-12 sm:mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-3 sm:mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="font-heading font-extrabold tracking-tighter text-white"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}
            >
              Built with intent.<br />
              <span className="text-gradient">Shipped with care.</span>
            </motion.h1>
          </div>

          {/* Project list */}
          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: APPLE_EASE }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(`/works/${project.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/works/${project.id}`)
                  }}
                  aria-label={`View case study: ${project.title}`}
                  className="relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  style={{
                    background: 'rgba(10,23,40,0.6)',
                    border: `1px solid ${hovered === project.id ? `${project.color}30` : 'rgba(255,255,255,0.05)'}`,
                    boxShadow: hovered === project.id ? `0 0 60px ${project.color}15` : 'none',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 min-h-[260px] sm:min-h-[280px]">
                    {/* Image */}
                    <div className="relative overflow-hidden md:order-last h-44 sm:h-56 md:h-auto">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        animate={{ scale: hovered === project.id ? 1.06 : 1 }}
                        transition={{ duration: 0.7, ease: APPLE_EASE }}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,23,40,1) 0%, transparent 60%)' }} />
                      {/* Number */}
                      <div
                        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 font-display text-5xl sm:text-7xl leading-none select-none pointer-events-none"
                        style={{ color: `${project.color}20` }}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 p-5 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3 sm:mb-5">
                          <span
                            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-heading"
                            style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}
                          >
                            {project.category}
                          </span>
                          <span className="text-xs text-zinc-600 font-mono">{project.year}</span>
                        </div>

                        <h2
                          className="font-heading font-bold tracking-tight text-white mb-2 sm:mb-3"
                          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)' }}
                        >
                          {project.title}
                        </h2>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 max-w-md">{project.description}</p>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                          {project.tech.map((t, ti) => (
                            <TechBadge key={t} label={t} index={ti} />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-white/5 sm:border-0">
                        <Link
                          to={`/works/${project.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white font-heading group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                        >
                          Case Study
                          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                            aria-label={`${project.title} GitHub`}
                          >
                            <FiGithub className="size-4" />
                            <span>Source</span>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                            aria-label={`${project.title} live site`}
                          >
                            <ExternalLink className="size-4" />
                            <span>Live</span>
                          </a>
                        )}
                        <div className="text-[11px] sm:text-xs font-mono text-zinc-600 sm:ml-auto w-full sm:w-auto mt-1 sm:mt-0">
                          {project.role} · {project.timeline}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
