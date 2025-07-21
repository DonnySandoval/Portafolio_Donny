"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProfileReveal from "@/components/profile-reveal"

interface TerminalInterfaceProps {
  language: string
  country: string
  translations: any
}

export default function TerminalInterface({ language, country, translations }: TerminalInterfaceProps) {
  const [currentPath, setCurrentPath] = useState("/home/donny/portfolio")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [output, setOutput] = useState<Array<{ type: string; content: string; timestamp: string }>>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const terminalRef = useRef<HTMLDivElement>(null)

  const t = translations[language]

  const getProjectDetails = (projectNum: string) => {
    const projects = {
      "1": {
        es: `
╔══════════════════════════════════════════════════════════════╗
║                 MONITOR DE SEGURIDAD DE RED                  ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ Descripción: Sistema avanzado de monitoreo de tráfico de    ║
║ red en tiempo real con detección de anomalías y alertas     ║
║ automáticas para infraestructuras críticas.                 ║
║                                                              ║
║ Tecnologías:                                                 ║
║ • Python, Scapy, Wireshark                                  ║
║ • Machine Learning (scikit-learn)                           ║
║ • Dashboard en React                                         ║
║ • Base de datos PostgreSQL                                   ║
║                                                              ║
║ Características:                                             ║
║ • Detección de intrusiones en tiempo real                   ║
║ • Análisis de patrones de tráfico                           ║
║ • Alertas automáticas vía email/SMS                         ║
║ • Reportes detallados y visualizaciones                     ║
║                                                              ║
║ Estado: ✅ COMPLETADO - En producción                       ║
╚══════════════════════════════════════════════════════════════╝`,
        en: `
╔══════════════════════════════════════════════════════════════╗
║                   NETWORK SECURITY MONITOR                   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ Description: Advanced real-time network traffic monitoring  ║
║ system with anomaly detection and automatic alerts for      ║
║ critical infrastructures.                                   ║
║                                                              ║
║ Technologies:                                                ║
║ • Python, Scapy, Wireshark                                  ║
║ • Machine Learning (scikit-learn)                           ║
║ • React Dashboard                                            ║
║ • PostgreSQL Database                                        ║
║                                                              ║
║ Features:                                                    ║
║ • Real-time intrusion detection                             ║
║ • Traffic pattern analysis                                   ║
║ • Automatic email/SMS alerts                                ║
║ • Detailed reports and visualizations                       ║
║                                                              ║
║ Status: ✅ COMPLETED - In production                        ║
╚══════════════════════════════════════════════════════════════╝`,
      },
      "5": {
        es: `
╔══════════════════════════════════════════════════════════════╗
║              RED MESH COMUNITARIA NICARAGUA                  ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ Descripción: Proyecto de impacto social para llevar         ║
║ internet descentralizado a comunidades rurales de           ║
║ Nicaragua mediante redes mesh autónomas.                    ║
║                                                              ║
║ Tecnologías:                                                 ║
║ • Raspberry Pi, OpenWRT                                      ║
║ • Protocolo BATMAN-adv                                       ║
║ • Antenas direccionales                                      ║
║ • Energía solar                                              ║
║                                                              ║
║ Impacto:                                                     ║
║ • 15 comunidades conectadas                                  ║
║ • 500+ familias con acceso a internet                       ║
║ • Educación digital rural                                    ║
║ • Telemedicina básica                                        ║
║                                                              ║
║ Reconocimientos:                                             ║
║ • 🏆 Premio Nacional de Innovación 2023                     ║
║ • 🌟 Mención ONU Objetivos de Desarrollo Sostenible        ║
║                                                              ║
║ Estado: 🚀 ACTIVO - Expandiéndose                           ║
╚══════════════════════════════════════════════════════════════╝`,
        en: `
╔══════════════════════════════════════════════════════════════╗
║              NICARAGUA COMMUNITY MESH NETWORK                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ Description: Social impact project to bring decentralized   ║
║ internet to rural communities in Nicaragua through          ║
║ autonomous mesh networks.                                    ║
║                                                              ║
║ Technologies:                                                ║
║ • Raspberry Pi, OpenWRT                                      ║
║ • BATMAN-adv Protocol                                        ║
║ • Directional Antennas                                       ║
║ • Solar Power                                                ║
║                                                              ║
║ Impact:                                                      ║
║ • 15 communities connected                                   ║
║ • 500+ families with internet access                        ║
║ • Rural digital education                                    ║
║ • Basic telemedicine                                         ║
║                                                              ║
║ Recognition:                                                 ║
║ • 🏆 National Innovation Award 2023                         ║
║ • 🌟 UN Sustainable Development Goals Mention               ║
║                                                              ║
║ Status: 🚀 ACTIVE - Expanding                               ║
╚══════════════════════════════════════════════════════════════╝`,
      },
    }

    return (
      projects[projectNum as keyof typeof projects]?.[language as keyof (typeof projects)["1"]] ||
      `Proyecto ${projectNum} - Detalles próximamente...`
    )
  }

  const openProjectsPortfolio = () => {
    const projectsHTML = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donny Sandoval - Portafolio de Proyectos</title>
    <style>
        body {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border: 2px solid #00ff00;
            padding: 20px;
            border-radius: 10px;
            background: rgba(0, 255, 0, 0.05);
        }
        .project {
            border: 1px solid #00ff00;
            margin: 20px 0;
            padding: 25px;
            border-radius: 8px;
            background: rgba(0, 255, 0, 0.03);
            transition: all 0.3s ease;
        }
        .project:hover {
            background: rgba(0, 255, 0, 0.08);
            border-color: #22d3ee;
            transform: translateY(-2px);
        }
        .project h2 {
            color: #22d3ee;
            border-bottom: 1px solid #00ff00;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 15px 0;
        }
        .tech {
            background: rgba(0, 255, 0, 0.2);
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 12px;
            border: 1px solid rgba(0, 255, 0, 0.3);
        }
        .status {
            color: #22d3ee;
            font-weight: bold;
            margin: 10px 0;
        }
        .impact {
            background: rgba(34, 211, 238, 0.1);
            padding: 15px;
            border-left: 3px solid #22d3ee;
            margin: 15px 0;
        }
        .flag {
            font-size: 24px;
        }
        .award {
            color: #ffd700;
            font-weight: bold;
        }
        .back-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 0, 0.2);
            border: 1px solid #00ff00;
            color: #00ff00;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }
        .back-btn:hover {
            background: rgba(0, 255, 0, 0.3);
        }
    </style>
</head>
<body>
    <a href="javascript:window.close()" class="back-btn">← Volver al Terminal</a>
    
    <div class="container">
        <div class="header">
            <h1>🇳🇮 DONNY DEXTER SANDOVAL RÍOS</h1>
            <h2>PORTAFOLIO DE PROYECTOS - INGENIERO TELEMÁTICA</h2>
            <p>Managua, Nicaragua | Conectando el futuro digital</p>
        </div>
        
        <div class="project">
            <h2>🔒 Monitor de Seguridad de Red</h2>
            <p>Sistema avanzado de monitoreo de tráfico de red en tiempo real con detección de anomalías y alertas automáticas para infraestructuras críticas de Nicaragua.</p>
            <div class="tech-stack">
                <span class="tech">Python</span>
                <span class="tech">Scapy</span>
                <span class="tech">React</span>
                <span class="tech">PostgreSQL</span>
                <span class="tech">Machine Learning</span>
                <span class="tech">Docker</span>
            </div>
            <div class="impact">
                <strong>Impacto:</strong> Protege la infraestructura de red de 3 empresas nicaragüenses, detectando más de 150 amenazas por mes.
            </div>
            <p class="status">Estado: ✅ COMPLETADO - En producción desde 2023</p>
        </div>

        <div class="project">
            <h2>🌐 Red Mesh Comunitaria Nicaragua</h2>
            <p>Proyecto de impacto social llevando internet descentralizado a comunidades rurales de Nicaragua mediante redes mesh autónomas con energía solar.</p>
            <div class="tech-stack">
                <span class="tech">Raspberry Pi</span>
                <span class="tech">OpenWRT</span>
                <span class="tech">BATMAN-adv</span>
                <span class="tech">Energía Solar</span>
                <span class="tech">Antenas Direccionales</span>
            </div>
            <div class="impact">
                <strong>Impacto Social:</strong><br>
                • 15 comunidades rurales conectadas<br>
                • 500+ familias con acceso a internet<br>
                • Educación digital para 200+ niños<br>
                • Telemedicina básica implementada
            </div>
            <p class="status">Estado: 🚀 ACTIVO - Expandiéndose a 25 comunidades</p>
            <p class="award">🏆 Premio Nacional de Innovación Nicaragua 2023</p>
            <p class="award">🌟 Reconocimiento ONU - Objetivos de Desarrollo Sostenible</p>
        </div>

        <div class="project">
            <h2>🏠 Sistema de Domótica Inteligente</h2>
            <p>Automatización completa del hogar con IA y control por voz en español nicaragüense, adaptado al clima tropical.</p>
            <div class="tech-stack">
                <span class="tech">Arduino</span>
                <span class="tech">Node.js</span>
                <span class="tech">TensorFlow</span>
                <span class="tech">Google Assistant</span>
                <span class="tech">MQTT</span>
                <span class="tech">React Native</span>
            </div>
            <div class="impact">
                <strong>Características:</strong> Control de clima tropical, gestión de energía solar, seguridad inteligente, asistente en español nicaragüense.
            </div>
            <p class="status">Estado: 🔄 EN DESARROLLO - 80% completado</p>
        </div>

        <div class="project">
            <h2>📱 App de Emergencias Nicaragua</h2>
            <p>Aplicación móvil para reportar emergencias con geolocalización y alertas comunitarias, integrada con servicios de emergencia nacionales.</p>
            <div class="tech-stack">
                <span class="tech">React Native</span>
                <span class="tech">Firebase</span>
                <span class="tech">Google Maps</span>
                <span class="tech">Push Notifications</span>
                <span class="tech">WebRTC</span>
            </div>
            <div class="impact">
                <strong>Objetivo:</strong> Reducir tiempo de respuesta de emergencias en un 40% en áreas rurales de Nicaragua.
            </div>
            <p class="status">Estado: 📋 PLANIFICADO - Inicio Q1 2024</p>
        </div>

        <div class="project">
            <h2>🎓 Plataforma Educativa Digital Nicaragua</h2>
            <p>Sistema de educación a distancia para estudiantes rurales con contenido offline y sincronización inteligente.</p>
            <div class="tech-stack">
                <span class="tech">Next.js</span>
                <span class="tech">PWA</span>
                <span class="tech">IndexedDB</span>
                <span class="tech">WebRTC</span>
                <span class="tech">Tailwind CSS</span>
            </div>
            <div class="impact">
                <strong>Meta:</strong> Llegar a 1000+ estudiantes rurales con educación de calidad sin necesidad de internet constante.
            </div>
            <p class="status">Estado: 🚀 EN DESARROLLO - Piloto en 5 escuelas</p>
        </div>
    </div>

    <script>
        // Add some interactive effects
        document.querySelectorAll('.project').forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3)';
            });
            project.addEventListener('mouseleave', () => {
                project.style.boxShadow = 'none';
            });
        });
    </script>
