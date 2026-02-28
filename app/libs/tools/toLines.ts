import { Point, Line } from "../types/grid"
import { removeBackTracking } from "./removeBackTracking"

// function toLines(points: Point[]): Line[] {
//   const lines: Line[] = []
//   for (let i = 0; i < points.length; i++) {
//     lines.push({
//       from: points[i],
//       to: points[(i + 1) % points.length]
//     })
//   }
//   return lines
// }

// function toLines(points: Point[]): Line[] {
//   const cleaned = cleanPoints(points)

//   const lines: Line[] = []

//   for (let i = 0; i < cleaned.length; i++) {
//     lines.push({
//       from: cleaned[i],
//       to: cleaned[(i + 1) % cleaned.length]
//     })
//   }

//   return lines
// }

export function toLines(points: Point[]): Line[] {
  const noBacktrack = removeBackTracking(points)

  const lines: Line[] = []

  for (let i = 0; i < noBacktrack.length; i++) {
    lines.push({
      from: noBacktrack[i],
      to: noBacktrack[(i + 1) % noBacktrack.length]
    })
  }

  return lines
}