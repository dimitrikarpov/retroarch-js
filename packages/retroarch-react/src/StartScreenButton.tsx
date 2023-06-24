import { useRetroarchContext } from "./RetroarchContext"

type Props = {
  className?: string
  children?: React.ReactNode
}

export const StartScreenButton: React.FunctionComponent<Props> = ({
  children,
  className = "retroarch-start-button",
}) => {
  const { startRetroarch } = useRetroarchContext()

  return (
    <button className={className} onClick={startRetroarch} type="button">
      {children || "start"}
    </button>
  )
}
