"use client"

import { motion } from "framer-motion"

export default function CRTEffect() {
  return (
    <>
      {/* CRT Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div
          className="w-full h-full"
          style={{
            opacity: 0.1,
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 0, 0.03) 2px,
                rgba(0, 255, 0, 0.03) 4px
              )
            `,
          }}
        />
      </div>

      {/* CRT Flicker */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        style={{ backgroundColor: "rgba(0, 255, 0, 0.05)" }}
        animate={{ opacity: [0.95, 1, 0.95] }}
        transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      {/* Screen Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(0, 255, 0, 0.1) 0%,
              rgba(0, 255, 0, 0.05) 50%,
              transparent 100%
            )
          `,
        }}
      />
    </>
  )
}
