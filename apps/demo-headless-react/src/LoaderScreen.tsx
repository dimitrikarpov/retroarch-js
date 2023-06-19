import { useState } from "react"
import { fetchCore } from "retroarch-headless-core"
import { useRetroarchContext } from "./RetroarchContext"
import { LoaderScreenButton } from "./LoaderScreenButton"
import { LoaderScreenProgress } from "./LoaderScreenProgress"
import { LoaderScreenContext } from "./LoaderScreenContext"

type RetroarchLoaderComposition = {
  Button: typeof LoaderScreenButton
  Progress: typeof LoaderScreenProgress
}

type Props = {
  coreUrl: string
  romUrl?: string
  romBinary?: Uint8Array
  beforeLoad?: () => void
  onLoad?: () => void
  children: React.ReactNode
  className?: string
}

const LoaderScreen: React.FunctionComponent<Props> &
  RetroarchLoaderComposition = ({
  coreUrl,
  romUrl,
  romBinary,
  beforeLoad,
  onLoad,
  children,
  className = "retroarch-screen",
}) => {
  const [isCoreLoaded, setIsCoreLoaded] = useState(false)
  const [isRomLoaded, setIsRomLoaded] = useState(false)
  const [showLoadButton, setShowLoadButton] = useState(true)

  const { initRetroarch, isReadyToStart } = useRetroarchContext()

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

  if (isReadyToStart) return null

  return (
    <LoaderScreenContext.Provider
      value={{ isCoreLoaded, isRomLoaded, showLoadButton, onLoadClick }}
    >
      <div className={className}>{children}</div>
    </LoaderScreenContext.Provider>
  )
}

LoaderScreen.Button = LoaderScreenButton
LoaderScreen.Progress = LoaderScreenProgress

export { LoaderScreen }

const fetchRom = async (romUrl: string) => {
  const response = await fetch(romUrl)
  const romBuffer = await response.arrayBuffer()
  const romBinary = new Uint8Array(romBuffer)

  return romBinary
}
