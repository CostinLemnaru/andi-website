"use client"

import { useState } from "react"
import ScrollReveal from "./scroll-reveal"
import GradientText from "./gradient-text"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import HubspotForm from "@/components/HubspotForm";

interface ExpectedLaunchBoxProps {
  data: {
    __component: string
    id: number
    Description: string
  }
}

export default function ExpectedLaunchBox({ data }: ExpectedLaunchBoxProps) {
  const { Description } = data
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section className="relative py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-light mb-4">
                Expected Launch: <GradientText>Q3 2025</GradientText>
              </h3>
              <p className="text-gray-300 mb-6">{Description}</p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Notification Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#0c0c14] border border-white/20 text-white max-w-md">
              <HubspotForm />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
