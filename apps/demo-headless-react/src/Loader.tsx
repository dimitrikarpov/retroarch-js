import { useState } from "react"
import { fetchCore } from "retroarch-headless-core"
import { useRetroarchContext } from "./RetroarchContext"
import { LoaderContext } from "./LoaderContext"
import { LoaderButton } from "./LoaderButton"
import { LoaderProgress } from "./LoaderProgress"

type RetroarchLoaderComposition = {
  LoaderButton: typeof LoaderButton
  LoaderProgress: typeof LoaderProgress
}

type Props = {
  coreUrl: string
  romUrl?: string
  romBinary?: Uint8Array
  beforeLoad?: () => void
  onLoad?: () => void
  children: React.ReactNode
}

const Loader: React.FunctionComponent<Props> & RetroarchLoaderComposition = ({
  coreUrl,
  romUrl,
  romBinary,
  beforeLoad,
  onLoad,
  children,
}) => {
  const [isCoreLoaded, setIsCoreLoaded] = useState(false)
  const [isRomLoaded, setIsRomLoaded] = useState(false)
  const [showLoadButton, setShowLoadButton] = useState(true)

  const { initRetroarch } = useRetroarchContext()

  const onLoadClick = async () => {
    beforeLoad?.()

    setShowLoadButton(false)

    const { coreFactory, wasmBinary, coreOptions } = await fetchCore(coreUrl)

    setIsCoreLoaded(true)

    const rom = await fetchRom(romUrl!)

    initRetroarch({ coreFactory, wasmBinary, coreOptions, rom })

    onLoad?.()

    setIsRomLoaded(true)
  }

  return (
    <LoaderContext.Provider
      value={{ isCoreLoaded, isRomLoaded, showLoadButton, onLoadClick }}
    >
      <div>{children}</div>
    </LoaderContext.Provider>
  )
}

Loader.LoaderButton = LoaderButton
Loader.LoaderProgress = LoaderProgress

export { Loader }

const fetchRom = async (romUrl: string) => {
  const response = await fetch(romUrl)
  const romBuffer = await response.arrayBuffer()
  const romBinary = new Uint8Array(romBuffer)

  return romBinary
}
