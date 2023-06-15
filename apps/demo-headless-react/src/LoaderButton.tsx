import { useRetroarchLoaderContext } from "./LoaderContext"

type Props = {
  title?: string
}

export const LoaderButton: React.FunctionComponent<Props> = ({
  title = "load",
}) => {
  const { showLoadButton, onLoadClick } = useRetroarchLoaderContext()

  if (!showLoadButton) return null

  return <button onClick={onLoadClick}>{title}</button>
}
