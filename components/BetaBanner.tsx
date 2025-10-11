"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { dispatchRequestAccessEvent } from "@/lib/request-access-events"
import RequestAccessModal from "@/components/RequestAccessModal"

export default function BetaBanner() {
  const [isFallbackOpen, setIsFallbackOpen] = useState(false)

  const handleRequestAccess = () => {
    const handled = dispatchRequestAccessEvent()
    if (!handled) {
      setIsFallbackOpen(true)
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] border-b border-purple-500/30 bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 text-sm sm:px-6 lg:px-8">
          <div className="flex-1 text-center">
            <span className="text-gray-100 drop-shadow-lg">
              <span className="hidden sm:inline">
                Be among the first to experience the next era of business intelligence!{" "}
              </span>
              <span className="font-bold text-purple-200 drop-shadow-lg">ANDI is in Private Beta</span>
            </span>
          </div>
          <Button
            onClick={handleRequestAccess}
            size="sm"
            className="ml-4 h-8 border border-purple-400 bg-purple-700 px-4 py-1 text-xs text-white drop-shadow-lg transition-all duration-200 hover:border-purple-300 hover:bg-purple-800"
          >
            Request Access Now
          </Button>
        </div>
      </div>
      <RequestAccessModal open={isFallbackOpen} onOpenChange={setIsFallbackOpen} />
    </>
  )
}
