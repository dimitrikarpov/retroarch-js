import { useEffect, useRef, useState } from "react"
import { Retroarch as RetroarchCore, buildCore } from "retroarch-headless-core"
import { Loader } from "./Loader"
import { RetroarchContext, type ModuleFragments } from "./RetroarchContext"
import { Canvas } from "./Canvas"
import { StartButton } from "./StartButton"

type RetroarchComposition = {
  Canvas: typeof Canvas
  Loader: typeof Loader
  StartButton: typeof StartButton
}

type RetroarchProps = {
  children: React.ReactNode
}

const Retroarch: React.FunctionComponent<RetroarchProps> &
  RetroarchComposition = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const retroarchRef = useRef<RetroarchCore>()

  const initRetroarch = async ({
    coreFactory,
    wasmBinary,
    rom,
  }: ModuleFragments) => {
    if (!canvasRef.current || retroarchRef.current) return
    console.log({ rom })

    const core = await buildCore({
      canvas: canvasRef.current,
      coreFactory,
      wasmBinary,
    })

    retroarchRef.current = new RetroarchCore(core, { romBinary: rom })

    console.log({
      canvasRef: canvasRef.current,
      retroarchRef: retroarchRef.current,
    })
  }

  return (
    <RetroarchContext.Provider
      value={{ retroarchRef, initRetroarch, canvasRef }}
    >
      {children}
    </RetroarchContext.Provider>
  )
}

Retroarch.Canvas = Canvas
Retroarch.Loader = Loader
Retroarch.StartButton = StartButton

export { Retroarch }
