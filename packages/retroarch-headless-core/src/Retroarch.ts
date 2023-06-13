import { Module } from "./buildCore"
import {
  type RetroarchConfig,
  defaultConfig,
  stringifySettings,
} from "./config"

type RetroarchOptions = Partial<{
  coreOptions: Record<string, string>
  romBinary: Uint8Array
  onStart: () => void
  onDestroy: () => void
}>

type RetroarchStatus = "idle" | "started" | "destroyed"

export class Retroarch {
  public module: Module

  public status: RetroarchStatus = "idle"

  private options: RetroarchOptions = {}

  constructor(module: Module, options: RetroarchOptions = {}) {
    this.module = module
    this.options = options
    options.romBinary && this.copyRom(options.romBinary)
  }

  destroy() {
    try {
      this.module._abort()
    } catch (e) {
      this.module.JSEvents.removeAllEventListeners()
      this.changeStatus("destroyed")
      this.options.onDestroy?.()
    }
  }

  copyFile(file: Uint8Array | string, path: string, filename: string) {
    if (this.module.FS.analyzePath(path).exists === false) {
      this.module.FS.createPath("/", path, true, true)
    }

    this.module.FS.writeFile(`${path}/${filename}`, file)
  }

  copyConfig(config: RetroarchConfig = {}) {
    this.copyFile(
      stringifySettings({ ...defaultConfig, ...config }),
      "home/web_user/retroarch/userdata",
      "retroarch.cfg",
    )
  }

  copyOptions(options: Record<string, string> = {}, folder: string) {
    this.copyFile(
      stringifySettings({ ...this.options.coreOptions, ...options }),
      `home/web_user/retroarch/userdata/config/${folder}`,
      "rom.opt",
    )
  }

  copyRom(file: Uint8Array) {
    this.copyFile(file, "/", "rom.bin")
  }

  copySave(state: Uint8Array) {
    this.copyFile(state, "home/web_user/retroarch/userdata/states", "rom.state")
  }

  start() {
    this.module.callMain(["/rom.bin", "--verbose"])
    this.module.resumeMainLoop()
    this.options.onStart?.()
    this.changeStatus("started")
  }

  pause() {
    this.module.pauseMainLoop()
  }

  resume() {
    this.module.resumeMainLoop()
  }

  setCanvasSize(width: number, height: number) {
    this.module.setCanvasSize(width, height)
  }

  private dispatchEvent(status: RetroarchStatus) {
    const event = new CustomEvent("retroarch-status", {
      detail: status,
      bubbles: true,
    })
    this.module.canvas.dispatchEvent(event)
  }

  private changeStatus(status: RetroarchStatus) {
    this.status = status
    this.dispatchEvent(status)
  }
}
