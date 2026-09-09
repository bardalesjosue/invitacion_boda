// Genera las tarjetas de numero de mesa (1 al 10) reutilizando el estilo
// visual de la pagina de invitacion (src/pages/Invitation.tsx): mismo fondo
// floral, mismos colores dorado/verde y la misma tipografia de los novios.
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const OUT_DIR = path.join(ROOT, 'numeros-mesa')
const BACKGROUND = path.join(ROOT, 'public', 'images', 'fondo.png')

const FONTS_DIR = path.join(__dirname, 'assets', 'fonts')
GlobalFonts.registerFromPath(
  path.join(ROOT, 'public', 'fonts', 'BrittanySignature.ttf'),
  'Brittany Signature',
)
GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'PlayfairDisplay-Black.ttf'), 'Playfair Display')
GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'Montserrat-SemiBold.ttf'), 'Montserrat SemiBold')
GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'Montserrat-ExtraBold.ttf'), 'Montserrat ExtraBold')

// Paleta tomada de Invitation.tsx
const COLOR = {
  green: '#394D3B',
  goldDark: '#8E6B23',
  goldMid: '#B58C28',
  gold: '#C8A14B',
  cream: '#FDFBF7',
  divider: '#E8DCC4',
}

const WIDTH = 1240
const HEIGHT = 1748
const TOTAL_TABLES = 10

