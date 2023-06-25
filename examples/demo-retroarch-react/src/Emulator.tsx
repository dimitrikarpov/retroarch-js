import { Retroarch } from "retroarch-react"
import "./basic.css"
import "./main.css"
import { log } from "./log"

type Props = {
  coreUrl: string
  romBinary: Uint8Array
}

export const Emulator: React.FunctionComponent<Props> = ({
  coreUrl,
  romBinary,
}) => {
  return (
    <Retroarch
      beforeLoad={() => {
        log("🎬🎬🎬 Starting to load core 🎬🎬🎬")
      }}
      onReady={() => {
        log("🏋️🏋️🏋️ Core loaded and we ready to start 🏋️🏋️🏋️")
      }}
      onStart={() => {
        log("🚀🚀🚀 ROM started 🚀🚀🚀")
      }}
      onDestroy={() => {
        log("💀💀💀 Core destroyed succefully 💀💀💀")
      }}
    >
      <Retroarch.Overlay>
        <div className="overlay__container">
          <Retroarch.Overlay.FullscreenButton switchOn="[ ]" switchOff="X" />
        </div>
      </Retroarch.Overlay>

      <Retroarch.StartScreen>
        <Retroarch.StartScreen.Button />
      </Retroarch.StartScreen>

      <Retroarch.LoaderScreen
        loadOnMount
        coreUrl={coreUrl}
        romBinary={romBinary}
      >
        <Retroarch.LoaderScreen.Progress />
      </Retroarch.LoaderScreen>
    </Retroarch>
  )
}
