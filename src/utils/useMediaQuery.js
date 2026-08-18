import { useEffect, useState } from 'react'

/** Devuelve true mientras la media query se cumpla. Reacciona al redimensionar. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Punto de corte `lg` de Tailwind. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
