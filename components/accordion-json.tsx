"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronDown, ChevronUp } from "lucide-react"

interface AccordionJsonProps {
  data: {
    Title: string
    Subtitle: string
    Accordion: {
      id: number
      Title: string
      Content: {
        heading?: string
        columns: string[]
        rows: {
          Feature: string
          Launch: string | boolean
          Scale: string | boolean
          Enterprise: string | boolean
          description: string
        }[]
      }
    }[]
  }
}

export default function AccordionJson({ data }: AccordionJsonProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) =>
      prev.includes(title) ? prev.filter((cat) => cat !== title) : [...prev, title]
    )
  }

  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-500 mx-auto" />
      )
    }
    if (value === "check") return <Check className="h-5 w-5 text-green-500 mx-auto" />
    if (value === "x") return <X className="h-5 w-5 text-gray-500 mx-auto" />
    return <span className="text-sm text-gray-300 break-words">{value}</span>
  }

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{data.Title}</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{data.Subtitle}</p>
        </div>

        <div className="space-y-6">
          {data.Accordion.map((category) => (
            <motion.div
              key={category.id}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                boxShadow: "0 0 15px 0 rgba(107, 114, 128, 0.3)",
              }}
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleCategory(category.Title)}
              >
                <span className="font-medium text-left text-white text-lg">{category.Title}</span>
                {openCategories.includes(category.Title) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openCategories.includes(category.Title) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-700">
                      {category.Content.heading && (
                        <p className="text-gray-300 mb-4 italic">
                          {category.Content.heading}
                        </p>
                      )}

                      <table className="w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            {category.Content.columns.map((col, index) => (
                              <th
                                key={index}
                                className={`py-3.5 px-3 text-sm font-semibold text-white ${index === 0 ? "text-left" : "text-center"}`}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {category.Content.rows.map((row, featureIndex) => (
                            <tr key={featureIndex} className="hover:bg-gray-800/30">
                              <td className="py-4 px-3 text-sm text-white text-left align-top">
                                <div className="font-medium text-white">{row.Feature}</div>
                                <div className="text-xs text-gray-300 mt-2 pr-2 leading-relaxed">
                                  {row.description}
                                </div>
                              </td>
                              <td className="px-3 py-4 text-center align-top">{renderValue(row.Launch)}</td>
                              <td className="px-3 py-4 text-center align-top">{renderValue(row.Scale)}</td>
                              <td className="px-3 py-4 text-center align-top">{renderValue(row.Enterprise)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
