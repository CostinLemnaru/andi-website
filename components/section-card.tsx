import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import GradientText from "./gradient-text"

interface SectionCardProps {
  title: string
  description: string
  link?: string
  icon?: React.ReactNode
}

export default function SectionCard({ title, description, link, icon }: SectionCardProps) {
  const CardContent = () => (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 h-full hover:border-purple-500/30 transition-colors duration-300">
      {icon && (
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2 w-12 h-12 flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-medium text-white mb-4">
        <GradientText>{title}</GradientText>
      </h3>
      <p className="text-gray-300">{description}</p>
      {link && (
        <div className="mt-4 flex items-center text-purple-400 hover:text-purple-300 transition-colors">
          <span>Learn more</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      )}
    </div>
  )

  if (link) {
    return (
      <Link href={link} className="block h-full">
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}
