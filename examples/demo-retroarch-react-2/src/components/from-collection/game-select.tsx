import { cn } from "../../utils"
import { Game } from "./games"

type Props = {
  games: Game[]
  current: Game
  setGame: React.Dispatch<React.SetStateAction<Game>>
}

export const GameSelect: React.FunctionComponent<Props> = ({
  games,
  current,
  setGame,
}) => {
  return (
    <div className="flex justify-center gap-8 mt-4">
      {games.map((game, indx) => {
        const isActive = game.rom === current.rom
        const logo = game.core === "fceumm" ? "/NES_logo.svg" : "SEGA_logo.svg"

        return (
          <div
            key={indx}
            className={cn(
              "flex flex-col gap-2 items-center",
              "p-2 rounded-md bg-teal-400 text-white hover:opacity-70 mr-3 text-lg cursor-pointer",
              isActive && "bg-teal-700 border border-teal-950",
            )}
            onClick={() => {
              setGame(game)
            }}
          >
            <img src={logo} alt="platform logo" className="h-14" />

            <span>game #{indx + 1}</span>
          </div>
        )
      })}
    </div>
  )
}
