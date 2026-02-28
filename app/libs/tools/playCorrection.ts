import { Line } from "../types/grid"
import { redraw } from "./redraw";
import { sameLine } from "./sameLine";

export function playCorrection(ctx: CanvasRenderingContext2D, GRID_SIZE: number, CELL: number, userLines: Line[], expectedFigure: Line[]) {

  redraw(ctx, GRID_SIZE, CELL, userLines, "#ccc", "#1e90ff")

  const steps: { line: Line; color: string }[] = []

  userLines.forEach(l => {
    if (expectedFigure.some(e => sameLine(e, l))) {
      steps.push({ line: l, color: "green" })
    } else {
      steps.push({ line: l, color: "red" })
    }
  })

  expectedFigure.forEach(l => {
    if (!userLines.some(u => sameLine(u, l))) {
      steps.push({ line: l, color: "orange" })
    }
  })

  let i = 0

  function drawStep() {
    if (i >= steps.length) return

    const step = steps[i]

    ctx.strokeStyle = step.color
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(step.line.from.x * CELL, step.line.from.y * CELL)
    ctx.lineTo(step.line.to.x * CELL, step.line.to.y * CELL)
    ctx.stroke()

    i++
    setTimeout(drawStep, 500)
  }

  drawStep()
}