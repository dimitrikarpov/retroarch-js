import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
)
