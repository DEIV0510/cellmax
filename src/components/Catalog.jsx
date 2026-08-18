import { useState } from 'react'
import { MessageCircle, ShieldCheck, Check, LayoutGrid, ChevronDown } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { catalogBlocks, products } from '../data/products'
import { formatCOP, waProduct } from '../utils/whatsapp'
import { img } from '../utils/images'
import { site } from '../data/site'
import { useIsDesktop } from '../utils/useMediaQuery'

const VISIBLE = 8

/**
 * En movil la cabecera de categoria es el control del acordeon.
 * En escritorio todas las categorias van desplegadas, asi que es un encabezado
 * estatico: no tiene sentido dejar un boton enfocable que no hace nada.
 */
function Cabecera({ isDesktop, open, panelId, onToggle, children }) {
  if (isDesktop) return <div className="flex items-start justify-between gap-3">{children}</div>
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={panelId}
      className="flex w-full items-start justify-between gap-3 text-left"
    >
      {children}
    </button>
  )
}

export default function Catalog({ onOpenProduct }) {
  return (
    <Section id="catalogo">
      <div className="container">
        <SectionHead
          eyebrow="Catálogo completo"
          icon={LayoutGrid}
          title="Precios por categoría"
          sub="Cada categoría con su precio, su garantía y sus características. Cotiza cualquier referencia directamente por WhatsApp."
        />

        <div className="mt-10 space-y-3 sm:mt-12 lg:space-y-14">
          {catalogBlocks.map((block, i) => (
            <CatalogBlock
              key={block.id}
              block={block}
              onOpenProduct={onOpenProduct}
              defaultOpen={i === 0}
            />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-[12.5px] leading-relaxed text-steel-500">
          {site.priceNote}
        </p>
      </div>
    </Section>
  )
}

function CatalogBlock({ block, onOpenProduct, defaultOpen = false }) {
  const [expanded, setExpanded] = useState(false)
  // En movil cada categoria es un acordeon: solo la primera abre por defecto.
  // En escritorio hay sitio de sobra, asi que se muestran todas desplegadas.
  const isDesktop = useIsDesktop()
  const [openMobile, setOpenMobile] = useState(defaultOpen)
  const open = isDesktop || openMobile
  const items = products.filter((p) => p.category === block.category)
  const shown = expanded ? items : items.slice(0, VISIBLE)
  const gold = block.accent === 'gold'
  const image = img(block.image)
  const panelId = `cat-panel-${block.id}`

  return (
    <article
      id={`cat-${block.id}`}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent"
      data-reveal
    >
      <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        {/* Encabezado de categoria */}
        <div className="relative border-b border-white/[0.07] p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 opacity-40 ${
              gold
                ? 'bg-[radial-gradient(80%_60%_at_10%_0%,rgba(212,175,55,.18),transparent)]'
                : 'bg-[radial-gradient(80%_60%_at_10%_0%,rgba(10,132,255,.2),transparent)]'
            }`}
          />
          <div className="relative">
            {/* La imagen del listado solo en pantallas grandes: en movil alarga mucho */}
            <div className="mb-5 hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
              <img
                src={image.sm}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-44 w-full bg-ink-950 object-cover object-top lg:h-52"
              />
            </div>

            {/* Cabecera: boton de acordeon en movil, encabezado estatico en escritorio */}
            <Cabecera
              isDesktop={isDesktop}
              open={open}
              panelId={panelId}
              onToggle={() => setOpenMobile((v) => !v)}
            >
              <span className="min-w-0">
                <h3 className="font-display text-[17px] font-extrabold leading-tight tracking-tight sm:text-xl lg:text-[1.4rem]">
                  {block.title}
                </h3>
                <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11.5px] font-bold sm:px-3 sm:py-1.5 sm:text-[12px] ${
                      gold
                        ? 'border-gold-500/35 bg-gold-500/10 text-gold-300'
                        : 'border-electric-500/35 bg-electric-500/10 text-electric-300'
                    }`}
                  >
                    <ShieldCheck size={13} /> {block.warranty}
                  </span>
                  <span className="text-[11.5px] text-steel-500">
                    {items.length} referencias
                  </span>
                </span>
              </span>
              {!isDesktop && (
                <ChevronDown
                  size={20}
                  className={`mt-1 shrink-0 text-steel-400 transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              )}
            </Cabecera>

            <div className={open ? 'block' : 'hidden'}>
              <p className="mt-3 text-[13px] leading-relaxed text-steel-400 sm:text-[13.5px]">
                {block.desc}
              </p>

              <ul className="mt-4 space-y-1.5">
                {block.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12.5px] text-steel-400">
                    <Check
                      size={13}
                      className={`mt-0.5 shrink-0 ${gold ? 'text-gold-400' : 'text-electric-400'}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabla (desktop) / tarjetas (movil) */}
        <div id={panelId} className={`${open ? 'block' : 'hidden'} p-4 sm:p-6`}>
          {/* Desktop */}
          <div className="hidden md:block">
            <table className="w-full border-separate border-spacing-y-1.5">
              <caption className="sr-only">{block.title} — modelos y precios</caption>
              <thead>
                <tr className="text-left">
                  <th
                    scope="col"
                    className="px-4 pb-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel-500"
                  >
                    Modelo
                  </th>
                  <th
                    scope="col"
                    className="px-4 pb-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel-500"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-4 pb-2 text-right text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel-500"
                  >
                    Cotizar
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.map((p) => (
                  <tr
                    key={p.id}
                    className="group bg-white/[0.03] transition-colors hover:bg-electric-500/[0.09]"
                  >
                    <td className="rounded-l-xl border-y border-l border-white/[0.07] p-0 group-hover:border-electric-500/25">
                      {/* Boton en vez de onClick sobre la fila: enfocable y accionable con teclado */}
                      <button
                        type="button"
                        onClick={() => onOpenProduct(p)}
                        aria-label={`Ver detalle de ${p.model}`}
                        className="w-full rounded-l-xl px-4 py-3 text-left text-[14px] font-medium text-white"
                      >
                        {p.model}
                      </button>
                    </td>
                    <td
                      className={`border-y border-white/[0.07] px-4 py-3 font-display text-[15px] font-extrabold group-hover:border-electric-500/25 ${
                        gold ? 'text-gold-300' : 'text-electric-300'
                      }`}
                    >
                      {formatCOP(p.price)}
                    </td>
                    <td className="rounded-r-xl border-y border-r border-white/[0.07] px-4 py-2 text-right group-hover:border-electric-500/25">
                      <a
                        href={waProduct(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Cotizar ${p.model} por WhatsApp`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#25d366]/10 px-3 py-2 text-[12px] font-semibold text-[#3ae37b] transition-colors hover:bg-[#25d366]/25"
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Movil: la tabla se convierte en tarjetas */}
          <div className="grid grid-cols-2 gap-2.5 md:hidden">
            {shown.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3.5"
              >
                <button
                  type="button"
                  onClick={() => onOpenProduct(p)}
                  className="block w-full text-left"
                >
                  <p className="text-[14px] font-semibold leading-snug text-white">{p.model}</p>
                  <p
                    className={`mt-1.5 font-display text-lg font-extrabold ${
                      gold ? 'text-gold-300' : 'text-electric-300'
                    }`}
                  >
                    {formatCOP(p.price)}
                  </p>
                </button>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="chip">
                    <ShieldCheck size={11} /> {p.warranty}
                  </span>
                  <a
                    href={waProduct(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cotizar ${p.model} por WhatsApp`}
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg bg-[#25d366]/15 px-3.5 py-2 text-[12px] font-semibold text-[#3ae37b]"
                  >
                    <MessageCircle size={14} /> Cotizar
                  </a>
                </div>
              </div>
            ))}
          </div>

          {items.length > VISIBLE && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:border-electric-500/45 hover:bg-electric-500/10"
            >
              {expanded ? 'Ver menos' : `Ver ${items.length - VISIBLE} referencias más`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
