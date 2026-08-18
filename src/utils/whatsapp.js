import { site } from '../data/site'

/** Construye un enlace de WhatsApp con mensaje predefinido. */
export const wa = (message) =>
  `https://wa.me/${site.phoneIntl}${message ? `?text=${encodeURIComponent(message)}` : ''}`

/** Mensaje personalizado por producto del catalogo. */
export const waProduct = (product) => {
  const price = formatCOP(product.price)
  if (product.brand === 'Samsung') {
    return wa(
      `Hola Cell Max, quiero consultar disponibilidad y precio de la pantalla ${product.model} (${price}). ¿Está disponible?`
    )
  }
  if (product.category === 'Tapas iPhone') {
    return wa(
      `Hola Cell Max, estoy interesado en la tapa para ${product.model} (${price}). ¿Está disponible?`
    )
  }
  return wa(
    `Hola Cell Max, estoy interesado en la pantalla ${product.category} para ${product.model} (${price}). ¿Está disponible?`
  )
}

export const MESSAGES = {
  general: 'Hola Cell Max, quiero solicitar información sobre una reparación.',
  quote: 'Hola Cell Max, quiero cotizar una pantalla para mi iPhone.',
  availability: 'Hola Cell Max, quiero consultar disponibilidad de una pantalla.',
  price: 'Hola Cell Max, quiero conocer el precio de una pantalla.',
  advisor: 'Hola Cell Max, quiero hablar con un asesor sobre qué pantalla necesito.',
  repair: 'Hola Cell Max, quiero solicitar una reparación para mi dispositivo.',
  location: 'Hola Cell Max, quiero confirmar la ubicación del local para visitarlos.',
}

/** Formato de precio colombiano: $60.000 */
export const formatCOP = (value) =>
  `$${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(value)}`
