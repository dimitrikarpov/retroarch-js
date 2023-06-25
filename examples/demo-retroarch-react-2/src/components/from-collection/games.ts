export const games = [
  { rom: "Super Aladdin (Unl).nes", core: "fceumm" },
  {
    rom: "Squirrel King (R) [!].gen",
    core: "genesis_plus_gx",
  },
  {
    rom: "Gotta Protectors - Amazons Running Diet (En) (Unl).nes",
    core: "fceumm",
  },
  {
    rom: "Black_Jewel_Reborn_Demo_v020.bin",
    core: "genesis_plus_gx",
  },
]

export type Game = (typeof games)[0]
