import { ChangeEvent, useState } from "react"
import { flushSync } from "react-dom"
import { Emulator } from "./Emulator"
import "./basic.css"
import "./main.css"

function App() {
  const [rom, setRom] = useState<Uint8Array>()

  const onRomUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files?.[0]
    const buffer = await file?.arrayBuffer()

    flushSync(() => {
      setRom(undefined)
    })

    setRom(new Uint8Array(buffer))
  }

  return (
    <>
      <input type="file" onChange={onRomUpload} />

      {rom && (
        <Emulator
          coreUrl="https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-js/packages/retroarch-core/cores/fceumm_libretro.js"
          romBinary={rom}
        />
      )}
    </>
  )
}

export default App
