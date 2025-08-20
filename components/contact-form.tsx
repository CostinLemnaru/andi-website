"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import HubspotForm from "@/components/HubspotForm";

type ContactFormProps = {
  isOpen: boolean
  onClose: () => void
  selectedPlan: string
}

export function ContactForm({ isOpen, onClose, selectedPlan }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the form data to a server
    console.log("Form submitted:", { ...formData, plan: selectedPlan })
    alert("Thank you for your interest! Our team will contact you shortly.")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white"></h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <HubspotForm />
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
