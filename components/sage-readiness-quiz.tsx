"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface Question {
  id: string
  text: string
  options: {
    id: string
    text: string
    score: number
  }[]
}

interface Result {
  min: number
  max: number
  title: string
  description: string
  recommendation: string
  color: string
}

interface Props {
  questions: Question[]
  results: Result[]
  title?: string
}

export default function SageReadinessQuiz({ questions, results, title = "SAGE Readiness Assessment" }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const handleAnswer = (questionId: string, optionId: string, optionScore: number) => {
    setAnswers({ ...answers, [questionId]: optionId })

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      const newScore = Object.keys(answers).reduce((total, qId) => {
        const q = questions.find((q) => q.id === qId)
        if (!q) return total
        const selectedOption = q.options.find((o) => o.id === answers[qId])
        return total + (selectedOption?.score || 0)
      }, optionScore)

      setScore(newScore)
      setShowResults(true)
    }
  }

  const getResult = () => {
    return results.find((r) => score >= r.min && score <= r.max) || results[0]
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const resultColors = {
    red: "from-red-500 to-red-700 border-red-500/30 text-red-400",
    yellow: "from-yellow-500 to-yellow-700 border-yellow-500/30 text-yellow-400",
    blue: "from-blue-500 to-blue-700 border-blue-500/30 text-blue-400",
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12 bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
        {title}
      </h3>

      {!showResults ? (
        <div>
          <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
            <motion.div
              className="bg-emerald-500 h-2 rounded-full"
              initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-medium mb-4 text-white">{questions[currentQuestion].text}</h4>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.id, option.score)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      answers[questions[currentQuestion].id] === option.id
                        ? "bg-emerald-900/40 border border-emerald-500/30"
                        : "bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                          answers[questions[currentQuestion].id] === option.id ? "bg-emerald-500" : "bg-gray-600"
                        }`}
                      >
                        {answers[questions[currentQuestion].id] === option.id && (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-200">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-sm text-gray-400 text-center">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-gray-800 text-gray-300 mb-2">
              Your Score: {score} / {questions.length * 3}
            </div>
            <h4
              className={`text-2xl font-bold ${
                resultColors[getResult().color as keyof typeof resultColors].split(" ")[3]
              }`}
            >
              {getResult().title}
            </h4>
          </div>

          <div
            className={`p-6 rounded-lg bg-gradient-to-br ${
              resultColors[getResult().color as keyof typeof resultColors].split(" ")[0]
            } ${resultColors[getResult().color as keyof typeof resultColors].split(" ")[1]} bg-opacity-10 border ${
              resultColors[getResult().color as keyof typeof resultColors].split(" ")[2]
            } mb-6`}
          >
            <p className="text-white mb-4">{getResult().description}</p>
            <p className="text-white font-medium">Recommendation: {getResult().recommendation}</p>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
            <h5 className="font-medium text-emerald-400 mb-2">Next Steps</h5>
            <ul className="space-y-2">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Schedule a demo of ANDI to see SAGE capabilities in action</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Identify one high-value use case for a pilot implementation</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Assess your current tech stack for integration opportunities</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button onClick={resetQuiz} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Retake Assessment
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
