"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TypewriterText from "@/components/typewriter-text"

interface LoginScreenProps {
  onLogin: () => void
  language: string
  translations: any
}

export default function LoginScreen({ onLogin, language, translations }: LoginScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const t = translations[language]

  const steps = [t.connecting, t.establishing, t.loading, t.systemReady]

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      username.toLowerCase() === "donny" ||
      username.toLowerCase() === "guest" ||
      username.toLowerCase() === "invitado"
    ) {
      setIsAuthenticated(true)
      setTimeout(() => {
        onLogin()
      }, 2000)
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: "#000000" }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        <div
          className="grid h-full w-full"
          style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))", gridTemplateRows: "repeat(20, minmax(0, 1fr))" }}
        >
          {Array.from({ length: 400 }).map((_, i) => (
            <motion.div
              key={i}
              className="border"
              style={{ borderColor: "#00ff00" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.random() > 0.8 ? 1 : 0 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      </div>

      <div className="z-10 w-full max-w-2xl">
        {currentStep < steps.length - 1 ? (
          <div className="text-center">
            <motion.div className="mb-8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ border: "2px solid #00ff00" }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#00ff00" }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>

            <TypewriterText text={steps[currentStep]} className="text-xl mb-4" speed={50} />

            <div className="w-64 h-2 mx-auto rounded" style={{ backgroundColor: "#1f2937" }}>
              <motion.div
                className="h-full rounded"
                style={{
                  background: "linear-gradient(to right, #00ff00, #22d3ee)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-lg shadow-2xl"
            style={{
              backgroundColor: "#000000",
              border: "1px solid #00ff00",
            }}
          >
            <div className="mb-6">
              <TypewriterText
                text="╔══════════════════════════════════════╗"
                className="block"
                style={{ color: "#00ff00" }}
                speed={20}
              />
              <TypewriterText
                text="║     DONNY DEXTER SANDOVAL RÍOS       ║"
                className="block text-center py-2"
                style={{ color: "#22d3ee" }}
                speed={30}
                delay={1000}
              />
              <TypewriterText
                text="║        INGENIERO TELEMÁTICA          ║"
                className="block text-center"
                style={{ color: "#00ff00" }}
                speed={30}
                delay={2000}
              />
              <TypewriterText
                text="║           MANAGUA, NICARAGUA 🇳🇮      ║"
                className="block text-center"
                style={{ color: "#22d3ee" }}
                speed={30}
                delay={3000}
              />
              <TypewriterText
                text="╚══════════════════════════════════════╝"
                className="block"
                style={{ color: "#00ff00" }}
                speed={20}
                delay={4000}
              />
            </div>

            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <TypewriterText
                    text="root@donny-portfolio:~$ login"
                    className="mb-2"
                    style={{ color: "#00ff00" }}
                    speed={50}
                    delay={5000}
                  />
                  <div className="flex items-center space-x-2">
                    <span style={{ color: "#00ff00" }}>{t.username}:</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1"
                      style={{
                        backgroundColor: "transparent",
                        borderBottom: "1px solid #00ff00",
                        color: "#00ff00",
                        outline: "none",
                        fontFamily: '"JetBrains Mono", "Courier New", monospace',
                      }}
                      placeholder="donny | guest | invitado"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span style={{ color: "#00ff00" }}>{t.password}:</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1"
                      style={{
                        backgroundColor: "transparent",
                        borderBottom: "1px solid #00ff00",
                        color: "#00ff00",
                        outline: "none",
                        fontFamily: '"JetBrains Mono", "Courier New", monospace',
                      }}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full mt-6 py-2 transition-all duration-300"
                  style={{
                    border: "1px solid #00ff00",
                    color: "#00ff00",
                    backgroundColor: "transparent",
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "#00ff00",
                    color: "#000000",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.accessSystem}
                </motion.button>

                <p className="text-xs text-center mt-4" style={{ color: "#6b7280" }}>
                  {t.hint}
                </p>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <TypewriterText
                  text={t.accessGranted}
                  className="text-xl mb-4"
                  style={{ color: "#00ff00" }}
                  speed={100}
                />
                <TypewriterText text={t.loadingInterface} style={{ color: "#22d3ee" }} speed={80} delay={1000} />
                <motion.div
                  className="mt-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto"
                    style={{
                      border: "2px solid #00ff00",
                      borderTop: "2px solid transparent",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
