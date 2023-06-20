import { useRef, useState } from "react"
import { useRetroarchContext } from "./RetroarchContext"
import { FullscreenButton } from "./FullscreenButton"
import { clsss } from "./clsss"

type OverlayComposition = {
  FullscreenButton: typeof FullscreenButton
}

type Props = {
  /** overlay class name
   *
   * default class name `.retroarch-overlay`
   *
   * should have these rules to stretch container
   * ```css
   * .retroarch-overlay {
   *   position: absolute;
   *   inset: 0px;
   * }
   * ```
   */
  className?: string
  /**
   * visible state of overlay
   *
   * default class name `.retroarch-overlay--visible`
   * ```css
   * .retroarch-overlay--visible {
   *   cursor: default;
   *   opacity: 1;
   * }
   * ```
   */
  visibleClassName?: string
  /**
   * hidden state of overlay
   *
   * default class name `.retroarch-overlay--hidden`
   * ```css
   * .retroarch-overlay--hidden {
   *   cursor: none;
   *   opacity: 0;
   * }
   * ```
   */
  hiddenClassName?: string
  /** timeout to hide overlay when mouse inactive in milliseconds */
  timeout?: number
  children?: React.ReactNode
}

const Overlay: React.FunctionComponent<Props> & OverlayComposition = ({
  children,
  className = "retroarch-overlay",
  visibleClassName = "retroarch-overlay--visible",
  hiddenClassName = "retroarch-overlay--hidden",
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
      className={clsss(
        className,
        !!visible && visibleClassName,
        !visible && hiddenClassName,
      )}
    >
      {children}
    </div>
  )
}

Overlay.FullscreenButton = FullscreenButton

export { Overlay }
