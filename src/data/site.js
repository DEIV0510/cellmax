// Datos centrales del negocio. Editar aqui para actualizar toda la web (nombre, telefono, direccion).
export const site = {
  name: 'CELL MAX',
  tagline: 'Apple Repair',
  altBrand: 'Cell Max by: Phone Repair',
  claim: 'Tecnología, reparación y calidad en un solo lugar.',
  subclaim: 'Pantallas premium y servicio técnico especializado en Cúcuta.',
  phoneDisplay: '318 582 0627',
  phoneIntl: '573185820627',
  instagramUser: '@cellmaxynamat',
  instagramUrl:
    'https://www.instagram.com/cellmaxynamat?igsh=aGtqMGdvbXczeXlp&igsi=aGtqMGdvbXczeXlp',
  address: {
    place: 'C.C. Alejandrina',
    entrance: 'Entrada 00, Calle 9',
    floor: 'Segundo piso',
    locals: 'Locales 204-205',
    city: 'Cúcuta',
    cityAccented: 'Cúcuta',
    full: 'C.C. Alejandrina, Entrada 00 Calle 9, Segundo piso, locales 204-205, Cúcuta',
  },
  mapsQuery: 'C.C. Alejandrina, Calle 9, Cúcuta, Norte de Santander, Colombia',
  priceNote: 'Precios sujetos a disponibilidad y actualización. Consulta antes de realizar tu compra.',
}

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.mapsQuery
)}`
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.mapsQuery
)}&output=embed`
