import { Retroarch } from "retroarch-react"
import { cn } from "../../utils"
import { Overlay } from "../overlay/overlay"

type Props = {
  coreName: string
  coreUrl: string
  romUrl: string
}

export const Emulator: React.FunctionComponent<Props> = ({
  coreName,
  coreUrl,
  romUrl,
}) => {
  return (
    <div className="border border-black p-3 rounded-md">
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
          <Overlay coreName={coreName} />
        </Retroarch.Overlay>

        <Retroarch.StartScreen className="flex items-center justify-center absolute inset-0 h-full">
          <Retroarch.StartScreen.Button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" />
        </Retroarch.StartScreen>

        <Retroarch.LoaderScreen
          className="flex items-center justify-center absolute inset-0 h-full"
          coreUrl={coreUrl}
          romUrl={romUrl}
        >
          <>
            <Retroarch.LoaderScreen.Button className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline" />
            <Retroarch.LoaderScreen.Progress />
          </>
        </Retroarch.LoaderScreen>
      </Retroarch>
    </div>
  )
}
