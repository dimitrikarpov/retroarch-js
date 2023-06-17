import { useRetroarchContext } from "./RetroarchContext"

type Props = {
  children?: React.ReactNode
}

export const StartScreenButton: React.FunctionComponent<Props> = ({
  children,
}) => {
  const { startRetroarch } = useRetroarchContext()

  return (
    <div>
      <button onClick={startRetroarch}>{children || "start"}</button>
    </div>
  )
}
