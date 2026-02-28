import { Line, Mode } from "../types/grid"
import { generateConvex } from "./generateConvex"
import { generatePlanar } from "./generatePlanar"
import { generateConcave } from "./genereteConcave"

export function generateAdvanced(gridSize: number, mode: Mode, level: number): Line[] {
  
  switch (mode) {
    case "convex":
      return generateConvex(gridSize, level)

    case "concave":
      return generateConcave(gridSize, level)

    case "planar":
      return generatePlanar(gridSize)
  }
}