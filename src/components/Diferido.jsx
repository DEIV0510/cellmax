import { useEffect, useState } from 'react'

/**
 * Monta a sus hijos justo DESPUÉS del primer pintado.
 *
 * El problema que resuelve: React tardaba 1,8 s en montar las 14 secciones de
 * golpe en un celular, y hasta que no terminaba no se podía retirar la pantalla
 * de carga. El visitante veía el logo girando casi 4 segundos con la web ya
 * descargada. Ahora el primer render solo pinta lo que se ve —encabezado, hero
 * y barra de confianza— y el resto entra en el tick siguiente.
 *
 * No depende del scroll a propósito: se monta siempre, unos milisegundos
 * después, así que es imposible que quede contenido sin aparecer.
 */
export default function Diferido({ children }) {
  const [listo, setListo] = useState(false)

  useEffect(() => {
    let cancelar
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setListo(true), { timeout: 300 })
      cancelar = () => window.cancelIdleCallback(id)
    } else {
      // Safari de iPhone no tiene requestIdleCallback
      const id = window.setTimeout(() => setListo(true), 40)
      cancelar = () => window.clearTimeout(id)
    }
    return cancelar
  }, [])

  return listo ? children : null
}
