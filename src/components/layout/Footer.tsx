import { Link } from 'react-router-dom'
import { ArrowUp, Mail, MapPin, Sparkles, ArrowUpRight } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { portfolioData } from '../../data/portfolioData'

const { about } = portfolioData

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative bg-[#030712] text-zinc-400 border-t border-white/10 overflow-hidden"
      style={{ paddingBottom: 'max(3rem, calc(var(--safe-bottom) + 2rem))' }}
      aria-label="Site Footer"
    >
      {/* Background Glow Effect */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/8">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex items-center justify-center size-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-white font-extrabold text-sm shadow-[0_0_16px_rgba(37,99,235,0.5)] border border-blue-400/40">
                UK
              </div>
              <span className="text-base font-bold text-white font-heading group-hover:text-primary-light transition-colors">
                Usman Khatri
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Full-Stack MERN Developer &amp; PWA Engineer specializing in building robust, performant web applications with modern AI workflows.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 w-fit mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 font-heading">
                Available for New Projects
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading mb-1 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary-light" />
              <span>Navigation</span>
            </h4>
            <div className="flex flex-col gap-2 text-xs font-heading">
              <Link to="/" className="hover:text-white transition-colors py-0.5 flex items-center justify-between group">
                <span>Home</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/about" className="hover:text-white transition-colors py-0.5 flex items-center justify-between group">
                <span>About Me</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/works" className="hover:text-white transition-colors py-0.5 flex items-center justify-between group">
                <span>Selected Works</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/services" className="hover:text-white transition-colors py-0.5 flex items-center justify-between group">
                <span>Services &amp; Pricing</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors py-0.5 flex items-center justify-between group">
                <span>Contact &amp; Book Call</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Column 3: Specialized Capabilities (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading mb-1">
              Capabilities
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li className="text-zinc-400 flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary-light" />
                <span>MERN Full-Stack Engineering</span>
              </li>
              <li className="text-zinc-400 flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary-light" />
                <span>Progressive Web Apps (PWAs)</span>
              </li>
              <li className="text-zinc-400 flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary-light" />
                <span>AI &amp; LLM Workflow Integrations</span>
              </li>
              <li className="text-zinc-400 flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary-light" />
                <span>API Design &amp; Performance Audit</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading mb-1">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a
                href={`mailto:${about.email}`}
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors font-mono"
              >
                <Mail className="size-3.5 text-primary-light shrink-0" />
                <span className="truncate">{about.email}</span>
              </a>

              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                <FiGithub className="size-3.5 text-primary-light shrink-0" />
                <span>GitHub Profile</span>
              </a>

              <div className="flex items-center gap-2 text-zinc-500 text-xs mt-1">
                <MapPin className="size-3.5 shrink-0" />
                <span>Hyderabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-heading">
          <p>© {new Date().getFullYear()} Usman Khatri. All rights reserved.</p>

          <p className="font-mono text-[11px] text-zinc-600">
            Crafted with React 19, TypeScript &amp; Framer Motion
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all font-semibold"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
