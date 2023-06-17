import React from "react"
import { Retroarch, fetchCore } from "retroarch-headless-core"

export type CoreOptions = Awaited<ReturnType<typeof fetchCore>>["coreOptions"]

export type ModuleFragments = {
  coreFactory: any
  wasmBinary: Uint8Array
  coreOptions: CoreOptions
  rom: Uint8Array
}

type RetroarchContext = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  retroarchRef: React.MutableRefObject<Retroarch | undefined>
  isReadyToStart: boolean
  isStarted: boolean
  initRetroarch: (moduleFragments: ModuleFragments) => void
  startRetroarch: () => void
}

export const RetroarchContext = React.createContext<RetroarchContext | null>(
  null,
)

export function useRetroarchContext() {
  const context = React.useContext(RetroarchContext)

  if (!context) {
    throw new Error(
      `'This component must be used within a <Retroarch> component.'`,
    )
  }

  return context
}
