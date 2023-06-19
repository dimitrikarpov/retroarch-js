import { useRetroarchLoaderScreen } from "./LoaderScreenContext"

export const LoaderScreenProgress = () => {
  const { isCoreLoaded, isRomLoaded, showLoadButton } =
    useRetroarchLoaderScreen()

  if (showLoadButton) return

  return (
    <div>
      {!isCoreLoaded && <p> 🏋️‍♂️ core is loading...</p>}
      {!!isCoreLoaded && <p> ✅ CORE is LOADED</p>}
      {!isRomLoaded && <p> 🏋️‍♂️ rom is loading...</p>}
      {!!isRomLoaded && <p> ✅ ROM is LOADED</p>}
    </div>
  )
}
