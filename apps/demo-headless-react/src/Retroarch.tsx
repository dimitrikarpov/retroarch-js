import { useEffect, useRef, useState } from "react"
import { Retroarch as RetroarchCore, buildCore } from "retroarch-headless-core"
import { RetroarchContext, type ModuleFragments } from "./RetroarchContext"
import { Canvas } from "./Canvas"
import { StartScreen } from "./StartScreen"
import { LoaderScreen } from "./LoaderScreen"
import { useResizeCanvas } from "./useResizeCanvas"
import { Overlay } from "./Overlay"

type RetroarchComposition = {
  Canvas: typeof Canvas
  LoaderScreen: typeof LoaderScreen
  StartScreen: typeof StartScreen
  Overlay: typeof Overlay
}

type RetroarchProps = {
  containerClassName?: string
  canvasBoxClassName?: string
  children: React.ReactNode
}

const Retroarch: React.FunctionComponent<RetroarchProps> &
  RetroarchComposition = ({
  containerClassName,
  canvasBoxClassName,
  children,
}) => {
  const canvasBoxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const retroarchRef = useRef<RetroarchCore>()
  const [isReadyToStart, setIsReadyStart] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const { resizeCanvas, containerRef } = useResizeCanvas(
    canvasBoxRef,
    retroarchRef,
  )

  const initRetroarch = async ({
    coreFactory,
    wasmBinary,
    rom,
  }: ModuleFragments) => {
    if (!canvasRef.current || retroarchRef.current) return

    const core = await buildCore({
      canvas: canvasRef.current,
      coreFactory,
      wasmBinary,
    })

    retroarchRef.current = new RetroarchCore(core, { romBinary: rom })

    setIsReadyStart(true)
  }

  const startRetroarch = () => {
    retroarchRef.current?.start()
    resizeCanvas(canvasBoxRef)
    setIsStarted(true)
  }

  useEffect(() => {
    return () => {
      if (!retroarchRef.current) return

      retroarchRef.current.destroy()
    }
  }, [])

  return (
    <RetroarchContext.Provider
      value={{
        canvasRef,
        canvasBoxRef,
        retroarchRef,
        isReadyToStart,
        isStarted,
        initRetroarch,
        startRetroarch,
      }}
    >
      <div ref={containerRef} className={containerClassName}>
        <div ref={canvasBoxRef} className={canvasBoxClassName}>
          <canvas ref={canvasRef} id="canvas"></canvas>

          {children}
        </div>
      </div>
    </RetroarchContext.Provider>
  )
}

Retroarch.Canvas = Canvas
Retroarch.LoaderScreen = LoaderScreen
Retroarch.StartScreen = StartScreen
Retroarch.Overlay = Overlay

export { Retroarch }