import { useRetroarchContext } from "./RetroarchContext"

export const StartButton = () => {
  const { retroarchRef } = useRetroarchContext()

  const onClick = () => {
    if (!retroarchRef.current) return

    retroarchRef.current.start()
  }

  return (
    <div>
      <button onClick={onClick}>start the game</button>
    </div>
  )
}
