/**
 * Pipeline de imagenes de Cell Max.
 * Toma el material real del negocio y genera WebP optimizados en src/assets/img.
 * Ejecutar:  npm run images
 */
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = process.env.CELLMAX_SRC || 'C:/Users/Lenovo/Desktop/CELULARES'
const OUT = join(__dirname, '..', 'src', 'assets', 'img')
const PUB = join(__dirname, '..', 'public')

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

/** origen -> destino, ancho maximo, calidad */
const JOBS = [
  ['logo.png', 'hero', 1600, 80],
  ['logo2.png', 'local', 900, 82],
  ['5.png', 'box', 900, 82],
  ['1.png', 'oled13', 760, 82],
  ['2.png', 'oled15pm', 900, 82],
  ['3.png', 'oled13pm', 900, 82],
  ['4.png', 'oled14pm', 900, 82],
  ['pantallas.png', 'catIncell', 760, 82],
  ['pantallas2.png', 'catOled', 780, 82],
  ['pantallas3.png', 'catSamsung', 780, 82],
  ['pantallas4.png', 'catTapas', 780, 82],
  ['pantallas5.png', 'catOriginal', 760, 82],
]

const run = async () => {
  for (const [from, name, width, quality] of JOBS) {
    const input = join(SRC, from)
    if (!existsSync(input)) {
      console.warn(`  ! falta ${from}`)
      continue
    }
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(join(OUT, `${name}.webp`))
    // Version pequena para tarjetas / lazy grid
    await sharp(input)
      .resize({ width: Math.round(width * 0.45), withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(join(OUT, `${name}-sm.webp`))
    console.log(`  ok ${from} -> ${name}.webp`)
  }

  // --- Logo CM recortado del material oficial, con fondo negro convertido a transparente ---
  const logoSrc = join(SRC, '2.png')
  if (existsSync(logoSrc)) {
    const crop = { left: 16, top: 8, width: 132, height: 90 }
    const { data, info } = await sharp(logoSrc)
      .extract(crop)
      .resize({ width: 520, kernel: 'lanczos3' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    // Alpha proporcional a la luminancia: el fondo negro desaparece, el logo plateado queda.
    for (let i = 0; i < data.length; i += info.channels) {
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
      const a = Math.max(0, Math.min(255, Math.round((lum - 26) * 1.55)))
      data[i + info.channels - 1] = a
    }

    const png = await sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    })
      .trim({ threshold: 12 })
      .png()
      .toBuffer()

    await sharp(png).webp({ quality: 92 }).toFile(join(OUT, 'cmLogo.webp'))
    await sharp(png).resize(180).png().toFile(join(OUT, 'cmLogo.png'))
    await sharp(png).resize(320).webp({ quality: 92 }).toFile(join(PUB, 'cm-logo.webp'))
    console.log('  ok logo CM extraido -> cmLogo.webp')

    // Favicon: logo real sobre fondo oscuro con borde azul
    const mark = await sharp(png).resize({ width: 300, fit: 'inside' }).png().toBuffer()
    const bg = Buffer.from(
      `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
         <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stop-color="#0B1220"/><stop offset="60%" stop-color="#05070C"/>
           <stop offset="100%" stop-color="#0A1A2E"/></linearGradient></defs>
         <rect width="512" height="512" rx="112" fill="url(#g)"/>
         <rect x="6" y="6" width="500" height="500" rx="106" fill="none"
               stroke="#0A84FF" stroke-opacity=".55" stroke-width="10"/>
       </svg>`
    )
    const icon = await sharp(bg)
      .composite([{ input: mark, gravity: 'centre' }])
      .png()
      .toBuffer()
    await sharp(icon).toFile(join(PUB, 'favicon.png'))
    await sharp(icon).resize(180).png().toFile(join(PUB, 'apple-touch-icon.png'))
    console.log('  ok favicon -> public/favicon.png')
  }

  // --- Open Graph 1200x630 desde la pieza principal ---
  const ogSrc = join(SRC, 'logo.png')
  if (existsSync(ogSrc)) {
    await sharp(ogSrc)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(PUB, 'og-cellmax.jpg'))
    console.log('  ok open graph -> public/og-cellmax.jpg')
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
