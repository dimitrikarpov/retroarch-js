import { useEffect, useState } from "react"
import { useRetroarchContext } from "./RetroarchContext"

type Props = {
  switchOn: React.ReactNode
  switchOff: React.ReactNode
}

export const FullscreenButton: React.FunctionComponent<Props> = ({
  switchOn,
  switchOff,
}) => {
  const { canvasBoxRef } = useRetroarchContext()
  const [isInFullscreen, setIsInFullscreen] = useState(false)

  useEffect(() => {
    if (!canvasBoxRef || !canvasBoxRef.current) return

    const fullscreenchanged = () => {
      if (document.fullscreenElement) {
        setIsInFullscreen(true)
      } else {
        setIsInFullscreen(false)
      }
    }

    document.addEventListener("fullscreenchange", fullscreenchanged, false)

    return () =>
      document.removeEventListener("fullscreenchange", fullscreenchanged, false)
  }, [canvasBoxRef])

  const onFullscreen = () => {
    canvasBoxRef.current?.requestFullscreen().catch((err) => {
      console.log({ err })
    })
  }

  const onExitFullscreen = () => {
    document.exitFullscreen()
  }

  return (
    <>
      {isInFullscreen && (
        <span onClick={onExitFullscreen} title="Exit full screen">
          {switchOff}
        </span>
      )}
      {!isInFullscreen && (
        <span onClick={onFullscreen} title="Full screen">
          {switchOn}
        </span>
      )}
    </>
  )
}
