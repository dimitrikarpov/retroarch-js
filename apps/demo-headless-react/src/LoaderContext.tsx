import React from "react"

type LoaderContext = {
  showLoadButton: boolean
  isRomLoaded: boolean
  isCoreLoaded: boolean
  onLoadClick: () => void
}

export const LoaderContext = React.createContext<LoaderContext | null>(null)

export function useRetroarchLoaderContext() {
  const context = React.useContext(LoaderContext)

  if (!context) {
    throw new Error(
      `'This component must be used within a <Retroarch.Loader> component.'`,
    )
  }

  return context
}
