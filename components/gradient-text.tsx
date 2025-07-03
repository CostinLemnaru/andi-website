import type React from "react"
export default function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      style={{
        animation: "gradient 8s linear infinite",
        backgroundSize: "300% 100%",
        backgroundPosition: "left",
      }}
    >
      {children}
    </span>
  )
}
