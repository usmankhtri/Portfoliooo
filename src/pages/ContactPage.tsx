import { SEO } from '../components/SEO'
import { APPLE_EASE } from '../lib/utils'
import { Contact } from '../components/sections/Contact'
import { motion } from 'framer-motion'

export const ContactPage = () => {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Usman Khatri for freelance projects, collaborations, or just to say hello."
        url="/contact"
      />

      <main className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 mb-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-4"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-heading font-extrabold tracking-tighter text-white"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Say hello.<br />
            <span className="text-gradient">Let's talk.</span>
          </motion.h1>
        </div>

        <Contact />

        <footer
          className="mt-20 py-10 text-center border-t"
          style={{ borderColor: 'rgba(37,99,235,0.08)' }}
        >
          <p className="text-xs text-zinc-600 font-heading tracking-widest">
            © {new Date().getFullYear()} Usman Khatri · All rights reserved
          </p>
        </footer>
      </main>
    </>
  )
}
