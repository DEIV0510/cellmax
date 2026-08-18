// Mapa central de imagenes reales de Cell Max.
// La clave se usa en products.js / gallery.js; el valor es la URL procesada por Vite.
import hero from '../assets/img/hero.webp'
import heroSm from '../assets/img/hero-sm.webp'
import local from '../assets/img/local.webp'
import localSm from '../assets/img/local-sm.webp'
import box from '../assets/img/box.webp'
import boxSm from '../assets/img/box-sm.webp'
import oled13 from '../assets/img/oled13.webp'
import oled13Sm from '../assets/img/oled13-sm.webp'
import oled13pm from '../assets/img/oled13pm.webp'
import oled13pmSm from '../assets/img/oled13pm-sm.webp'
import oled14pm from '../assets/img/oled14pm.webp'
import oled14pmSm from '../assets/img/oled14pm-sm.webp'
import oled15pm from '../assets/img/oled15pm.webp'
import oled15pmSm from '../assets/img/oled15pm-sm.webp'
import catIncell from '../assets/img/catIncell.webp'
import catIncellSm from '../assets/img/catIncell-sm.webp'
import catOled from '../assets/img/catOled.webp'
import catOledSm from '../assets/img/catOled-sm.webp'
import catSamsung from '../assets/img/catSamsung.webp'
import catSamsungSm from '../assets/img/catSamsung-sm.webp'
import catTapas from '../assets/img/catTapas.webp'
import catTapasSm from '../assets/img/catTapas-sm.webp'
import catOriginal from '../assets/img/catOriginal.webp'
import catOriginalSm from '../assets/img/catOriginal-sm.webp'
import cmLogo from '../assets/img/cmLogo.webp'

export const IMG = {
  hero: { src: hero, sm: heroSm, alt: 'Cell Max Apple Repair, laboratorio técnico en Cúcuta' },
  local: {
    src: local,
    sm: localSm,
    alt: 'Logo iluminado de Cell Max en el local de C.C. Alejandrina, Cúcuta',
  },
  box: {
    src: box,
    sm: boxSm,
    alt: 'Caja de pantalla premium Cell Max by Phone Repair en el local',
  },
  oled13: { src: oled13, sm: oled13Sm, alt: 'Pantalla OLED Soft para iPhone 13 — Cell Max' },
  oled13pm: {
    src: oled13pm,
    sm: oled13pmSm,
    alt: 'Pantalla OLED Soft para iPhone 13 Pro Max — Cell Max',
  },
  oled14pm: {
    src: oled14pm,
    sm: oled14pmSm,
    alt: 'Pantalla OLED Soft para iPhone 14 Pro Max — Cell Max',
  },
  oled15pm: {
    src: oled15pm,
    sm: oled15pmSm,
    alt: 'Pantalla OLED Soft para iPhone 15 Pro Max — Cell Max',
  },
  catIncell: {
    src: catIncell,
    sm: catIncellSm,
    alt: 'Listado de pantallas INCELL Premium HD Plus de Cell Max',
  },
  catOled: { src: catOled, sm: catOledSm, alt: 'Listado de pantallas OLED Soft de Cell Max' },
  catSamsung: {
    src: catSamsung,
    sm: catSamsungSm,
    alt: 'Listado de pantallas originales de Samsung de Cell Max',
  },
  catTapas: { src: catTapas, sm: catTapasSm, alt: 'Listado de tapas para iPhone de Cell Max' },
  catOriginal: {
    src: catOriginal,
    sm: catOriginalSm,
    alt: 'Listado de pantallas originales de iPhone de Cell Max',
  },
}

export const CM_LOGO = cmLogo

/** Devuelve la imagen por clave con un fallback seguro. */
export const img = (key) => IMG[key] || IMG.box
