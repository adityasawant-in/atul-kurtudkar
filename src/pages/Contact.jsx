import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { SectionHeading } from '../components/shared/SectionHeading'
import { GlassCard } from '../components/shared/GlassCard'
import { Button } from '../components/ui/Button'
// import { PremiumButton } from '../components/ui/PremiumButton'
import { SEO } from '../components/seo/SEO'
// import { cn } from '../utils/cn'

const PHONE = '+91 98765 43210'
const WHATSAPP_HREF = `https://wa.me/${PHONE.replace(/[^\d]/g, '')}`

const BUSINESS_HOURS = [
  { day: 'Monday – Friday', hours: '9:30 AM – 6:30 PM' },
  { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

// --- FORM DISABLED (no backend/DB in this project) ---------------------
// Uncomment TABS + FormFields + the GlassCard using them below to bring
// the request-consultation / inquiry / career form back online.
// -------------------------------------------------------------------
// const TABS = [
//   { id: 'consultation', label: 'Request Consultation' },
//   { id: 'inquiry', label: 'General Inquiry' },
//   { id: 'career', label: 'Career Inquiry' },
// ]

// function FormFields({ tab }) {
//   const [submitted, setSubmitted] = useState(false)

//   function handleSubmit(e) {
//     e.preventDefault()
//     setSubmitted(true)
//   }

//   if (submitted) {
//     return (
//       <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
//         <p className="font-display text-lg font-semibold text-ink-50">Thank you — we've received your message.</p>
//         <p className="mt-2 text-sm text-ink-300">We'll get back to you within one business day.</p>
//       </div>
//     )
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       <div className="grid gap-5 sm:grid-cols-2">
//         <label className="block">
//           <span className="mb-2 block font-display text-xs tracking-[0.1em] text-ink-300">FULL NAME</span>
//           <input required type="text" className="w-full rounded-md border border-ink-50/15 bg-transparent px-4 py-3 text-sm text-ink-50 outline-none transition-colors focus:border-concrete-500" />
//         </label>
//         <label className="block">
//           <span className="mb-2 block font-display text-xs tracking-[0.1em] text-ink-300">EMAIL</span>
//           <input required type="email" className="w-full rounded-md border border-ink-50/15 bg-transparent px-4 py-3 text-sm text-ink-50 outline-none transition-colors focus:border-concrete-500" />
//         </label>
//       </div>

//       {tab === 'consultation' && (
//         <div className="grid gap-5 sm:grid-cols-2">
//           <label className="block">
//             <span className="mb-2 block font-display text-xs tracking-[0.1em] text-ink-300">PROJECT TYPE</span>
//             <select className="w-full rounded-md border border-ink-50/15 bg-structural-950 px-4 py-3 text-sm text-ink-50 outline-none transition-colors focus:border-concrete-500">
//               <option>Residential</option>
//               <option>Commercial</option>
//               <option>Industrial</option>
//               <option>Institutional</option>
//               <option>Structural Audit</option>
//               <option>Consultancy</option>
//             </select>
//           </label>
//           <label className="block">
//             <span className="mb-2 block font-display text-xs tracking-[0.1em] text-ink-300">PREFERRED DATE</span>
//             <input type="date" className="w-full rounded-md border border-ink-50/15 bg-transparent px-4 py-3 text-sm text-ink-50 outline-none transition-colors focus:border-concrete-500" />
//           </label>
//         </div>
//       )}

//       {tab === 'career' && (
//         <label className="block">
//           <span className="mb-2 block font-display text-xs tracking-[0.1em] text-ink-300">ROLE OF INTEREST</span>
//           <input type="text" placeholder="e.g. Structural Design Engineer" className="w-full rounded-md border border-ink-50/15 bg-transparent px-4 py-3 text-sm text-ink-50 outline-none transition-colors focus:border-concrete-500" />
//         </label>
//       )}

//       <label className="block">
//         <span className="mb-2 block font-display text-xs tracking-[0.1em] text-ink-300">MESSAGE</span>
//         <textarea
//           required
//           rows={5}
//           className="w-full resize-none rounded-md border border-ink-50/15 bg-transparent px-4 py-3 text-sm text-ink-50 outline-none transition-colors focus:border-concrete-500"
//         />
//       </label>

//       <PremiumButton type="submit" className="w-full justify-center sm:w-auto">
//         Send Message
//       </PremiumButton>
//     </form>
//   )
// }
// -------------------------------------------------------------------

export function Contact() {
  // const [activeTab, setActiveTab] = useState('consultation')

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Atul Kudtarkar & Associates for structural design, audits and construction consultancy."
        path="/contact"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Atul Kudtarkar & Associates',
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's discuss your next structure"
        description="Whether it's a new build, a structural audit, or a career conversation — reach out and we'll respond within one business day."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          {/* --- FORM DISABLED: uncomment below to bring the form card back ---
          <GlassCard>
            <div className="mb-6 flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'rounded-full px-4 py-2 font-display text-xs font-medium tracking-wide transition-colors duration-300',
                    activeTab === tab.id ? 'bg-concrete-500 text-structural-950' : 'text-ink-300 hover:text-ink-50'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <FormFields key={activeTab} tab={activeTab} />
          </GlassCard>
          --- END FORM DISABLED --- */}

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <GlassCard className="p-8">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-concrete-500" strokeWidth={2} />
                <h4 className="font-display text-base font-semibold text-ink-50">Office</h4>
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink-300">Badlapur, Thane, Maharashtra, India</p>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-concrete-500" strokeWidth={2} />
                <h4 className="font-display text-base font-semibold text-ink-50">Phone</h4>
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink-300">{PHONE}</p>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-concrete-500" strokeWidth={2} />
                <h4 className="font-display text-base font-semibold text-ink-50">Email</h4>
              </div>
              <p className="mt-4 break-words text-base leading-relaxed text-ink-300">contact@atulkudtarkarassociates.com</p>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-concrete-500" strokeWidth={2} />
                <h4 className="font-display text-base font-semibold text-ink-50">Business Hours</h4>
              </div>
              <ul className="mt-4 space-y-2">
                {BUSINESS_HOURS.map((row) => (
                  <li key={row.day} className="flex justify-between gap-4 text-base text-ink-300">
                    <span>{row.day}</span>
                    <span>{row.hours}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Click-to-chat WhatsApp CTA — jumps straight to a chat with the
              client's WhatsApp number, same wa.me pattern used in the
              homepage contact section. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-ink-50/10 bg-ink-50/[0.02] px-8 py-10 text-center"
          >
            <MessageCircle className="h-7 w-7 text-concrete-500" strokeWidth={1.75} />
            <div>
              <p className="font-display text-lg font-semibold text-ink-50">Prefer WhatsApp?</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-300">
                Message us directly and we'll get back to you right away.
              </p>
            </div>
            <Button as="a" href={WHATSAPP_HREF} target="_blank" rel="noreferrer" variant="primary">
              Chat on WhatsApp
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <SectionHeading eyebrow="Find Us" title="Our office location" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 overflow-hidden rounded-lg border border-ink-50/10"
        >
          <iframe
            title="Office location map"
            src="https://maps.google.com/maps?q=Badlapur%2C%20Thane%2C%20Maharashtra&z=13&output=embed"
            className="h-96 w-full grayscale-[0.15] contrast-[1.02]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </SectionWrapper>
    </>
  )
}