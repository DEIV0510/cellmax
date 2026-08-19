import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { enableReveal } from './utils/useReveal'
import './index.css'

// Activa las animaciones de entrada ANTES de montar.
// Si este script no llegara a ejecutarse, el CSS no oculta nada y la web se ve completa.
enableReveal()

const raiz = document.getElementById('root')
const arbol = (
  <StrictMode>
    <App />
  </StrictMode>
)

// El build deja la primera pantalla ya pintada dentro de #root: si hay contenido,
// se hidrata en vez de volver a construirlo desde cero.
if (raiz.hasChildNodes()) hydrateRoot(raiz, arbol)
else createRoot(raiz).render(arbol)
