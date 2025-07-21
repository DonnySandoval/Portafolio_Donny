"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface Skill {
  name: string
  icon: LucideIcon
  level: number
  color: string
}

interface SkillCardProps {
  skill: Skill
  index: number
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className={`p-4 rounded-full bg-gradient-to-r ${skill.color}`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-center mb-4 text-white">{skill.name}</h3>

        <div className="relative">
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="text-right text-sm text-gray-400">{skill.level}%</div>
        </div>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          {skill.level}% de dominio
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
