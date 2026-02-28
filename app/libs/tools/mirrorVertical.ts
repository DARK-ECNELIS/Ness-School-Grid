import { Line } from "../types/grid";

export function mirrorVertical(line: Line, cx: number): Line {
  return {
    from: { x: 2 * cx - line.from.x, y: line.from.y },
    to:   { x: 2 * cx - line.to.x,   y: line.to.y }
  }
}