</body>
</html>`

    const blob = new Blob([projectsHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
    return language === "es"
      ? "🚀 Abriendo portafolio completo de proyectos en nueva pestaña..."
      : "🚀 Opening complete projects portfolio in new tab..."
  }

  const commands = {
    // Spanish commands
    ayuda: () => t.help,
    sobre_donny: () => t.aboutDonny,
    proyectos: () => t.projects,
    habilidades: () => t.skills,
    contactame: () => t.contact,
    quien_soy: () => "donny",
    fecha: () => new Date().toLocaleString(language === "es" ? "es-NI" : "en-US"),
    limpiar: () => "CLEAR",

    // English commands (fallback)
    help: () => t.help,
    about_donny: () => t.aboutDonny,
    projects: () => t.projects,
    skills: () => t.skills,
    contact_me: () => t.contact,
    whoami: () => "donny",
    date: () => new Date().toLocaleString(language === "es" ? "es-NI" : "en-US"),
    clear: () => "CLEAR",

    // Universal commands
    ls: () => `total 8
drwxr-xr-x  2 donny donny 4096 Dec 21 10:30 about/
drwxr-xr-x  2 donny donny 4096 Dec 21 10:30 projects/
drwxr-xr-x  2 donny donny 4096 Dec 21 10:30 skills/
drwxr-xr-x  2 donny donny 4096 Dec 21 10:30 contact/
-rw-r--r--  1 donny donny  256 Dec 21 10:30 README.md
-rw-r--r--  1 donny donny  128 Dec 21 10:30 .secrets`,

    matrix: () => `
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100`,

    hack_the_planet: () =>
      language === "es"
        ? `
