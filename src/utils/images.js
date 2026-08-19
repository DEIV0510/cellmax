// Mapa central de imagenes reales de Cell Max.
// La clave se usa en products.js / gallery.js; el valor es la URL procesada por Vite.
import hero from '../assets/img/hero.webp'
import heroSm from '../assets/img/hero-sm.webp'
import hero480 from '../assets/img/hero-480.webp'
import hero480Avif from '../assets/img/hero-480.avif'
import heroMd from '../assets/img/hero-md.webp'
import heroMdAvif from '../assets/img/hero-md.avif'
import heroAvif from '../assets/img/hero.avif'
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

// Variantes AVIF (mismo contenido, ~32% menos peso)
import heroSmAvif from '../assets/img/hero-sm.avif'
import localAvif from '../assets/img/local.avif'
import localSmAvif from '../assets/img/local-sm.avif'
import boxAvif from '../assets/img/box.avif'
import boxSmAvif from '../assets/img/box-sm.avif'
import oled13Avif from '../assets/img/oled13.avif'
import oled13SmAvif from '../assets/img/oled13-sm.avif'
import oled13pmAvif from '../assets/img/oled13pm.avif'
import oled13pmSmAvif from '../assets/img/oled13pm-sm.avif'
import oled14pmAvif from '../assets/img/oled14pm.avif'
import oled14pmSmAvif from '../assets/img/oled14pm-sm.avif'
import oled15pmAvif from '../assets/img/oled15pm.avif'
import oled15pmSmAvif from '../assets/img/oled15pm-sm.avif'
import catIncellAvif from '../assets/img/catIncell.avif'
import catIncellSmAvif from '../assets/img/catIncell-sm.avif'
import catOledAvif from '../assets/img/catOled.avif'
import catOledSmAvif from '../assets/img/catOled-sm.avif'
import catSamsungAvif from '../assets/img/catSamsung.avif'
import catSamsungSmAvif from '../assets/img/catSamsung-sm.avif'
import catTapasAvif from '../assets/img/catTapas.avif'
import catTapasSmAvif from '../assets/img/catTapas-sm.avif'
import catOriginalAvif from '../assets/img/catOriginal.avif'
import catOriginalSmAvif from '../assets/img/catOriginal-sm.avif'

export const IMG = {
  hero: { src: hero, sm: heroSm, avif: heroAvif, avifSm: heroSmAvif, alt: 'Cell Max Apple Repair, laboratorio técnico en Cúcuta' },
  local: {
    src: local,
    sm: localSm,
    avif: localAvif,
    avifSm: localSmAvif,
    alt: 'Logo iluminado de Cell Max en el local de C.C. Alejandrina, Cúcuta',
  },
  box: {
    src: box,
    sm: boxSm,
    avif: boxAvif,
    avifSm: boxSmAvif,
    alt: 'Caja de pantalla premium Cell Max by Phone Repair en el local',
  },
  oled13: { src: oled13, sm: oled13Sm, avif: oled13Avif, avifSm: oled13SmAvif, alt: 'Pantalla OLED Soft para iPhone 13 — Cell Max' },
  oled13pm: {
    src: oled13pm,
    sm: oled13pmSm,
    avif: oled13pmAvif,
    avifSm: oled13pmSmAvif,
    alt: 'Pantalla OLED Soft para iPhone 13 Pro Max — Cell Max',
  },
  oled14pm: {
    src: oled14pm,
    sm: oled14pmSm,
    avif: oled14pmAvif,
    avifSm: oled14pmSmAvif,
    alt: 'Pantalla OLED Soft para iPhone 14 Pro Max — Cell Max',
  },
  oled15pm: {
    src: oled15pm,
    sm: oled15pmSm,
    avif: oled15pmAvif,
    avifSm: oled15pmSmAvif,
    alt: 'Pantalla OLED Soft para iPhone 15 Pro Max — Cell Max',
  },
  catIncell: {
    src: catIncell,
    sm: catIncellSm,
    avif: catIncellAvif,
    avifSm: catIncellSmAvif,
    alt: 'Listado de pantallas INCELL Premium HD Plus de Cell Max',
  },
  catOled: { src: catOled, sm: catOledSm, avif: catOledAvif, avifSm: catOledSmAvif, alt: 'Listado de pantallas OLED Soft de Cell Max' },
  catSamsung: {
    src: catSamsung,
    sm: catSamsungSm,
    avif: catSamsungAvif,
    avifSm: catSamsungSmAvif,
    alt: 'Listado de pantallas originales de Samsung de Cell Max',
  },
  catTapas: { src: catTapas, sm: catTapasSm, avif: catTapasAvif, avifSm: catTapasSmAvif, alt: 'Listado de tapas para iPhone de Cell Max' },
  catOriginal: {
    src: catOriginal,
    sm: catOriginalSm,
    avif: catOriginalAvif,
    avifSm: catOriginalSmAvif,
    alt: 'Listado de pantallas originales de iPhone de Cell Max',
  },
}

// Mismo archivo que usa la pantalla de carga (con preload en index.html):
// asi el navegador lo reutiliza en vez de descargar una segunda copia.
export const CM_LOGO = '/cm-logo.webp'

/**
 * Juego de tamanos del hero, la imagen de la primera pantalla.
 * AVIF primero (pesa un 40% menos); WebP como respaldo para navegadores
 * que aun no lo soportan.
 */
export const HERO_SET = {
  avif: `${hero480Avif} 480w, ${heroMdAvif} 1100w, ${heroAvif} 1600w`,
  webp: `${hero480} 480w, ${heroMd} 1100w, ${hero} 1600w`,
  sizes: '(max-width: 1023px) 92vw, 46vw',
}

/** Devuelve la imagen por clave con un fallback seguro. */
export const img = (key) => IMG[key] || IMG.box
