import { motion } from 'framer-motion'
import { APPLE_EASE } from '../lib/utils'
import { Code2, Smartphone, Sparkles, Database, Layers, Cpu } from 'lucide-react'
import { SEO } from '../components/SEO'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { Contact } from '../components/sections/Contact'
import { portfolioData } from '../data/portfolioData'
import { Link } from 'react-router-dom'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2, Smartphone, Sparkles, Database, Layers, Cpu,
}

const { services } = portfolioData

const process = [
  { step: '01', title: 'Discover', desc: 'Deep-dive into your goals, users, and technical requirements.' },
  { step: '02', title: 'Architect', desc: 'Design the system structure, API contracts, and UI/UX flow.' },
  { step: '03', title: 'Build', desc: 'Iterative development with weekly demos and fast feedback loops.' },
  { step: '04', title: 'Ship', desc: 'Performance-optimized, accessible, and fully production-ready.' },
]

export const ServicesPage = () => {
  return (
    <>
      <SEO
        title="Services"
        description="Full-Stack development, PWA engineering, AI integration, and motion design services by Usman Khatri."
        url="/services"
      />

      <main className="min-h-screen pt-16 sm:pt-20 pb-0">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="pt-10 sm:pt-16 mb-12 sm:mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-3 sm:mb-4"
            >
              What I Do
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="font-heading font-extrabold tracking-tighter text-white mb-4 sm:mb-6"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}
            >
              Services built for<br />
              <span className="text-gradient">ambitious products.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-zinc-400 max-w-xl leading-relaxed text-sm sm:text-base"
            >
              From architecture to animation, I deliver complete, production-ready digital products that balance engineering precision with exceptional user experience.
            </motion.p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16 sm:mb-28">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code2
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: APPLE_EASE }}
                >
                  <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col gap-5 sm:gap-6">
                    <div
                      className="size-10 sm:size-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
                    >
                      <Icon className="size-5 sm:size-6 text-primary-light" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-heading font-bold text-white text-base sm:text-lg mb-2 sm:mb-3 tracking-tight">{service.title}</h2>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{service.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/5">
                      <span className="font-mono text-[10px] text-zinc-600">0{i + 1}</span>
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full font-heading"
                        style={{ background: 'rgba(37,99,235,0.08)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.15)' }}
                      >
                        {service.highlight}
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              )
            })}
          </div>

          {/* Process */}
          <div className="mb-16 sm:mb-28">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-white mb-8 sm:mb-14 tracking-tight"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
            >
              My Process
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {process.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: APPLE_EASE }}
                >
                  <div
                    className="relative p-5 sm:p-6 rounded-2xl h-full"
                    style={{ background: 'rgba(10,23,40,0.5)', border: '1px solid rgba(37,99,235,0.1)' }}
                  >
                    <div className="font-display text-4xl sm:text-5xl text-primary/20 mb-3 sm:mb-4" aria-hidden>{item.step}</div>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    {i < process.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 z-10 w-6 h-px bg-primary/30" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-28 p-6 sm:p-10 rounded-2xl sm:rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0.04) 100%)',
              border: '1px solid rgba(37,99,235,0.2)',
            }}
          >
            <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-3 sm:mb-4 tracking-tight">Ready to start?</h2>
            <p className="text-zinc-400 text-xs sm:text-sm mb-6 sm:mb-8 max-w-md mx-auto">Let's scope your project and build something remarkable together.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white font-heading text-xs sm:text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>

        {/* Contact section */}
        <Contact />

        <footer
          className="py-8 sm:py-10 text-center border-t"
          style={{ borderColor: 'rgba(37,99,235,0.08)' }}
        >
          <p className="text-xs text-zinc-600 font-heading tracking-widest px-4">
            © {new Date().getFullYear()} Usman Khatri · All rights reserved
          </p>
        </footer>
      </main>
    </>
  )
}
