import { Line, Mode } from "../types/grid"
import { generateAdvanced } from "./generateAdvanced"
import { generateConvex } from "./generateConvex"
import { mirrorBoth } from "./mirrorBoth"
import { mirrorHorizontal } from "./mirrorHorizontal"
import { mirrorVertical } from "./mirrorVertical"

export function generateRosace(gridSize: number, mode: Mode, level: number): Line[] {
  const center = Math.floor(gridSize / 2)
  let base: Line[] = []

  // Génère uniquement dans le quadrant en haut à droite
  if (mode === "concave") base = generateAdvanced(center + 1, "concave", level)
  else if (mode === "planar") base = generateAdvanced(center + 1, "planar", level)
  else base = generateConvex(center + 1, level)

  const result: Line[] = []

  for (const line of base) {
    result.push(line)
    result.push(mirrorVertical(line, center))
    result.push(mirrorHorizontal(line, center))
    result.push(mirrorBoth(line, center, center))
  }

  return result
}