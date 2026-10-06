// Arma hojas tamaño carta (horizontal) con dos numeros de mesa cada una
// (1-2, 3-4, ...) y una linea gris suave alrededor de cada tarjeta como guia
// de recorte. Usa los PNG generados por generate-table-numbers.mjs, asi que
// ese script debe correrse antes.
import { PDFDocument, loadImage } from '@napi-rs/canvas'
import { existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CARDS_DIR = path.join(ROOT, 'numeros-mesa')

const TOTAL_TABLES = 10

// Medidas en puntos PDF (1 pulgada = 72 pt). Carta horizontal: 11 x 8.5 in.
const PAGE_W = 11 * 72
const PAGE_H = 8.5 * 72
const MARGIN = 18 // 1/4 in: margen seguro para la mayoria de impresoras
const GAP = 18 // espacio entre las dos tarjetas, para cortar con holgura

const CARD_RATIO = 1748 / 1240 // alto / ancho de las tarjetas PNG
const CARD_W = (PAGE_W - 2 * MARGIN - GAP) / 2
const CARD_H = CARD_W * CARD_RATIO
const CARD_Y = (PAGE_H - CARD_H) / 2

const CUT_LINE_COLOR = '#C8C8C8'
const CUT_LINE_WIDTH = 0.5

const cardFile = (n) => path.join(CARDS_DIR, `mesa-${String(n).padStart(2, '0')}.png`)

async function renderSheet(first, second) {
  const doc = new PDFDocument({ title: `Numeros de mesa ${first} y ${second}` })
  const ctx = doc.beginPage(PAGE_W, PAGE_H)

  const positions = [MARGIN, MARGIN + CARD_W + GAP]
  for (const [i, n] of [first, second].entries()) {
    const x = positions[i]
    const img = await loadImage(cardFile(n))
    ctx.drawImage(img, x, CARD_Y, CARD_W, CARD_H)

    ctx.strokeStyle = CUT_LINE_COLOR
    ctx.lineWidth = CUT_LINE_WIDTH
    ctx.strokeRect(x, CARD_Y, CARD_W, CARD_H)
  }

  doc.endPage()
  return doc.close()
}

async function main() {
  for (let n = 1; n <= TOTAL_TABLES; n++) {
    if (!existsSync(cardFile(n))) {
      throw new Error(`Falta ${cardFile(n)}. Corre primero: node scripts/generate-table-numbers.mjs`)
    }
  }

  for (let n = 1; n <= TOTAL_TABLES; n += 2) {
    const pdf = await renderSheet(n, n + 1)
    const pad = (v) => String(v).padStart(2, '0')
    const filePath = path.join(CARDS_DIR, `carta-mesas-${pad(n)}-${pad(n + 1)}.pdf`)
    writeFileSync(filePath, pdf)
    console.log(`Generado: ${filePath}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
