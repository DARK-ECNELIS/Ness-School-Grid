import { Line } from "../types/grid"

export function mergeColinearLines(lines: Line[]): Line[] {
  const horizontals = new Map<number, Line[]>()
  const verticals = new Map<number, Line[]>()

  // Séparer H / V
  for (const l of lines) {
    if (l.from.y === l.to.y) {
      const y = l.from.y
      if (!horizontals.has(y)) horizontals.set(y, [])
      horizontals.get(y)!.push(l)
    } else if (l.from.x === l.to.x) {
      const x = l.from.x
      if (!verticals.has(x)) verticals.set(x, [])
      verticals.get(x)!.push(l)
    }
  }

  const merged: Line[] = []

  // Fusion horizontale
  for (const [y, group] of horizontals) {
    const sorted = group
      .map(l => ({
        start: Math.min(l.from.x, l.to.x),
        end: Math.max(l.from.x, l.to.x)
      }))
      .sort((a, b) => a.start - b.start)

    let current = sorted[0]

    for (let i = 1; i < sorted.length; i++) {
      const next = sorted[i]

      if (next.start <= current.end) {
        current.end = Math.max(current.end, next.end)
      } else {
        merged.push({
          from: { x: current.start, y },
          to: { x: current.end, y }
        })
        current = next
      }
    }

    merged.push({
      from: { x: current.start, y },
      to: { x: current.end, y }
    })
  }

  // Fusion verticale
  for (const [x, group] of verticals) {
    const sorted = group
      .map(l => ({
        start: Math.min(l.from.y, l.to.y),
        end: Math.max(l.from.y, l.to.y)
      }))
      .sort((a, b) => a.start - b.start)

    let current = sorted[0]

    for (let i = 1; i < sorted.length; i++) {
      const next = sorted[i]

      if (next.start <= current.end) {
        current.end = Math.max(current.end, next.end)
      } else {
        merged.push({
          from: { x, y: current.start },
          to: { x, y: current.end }
        })
        current = next
      }
    }

    merged.push({
      from: { x, y: current.start },
      to: { x, y: current.end }
    })
  }

  return merged
}