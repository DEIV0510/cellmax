import { ShieldCheck, HeartHandshake, ScanSearch, LifeBuoy, MessageCircle } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { wa, MESSAGES } from '../utils/whatsapp'

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Garantía según producto',
    desc: 'Cada categoría tiene su propia garantía, y te la indicamos antes de la compra.',
  },
  {
    icon: HeartHandshake,
    title: 'Atención personalizada',
    desc: 'Te asesoramos para que elijas la opción correcta para tu equipo.',
  },
  {
    icon: ScanSearch,
    title: 'Verificación del producto',
    desc: 'Revisamos el funcionamiento del producto antes de la entrega.',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte posterior',
    desc: 'Seguimos disponibles después de la compra por WhatsApp.',
  },
]

const TERMS = [
  { label: 'INCELL Premium HD Plus', days: '15 días', tone: 'electric' },
  { label: 'OLED Soft', days: '30 días', tone: 'gold' },
  { label: 'Originales de Samsung', days: '30 días', tone: 'electric' },
]

export default function Warranty() {
  return (
    <Section id="garantia" tone="deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-gold-500/[0.07] blur-[130px]"
      />
      <div className="container relative">
        <SectionHead
          eyebrow="Respaldo"
          icon={ShieldCheck}
          title="Tu compra con respaldo"
          sub="Trabajamos con condiciones claras: sabes exactamente qué garantía tiene lo que compras."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:gap-5">
          {/* Pilares */}
          <div className="grid gap-3 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="card-premium p-5" data-reveal data-reveal-delay={i * 70}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric-500/12 text-electric-300">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-[15px] font-bold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-steel-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* Tabla de garantias */}
          <div
            className="card-premium card-gold flex flex-col p-6"
            data-reveal="right"
            data-reveal-delay="120"
          >
            <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-gradient-gold">
              Garantía por categoría
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-steel-400">
              Las garantías no se mezclan entre categorías.
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {TERMS.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5"
                >
                  <span className="text-[13.5px] font-medium text-steel-200">{t.label}</span>
                  <span
                    className={`shrink-0 font-display text-[15px] font-extrabold ${
                      t.tone === 'gold' ? 'text-gold-300' : 'text-electric-300'
                    }`}
                  >
                    {t.days}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[12px] leading-relaxed text-steel-500">
              Si un producto tiene una condición diferente, te indicamos la condición específica
              antes de la compra.
            </p>

            <a
              href={wa(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-5 w-full"
            >
              <MessageCircle size={17} /> CONSULTAR GARANTÍA
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
