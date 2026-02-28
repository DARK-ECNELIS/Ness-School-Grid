import { Line, Point } from "../types/grid"
import { toLines } from "./toLines"

export function generateConvex(gridSize: number, lines: number): Line[] {
  const center = gridSize / 2
  const pts: Point[] = []

  for (let i = 0; i < lines; i++) {
    const angle = (i / lines) * Math.PI * 2
    const radius = gridSize * 0.35

    pts.push({
      x: Math.round(center + Math.cos(angle) * radius),
      y: Math.round(center + Math.sin(angle) * radius)
    })
  }

  return toLines(pts)
}