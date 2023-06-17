import { Retroarch } from "./Retroarch"
import "./component.css"

function App() {
  return (
    <Retroarch
      containerClassName="retroarch__container"
      canvasBoxClassName="retroarch__canvas-box"
    >
      <Retroarch.StartScreen className="retroarch-start-screen__container">
        <Retroarch.StartScreen.Button>! Start !</Retroarch.StartScreen.Button>
      </Retroarch.StartScreen>

      <Retroarch.LoaderScreen
        className="retroarch-load-screen__container"
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
