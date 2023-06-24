import { useState } from "react"
import { games, type Game } from "./games"
import { GameSelect } from "./game-select"
import { Emulator } from "./Emulator"

export const FromCollection = () => {
  const [game, setGame] = useState<Game>(games[0])
  const coreUrl = `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-js/packages/retroarch-core/cores/${game.core}_libretro.js`
  const romUrl = `/${game.rom}`

  return (
    <div>
      <GameSelect games={games} current={game} setGame={setGame} />
      <Emulator coreUrl={coreUrl} romUrl={romUrl} key={romUrl} />
    </div>
  )
}
