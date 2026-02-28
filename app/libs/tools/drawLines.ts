import { Line } from "../types/grid"

export function drawLines(ctx: CanvasRenderingContext2D, lines: Line[], CELL: number, color: `#${string}` | string) {
  ctx.strokeStyle = color
  ctx.lineWidth = 4

  lines.forEach(l => {
    ctx.beginPath()
    ctx.moveTo(l.from.x * CELL, l.from.y * CELL)
    ctx.lineTo(l.to.x * CELL, l.to.y * CELL)
    ctx.stroke()
  })
}