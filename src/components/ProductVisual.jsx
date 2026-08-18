import { img, CM_LOGO } from '../utils/images'

/**
 * Visual de la tarjeta de producto.
 * - Con fotografia real del modelo: se muestra la fotografia.
 * - Sin fotografia: marcador de posicion de marca (nunca una foto falsa del producto).
 */
export default function ProductVisual({ product, className = '' }) {
  if (product.photo) {
    const image = img(product.image)
    return (
      <img
        src={image.sm}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className={`bg-ink-900 object-cover object-top transition-transform duration-500 group-hover:scale-[1.06] ${className}`}
      />
    )
  }

  const gold = product.type === 'OLED Soft' || product.type === 'OLED Soft Premium' || product.category === 'Original iPhone'
  const isSamsung = product.brand === 'Samsung'

  return (
    <div
      className={`relative overflow-hidden bg-ink-950 ${className}`}
      role="img"
      aria-label={`${product.category} para ${product.model} — Cell Max`}
    >
      {/* Fondo tecnologico */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-tech [background-size:26px_26px] opacity-40"
      />
      <div
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[46px] ${
          gold ? 'bg-gold-500/20' : 'bg-electric-500/25'
        }`}
      />

      {/* Silueta del dispositivo con la pantalla encendida */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 170"
        className="absolute left-1/2 top-1/2 h-[122px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-[1.07]"
      >
        <defs>
          <linearGradient id={`sc-${product.id}`} x1="0" y1="0" x2="1" y2="1">
            {gold ? (
              <>
                <stop offset="0%" stopColor="#F4E2A8" stopOpacity=".9" />
                <stop offset="55%" stopColor="#D4AF37" stopOpacity=".5" />
                <stop offset="100%" stopColor="#0A0E18" stopOpacity=".9" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#9CCBFF" stopOpacity=".9" />
                <stop offset="55%" stopColor="#0A84FF" stopOpacity=".55" />
                <stop offset="100%" stopColor="#0A0E18" stopOpacity=".9" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Chasis */}
        <rect
          x="8"
          y="4"
          width="104"
          height="162"
          rx={isSamsung ? 12 : 18}
          fill="#05070C"
          stroke={gold ? 'rgba(212,175,55,.55)' : 'rgba(107,178,255,.55)'}
          strokeWidth="1.6"
        />
        {/* Pantalla */}
        <rect
          x="13"
          y="9"
          width="94"
          height="152"
          rx={isSamsung ? 8 : 14}
          fill={`url(#sc-${product.id})`}
        />
        {/* Notch / isla dinamica (solo iPhone) */}
        {!isSamsung && (
          <rect x="45" y="12" width="30" height="7" rx="3.5" fill="#05070C" opacity=".85" />
        )}
        {/* Camara centrada (Samsung) */}
        {isSamsung && <circle cx="60" cy="16" r="3" fill="#05070C" opacity=".85" />}
        {/* Reflejo */}
        <path d="M18 150 L96 22 L104 30 L26 158 Z" fill="#fff" opacity=".07" />
      </svg>

      {/* Linea de escaneo */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-x-0 top-0 h-10 animate-scan bg-gradient-to-b from-transparent to-transparent ${
            gold ? 'via-gold-400/10' : 'via-electric-400/10'
          }`}
        />
      </div>

      {/* Marca de agua */}
      <img
        src={CM_LOGO}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute bottom-2.5 right-3 h-7 w-auto opacity-25"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-900 to-transparent"
      />
    </div>
  )
}
