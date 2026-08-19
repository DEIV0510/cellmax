import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Punto de entrada de pre-renderizado.
 *
 * En el build se ejecuta App en Node y su HTML se incrusta en index.html. Así el
 * visitante ve la primera pantalla en cuanto llega el HTML y el CSS, sin esperar
 * a que se descargue y ejecute React: antes eran casi dos segundos de logo
 * girando con la web ya descargada.
 *
 * Solo se pinta lo que va fuera de <Diferido>, que en Node devuelve null:
 * encabezado, hero, barra de confianza y navegación inferior. El resto lo monta
 * el navegador un instante después, así que no hay desajuste al hidratar.
 */
export function render() {
  return renderToString(<App />)
}
