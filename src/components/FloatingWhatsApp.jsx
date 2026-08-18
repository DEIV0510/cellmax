import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { wa, MESSAGES } from '../utils/whatsapp'

export default function FloatingWhatsApp() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-[76px] right-4 z-40 flex flex-col items-end gap-2.5 lg:bottom-6 lg:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-900/85 text-steel-300 backdrop-blur-xl transition-all duration-300 hover:border-electric-500/50 hover:text-white ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp size={18} />
      </button>

      <a
        href={wa(MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir a Cell Max por WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,.75)] transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg,#25d366 0%,#128c4a 100%)' }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse-ring rounded-2xl bg-[#25d366]/40"
        />
        <MessageCircle size={25} className="relative" />
        <span className="pointer-events-none absolute right-[calc(100%+10px)] hidden whitespace-nowrap rounded-lg border border-white/10 bg-ink-900/95 px-3 py-2 text-[12.5px] font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 lg:block">
          Cotiza por WhatsApp
        </span>
      </a>
    </div>
  )
}
