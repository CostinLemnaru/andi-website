import { CheckCircle } from "lucide-react"
import GradientText from "./gradient-text"

interface Challenge {
  text: string
}

interface Capability {
  text: string
}

interface ChallengesCapabilitiesProps {
  title: string
  challenges: Challenge[]
  capabilities: Capability[]
  result: string
}

export default function ChallengesCapabilities({
  title,
  challenges,
  capabilities,
  result,
}: ChallengesCapabilitiesProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <GradientText>{title}</GradientText>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6">
          <h3 className="text-xl font-medium text-white mb-4">Common Challenges</h3>
          <ul className="space-y-4">
            {challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{challenge.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6">
          <h3 className="text-xl font-medium text-white mb-4">ANDI Capabilities</h3>
          <ul className="space-y-4">
            {capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{capability.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-medium text-white mb-4">Result</h3>
        <p className="text-gray-300">{result}</p>
      </div>
    </div>
  )
}
