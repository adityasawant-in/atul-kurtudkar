import { Quote } from 'lucide-react'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { TESTIMONIALS } from '../../data/testimonials'

function TestimonialCard({ testimonial }) {
  return (
    <div className="glass glass-sheen flex w-[320px] shrink-0 flex-col justify-between rounded-lg p-7 transition-transform duration-500 hover:-translate-y-1.5 sm:w-[380px]">
      <Quote className="h-6 w-6 text-concrete-500/70" strokeWidth={1.5} />
      <p className="mt-5 text-sm leading-relaxed text-ink-200">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 border-t border-ink-50/8 pt-5">
        <p className="font-display text-sm font-medium text-ink-50">{testimonial.name}</p>
        <p className="mt-0.5 text-xs text-ink-500">{testimonial.role}</p>
      </div>
    </div>
  )
}

export function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="relative overflow-hidden bg-structural-900 py-32 sm:py-40">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="07"
          eyebrow="Testimonials"
          title="Trusted by developers, homeowners and institutions."
          align="center"
          className="mx-auto"
        />
      </div>

      <div className="group relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-structural-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-structural-900 to-transparent" />

        <div
          className="flex w-max gap-6 px-6 [animation:marquee_58s_linear_infinite] group-hover:[animation-play-state:paused]"
        >
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
