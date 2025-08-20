"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import GradientText from "./gradient-text"
import HubspotForm from "@/components/HubspotForm";

interface RequestDemoBoxProps {
  data: {
    __component: string
    id: number
    Title: string
    Description: string
    FooterText: string
  }
}

export default function RequestDemoBox({ data }: RequestDemoBoxProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [useCase, setUseCase] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleDemoRequest = () => {
    setIsDialogOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Simulează trimiterea datelor
      await new Promise((res) => setTimeout(res, 1000))
      setIsDialogOpen(false)
      setIsSuccessDialogOpen(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-lg border border-gray-800/50 mb-8">
              <h3 className="text-2xl font-light mb-4 text-white">Can't wait for the webinars?</h3>
              <p className="text-gray-300 mb-6">
                {data.Description.includes("andi") ? (
                  <>
                    Get a personalized demo of <GradientText>andi</GradientText> today and see how it can revolutionize your business intelligence.
                  </>
                ) : (
                  data.Description
                )}
              </p>

              <Button
                onClick={handleDemoRequest}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-3 text-lg"
                style={{
                  animation: "gradient 8s linear infinite",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "left",
                }}
              >
                Request a Demo
              </Button>
            </div>

            <p className="text-sm text-gray-500">{data.FooterText}</p>
          </div>
        </div>
      </section>

      {/* Demo Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
          <HubspotForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
