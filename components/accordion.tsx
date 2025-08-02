"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AccordionItem {
  id: number
  Text: string
  Description: string
}

interface Props {
  data: {
    Title?: string
    Subtitle?: string
    Accordion: AccordionItem[]
  }
}

export default function Accordion({ data }: Props) {
  const { Title, Subtitle, Accordion } = data
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{Title}</h2>
          {Subtitle && <p className="mt-4 text-lg text-gray-300">{Subtitle}</p>}
        </div>

        <div className="space-y-4">
          {Accordion.map((item, index) => (
            <motion.div
              key={item.id}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                boxShadow: "0 0 15px 0 rgba(107, 114, 128, 0.3)",
              }}
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                onClick={() => toggle(index)}
              >
                <span className="font-medium text-left text-white">{item.Text}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-700">
                      <p className="text-gray-300">{item.Description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
