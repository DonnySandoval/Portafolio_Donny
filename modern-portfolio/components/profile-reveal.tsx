"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ProfileRevealProps {
  language: string
}

export default function ProfileReveal({ language }: ProfileRevealProps) {
  const [revealLevel, setRevealLevel] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setRevealLevel(Math.min(scrollPercent * 100, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="sticky top-4 h-fit">
      <motion.div
        className="relative p-6 rounded-lg overflow-hidden"
        style={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #00ff00",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Scanning Lines Effect */}
        <motion.div
          className="absolute inset-0 h-8"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0, 255, 0, 0.2), transparent)",
          }}
          animate={{ y: [-32, 300, -32] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Profile Image Container */}
        <div className="relative mb-6">
          <motion.div
            className="w-48 h-48 mx-auto relative overflow-hidden rounded-lg"
            style={{
              border: "1px solid #00ff00",
              filter: `blur(${Math.max(10 - revealLevel / 10, 0)}px) brightness(${0.3 + revealLevel / 100})`,
            }}
          >
            {/* Nicaragua Flag Background */}
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: "linear-gradient(to bottom, #0066cc 33%, #ffffff 33%, #ffffff 66%, #0066cc 66%)",
              }}
            >
              <motion.div
                className="text-6xl absolute"
                style={{ color: "#00ff00" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                🇳🇮
              </motion.div>
            </div>

            {/* Pixelated overlay that disappears */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: Math.max(1 - revealLevel / 50, 0),
                backgroundColor: "#000000",
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 255, 0, 0.1) 2px,
                    rgba(0, 255, 0, 0.1) 4px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 255, 0, 0.1) 2px,
                    rgba(0, 255, 0, 0.1) 4px
                  )
                `,
              }}
            />
          </motion.div>

          {/* Scanning Progress */}
          <div className="mt-4">
            <div className="text-xs mb-1" style={{ color: "#00ff00" }}>
              {language === "es" ? "PROGRESO DE ESCANEO NEURAL" : "NEURAL SCAN PROGRESS"}
            </div>
            <div className="w-full rounded-full h-2" style={{ backgroundColor: "#1f2937" }}>
              <motion.div
                className="h-2 rounded-full"
                style={{
                  background: "linear-gradient(to right, #00ff00, #22d3ee)",
                  width: `${revealLevel}%`,
                }}
              />
            </div>
            <div className="text-xs mt-1" style={{ color: "#00ff00" }}>
              {Math.round(revealLevel)}% {language === "es" ? "COMPLETO" : "COMPLETE"}
            </div>
          </div>
        </div>

        {/* Information Reveal */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealLevel > 20 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-2xl font-bold mb-2"
              style={{ color: "#22d3ee" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: revealLevel > 30 ? 1 : 0, y: revealLevel > 30 ? 0 : 20 }}
            >
              DONNY DEXTER
            </motion.h1>
            <motion.h2
              className="text-lg mb-4"
              style={{ color: "#00ff00" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: revealLevel > 40 ? 1 : 0, y: revealLevel > 40 ? 0 : 20 }}
            >
              SANDOVAL RÍOS
            </motion.h2>
            <motion.div
              className="text-sm rounded px-3 py-1 inline-block"
              style={{
                color: "#6b7280",
                border: "1px solid #00ff00",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: revealLevel > 50 ? 1 : 0,
                scale: revealLevel > 50 ? 1 : 0.8,
              }}
            >
              INGENIERO TELEMÁTICA
            </motion.div>
          </div>

          <motion.div
            className="space-y-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealLevel > 60 ? 1 : 0 }}
          >
            <div className="flex justify-between">
              <span style={{ color: "#6b7280" }}>{language === "es" ? "ESTADO:" : "STATUS:"}</span>
              <span style={{}}>{language === "es" ? "ESTADO:" : "STATUS:"}</span>
              <span style={{ color: "#00ff00" }}>{language === "es" ? "EN LÍNEA" : "ONLINE"}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6b7280" }}>{language === "es" ? "AUTORIZACIÓN:" : "CLEARANCE:"}</span>
              <span style={{ color: "#22d3ee" }}>NIVEL 9</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6b7280" }}>{language === "es" ? "UBICACIÓN:" : "LOCATION:"}</span>
              <span style={{ color: "#00ff00" }}>NICARAGUA 🇳🇮</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealLevel > 70 ? 1 : 0, y: revealLevel > 70 ? 0 : 20 }}
          >
            <div className="text-xs mb-2" style={{ color: "#6b7280" }}>
              {language === "es" ? "ENLACE NEURAL ESTABLECIDO" : "NEURAL LINK ESTABLISHED"}
            </div>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#00ff00" }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Mouse Proximity Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%)`,
          }}
        />
      </motion.div>
    </div>
  )
}
