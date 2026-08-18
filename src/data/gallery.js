/**
 * Galería "Conoce Cell Max": solo material real del negocio.
 * 10 elementos = 12 celdas (una alta + una ancha + 8 normales), que llenan
 * exactamente 3 filas en escritorio (4 columnas) y 6 filas en móvil (2 columnas).
 *
 * `short` es el pie que se usa en móvil, donde la celda es pequeña y el texto
 * largo taparía la fotografía.
 */
export const gallery = [
  {
    key: 'local',
    caption: 'Nuestro local en C.C. Alejandrina',
    short: 'Nuestro local',
    tag: 'Local',
    span: 'tall',
  },
  {
    key: 'hero',
    caption: 'Cell Max Apple Repair — Cúcuta',
    short: 'Cell Max Cúcuta',
    tag: 'Marca',
    span: 'wide',
  },
  { key: 'box', caption: 'Pantallas premium Cell Max', short: 'Pantallas premium', tag: 'Producto' },
  {
    key: 'oled15pm',
    caption: 'Pantalla OLED Soft iPhone 15 Pro Max',
    short: 'OLED 15 Pro Max',
    tag: 'Pantallas',
  },
  {
    key: 'oled13pm',
    caption: 'Pantalla OLED Soft iPhone 13 Pro Max',
    short: 'OLED 13 Pro Max',
    tag: 'Pantallas',
  },
  {
    key: 'oled14pm',
    caption: 'Pantalla OLED Soft iPhone 14 Pro Max',
    short: 'OLED 14 Pro Max',
    tag: 'Pantallas',
  },
  { key: 'oled13', caption: 'Pantalla OLED Soft iPhone 13', short: 'OLED iPhone 13', tag: 'Pantallas' },
  {
    key: 'catSamsung',
    caption: 'Pantallas originales de Samsung',
    short: 'Originales Samsung',
    tag: 'Catálogo',
  },
  {
    key: 'catIncell',
    caption: 'Pantallas INCELL Premium HD Plus',
    short: 'INCELL Premium',
    tag: 'Catálogo',
  },
  { key: 'catOled', caption: 'Listado de pantallas OLED Soft', short: 'Listado OLED Soft', tag: 'Catálogo' },
]
