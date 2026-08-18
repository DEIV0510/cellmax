/**
 * Guarda contra un fallo silencioso de Tailwind.
 *
 * La escala de opacidad por defecto de Tailwind 3 solo avanza en pasos de 5.
 * Una clase como `border-white/12` o `bg-ink-950/97` NO genera ninguna regla CSS:
 * el build pasa en verde y el estilo simplemente no se aplica (los bordes acaban
 * pintados con el gris del preflight y los fondos quedan transparentes).
 *
 * Ejecutar:  npm run check
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const VALID = new Set([
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
])

// Utilidades de fraccion legitimas: left-1/2, -translate-y-1/2, top-1/3, w-1/4...
const FRACTION = /^-?(?:translate-[xy]|top|left|right|bottom|inset|inset-[xy]|w|h)-\d$/

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = []
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (/\.(jsx?|css|html)$/.test(entry.name)) files.push(p)
  }
}
walk(path.join(ROOT, 'src'))
files.push(path.join(ROOT, 'index.html'))

const bad = {}
for (const file of files) {
  fs.readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const re = /([a-z-]+-(?:\[[^\]]+\]|#?[a-z0-9-]+))\/(\d{1,3})(?![\]\.\d])/g
      let m
      while ((m = re.exec(line))) {
        const n = Number(m[2])
        if (VALID.has(n) || FRACTION.test(m[1])) continue
        const key = `${m[1]}/${n}`
        bad[key] = bad[key] || []
        bad[key].push(`${path.relative(ROOT, file).split(path.sep).join('/')}:${i + 1}`)
      }
    })
}

const keys = Object.keys(bad).sort()
if (!keys.length) {
  console.log('OK — todas las opacidades están dentro de la escala de Tailwind.')
  process.exit(0)
}

console.error(`Opacidades fuera de la escala de Tailwind (no generan CSS): ${keys.length}\n`)
let total = 0
for (const k of keys) {
  total += bad[k].length
  console.error(`  ${k}`)
  bad[k].forEach((loc) => console.error(`      ${loc}`))
}
console.error(
  `\n${total} ocurrencia(s). Usa el múltiplo de 5 más cercano (p. ej. /10) o un valor arbitrario (/[0.12]).`
)
process.exit(1)
