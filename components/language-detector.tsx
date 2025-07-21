"use client"

import { useEffect } from "react"

interface LanguageDetectorProps {
  onLanguageDetected: (language: string, country: string) => void
}

export default function LanguageDetector({ onLanguageDetected }: LanguageDetectorProps) {
  useEffect(() => {
    const detectLanguage = async () => {
      try {
        // Try to get user's location via IP
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        const country = data.country_code?.toLowerCase() || "us"
        const spanishCountries = [
          "es",
          "mx",
          "ar",
          "co",
          "ve",
          "pe",
          "cl",
          "ec",
          "gt",
          "cu",
          "bo",
          "do",
          "hn",
          "py",
          "sv",
          "ni",
          "cr",
          "pa",
          "uy",
          "gq",
        ]

        const language = spanishCountries.includes(country) ? "es" : "en"
        onLanguageDetected(language, country)
      } catch (error) {
        // Fallback to browser language
        const browserLang = navigator.language.split("-")[0]
        const language = browserLang === "es" ? "es" : "en"
        onLanguageDetected(language, "unknown")
      }
    }

    detectLanguage()
  }, [onLanguageDetected])

  return null
}
