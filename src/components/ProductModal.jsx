import { useEffect, useRef } from 'react'
import { X, MessageCircle, ShieldCheck, Check, CircleAlert } from 'lucide-react'
import { formatCOP, waProduct } from '../utils/whatsapp'
import { img } from '../utils/images'
import { lockScroll } from '../utils/useReveal'
import { site } from '../data/site'

export default function ProductModal({ product, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!product) return
    lockScroll(true)
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  if (!product) return null
  const image = img(product.image)

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="fixed inset-0 animate-fade-in cursor-default bg-ink-950/85 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-3xl animate-fade-up overflow-hidden rounded-t-3xl border border-white/12 bg-ink-900 shadow-glow sm:rounded-3xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle del producto"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-ink-950/70 text-white backdrop-blur transition-colors hover:border-electric-500/50"
        >
          <X size={18} />
        </button>

        <div className="grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative bg-ink-950">
            <img
              src={image.src}
              alt={image.alt}
              className="h-56 w-full object-cover object-top sm:h-full sm:max-h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-ink-900/70" />
          </div>

          <div className="p-5 sm:p-7">
            <span className="eyebrow">{product.type}</span>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-500">
              {product.brand}
            </p>
            <h3
              id="product-modal-title"
              className="mt-1 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem]"
            >
              {product.model}
            </h3>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="font-display text-3xl font-extrabold text-gradient-blue">
                {formatCOP(product.price)}
              </p>
              <span className="chip">
                <ShieldCheck size={13} className="text-electric-400" />
                Garantía: {product.warranty}
              </span>
            </div>

            <ul className="mt-5 space-y-2">
              {product.features?.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-steel-300">
                  <Check size={15} className="mt-0.5 shrink-0 text-electric-400" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={waProduct(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mt-6 w-full"
            >
              <MessageCircle size={18} /> COTIZAR ESTE PRODUCTO
            </a>

            <p className="mt-4 flex items-start gap-2 text-[11.5px] leading-relaxed text-steel-500">
              <CircleAlert size={13} className="mt-0.5 shrink-0" />
              {site.priceNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
