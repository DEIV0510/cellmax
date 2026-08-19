import { useState } from 'react'
import { MapPin, Navigation, MessageCircle, Building2, Phone, Instagram } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { site, mapsSearchUrl, mapsEmbedUrl } from '../data/site'
import { wa, MESSAGES } from '../utils/whatsapp'
import { IMG } from '../utils/images'

const DETAILS = [
  { icon: Building2, label: 'Centro comercial', value: site.address.place },
  { icon: MapPin, label: 'Entrada', value: site.address.entrance },
  { icon: Navigation, label: 'Piso y locales', value: `${site.address.floor}, ${site.address.locals}` },
  { icon: Phone, label: 'WhatsApp', value: site.phoneDisplay },
]

/**
 * El mapa incrustado de Google carga cientos de KB y bastante JavaScript.
 * Se monta solo cuando el visitante lo pide: hasta entonces se muestra un
 * marcador ligero. La mayoria usa "Cómo llegar" y nunca necesita el mapa.
 */
function Mapa() {
  const [activo, setActivo] = useState(false)

  if (activo) {
    return (
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
        <iframe
          title={`Ubicación de Cell Max en ${site.address.cityAccented}`}
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-52 w-full sm:h-full sm:min-h-[240px]"
          style={{ border: 0, filter: 'grayscale(0.85) contrast(1.12) brightness(0.6)' }}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActivo(true)}
      className="group relative flex h-52 flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition-colors hover:border-electric-500/45 sm:min-h-[240px]"
      aria-label="Cargar el mapa de la ubicación"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-grid-tech [background-size:34px_34px] opacity-50"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/15 blur-3xl"
      />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-500/15 text-electric-300 transition-transform duration-300 group-hover:scale-110">
        <MapPin size={22} />
      </span>
      <span className="relative text-[14px] font-semibold text-white">Ver mapa</span>
      <span className="relative text-[12px] text-steel-400">
        {site.address.place} · {site.address.cityAccented}
      </span>
    </button>
  )
}

export default function Location() {
  return (
    <Section id="ubicacion">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-electric-500/[0.09] blur-[130px]"
      />
      <div className="container relative">
        <SectionHead
          eyebrow={`Nos ubicamos en ${site.address.cityAccented}`}
          icon={MapPin}
          title={`Visítanos en ${site.address.cityAccented}`}
          sub="Estamos en el corazón comercial de la ciudad. Ven, te asesoramos en el local."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_1fr] lg:gap-5">
          {/* Tarjeta de ubicacion */}
          <div className="card-premium p-5 sm:p-7" data-reveal="left">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-500/10 text-electric-300">
              <MapPin size={22} />
            </span>

            <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight">
              {site.address.place}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-steel-300">
              {site.address.entrance}
              <br />
              {site.address.floor}, {site.address.locals}
              <br />
              <span className="text-steel-400">{site.address.cityAccented}, Norte de Santander</span>
            </p>

            <div className="hairline my-6" />

            <dl className="grid gap-3 sm:grid-cols-2">
              {DETAILS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
                >
                  <dt className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                    <Icon size={12} /> {label}
                  </dt>
                  <dd className="mt-1 text-[14px] font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-1"
              >
                <Navigation size={17} /> CÓMO LLEGAR
              </a>
              <a
                href={wa(MESSAGES.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa flex-1"
              >
                <MessageCircle size={17} /> ESCRIBIR POR WHATSAPP
              </a>
            </div>

            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex items-center justify-center gap-2 rounded-xl border border-gold-500/25 bg-gold-500/[0.07] px-4 py-3 text-[13px] font-semibold text-gold-300 transition-colors hover:border-gold-500/50 hover:bg-gold-500/10"
            >
              <Instagram size={16} /> Síguenos en Instagram
            </a>
          </div>

          {/* Foto real + mapa */}
          <div className="flex flex-col gap-4" data-reveal="right" data-reveal-delay="90">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src={IMG.local.src}
                srcSet={`${IMG.local.sm} 405w, ${IMG.local.src} 900w`}
                sizes="(max-width: 1023px) 100vw, 40vw"
                alt={IMG.local.alt}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover object-[center_42%] sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
              <p className="absolute inset-x-4 bottom-4 text-[13px] font-semibold text-white">
                Nuestro local — {site.address.place}, {site.address.locals}
              </p>
            </div>

            <Mapa />
          </div>
        </div>
      </div>
    </Section>
  )
}
