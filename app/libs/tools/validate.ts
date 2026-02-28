import { Line } from "../types/grid"
import { sameLine } from "./sameLine"

export function validate(expected: Line[], userLines: Line[], setMessage: (message: string) => void, setScore: (update: (score: number) => number) => void, setLevel: (update: (level: number) => number) => void, level: number,setIsRunning: (isRunning: boolean) => void, isRunning: boolean) {
  if (!isRunning) return

  const missing = expected.filter(
    e => !userLines.some(u => sameLine(e, u))
  )

  const extra = userLines.filter(
    u => !expected.some(e => sameLine(e, u))
  )

  if (missing.length === 0 && extra.length === 0) {
    const gained = 10 * level
    setScore(s => s + gained)
    setMessage(`✅ Niveau réussi ! +${gained} points`)
    setLevel(l => l + 1)
    setIsRunning(false)
  } else {
    const penalty = missing.length + extra.length
    setScore(s => Math.max(0, s - penalty))
    setMessage(`❌ Erreurs : -${penalty} points`)
  }
}