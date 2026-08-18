import { Sparkles, ShieldCheck, HeartHandshake, Wrench } from 'lucide-react'

const ITEMS = [
  {
    icon: Sparkles,
    title: 'Calidad Premium',
    desc: 'Componentes y soluciones seleccionadas.',
    tone: 'gold',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía',
    desc: 'Garantía según el producto o servicio.',
    tone: 'electric',
  },
  {
    icon: HeartHandshake,
    title: 'Atención personalizada',
    desc: 'Asesoría antes y después de la compra.',
    tone: 'electric',
  },
  {
    icon: Wrench,
    title: 'Servicio técnico',
    desc: 'Soluciones profesionales para dispositivos.',
    tone: 'gold',
  },
]

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/[0.07] bg-ink-900/60">
      <div className="container py-8 sm:py-12">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {ITEMS.map(({ icon: Icon, title, desc, tone }, i) => (
            <div
              key={title}
              data-reveal
              data-reveal-delay={i * 70}
              className={`card-premium ${tone === 'gold' ? 'card-gold' : ''} group p-4 sm:p-5`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11 ${
                  tone === 'gold'
                    ? 'bg-gold-500/10 text-gold-300'
                    : 'bg-electric-500/10 text-electric-300'
                }`}
              >
                <Icon size={20} />
              </span>
              <h3 className="mt-3 text-[13.5px] font-bold leading-tight tracking-tight sm:mt-4 sm:text-[15px]">{title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-steel-400 sm:text-[13.5px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
