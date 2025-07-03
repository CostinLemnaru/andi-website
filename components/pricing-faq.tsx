"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How does usage-based pricing work?",
    answer:
      "Instead of charging per user, ANDI charges based on your usage of the platform's capabilities, such as NLP queries, correlation operations, and storage. This allows unlimited users to access the platform while you only pay for the value you receive.",
  },
  {
    question: "Can I add more NLP queries if I need them?",
    answer:
      "Yes, all plans allow you to add more NLP queries as needed. You can purchase additional query packs to supplement your monthly allocation.",
  },
  {
    question: "What are Functional Intelligence Modules?",
    answer:
      "Functional Intelligence Modules are specialized add-ons that provide deeper insights for specific business functions like Finance, Marketing, HR, and Strategy. They plug into the core platform and enhance its capabilities for those specific areas.",
  },
  {
    question: "Do I need to pay for each user who accesses ANDI?",
    answer:
      "No, ANDI offers unlimited users on all plans. You pay for platform usage, not per seat, which allows you to democratize access to insights across your organization without increasing costs.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan as your needs change. Our team will work with you to ensure a smooth transition and help you find the right plan for your current requirements.",
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-300">
            Have questions about our pricing? Find answers to common questions below.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                boxShadow: "0 0 15px 0 rgba(107, 114, 128, 0.3)",
              }}
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-left text-white">{faq.question}</span>
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
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Contact our sales team
          </motion.button>
        </div>
      </div>
    </section>
  )
}
