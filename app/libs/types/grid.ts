type Point = { x: number; y: number }
type Line = { from: Point; to: Point }
type Figure = Line[]

export type { Point, Line, Figure }

type Cell = {
  x: number
  y: number
  filled: boolean
  color?: string
}

type State = {
  selectedPoint: Point | null
  userLines: Line[]
}

type Mode = "convex" | "concave" | "planar"

export type { Cell, State, Mode }