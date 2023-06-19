import { Retroarch } from "retroarch-react"
import "./basic.css"
import "./main.css"

function App() {
  return (
    <Retroarch>
      <Retroarch.Overlay>
        <div className="overlay__container">
          <Retroarch.Overlay.FullscreenButton
            switchOn={<span>[ ]</span>}
            switchOff={<span>X</span>}
          />
        </div>
      </Retroarch.Overlay>

      <Retroarch.StartScreen>
        <Retroarch.StartScreen.Button>! Start !</Retroarch.StartScreen.Button>
      </Retroarch.StartScreen>

      <Retroarch.LoaderScreen
        coreUrl="https://cdn.jsdelivr.net/gh/dimitrikarpov/holy-retroarch/cores/fceumm_libretro.js"
        romUrl="http://localhost:3000/Gun Nac (Japan).nes"
      >
        <>
          <Retroarch.LoaderScreen.Button>
            ! Load !
          </Retroarch.LoaderScreen.Button>
          <Retroarch.LoaderScreen.Progress />
        </>
      </Retroarch.LoaderScreen>
    </Retroarch>
  )
}

export default App
