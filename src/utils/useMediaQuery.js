import { useEffect, useState } from 'react'

/**
 * Devuelve true mientras la media query se cumpla. Reacciona al redimensionar.
 * Usa addListener como respaldo: addEventListener sobre MediaQueryList no existe
 * en Safari anterior a 14, y ahi una excepcion tumbaria el componente entero.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    try {
      return window.matchMedia(query).matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!window.matchMedia) return
    let mq
    try {
      mq = window.matchMedia(query)
    } catch {
      return
    }
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)

    if (mq.addEventListener) {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    mq.addListener(onChange)
    return () => mq.removeListener(onChange)
  }, [query])

  return matches
}

/** Punto de corte `lg` de Tailwind. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
