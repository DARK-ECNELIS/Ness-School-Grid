import { Line } from "../types/grid"
import { mergeColinearLines } from "./mergeColinearLines"

export function generatePlanar(gridSize: number): Line[] {
  const lines: Line[] = []

  for (let x = 1; x < gridSize - 1; x++) {
    for (let y = 1; y < gridSize - 1; y++) {
      if (Math.random() > 0.7) {
        lines.push({
          from: { x, y },
          to: { x: x + 1, y }
        })
      }

      if (Math.random() > 0.7) {
        lines.push({
          from: { x, y },
          to: { x, y: y + 1 }
        })
      }
    }
  }

  return mergeColinearLines(lines)
}