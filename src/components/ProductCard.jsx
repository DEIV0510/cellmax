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
        <ProductVisual product={product} className="h-44 w-full" />
        {product.photo && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />
        )}
        <span
          className={`absolute left-3 top-3 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur ${accent}`}
        >
          {product.type}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-500">
          {product.brand}
        </p>
        <h3 className="mt-1 text-[15px] font-bold leading-snug tracking-tight">{product.model}</h3>

        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="font-display text-xl font-extrabold text-white">
            {formatCOP(product.price)}
          </p>
          <span className="chip shrink-0">
            <ShieldCheck size={12} className="text-electric-400" />
            {product.warranty}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12px] font-semibold text-white transition-colors hover:border-electric-500/50 hover:bg-electric-500/10"
          >
            VER DETALLE
          </button>
          <a
            href={waProduct(product)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${product.model} por WhatsApp`}
            className="flex h-[42px] w-[46px] shrink-0 items-center justify-center rounded-lg bg-[#25d366]/15 text-[#3ae37b] transition-colors hover:bg-[#25d366]/25"
          >
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    </article>
  )
}
