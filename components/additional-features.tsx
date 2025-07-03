import { MessageSquare, Sparkles } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

export default function AdditionalFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ScrollReveal delay={200}>
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 h-full hover:border-purple-500/30 transition-colors duration-300">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2 w-12 h-12 flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <h4 className="text-xl font-medium text-white mb-4">Voice + Multimodal Interface</h4>
          <p className="text-gray-300">
            Talk to ANDI naturally — via voice, dashboard, email, or embedded directly in tools like Slack, Teams,
            Notion, etc.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 h-full hover:border-purple-500/30 transition-colors duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 w-12 h-12 flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h4 className="text-xl font-medium text-white mb-4">Strategic Narrative Builder</h4>
          <p className="text-gray-300">
            In seconds, ANDI can craft board reports, investor updates, or internal narratives backed by real-time data
            and insights.
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}
