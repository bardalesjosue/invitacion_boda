// Genera el diseño de vinil para el espejo de bienvenida: espejo de pie con
// arco y luz LED perimetral (80 cm de ancho x 170 cm de alto). Usa solo
// Brittany Signature y Playfair Display, las dos tipografias del diseño
// final. Todo el texto queda en la mitad inferior de la zona con curva, en
// lineas rectas horizontales, dentro de un margen de seguridad para no tapar
// la tira de luz del borde.
//
// Produce dos archivos:
//  - espejo-bienvenida.png          -> fondo transparente, letras blancas.
//                                      Es el archivo para el cortador de vinil.
//  - espejo-bienvenida-preview.png  -> mismo diseño sobre un fondo oscuro, con
//                                      una guia punteada del arco y la luz,
//                                      solo para visualizar. Esa guia NO se
//                                      incluye en el archivo de corte.
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { drawScriptWord, measureScriptWord, drawTrackedText, measureTrackedWidth } from './lib/text-helpers.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'espejo-bienvenida')
const FONTS_DIR = path.join(__dirname, 'assets', 'fonts')

GlobalFonts.registerFromPath(
  path.join(ROOT, 'public', 'fonts', 'BrittanySignature.ttf'),
  'Brittany Signature',
)
GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'PlayfairDisplay-Regular.ttf'), 'Playfair Display')
GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'PlayfairDisplay-Black.ttf'), 'Playfair Display Black')

// Medidas reales del espejo: vertical, con arco arriba.
const WIDTH_CM = 80
const HEIGHT_CM = 170
const PX_PER_CM = 20 // resolucion de trabajo: 20px = 1cm
const WIDTH = WIDTH_CM * PX_PER_CM
const HEIGHT = HEIGHT_CM * PX_PER_CM

// La luz LED corre pegada al borde interno del marco, bordeando tambien el
// arco. Se deja un margen de seguridad para que ningun texto la toque.
const SAFE_MARGIN_CM = 8
const MAX_TEXT_WIDTH = (WIDTH_CM - SAFE_MARGIN_CM * 2) * PX_PER_CM
// El arco empieza a curvarse desde los ~140cm de alto (contando desde abajo),
// es decir, arriba del todo. Todo el texto se ubica por debajo de esa curva,
// en la parte recta del espejo.
const ARCH_SAFE_TOP_CM = 34

const COLOR = '#FFFFFF'

function drawFitted(ctx, { text, family, weight = '400', targetHeightPx, centerY, tracking = 0, script = false }) {
  const REF_SIZE = 200
  ctx.font = `${weight} ${REF_SIZE}px "${family}"`
  const refMetrics = ctx.measureText(text)
  const refHeight = refMetrics.actualBoundingBoxAscent + refMetrics.actualBoundingBoxDescent
  let fontSize = (targetHeightPx / refHeight) * REF_SIZE

  const trackingAtRef = tracking * REF_SIZE
  const refWidth = script ? measureScriptWord(ctx, text) : measureTrackedWidth(ctx, text, trackingAtRef)
  let width = (refWidth / REF_SIZE) * fontSize

  if (width > MAX_TEXT_WIDTH) {
    fontSize *= MAX_TEXT_WIDTH / width
  }

  ctx.font = `${weight} ${fontSize}px "${family}"`
  const metrics = ctx.measureText(text)
  const ascent = metrics.actualBoundingBoxAscent
  const descent = metrics.actualBoundingBoxDescent
  const baselineY = centerY + (ascent - descent) / 2

  ctx.fillStyle = COLOR
  ctx.textAlign = 'center'
  if (script) {
    const w = measureScriptWord(ctx, text)
    drawScriptWord(ctx, text, WIDTH / 2 - w / 2, baselineY)
  } else {
    drawTrackedText(ctx, text, WIDTH / 2, baselineY, tracking * fontSize)
  }
  ctx.textAlign = 'left'

  return fontSize
}

// Guia visual (solo preview): silueta del espejo con arco + linea punteada
// donde iria la luz LED, para chequear que el texto no la toque.
function drawMirrorGuide(ctx) {
  const inset = 3 * PX_PER_CM
  const w = WIDTH - inset * 2
  const archRadius = w / 2
  const top = inset
  const bottom = HEIGHT - inset
  const straightTop = top + archRadius

  ctx.save()
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'
  ctx.lineWidth = 3
  ctx.setLineDash([14, 10])
  ctx.beginPath()
  ctx.moveTo(inset, bottom)
  ctx.lineTo(inset, straightTop)
  ctx.arc(WIDTH / 2, straightTop, archRadius, Math.PI, 0, false)
  ctx.lineTo(WIDTH - inset, bottom)
  ctx.stroke()
  ctx.restore()
}

function renderSign({ withPreviewBackground }) {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  if (withPreviewBackground) {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    gradient.addColorStop(0, '#2b3b33')
    gradient.addColorStop(1, '#17211c')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    drawMirrorGuide(ctx)
  }

  const cm = (v) => v * PX_PER_CM

  // "Bienvenidos a" - Playfair Display regular, minusculas
  drawFitted(ctx, {
    text: 'Bienvenidos a',
    family: 'Playfair Display',
    weight: '400',
    targetHeightPx: cm(6),
    centerY: cm(ARCH_SAFE_TOP_CM + 6),
  })

  // "NUESTRA BODA" - Playfair Display Black, mayusculas con tracking
  drawFitted(ctx, {
    text: 'NUESTRA BODA',
    family: 'Playfair Display Black',
    weight: '900',
    targetHeightPx: cm(8),
    centerY: cm(ARCH_SAFE_TOP_CM + 16),
    tracking: 0.09,
  })

  // "Josué & Mariela" - Brittany Signature, el elemento principal
  drawFitted(ctx, {
    text: 'Josué & Mariela',
    family: 'Brittany Signature',
    targetHeightPx: cm(13),
    centerY: cm(ARCH_SAFE_TOP_CM + 34),
    script: true,
  })

  // Fecha - Playfair Display Black, versalitas pequeñas
  drawFitted(ctx, {
    text: '04 DE DICIEMBRE · 2026',
    family: 'Playfair Display Black',
    weight: '900',
    targetHeightPx: cm(4.5),
    centerY: cm(ARCH_SAFE_TOP_CM + 50),
    tracking: 0.08,
  })

  return canvas
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const finalCanvas = renderSign({ withPreviewBackground: false })
  const finalPath = path.join(OUT_DIR, 'espejo-bienvenida.png')
  writeFileSync(finalPath, finalCanvas.toBuffer('image/png'))
  console.log(`Generado (archivo para corte, fondo transparente): ${finalPath}`)

  const previewCanvas = renderSign({ withPreviewBackground: true })
  const previewPath = path.join(OUT_DIR, 'espejo-bienvenida-preview.png')
  writeFileSync(previewPath, previewCanvas.toBuffer('image/png'))
  console.log(`Generado (solo para visualizar, incluye guia del arco/luz): ${previewPath}`)
}

main()
