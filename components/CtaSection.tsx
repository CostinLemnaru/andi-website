"use client"

import { useState, useRef, useEffect } from "react"
import { submitToGoogleSheets } from "@/lib/google-sheets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GradientText from "./gradient-text"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
    data: any
}

export default function CtaSection({ data }: Props) {
    const [email, setEmail] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
    const [fullName, setFullName] = useState("")
    const [company, setCompany] = useState("")
    const [department, setDepartment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const formRef = useRef<HTMLFormElement>(null)
    const exploreRef = useRef<HTMLDivElement>(null)
    const sectionsRef = useRef<HTMLDivElement>(null)

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
                ; (element as HTMLElement).style.opacity = opacity.toString()

                // Apply transform based on position (subtle parallax effect)
                const distanceFromCenter = (rect.top + rect.height / 2 - windowCenter) / windowHeight
                const translateY = Math.abs(distanceFromCenter) * 20 // max 20px shift
                    ; (element as HTMLElement).style.transform = `translateY(${distanceFromCenter > 0 ? translateY : 0}px)`
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

    // Scroll to explore section
    const scrollToExplore = () => {
        exploreRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // This function only opens the dialog, it doesn't submit anything
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setIsDialogOpen(true)
        }
    }

    // This function handles the actual submission with all details
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        try {
            // Only submit to Google Sheets when the dialog form is submitted
            await fallbackSubmit()

            // Also try the server action as a backup
            const result = await submitToGoogleSheets({
                email,
                fullName,
                company,
                department,
            })

            // Close the form dialog and show the success dialog
            setIsDialogOpen(false)
            setIsSuccessDialogOpen(true)

            // Reset form fields
            setEmail("")
            setFullName("")
            setCompany("")
            setDepartment("")
        } catch (err) {
            console.error("Form submission error:", err)
            setError("Failed to submit. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const fallbackSubmit = async () => {
        return new Promise<void>((resolve) => {
            try {
                // Set all form values in the hidden form
                const directEmailInput = document.getElementById("direct-email") as HTMLInputElement
                const directNameInput = document.getElementById("direct-fullName") as HTMLInputElement
                const directCompanyInput = document.getElementById("direct-company") as HTMLInputElement
                const directDepartmentInput = document.getElementById("direct-department") as HTMLInputElement

                if (directEmailInput) directEmailInput.value = email
                if (directNameInput) directNameInput.value = fullName
                if (directCompanyInput) directCompanyInput.value = company
                if (directDepartmentInput) directDepartmentInput.value = department

                // Submit the form
                if (formRef.current) {
                    formRef.current.submit()
                }

                // Consider this successful regardless of actual result
                // since we can't track the result of a no-cors form submission
                setTimeout(resolve, 500)
            } catch (err) {
                console.error("Fallback error:", err)
                // Resolve anyway to prevent blocking the UI
                resolve()
            }
        })
    }

    return (
        <section className="relative z-10 py-24 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="scroll-fade fade-at-bottom text-3xl sm:text-4xl font-light mb-6 text-gray-400">
                    {data.Title.split("andi").map((part: string, i: number, arr: string[]) =>
                        i < arr.length - 1 ? (
                        <span key={i}>
                            {part}
                            <GradientText>ANDI</GradientText>
                        </span>
                        ) : (
                        <span key={i}>{part}</span>
                        )
                    )}
                </h2>
                <p className="scroll-fade fade-at-bottom text-lg text-gray-400 mb-8">
                    {data.Description}
                </p>

                <form onSubmit={handleEmailSubmit} className="scroll-fade fade-at-bottom mx-auto w-full max-w-md px-4">
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
                            style={{
                                animation: "gradient 8s linear infinite",
                                backgroundSize: "300% 100%",
                                backgroundPosition: "left",
                            }}
                        >
                            {data.CtaButton}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Hidden form for direct submission fallback - only used when dialog form is submitted */}
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

            {/* Dialog with additional details form */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
                    <DialogHeader>
                        <DialogTitle>Complete your registration</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Please provide additional information to get free POCs at launch.
                        </DialogDescription>
                    </DialogHeader>
                    {/* This form submits to Google Sheets when submitted */}
                    <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
                        <div className="space-y-1">
                            <Label htmlFor="fullName" className="text-gray-400">
                                Full Name
                            </Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="company" className="text-gray-400">
                                Company
                            </Label>
                            <Input
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="department" className="text-gray-400">
                                Department
                            </Label>
                            <Input
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white"
                                style={{
                                    animation: "gradient 8s linear infinite",
                                    backgroundSize: "300% 100%",
                                    backgroundPosition: "left",
                                }}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    )
}