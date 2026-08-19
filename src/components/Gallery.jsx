import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Images, Expand } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { gallery } from '../data/gallery'
import { img } from '../utils/images'
import Imagen from './Imagen'
import { lockScroll } from '../utils/useReveal'

export default function Gallery() {
  const [index, setIndex] = useState(-1)
  const open = index >= 0

  const close = useCallback(() => setIndex(-1), [])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + gallery.length) % gallery.length),
    []
  )
  const next = useCallback(() => setIndex((i) => (i + 1) % gallery.length), [])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open, close, prev, next])

  const current = open ? img(gallery[index].key) : null

  return (
    <Section id="nosotros" tone="alt">
      <div className="container">
        <SectionHead
          eyebrow="Galería"
          icon={Images}
          title="Conoce Cell Max"
          sub="Nuestro local, nuestras pantallas y el material real de Cell Max en Cúcuta."
        />

        <div className="mt-9 grid auto-rows-[132px] grid-flow-row-dense grid-cols-2 gap-2.5 sm:mt-12 sm:auto-rows-[220px] sm:gap-3 lg:grid-cols-4">
          {gallery.map((item, i) => {
            const image = img(item.key)
            const span =
              item.span === 'tall'
                ? 'row-span-2'
                : item.span === 'wide'
                  ? 'col-span-2'
                  : ''
            return (
              <button
                key={item.key + i}
                type="button"
                onClick={() => setIndex(i)}
                data-reveal="zoom"
                data-reveal-delay={(i % 4) * 70}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950 text-left transition-all duration-300 hover:border-electric-500/45 ${span}`}
                aria-label={`Ampliar: ${item.caption}`}
              >
                <Imagen
                  fuente={image}
                  pequena
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />

                <span className="absolute left-2.5 top-2.5 rounded-lg border border-white/15 bg-ink-950/80 px-2 py-1 text-[10.5px] font-bold uppercase tracking-wide text-steel-200 sm:left-3 sm:top-3">
                  {item.tag}
                </span>

                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-ink-950/80 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={14} />
                </span>

                <p className="absolute inset-x-2.5 bottom-2.5 line-clamp-1 text-[11.5px] font-semibold leading-snug text-white sm:inset-x-3 sm:bottom-3 sm:line-clamp-2 sm:text-[12.5px]">
                  <span className="sm:hidden">{item.short || item.caption}</span>
                  <span className="hidden sm:inline">{item.caption}</span>
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={gallery[index].caption}
        >
          <button
            type="button"
            aria-label="Cerrar galería"
            onClick={close}
            className="absolute inset-0 animate-fade-in cursor-default bg-ink-950/90 backdrop-blur-lg"
          />

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-ink-900/80 text-white backdrop-blur transition-colors hover:border-electric-500/50"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-ink-900/80 text-white backdrop-blur transition-colors hover:border-electric-500/50 sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-ink-900/80 text-white backdrop-blur transition-colors hover:border-electric-500/50 sm:right-6"
          >
            <ChevronRight size={22} />
          </button>

          <figure className="relative z-[1] max-h-full w-full max-w-4xl animate-fade-up">
            <Imagen
              fuente={current}
              className="mx-auto max-h-[76vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-glow"
            />
            <figcaption className="mt-4 text-center text-[13.5px] text-steel-300">
              {gallery[index].caption}
              <span className="ml-2 text-steel-500">
                {index + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  )
}
