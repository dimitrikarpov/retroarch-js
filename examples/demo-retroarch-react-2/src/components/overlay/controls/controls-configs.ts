type TControlIconData = {
  path: string
  tooltip: string
}

export type TControlIcons = {
  [key: string]: TControlIconData
}

type TControlMark = {
  top: string
  left: string
}

type TControlElement = {
  name: string
  mark: TControlMark
  icons: TControlIcons
}

export type TControlsConfig = {
  image: string
  elements: TControlElement[]
}

type TConfigIcons = {
  [device: string]: {
    [button: string]: {
      path: string
      tooltip: string
    }
  }
}

/* icons downloaded from https://greatdocbrown.itch.io/gamepad-ui?download */
const icons: TConfigIcons = {
  keyboard: {
    up: { path: "/controls/k-up.png", tooltip: "UP ARROW" },
    down: {
      path: "/controls/k-down.png",
      tooltip: "DOWN ARROW",
    },
    left: {
      path: "/controls/k-left.png",
      tooltip: "LEFT ARROW",
    },
    right: {
      path: "/controls/k-right.png",
      tooltip: "RIGHT ARROW",
    },
    space: { path: "/controls/k-space.png", tooltip: "space" },
    enter: { path: "/controls/k-enter.png", tooltip: "enter" },
    z: { path: "/controls/k-z.png", tooltip: "Z" },
    x: { path: "/controls/k-x.png", tooltip: "X" },
    q: { path: "/controls/k-q.png", tooltip: "Q" },
    w: { path: "/controls/k-w.png", tooltip: "W" },
    a: { path: "/controls/k-a.png", tooltip: "A" },
    s: { path: "/controls/k-s.png", tooltip: "S" },
  },
  ps: {
    dpadUp: { path: "/controls/ps-up.png", tooltip: "D-PAD UP" },
    dpadDown: { path: "/controls/ps-down.png", tooltip: "D-PAD DOWN" },
    dpadLeft: { path: "/controls/ps-left.png", tooltip: "D-PAD LEFT" },
    dpadRight: {
      path: "/controls/ps-right.png",
      tooltip: "D-PAD RIGHT",
    },
    options: {
      path: "/controls/ps-options.png",
      tooltip: "ps options",
    },
    share: { path: "/controls/ps-share.png", tooltip: "ps share" },
    cross: { path: "/controls/ps-cross.png", tooltip: "ps cross" },
    circle: { path: "/controls/ps-circle.png", tooltip: "ps circle" },
    square: { path: "/controls/ps-square.png", tooltip: "ps square" },
    triangle: {
      path: "/controls/ps-triangle.png",
      tooltip: "ps triangle",
    },
    l1: {
      path: "/controls/ps-l1.png",
      tooltip: "left button (shoulder)",
    },
    r1: {
      path: "/controls/ps-r1.png",
      tooltip: "right button (shoulder)",
    },
  },
  xbox: {
    dpadUp: { path: "/controls/ps-up.png", tooltip: "D-PAD UP" },
    dpadDown: { path: "/controls/ps-down.png", tooltip: "D-PAD DOWN" },
    dpadLeft: { path: "/controls/ps-left.png", tooltip: "D-PAD LEFT" },
    dpadRight: {
      path: "/controls/ps-right.png",
      tooltip: "D-PAD RIGHT",
    },
    options: {
      path: "/controls/x-options.png",
      tooltip: "xbox options",
    },
    share: { path: "/controls/x-share.png", tooltip: "xbox share" },
    a: { path: "/controls/x-a.png", tooltip: "xbox A" },
    b: { path: "/controls/x-b.png", tooltip: "xbox B" },
    x: { path: "/controls/x-x.png", tooltip: "xbox X" },
    y: { path: "/controls/x-y.png", tooltip: "xbox Y" },
    l1: {
      path: "/controls/xbox-lb.png",
      tooltip: "left button (shoulder)",
    },
    r1: {
      path: "/controls/xbox-rb.png",
      tooltip: "right button (shoulder)",
    },
  },
} as const

