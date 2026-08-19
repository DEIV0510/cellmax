import { useMemo, useState } from 'react'
import { Search, X, SearchX, MonitorSmartphone, MessageCircle } from 'lucide-react'
import Section, { SectionHead } from './Section'
import ProductCard from './ProductCard'
import { products, CATEGORIES } from '../data/products'
import { matchesQuery } from '../utils/search'
import { site } from '../data/site'
import { wa, MESSAGES } from '../utils/whatsapp'

const BRANDS = [
  { id: 'all', label: 'Todas' },
  { id: 'Apple', label: 'iPhone' },
  { id: 'Samsung', label: 'Samsung' },
]

const TYPES = [
  { id: 'all', label: 'Todos' },
  { id: CATEGORIES.INCELL, label: 'INCELL' },
  { id: CATEGORIES.OLED, label: 'OLED Soft' },
  { id: CATEGORIES.OLED_PREMIUM, label: 'Premium' },
  { id: CATEGORIES.IPHONE_ORIGINAL, label: 'Originales iPhone' },
  { id: CATEGORIES.SAMSUNG, label: 'Originales Samsung' },
  { id: CATEGORIES.TAPAS, label: 'Tapas' },
]

// En movil se muestran menos resultados de entrada para no alargar el scroll.
const STEP = typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : 12

export default function ScreenFinder({ onOpenProduct }) {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('all')
  const [type, setType] = useState('all')
  const [limit, setLimit] = useState(STEP)

  const results = useMemo(() => {
    return products.filter(
      (p) =>
        (brand === 'all' || p.brand === brand) &&
        (type === 'all' || p.type === type) &&
        matchesQuery(p, query)
    )
  }, [query, brand, type])

  const reset = () => {
    setQuery('')
    setBrand('all')
    setType('all')
    setLimit(STEP)
  }

  const onFilter = (setter) => (value) => {
    setter(value)
    setLimit(STEP)
  }

  const hasFilters = query || brand !== 'all' || type !== 'all'

  return (
    <Section id="pantallas" tone="alt">
      <div className="container">
        <SectionHead
          eyebrow="Encuentra tu modelo"
          icon={MonitorSmartphone}
          title="Pantallas para tu celular"
          sub="Encuentra la pantalla adecuada para tu dispositivo."
        />

        {/* Buscador */}
        <div className="mx-auto mt-10 max-w-3xl" data-reveal data-reveal-delay="60">
          <label htmlFor="buscador" className="sr-only">
            ¿Qué pantalla estás buscando?
          </label>
          <div className="relative">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-steel-400"
            />
            <input
              id="buscador"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setLimit(STEP)
              }}
              placeholder="Busca tu modelo, por ejemplo: iPhone 13 Pro Max"
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.07] pl-12 pr-12 text-[15px] text-white placeholder:text-steel-500 backdrop-blur-xl transition-colors focus:border-electric-500/60 focus:bg-white/[0.06] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-steel-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Filtros */}
          <div className="mt-5 space-y-3">
            <FilterRow label="Marca" options={BRANDS} value={brand} onChange={onFilter(setBrand)} />
            <FilterRow label="Tipo" options={TYPES} value={type} onChange={onFilter(setType)} />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[13px] text-steel-400" aria-live="polite">
              <span className="font-semibold text-white">{results.length}</span>{' '}
              {results.length === 1 ? 'referencia encontrada' : 'referencias encontradas'}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[12px] font-medium text-steel-300 transition-colors hover:border-electric-500/40 hover:text-white"
              >
                <X size={13} /> Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Resultados */}
        {results.length > 0 ? (
          <>
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {results.slice(0, limit).map((p, i) => (
                <div key={p.id} data-reveal data-reveal-delay={(i % 4) * 60}>
                  <ProductCard product={p} onOpen={onOpenProduct} />
                </div>
              ))}
            </div>

            {results.length > limit && (
              <div className="mt-9 text-center">
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + STEP)}
                  className="btn btn-ghost"
                >
                  VER MÁS REFERENCIAS ({results.length - limit})
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            className="card-premium mx-auto mt-10 max-w-lg p-8 text-center"
            data-reveal="fade"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-500/10 text-electric-300">
              <SearchX size={24} />
            </span>
            <h3 className="mt-4 text-lg font-bold">No encontramos esa referencia</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-steel-400">
              Escríbenos por WhatsApp y te confirmamos la disponibilidad de tu modelo.
            </p>
            <a
              href={wa(MESSAGES.availability)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mt-5 w-full sm:w-auto"
            >
              <MessageCircle size={17} /> CONSULTAR DISPONIBILIDAD
            </a>
          </div>
        )}

        <p className="mx-auto mt-9 max-w-2xl text-center text-[12px] leading-relaxed text-steel-500">
          {site.priceNote}
        </p>
      </div>
    </Section>
  )
}

function FilterRow({ label, options, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-12 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold transition-all duration-200 active:scale-95 ${
                active
                  ? 'border-electric-500/60 bg-electric-500/15 text-white shadow-[0_0_20px_-6px_rgba(10,132,255,.7)]'
                  : 'border-white/10 bg-white/[0.03] text-steel-400 hover:border-white/25 hover:text-white'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
