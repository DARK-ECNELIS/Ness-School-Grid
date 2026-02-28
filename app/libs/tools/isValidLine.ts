import { Point } from "../types/grid"

// export function isValidLine(a: Point, b: Point): boolean {
//   const dx = Math.abs(b.x - a.x)
//   const dy = Math.abs(b.y - a.y)

//   // horizontale
//   if (a.y === b.y && dx > 0) return true

//   // verticale
//   if (a.x === b.x && dy > 0) return true

//   // diagonale
//   if (dx === dy && dx > 0) return true

//   return false
// }
export function isValidLine(a: Point, b: Point): boolean {
  if (a.x === b.x && a.y === b.y) return false

  const dx = b.x - a.x
  const dy = b.y - a.y

  const gcd = (n: number, m: number): number =>
    m === 0 ? n : gcd(m, n % m)

  const divisor = gcd(Math.abs(dx), Math.abs(dy))

  return divisor > 0
}