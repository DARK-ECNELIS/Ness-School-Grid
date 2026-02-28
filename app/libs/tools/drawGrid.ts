export function drawGrid(ctx: CanvasRenderingContext2D, GRID_SIZE: number, CELL: number, color: `#${string}` | string) {
  ctx.strokeStyle = color
  ctx.lineWidth = 1

  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath()
    ctx.moveTo(i * CELL, 0)
    ctx.lineTo(i * CELL, GRID_SIZE * CELL)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, i * CELL)
    ctx.lineTo(GRID_SIZE * CELL, i * CELL)
    ctx.stroke()
  }
}