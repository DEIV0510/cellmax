import { useState } from 'react'
import { MessageCircle, ClipboardList, User, Smartphone, Wrench, PenLine } from 'lucide-react'
import Section, { SectionHead } from './Section'
import { wa } from '../utils/whatsapp'
import { site } from '../data/site'

const BRANDS = ['Apple / iPhone', 'Samsung', 'Otra marca']
const SERVICES = [
  'Cambio de pantalla',
  'Pantalla INCELL Premium HD Plus',
  'Pantalla OLED Soft',
  'Pantalla original de Samsung',
  'Reparación / servicio técnico',
  'Repuesto',
  'Accesorio',
  'Otro',
]

const FIELD =
  'h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-[14.5px] text-white placeholder:text-steel-500 transition-colors focus:border-electric-500/60 focus:bg-white/[0.06] focus:outline-none'

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: '',
    brand: BRANDS[0],
    model: '',
    service: SERVICES[0],
    message: '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const buildMessage = () => {
    const lines = [
      'Hola Cell Max, quiero solicitar una cotización.',
      '',
      form.name.trim() && `Nombre: ${form.name.trim()}`,
      `Marca: ${form.brand}`,
      form.model.trim() && `Modelo: ${form.model.trim()}`,
      `Servicio: ${form.service}`,
      form.message.trim() && `Mensaje: ${form.message.trim()}`,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    window.open(wa(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="contacto" tone="deep">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
          <div data-reveal="left">
            <SectionHead
              align="left"
              eyebrow="Cotización rápida"
              icon={ClipboardList}
              title="Solicita tu cotización"
              sub="Completa los datos y te abrimos WhatsApp con el mensaje listo para enviar. Sin formularios eternos, sin esperas."
            />

            <ul className="mt-8 space-y-3">
              {[
                'Respuesta directa por WhatsApp',
                'Te confirmamos disponibilidad y precio',
                'Asesoría para elegir el tipo de pantalla',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-steel-300">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric-500/10 text-electric-300">
                    <MessageCircle size={15} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                WhatsApp directo
              </p>
              <a
                href={wa()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-[40px] items-center font-display text-2xl font-extrabold text-gradient-blue"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="card-premium p-6 sm:p-7"
            data-reveal="right"
            data-reveal-delay="90"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="q-name"
                  className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-steel-300"
                >
                  <User size={13} className="text-electric-400" /> Nombre
                </label>
                <input
                  id="q-name"
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  className={FIELD}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="q-brand"
                    className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-steel-300"
                  >
                    <Smartphone size={13} className="text-electric-400" /> Marca
                  </label>
                  <select id="q-brand" value={form.brand} onChange={set('brand')} className={FIELD}>
                    {BRANDS.map((b) => (
                      <option key={b} value={b} className="bg-ink-900">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="q-model"
                    className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-steel-300"
                  >
                    <Smartphone size={13} className="text-electric-400" /> Modelo
                  </label>
                  <input
                    id="q-model"
                    type="text"
                    value={form.model}
                    onChange={set('model')}
                    placeholder="Ej: iPhone 13 Pro Max"
                    className={FIELD}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="q-service"
                  className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-steel-300"
                >
                  <Wrench size={13} className="text-electric-400" /> Servicio que necesitas
                </label>
                <select
                  id="q-service"
                  value={form.service}
                  onChange={set('service')}
                  className={FIELD}
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-ink-900">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="q-message"
                  className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-steel-300"
                >
                  <PenLine size={13} className="text-electric-400" /> Mensaje
                </label>
                <textarea
                  id="q-message"
                  rows={3}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Cuéntanos qué le pasa a tu equipo..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14.5px] text-white placeholder:text-steel-500 transition-colors focus:border-electric-500/60 focus:bg-white/[0.06] focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-wa mt-6 w-full">
              <MessageCircle size={18} /> COTIZAR POR WHATSAPP
            </button>

            <p className="mt-3 text-center text-[11.5px] leading-relaxed text-steel-500">
              Al enviar se abre WhatsApp con tu información. No guardamos tus datos.
            </p>
          </form>
        </div>
      </div>
    </Section>
  )
}
