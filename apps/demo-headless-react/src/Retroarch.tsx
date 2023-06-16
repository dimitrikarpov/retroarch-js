import { RefObject, useCallback, useRef, useState } from "react"
import { Retroarch as RetroarchCore, buildCore } from "retroarch-headless-core"
import { Loader } from "./Loader"
import { RetroarchContext, type ModuleFragments } from "./RetroarchContext"
import { Canvas } from "./Canvas"
import { StartScreen } from "./StartScreen"
import { useResizeObserver } from "./useSizeObserver"

type RetroarchComposition = {
  Canvas: typeof Canvas
  Loader: typeof Loader
  StartScreen: typeof StartScreen
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

  const onContainerResize = useCallback((target: HTMLDivElement) => {
    resizeCanvas(canvasBoxRef)
  }, [])

  const containerRef = useResizeObserver(onContainerResize)

  const resizeCanvas = (canvasBoxRef: RefObject<HTMLDivElement>) => {
    if (retroarchRef.current?.status !== "started" || !canvasBoxRef.current)
      return

    retroarchRef.current?.setCanvasSize(
      canvasBoxRef.current.clientWidth,
      canvasBoxRef.current.clientWidth / (800 / 600),
    )
  }

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

  return (
    <RetroarchContext.Provider
      value={{ retroarchRef, initRetroarch, canvasRef, isReadyToStart }}
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
Retroarch.Loader = Loader
Retroarch.StartScreen = StartScreen

export { Retroarch }
