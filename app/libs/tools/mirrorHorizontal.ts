import { Line } from "../types/grid";

export function mirrorHorizontal(line: Line, cy: number): Line {
  return {
    from: { x: line.from.x, y: 2 * cy - line.from.y },
    to:   { x: line.to.x,   y: 2 * cy - line.to.y }
  }
}