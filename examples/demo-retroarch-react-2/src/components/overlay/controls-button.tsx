import { Controls } from "./controls/Controls"
import {
  nesControlsConfig,
  segaMDControlsConfig,
} from "./controls/controls-configs"
import { Gamepad2Icon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

type Props = {
  coreName: string
}

export const ControlsButton: React.FunctionComponent<Props> = ({
  coreName,
}) => {
  const config = getControls(coreName)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <Gamepad2Icon size={48} color="white" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>controls</DialogTitle>
        </DialogHeader>
        <Controls config={config} />
      </DialogContent>
    </Dialog>
  )
}

const getControls = (coreName: string) => {
  console.log({ coreName })

  switch (coreName) {
    case "fceumm":
      return nesControlsConfig

    case "genesis_plus_gx":
      return segaMDControlsConfig

    default:
      throw new Error("no config found")
  }
}
