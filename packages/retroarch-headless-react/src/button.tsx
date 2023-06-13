import React from "react"
import "./style.css"

export type ButtonProps = {
  title: string
  className?: string
}

export const Button = ({ title, className = "" }: ButtonProps) => {
  const onShowAlert = () => {
    alert(new Date().toLocaleDateString())
  }

  return (
    <button
      className={`my-awesome-component ${className}`}
      onClick={onShowAlert}
    >
      {title}
    </button>
  )
}