🌍 ¡HACKEA EL PLANETA! 🌍

"Juega con los mejores, muere como el resto!"
- Zero Cool

Nivel de Acceso: ÉLITE
Estado: HACKEANDO EN PROGRESO...
Objetivo: EL GIBSON
Progreso: ████████████████████ 100%

¡HACKEO EXITOSO! 
Bienvenido al círculo interno, fellow hacker.`
        : `
🌍 HACK THE PLANET! 🌍

"Mess with the best, die like the rest!"
- Zero Cool

Access Level: ELITE
Status: HACKING IN PROGRESS...
Target: THE GIBSON
Progress: ████████████████████ 100%

HACK SUCCESSFUL! 
Welcome to the inner circle, fellow hacker.`,

    hackear_planeta: () => `
🌍 ¡HACKEA EL PLANETA! 🌍

"Juega con los mejores, muere como el resto!"
- Zero Cool

Nivel de Acceso: ÉLITE
Estado: HACKEANDO EN PROGRESO...
Objetivo: EL GIBSON
Progreso: ████████████████████ 100%

¡HACKEO EXITOSO! 
Bienvenido al círculo interno, fellow hacker.`,

    clima: () =>
      language === "es"
        ? `
🌤️ CLIMA ACTUAL - MANAGUA, NICARAGUA 🇳🇮

