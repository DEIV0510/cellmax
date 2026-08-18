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
| Imágenes | sharp (pipeline propio → WebP) |

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
    ├── assets/img/         Imágenes procesadas (WebP, dos tamaños cada una)
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

## Contacto del negocio

- WhatsApp: **318 582 0627** → `https://wa.me/573185820627`
- Instagram: [@cellmaxynamat](https://www.instagram.com/cellmaxynamat)
- Local: C.C. Alejandrina, Entrada 00 Calle 9, segundo piso, locales 204-205, Cúcuta

---

## Notas de marca

El sitio describe a Cell Max como servicio **especializado** en dispositivos Apple y usa la marca
comercial "Apple Repair" tal como aparece en el material del negocio. No se afirma en ninguna
parte ser servicio autorizado ni representante de Apple.
