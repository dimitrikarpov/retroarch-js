import { ControlsButton } from "./controls-button"

type Props = {
  coreName: string
}

export const Overlay: React.FunctionComponent<Props> = ({ coreName }) => {
  return (
    <div className="flex h-[50px] items-center justify-center bg-[rgba(12,12,12,0.719)] px-5 py-0 ">
      <ControlsButton coreName={coreName} />
    </div>
  )
}
