import { MessageCircle, Instagram, MapPin, Phone } from 'lucide-react'
import { CM_LOGO } from '../utils/images'
import { site, mapsSearchUrl } from '../data/site'
import { wa, MESSAGES } from '../utils/whatsapp'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#pantallas', label: 'Pantallas' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
]

const SOCIAL = [
  {
    href: wa(MESSAGES.general),
    label: 'WhatsApp',
    icon: MessageCircle,
    hover: 'hover:border-[#25d366]/50 hover:text-[#3ae37b]',
  },
  {
    href: site.instagramUrl,
    label: 'Instagram',
    icon: Instagram,
    hover: 'hover:border-gold-500/50 hover:text-gold-300',
  },
  {
    href: mapsSearchUrl,
    label: 'Ubicación',
    icon: MapPin,
    hover: 'hover:border-electric-500/50 hover:text-electric-300',
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-ink-950 mb-safe-tab lg:mb-0">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          {/* Marca */}
          <div>
            <img src={CM_LOGO} alt="Cell Max" width={72} height={63} className="h-14 w-auto" />
            <p className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight text-white">
              {site.name}
            </p>
            <p className="mt-1 text-[13px] text-steel-400">
              {site.tagline} / Phone Repair
            </p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-steel-500">
              Reparación de dispositivos, pantallas premium, repuestos y accesorios en{' '}
              {site.address.cityAccented}.
            </p>

            <div className="mt-5 flex gap-2">
              {SOCIAL.map(({ href, label, icon: Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-steel-300 transition-colors ${hover}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegacion */}
          <nav aria-label="Enlaces del pie de página">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-steel-500">
              Navegación
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-block py-1 text-[14px] text-steel-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-steel-500">
              Contacto
            </h2>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={wa(MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25d366]/10 text-[#3ae37b]">
                    <Phone size={15} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-steel-500">
                      WhatsApp
                    </span>
                    <span className="text-[15px] font-semibold text-white transition-colors group-hover:text-[#3ae37b]">
                      {site.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric-500/10 text-electric-300">
                    <MapPin size={15} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-steel-500">
                      Ubicación
                    </span>
                    <span className="text-[13.5px] leading-snug text-steel-300 transition-colors group-hover:text-white">
                      {site.address.full}
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-300">
                    <Instagram size={15} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-steel-500">
                      Instagram
                    </span>
                    <span className="text-[14px] font-medium text-steel-300 transition-colors group-hover:text-gold-300">
                      {site.instagramUser}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-[12px] text-steel-500">
            © {new Date().getFullYear()} {site.name} — {site.tagline}. Todos los derechos reservados.
          </p>
          <p className="text-[11.5px] text-steel-400">{site.priceNote}</p>
        </div>
      </div>
    </footer>
  )
}
