"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  style = {},
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed, isStarted])

  return (
    <span className={className} style={style}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-2 h-4 ml-1"
          style={{ backgroundColor: "#00ff00" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </span>
  )
}
