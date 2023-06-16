import { useRetroarchContext } from "./RetroarchContext"

export const StartButton = () => {
  const { retroarchRef, isReadyToStart } = useRetroarchContext()

  const onClick = () => {
    retroarchRef.current?.start()
  }

  if (!isReadyToStart) return null

  return (
    <div>
      <button onClick={onClick}>start the game</button>
    </div>
  )
}
