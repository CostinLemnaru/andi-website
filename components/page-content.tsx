"use client"

import { componentsMap } from "@/lib/components-map"
import PageLayout from "@/components/page-layout"
import { useRef, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import PostHeader from "./PostHeader"

type StrapiComponent =
  | {
      __component: string
      id: number
      Title: {
        prefix: string
        highlight: string
        subtitle?: string
      }
      Description: {
        tagline_plain: string
        action_words: string[]
        rotating_words: string[]
        tagline_suffix: string
      }
      CtaText?: string
    }
  | {
      __component: string // fallback for unknown ones
      [key: string]: any
    }

type PageData = {
  id: number
  slug: string
  Components?: StrapiComponent[]
  Content?: StrapiComponent[]
  Seo?: {
    title: string
    description: string
  }
  Title?: string
  Subtitle?: string
  createdAt?: string
}

type Props = {
  data?: PageData,
  nav?: any
}

export default function PageContent({ data, nav }: Props) {
  const components = data?.Components || data?.Content || []
  const sectionsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const shouldGate = pathname?.startsWith("/post/") ?? false
  const globalUnlockKey = "andi-post-unlocked"
  const legacyUnlockKey = data?.slug ? `andi-post-unlock-${data.slug}` : null
  const [isUnlocked, setIsUnlocked] = useState(!shouldGate)
  const [isUnlockDialogOpen, setIsUnlockDialogOpen] = useState(false)
  const [unlockForm, setUnlockForm] = useState({ firstName: "", lastName: "", email: "" })
  const [unlockEmailError, setUnlockEmailError] = useState("")
  const [unlockError, setUnlockError] = useState("")
  const [isUnlocking, setIsUnlocking] = useState(false)

  const validateBusinessEmail = (email: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address"
    }

    const personalDomains = [
      "gmail.com",
      "gmail.co.uk",
      "gmail.ca",
      "gmail.com.au",
      "gmail.de",
      "gmail.fr",
      "gmail.it",
      "gmail.es",
      "yahoo.com",
      "yahoo.co.uk",
      "yahoo.ca",
      "yahoo.com.au",
      "yahoo.de",
      "yahoo.fr",
      "aol.com",
      "aol.co.uk",
      "aol.ca",
      "aol.com.au",
      "aol.de",
      "aol.fr",
      "hotmail.com",
      "hotmail.co.uk",
      "hotmail.ca",
      "hotmail.com.au",
      "hotmail.de",
      "hotmail.fr",
      "outlook.com",
      "outlook.co.uk",
      "outlook.ca",
      "outlook.com.au",
      "outlook.de",
      "outlook.fr",
      "live.com",
      "live.co.uk",
      "live.ca",
      "live.com.au",
      "live.de",
      "live.fr",
    ]

    const domain = email.split("@")[1]?.toLowerCase()
    if (domain && personalDomains.includes(domain)) {
      return "Please use your business email address"
    }

    return ""
  }

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return ""
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    return match ? decodeURIComponent(match[2]) : ""
  }

  const submitToHubSpot = async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/hubspot/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(`HubSpot submit failed (${res.status}): ${text}`)
    }

    return res.json()
  }

  useEffect(() => {
    if (!shouldGate) {
      setIsUnlocked(true)
      setIsUnlockDialogOpen(false)
      return
    }
    if (typeof window === "undefined") return
    const storedGlobal = localStorage.getItem(globalUnlockKey)
    if (storedGlobal === "true") {
      setIsUnlocked(true)
      return
    }

    if (legacyUnlockKey) {
      const legacyValue = localStorage.getItem(legacyUnlockKey)
      if (legacyValue === "true") {
        localStorage.setItem(globalUnlockKey, "true")
        setIsUnlocked(true)
        return
      }
    }

    setIsUnlocked(false)
  }, [shouldGate, globalUnlockKey, legacyUnlockKey])

  useEffect(() => {
    if (!isUnlockDialogOpen) {
      setUnlockError("")
      setUnlockEmailError("")
    }
  }, [isUnlockDialogOpen])

  const combinedTextLength = (() => {
    const textParts: string[] = []
    if (data?.Title) textParts.push(data.Title)
    if (data?.Subtitle) textParts.push(data.Subtitle)
    components.forEach((component: any) => {
      if (component && typeof component === "object") {
        Object.values(component).forEach((value) => {
          if (typeof value === "string") {
            textParts.push(value)
          }
        })
      }
    })
    return textParts.join(" ").length
  })()

  const handleUnlockSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const emailError = validateBusinessEmail(unlockForm.email)
    if (emailError) {
      setUnlockEmailError(emailError)
      return
    }

    setIsUnlocking(true)
    setUnlockError("")

    try {
      const hutk = getCookie("hubspotutk")
      const payload = {
        formGuid: "8bef9fa1-3d45-4091-ad8e-c7b298ffb40b",
        fields: [
          { name: "firstname", value: unlockForm.firstName },
          { name: "lastname", value: unlockForm.lastName },
          { name: "email", value: unlockForm.email },
          { name: "LEGAL_CONSENT.processing", value: "true" },
        ],
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai/post",
          pageName: typeof document !== "undefined" ? document.title : data?.Title ?? "Post",
          hutk: hutk || undefined,
        },
      }

      await submitToHubSpot(payload)

      if (typeof window !== "undefined") {
        localStorage.setItem(globalUnlockKey, "true")
        if (legacyUnlockKey) {
          localStorage.setItem(legacyUnlockKey, "true")
        }
      }

      setIsUnlocked(true)
      setIsUnlockDialogOpen(false)
      setUnlockForm({ firstName: "", lastName: "", email: "" })
      setUnlockEmailError("")
    } catch (error) {
      console.error("Unlock submission error:", error)
      setUnlockError("Failed to submit. Please try again.")
    } finally {
      setIsUnlocking(false)
    }
  }

  // Setup scroll-based animations
  useEffect(() => {
    let ticking = false
    let animationFrameId: number

    const updateElements = () => {
      const scrollElements = document.querySelectorAll(".scroll-fade")
      const windowHeight = window.innerHeight
      const windowCenter = windowHeight / 2

      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

      scrollElements.forEach((element) => {
        const rect = element.getBoundingClientRect()

        // Check for special classes
        const isFadeFromTop = element.classList.contains("fade-from-top")
        const isFadeAtBottom = element.classList.contains("fade-at-bottom")
        const isFadeEarly = element.classList.contains("fade-early")

        let opacity = 0

        // Special case for elements that should be visible at the bottom of the page
        if (isFadeAtBottom && isAtBottom) {
          opacity = 1
        } else if (isFadeFromTop) {
          // For roadmap section:
          // 1. Start fading in when top reaches center
          // 2. Fully visible when top is above center
          // 3. Stay visible until bottom reaches center
          // 4. Start fading out when bottom moves above center

          if (rect.top <= windowCenter) {
            if (rect.bottom >= windowCenter) {
              // Element is still in view (between top passing center and bottom passing center)
              opacity = 1
            } else {
              // Bottom has passed center, start fading out
              const distanceFromCenter = (rect.bottom - windowCenter) / windowHeight
              opacity = Math.max(0, 1 + distanceFromCenter * 2)
            }
          } else {
            // Top hasn't reached center yet, calculate fade in
            const distanceFromCenter = (rect.top - windowCenter) / windowHeight
            opacity = Math.max(0, 1 - distanceFromCenter * 2)
          }
        } else if (isFadeEarly) {
          // For ROI calculator - start fading in as soon as top enters viewport
          if (rect.top <= windowHeight) {
            // Element top is visible in viewport, calculate fade based on how much is visible
            if (rect.top <= windowHeight * 0.8) {
              // Fully visible when top reaches 80% of viewport height
              opacity = 1
            } else {
              // Gradual fade in from 100% to 80% of viewport height
              const fadeProgress = (windowHeight - rect.top) / (windowHeight * 0.2)
              opacity = Math.max(0, Math.min(1, fadeProgress))
            }
          } else {
            // Element not yet visible
            opacity = 0
          }
        } else {
          // For all other elements, use modified calculation to fade out later when scrolling up
          const elementCenter = rect.top + rect.height / 2
          const distanceFromCenter = (elementCenter - windowCenter) / windowHeight
          // If element is above center (scrolling up), use a gentler fade rate
          if (distanceFromCenter < 0) {
            // Element is above center (scrolling up) - fade out more slowly
            opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 1.2)) // Reduced from 2 to 1.2 for slower fade
          } else {
            // Element is below center (scrolling down) - use original fade rate
            opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 2))
          }
        }
        // Apply opacity directly without transitions for immediate effect
        ;(element as HTMLElement).style.opacity = opacity.toString()

        // Apply transform based on position (subtle parallax effect)
        const distanceFromCenter = (rect.top + rect.height / 2 - windowCenter) / windowHeight
        const translateY = Math.abs(distanceFromCenter) * 20 // max 20px shift
        ;(element as HTMLElement).style.transform = `translateY(${distanceFromCenter > 0 ? translateY : 0}px)`
      })

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame for smoother animations
        ticking = true
        animationFrameId = window.requestAnimationFrame(updateElements)
      }
    }

    // Initial update
    updateElements()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <PageLayout className="pt-0" nav={nav}>
      <div ref={sectionsRef} className="relative">
        {data?.Title && data?.Subtitle && data?.createdAt && (
          <PostHeader
            Title={data.Title}
            Subtitle={data.Subtitle}
            createdAt={data.createdAt}
          />
        )}
        <div className="relative">
          <div
            className={
              shouldGate && !isUnlocked && combinedTextLength >= 500
                ? "pointer-events-none select-none blur-md max-h-[65vh] overflow-hidden"
                : ""
            }
          >
            {components.map((component: any) => {
              const Component = componentsMap[component.__component]
              if (!Component) {
                console.warn("Component not found for", component.__component)
                return null
              }
              return <Component key={component.id} data={component} />
            })}
          </div>

          {shouldGate && !isUnlocked && combinedTextLength >= 500 && (
            <div className="absolute inset-0 flex items-center justify-center from-gray-950 via-gray-950/85 to-gray-900/60">
              <div className="mx-4 max-w-md rounded-lg border border-purple-500/30 bg-gray-900/95 p-6 text-center shadow-xl">
                <Lock className="mx-auto mb-4 h-10 w-10 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Unlock premium insights</h3>
                <p className="mt-3 text-sm text-gray-300">
                  Enter your business details to access the full post, playbooks, and expert analysis.
                </p>
                <Button
                  onClick={() => setIsUnlockDialogOpen(true)}
                  className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500"
                >
                  Unlock Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {shouldGate && (
        <Dialog open={isUnlockDialogOpen} onOpenChange={setIsUnlockDialogOpen}>
          <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 text-white border border-gray-800/60 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Unlock this post</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUnlockSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="unlock-first-name" className="text-gray-400">
                    First Name
                  </Label>
                  <Input
                    id="unlock-first-name"
                    value={unlockForm.firstName}
                    onChange={(e) => setUnlockForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                    className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="unlock-last-name" className="text-gray-400">
                    Last Name
                  </Label>
                  <Input
                    id="unlock-last-name"
                    value={unlockForm.lastName}
                    onChange={(e) => setUnlockForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                    className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="unlock-email" className="text-gray-400">
                  Business Email
                </Label>
                <Input
                  id="unlock-email"
                  type="email"
                  value={unlockForm.email}
                  onChange={(e) => {
                    setUnlockForm((prev) => ({ ...prev, email: e.target.value }))
                    setUnlockEmailError("")
                  }}
                  onBlur={(e) => {
                    const validation = validateBusinessEmail(e.target.value)
                    if (validation) setUnlockEmailError(validation)
                  }}
                  required
                  className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                {unlockEmailError && <p className="mt-1 text-sm text-red-400">{unlockEmailError}</p>}
              </div>

              {unlockError && <p className="text-sm text-red-400">{unlockError}</p>}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isUnlocking}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500"
                >
                  {isUnlocking ? "Unlocking..." : "Unlock Access"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  )
}
