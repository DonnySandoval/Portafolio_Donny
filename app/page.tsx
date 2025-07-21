"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import LoginScreen from "@/components/login-screen"
import TerminalInterface from "@/components/terminal-interface"
import CRTEffect from "@/components/crt-effect"
import LanguageDetector from "@/components/language-detector"
import { translations } from "@/components/translations"

export default function CyberpunkPortfolio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState("es")
  const [country, setCountry] = useState("ni")

  const handleLanguageDetected = (detectedLanguage: string, detectedCountry: string) => {
    setLanguage(detectedLanguage)
    setCountry(detectedCountry)
  }

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#000000",
          fontFamily: '"JetBrains Mono", "Courier New", monospace',
        }}
      >
        <LanguageDetector onLanguageDetected={handleLanguageDetected} />
        <div style={{ color: "#00ff00", fontSize: "1.25rem" }}>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4"
              style={{
                backgroundColor: "#00ff00",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            ></div>
            <span>INICIALIZANDO INTERFAZ NEURAL...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        backgroundColor: "#000000",
        color: "#00ff00",
        fontFamily: '"JetBrains Mono", "Courier New", monospace',
      }}
    >
      <CRTEffect />

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <LoginScreen
            key="login"
            onLogin={() => setIsLoggedIn(true)}
            language={language}
            translations={translations}
          />
        ) : (
          <TerminalInterface key="terminal" language={language} country={country} translations={translations} />
        )}
      </AnimatePresence>
    </div>
  )
}
