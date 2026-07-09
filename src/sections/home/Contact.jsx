import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { GlassPanel } from '../../components/shared/GlassPanel'
import { Button } from '../../components/ui/Button'
import { MagneticButton } from '../../components/ui/MagneticButton'
import { useContactForm } from '../../hooks/useContactForm'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'

const ADDRESS_LINES = [
  '202/203 Shree Yash Apartment',
  'Above Monginis, Near Railway Station',
  'Badlapur East, Thane',
  'Maharashtra 421503',
]

const PHONE = '+91 98765 43210'
const EMAIL = 'info@atulkudtarkar.com'
const MAPS_QUERY = encodeURIComponent(ADDRESS_LINES.join(', '))

const QUICK_ACTIONS = [
  { label: 'Call', icon: Phone, href: `tel:${PHONE.replace(/\s/g, '')}` },
  { label: 'Email', icon: Mail, href: `mailto:${EMAIL}` },
  { label: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/${PHONE.replace(/[^\d]/g, '')}` },
  { label: 'Directions', icon: MapPin, href: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}` },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-structural-950 py-32 sm:py-40">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="08"
          eyebrow="Contact"
          title="Start a conversation about your structure."
          description="Reach out for a consultation, an audit, or construction support — we respond within one business day."
        />

        <GlassPanel className="mt-16 grid grid-cols-1 glass-sheen lg:grid-cols-5">
          {/* Map placeholder */}
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-2 lg:aspect-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-structural-800 to-structural-950" />
            <svg className="absolute inset-0 h-full w-full opacity-20">
              <defs>
                <pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M28 0H0V28" fill="none" stroke="#4577c2" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <span className="relative flex h-11 w-11 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-concrete-500/25" />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-concrete-500/50 text-concrete-500">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </span>
              </span>
              <p className="max-w-[16rem] text-xs leading-relaxed text-ink-400">
                {ADDRESS_LINES.join(', ')}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1 font-display text-xs font-medium tracking-wide text-concrete-300 underline underline-offset-4"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Form + info */}
          <div className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:col-span-3 lg:grid-cols-2">
            <ContactForm />

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col justify-between"
            >
              <div>
                <motion.p variants={fadeUp} className="font-display text-xs tracking-[0.15em] text-ink-500">
                  OFFICE ADDRESS
                </motion.p>
                <motion.address variants={fadeUp} className="mt-3 space-y-0.5 text-sm not-italic leading-relaxed text-ink-200">
                  {ADDRESS_LINES.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </motion.address>

                <motion.div variants={fadeUp} className="mt-6 space-y-1.5 text-sm text-ink-200">
                  <p>{PHONE}</p>
                  <p>{EMAIL}</p>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-3">
                {QUICK_ACTIONS.map(({ label, icon: Icon, href }) => (
                  <MagneticButton key={label} strength={0.2}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex items-center justify-center gap-2 rounded-md border border-ink-50/12 px-4 py-3 font-display text-xs font-medium tracking-wide text-ink-100 transition-colors hover:border-concrete-500/60 hover:text-concrete-300"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {label}
                    </a>
                  </MagneticButton>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </GlassPanel>
      </div>
    </section>
  )
}

function ContactForm() {
  const { values, errors, status, handleChange, handleSubmit, reset } = useContactForm()
  const isSubmitting = status === 'submitting'
  const isSuccess = status === 'success'

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex flex-1 flex-col items-center justify-center gap-3 rounded-md border border-concrete-500/30 bg-concrete-500/5 py-14 text-center"
          >
            <CheckCircle2 className="h-8 w-8 text-concrete-500" strokeWidth={1.5} />
            <p className="font-display text-sm font-medium text-ink-50">Message sent.</p>
            <p className="max-w-[16rem] text-xs leading-relaxed text-ink-400">
              Thank you for reaching out — we'll respond within one business day.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 font-display text-xs font-medium tracking-wide text-concrete-300 underline underline-offset-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Honeypot — hidden from sighted and keyboard users, bots fill it */}
            <input
              type="text"
              name="company"
              value={values.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <Field
              label="Name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              placeholder="+91 00000 00000"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete="tel"
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-display text-xs tracking-[0.15em] text-ink-500">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your project"
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="resize-none rounded-md border border-ink-50/12 bg-ink-50/[0.03] px-4 py-3 text-sm text-ink-50 outline-none transition-all duration-300 placeholder:text-ink-500 focus:border-concrete-500/60 focus:shadow-[0_0_0_3px_rgba(201,163,78,0.12)]"
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-signal-500">
                  {errors.message}
                </p>
              )}
            </div>

            {status === 'error' && (
              <p role="alert" className="flex items-center gap-2 text-xs text-signal-500">
                <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                Something went wrong sending your message. Please try again, or reach out
                directly using the details alongside.
              </p>
            )}

            <Button
              as="button"
              type="submit"
              variant="primary"
              icon={!isSubmitting}
              disabled={isSubmitting}
              className="mt-2 justify-center disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Sending…
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, name, type, placeholder, value, onChange, error, autoComplete }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-display text-xs tracking-[0.15em] text-ink-500">
        {label.toUpperCase()}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="rounded-md border border-ink-50/12 bg-ink-50/[0.03] px-4 py-3 text-sm text-ink-50 outline-none transition-all duration-300 placeholder:text-ink-500 focus:border-concrete-500/60 focus:shadow-[0_0_0_3px_rgba(201,163,78,0.12)]"
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-signal-500">
          {error}
        </p>
      )}
    </div>
  )
}
