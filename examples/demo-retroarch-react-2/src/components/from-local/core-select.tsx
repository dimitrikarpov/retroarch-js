import { cn } from "../../utils"
import { type Core } from "./cores"

type Props = {
  active: Core
  cores: Readonly<Array<Core>>
  setCore: React.Dispatch<React.SetStateAction<Core>>
}

export const CoreSelect: React.FunctionComponent<Props> = ({
  active,
  cores,
  setCore,
}) => {
  return (
    <div className="flex gap-3 justify-center">
      {cores.map((core) => {
        const logo = core === "fceumm" ? "/NES_logo.svg" : "SEGA_logo.svg"

        return (
          <div
            key={core}
            className={cn(
              "cursor-pointer  p-4 rounded-md bg-pink-400 hover:opacity-70 w-[200px] flex justify-center",
              active === core && "bg-pink-700 border border-pink-950",
            )}
            onClick={() => {
              setCore(core)
            }}
          >
            <img src={logo} alt="platform logo" className="h-14" />
          </div>
        )
      })}
    </div>
  )
}
