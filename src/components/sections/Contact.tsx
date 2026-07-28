import { useState } from 'react'
import { APPLE_EASE } from '../../lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { AnimatedInput, AnimatedTextarea } from '../ui/AnimatedInput'
import { MagneticButton } from '../ui/MagneticButton'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(4, 'Subject is too short'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})
type FormData = z.infer<typeof schema>

type Status = 'idle' | 'sending' | 'success' | 'error'

export const Contact = () => {
  const [status, setStatus] = useState<Status>('idle')
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const values = watch()

  const onSubmit = async (data: FormData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    setStatus('sending')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message },
        publicKey,
      )
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section className="py-16 sm:py-28 bg-background cv-auto" aria-label="Contact section">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">

          {/* Left: Info */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.35em] uppercase text-primary-light font-heading mb-3"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: APPLE_EASE }}
              className="font-heading font-bold tracking-tighter text-white mb-4 sm:mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
            >
              Let's build something<br />
              <span className="text-gradient">remarkable.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10 max-w-sm"
            >
              Have a project in mind or just want to connect? I'm open to freelance work, collaborations, and interesting conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex flex-col gap-3 sm:gap-4"
            >
              {[
                { icon: Mail, label: 'hello@usman.dev', href: 'mailto:hello@usman.dev' },
                { icon: FiGithub, label: 'github.com/usmankhatri', href: 'https://github.com/usmankhatri' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
                >
                  <div
                    className="size-8 sm:size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:border-primary/30"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}
                  >
                    <Icon className="size-4 text-primary-light" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium truncate">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 sm:py-20 text-center rounded-2xl border border-emerald-500/20 px-4"
                  style={{ background: 'rgba(16,185,129,0.05)' }}
                >
                  <CheckCircle className="size-10 sm:size-12 text-emerald-400" />
                  <div>
                    <p className="font-heading font-bold text-white text-lg sm:text-xl mb-1.5 sm:mb-2">Message Sent!</p>
                    <p className="text-zinc-400 text-xs sm:text-sm">I'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3.5 sm:gap-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <AnimatedInput
                      label="Your Name"
                      {...register('name')}
                      value={values.name || ''}
                      error={errors.name?.message}
                      autoComplete="name"
                    />
                    <AnimatedInput
                      label="Email Address"
                      type="email"
                      {...register('email')}
                      value={values.email || ''}
                      error={errors.email?.message}
                      autoComplete="email"
                    />
                  </div>

                  <AnimatedInput
                    label="Subject"
                    {...register('subject')}
                    value={values.subject || ''}
                    error={errors.subject?.message}
                  />

                  <AnimatedTextarea
                    label="Your Message"
                    rows={5}
                    {...register('message')}
                    value={values.message || ''}
                    error={errors.message?.message}
                  />

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-xs sm:text-sm"
                    >
                      <AlertCircle className="size-4 flex-shrink-0" />
                      <span>Something went wrong. Please try again.</span>
                    </motion.div>
                  )}

                  <MagneticButton
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-2 w-full py-3.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm text-white font-heading gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      boxShadow: '0 0 30px rgba(37,99,235,0.3)',
                    } as React.CSSProperties}
                  >
                    <AnimatePresence mode="wait">
                      {status === 'sending' ? (
                        <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </motion.span>
                      ) : (
                        <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          Send Message
                          <Send className="size-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
