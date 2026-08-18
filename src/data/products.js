/**
 * CATÁLOGO CELL MAX
 * Los precios provienen del material oficial del negocio.
 * Para actualizar precios: modificar únicamente el campo `price` (número, sin puntos).
 *
 * Esquema de producto:
 *  id, brand, model, category, type, price, warranty, image, features, available
 */

export const CATEGORIES = {
  INCELL: 'INCELL Premium HD Plus',
  OLED: 'OLED Soft',
  OLED_PREMIUM: 'OLED Soft Premium',
  SAMSUNG: 'Original Samsung',
  IPHONE_ORIGINAL: 'Original iPhone',
  TAPAS: 'Tapas iPhone',
}

const incellRaw = [
  ['iPhone X', 60000],
  ['iPhone XS', 60000],
  ['iPhone XR', 70000],
  ['iPhone 11', 80000],
  ['iPhone 11 Pro', 75000],
  ['iPhone 11 Pro Max', 80000],
  ['iPhone 12 / 12 Pro', 80000],
  ['iPhone 12 Pro Max', 90000],
  ['iPhone 13', 100000],
  ['iPhone 13 Pro', 120000],
  ['iPhone 13 Pro Max', 120000],
  ['iPhone 14 Pro', 120000],
  ['iPhone 14 Pro Max', 130000],
  ['iPhone 15 Pro', 130000],
  ['iPhone 15 Pro Max', 150000],
]

const oledRaw = [
  ['iPhone 11 Pro Max Soft', 200000],
  ['iPhone 12 / 12 Pro Soft', 200000],
  ['iPhone 12 Pro Max Soft', 220000],
  ['iPhone 13 Soft', 200000],
  ['iPhone 13 Pro Soft', 240000],
  ['iPhone 13 Pro Max Soft', 290000],
  ['iPhone 13 Pro Max Soft Premium', 340000],
  ['iPhone 14 Soft', 240000],
  ['iPhone 14 Pro Soft', 330000],
  ['iPhone 14 Pro Max Soft', 400000],
  ['iPhone 14 Pro Max Soft Premium diagnóstico', 480000],
  ['iPhone 14 Pro Max Soft Premium', 480000],
  ['iPhone 14 Plus Soft', 320000],
  ['iPhone 15 Soft', 320000],
  ['iPhone 15 Plus Soft', 390000],
  ['iPhone 15 Pro Soft', 380000],
  ['iPhone 15 Pro Max Soft', 450000],
  ['iPhone 15 Pro Max Soft diagnóstico', 490000],
  ['iPhone 15 Pro Max Soft Premium', 530000],
  ['iPhone 16 Soft', 380000],
  ['iPhone 16 Plus Soft', 450000],
  ['iPhone 16 Pro Soft', 480000],
  ['iPhone 16 Pro Max Soft', 580000],
  ['iPhone 17 normal', 450000],
  ['iPhone 17 Pro Soft', 550000],
  ['iPhone 17 Pro Max Soft', 700000],
  ['iPhone 17 Pro Max Soft Premium', 800000],
]

const samsungRaw = [
  ['Samsung A35-A55 SM', 310000],
  ['Samsung A35 Original CM', 340000],
  ['Samsung A55 Original CM', 340000],
  ['Samsung A36 / A56 Original SM', 370000],
  ['Samsung S21 FE Original CM', 340000],
  ['Samsung S21 FE SM', 310000],
  ['Samsung S22 Original', 490000],
  ['Samsung S22 Plus Original', 590000],
  ['Samsung S22 Ultra Original', 850000],
  ['Samsung S23 Normal Original', 540000],
  ['Samsung S23 FE Original', 540000],
  ['Samsung S23 Plus', 440000],
  ['Samsung S23 Ultra Original', 970000],
  ['Samsung S24 Ultra Original', 970000],
  ['Samsung S24 Ultra Original SM', 940000],
  ['Samsung S24 Normal Original', 640000],
  ['Samsung S24 Plus Original', 670000],
  ['Samsung S24 FE Original', 440000],
  ['Samsung S25 Original', 590000],
  ['Samsung S25 Ultra Original', 1000000],
]

