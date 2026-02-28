import { Line } from "../types/grid";

export function mirrorBoth(line: Line, cx: number, cy: number): Line {
  return {
    from: { x: 2 * cx - line.from.x, y: 2 * cy - line.from.y },
    to:   { x: 2 * cx - line.to.x,   y: 2 * cy - line.to.y }
  }
}