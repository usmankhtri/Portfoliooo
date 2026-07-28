import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { APPLE_EASE } from '../lib/utils'
import { SEO } from '../components/SEO'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { portfolioData } from '../data/portfolioData'
import { TechStackSection } from '../components/sections/home/TechStackSection'
import { Mail } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'

const { about } = portfolioData

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

const timelineItems = [
  { year: '2022', title: 'Started MERN Stack Journey', desc: 'Dove deep into full-stack development, building production apps with React and Node.' },
  { year: '2023', title: 'First Freelance Clients', desc: 'Delivered multiple client projects, mastering TypeScript, Tailwind, and modern architecture patterns.' },
  { year: '2024', title: 'Launched KindaHabit', desc: 'Built and shipped a gamified SaaS habit tracker with real-time sync, social streaks, and AI-generated motivation.' },
  { year: '2025', title: 'Focused on AI Integration', desc: 'Expanding expertise in LLM integration, AI prompt engineering, and agent-based architectures.' },
]

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Usman Khatri',
  url: 'https://usmankhatri.dev',
  image: 'https://usmankhatri.dev/usman.png',
  jobTitle: 'Full-Stack Architect',
  description: about.bio,
  email: `mailto:${about.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'PK',
  },
  sameAs: [about.github],
  knowsAbout: about.skills,
}

export const About = () => {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Usman Khatri — Full-Stack Architect, MERN specialist, and AI workflow designer based in Hyderabad, Pakistan."
        url="/about"
        jsonLd={personJsonLd}
      />

      <main className="min-h-screen pt-16 sm:pt-20 pb-16">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="pt-10 sm:pt-16 mb-12 sm:mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-3 sm:mb-4"
            >
              About Me
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="font-heading font-extrabold tracking-tighter text-white"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}
            >
              Usman Khatri
              <br />
              <span className="text-gradient block mt-1" style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.5rem)' }}>
                Full-Stack Architect & Engineer
              </span>
            </motion.h1>
          </div>

          {/* Two-column: photo + bio */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 mb-16 sm:mb-24 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: APPLE_EASE }}
              className="lg:col-span-2 max-w-sm sm:max-w-md mx-auto lg:max-w-none w-full"
            >
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(37,99,235,0.2)', boxShadow: '0 0 60px rgba(37,99,235,0.12), 0 32px 60px rgba(6,12,26,0.6)' }}
              >
                <img
                  src="/usman.png"
                  alt="Usman Khatri"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '3/4' }}
                  loading="eager"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.95) 0%, transparent 100%)' }}
                />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-emerald-400 font-heading tracking-widest uppercase">Available for hire</span>
                </div>
              </div>
            </motion.div>

            {/* Bio content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: APPLE_EASE, delay: 0.1 }}
              className="lg:col-span-3 flex flex-col gap-6 sm:gap-8"
            >
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>{about.bio}</p>
                <blockquote className="border-l-2 border-primary/50 pl-4 sm:pl-5 italic text-zinc-400 text-xs sm:text-sm">
                  "{about.philosophy}"
                </blockquote>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {[
                  { label: 'Email', href: `mailto:${about.email}`, icon: Mail },
                  { label: 'GitHub', href: about.github, icon: FiGithub },
                ].map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium font-heading text-zinc-300 hover:text-white transition-all"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}
                  >
                    <Icon className="size-4 text-primary-light" />
                    {label}
                  </a>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-3 sm:gap-4">
                {about.stats.map((stat) => (
                  <SpotlightCard key={stat.label} className="p-4 sm:p-5 text-center">
                    <p className="font-display text-2xl sm:text-4xl text-gradient-blue mb-0.5 sm:mb-1">{stat.value}</p>
                    <p className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wide font-heading">{stat.label}</p>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Timeline — pinned scroll-scrubbed scene on desktop */}
          <TimelineScene />
        </div>

        {/* Detailed Tech Stack Arsenal */}
        <TechStackSection />
      </main>
    </>
  )
}

const TimelineScene = () => {
  const isDesktop = useIsDesktop()
  if (!isDesktop) {
    return <TimelineMobile />
  }
  return <TimelineDesktop />
}

const TimelineMobile = () => {
  return (
    <div className="mb-16 sm:mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading font-bold text-white text-xl sm:text-2xl tracking-tight mb-8 sm:mb-12"
      >
        Journey
      </motion.h2>
      <div className="relative pl-5 sm:pl-6 border-l border-primary/20 space-y-8 sm:space-y-12">
        {timelineItems.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: APPLE_EASE }}
            className="relative"
          >
            <div
              className="absolute -left-[25px] sm:-left-[29px] top-1 size-2.5 sm:size-3 rounded-full border-2 border-primary"
              style={{ background: '#060C1A', boxShadow: '0 0 8px rgba(37,99,235,0.6)' }}
            />
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6">
              <span className="font-display text-xl sm:text-2xl text-primary-light flex-shrink-0 leading-none pt-0.5">{item.year}</span>
              <div>
                <h3 className="font-heading font-bold text-white text-base sm:text-lg mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const TimelineDesktop = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const lineScale = useTransform(scrollYProgress, [0.05, 0.9], [0, 1])

  return (
    <section ref={containerRef} className="relative mb-24" style={{ height: `${timelineItems.length * 50}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <h2 className="font-heading font-bold text-white text-2xl tracking-tight mb-12">Journey</h2>
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            className="absolute left-0 top-0 w-px bg-primary origin-top"
            style={{ scaleY: lineScale, height: '100%', boxShadow: '0 0 8px rgba(37,99,235,0.6)' }}
          />
          <div className="space-y-8">
            {timelineItems.map((item, i) => {
              const start = 0.05 + (i / timelineItems.length) * 0.85
              const end = start + 0.85 / timelineItems.length
              return (
                <ScrubbedTimelineItem
                  key={item.year}
                  item={item}
                  scrollYProgress={scrollYProgress}
                  rangeStart={start}
                  rangeEnd={end}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ScrubbedTimelineItemProps {
  item: (typeof timelineItems)[number]
  scrollYProgress: MotionValue<number>
  rangeStart: number
  rangeEnd: number
}

const ScrubbedTimelineItem = ({ item, scrollYProgress, rangeStart, rangeEnd }: ScrubbedTimelineItemProps) => {
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.25, 1])
  const x = useTransform(scrollYProgress, [rangeStart, rangeEnd], [-16, 0])

  return (
    <motion.div style={{ opacity, x }} className="relative">
      <div
        className="absolute -left-[29px] top-1 size-3 rounded-full border-2 border-primary"
        style={{ background: '#060C1A', boxShadow: '0 0 8px rgba(37,99,235,0.6)' }}
      />
      <div className="flex items-start gap-6">
        <span className="font-display text-2xl text-primary-light flex-shrink-0 leading-none pt-0.5">{item.year}</span>
        <div>
          <h3 className="font-heading font-bold text-white text-lg mb-1">{item.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}