Temperatura: 28°C (Sensación térmica: 32°C)
Humedad: 75%
Viento: 15 km/h del Este
Condición: Parcialmente nublado
UV Index: 8 (Alto)

Pronóstico:
🌅 Mañana: 24°C - Soleado
🌞 Tarde: 31°C - Caluroso
🌙 Noche: 26°C - Despejado

¡Perfecto para trabajar en proyectos tech! ☀️`
        : `
🌤️ CURRENT WEATHER - MANAGUA, NICARAGUA 🇳🇮

Temperature: 82°F (Feels like: 90°F)
Humidity: 75%
Wind: 9 mph from East
Condition: Partly cloudy
UV Index: 8 (High)

Forecast:
🌅 Morning: 75°F - Sunny
🌞 Afternoon: 88°F - Hot
🌙 Evening: 79°F - Clear

Perfect for working on tech projects! ☀️`,

    weather: () => `
🌤️ CURRENT WEATHER - MANAGUA, NICARAGUA 🇳🇮

Temperature: 82°F (Feels like: 90°F)
Humidity: 75%
Wind: 9 mph from East
Condition: Partly cloudy
UV Index: 8 (High)

Forecast:
🌅 Morning: 75°F - Sunny
🌞 Afternoon: 88°F - Hot
🌙 Evening: 79°F - Clear

Perfect for working on tech projects! ☀️`,

    musica: () => {
      setIsPlaying(!isPlaying)
      return language === "es"
        ? `
🎵 REPRODUCTOR DE MÚSICA NEURAL 🎵

${isPlaying ? "⏸️ PAUSANDO" : "▶️ REPRODUCIENDO"}: "Synthwave Coding Mix"
🎧 Volumen: ████████░░ 80%
🔄 Modo: Bucle infinito
🎼 Género: Synthwave/Cyberpunk

Pistas en cola:
1. ${isPlaying ? "▶️" : "⏸️"} "Digital Dreams" - Cyber Collective
2. "Neon Nights" - Retro Future
3. "Code Runner" - Synth Masters
4. "Nicaragua Digital" - Donny's Mix

${isPlaying ? "Música perfecta para codear! 🚀" : 'Música pausada. ¡Vuelve a escribir "musica" para reanudar!'}`
        : `
🎵 NEURAL MUSIC PLAYER 🎵

