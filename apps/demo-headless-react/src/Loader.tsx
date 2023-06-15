import { useState } from "react"
import { fetchCore } from "retroarch-headless-core"
import { useRetroarchContext } from "./RetroarchContext"

type Props = {
  coreUrl: string
  romUrl?: string
  romBinary?: Uint8Array
  beforeLoad?: () => void
  onLoad?: () => void
}

export const Loader: React.FunctionComponent<Props> = ({
  coreUrl,
  romUrl,
  romBinary,
  beforeLoad,
  onLoad,
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
    <div>
      {!!showLoadButton && <button onClick={onLoadClick}>LOAD</button>}
      {!showLoadButton && (
        <LoadingInfo isCoreLoaded={isCoreLoaded} isRomLoaded={isRomLoaded} />
      )}
    </div>
  )
}

type LoadingInfoProps = {
  isCoreLoaded: boolean
  isRomLoaded: boolean
}

const LoadingInfo: React.FunctionComponent<LoadingInfoProps> = ({
  isCoreLoaded,
  isRomLoaded,
}) => {
  return (
    <>
      {!isCoreLoaded && <p>core is loading...</p>}
      {!!isCoreLoaded && <p>CORE is LOADED</p>}
      {!isRomLoaded && <p>rom is loading...</p>}
      {!!isRomLoaded && <p>ROM is LOADED</p>}
    </>
  )
}

const fetchRom = async (romUrl: string) => {
  const response = await fetch(romUrl)
  const romBuffer = await response.arrayBuffer()
  const romBinary = new Uint8Array(romBuffer)

  return romBinary
}
