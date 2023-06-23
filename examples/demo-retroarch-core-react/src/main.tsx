import React from "react"
import ReactDOM from "react-dom/client"
import { Emulator } from "./Emulator.tsx"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Emulator />
    <Toaster />
  </React.StrictMode>,
)
