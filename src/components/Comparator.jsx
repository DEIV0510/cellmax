import { Check, MessageCircle, Scale } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { comparator } from '../data/products'
import { wa, MESSAGES } from '../utils/whatsapp'

export default function Comparator() {
  return (
    <Section id="comparador" tone="alt">
      <div className="container">
        <SectionHead
          eyebrow="Te ayudamos a elegir"
          icon={Scale}
          title="¿Qué tipo de pantalla necesitas?"
          sub="Cada alternativa tiene su ventaja. Compara y elige la que mejor se ajuste a lo que buscas."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {comparator.map((opt, i) => {
            const gold = opt.accent === 'gold'
            return (
              <article
                key={opt.id}
                data-reveal
                data-reveal-delay={i * 90}
                className={`card-premium ${gold ? 'card-gold' : ''} flex flex-col p-6 ${
                  opt.highlight ? 'lg:-translate-y-3 lg:shadow-glow-gold' : ''
                }`}
              >
                <h3
                  className={`font-display text-lg font-extrabold uppercase tracking-tight ${
                    gold ? 'text-gradient-gold' : 'text-gradient-blue'
                  }`}
                >
                  {opt.name}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-steel-300">{opt.claim}</p>

                <div
                  className={`mt-5 h-px w-full ${
                    gold
                      ? 'bg-gradient-to-r from-gold-500/50 to-transparent'
                      : 'bg-gradient-to-r from-electric-500/50 to-transparent'
                  }`}
                />

                <ul className="mt-5 flex-1 space-y-2.5">
                  {opt.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-steel-400">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${gold ? 'text-gold-400' : 'text-electric-400'}`}
                      />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                    Garantía
                  </p>
                  <p className="mt-0.5 font-display text-lg font-extrabold text-white">
                    {opt.warranty}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 text-center" data-reveal="fade">
          <a
            href={wa(MESSAGES.advisor)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold w-full sm:w-auto"
          >
            <MessageCircle size={18} /> QUIERO ASESORÍA
          </a>
          <p className="mt-3 text-[12.5px] text-steel-500">
            Te ayudamos a elegir la opción correcta para tu modelo.
          </p>
        </div>
      </div>
    </Section>
  )
}
