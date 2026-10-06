// Quita el color/textura de papel crema de fondo.png y deja solo los adornos
// (flores, hojas, manchas de acuarela y salpicaduras doradas) sobre blanco.
// Pensado para imprimir sobre cartulina crema: el papel ya aporta el color y
// asi la impresora solo gasta tinta en los detalles.
import { createCanvas, loadImage } from '@napi-rs/canvas'

// Color medio del papel en fondo.png (medido en una zona lisa).
const PAPER = [251, 249, 245]

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)

export async function loadBackgroundWithoutPaper(file, width, height) {
  const img = await loadImage(file)
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)
  const image = ctx.getImageData(0, 0, width, height)
  const d = image.data
  const n = width * height

  // 1) Mascara: que tan "adorno" es cada pixel. La textura del papel es clara
  //    y casi neutra; las manchas de acuarela son mas amarillas y las flores /
  //    dorados son mas oscuros o mas saturados.
  const mask = new Float32Array(n)
  for (let p = 0; p < n; p++) {
    const i = p * 4
    const r = d[i] / PAPER[0]
    const g = d[i + 1] / PAPER[1]
    const b = d[i + 2] / PAPER[2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const yellow = (r + g) / 2 - b
    const chroma = Math.max(r, g, b) - Math.min(r, g, b)
    const byDark = (0.93 - lum) / 0.08
    const byColor = Math.max((yellow - 0.03) / 0.05, (chroma - 0.05) / 0.06)
    mask[p] = clamp01(Math.max(byDark, byColor))
  }

  // 2) Suavizado de la mascara (caja 5x5) para que las manchas no queden
  //    granuladas por la textura del papel.
  const R = 2
  const tmp = new Float32Array(n)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let s = 0
      let c = 0
      for (let k = -R; k <= R; k++) {
        const xx = x + k
        if (xx >= 0 && xx < width) { s += mask[y * width + xx]; c++ }
      }
      tmp[y * width + x] = s / c
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let s = 0
      let c = 0
      for (let k = -R; k <= R; k++) {
        const yy = y + k
        if (yy >= 0 && yy < height) { s += tmp[yy * width + x]; c++ }
      }
      // Se conserva el maximo con la original para no perder bordes finos.
      mask[y * width + x] = smooth(clamp01(Math.max(s / c, mask[y * width + x] * 0.85)))
    }
  }

  // 3) Mezcla con blanco: el papel pasa a blanco puro y los adornos se
  //    conservan, corrigiendo el tinte crema para que no se sume al de la
  //    cartulina.
  for (let p = 0; p < n; p++) {
    const i = p * 4
    const a = mask[p]
    for (let ch = 0; ch < 3; ch++) {
      const corrected = Math.min(255, (d[i + ch] / PAPER[ch]) * 255)
      d[i + ch] = Math.round(255 * (1 - a) + corrected * a)
    }
    d[i + 3] = 255
  }

  ctx.putImageData(image, 0, 0)
  return canvas
}
