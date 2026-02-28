import { Line } from "../types/grid"
import { drawGrid } from "./drawGrid"
import { drawLines } from "./drawLines"

export function redraw(ctx: CanvasRenderingContext2D, GRID_SIZE: number, CELL: number, userLines: Line[], gridColor: `#${string}` | string, lineColor: `#${string}` | string) {

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  drawGrid(ctx, GRID_SIZE, CELL, gridColor)
  drawLines(ctx, userLines, CELL, lineColor)
}