import { useEffect } from 'react'

/**
 * Anima con fade/slide-up los elementos con [data-reveal] cuando entran en pantalla.
 *
 * Observa tambien los nodos que aparecen DESPUES del montaje (resultados del buscador,
 * "ver mas referencias", etc.): sin esto se quedarian con opacity: 0 para siempre,
 * porque el efecto de App no se vuelve a ejecutar cuando cambia el estado de un hijo.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealAll = (root = document) =>
      root.querySelectorAll?.('[data-reveal]:not(.is-revealed)')

    if (reduce) {
      const showAll = () => revealAll()?.forEach((n) => n.classList.add('is-revealed'))
      showAll()
      const mo = new MutationObserver(showAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
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

    const observeNew = () => revealAll()?.forEach((n) => io.observe(n))
    observeNew()

    // Los elementos que React monta despues (buscador, paginacion) tambien se observan.
    const mo = new MutationObserver(observeNew)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])
}

/**
 * Bloquea el scroll del body (modales, menu movil, lightbox).
 * Lleva un contador: si dos componentes lo piden a la vez, el scroll solo se
 * restaura cuando el ultimo lo libera.
 */
let locks = 0
let savedPadding = ''

export function lockScroll(locked) {
  const body = document.body
  if (locked) {
    if (locks === 0) {
      const sw = window.innerWidth - document.documentElement.clientWidth
      savedPadding = body.style.paddingRight
      body.style.overflow = 'hidden'
      if (sw > 0) body.style.paddingRight = `${sw}px`
    }
    locks += 1
  } else {
    if (locks === 0) return
    locks -= 1
    if (locks === 0) {
      body.style.overflow = ''
      body.style.paddingRight = savedPadding
    }
  }
}
