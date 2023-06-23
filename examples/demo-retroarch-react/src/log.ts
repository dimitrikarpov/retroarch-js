import toast from "react-hot-toast"

export const log = (text: string) => {
  toast(text, { duration: 5000, position: "top-right" })
  console.log(text)
}
