import { MessageCircle, ShieldCheck } from 'lucide-react'
import { formatCOP, waProduct } from '../utils/whatsapp'
import ProductVisual from './ProductVisual'

const ACCENT = {
  'INCELL Premium HD Plus': 'text-electric-300 border-electric-500/30 bg-electric-500/10',
  'OLED Soft': 'text-gold-300 border-gold-500/30 bg-gold-500/10',
  'OLED Soft Premium': 'text-gold-200 border-gold-400/40 bg-gold-500/15',
  'Original Samsung': 'text-electric-200 border-electric-400/30 bg-electric-500/10',
  'Original iPhone': 'text-gold-300 border-gold-500/30 bg-gold-500/10',
  'Tapas iPhone': 'text-steel-300 border-white/15 bg-white/[0.06]',
}

// Etiqueta corta para la tarjeta compacta de movil
const SHORT = {
  'INCELL Premium HD Plus': 'INCELL',
  'OLED Soft': 'OLED SOFT',
  'OLED Soft Premium': 'OLED PREMIUM',
  'Original Samsung': 'ORIGINAL',
  'Original iPhone': 'ORIGINAL',
  'Tapas iPhone': 'TAPA',
}

export default function ProductCard({ product, onOpen }) {
  const accent = ACCENT[product.type] || ACCENT[product.category] || ACCENT['Tapas iPhone']

  return (
    <article className="card-premium group flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block overflow-hidden text-left"
        aria-label={`Ver detalle de ${product.model}`}
      >
        <ProductVisual product={product} className="h-28 w-full sm:h-44" />
        {product.photo && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />
        )}
        <span
          className={`absolute left-2 top-2 rounded-md border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur sm:left-3 sm:top-3 sm:rounded-lg sm:px-2 sm:py-1 sm:text-[10px] ${accent}`}
        >
          <span className="sm:hidden">{SHORT[product.type] || product.type}</span>
          <span className="hidden sm:inline">{product.type}</span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-500 sm:block">
          {product.brand}
        </p>
        <h3 className="text-[13px] font-bold leading-snug tracking-tight sm:mt-1 sm:text-[15px]">
          {product.model}
        </h3>

        <div className="mt-2 flex items-end justify-between gap-1.5 sm:mt-3 sm:gap-2">
          <p className="font-display text-[17px] font-extrabold text-white sm:text-xl">
            {formatCOP(product.price)}
          </p>
          <span className="chip shrink-0 !px-1.5 !text-[10px] sm:!px-2.5 sm:!text-[11px]">
            <ShieldCheck size={11} className="text-electric-400" />
            {product.warranty}
          </span>
        </div>

        <div className="mt-3 flex gap-2 sm:mt-4">
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="hidden flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12px] font-semibold text-white transition-colors hover:border-electric-500/50 hover:bg-electric-500/10 sm:block"
          >
            VER DETALLE
          </button>
          <a
            href={waProduct(product)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${product.model} por WhatsApp`}
            className="flex h-[40px] w-full shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#25d366]/15 text-[12px] font-semibold text-[#3ae37b] transition-colors hover:bg-[#25d366]/25 sm:h-[42px] sm:w-[46px]"
          >
            <MessageCircle size={16} />
            <span className="sm:hidden">Cotizar</span>
          </a>
        </div>
      </div>
    </article>
  )
}
