import { CSSProperties } from "react"
import { useRetroarchContext } from "./RetroarchContext"
import { StartScreenButton } from "./StartScreenButton"

type StartScreenComposition = {
  Button: typeof StartScreenButton
}

type Props = {
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}

const StartScreen: React.FunctionComponent<Props> & StartScreenComposition = ({
  className = "retroarch-screen",
  style,
  children,
}) => {
  const { isReadyToStart, isStarted } = useRetroarchContext()

  if (!isReadyToStart || isStarted) return null

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

StartScreen.Button = StartScreenButton

export { StartScreen }
