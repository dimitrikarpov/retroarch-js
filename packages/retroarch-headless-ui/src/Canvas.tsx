import { useRef } from "react"
import { useRetroarchContext } from "./RetroarchContext"

type Props = {
  children?: React.ReactNode
}

export const Canvas: React.FunctionComponent<Props> = ({ children }) => {
  const { canvasRef } = useRetroarchContext()
  const canvasBoxRef = useRef<HTMLDivElement>(null)

  return (
    <div
      //   ref={containerRef}
      className=""
    >
      <div ref={canvasBoxRef} className="">
        <canvas ref={canvasRef} id="canvas"></canvas>

        {children}
      </div>
    </div>
  )
}
