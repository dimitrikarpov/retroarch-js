import { Mutable } from "../../utils"

export const cores = ["fceumm", "genesis_plus_gx"] as const

export type Core = Mutable<(typeof cores)[number]>

type A = keyof (typeof cores)[number]
