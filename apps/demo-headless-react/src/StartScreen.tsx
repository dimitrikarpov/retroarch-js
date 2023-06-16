import { StartScreenButton } from "./StartScreenButton"

type StartScreenComposition = {
  Button: typeof StartScreenButton
}

type Props = {
  children?: React.ReactNode
}

const StartScreen: React.FunctionComponent<Props> & StartScreenComposition = ({
  children,
}) => {
  return <div>{children}</div>
}

StartScreen.Button = StartScreenButton

export { StartScreen }
