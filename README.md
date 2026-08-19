# CELL MAX — Apple Repair

Landing page comercial de **Cell Max** (Cúcuta): reparación de dispositivos, pantallas para iPhone
y Samsung, repuestos, accesorios y servicio técnico.

Objetivo del sitio: llevar al visitante desde el catálogo hasta una conversación de WhatsApp o una
visita al local.

---

## Stack

| Pieza | Tecnología |
|---|---|
| Framework | React 18 |
| Build | Vite 5 |
| Estilos | Tailwind CSS 3 |
| Iconos | lucide-react |
| Imágenes | sharp (pipeline propio → AVIF + WebP) |

Sin librerías pesadas: el bundle es React + lucide y nada más.

---

## Puesta en marcha

```bash
npm install
```

```bash
npm run dev
```

Abre `http://localhost:5250`.

Otros comandos:

```bash
npm run build
```

```bash
npm run preview
```

---

## Estructura

```
cellmax/
├── index.html              SEO, Open Graph, JSON-LD y pantalla de carga
├── scripts/
│   └── process-images.mjs  Pipeline: PNG originales → WebP + logo + favicon + OG
├── public/                 favicon, apple-touch-icon, og-cellmax.jpg, cm-logo.webp
└── src/
    ├── App.jsx             Composición de secciones
    ├── index.css           Tokens, componentes CSS y animaciones
    ├── assets/img/         Imágenes procesadas (AVIF + WebP, dos tamaños cada una)
    ├── data/               ← DATOS EDITABLES (ver abajo)
    │   ├── site.js         Teléfono, dirección, Instagram, textos de marca
    │   ├── products.js     Catálogo completo con precios y garantías
    │   ├── services.js     Tarjetas de servicios
    │   ├── faq.js          Preguntas frecuentes
    │   ├── process.js      Pasos de "Así trabajamos"
    │   └── gallery.js      Selección de la galería
    ├── utils/
    │   ├── whatsapp.js     Enlaces wa.me + mensajes por producto + formato COP
    │   ├── images.js       Mapa central de imágenes con su texto alternativo
    │   ├── search.js       Búsqueda por tokens sin tildes
    │   └── useReveal.js    Animaciones al hacer scroll + bloqueo de scroll
    └── components/         Un componente por sección
```

---

## Cómo actualizar precios

Todo el catálogo vive en [`src/data/products.js`](src/data/products.js), separado del diseño.
Para cambiar un precio basta con editar el número (sin puntos ni símbolos):

```js
const incellRaw = [
  ['iPhone 13', 100000],   // ← solo cambia este número
]
```

El formato colombiano (`$100.000`) se aplica solo, en toda la web.

Cada producto se genera con este esquema, pensado para conectar un panel administrativo más
adelante sin tocar la interfaz:

```js
{
  id, brand, model, category, type,
  price, warranty, image, photo, features, available
}
```

### Garantías por categoría

| Categoría | Garantía |
|---|---|
| INCELL Premium HD Plus | 15 días |
| OLED Soft / OLED Soft Premium | 30 días |
| Pantallas originales de Samsung | 30 días |
| Pantallas originales de iPhone | 30 días |
| Tapas para iPhone | Consultar por producto |

Las garantías no se mezclan entre categorías.

### Añadir testimonios reales

La sección está lista y a la espera de reseñas verificadas. En
[`src/components/Testimonials.jsx`](src/components/Testimonials.jsx):

```js
export const testimonials = [
  { name: 'Nombre real', text: 'Reseña real...', device: 'iPhone 13' },
]
```

Con el arreglo vacío se muestra el mensaje de "muy pronto"; al agregar elementos aparecen las
tarjetas automáticamente.

---

## Imágenes

Las imágenes originales del negocio están fuera del repositorio, en `Desktop\CELULARES`.
Para regenerarlas:

```bash
npm run images
```

El script convierte cada pieza a WebP en dos tamaños, recorta el logo **CM** del material oficial
dejándolo con fondo transparente, y genera favicon, apple-touch-icon y la imagen de Open Graph.
Si mueves la carpeta origen, define la variable `CELLMAX_SRC`.

Regla de contenido: **no se generan fotos falsas de producto**. Un modelo sin fotografía propia
usa un marcador de posición de marca (silueta del dispositivo + logo CM), nunca una imagen
inventada del producto.

---

## Rendimiento

