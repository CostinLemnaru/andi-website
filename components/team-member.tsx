import Image from "next/image"
import { Linkedin, Twitter, User } from "lucide-react"

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  imageSrc: string
  linkedin?: string
  twitter?: string
}

export default function TeamMember({ name, role, bio, imageSrc, linkedin, twitter }: TeamMemberProps) {
  return (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-purple-500/30 transition-colors duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-purple-500/50">
          {imageSrc ? (
            <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <User className="h-16 w-16 text-gray-500" />
            </div>
          )}
        </div>
        <h3 className="text-xl font-medium text-white">{name}</h3>
        <p className="text-purple-400 mb-4">{role}</p>
        <p className="text-gray-300 mb-4">{bio}</p>
        <div className="flex space-x-4">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
