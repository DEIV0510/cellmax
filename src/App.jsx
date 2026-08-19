import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import ScreenFinder from './components/ScreenFinder'
import Catalog from './components/Catalog'
import Comparator from './components/Comparator'
import Process from './components/Process'
import Warranty from './components/Warranty'
import Gallery from './components/Gallery'
import Location from './components/Location'
import QuoteForm from './components/QuoteForm'
import Faq from './components/Faq'
import Testimonials from './components/Testimonials'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import MobileTabBar from './components/MobileTabBar'
import ProductModal from './components/ProductModal'
import ErrorBoundary from './components/ErrorBoundary'
import Diferido from './components/Diferido'
import { useReveal } from './utils/useReveal'

/** Cada seccion aislada: si una falla, el resto de la pagina sigue en pie. */
const Seccion = ({ nombre, children }) => (
  <ErrorBoundary name={nombre}>{children}</ErrorBoundary>
)

export default function App() {
  const [product, setProduct] = useState(null)
  useReveal()

  const openProduct = useCallback((p) => setProduct(p), [])
  const closeProduct = useCallback(() => setProduct(null), [])

  // Avisa a la pantalla de carga en cuanto la pagina se puede usar.
  // El cierre y la animacion los gestiona el script de index.html, que existe
  // aunque este bundle falle.
  useEffect(() => {
    const cerrar = () => window.cmLoaderDone?.()
    // Un frame para que el primer render este pintado antes de descubrirlo
    const id = window.requestAnimationFrame(cerrar)
    return () => window.cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-electric-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Ir al contenido
      </a>

      <Seccion nombre="Header">
        <Header />
      </Seccion>

      <main>
        {/* Primera pantalla: se monta de inmediato */}
        <Seccion nombre="Hero"><Hero /></Seccion>
        <Seccion nombre="TrustBar"><TrustBar /></Seccion>

        {/* El resto entra en el tick siguiente, con el hero ya en pantalla */}
        <Diferido>
          <Seccion nombre="Services"><Services /></Seccion>
          <Seccion nombre="ScreenFinder"><ScreenFinder onOpenProduct={openProduct} /></Seccion>
          <Seccion nombre="Catalog"><Catalog onOpenProduct={openProduct} /></Seccion>
          <Seccion nombre="Comparator"><Comparator /></Seccion>
          <Seccion nombre="Process"><Process /></Seccion>
          <Seccion nombre="Warranty"><Warranty /></Seccion>
          <Seccion nombre="Gallery"><Gallery /></Seccion>
          <Seccion nombre="Location"><Location /></Seccion>
          <Seccion nombre="QuoteForm"><QuoteForm /></Seccion>
          <Seccion nombre="Faq"><Faq /></Seccion>
          <Seccion nombre="Testimonials"><Testimonials /></Seccion>
          <Seccion nombre="FinalCta"><FinalCta /></Seccion>
        </Diferido>
      </main>

      {/* La barra inferior es navegación: se monta ya, no diferida */}
      <Seccion nombre="MobileTabBar"><MobileTabBar /></Seccion>

      <Diferido>
        <Seccion nombre="Footer"><Footer /></Seccion>
        <Seccion nombre="FloatingWhatsApp"><FloatingWhatsApp /></Seccion>
      </Diferido>

      <Seccion nombre="ProductModal">
        <ProductModal product={product} onClose={closeProduct} />
      </Seccion>
    </>
  )
}