// Listado "Pantalla original de iPhone" del material gráfico oficial de Cell Max.
const iphoneOriginalRaw = [
  ['iPhone 11 original', 140000],
  ['iPhone 13 original', 250000],
  ['iPhone 13 Pro Max original', 460000],
  ['iPhone 14 Pro Max original', 700000],
  ['iPhone 15 Pro Max original', 800000],
  ['iPhone 16 Pro Max original', 980000],
  ['iPhone 17 Pro Max original (reacondicionada)', 1350000],
]

// Listado "Tapas para iPhone" del material gráfico oficial de Cell Max.
const tapasRaw = [
  ['iPhone 11', 20000],
  ['iPhone 12', 20000],
  ['iPhone 12 Pro', 20000],
  ['iPhone 12 Pro Max', 35000],
  ['iPhone 13', 30000],
  ['iPhone 13 Pro', 20000],
  ['iPhone 13 Pro Max', 35000],
  ['iPhone 14 con aros', 60000],
  ['iPhone 14 Plus con aros', 70000],
  ['iPhone 14 Pro', 30000],
  ['iPhone 14 Pro Max', 40000],
  ['iPhone 15 con aros', 50000],
  ['iPhone 15 Plus con aros', 70000],
  ['iPhone 15 Pro con aros', 80000],
  ['iPhone 15 Pro Max con aros', 80000],
  ['iPhone 16 con aros', 70000],
  ['iPhone 16 Pro con aros', 80000],
  ['iPhone 16 Pro Max con aros', 80000],
  ['iPhone 17 Pro', 50000],
  ['iPhone 17 Pro Max', 50000],
]

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// Imágenes reales disponibles por modelo (material gráfico oficial).
const OLED_IMAGES = {
  'iPhone 13 Soft': 'oled13',
  'iPhone 13 Pro Max Soft': 'oled13pm',
  'iPhone 14 Pro Max Soft': 'oled14pm',
  'iPhone 15 Pro Max Soft': 'oled15pm',
}

const build = (rows, { category, brand, warranty, type, features, image, imageMap }) =>
  rows.map(([model, price]) => {
    const own = imageMap && imageMap[model]
    return {
      id: `${slug(category)}-${slug(model)}`,
      brand,
      model,
      category,
      type: type ? type(model) : category,
      price,
      warranty,
      image: own || image,
      // `photo: true` = existe una fotografia real de ESTE modelo.
      // Si es false, la tarjeta usa un marcador de posicion de marca en vez
      // de una imagen generica repetida (nunca una foto falsa del producto).
      photo: Boolean(own),
      features,
      available: true,
    }
  })

export const products = [
  ...build(incellRaw, {
    category: CATEGORIES.INCELL,
    brand: 'Apple',
    warranty: '15 días',
    image: 'catIncell',
    features: ['Calidad Premium', 'Resolución HD Plus', 'Pantallas INCELL Premium'],
  }),
  ...build(oledRaw, {
    category: CATEGORIES.OLED,
    brand: 'Apple',
    warranty: '30 días',
    image: 'catOled',
    imageMap: OLED_IMAGES,
    type: (m) => (/premium/i.test(m) ? CATEGORIES.OLED_PREMIUM : CATEGORIES.OLED),
    features: [
      'Calidad Premium',
      'Máxima durabilidad',
      'Sensibilidad precisa',
      'Colores vivos',
      'Garantía de 30 días',
    ],
  }),
  ...build(samsungRaw, {
    category: CATEGORIES.SAMSUNG,
    brand: 'Samsung',
    warranty: '30 días',
    image: 'catSamsung',
    features: ['Pantallas originales de Samsung', 'Máxima calidad y rendimiento', 'Garantía de 30 días'],
  }),
  ...build(iphoneOriginalRaw, {
    category: CATEGORIES.IPHONE_ORIGINAL,
    brand: 'Apple',
    warranty: '30 días',
    image: 'catOriginal',
    features: ['Pantalla original de iPhone', 'Calidad Premium', 'Garantía de 30 días'],
  }),
  ...build(tapasRaw, {
    category: CATEGORIES.TAPAS,
    brand: 'Apple',
    warranty: 'Consultar',
    image: 'catTapas',
    features: [
      'Máxima calidad',
      'Durabilidad garantizada',
      'Acabados premium',
      'Disponibilidad inmediata',
    ],
  }),
]

