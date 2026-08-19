/**
 * Imagen con AVIF y respaldo WebP.
 *
 * AVIF pesa alrededor de un 32% menos que WebP con la misma calidad; el
 * navegador que no lo soporte se queda con el WebP sin enterarse. Como todas
 * las fotos del catálogo y la galería pasan por aquí, el ahorro se nota en el
 * total descargado al recorrer la página en un celular.
 */
export default function Imagen({ fuente, pequena = false, className = '', ...props }) {
  if (!fuente) return null
  const avif = pequena ? fuente.avifSm : fuente.avif
  const webp = pequena ? fuente.sm : fuente.src

  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} />}
      <img src={webp} alt={fuente.alt} className={className} {...props} />
    </picture>
  )
}
