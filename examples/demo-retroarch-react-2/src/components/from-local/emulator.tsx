import { Retroarch } from "retroarch-react"
import { cn } from "../../utils"

type Props = {
  coreUrl: string
  romBinary: Uint8Array
}

export const Emulator: React.FunctionComponent<Props> = ({
  coreUrl,
  romBinary,
}) => {
  return (
    <Retroarch
      containerClassName={cn(
        "relative flex aspect-[calc(800/600)] justify-center",
        "h-[600px]",
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

      <Retroarch.StartScreen className="flex items-center justify-center absolute inset-0 h-full">
        <Retroarch.StartScreen.Button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" />
      </Retroarch.StartScreen>

      <Retroarch.LoaderScreen
        className="flex items-center justify-center absolute inset-0 h-full"
        coreUrl={coreUrl}
        romBinary={romBinary}
        loadOnMount
      >
        <>
          <Retroarch.LoaderScreen.Button className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline" />
          <Retroarch.LoaderScreen.Progress />
        </>
      </Retroarch.LoaderScreen>
    </Retroarch>
  )
}