export const nesControlsConfig: TControlsConfig = {
  image: "/controls/nes-controller.png",
  elements: [
    {
      name: "up",
      mark: {
        top: "80",
        left: "73",
      },
      icons: {
        keyboard: icons.keyboard.up,
        ps: icons.ps.dpadUp,
        xbox: icons.xbox.dpadUp,
      },
    },
    {
      name: "down",
      mark: { top: "135", left: "73" },
      icons: {
        keyboard: icons.keyboard.down,
        ps: icons.ps.dpadDown,
        xbox: icons.xbox.dpadDown,
      },
    },
    {
      name: "left",
      mark: { top: "106", left: "46" },
      icons: {
        keyboard: icons.keyboard.left,
        ps: icons.ps.dpadLeft,
        xbox: icons.xbox.dpadLeft,
      },
    },
    {
      name: "right",
      mark: { top: "106", left: "100" },
      icons: {
        keyboard: icons.keyboard.right,
        ps: icons.ps.dpadRight,
        xbox: icons.xbox.dpadRight,
      },
    },
    {
      name: "select",
      mark: { top: "126", left: "174" },
      icons: {
        keyboard: icons.keyboard.space,
        ps: icons.ps.options,
        xbox: icons.xbox.options,
      },
    },
    {
      name: "start",
      mark: { top: "126", left: "238" },
      icons: {
        keyboard: icons.keyboard.enter,
        ps: icons.ps.share,
        xbox: icons.xbox.share,
      },
    },
    {
      name: "b",
      mark: { top: "107", left: "309" },
      icons: {
        keyboard: icons.keyboard.z,
        ps: icons.ps.cross,
        xbox: icons.xbox.a,
      },
    },
    {
      name: "a",
      mark: { top: "107", left: "369" },
      icons: {
        keyboard: icons.keyboard.x,
        ps: icons.ps.circle,
        xbox: icons.xbox.b,
      },
    },
  ],
}

export const segaMDControlsConfig: TControlsConfig = {
  image: "/controls/sega-md-6-controller.png",
  elements: [
    {
      name: "up",
      mark: {
        top: "76",
        left: "85",
      },
      icons: {
        keyboard: icons.keyboard.up,
        ps: icons.ps.dpadUp,
        xbox: icons.xbox.dpadUp,
      },
    },
    {
      name: "down",
      mark: { top: "144", left: "85" },
      icons: {
        keyboard: icons.keyboard.down,
        ps: icons.ps.dpadDown,
        xbox: icons.xbox.dpadDown,
      },
    },
    {
      name: "left",
      mark: { top: "110", left: "51" },
      icons: {
        keyboard: icons.keyboard.left,
        ps: icons.ps.dpadLeft,
        xbox: icons.xbox.dpadLeft,
      },
    },
    {
      name: "right",
      mark: { top: "110", left: "119" },
      icons: {
        keyboard: icons.keyboard.right,
        ps: icons.ps.dpadRight,
        xbox: icons.xbox.dpadRight,
      },
    },
    {
      name: "mode",
      mark: { top: "20", left: "344" },
      icons: {
        keyboard: icons.keyboard.space,
        ps: icons.ps.options,
        xbox: icons.xbox.options,
      },
    },
    {
      name: "start",
      mark: { top: "103", left: "218" },
      icons: {
        keyboard: icons.keyboard.enter,
        ps: icons.ps.share,
        xbox: icons.xbox.share,
      },
    },
    {
      name: "a",
      mark: { top: "165", left: "315" },
      icons: {
        keyboard: icons.keyboard.a,
        ps: icons.ps.square,
        xbox: icons.xbox.x,
      },
    },
    {
      name: "b",
      mark: { top: "152", left: "357" },
      icons: {
        keyboard: icons.keyboard.z,
        ps: icons.ps.cross,
        xbox: icons.xbox.a,
      },
    },
    {
      name: "c",
      mark: { top: "140", left: "396" },
      icons: {
        keyboard: icons.keyboard.x,
        ps: icons.ps.circle,
        xbox: icons.xbox.b,
      },
    },
    {
      name: "x",
      mark: { top: "84", left: "290" },
      icons: {
        keyboard: icons.keyboard.q,
        ps: icons.ps.l1,
        xbox: icons.xbox.l1,
      },
    },
    {
      name: "y",
      mark: { top: "70", left: "329" },
      icons: {
        keyboard: icons.keyboard.s,
        ps: icons.ps.triangle,
        xbox: icons.xbox.y,
      },
    },
    {
      name: "z",
      mark: { top: "57", left: "370" },
      icons: {
        keyboard: icons.keyboard.w,
        ps: icons.ps.r1,
        xbox: icons.xbox.r1,
      },
    },
  ],
}
