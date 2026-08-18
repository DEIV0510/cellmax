import { MessageCircle, ArrowRight, MapPin } from 'lucide-react'
import { wa, MESSAGES } from '../utils/whatsapp'
import { site } from '../data/site'
import { CM_LOGO } from '../utils/images'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-tech [background-size:56px_56px] opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/[0.14] blur-[130px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500/50 to-transparent" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <img
            src={CM_LOGO}
            alt="Cell Max"
            width={92}
            height={80}
            loading="lazy"
            className="mx-auto h-16 w-auto animate-float-soft drop-shadow-[0_0_28px_rgba(10,132,255,0.45)]"
          />

          <h2 className="section-title mt-7">
            ¿Necesitas reparar <span className="text-gradient-blue">tu celular</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-steel-300 sm:text-lg">
            Cotiza tu reparación o pantalla con Cell Max.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={wa(MESSAGES.repair)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa w-full sm:w-auto"
            >
              <MessageCircle size={18} /> HABLAR POR WHATSAPP
            </a>
            <a href="#catalogo" className="btn btn-ghost w-full sm:w-auto">
              VER CATÁLOGO <ArrowRight size={17} />
            </a>
          </div>

          <div className="glass mx-auto mt-9 inline-flex max-w-full items-center gap-2.5 rounded-2xl px-4 py-3 text-left">
            <MapPin size={17} className="shrink-0 text-electric-300" />
            <p className="text-[12.5px] leading-snug text-steel-300 sm:text-[13.5px]">
              {site.address.cityAccented} — {site.address.place} — {site.address.floor}, {site.address.locals}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