/** Bloques del catálogo visual: título, descripción, garantía y características por categoría. */
export const catalogBlocks = [
  {
    id: 'incell',
    category: CATEGORIES.INCELL,
    title: 'Pantallas INCELL Premium HD Plus',
    desc: 'La mejor calidad al mejor precio. Resolución HD Plus para quienes buscan una excelente relación calidad/precio.',
    warranty: 'Garantía de 15 días',
    accent: 'electric',
    image: 'catIncell',
    features: ['Calidad Premium', 'Resolución HD Plus', 'Pantallas INCELL Premium'],
  },
  {
    id: 'oled',
    category: CATEGORIES.OLED,
    title: 'Pantallas OLED Soft',
    desc: 'Máxima calidad visual y experiencia táctil. Incluye las referencias OLED Soft Premium.',
    warranty: 'Garantía de 30 días',
    accent: 'gold',
    image: 'catOled',
    features: [
      'Calidad Premium',
      'Máxima durabilidad',
      'Sensibilidad precisa',
      'Colores vivos',
      'Garantía de 30 días',
    ],
  },
  {
    id: 'samsung',
    category: CATEGORIES.SAMSUNG,
    title: 'Pantallas originales de Samsung',
    desc: 'Referencias originales de Samsung disponibles según inventario.',
    warranty: 'Garantía de 30 días',
    accent: 'electric',
    image: 'catSamsung',
    features: ['Pantallas originales de Samsung', 'Máxima calidad y rendimiento', 'Garantía de 30 días'],
  },
  {
    id: 'original-iphone',
    category: CATEGORIES.IPHONE_ORIGINAL,
    title: 'Pantallas originales de iPhone',
    desc: 'Referencias de pantalla original de iPhone disponibles según inventario.',
    warranty: 'Garantía de 30 días',
    accent: 'gold',
    image: 'catOriginal',
    features: ['Pantalla original de iPhone', 'Calidad Premium', 'Garantía de 30 días'],
  },
  {
    id: 'tapas',
    category: CATEGORIES.TAPAS,
    title: 'Tapas para iPhone',
    desc: 'Tapas traseras de alta calidad, acabados premium y disponibilidad inmediata.',
    warranty: 'Garantía: consultar por producto',
    accent: 'electric',
    image: 'catTapas',
    features: [
      'Máxima calidad',
      'Durabilidad garantizada',
      'Acabados premium',
      'Disponibilidad inmediata',
    ],
  },
]

/** Comparador de opciones de pantalla. */
export const comparator = [
  {
    id: 'incell',
    name: 'INCELL PREMIUM',
    claim: 'Buena relación calidad/precio.',
    points: ['Resolución HD Plus', 'Calidad Premium', 'Garantía de 15 días'],
    warranty: '15 días',
    accent: 'electric',
  },
  {
    id: 'oled',
    name: 'OLED SOFT',
    claim: 'Mayor calidad visual y experiencia táctil.',
    points: ['Colores vivos', 'Sensibilidad precisa', 'Máxima durabilidad', 'Garantía de 30 días'],
    warranty: '30 días',
    accent: 'gold',
    highlight: true,
  },
  {
    id: 'oled-premium',
    name: 'OLED SOFT PREMIUM',
    claim: 'Alternativa premium para quienes buscan una experiencia superior.',
    points: ['Referencias Premium', 'Calidad Premium', 'Garantía de 30 días'],
    warranty: '30 días',
    accent: 'electric',
  },
]
