import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { enableReveal } from './utils/useReveal'
import './index.css'

// Activa las animaciones de entrada ANTES de montar.
// Si este script no llegara a ejecutarse, el CSS no oculta nada y la web se ve completa.
enableReveal()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
