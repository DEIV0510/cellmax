import { Home, LayoutGrid, MessageCircle, MapPin } from 'lucide-react'
import { wa, MESSAGES } from '../utils/whatsapp'

const TABS = [
  { href: '#inicio', label: 'Inicio', icon: Home },
  { href: '#catalogo', label: 'Catálogo', icon: LayoutGrid },
  { href: wa(MESSAGES.general), label: 'WhatsApp', icon: MessageCircle, external: true },
  { href: '#ubicacion', label: 'Ubicación', icon: MapPin },
]

/** Barra inferior fija: solo en smartphones. */
export default function MobileTabBar() {
  return (
    <nav
      aria-label="Navegación rápida"
      className="fixed inset-x-0 bottom-0 z-[45] border-t border-white/10 bg-ink-950/90 pb-safe backdrop-blur-2xl lg:hidden"
    >
      <ul className="grid grid-cols-4">
        {TABS.map(({ href, label, icon: Icon, external }) => {
          const isWa = !!external
          const props = external
            ? { href, target: '_blank', rel: 'noopener noreferrer' }
            : { href }
          return (
            <li key={label}>
              <a
                {...props}
                className={`flex h-16 flex-col items-center justify-center gap-1 transition-colors active:bg-white/[0.06] ${
                  isWa ? 'text-[#3ae37b]' : 'text-steel-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10.5px] font-semibold tracking-wide">{label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
