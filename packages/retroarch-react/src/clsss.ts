export const clsss = (...args: Array<string | false | undefined>) => {
  return args
    .filter(Boolean)
    .filter((item) => typeof item === "string")
    .join(" ")
}
