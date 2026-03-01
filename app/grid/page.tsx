"use client"

import { useEffect, useRef, useState } from "react"
import { drawRosaceGrid, generateAdvanced, generateRosace, handleClick, playCorrection, redraw, validate } from "../libs/tools";
import { Line, Mode, Point } from "../libs/types/grid";
import Image from "next/image";
import Link from "next/link";

const DISPLAY_SIZE = 500

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef2 = useRef<HTMLCanvasElement>(null)

  const [expected, setExpected] = useState<Line[]>([])
  const [userLines, setUserLines] = useState<Line[]>([])
  const [selected, setSelected] = useState<Point | null>(null)
  const [selectedMode, setSelectedMode] = useState("click")

  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isRunning, setIsRunning] = useState(true)
  const [message, setMessage] = useState("")
  const [colorDrawPoint, setColorDrawPoint] = useState({selected: "#FF0000", draw: "#00FF00"})
  const [colorGridModel, setColorGridModel] = useState({background: "#024A70", grid: "#CCCCCC", drawLines: "#FFFFFF"})
  const [colorActiveGridModel, setColorActiveGridModel] = useState({background: "#364153", grid: "#CCCCCC", drawLines: "#1E90FF"})
  const [rosace, setRosace] = useState<boolean>(false)
  const [mode, setMode] = useState<Mode>("convex")
  const [buttonDopMenu, setButtonDopMenu] = useState<boolean>(false)
  const [gridSize, setGridSize] = useState<number>(8)
  
  const CELL = DISPLAY_SIZE /gridSize

  // ================= LOCAL STORAGE =================

  useEffect(() => {
    const savedScore = localStorage.getItem("gridScore")
    const savedLevel = localStorage.getItem("gridLevel")
    const savedColorDrawPoint = localStorage.getItem("colorDrawPoint")
    const savedColorGridModel = localStorage.getItem("colorGridModel")
    const savedColorActiveGridModel = localStorage.getItem("colorActiveGridModel")
    const savedSelectedMode = localStorage.getItem("selectedMode")
    const savedGridSize = localStorage.getItem("gridSize")

    if (savedScore) setScore(Number(savedScore))
    if (savedLevel) setLevel(Number(savedLevel))
    if (savedColorDrawPoint) setColorDrawPoint(JSON.parse(savedColorDrawPoint))
    if (savedColorGridModel) setColorGridModel(JSON.parse(savedColorGridModel))
    if (savedColorActiveGridModel) setColorActiveGridModel(JSON.parse(savedColorActiveGridModel))
    if (savedSelectedMode) setSelectedMode(savedSelectedMode)
    if (savedGridSize) setGridSize(Number(savedGridSize))
  }, [])

  useEffect(() => {
    localStorage.setItem("gridScore", score.toString())
  }, [score])

  useEffect(() => {
    localStorage.setItem("gridLevel", level.toString())
  }, [level])

  useEffect(() => {
    localStorage.setItem("colorDrawPoint", JSON.stringify(colorDrawPoint))
  }, [colorDrawPoint])

  useEffect(() => {
    localStorage.setItem("colorGridModel", JSON.stringify(colorGridModel))
  }, [colorGridModel])

  useEffect(() => {
    localStorage.setItem("colorActiveGridModel", JSON.stringify(colorActiveGridModel))
  }, [colorActiveGridModel])

  useEffect(() => {
    localStorage.setItem("selectedMode", selectedMode)
  }, [selectedMode])

  useEffect(() => {
    localStorage.setItem("gridSize", gridSize.toString())
  }, [gridSize])

  // ================= INIT =================

  useEffect(() => {
    redraw(canvasRef2.current?.getContext("2d")!, gridSize, CELL, expected, colorGridModel.grid, colorGridModel.drawLines)
    if (rosace) drawRosaceGrid(canvasRef2.current?.getContext("2d")!, gridSize, CELL, colorDrawPoint.selected, colorDrawPoint.draw)
  }, [expected, colorGridModel.grid, colorGridModel.drawLines, gridSize])

  useEffect(() => {
    redraw(canvasRef.current?.getContext("2d")!, gridSize, CELL, userLines, colorActiveGridModel.grid, colorActiveGridModel.drawLines)
    if (rosace) drawRosaceGrid(canvasRef.current?.getContext("2d")!, gridSize, CELL, colorDrawPoint.selected, colorDrawPoint.draw)
  }, [userLines, colorActiveGridModel.grid, colorActiveGridModel.drawLines, gridSize])

  useEffect(() => {
    if (rosace) {
      drawRosaceGrid(canvasRef2.current?.getContext("2d")!, gridSize, CELL, colorDrawPoint.selected, colorDrawPoint.draw)
      drawRosaceGrid(canvasRef.current?.getContext("2d")!, gridSize, CELL, colorDrawPoint.selected, colorDrawPoint.draw)
    }
  }, [colorDrawPoint.selected, colorDrawPoint.draw])

  useEffect(() => {
    newExercise()
  }, [level, mode, rosace, gridSize])

  function newExercise() {
    if (rosace) setExpected(generateRosace(gridSize, mode, level + 3))
    else setExpected(generateAdvanced(gridSize, mode, level + 3))
    setUserLines([])
    setTimeLeft(60)
    setIsRunning(true)
    setMessage("")
    setSelected(null)
  }

  // ================= TIMER ROBUSTE =================

  useEffect(() => {
    if (!isRunning) return
    if (timeLeft <= 0) {
      setIsRunning(false)
      setMessage("⏰ No Remaining!")
      return
    }

    const interval = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  return (
    <div className="p-10 flex flex-col">
      <div className="flex justify-between bg-gray-800 p-5 rounded-t">
        <div>
          <h1>Grid Platform</h1>
          <h2>Score : {score}</h2>
          <h3>Level : {level}</h3>
          <h3>Time Remaining : {timeLeft}s</h3>
        </div>

        <Link className="flex gap-2.5 items-center" href={"/school"}>
          <Image alt="Ness-Project Logo" className="" src="/school/SchoolTime.png" width={75} height={75} />
          <h1 className="relative text-7xl z-1">Ness-School</h1>
        </Link>

        <div className="flex flex-col gap-0.5">
          <div>
            Select Mode / Rosace Color: Click <input type="color" value={colorDrawPoint.selected} onChange={(e) => setColorDrawPoint(m => ({...m, selected: e.target.value}))} /> | Link <input type="color" value={colorDrawPoint.draw} onChange={(e) => setColorDrawPoint(m => ({...m, draw: e.target.value}))} />
          </div>

          <div>
            Grid Model: Background <input type="color" value={colorGridModel.background} onChange={(e) => setColorGridModel(m => ({...m, background: e.target.value}))} /> | Grid <input type="color" value={colorGridModel.grid} onChange={(e) => setColorGridModel(m => ({...m, grid: e.target.value}))} /> | DrawLine <input type="color" value={colorGridModel.drawLines} onChange={(e) => setColorGridModel(m => ({...m, drawLines: e.target.value}))} />
          </div>

          <div>
            Drawing Grid: Background <input type="color" value={colorActiveGridModel.background} onChange={(e) => setColorActiveGridModel(m => ({...m, background: e.target.value}))} /> | Grid <input type="color" value={colorActiveGridModel.grid} onChange={(e) => setColorActiveGridModel(m => ({...m, grid: e.target.value}))} /> | DrawLine <input type="color" value={colorActiveGridModel.drawLines} onChange={(e) => setColorActiveGridModel(m => ({...m, drawLines: e.target.value}))} />
          </div>

          <label className="flex items-center gap-2.5">
            Grid Size: {gridSize === 8? "08" : gridSize}
            <input type="range" step={rosace? 2 : 1} min="8" max="32" value={gridSize} className="w-3/4" onChange={(e) => setGridSize(Number(e.target.value))} />
          </label>
        </div>
      </div>

      <div className="flex w-full justify-evenly bg-gray-700 py-16">
        <canvas
          ref={canvasRef}
          width={DISPLAY_SIZE}
          height={DISPLAY_SIZE}
          onClick={(e) => handleClick(e, CELL, selected, userLines, setSelected, setUserLines, selectedMode, canvasRef.current?.getContext("2d")!, colorDrawPoint)}
          className={"border border-solid border-white cursor-pointer"}
          style={{background: colorActiveGridModel.background}}
        />

        <canvas
          ref={canvasRef2}
          width={DISPLAY_SIZE}
          height={DISPLAY_SIZE}
          className={"border border-solid border-white"}
          style={{background: colorGridModel.background}}
        />
      </div>

      <div className="flex justify-between p-2.5 bg-gray-800 rounded-b">
        <button className="p-2.5 bg-gray-700 rounded-md" onClick={() => validate(expected, userLines, setMessage, setScore, setLevel, level, setIsRunning, isRunning)}>✔️ Check</button>
        <button className="p-2.5 bg-gray-700 rounded-md" onClick={() => playCorrection(canvasRef.current?.getContext("2d")!, gridSize, CELL, userLines, expected)}>
          🎬 Animated Correction
        </button>
        <button className="p-2.5 bg-gray-700 rounded-md" onClick={newExercise}>
          🔁 Restart
        </button>
        <button className="p-2.5 bg-gray-700 rounded-md" onClick={() => setSelectedMode(selectedMode === "click" ? "link" : "click")}>
          🖱️ Select Mode: {selectedMode}
        </button>

        <div className="relative" onMouseLeave={() => setButtonDopMenu(false)} onMouseEnter={() => setButtonDopMenu(true)}>
          <button className="p-2.5 flex gap-2 bg-gray-700 rounded-md">
            Generation {mode}
            <svg className="w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
          </button>
          <ul className="absolute w-fit rounded-lg border border-gray-300 bg-gray-700" style={{visibility: buttonDopMenu ? "visible" : "hidden"}}>
            <li value="convex" className="px-2.5 py-1.5 hover:bg-gray-600 cursor-pointer rounded-t-lg" onClick={(e) => {setMode(e.currentTarget.getAttribute("value") as Mode); setButtonDopMenu(false);}} style={{background: mode === "convex"? "#6A7282  ": ""}}>Convex</li>
            <li value="concave" className="px-2.5 py-1.5 hover:bg-gray-600 cursor-pointer" onClick={(e) => {setMode(e.currentTarget.getAttribute("value") as Mode); setButtonDopMenu(false);}} style={{background: mode === "concave"? "#6A7282  ": ""}}>Concave</li>
            <li value="planar" className="px-2.5 py-1.5 hover:bg-gray-600 cursor-pointer rounded-b-lg" onClick={(e) => {setMode(e.currentTarget.getAttribute("value") as Mode); setButtonDopMenu(false);}} style={{background: mode === "planar"? "#6A7282  ": ""}}>Planar</li>
          </ul>
        </div>
        
        <label className="p-2.5 bg-gray-700 rounded-md flex gap-2">
          <input type="checkbox" checked={rosace} onChange={(e) => setRosace(e.target.checked)} />
          Rosace
        </label>

      </div>

      <p style={{display: message ? "block" : "none"}} className="bg-gray-800 mt-5 p-5 rounded">{message}</p>
    </div>
  )
}