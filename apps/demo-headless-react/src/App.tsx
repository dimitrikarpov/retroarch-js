import { Retroarch } from "./Retroarch"
import "./component.css"

function App() {
  return (
    <Retroarch
      containerClassName="retroarch__container"
      canvasBoxClassName="retroarch__canvas-box"
    >
      <Retroarch.StartScreen>
        <Retroarch.StartScreen.Button />
      </Retroarch.StartScreen>

      <Retroarch.Loader
        coreUrl="https://cdn.jsdelivr.net/gh/dimitrikarpov/holy-retroarch/cores/fceumm_libretro.js"
        romUrl="http://localhost:3000/Gun Nac (Japan).nes"
      >
        <>
          <Retroarch.Loader.LoaderButton title="!! LLOOAADD !!" />
          <Retroarch.Loader.LoaderProgress />
        </>
      </Retroarch.Loader>
    </Retroarch>
  )
}

export default App
