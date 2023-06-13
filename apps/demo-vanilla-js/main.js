import { createRetroarch } from "holy-retroarch"

const registerUIHandlers = (retroarch) => {
  /* START HANDLER */
  const button = document.getElementById("start")
  button.addEventListener("click", () => {
    retroarch.start()
  })

  /* UNLOAD HANDLER*/
  const unloadBtn = document.getElementById("unload")
  unloadBtn.addEventListener("click", () => {
    console.log("unload clicked")
    retroarch.destroy()

    // remove event listeners from start button
    const startBtn = document.getElementById("start")
    startBtn.replaceWith(startBtn.cloneNode(true))
  })
}

const main = async () => {
  let rom

  /* LOAD HANDLER */
  const loadBtn = document.getElementById("load")
  loadBtn.addEventListener("click", async () => {
    const core = document.getElementById("core").value

    const retroarch = await createRetroarch({
      canvas: document.getElementById("canvas"),
      coreUrl: `https://cdn.jsdelivr.net/gh/dimitrikarpov/holy-retroarch/cores/${core}.js`,
      romBinary: rom,
      beforeLoad: () => {
        console.log("🎬🎬🎬 Starting to load core 🎬🎬🎬")
      },
      onReady: () => {
        console.log("🏋️🏋️🏋️ Core loaded and we ready to start 🏋️🏋️🏋️")
      },
      onStart: () => {
        console.log("🚀🚀🚀 ROM started 🚀🚀🚀")
      },
      onDestroy: () => {
        console.log("💀💀💀 Core destroyed succefully 💀💀💀")
      },
    })

    registerUIHandlers(retroarch)
  })

  const romInput = document.getElementById("rom")
  romInput.addEventListener("change", async function () {
    const buff = await this.files[0].arrayBuffer()
    rom = new Uint8Array(buff)
  })
}

main()
