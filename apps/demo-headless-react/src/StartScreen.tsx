import { useRetroarchContext } from "./RetroarchContext"
import { StartScreenButton } from "./StartScreenButton"

type StartScreenComposition = {
  Button: typeof StartScreenButton
}

type Props = {
  className?: string
  children?: React.ReactNode
}

const StartScreen: React.FunctionComponent<Props> & StartScreenComposition = ({
  className,
  children,
}) => {
  const { isReadyToStart, isStarted } = useRetroarchContext()

  if (!isReadyToStart || isStarted) return null

  return <div className={className}>{children}</div>
}

StartScreen.Button = StartScreenButton

export { StartScreen }
