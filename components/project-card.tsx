"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -10 }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-900/80 rounded-full hover:bg-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-900/80 rounded-full hover:bg-purple-600 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span key={techIndex} className="px-3 py-1 bg-gray-700 text-blue-400 text-xs rounded-full font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