Decisiones tomadas para que la web vaya bien en un celular de gama media:

- **El mapa se carga solo si lo piden.** El iframe de Google pesa cientos de KB;
  hasta que el visitante pulsa "Ver mapa" solo hay un marcador ligero. La mayoría
  usa "Cómo llegar" y nunca lo necesita.
- **Cada bloque del catálogo monta una sola variante**: la tabla en escritorio o
  las tarjetas en móvil, nunca las dos. Renderizar ambas duplicaba cientos de
  nodos por categoría.
- **En móvil las categorías cerradas no se montan**, solo la que está abierta.
- **Sin animación de entrada en móvil**: el contenido se pinta directo. Con el dedo
  se recorre mucha página por segundo y cualquier retraso se percibe como que la
  web no carga.
- La imagen del hero se sirve reducida en móvil mediante `srcset`.

- **Todas las imágenes salen en AVIF y WebP.** AVIF pesa un 32% menos; el
  navegador que no lo soporte usa el WebP sin enterarse (componente Imagen).
- El logo se servía dos veces (una desde `public` para la pantalla de carga y
  otra desde `assets` para el encabezado). Ahora es el mismo archivo.
- El favicon pesaba 79 KB porque se generaba a 512px, y el navegador lo pide en
  todas las visitas. Ahora son 96px y 5 KB.
- Solo se piden los pesos de fuente que el CSS usa de verdad.

Medido en iPhone 13 con CPU 4x más lenta y 4G:

| | Antes | Ahora |
|---|---|---|
| Primera carga | 304 KB | **169 KB** |
| Recorrido completo | 544 KB | **415 KB** |
| Primer pintado | 824 ms | **700 ms** |
| Nodos en el DOM | 2.324 | **1.628** |

## Pre-renderizado de la primera pantalla

`npm run build` compila el cliente, compila una versión de servidor y ejecuta
`scripts/prerender.mjs`, que corre la app en Node e incrusta su HTML dentro de
`<div id="root">`. El visitante ve encabezado, hero y barra de confianza en
cuanto llegan el HTML y el CSS, sin esperar a descargar ni ejecutar React.

Antes, React tardaba en montar y hasta que no terminaba no se podía retirar la
pantalla de carga: eran 3,9 s de logo girando en 4G con la web ya descargada.
Ahora la web se ve en 1,2 s.

Detalles que hacen que funcione:

- Todo lo que va dentro de `<Diferido>` queda fuera del pre-renderizado: en Node
  devuelve `null` y lo monta el navegador un instante después, así que no hay
  desajuste al hidratar.
- El loader se cierra desde un script colocado **después** de `#root`, no en
  `DOMContentLoaded`: los `<script type="module">` se ejecutan antes de ese
  evento, así que esperarlo equivalía a esperar a React igualmente.
- `enableReveal()` marca como ya reveladas las secciones que se ven al cargar,
  para que el contenido pre-renderizado no parpadee al activar las animaciones.

---

## Compatibilidad

El proyecto declara un `browserslist` explícito en `package.json`. No es un
detalle menor: sin él, autoprefixer asumía navegadores muy recientes y **no
generaba `-webkit-backdrop-filter`**, que es la única forma en que Safari de
iPhone entiende el desenfoque. El resultado era que en iPhone las tarjetas de
cristal del hero, el buscador y las barras fijas perdían su fondo.

Además, ninguna superficie depende del desenfoque para tener contraste: iOS lo
desactiva cuando el usuario activa «Reducir transparencia» en accesibilidad. El
encabezado, el menú y la barra inferior son opacos en móvil, y `.glass` lleva un
color de base sólido. El desenfoque es un adorno, nunca el fondo.

`npm run check` corre antes de cada build y avisa de clases de Tailwind con
opacidades fuera de escala, que no generan CSS y dejan pasar el build en verde.

---

## Contacto del negocio

- WhatsApp: **318 582 0627** → `https://wa.me/573185820627`
- Instagram: [@cellmaxynamat](https://www.instagram.com/cellmaxynamat)
- Local: C.C. Alejandrina, Entrada 00 Calle 9, segundo piso, locales 204-205, Cúcuta

---

## Notas de marca

El sitio describe a Cell Max como servicio **especializado** en dispositivos Apple y usa la marca
comercial "Apple Repair" tal como aparece en el material del negocio. No se afirma en ninguna
parte ser servicio autorizado ni representante de Apple.