function drawBotanicalDivider(ctx, cx, cy, scale = 1) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(scale, scale)
  ctx.fillStyle = COLOR.gold
  ctx.globalAlpha = 0.85

  // Corazon central (mismo trazo que el SVG de Invitation.tsx, re-centrado en 0,0)
  ctx.beginPath()
  ctx.moveTo(0, 2.5)
  ctx.bezierCurveTo(-0.6, 2, -4, -0.5, -4, -2.8)
  ctx.bezierCurveTo(-4, -3.8, -3.3, -4.5, -2.3, -4.5)
  ctx.bezierCurveTo(-1.8, -4.5, -1.3, -4.2, -1, -3.8)
  ctx.lineTo(0, -2.6)
  ctx.lineTo(1, -3.8)
  ctx.bezierCurveTo(1.3, -4.2, 1.8, -4.5, 2.3, -4.5)
  ctx.bezierCurveTo(3.3, -4.5, 4, -3.8, 4, -2.8)
  ctx.bezierCurveTo(4, -1.5, 2.8, -0.4, 0.6, 2)
  ctx.closePath()
  ctx.fill()

  // Ramas a ambos lados
  const branch = (mirror) => {
    ctx.save()
    ctx.scale(mirror, 1)
    ctx.globalAlpha = 0.7
    ctx.beginPath()
    ctx.moveTo(6, 0)
    ctx.bezierCurveTo(2, 0, -2, -0.5, -6, -1.5)
    ctx.bezierCurveTo(-9, -2.5, -12, -4, -15, -4.5)
    ctx.bezierCurveTo(-14.5, -3.7, -13.8, -3, -13, -2.5)
    ctx.bezierCurveTo(-10, -2, -7, -1, -4, 0)
    ctx.bezierCurveTo(0, 1, 4, 1.5, 8, 1.5)
    ctx.lineTo(9, 1.5)
    ctx.lineTo(9, 0.5)
    ctx.closePath()
    ctx.fill()

    ctx.globalAlpha = 0.8
    ctx.beginPath()
    ctx.moveTo(-12, -1.5)
    ctx.bezierCurveTo(-13.5, -2, -15.5, -2.3, -17, -3)
    ctx.bezierCurveTo(-16.2, -3.3, -15.5, -3.3, -14.8, -3)
    ctx.bezierCurveTo(-13.6, -2.5, -12.3, -2, -11.3, -1.5)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(-22, -2)
    ctx.bezierCurveTo(-23, -2.5, -24.5, -2.8, -25.5, -3.5)
    ctx.bezierCurveTo(-24.8, -3.7, -24.2, -3.7, -23.7, -3.5)
    ctx.bezierCurveTo(-22.9, -3, -21.9, -2.5, -21.2, -2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  branch(1)
  branch(-1)
  ctx.restore()
}

function drawHeartOutline(ctx, cx, cy, size) {
  ctx.save()
  ctx.translate(cx - size / 2, cy - size / 2)
  ctx.strokeStyle = COLOR.gold
  ctx.globalAlpha = 0.8
  ctx.lineWidth = size * 0.045
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const s = size / 24
  ctx.beginPath()
  ctx.moveTo(4.318 * s, 6.318 * s)
  ctx.bezierCurveTo(2.8 * s, 7.8 * s, 2.8 * s, 10.6 * s, 4.318 * s, 12.682 * s)
  ctx.lineTo(12 * s, 20.364 * s)
  ctx.lineTo(19.682 * s, 12.682 * s)
  ctx.bezierCurveTo(21.2 * s, 10.6 * s, 21.2 * s, 7.8 * s, 19.682 * s, 6.318 * s)
  ctx.bezierCurveTo(17.6 * s, 4.24 * s, 14.4 * s, 4.5 * s, 13.318 * s, 6.318 * s)
  ctx.lineTo(12 * s, 7.636 * s)
  ctx.lineTo(10.682 * s, 6.318 * s)
  ctx.bezierCurveTo(9.6 * s, 4.5 * s, 6.4 * s, 4.24 * s, 4.318 * s, 6.318 * s)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

// BrittanySignature.ttf no incluye glyphs con tilde (p.ej. "Josué" pierde el
// acento en la é), asi que la dibujamos a mano con un pequeño trazo, igual de
// fino que el resto de la firma.
const ACUTE_MAP = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U' }

function measureScriptWord(ctx, text) {
  return ctx.measureText(text).width
}

function drawScriptWord(ctx, text, x, y) {
  const fontSizeMatch = /([\d.]+)px/.exec(ctx.font)
  const fontSize = fontSizeMatch ? parseFloat(fontSizeMatch[1]) : 80
  ctx.save()
  ctx.textAlign = 'left'
  ctx.fillText(text, x, y)
  let cursor = x
  for (const ch of text) {
    const w = ctx.measureText(ch).width
    if (ACUTE_MAP[ch]) {
      const ax = cursor + w * 0.6
      const ay = y - fontSize * 0.72
      ctx.strokeStyle = ctx.fillStyle
      ctx.lineWidth = Math.max(2, fontSize * 0.045)
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(ax - fontSize * 0.05, ay + fontSize * 0.045)
      ctx.lineTo(ax + fontSize * 0.05, ay - fontSize * 0.045)
      ctx.stroke()
    }
    cursor += w
  }
  ctx.restore()
}

function drawTrackedText(ctx, text, cx, y, tracking) {
  // canvas no soporta letter-spacing nativo de forma consistente entre motores,
  // asi que medimos y centramos manualmente respetando el tracking deseado.
  const chars = text.split('')
  const widths = chars.map((c) => ctx.measureText(c).width)
  const totalWidth = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1)
  let x = cx - totalWidth / 2
  const align = ctx.textAlign
  ctx.textAlign = 'left'
  chars.forEach((c, i) => {
    ctx.fillText(c, x, y)
    x += widths[i] + tracking
  })
  ctx.textAlign = align
}

async function renderTableCard(number) {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  // Fondo floral (mismo asset que la invitacion)
  const bg = await loadImage(BACKGROUND)
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT)

  // Marco dorado sutil, igual que el borde de la tarjeta en Invitation.tsx
  ctx.strokeStyle = COLOR.gold
  ctx.globalAlpha = 0.35
  ctx.lineWidth = 2
  ctx.strokeRect(28, 28, WIDTH - 56, HEIGHT - 56)
  ctx.globalAlpha = 1

  // Etiqueta "MESA"
  ctx.fillStyle = COLOR.goldDark
  ctx.font = '700 42px "Montserrat ExtraBold"'
  ctx.textBaseline = 'alphabetic'
  drawTrackedText(ctx, 'MESA', WIDTH / 2, 500, 16)

  drawHeartOutline(ctx, WIDTH / 2, 555, 42)

  // Numero grande.
  // Playfair Display usa cifras estilo "old-style" por defecto: 0/1/2/6/8 son
  // altas y apenas bajan de la linea base, mientras que 3/4/5/7/9 son mas
  // bajas mide pero bajan bastante (hasta ~19/120 del tamaño de fuente). Con
  // un baseline fijo para todas, el "6"/"8" quedaban visualmente mas arriba
  // que el resto. Para que se vean parejas, se mide la caja real de cada
  // numero y se centra en un mismo punto (NUMBER_CENTER_Y); el divisor de
  // abajo queda en una posicion fija, calculada para el peor caso (6/8), así
  // nunca choca contra el numero sea cual sea el digito.
  const NUMBER_CENTER_Y = 950
  ctx.fillStyle = COLOR.green
  ctx.font = '900 760px "Playfair Display"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  const numberText = String(number)
  const numberMetrics = ctx.measureText(numberText)
  const numberBaselineY =
    NUMBER_CENTER_Y + (numberMetrics.actualBoundingBoxAscent - numberMetrics.actualBoundingBoxDescent) / 2
  ctx.shadowColor = 'rgba(0,0,0,0.12)'
  ctx.shadowBlur = 10
  ctx.shadowOffsetY = 6
  ctx.fillText(numberText, WIDTH / 2, numberBaselineY)
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0
  ctx.textAlign = 'left'

  // Divisor botanico dorado (posicion fija, ver comentario arriba)
  const DIVIDER_Y = NUMBER_CENTER_Y + 345
  drawBotanicalDivider(ctx, WIDTH / 2, DIVIDER_Y, 3.8)

  // Nombres de los novios, con la misma tipografia y colores que la invitacion
  const nameY = DIVIDER_Y + 140
  const ampY = DIVIDER_Y + 123
  ctx.font = '104px "Brittany Signature"'
  const wJosue = measureScriptWord(ctx, 'Josué')
  const wMariela = measureScriptWord(ctx, 'Mariela')
  ctx.font = '58px "Brittany Signature"'
  const wAmp = measureScriptWord(ctx, '&')
  const gap = 29
  const totalWidth = wJosue + gap + wAmp + gap + wMariela
  let cursorX = WIDTH / 2 - totalWidth / 2

  ctx.font = '104px "Brittany Signature"'
  ctx.fillStyle = COLOR.green
  drawScriptWord(ctx, 'Josué', cursorX, nameY)
  cursorX += wJosue + gap

  ctx.font = '58px "Brittany Signature"'
  ctx.fillStyle = COLOR.goldMid
  ctx.textAlign = 'left'
  ctx.fillText('&', cursorX, ampY)
  cursorX += wAmp + gap

  ctx.font = '104px "Brittany Signature"'
  ctx.fillStyle = COLOR.green
  drawScriptWord(ctx, 'Mariela', cursorX, nameY)

  // Linea + fecha
  const LINE_Y = nameY + 90
  ctx.strokeStyle = COLOR.divider
  ctx.globalAlpha = 0.9
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(WIDTH / 2 - 110, LINE_Y)
  ctx.lineTo(WIDTH / 2 + 110, LINE_Y)
  ctx.stroke()
  ctx.globalAlpha = 1

  ctx.fillStyle = COLOR.goldDark
  ctx.font = '600 32px "Montserrat SemiBold"'
  drawTrackedText(ctx, '4 DE DICIEMBRE · 2026', WIDTH / 2, LINE_Y + 65, 5)

  return canvas
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  for (let n = 1; n <= TOTAL_TABLES; n++) {
    const canvas = await renderTableCard(n)
    const buffer = canvas.toBuffer('image/png')
    const filePath = path.join(OUT_DIR, `mesa-${String(n).padStart(2, '0')}.png`)
    writeFileSync(filePath, buffer)
    console.log(`Generado: ${filePath}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
