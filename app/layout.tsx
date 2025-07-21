import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Donny Dexter Sandoval Ríos - Ingeniero Telemática",
  description:
    "Portafolio profesional de Donny Dexter Sandoval Ríos, Ingeniero en Telemática especializado en redes, telecomunicaciones y desarrollo de software.",
  keywords: "Donny Sandoval, Ingeniero Telemática, Redes, Telecomunicaciones, Desarrollo Software, Costa Rica",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={jetbrainsMono.variable}>
      <body className={`${jetbrainsMono.className} antialiased`}>{children}</body>
    </html>
  )
}
