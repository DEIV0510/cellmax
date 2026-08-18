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
import { useReveal } from './utils/useReveal'

export default function App() {
  const [product, setProduct] = useState(null)
  useReveal()

  const openProduct = useCallback((p) => setProduct(p), [])
  const closeProduct = useCallback(() => setProduct(null), [])

  // Oculta la pantalla de carga cuando la app ya esta montada
  useEffect(() => {
    const loader = document.getElementById('cm-loader')
    if (!loader) return
    const t = window.setTimeout(() => {
      loader.classList.add('is-done')
      window.setTimeout(() => loader.remove(), 650)
    }, 550)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-electric-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Ir al contenido
      </a>

      <Header />

      <main>
        <Hero />
        <TrustBar />
        <Services />
        <ScreenFinder onOpenProduct={openProduct} />
        <Catalog onOpenProduct={openProduct} />
        <Comparator />
        <Process />
        <Warranty />
        <Gallery />
        <Location />
        <QuoteForm />
        <Faq />
        <Testimonials />
        <FinalCta />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileTabBar />
      <ProductModal product={product} onClose={closeProduct} />
    </>
  )
}
