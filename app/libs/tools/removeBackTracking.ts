import { Point } from "../types/grid"

export function removeBackTracking(points: Point[]): Point[] {
  if (points.length < 3) return points

  const cleaned: Point[] = [points[0]]

  for (let i = 1; i < points.length; i++) {
    const current = points[i]
    const beforePrev = cleaned[cleaned.length - 2]

    // Si on fait A -> B -> A on ignore le retour arrière
    if (beforePrev && current.x === beforePrev.x && current.y === beforePrev.y) continue

    cleaned.push(current)
  }

  return cleaned
}