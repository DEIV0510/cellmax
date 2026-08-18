/** Normaliza texto: minusculas, sin tildes, sin signos. */
export const normalize = (s = '') =>
  s
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s/+-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * Busqueda por tokens: todos los terminos deben aparecer en el producto.
 * "13 pro max" encuentra iPhone 13 Pro Max Soft, INCELL iPhone 13 Pro Max, etc.
 * "s24" encuentra las referencias Samsung S24.
 */
export const matchesQuery = (product, query) => {
  const q = normalize(query)
  if (!q) return true
  const haystack = normalize(
    `${product.brand} ${product.model} ${product.category} ${product.type}`
  )
  // Permite escribir "s24" o "s 24" indistintamente
  const loose = haystack.replace(/([a-z])\s+(\d)/g, '$1$2')
  return q
    .split(' ')
    .filter(Boolean)
    .every((token) => haystack.includes(token) || loose.includes(token))
}
