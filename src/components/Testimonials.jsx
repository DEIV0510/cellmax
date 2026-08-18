import { Quote, Star, Instagram, MessageCircle } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { site } from '../data/site'
import { wa, MESSAGES } from '../utils/whatsapp'

/**
 * Seccion preparada para reseñas reales.
 * Cuando el negocio entregue testimonios verificados, agregarlos a este arreglo:
 *   { name: 'Nombre', text: 'Reseña...', device: 'iPhone 13' }
 * Si el arreglo tiene elementos, se muestran las tarjetas automaticamente.
 */
export const testimonials = []

export default function Testimonials() {
  const hasReviews = testimonials.length > 0

  return (
    <Section id="testimonios">
      <div className="container">
        <SectionHead
          eyebrow="Clientes"
          icon={Quote}
          title="Experiencias de nuestros clientes"
          sub={
            hasReviews
              ? 'Lo que dicen quienes ya confiaron su equipo a Cell Max.'
              : undefined
          }
        />

        {hasReviews ? (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <article
                key={t.name + i}
                data-reveal
                data-reveal-delay={i * 80}
                className="card-premium p-6"
              >
                <Quote size={22} className="text-electric-400/60" />
                <p className="mt-4 text-[14px] leading-relaxed text-steel-300">{t.text}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                  <div>
                    <p className="text-[13.5px] font-semibold text-white">{t.name}</p>
                    {t.device && <p className="text-[12px] text-steel-500">{t.device}</p>}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            className="card-premium card-gold mx-auto mt-12 max-w-2xl p-8 text-center sm:p-10"
            data-reveal="zoom"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/12 text-gold-300">
              <Quote size={24} />
            </span>
            <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight sm:text-2xl">
              Muy pronto podrás conocer las experiencias de nuestros clientes.
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-steel-400">
              Estamos recopilando reseñas reales de quienes ya confiaron su equipo a Cell Max.
              Mientras tanto, puedes ver nuestro trabajo en Instagram o escribirnos directamente.
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Instagram size={17} /> VER INSTAGRAM
              </a>
              <a
                href={wa(MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                <MessageCircle size={17} /> ESCRÍBENOS
              </a>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
