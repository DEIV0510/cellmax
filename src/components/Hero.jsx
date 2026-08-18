import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, Wrench, HeartHandshake, MapPin } from 'lucide-react'
import { IMG } from '../utils/images'
import { wa, MESSAGES } from '../utils/whatsapp'
import { site } from '../data/site'

const BADGES = [
  { icon: Sparkles, label: 'Calidad Premium' },
  { icon: ShieldCheck, label: 'Garantía' },
  { icon: Wrench, label: 'Servicio técnico' },
  { icon: HeartHandshake, label: 'Atención personalizada' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-[72px]">
      {/* Fondo tecnologico */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-tech [background-size:64px_64px] opacity-[0.55]" />
        <div className="absolute -left-40 top-[-12%] h-[560px] w-[560px] rounded-full bg-electric-500/20 blur-[140px]" />
        <div className="absolute -right-32 top-[24%] h-[440px] w-[440px] rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container relative py-9 sm:py-14 lg:py-20">
        <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          {/* Columna de texto */}
          <div className="text-center lg:text-left">
            <span className="eyebrow" data-reveal="fade">
              <MapPin size={13} /> Nos ubicamos en {site.address.cityAccented}
            </span>

            <h1
              className="mt-5 font-display text-[clamp(2.9rem,11vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-tight"
              data-reveal
              data-reveal-delay="60"
            >
              <span className="text-gradient-blue">Cell Max</span>
            </h1>

            <p
              className="mt-2 font-display text-[clamp(1.35rem,5vw,2rem)] font-bold uppercase tracking-[0.16em] text-white/90"
              data-reveal
              data-reveal-delay="120"
            >
              Apple <span className="text-gradient-gold">Repair</span>
            </p>

            <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-electric-500 to-transparent lg:mx-0 lg:bg-gradient-to-r lg:from-electric-500 lg:to-transparent" />

            <p
              className="mt-6 text-lg font-semibold leading-snug text-white sm:text-xl"
              data-reveal
              data-reveal-delay="180"
            >
              {site.claim}
            </p>
            <p
              className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-steel-400 lg:mx-0 sm:text-base"
              data-reveal
              data-reveal-delay="220"
            >
              {site.subclaim}
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              data-reveal
              data-reveal-delay="280"
            >
              <a
                href={wa(MESSAGES.quote)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa w-full sm:w-auto"
              >
                <MessageCircle size={18} /> COTIZAR POR WHATSAPP
              </a>
              <a href="#catalogo" className="btn btn-ghost w-full sm:w-auto">
                VER CATÁLOGO <ArrowRight size={17} />
              </a>
            </div>

            <ul
              className="mt-7 grid grid-cols-2 gap-2 sm:mt-9 sm:grid-cols-4 sm:gap-2.5 lg:max-w-2xl"
              data-reveal
              data-reveal-delay="340"
            >
              {BADGES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="glass flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center"
                >
                  <Icon size={17} className="text-electric-400" />
                  <span className="text-[11.5px] font-semibold leading-tight text-steel-300">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Imagen real del negocio */}
          <div className="relative" data-reveal="zoom" data-reveal-delay="140">
            <div className="relative overflow-hidden rounded-[22px] border border-white/10 shadow-glow">
              <img
                src={IMG.hero.src}
                alt={IMG.hero.alt}
                width={1355}
                height={746}
                fetchpriority="high"
                decoding="async"
                className="w-full object-cover"
              />
              {/* Linea de escaneo tecnica */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-16 animate-scan bg-gradient-to-b from-transparent via-electric-400/10 to-transparent" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10"
              />
            </div>

            {/* Tarjeta de ubicacion: debajo de la imagen, sin taparla */}
            <div className="glass mt-4 rounded-2xl px-4 py-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric-500/15 text-electric-300">
                  <MapPin size={17} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-electric-300">
                    {site.address.place}
                  </p>
                  <p className="text-[13px] leading-snug text-steel-300">
                    {site.address.entrance} · {site.address.floor}, {site.address.locals}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
