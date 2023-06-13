import { makeSilence } from "./audiofix"

type buildCoreParams = {
  coreFactory: (...args: any) => any
  canvas: HTMLCanvasElement
  onRuntimeInitialized?: () => any
  onReady?: () => void
  wasmUrl?: string
  wasmBinary?: Uint8Array
}

export type Module = {
  FS: any
  callMain: (...args: any) => void
  pauseMainLoop: () => void
  resumeMainLoop: () => void
  setCanvasSize: (width: number, height: number) => void
  _abort: () => void
  JSEvents: {
    removeAllEventListeners: () => void
  }
} & Pick<buildCoreParams, "canvas">

export const buildCore = async ({
  coreFactory,
  canvas,
  wasmUrl,
  wasmBinary,
  onReady,
}: buildCoreParams): Promise<Module> => {
  const Module = {
    canvas,
    noInitialRun: true,
    arguments: ["/rom.bin", "--verbose"],
    onRuntimeInitialized: () => {},
    print: console.log,
    printErr: console.log,
    preRun: [makeSilence],
    postRun: [],
    ...(wasmUrl && { locateFile: () => wasmUrl }),
    ...(wasmBinary && { wasmBinary }),
  }

  const core = await coreFactory(Module)

  onReady?.()

  return core
}
