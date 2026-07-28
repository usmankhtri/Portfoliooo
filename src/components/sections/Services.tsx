import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { APPLE_EASE } from '../../lib/utils'
import { Code2, Smartphone, Sparkles, Database, Layers, Cpu } from 'lucide-react'
import { SpotlightCard } from '../ui/SpotlightCard'
import { portfolioData } from '../../data/portfolioData'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2, Smartphone, Sparkles, Database, Layers, Cpu,
}

const { services } = portfolioData

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

export const Services = () => {
  const isDesktop = useIsDesktop()
  if (!isDesktop) {
    return <ServicesMobile />
  }
  return <ServicesDesktop />
}

const ServicesMobile = () => {
  return (
    <section className="py-24 bg-background" aria-label="Services section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="mb-14 text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-3">What I Do</p>
          <h2
            className="font-heading font-bold tracking-tighter text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Services built for<br />
            <span className="text-gradient">ambitious products.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: APPLE_EASE }}
              >
                <ServiceCardContent
                  title={service.title}
                  description={service.description}
                  highlight={service.highlight}
                  Icon={Icon}
                  index={i}
                  total={services.length}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const ServicesDesktop = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.35])
  const titleY = useTransform(scrollYProgress, [0, 0.12], [0, -20])

  return (
    <section ref={containerRef} className="relative bg-background" aria-label="Services section" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="mb-10 sm:mb-14 text-center"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-3">What I Do</p>
            <h2
              className="font-heading font-bold tracking-tighter text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Services built for<br />
              <span className="text-gradient">ambitious products.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code2
              // Each card claims a slice of the pin's scroll progress, so
              // cards materialize one after another as the user scrolls
              // through the pinned section — scrubbed, not time-triggered.
              const start = 0.15 + (i / services.length) * 0.7
              const end = start + 0.7 / services.length
              return (
                <ScrubbedServiceCard
                  key={service.title}
                  index={i}
                  total={services.length}
                  title={service.title}
                  description={service.description}
                  highlight={service.highlight}
                  Icon={Icon}
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

interface ServiceCardContentProps {
  title: string
  description: string
  highlight: string
  Icon: React.FC<{ className?: string }>
  index: number
  total: number
}

const ServiceCardContent = ({ title, description, highlight, Icon, index, total }: ServiceCardContentProps) => (
  <SpotlightCard className="p-7 h-full flex flex-col gap-5">
    <div className="flex items-start justify-between">
      <div
        className="size-11 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
      >
        <Icon className="size-5 text-primary-light" />
      </div>
      <span
        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full font-heading"
        style={{ background: 'rgba(37,99,235,0.08)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.15)' }}
      >
        {highlight}
      </span>
    </div>

    <div>
      <h3 className="font-heading font-bold text-white text-lg mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>

    <div className="mt-auto pt-4 border-t border-white/5">
      <span className="font-mono text-[10px] text-zinc-600">0{index + 1} / 0{total}</span>
    </div>
  </SpotlightCard>
)

interface ScrubbedServiceCardProps {
  index: number
  total: number
  title: string
  description: string
  highlight: string
  Icon: React.FC<{ className?: string }>
  scrollYProgress: MotionValue<number>
  rangeStart: number
  rangeEnd: number
}

const ScrubbedServiceCard = ({
  index, total, title, description, highlight, Icon, scrollYProgress, rangeStart, rangeEnd,
}: ScrubbedServiceCardProps) => {
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0, 1])
  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [32, 0])
  const scale = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.94, 1])

  return (
    <motion.div style={{ opacity, y, scale }}>
      <ServiceCardContent title={title} description={description} highlight={highlight} Icon={Icon} index={index} total={total} />
    </motion.div>
  )
}
