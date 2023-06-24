import { Retroarch } from "retroarch-react"
import { cn } from "../../utils"

type Props = {
  coreUrl: string
  romUrl: string
}

export const Emulator: React.FunctionComponent<Props> = ({
  coreUrl,
  romUrl,
}) => {
  return (
    <Retroarch
      containerClassName={cn(
        "relative flex aspect-[calc(800/600)] justify-center",
        "max-h-[600px]",
      )}
      canvasBoxClassName="relative aspect-[calc(800/600)] max-h-full max-w-full"
    >
      <Retroarch.Overlay
        className="absolute inset-0 flex flex-col justify-end"
        visibleClassName="cursor-default opacity-100"
        hiddenClassName="cursor-none opacity-0"
      >
        <div className="flex h-[50px] items-center justify-between bg-[rgba(12,12,12,0.719)] px-5 py-0 [&_svg]:h-[48px] [&_svg]:w-[48px] [&_svg]:cursor-pointer [&_svg]:fill-white [&_svg]:opacity-90 hover:[&_svg]:opacity-100">
          <Retroarch.Overlay.FullscreenButton switchOn="[ ]" switchOff="X" />
        </div>
      </Retroarch.Overlay>

      <Retroarch.StartScreen>
        <Retroarch.StartScreen.Button />
      </Retroarch.StartScreen>

      <Retroarch.LoaderScreen
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        loadOnMount
        coreUrl={coreUrl}
        romUrl={romUrl}
      >
        <>
          <Retroarch.LoaderScreen.Button />
          <Retroarch.LoaderScreen.Progress />
        </>
      </Retroarch.LoaderScreen>
    </Retroarch>
  )
}
