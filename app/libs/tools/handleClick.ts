import { Line, Point } from "../types/grid"
import { drawSelectedPoint } from "./drawSelectedPoint"
import { isValidLine } from "./isValidLine"

export function handleClick(mouse: React.MouseEvent<HTMLCanvasElement>, CELL: number, selected: Point | null, userLines: Line[], setSelected: (p: Point | null) => void, setUserLines: (lines: Line[]) => void, selectedMode: string, ctx: CanvasRenderingContext2D, drawPointColor: {selected: string | `#${string}`, draw: string | `#${string}`}) {
  const rect = mouse.currentTarget.getBoundingClientRect()
  const x = Math.round((mouse.clientX - rect.left) / CELL)
  const y = Math.round((mouse.clientY - rect.top) / CELL)
  const point = { x, y }

  if (!selected) {
    
    drawSelectedPoint(ctx, point, CELL, drawPointColor.selected)
    setSelected(point)
    return
  }

  if (isValidLine(selected, point)) {
    setUserLines([...userLines, { from: selected, to: point }])

    if (selectedMode === "click") {
      setSelected(null)
    } else {
      setTimeout(() => {
      setSelected(point)
      drawSelectedPoint(ctx, point, CELL, drawPointColor.draw)
      }, 1)
    }
  }

}