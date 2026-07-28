import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { Home, User, Briefcase, Sparkles, Mail, ArrowUpRight, Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Works', path: '/works', icon: Briefcase },
  { name: 'Services', path: '/services', icon: Sparkles },
  { name: 'Contact', path: '/contact', icon: Mail },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)

      // Hide navbar when scrolling down past 60px, show when scrolling up
      if (currentY < 60) {
        setVisible(true)
      } else if (currentY > lastY + 8) {
        setVisible(false)
        setMobileMenuOpen(false)
      } else if (currentY < lastY - 8) {
        setVisible(true)
      }

      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-2 sm:top-4 left-0 w-full z-[var(--z-navbar)] flex justify-center px-2 xs:px-4 sm:px-6 pointer-events-none">
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'pointer-events-auto w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl rounded-full font-["Outfit",sans-serif] flex items-center justify-between px-2.5 py-1.5 xs:px-3.5 xs:py-2 sm:px-5 sm:py-2.5 border overflow-hidden transition-all duration-300',
          scrolled
            ? 'bg-[#030712]/92 border-blue-500/30 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(37,99,235,0.25)] backdrop-blur-2xl'
            : 'bg-[#030712]/80 border-white/10 shadow-lg backdrop-blur-xl'
        )}
      >
        {/* LOGO / BRAND */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 group focus-visible:outline-none rounded-full shrink-0"
        >
          <div className="flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-white font-extrabold text-[10px] xs:text-xs sm:text-sm shadow-[0_0_12px_rgba(37,99,235,0.5)] border border-blue-400/40 group-hover:scale-105 transition-transform">
            UK
          </div>
          <span className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors hidden min-[880px]:inline-block">
            Usman Khatri
          </span>
        </Link>

        {/* DESKTOP / TABLET NAV ITEMS */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-[#060C1A]/80 border border-blue-500/20 rounded-full p-1 backdrop-blur-md overflow-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'relative px-2.5 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-full text-[11px] lg:text-xs font-bold transition-all duration-200 flex items-center gap-1.5 lg:gap-2 group overflow-hidden',
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                )}
              >
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-blue-600/35 border border-blue-500/60 shadow-[0_0_12px_rgba(37,99,235,0.35)]"
                  />
                )}
                <Icon
                  className={cn(
                    'w-3.5 h-3.5 lg:w-4 lg:h-4 relative z-10 transition-colors duration-200',
                    isActive ? 'text-blue-400' : 'text-zinc-400 group-hover:text-blue-400'
                  )}
                />
                <span className="relative z-10 whitespace-nowrap">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* CTA BUTTON / MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            to="/contact"
            className="hidden min-[600px]:flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 xs:px-3.5 xs:py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(37,99,235,0.4)] hover:shadow-[0_0_24px_rgba(37,99,235,0.6)] border border-blue-400/40 active:scale-95 group shrink-0"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 xs:p-2 sm:p-2.5 rounded-full bg-[#060C1A] border border-blue-500/30 text-zinc-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-blue-400" /> : <Menu className="w-4 h-4 text-zinc-300" />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE / WATCH MENU */}
      <AnimatePresence>
        {mobileMenuOpen && visible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto absolute top-full left-2 right-2 xs:left-4 xs:right-4 mt-2 sm:mt-3 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#030712]/95 border border-blue-500/40 shadow-2xl backdrop-blur-2xl flex flex-col gap-1.5 sm:gap-2 font-['Outfit',sans-serif] md:hidden z-50 max-h-[80vh] overflow-y-auto"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all',
                    isActive
                      ? 'bg-blue-600/30 border border-blue-500/60 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-blue-950/40'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-blue-400' : 'text-zinc-400')} />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider mt-1 shadow-lg shadow-blue-600/30 border border-blue-400/40"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
