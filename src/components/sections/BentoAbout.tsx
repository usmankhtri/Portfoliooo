import { useState, useEffect } from 'react'
import { APPLE_EASE } from '../../lib/utils'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Clock, Code2 } from 'lucide-react'
import { SpotlightCard } from '../ui/SpotlightCard'
import { TechBadge } from '../ui/TechBadge'
import { portfolioData } from '../../data/portfolioData'

const { about } = portfolioData

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: APPLE_EASE } },
}

const LiveClock = () => {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const timeStr = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
  return <p className="font-mono text-xl font-bold text-primary-light tracking-widest">{timeStr}</p>
}

export const BentoAbout = () => {
  return (
    <section className="py-24 bg-background cv-auto" aria-label="About section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-3">About Me</p>
          <h2
            className="font-heading font-bold tracking-tighter text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Engineer by craft.
            <br />
            <span className="text-gradient">Designer by instinct.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          {/* Bio card — spans 2 cols */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <SpotlightCard className="h-full p-8">
              <div className="flex flex-col h-full gap-5">
                <div className="flex items-center gap-3">
                  <div
                    className="size-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}
                  >
                    <Code2 className="size-5 text-primary-light" />
                  </div>
                  <p className="text-xs tracking-widest uppercase text-zinc-500 font-heading">Bio</p>
                </div>

                <blockquote className="text-zinc-300 leading-relaxed text-base flex-1">
                  {about.bio}
                </blockquote>

                <div
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl self-start"
                  style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}
                >
                  <span className="font-display text-2xl tracking-wide text-primary-light">"</span>
                  <p className="text-sm font-semibold font-heading text-white italic">{about.philosophy}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Photo card */}
          <motion.div variants={itemVariants} className="row-span-2">
            <SpotlightCard className="h-full overflow-hidden relative min-h-[360px]">
              <img
                src="/3potrait.png"
                alt="Usman Khatri — focused and precise"
                className="w-full h-full object-cover object-center absolute inset-0"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.9) 0%, rgba(6,12,26,0.2) 60%, transparent 100%)' }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs tracking-widest uppercase text-zinc-500 font-heading mb-1">Vision</p>
                <p className="text-white font-heading font-bold text-lg leading-snug">
                  Precision in every<br />pixel and function.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Location + time */}
          <motion.div variants={itemVariants}>
            <SpotlightCard className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <MapPin className="size-4 text-primary-light" />
                  <p className="text-xs tracking-widest uppercase font-heading">Location</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-xl">{about.location}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="size-3.5 text-zinc-600" />
                    <p className="text-sm text-zinc-500">{about.timezone}</p>
                  </div>
                </div>
                <LiveClock />
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Stats Card — Creative, interactive metrics grid */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <SpotlightCard className="p-6 h-full flex flex-col justify-between relative overflow-hidden group">
              <div
                className="absolute -right-8 -top-8 size-32 rounded-full pointer-events-none opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(37,99,235,0.8) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />
              <p className="text-xs tracking-widest uppercase text-zinc-400 font-heading mb-4 flex items-center justify-between">
                <span>Impact & Metrics</span>
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              </p>

              <div className="grid grid-cols-2 gap-3.5 my-auto">
                <div className="p-3.5 rounded-xl bg-card/60 border border-white/6 hover:border-primary/40 hover:bg-card/90 transition-all duration-300">
                  <p className="font-display text-2xl sm:text-3xl text-gradient font-bold">12+</p>
                  <p className="text-[10px] tracking-wider text-zinc-400 uppercase font-heading font-semibold mt-0.5">Projects Shipped</p>
                </div>

                <div className="p-3.5 rounded-xl bg-card/60 border border-white/6 hover:border-primary/40 hover:bg-card/90 transition-all duration-300">
                  <p className="font-display text-2xl sm:text-3xl text-primary-light font-bold">3+ Yrs</p>
                  <p className="text-[10px] tracking-wider text-zinc-400 uppercase font-heading font-semibold mt-0.5">Experience</p>
                </div>

                <div className="p-3.5 rounded-xl bg-card/60 border border-white/6 hover:border-primary/40 hover:bg-card/90 transition-all duration-300">
                  <p className="font-display text-2xl sm:text-3xl text-emerald-400 font-bold">100%</p>
                  <p className="text-[10px] tracking-wider text-zinc-400 uppercase font-heading font-semibold mt-0.5">Satisfaction</p>
                </div>

                <div className="p-3.5 rounded-xl bg-card/60 border border-white/6 hover:border-primary/40 hover:bg-card/90 transition-all duration-300">
                  <p className="font-display text-2xl sm:text-3xl text-purple-400 font-bold">25k+</p>
                  <p className="text-[10px] tracking-wider text-zinc-400 uppercase font-heading font-semibold mt-0.5">Lines of Code</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="font-mono">MERN + Next.js + AI</span>
                <span className="text-emerald-400 font-medium">Available</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
            <SpotlightCard className="p-6">
              <p className="text-xs tracking-[0.35em] uppercase text-zinc-500 font-heading mb-4">Tech Arsenal</p>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill, i) => (
                  <TechBadge key={skill} label={skill} index={i} />
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* CTA card */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
            <Link to="/about" className="block group">
              <div
                className="p-6 rounded-2xl border border-primary/15 hover:border-primary/35 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.02) 100%)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-white text-lg mb-1">Learn more about me</p>
                    <p className="text-zinc-500 text-sm">Full story, process, and philosophy →</p>
                  </div>
                  <div
                    className="size-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/20"
                    style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
                  >
                    <ArrowUpRight className="size-5 text-primary-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
