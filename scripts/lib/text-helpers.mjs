// Helpers de texto compartidos entre los generadores de Canvas del proyecto.

// BrittanySignature.ttf no incluye glyphs con tilde (p.ej. "Josué" pierde el
// acento en la é), asi que la dibujamos a mano con un pequeño trazo, igual de
// fino que el resto de la firma.
export const ACUTE_MAP = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U' }

export function measureScriptWord(ctx, text) {
  return ctx.measureText(text).width
}

export function drawScriptWord(ctx, text, x, y) {
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

// canvas no soporta letter-spacing nativo de forma consistente entre motores,
// asi que medimos y centramos manualmente respetando el tracking deseado.
export function measureTrackedWidth(ctx, text, tracking) {
  const chars = text.split('')
  const widths = chars.map((c) => ctx.measureText(c).width)
  return widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1)
}

export function drawTrackedText(ctx, text, cx, y, tracking) {
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
