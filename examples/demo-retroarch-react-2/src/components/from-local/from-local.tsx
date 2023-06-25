import { ChangeEvent, useState } from "react"
import { CoreSelect } from "./core-select"
import { cores, type Core } from "./cores"
import { flushSync } from "react-dom"
import { Emulator } from "./emulator"

export const FromLocal = () => {
  const [rom, setRom] = useState<Uint8Array>()
  const [core, setCore] = useState<Core>(cores[0])

  const coreUrl = `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-js/packages/retroarch-core/cores/${core}_libretro.js`

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
    <div className="flex flex-col items-center">
      <div className="flex items-stretch justify-center gap-3 mt-7">
        <div className="self-stretch flex flex-col border justify-between border-black rounded-md p-2">
          <span>select ROM</span>
          <input type="file" onChange={onRomUpload} />
        </div>

        <div className="flex flex-col border border-black rounded-md p-2">
          <span>select PLATFORM</span>
          <CoreSelect cores={cores} active={core} setCore={setCore} />
        </div>
      </div>

      <div className="border border-black p-3 rounded-md aspect-[800/600] h-[624px] mt-7 w-fit">
        {rom && (
          <Emulator
            coreUrl={coreUrl}
            romBinary={rom}
            coreName={core}
            key={core}
          />
        )}
      </div>
    </div>
  )
}
