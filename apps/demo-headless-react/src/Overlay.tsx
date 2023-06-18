import { useRef, useState } from "react"
import { useRetroarchContext } from "./RetroarchContext"

type Props = {
  /** overlay class name
   *
   * default class name `.retroarch__overlay`
   *
   * should have these rules to stretch container
   * ```css
   * .retroarch__overlay {
   *   position: absolute;
   *   inset: 0px;
   * }
   * ```
   * also it has data attribute to set visibility state `data-visible`
   * ```css
   * .retroarch__overlay[data-visible="true"] {
   *   cursor: default;
   *   opacity: 1;
   * }
   *
   * .retroarch__overlay[data-visible="false"] {
   *  cursor: none;
   *  opacity: 0;
   * }
   * ```
   */
  className?: string
  /** timeout to hide overlay when mouse inactive in milliseconds */
  timeout?: number
  children?: React.ReactNode
}

export const Overlay: React.FunctionComponent<Props> = ({
  children,
  className = "retroarch__overlay",
  timeout = 3000,
}) => {
  const timerRef = useRef<NodeJS.Timeout>()
  const [visible, setVisible] = useState(false)
  const { isStarted } = useRetroarchContext()

  const onMouseMove = () => {
    !visible && setVisible(true)

    timerRef.current && clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setVisible(false)
    }, timeout)
  }

  const onMouseLeave = () => {
    timerRef.current && clearTimeout(timerRef.current)
    setVisible(false)
  }

  if (!isStarted) return null

  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={className}
      data-visible={visible ? "true" : "false"}
    >
      {children}
    </div>
  )
}
