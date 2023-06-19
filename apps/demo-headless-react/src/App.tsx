import { Retroarch } from "./Retroarch"
import "./component.css"
import "./main.css"

function App() {
  return (
    <Retroarch
      containerClassName="retroarch__container"
      canvasBoxClassName="retroarch__canvas-box"
    >
      <Retroarch.Overlay>
        <div className="overlay__container">
          <h1>ffffffffffasdfasfasdf</h1>
          <Retroarch.Overlay.FullscreenButton
            switchOn={<span>[ ]</span>}
            switchOff={<span>X</span>}
          />
        </div>
      </Retroarch.Overlay>

      <Retroarch.StartScreen className="retroarch-screen">
        <Retroarch.StartScreen.Button>! Start !</Retroarch.StartScreen.Button>
      </Retroarch.StartScreen>

      <Retroarch.LoaderScreen
        className="retroarch-screen"
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
