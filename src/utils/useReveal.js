import { useEffect } from 'react'

/**
 * Activa el modo animacion. Se llama desde main.jsx ANTES de montar React.
 *
 * Mientras el <html> no tenga `.js-reveal`, el CSS no oculta nada: si el script
 * no llega a ejecutarse la pagina se ve completa. Solo activamos el modo cuando
 * sabemos que el navegador puede volver a mostrar el contenido.
 *
 * En movil NO se activa nunca. Con el dedo se recorre mucha pagina por segundo
 * y cualquier retraso en revelar se percibe como que la web no carga; ademas es
 * donde mas caro sale un fallo de la animacion. El contenido se pinta directo.
 */
export function enableReveal() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  if (!('IntersectionObserver' in window)) return false
  if (window.innerWidth < 1024) return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  } catch {
    return false
  }

  // El build deja la primera pantalla ya pintada en el HTML. Lo que el visitante
  // YA está viendo se marca como revelado antes de activar el modo animacion:
  // de lo contrario parpadearia, desapareciendo para volver a entrar.
  try {
    const alto = window.innerHeight
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < alto && r.bottom > 0) el.classList.add('is-revealed')
    })
  } catch {
    /* sin DOM que marcar, seguimos */
  }

  document.documentElement.classList.add('js-reveal')
  return true
}

const revelar = (el) => el.classList.add('is-revealed')
const pendientes = () => document.querySelectorAll('[data-reveal]:not(.is-revealed)')

/** Muestra todo y desactiva el modo animacion. Red de seguridad. */
function revelarTodo() {
  document.documentElement.classList.remove('js-reveal')
  pendientes().forEach(revelar)
}

/**
 * Anima con fade/slide-up los elementos con [data-reveal] al entrar en pantalla.
 *
 * Observa tambien los nodos que aparecen DESPUES del montaje (resultados del
 * buscador, "ver mas referencias"), y lleva dos redes de seguridad para que sea
 * imposible que quede contenido invisible:
 *  - si algo falla, se muestra todo;
 *  - a los 4 s se revela lo que siga pendiente por encima del pliegue.
 */
export function useReveal() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('js-reveal')) {
      pendientes().forEach(revelar)
      return
    }

    let io
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const el = entry.target
            // El escalonado solo en escritorio: en movil retrasaria la
            // aparicion de contenido que el usuario ya tiene delante.
            const delay = window.innerWidth >= 1024 ? Number(el.dataset.revealDelay || 0) : 0
            if (delay) window.setTimeout(() => revelar(el), delay)
            else revelar(el)
            io.unobserve(el)
          })
        },
        // threshold 0: un elemento mas alto que la pantalla nunca llegaria a
        // mostrar un porcentaje alto de si mismo y no se revelaria jamas.
        // Margen amplio para que entren antes de asomar por el borde.
        { rootMargin: '260px 0px 260px 0px', threshold: 0 }
      )
    } catch {
      revelarTodo()
      return
    }

    const observar = () => {
      try {
        pendientes().forEach((n) => io.observe(n))
      } catch {
        revelarTodo()
      }
    }
    observar()

    // Nodos que React monta despues del primer render
    let mo
    try {
      mo = new MutationObserver(observar)
      mo.observe(document.body, { childList: true, subtree: true })
    } catch {
      /* sin MutationObserver el reveal inicial sigue funcionando */
    }

    /**
     * Red de seguridad contra el scroll rapido.
     *
     * Con un desliz fuerte, un elemento puede entrar y salir de pantalla entre
     * dos avisos del observador y no marcarse nunca: se quedaria invisible para
     * siempre. Aqui se revela TODO lo que ya quedo por encima del pliegue —sin
     * limite por abajo, para no dejar atras nada de lo que el dedo se salto.
     */
    const rescatar = () => {
      const restantes = pendientes()
      if (!restantes.length) {
        window.clearInterval(rescate)
        return
      }
      const alto = window.innerHeight
      restantes.forEach((el) => {
        if (el.getBoundingClientRect().top < alto * 1.2) revelar(el)
      })
    }
    const rescate = window.setInterval(rescatar, 700)
    window.addEventListener('scroll', rescatar, { passive: true })

    const rescateFinal = window.setTimeout(revelarTodo, 15000)

    return () => {
      window.clearInterval(rescate)
      window.clearTimeout(rescateFinal)
      window.removeEventListener('scroll', rescatar)
      mo?.disconnect()
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
