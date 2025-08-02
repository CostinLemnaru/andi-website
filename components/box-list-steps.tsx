import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getLucideIcon } from "@/lib/icons-map"
import GradientText from "./gradient-text"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface StepBox {
  id: number
  Title: string
  Icon: string
  Color: string | null
  Description: string
}

interface BoxListStepsProps {
  data: {
    Title: string
    OnePerPage: boolean | null
    Boxes: StepBox[]
  }
}

export default function BoxListSteps({ data }: BoxListStepsProps) {
  const { Title, OnePerPage, Boxes } = data
  const isSingleMode = OnePerPage === true
  const stepsPerPage = isSingleMode ? 1 : 3
  const [currentPage, setCurrentPage] = useState(0)

  const paginatedSteps = Boxes.reduce<StepBox[][]>((acc, step, index) => {
    const pageIndex = Math.floor(index / stepsPerPage)
    if (!acc[pageIndex]) acc[pageIndex] = []
    acc[pageIndex].push(step)
    return acc
  }, [])

  const currentSteps = paginatedSteps[currentPage] || []

  const next = () => setCurrentPage((prev) => (prev + 1) % paginatedSteps.length)
  const prev = () => setCurrentPage((prev) => (prev - 1 + paginatedSteps.length) % paginatedSteps.length)
  const setStep = (index: number) => setCurrentPage(index)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <GradientText>{Title}</GradientText>
      </h2>

      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">

        {/* Navigare sus doar dacă OnePerPage === true */}
        {isSingleMode && paginatedSteps.length > 1 && (
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prev}
              className="bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-sm text-gray-400">
              {currentPage + 1} / {paginatedSteps.length}
            </div>
            <button
              onClick={next}
              className="bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`space-y-6 ${isSingleMode ? "" : "grid"}`}
          >
            {currentSteps.map((step) => {
              const Icon = getLucideIcon(step.Icon)
              const color = step.Color?.toLowerCase() || "gray"

              return (
                <div key={step.id} className={isSingleMode ? "" : "rounded-lg"}>
                  <div className="flex items-start gap-4">
                    {isSingleMode ? (
                      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-6 md:p-8">
                        <div className="text-5xl md:text-6xl text-white">
                          {Icon && <Icon />}
                        </div>
                      </div>
                    ) : (
                      <div className={`bg-${color}-500/20 rounded-full p-3 flex-shrink-0 mt-1`}>
                        {Icon && <Icon className={`h-6 w-6 text-${color}-400`} />}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">{step.Title}</h3>
                      <p className="text-gray-300 whitespace-pre-line">{step.Description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
{!isSingleMode && paginatedSteps.length > 1 && (
  <div className="mt-8 flex justify-center">
    <button
      onClick={next}
      className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
    >
      Next
    </button>
  </div>
)}
        {/* Buline jos doar dacă OnePerPage === false */}
        {paginatedSteps.length > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex gap-2">
              {paginatedSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setStep(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "bg-gradient-to-r from-blue-400 to-purple-500 w-6"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
