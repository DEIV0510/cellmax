import { useState } from 'react'
import { MessageCircle, ShieldCheck, Check, LayoutGrid, ChevronDown } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { catalogBlocks, products } from '../data/products'
import { formatCOP, waProduct } from '../utils/whatsapp'
import { img } from '../utils/images'
import { site } from '../data/site'

const VISIBLE = 8

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

        <div className="mt-12 space-y-14">
          {catalogBlocks.map((block) => (
            <CatalogBlock key={block.id} block={block} onOpenProduct={onOpenProduct} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-[12.5px] leading-relaxed text-steel-500">
          {site.priceNote}
        </p>
      </div>
    </Section>
  )
}

function CatalogBlock({ block, onOpenProduct }) {
  const [expanded, setExpanded] = useState(false)
  const items = products.filter((p) => p.category === block.category)
  const shown = expanded ? items : items.slice(0, VISIBLE)
  const gold = block.accent === 'gold'
  const image = img(block.image)

  return (
    <article
      id={`cat-${block.id}`}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent"
      data-reveal
    >
      <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        {/* Encabezado de categoria */}
        <div className="relative border-b border-white/[0.07] p-6 lg:border-b-0 lg:border-r lg:p-7">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 opacity-40 ${
              gold
                ? 'bg-[radial-gradient(80%_60%_at_10%_0%,rgba(212,175,55,.18),transparent)]'
                : 'bg-[radial-gradient(80%_60%_at_10%_0%,rgba(10,132,255,.2),transparent)]'
            }`}
          />
          <div className="relative">
            <div className="mb-5 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={image.sm}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-44 w-full bg-ink-950 object-cover object-top lg:h-52"
              />
            </div>

            <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight sm:text-[1.4rem]">
              {block.title}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-steel-400">{block.desc}</p>

            <span
              className={`mt-4 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-bold ${
                gold
                  ? 'border-gold-500/35 bg-gold-500/10 text-gold-300'
                  : 'border-electric-500/35 bg-electric-500/10 text-electric-300'
              }`}
            >
              <ShieldCheck size={14} /> {block.warranty}
            </span>

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

        {/* Tabla (desktop) / tarjetas (movil) */}
        <div className="p-4 sm:p-6">
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
                    className="group cursor-pointer bg-white/[0.03] transition-colors hover:bg-electric-500/[0.09]"
                    onClick={() => onOpenProduct(p)}
                  >
                    <td className="rounded-l-xl border-y border-l border-white/[0.07] px-4 py-3 text-[14px] font-medium text-white group-hover:border-electric-500/25">
                      {p.model}
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
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Cotizar ${p.model} por WhatsApp`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#25d366]/12 px-3 py-2 text-[12px] font-semibold text-[#3ae37b] transition-colors hover:bg-[#25d366]/25"
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
          <div className="grid gap-2.5 sm:grid-cols-2 md:hidden">
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
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#25d366]/15 px-3.5 py-2 text-[12px] font-semibold text-[#3ae37b]"
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
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:border-electric-500/45 hover:bg-electric-500/10"
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
