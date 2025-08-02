"use client"

import { getLucideIcon } from "@/lib/icons-map"
import GradientText from "./gradient-text"

interface BoxIconProps {
  __component: string
  id: number
  Title: string
  Icon: string
  Description: string
}

type Props = {
  data: BoxIconProps
}

export default function BoxIcon({ data }: Props) {
  const { Title, Icon: iconName, Description } = data
  const Icon = getLucideIcon(iconName)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2 mr-4">
            {Icon && <Icon className="h-5 w-5 text-white" />}
          </div>
          <h3 className="text-xl font-medium text-white">
            <GradientText>{Title}</GradientText>
          </h3>
        </div>
        <p className="text-gray-300">{Description}</p>
      </div>
    </div>
  )
}
