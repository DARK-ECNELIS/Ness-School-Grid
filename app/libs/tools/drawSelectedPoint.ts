import { Point } from "../types/grid"

export function drawSelectedPoint(ctx: CanvasRenderingContext2D, point: Point, CELL: number, color: string | `#${string}`) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(point.x * CELL, point.y * CELL, 6, 0, Math.PI * 2)
  ctx.fill()
}