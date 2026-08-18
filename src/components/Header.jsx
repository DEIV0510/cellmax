import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle, Instagram } from 'lucide-react'
import { CM_LOGO } from '../utils/images'
import { wa, MESSAGES } from '../utils/whatsapp'
import { site } from '../data/site'
import { lockScroll } from '../utils/useReveal'

const NAV = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#pantallas', label: 'Pantallas' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Resalta el enlace de la seccion visible
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink-950/85 backdrop-blur-xl shadow-[0_10px_40px_-24px_rgba(0,0,0,1)]'
          : 'border-b border-transparent bg-gradient-to-b from-ink-950/80 to-transparent'
      }`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-[72px]'
          }`}
        >
          <a
            href="#inicio"
            className="flex min-h-[44px] shrink-0 items-center gap-2.5"
            aria-label="Cell Max — Inicio"
          >
            <img
              src={CM_LOGO}
              alt="Cell Max"
              width={44}
              height={38}
              className="h-9 w-auto drop-shadow-[0_0_14px_rgba(10,132,255,0.35)]"
            />
            <span className="hidden text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] text-steel-400 sm:block">
              Apple
              <br />
              Repair
            </span>
          </a>

          {/* Navegacion desktop */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegación principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                  active === item.href
                    ? 'text-white'
                    : 'text-steel-400 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-electric-500 to-gold-500 transition-transform duration-300 ${
                    active === item.href ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Cell Max"
              className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-steel-300 transition-colors hover:border-gold-500/40 hover:text-gold-300 md:flex"
            >
              <Instagram size={18} />
            </a>
            <a
              href={wa(MESSAGES.quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa !tracking-normal !px-4 text-[12.5px] sm:!px-5 sm:text-[13px]"
            >
              <MessageCircle size={17} />
              <span className="hidden sm:inline">COTIZAR POR WHATSAPP</span>
              <span className="sm:hidden">WHATSAPP</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-electric-500/50 lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu movil. Cerrado: fuera del arbol de accesibilidad y del orden de tabulacion. */}
      <div
        aria-hidden={!open}
        className={`overflow-hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-2xl transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? 'max-h-[520px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <nav className="container flex flex-col gap-1 py-4" aria-label="Navegación móvil">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              style={{ transitionDelay: open ? `${i * 35}ms` : '0ms' }}
              className={`rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 text-[15px] font-medium text-steel-200 transition-all duration-300 active:scale-[0.98] ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              } ${active === item.href ? 'border-electric-500/40 text-white' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-gold-500/25 bg-gold-500/[0.08] px-4 py-3.5 text-[15px] font-semibold text-gold-300"
          >
            <Instagram size={18} /> Síguenos en Instagram
          </a>
        </nav>
      </div>
    </header>
  )
}
