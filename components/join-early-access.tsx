"use client"

import { useRef, useState } from "react"
import GradientText from "@/components/gradient-text"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Props {
  data: {
    Title: string
    Subtitle: string
    BoxTitle: string
    BoxSubtitle: string
    highlightWords?: string
    FooterText: string
  }
}

export default function JoinEarlyAccess({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [company, setCompany] = useState("")
  const [department, setDepartment] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)
    setError("")

    const form = formRef.current
    form.querySelector<HTMLInputElement>("#direct-email")!.value = email
    form.querySelector<HTMLInputElement>("#direct-fullName")!.value = fullName
    form.querySelector<HTMLInputElement>("#direct-company")!.value = company
    form.querySelector<HTMLInputElement>("#direct-department")!.value = department

    form.submit()
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDialogOpen(false)
      setIsSuccessDialogOpen(true)
    }, 800)
  }

  const renderWithHighlight = (text: string) => {
    if (!data.highlightWords) return text
    const words = data.highlightWords.split(",")
    const parts = text.split(new RegExp(`(${words.join("|")})`, "gi"))
    return parts.map((part, idx) =>
      words.includes(part) ? <GradientText key={idx}>{part}</GradientText> : part
    )
  }

  return (
    <>
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-8 text-gray-400">
            {data.Title}
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {renderWithHighlight(data.Subtitle)}
          </p>

          <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm p-8 rounded-lg border border-gray-800/50 mb-12">
            <h3 className="text-2xl font-light mb-4 text-white">
              {renderWithHighlight(data.BoxTitle)}
            </h3>
            <p className="text-gray-300 mb-8">{data.BoxSubtitle}</p>
            <form onSubmit={handleEmailSubmit} className="w-full max-w-md mx-auto">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 flex-1 bg-gray-900/50 border border-gray-800 text-white placeholder:text-gray-400 backdrop-blur-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <Button
                  type="submit"
                  className="h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6"
                >
                  Join Early Access
                </Button>
              </div>
            </form>
          </div>

          <div className="text-sm text-gray-500">{data.FooterText}</div>
        </div>

        <form
          id="directSubmitForm"
          ref={formRef}
          method="POST"
          action="https://script.google.com/macros/s/AKfycbyUZ6-YLtr13J4Gqmp5JoqmUssQifIIGZrb9jdeVUgm_Ujk4hKATmKpvQ_07O3AyWST/exec"
          target="hidden-iframe"
          style={{ display: "none" }}
        >
          <input type="email" name="email" id="direct-email" />
          <input type="text" name="fullName" id="direct-fullName" />
          <input type="text" name="company" id="direct-company" />
          <input type="text" name="department" id="direct-department" />
          <input type="submit" value="Submit" />
        </form>
        <iframe name="hidden-iframe" style={{ display: "none" }}></iframe>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
          <DialogHeader>
            <DialogTitle>Join our foundational partners</DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete your application to become an early access partner and help shape the future of AI.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-gray-400">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-gray-900/50 border border-gray-800 text-white" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company" className="text-gray-400">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required className="bg-gray-900/50 border border-gray-800 text-white" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="department" className="text-gray-400">Department</Label>
              <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required className="bg-gray-900/50 border border-gray-800 text-white" />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
                {isSubmitting ? "Submitting..." : "Apply Now"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white text-center">
          <div className="py-6 flex flex-col items-center">
            <div className="mb-4 text-2xl sm:text-3xl md:text-4xl">
              <GradientText>Welcome to the future!</GradientText>
            </div>
            <p className="text-lg text-gray-400 mb-6">
              Thank you for applying to become a foundational partner. We'll review your application and be in touch soon!
            </p>
            <Button onClick={() => setIsSuccessDialogOpen(false)} className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white px-8">
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
