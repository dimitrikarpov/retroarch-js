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
    <div className="flex justify-center gap-8 mt-7">
      {games.map((game, indx) => {
        const isActive = game.rom === current.rom

        return (
          <div
            key={indx}
            className={cn(
              "p-2 rounded-md bg-teal-400 text-white hover:opacity-70 mr-3 text-lg cursor-pointer",
              isActive && "bg-teal-700",
            )}
            onClick={() => {
              setGame(game)
            }}
          >
            game #{indx + 1}
          </div>
        )
      })}
    </div>
  )
}
