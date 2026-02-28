import { Line, Point } from "../types/grid"
import { toLines } from "./toLines"

export function generateConcave(gridSize: number, lines: number): Line[] {
  const center = gridSize / 2
  const pts: Point[] = []

  for (let i = 0; i < lines; i++) {
    const angle = (i / lines) * Math.PI * 2

    const baseRadius = gridSize * 0.35
    const variation = i % 2 === 0 ? 0.5 : 1

    pts.push({
      x: Math.round(center + Math.cos(angle) * baseRadius * variation),
      y: Math.round(center + Math.sin(angle) * baseRadius * variation)
    })
  }

  return toLines(pts)
}