${isPlaying ? "⏸️ PAUSING" : "▶️ PLAYING"}: "Synthwave Coding Mix"
🎧 Volume: ████████░░ 80%
🔄 Mode: Infinite loop
🎼 Genre: Synthwave/Cyberpunk

Queue:
1. ${isPlaying ? "▶️" : "⏸️"} "Digital Dreams" - Cyber Collective
2. "Neon Nights" - Retro Future
3. "Code Runner" - Synth Masters
4. "Nicaragua Digital" - Donny's Mix

${isPlaying ? "Perfect coding music! 🚀" : 'Music paused. Type "music" again to resume!'}`
    },

    music: () => {
      setIsPlaying(!isPlaying)
      return `
🎵 NEURAL MUSIC PLAYER 🎵

${isPlaying ? "⏸️ PAUSING" : "▶️ PLAYING"}: "Synthwave Coding Mix"
🎧 Volume: ████████░░ 80%
🔄 Mode: Infinite loop
🎼 Genre: Synthwave/Cyberpunk

Queue:
1. ${isPlaying ? "▶️" : "⏸️"} "Digital Dreams" - Cyber Collective
2. "Neon Nights" - Retro Future
3. "Code Runner" - Synth Masters
4. "Nicaragua Digital" - Donny's Mix

${isPlaying ? "Perfect coding music! 🚀" : 'Music paused. Type "music" again to resume!'}`
    },

    juego: () => `
🎮 MINI JUEGO: ADIVINA EL NÚMERO

He pensado un número entre 1 y 100.
¡Intenta adivinarlo!

Escribe: adivinar <número>
Ejemplo: adivinar 50

Pistas:
🔥 Cerca = ±5
🌡️ Más lejos = ±15
❄️ Lejos = ±30
🧊 Muy lejos = ±50+

¡Buena suerte, hacker!`,

    game: () => `
🎮 MINI GAME: GUESS THE NUMBER

I'm thinking of a number between 1 and 100.
Try to guess it!

Type: guess <number>
Example: guess 50

Hints:
🔥 Close = ±5
🌡️ Further = ±15
❄️ Far = ±30
🧊 Very far = ±50+

Good luck, hacker!`,

    abrir_proyectos: () => openProjectsPortfolio(),

    open_projects: () => openProjectsPortfolio(),

    nicaragua: () =>
      language === "es"
        ? `
🇳🇮 NICARAGUA - TIERRA DE LAGOS Y VOLCANES 🇳🇮

Capital: Managua
Población: 6.8 millones
Idioma: Español
Moneda: Córdoba (NIO)

Datos Tech:
📡 Penetración Internet: 65%
📱 Usuarios móviles: 85%
💻 Sector TI en crecimiento: +15% anual
🌐 Proyectos de fibra óptica nacional

¡Orgulloso de ser nicaragüense y contribuir al desarrollo tecnológico del país! 🚀`
        : `
🇳🇮 NICARAGUA - LAND OF LAKES AND VOLCANOES 🇳🇮

Capital: Managua
Population: 6.8 million
Language: Spanish
Currency: Córdoba (NIO)

Tech Facts:
📡 Internet Penetration: 65%
📱 Mobile Users: 85%
💻 IT Sector Growth: +15% annually
🌐 National Fiber Optic Projects

