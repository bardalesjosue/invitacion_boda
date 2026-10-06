// Version Word (.docx) de las hojas tamaño carta: dos numeros de mesa por
// pagina (1-2, 3-4, ...) en horizontal, cada tarjeta con una linea gris suave
// alrededor como guia de recorte. Usa los PNG generados por
// generate-table-numbers.mjs, asi que ese script debe correrse antes.
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeightRule,
  ImageRun,
  Packer,
  PageOrientation,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  WidthType,
} from 'docx'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CARDS_DIR = path.join(ROOT, 'numeros-mesa')
const OUT_FILE = path.join(CARDS_DIR, 'numeros-mesa-carta.docx')

const TOTAL_TABLES = 10

// Medidas en DXA (1440 = 1 pulgada). Mismas que la version PDF:
// carta horizontal, margen de 1/4 in y 1/4 in entre tarjetas.
const INCH = 1440
const PAGE_W = 11 * INCH
const PAGE_H = 8.5 * INCH
const MARGIN = INCH / 4
const GAP = INCH / 4
const CARD_W = (PAGE_W - 2 * MARGIN - GAP) / 2
const CARD_H = Math.round((CARD_W * 1748) / 1240)
// Margen superior que centra verticalmente las tarjetas en la hoja
const MARGIN_TOP = Math.round((PAGE_H - CARD_H) / 2)

// ImageRun mide en pixeles a 96 dpi
const toPx = (dxa) => (dxa / INCH) * 96

const CUT_LINE = { style: BorderStyle.SINGLE, size: 4, color: 'C8C8C8' } // 0.5 pt
const NO_LINE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const NO_PADDING = { top: 0, bottom: 0, left: 0, right: 0 }

const cardFile = (n) => path.join(CARDS_DIR, `mesa-${String(n).padStart(2, '0')}.png`)

function cardCell(n) {
  return new TableCell({
    width: { size: CARD_W, type: WidthType.DXA },
    margins: NO_PADDING,
    borders: { top: CUT_LINE, bottom: CUT_LINE, left: CUT_LINE, right: CUT_LINE },
    children: [
      new Paragraph({
        spacing: { before: 0, after: 0, line: 240 },
        children: [
          new ImageRun({
            type: 'png',
            data: readFileSync(cardFile(n)),
            transformation: { width: toPx(CARD_W), height: toPx(CARD_H) },
            altText: { title: `Mesa ${n}`, description: `Numero de mesa ${n}`, name: `mesa-${n}` },
          }),
        ],
      }),
    ],
  })
}

function gapCell() {
  return new TableCell({
    width: { size: GAP, type: WidthType.DXA },
    margins: NO_PADDING,
    borders: { top: NO_LINE, bottom: NO_LINE, left: CUT_LINE, right: CUT_LINE },
    children: [new Paragraph({ spacing: { before: 0, after: 0 } })],
  })
}

function sheet(first, second) {
  const table = new Table({
    width: { size: 2 * CARD_W + GAP, type: WidthType.DXA },
    columnWidths: [CARD_W, GAP, CARD_W],
    layout: TableLayoutType.FIXED,
    alignment: AlignmentType.CENTER,
    borders: {
      top: NO_LINE,
      bottom: NO_LINE,
      left: NO_LINE,
      right: NO_LINE,
      insideHorizontal: NO_LINE,
      insideVertical: NO_LINE,
    },
    rows: [
      new TableRow({
        height: { value: CARD_H, rule: HeightRule.EXACT },
        cantSplit: true,
        children: [cardCell(first), gapCell(), cardCell(second)],
      }),
    ],
  })
  // Word exige un parrafo despues de cada tabla; se deja minimo para que no
  // empuje contenido a una pagina extra. Cada hoja es su propia seccion.
  const after = new Paragraph({ spacing: { before: 0, after: 0, line: 20, lineRule: 'exact' } })
  return [table, after]
}

async function main() {
  for (let n = 1; n <= TOTAL_TABLES; n++) {
    if (!existsSync(cardFile(n))) {
      throw new Error(`Falta ${cardFile(n)}. Corre primero: node scripts/generate-table-numbers.mjs`)
    }
  }

  const sections = []
  for (let n = 1; n <= TOTAL_TABLES; n += 2) {
    sections.push({
      properties: {
        page: {
          size: { width: PAGE_H, height: PAGE_W, orientation: PageOrientation.LANDSCAPE },
          margin: { top: MARGIN_TOP, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 0, footer: 0 },
        },
      },
      children: sheet(n, n + 1),
    })
  }

  const doc = new Document({ title: 'Numeros de mesa', sections })
  writeFileSync(OUT_FILE, await Packer.toBuffer(doc))
  console.log(`Generado: ${OUT_FILE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
