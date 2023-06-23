import { ChangeEvent, useRef, useState } from "react"
import { Retroarch, createRetroarch } from "retroarch-core"
import { log } from "./log"

type Core = "fceumm_libretro" | "genesis_plus_gx_libretro"

export const Emulator = () => {
  const retroarchInstanceRef = useRef<Retroarch>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rom, setRom] = useState<Uint8Array>()
  const [core, setCore] = useState<Core>("genesis_plus_gx_libretro")

  const onRomUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files?.[0]
    const buffer = await file?.arrayBuffer()

    setRom(new Uint8Array(buffer))
  }

  const onUnloadClick = () => {
    retroarchInstanceRef.current?.destroy()
  }

  const onStartClick = () => {
    retroarchInstanceRef.current?.start()
  }

  const onLoadClick = async () => {
    retroarchInstanceRef.current = await createRetroarch({
      canvas: canvasRef.current as HTMLCanvasElement,
      coreUrl: `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-js/packages/retroarch-core/cores/${core}.js`,
      wasmUrl: `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-js/packages/retroarch-core/cores/${core}.wasm`,
      romBinary: rom,
      beforeLoad: () => {
        log("🎬🎬🎬 Starting to load core 🎬🎬🎬")
      },
      onReady: () => {
        log("🏋️🏋️🏋️ Core loaded and we ready to start 🏋️🏋️🏋️")
      },
      onStart: () => {
        log("🚀🚀🚀 ROM started 🚀🚀🚀")
      },
      onDestroy: () => {
        log("💀💀💀 Core destroyed succefully 💀💀💀")
      },
    })
  }

  const onCoreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCore(e.target.value as Core)
  }

  return (
    <>
      <canvas id="canvas" ref={canvasRef}></canvas>

      <h1>how to start</h1>

      <ol>
        <li>
          <input type="file" onChange={onRomUpload} />
          ⬅️ select ROM
        </li>

        <li>
          <select onChange={onCoreChange} value={core}>
            <option value="genesis_plus_gx_libretro">sega</option>
            <option value="fceumm_libretro">nes</option>
          </select>
          ⬅️ select core
        </li>

        <li>
          <button onClick={onLoadClick}>load</button>
          ⬅️ press LOAD button to load Core and create Retroarch instance
        </li>

        <li>
          <button onClick={onStartClick}>start</button>
          ⬅️ start Retroarch
        </li>

        <li>
          <button onClick={onUnloadClick}>unload</button>
          ⬅️ unload Retroarch
        </li>

        <li>
          <b>GOTO 1;</b> ⬆️ now You can select new ROM and Core and start them
          without page reload 🤠
        </li>
      </ol>
    </>
  )
}
