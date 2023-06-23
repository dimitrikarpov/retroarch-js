import Toastify from "toastify-js"

export const log = (text) => {
  Toastify({
    text,
    className: "info",
    duration: 5000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast()

  console.log(text)
}
