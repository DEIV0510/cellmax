import { useEffect } from 'react'

/**
 * Anima con fade/slide-up los elementos con [data-reveal] cuando entran en pantalla.
 * Usa un unico IntersectionObserver para no penalizar el rendimiento.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = document.querySelectorAll('[data-reveal]:not(.is-revealed)')

    if (reduce) {
      nodes.forEach((n) => n.classList.add('is-revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const delay = Number(el.dataset.revealDelay || 0)
          window.setTimeout(() => el.classList.add('is-revealed'), delay)
          io.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  })
}

/** Bloquea el scroll del body (modales, menu movil, lightbox). */
export function lockScroll(locked) {
  const body = document.body
  if (locked) {
    const sw = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (sw > 0) body.style.paddingRight = `${sw}px`
  } else {
    body.style.overflow = ''
    body.style.paddingRight = ''
  }
}
