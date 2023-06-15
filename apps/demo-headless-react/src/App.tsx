import { useState } from "react"
import { fetchCore } from "retroarch-headless-core"
import { Retroarch } from "./Retroarch"

function App() {
  return (
    <Retroarch>
      <Retroarch.Canvas>
        <Retroarch.StartButton />
      </Retroarch.Canvas>

      <Retroarch.Loader
        coreUrl="https://cdn.jsdelivr.net/gh/dimitrikarpov/holy-retroarch/cores/fceumm_libretro.js"
        romUrl="http://localhost:3000/Gun Nac (Japan).nes"
      />
    </Retroarch>
  )
}

export default App
