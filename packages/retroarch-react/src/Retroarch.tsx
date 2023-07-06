import { useEffect, useRef, useState } from "react"
import {
  Retroarch as RetroarchCore,
  buildCore,
  type RetroarchConfig,
  type CoreOptions,
} from "retroarch-core"
import { RetroarchContext, type ModuleFragments } from "./RetroarchContext"
import { StartScreen } from "./StartScreen"
import { LoaderScreen } from "./LoaderScreen"
import { useResizeCanvas } from "./useResizeCanvas"
import { Overlay } from "./Overlay"

type RetroarchComposition = {
  LoaderScreen: typeof LoaderScreen
  StartScreen: typeof StartScreen
  Overlay: typeof Overlay
}

type RetroarchProps = {
  containerClassName?: string
  canvasBoxClassName?: string
  children: React.ReactNode
  config?: RetroarchConfig
  coreOptions?: CoreOptions
  beforeLoad?: () => void
  onReady?: () => void
  onStart?: (retroarch: RetroarchCore) => void
  onDestroy?: () => void
}

const Retroarch: React.FunctionComponent<RetroarchProps> &
  RetroarchComposition = ({
  containerClassName = "retroarch__container",
  canvasBoxClassName = "retroarch__canvas-box",
  children,
  config,
  coreOptions,
  beforeLoad,
  onReady,
  onStart,
  onDestroy,
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
    coreOptions: defaultCoreOptions,
  }: ModuleFragments) => {
    if (!canvasRef.current || retroarchRef.current) return

    beforeLoad?.()

    const core = await buildCore({
      canvas: canvasRef.current,
      coreFactory,
      wasmBinary,
    })

    retroarchRef.current = new RetroarchCore(core, { romBinary: rom })
    retroarchRef.current.copyConfig(config)
    retroarchRef.current.copyOptions(
      {
        ...defaultCoreOptions.defaultOptions,
        ...(coreOptions && { ...coreOptions.defaultOptions }),
      },
      defaultCoreOptions.folder,
    )

    onReady?.()

    setIsReadyStart(true)
  }

  const startRetroarch = () => {
    retroarchRef.current?.start()
    resizeCanvas(canvasBoxRef)
    setIsStarted(true)
    canvasRef.current?.focus()
    onStart?.(retroarchRef.current!)
  }

  useEffect(() => {
    return () => {
      if (!retroarchRef.current) return

      retroarchRef.current.destroy()
      onDestroy?.()
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

Retroarch.LoaderScreen = LoaderScreen
Retroarch.StartScreen = StartScreen
Retroarch.Overlay = Overlay

export { Retroarch }
