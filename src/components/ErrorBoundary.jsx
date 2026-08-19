import { Component } from 'react'

/**
 * Aisla el fallo de una seccion.
 *
 * Sin esto, una excepcion en cualquier componente hace que React desmonte TODO
 * el arbol y el visitante se queda con la pagina a medias. Con el limite, solo
 * cae la seccion afectada y el resto —y sobre todo el WhatsApp— sigue en pie.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    // Deja rastro en consola para poder diagnosticarlo desde el movil
    console.error('[Cell Max] Falló una sección:', this.props.name || '', error, info)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
