import { useRetroarchLoaderScreen } from "./LoaderScreenContext"

type Props = {
  children?: React.ReactNode
}

export const LoaderScreenButton: React.FunctionComponent<Props> = ({
  children,
}) => {
  const { showLoadButton, onLoadClick } = useRetroarchLoaderScreen()

  if (!showLoadButton) return null

  return <button onClick={onLoadClick}>{children || "Load!"}</button>
}
