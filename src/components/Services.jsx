import {
  Smartphone,
  MonitorSmartphone,
  Sparkles,
  Layers,
  Tablet,
  Wrench,
  CircuitBoard,
  Headphones,
  MessageCircle,
} from 'lucide-react'
import Section, { SectionHead } from './Section'
import { services } from '../data/services'
import { wa } from '../utils/whatsapp'
import { IMG } from '../utils/images'

const ICONS = {
  Smartphone,
  MonitorSmartphone,
  Sparkles,
  Layers,
  Tablet,
  Wrench,
  CircuitBoard,
  Headphones,
}

export default function Services() {
  return (
    <Section id="servicios" tone="deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(720px,100vw)] -translate-x-1/2 rounded-full bg-electric-500/[0.07] blur-[120px]"
      />
      <div className="container relative">
        <SectionHead
          eyebrow="Lo que hacemos"
          icon={Wrench}
          title="Nuestros servicios"
          sub="Reparación, pantallas y repuestos para tu dispositivo, con asesoría antes y después de la compra."
        />

        <div className="mt-9 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || Wrench
            const image = s.image ? IMG[s.image] : null
            return (
              <article
                key={s.id}
                data-reveal
                data-reveal-delay={(i % 4) * 70}
                className="card-premium group flex flex-col p-3.5 sm:p-5"
              >
                {image && (
                  <div className="relative -mx-5 -mt-5 mb-4 overflow-hidden border-b border-white/[0.07]">
                    <img
                      src={image.sm}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-36 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                  </div>
                )}

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric-500/10 text-electric-300 transition-all duration-300 group-hover:bg-electric-500/20 group-hover:text-electric-200 sm:h-11 sm:w-11">
                  <Icon size={20} />
                </span>

                <h3 className="mt-3 text-[13.5px] font-bold leading-tight tracking-tight sm:mt-4 sm:text-[15.5px]">
                  {s.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-steel-400 sm:mt-2 sm:text-[13.5px]">{s.desc}</p>

                <a
                  href={wa(s.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:border-[#25d366]/50 hover:bg-[#25d366]/10"
                >
                  <MessageCircle size={15} /> COTIZAR
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
