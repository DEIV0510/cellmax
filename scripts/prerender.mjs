/**
 * Pre-renderizado de la primera pantalla.
 *
 * Ejecuta la app en Node y mete su HTML dentro de <div id="root"> en
 * dist/index.html. El visitante ve el encabezado, el hero y la barra de
 * confianza en cuanto llegan el HTML y el CSS, sin esperar a que se descargue y
 * ejecute React. Todo lo que va dentro de <Diferido> queda fuera a propósito:
 * en Node devuelve null y lo monta el navegador un instante después, así que no
 * hay desajuste al hidratar.
 *
 * Lo lanza `npm run build` después de compilar cliente y servidor.
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = join(raiz, 'dist', 'index.html')
const serverEntry = join(raiz, 'dist-ssr', 'entry-server.js')

if (!existsSync(serverEntry)) {
  console.error('No existe dist-ssr/entry-server.js — ¿falló el build de servidor?')
  process.exit(1)
}

const { render } = await import(pathToFileURL(serverEntry).href)
const marcado = render()

if (!marcado || marcado.length < 500) {
  console.error(`El pre-renderizado devolvió muy poco HTML (${marcado?.length ?? 0} caracteres).`)
  process.exit(1)
}

let html = readFileSync(htmlPath, 'utf8')
const ancla = '<div id="root"></div>'
if (!html.includes(ancla)) {
  console.error('No se encontró <div id="root"></div> en dist/index.html')
  process.exit(1)
}

html = html.replace(ancla, `<div id="root">${marcado}</div>`)
writeFileSync(htmlPath, html)

// El bundle de servidor no se publica
rmSync(join(raiz, 'dist-ssr'), { recursive: true, force: true })

const kb = Math.round(marcado.length / 1024)
console.log(`  ok primera pantalla pre-renderizada (${kb} KB de HTML)`)
