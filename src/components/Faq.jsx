import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { faqs } from '../data/faq'
import { wa, MESSAGES } from '../utils/whatsapp'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" tone="alt">
      <div className="container">
        <SectionHead
          eyebrow="Dudas frecuentes"
          icon={HelpCircle}
          title="Preguntas frecuentes"
          sub="Lo que más nos preguntan antes de venir al local."
        />

        <div className="mx-auto mt-9 max-w-3xl space-y-2 sm:mt-12 sm:space-y-2.5">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                data-reveal
                data-reveal-delay={Math.min(i, 4) * 55}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? 'border-electric-500/35 bg-electric-500/[0.06]'
                    : 'border-white/[0.08] bg-white/[0.025] hover:border-white/20'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[14.5px] font-semibold leading-snug text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-electric-300' : 'text-steel-500'
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14px] leading-relaxed text-steel-400">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-9 text-center" data-reveal="fade">
          <p className="text-[14px] text-steel-400">¿Tienes otra pregunta?</p>
          <a
            href={wa(MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-3"
          >
            <MessageCircle size={17} /> HABLAR CON UN ASESOR
          </a>
        </div>
      </div>
    </Section>
  )
}
