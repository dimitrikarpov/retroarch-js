import { RefObject, useCallback } from "react"
import { Retroarch as RetroarchCore } from "retroarch-headless-core"

import { useResizeObserver } from "./useSizeObserver"

export const useResizeCanvas = (
  canvasBoxRef: RefObject<HTMLDivElement>,
  retroarchRef: React.MutableRefObject<RetroarchCore | undefined>,
) => {
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

  return { resizeCanvas, containerRef }
}
