import React from "react"

type LoaderScreenContext = {
  showLoadButton: boolean
  isRomLoaded: boolean
  isCoreLoaded: boolean
  onLoadClick: () => void
}

export const LoaderScreenContext =
  React.createContext<LoaderScreenContext | null>(null)

export function useRetroarchLoaderScreen() {
  const context = React.useContext(LoaderScreenContext)

  if (!context) {
    throw new Error(
      `'This component must be used within a <Retroarch.Loader> component.'`,
    )
  }

  return context
}
