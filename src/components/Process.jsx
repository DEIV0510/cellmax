import { Stethoscope, FileText, Wrench, CheckCircle2, PackageCheck, Route } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { steps } from '../data/process'

const ICONS = { Stethoscope, FileText, Wrench, CheckCircle2, PackageCheck }

export default function Process() {
  return (
    <Section id="proceso">
      <div className="container">
        <SectionHead
          eyebrow="Nuestro proceso"
          icon={Route}
          title="Así trabajamos"
          sub="Un procedimiento claro de principio a fin, para que sepas siempre en qué punto está tu equipo."
        />

        <div className="relative mt-14">
          {/* Linea conectora en desktop */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-electric-500/40 to-transparent lg:block"
          />

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {steps.map((s, i) => {
              const Icon = ICONS[s.icon] || Wrench
              return (
                <li
                  key={s.n}
                  data-reveal
                  data-reveal-delay={i * 90}
                  className="group relative flex gap-4 lg:block"
                >
                  <div className="relative z-10 flex h-13 w-13 shrink-0 lg:mx-auto">
                    <span className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-electric-500/30 bg-ink-950 text-electric-300 shadow-[0_0_0_6px_rgba(4,6,11,1)] transition-all duration-300 group-hover:border-electric-500/70 group-hover:text-electric-200 group-hover:shadow-[0_0_0_6px_rgba(4,6,11,1),0_0_28px_-6px_rgba(10,132,255,.8)]">
                      <Icon size={21} />
                    </span>
                  </div>

                  <div className="pt-1 lg:mt-5 lg:pt-0 lg:text-center">
                    <p className="font-display text-[11px] font-extrabold tracking-[0.2em] text-gold-500">
                      PASO {s.n}
                    </p>
                    <h3 className="mt-1.5 text-[15.5px] font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-steel-400">{s.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </Section>
  )
}
