import { useRetroarchLoaderScreen } from "./LoaderScreenContext"

type Props = {
  className?: string
  children?: React.ReactNode
}

export const LoaderScreenButton: React.FunctionComponent<Props> = ({
  className = "retroarch-load-button",
  children,
}) => {
  const { showLoadButton, onLoadClick } = useRetroarchLoaderScreen()

  if (!showLoadButton) return null

  return (
    <button className={className} onClick={onLoadClick} type="button">
      {children || "Load"}
    </button>
  )
}
