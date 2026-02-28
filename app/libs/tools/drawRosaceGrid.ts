export function drawRosaceGrid(ctx: CanvasRenderingContext2D, GRID_SIZE: number, CELL: number, color: `#${string}` | string, color2: `#${string}` | string) {
  const center =( GRID_SIZE / 2) * CELL

  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(center, 0)
  ctx.lineTo(center, GRID_SIZE * CELL)
  ctx.stroke()

  ctx.strokeStyle = color2
  ctx.beginPath()
  ctx.moveTo(0, center)
  ctx.lineTo(GRID_SIZE * CELL, center)
  ctx.stroke()
}