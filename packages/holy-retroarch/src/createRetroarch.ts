import { Retroarch } from "./Retroarch"
import { buildCore } from "./buildCore"
import { RetroarchConfig } from "./config"

const replacePostfix = (str: string, target: string, replacement: string) => {
  const lastIndex = str.lastIndexOf(target)
  const withoutLastEntry = str.slice(0, lastIndex)

  return `${withoutLastEntry}${replacement}`
}

type CoreOptions = {
  folder: string
  defaultOptions: Record<string, string>
}

const fetchWasm = async (wasmUrl: string) => {
  const buffer = await (await fetch(wasmUrl)).arrayBuffer()
  return new Uint8Array(buffer)
}

/**
 * fetch core's js and wasm files
 * @param coreUrl url of core js file
 */
export const fetchCore = async (
  coreUrl: string,
  wasmUrl?: string,
  optionsUrl?: string,
) => {
  const coreFactory = (
    await import(/* webpackIgnore: true */ /* @vite-ignore*/ coreUrl)
  ).default

  const wasmBinary = await fetchWasm(
    wasmUrl || replacePostfix(coreUrl, ".js", ".wasm"),
  )

  const coreOptions: CoreOptions = await import(
    /* webpackIgnore: true */ /* @vite-ignore*/
    optionsUrl || replacePostfix(coreUrl, ".js", ".options.js")
  )

  return { coreFactory, wasmBinary, coreOptions }
}

type CreateRetroarchOptions = {
  canvas: HTMLCanvasElement
  coreUrl: string
  wasmUrl?: string
  optionsUrl?: string
  config?: RetroarchConfig
  romBinary?: Uint8Array
  beforeLoad?: () => void
  onReady?: () => void
  onStart?: () => void
  onDestroy?: () => void
}

export const createRetroarch = async (options: CreateRetroarchOptions) => {
  if (options.beforeLoad) options.beforeLoad()

  const { coreFactory, wasmBinary, coreOptions } = await fetchCore(
    options.coreUrl,
    options.wasmUrl,
    options.optionsUrl,
  )

  const core = await buildCore({
    canvas: options.canvas,
    coreFactory,
    wasmBinary,
    onReady: options.onReady,
  })

  const retroarch = new Retroarch(core, {
    romBinary: options.romBinary,
    coreOptions: coreOptions.defaultOptions,
    onStart: options.onStart,
    onDestroy: options.onDestroy,
  })
  retroarch.copyConfig(options.config)
  retroarch.copyOptions(coreOptions.defaultOptions, coreOptions.folder)

  return retroarch
}
