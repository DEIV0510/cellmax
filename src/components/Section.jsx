/** Encabezado de seccion reutilizable. */
export function SectionHead({ eyebrow, title, sub, align = 'center', icon: Icon }) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto text-center' : 'text-left'} max-w-3xl`}
      data-reveal
    >
      {eyebrow && (
        <span className="eyebrow">
          {Icon && <Icon size={13} />}
          {eyebrow}
        </span>
      )}
      <h2 className="section-title mt-4">{title}</h2>
      {sub && (
        <p className={`section-sub mt-4 ${align === 'center' ? '' : 'mx-0'}`}>{sub}</p>
      )}
    </div>
  )
}

/** Contenedor de seccion con espaciado consistente. */
export default function Section({ id, children, className = '', tone = 'default' }) {
  const bg =
    tone === 'alt'
      ? 'bg-ink-900/45'
      : tone === 'deep'
        ? 'bg-gradient-to-b from-ink-950 via-ink-900/60 to-ink-950'
        : ''
  return (
    <section id={id} className={`relative scroll-mt-20 py-11 sm:py-20 lg:py-24 ${bg} ${className}`}>
      {children}
    </section>
  )
}