Proud to be Nicaraguan and contribute to the country's technological development! 🚀`,

    cafe: () =>
      language === "es"
        ? `
☕ PREPARANDO CAFÉ NICARAGÜENSE ☕

Seleccionando granos de Jinotega...
Moliendo café de altura...
Temperatura del agua: 92°C
Tiempo de extracción: 4 minutos

████████████████████████████████████████ 100%

¡Café listo! ☕
Perfecto para una sesión de coding nocturna.
El mejor combustible para desarrolladores nicaragüenses 🇳🇮

Tip: El café de Nicaragua es considerado uno de los mejores del mundo 🌟`
        : `
☕ BREWING NICARAGUAN COFFEE ☕

Selecting beans from Jinotega...
Grinding high-altitude coffee...
Water temperature: 197°F
Extraction time: 4 minutes

████████████████████████████████████████ 100%

Coffee ready! ☕
Perfect for a night coding session.
The best fuel for Nicaraguan developers 🇳🇮

Tip: Nicaragua's coffee is considered among the world's finest 🌟`,

    coffee: () => `
☕ BREWING NICARAGUAN COFFEE ☕

Selecting beans from Jinotega...
Grinding high-altitude coffee...
Water temperature: 197°F
Extraction time: 4 minutes

████████████████████████████████████████ 100%

Coffee ready! ☕
Perfect for a night coding session.
The best fuel for Nicaraguan developers 🇳🇮

Tip: Nicaragua's coffee is considered among the world's finest 🌟`,
  }

  const executeCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const trimmedCmd = cmd.trim().toLowerCase()

    setCommandHistory((prev) => [...prev, cmd])

    if (trimmedCmd === "clear" || trimmedCmd === "limpiar") {
      setOutput([])
      return
    }

    let result = ""
    if (commands[trimmedCmd as keyof typeof commands]) {
      result = commands[trimmedCmd as keyof typeof commands]()
    } else if (trimmedCmd.startsWith("proyecto ") || trimmedCmd.startsWith("project ")) {
      const projectNum = trimmedCmd.split(" ")[1]
      result = getProjectDetails(projectNum)
    } else if (trimmedCmd.startsWith("adivinar ") || trimmedCmd.startsWith("guess ")) {
      const guess = Number.parseInt(trimmedCmd.split(" ")[1])
      const diff = Math.abs(guess - gameNumber)

      if (guess === gameNumber) {
        result =
          language === "es"
            ? `🎉 ¡CORRECTO! El número era ${gameNumber}. ¡Eres un verdadero hacker!`
            : `🎉 CORRECT! The number was ${gameNumber}. You're a true hacker!`
      } else if (diff <= 5) {
        result = "🔥 Cerca"
      } else if (diff <= 15) {
        result = "🌡️ Más lejos"
      } else if (diff <= 30) {
        result = "❄️ Lejos"
      } else {
        result = "🧊 Muy lejos"
      }
    } else if (trimmedCmd === "") {
      result = ""
    } else {
      result = `${t.commandNotFound}: ${cmd}\n${t.typeHelp}`
    }

    if (result !== "CLEAR") {
      setOutput((prev) => [
        ...prev,
        { type: "command", content: `${currentPath}$ ${cmd}`, timestamp },
        { type: "output", content: result, timestamp },
      ])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand)
      setCurrentCommand("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    setOutput([{ type: "output", content: t.welcome, timestamp: new Date().toLocaleTimeString() }])
  }, [t.welcome])

  return (
    <motion.div
      className="min-h-screen p-4 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Profile Reveal Section */}
      <div className="w-1/3 p-4">
        <ProfileReveal language={language} />
      </div>

      {/* Terminal Section */}
      <div className="w-2/3 p-4">
        <div
          className="rounded-lg h-full flex flex-col"
          style={{
            backgroundColor: "#000000",
            border: "1px solid #00ff00",
          }}
        >
          {/* Terminal Header */}
          <div className="p-2 flex items-center justify-between" style={{ borderBottom: "1px solid #00ff00" }}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#eab308" }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e" }}></div>
            </div>
            <div className="text-sm flex items-center space-x-2" style={{ color: "#00ff00" }}>
              <span>donny@neural-interface</span>
              <span>🇳🇮</span>
              {isPlaying && <span>🎵</span>}
            </div>
            <div className="text-sm" style={{ color: "#00ff00" }}>
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#4ade80 #1f2937",
            }}
          >
            <AnimatePresence>
              {output.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2"
                  style={{
                    color: line.type === "command" ? "#22d3ee" : "#00ff00",
                    fontFamily: "JetBrains Mono, Courier New, monospace",
                  }}
                >
                  <pre className="whitespace-pre-wrap text-sm">{line.content}</pre>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Command Input */}
            <div className="flex items-center space-x-2 mt-4">
              <span style={{ color: "#22d3ee" }}>{currentPath}$</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                style={{
                  backgroundColor: "transparent",
                  color: "#00ff00",
                  outline: "none",
                  fontFamily: "JetBrains Mono, Courier New, monospace",
                }}
                placeholder={language === "es" ? "Escribe un comando..." : "Type a command..."}
                autoFocus
              />
              <motion.div
                className="w-2 h-4"
                style={{ backgroundColor: "#00ff00" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
