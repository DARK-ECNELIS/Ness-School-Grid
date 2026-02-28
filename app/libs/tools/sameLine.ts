import { Line } from "../types/grid";

export function sameLine(a: Line, b: Line): boolean {
  return (
    (a.from.x === b.from.x &&
      a.from.y === b.from.y &&
      a.to.x === b.to.x &&
      a.to.y === b.to.y) ||
    (a.from.x === b.to.x &&
      a.from.y === b.to.y &&
      a.to.x === b.from.x &&
      a.to.y === b.from.y)
  )
}