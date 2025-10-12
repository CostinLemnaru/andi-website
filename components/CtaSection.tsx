"use client"

import { useState, useRef, useEffect } from "react"
import { submitToGoogleSheets } from "@/lib/google-sheets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GradientText from "./gradient-text"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { REQUEST_ACCESS_EVENT, type RequestAccessEventDetail } from "@/lib/request-access-events"

type Props = {
    data: any
}

export default function CtaSection({ data }: Props) {
    const [email, setEmail] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [useCase, setUseCase] = useState("")
    const [company, setCompany] = useState("")
    const [department, setDepartment] = useState("")
    const [keepUpdated, setKeepUpdated] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [emailErrors, setEmailErrors] = useState<Record<string, string>>({})

    const formRef = useRef<HTMLFormElement>(null)
    const exploreRef = useRef<HTMLDivElement>(null)
    const sectionsRef = useRef<HTMLDivElement>(null)

    //  UI scroll effects (păstrat exact cum aveai)
    useEffect(() => {
        let ticking = false
        let animationFrameId: number

        const updateElements = () => {
            const scrollElements = document.querySelectorAll(".scroll-fade")
            const windowHeight = window.innerHeight
            const windowCenter = windowHeight / 2
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

            scrollElements.forEach((element) => {
                const rect = element.getBoundingClientRect()
                const isFadeFromTop = element.classList.contains("fade-from-top")
                const isFadeAtBottom = element.classList.contains("fade-at-bottom")
                const isFadeEarly = element.classList.contains("fade-early")
                let opacity = 0

                if (isFadeAtBottom && isAtBottom) {
                    opacity = 1
                } else if (isFadeFromTop) {
                    if (rect.top <= windowCenter) {
                        if (rect.bottom >= windowCenter) {
                            opacity = 1
                        } else {
                            const distanceFromCenter = (rect.bottom - windowCenter) / windowHeight
                            opacity = Math.max(0, 1 + distanceFromCenter * 2)
                        }
                    } else {
                        const distanceFromCenter = (rect.top - windowCenter) / windowHeight
                        opacity = Math.max(0, 1 - distanceFromCenter * 2)
                    }
                } else if (isFadeEarly) {
                    if (rect.top <= windowHeight) {
                        if (rect.top <= windowHeight * 0.8) {
                            opacity = 1
                        } else {
                            const fadeProgress = (windowHeight - rect.top) / (windowHeight * 0.2)
                            opacity = Math.max(0, Math.min(1, fadeProgress))
                        }
                    } else {
                        opacity = 0
                    }
                } else {
                    const elementCenter = rect.top + rect.height / 2
                    const distanceFromCenter = (elementCenter - windowCenter) / windowHeight
                    if (distanceFromCenter < 0) {
                        opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 1.2))
                    } else {
                        opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 2))
                    }
                }

                ; (element as HTMLElement).style.opacity = opacity.toString()
                const distanceFromCenter = (rect.top + rect.height / 2 - windowCenter) / windowHeight
                const translateY = Math.abs(distanceFromCenter) * 20
                    ; (element as HTMLElement).style.transform = `translateY(${distanceFromCenter > 0 ? translateY : 0}px)`
            })

            ticking = false
        }

        const handleScroll = () => {
            if (!ticking) {
                ticking = true
                animationFrameId = window.requestAnimationFrame(updateElements)
            }
        }

        updateElements()
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
        }
    }, [])
    // ———————————————————————————————————

    useEffect(() => {
        if (typeof window === "undefined") return
        const handleRequestAccess = (event: Event) => {
            const customEvent = event as CustomEvent<RequestAccessEventDetail>
            if (customEvent.detail?.handled) return
            if (customEvent.detail) customEvent.detail.handled = true
            setIsDialogOpen(true)
            setIsSuccessDialogOpen(false)
            setError("")
            setEmailErrors({})
        }
        window.addEventListener(REQUEST_ACCESS_EVENT, handleRequestAccess as EventListener)
        return () => window.removeEventListener(REQUEST_ACCESS_EVENT, handleRequestAccess as EventListener)
    }, [])

    // Helpers — validare email business
    const personalDomains = [
        "gmail.com", "gmail.co.uk", "gmail.ca", "gmail.com.au", "gmail.de", "gmail.fr", "gmail.it", "gmail.es",
        "yahoo.com", "yahoo.co.uk", "yahoo.ca", "yahoo.com.au", "yahoo.de", "yahoo.fr", "yahoo.it", "yahoo.es",
        "aol.com", "aol.co.uk", "aol.ca", "aol.com.au", "aol.de", "aol.fr",
        "hotmail.com", "hotmail.co.uk", "hotmail.ca", "hotmail.com.au", "hotmail.de", "hotmail.fr",
        "outlook.com", "outlook.co.uk", "outlook.ca", "outlook.com.au", "outlook.de", "outlook.fr",
        "live.com", "live.co.uk", "live.ca", "live.com.au", "live.de", "live.fr"
    ]
    const validateBusinessEmail = (v: string) => {
        const okFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        if (!okFormat) return { ok: false, msg: "Please enter a valid email" }
        const domain = v.split("@")[1]?.toLowerCase()
        if (domain && personalDomains.includes(domain)) {
            return { ok: false, msg: "Please use a valid business email address" }
        }
        return { ok: true, msg: "" }
    }
    const setFieldEmailError = (key: string, msg: string) => setEmailErrors((p) => ({ ...p, [key]: msg }))
    const clearEmailError = (key: string) => emailErrors[key] && setEmailErrors((p) => ({ ...p, [key]: "" }))

    // Helpers — cookie hutk pentru HubSpot
    const getCookie = (name: string) => {
        if (typeof document === "undefined") return ""
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
        return match ? decodeURIComponent(match[2]) : ""
    }

    // Submit către HubSpot (principal)
    const submitToHubSpot = async () => {
        const hutk = getCookie("hubspotutk")

        const fields = [
            { name: "email", value: email },
            { name: "firstname", value: firstName },
            { name: "lastname", value: lastName },
            { name: "company", value: company },
            { name: "use_case", value: useCase },
            { name: "role_department", value: department },
            { name: "LEGAL_CONSENT.subscription_type_1062787159", value: keepUpdated ? "true" : "false" },
        ]

        if (keepUpdated) {
            fields.push({ name: "LEGAL_CONSENT.processing", value: "true" })
        }

        const payload = {
            fields,
            context: {
                pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai",
                pageName: typeof document !== "undefined" ? document.title : "Landing",
                hutk: hutk || undefined,
            },
        }

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

    // Scroll to explore section
    const scrollToExplore = () => {
        exploreRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Formularul inițial (email) — doar deschide dialog dacă emailul e valid business
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const v = validateBusinessEmail(email)
        if (!v.ok) {
            setFieldEmailError("top", v.msg)
            return
        }
        setIsDialogOpen(true)
    }

    // Formularul din dialog — trimite la HubSpot (+ fallback-urile tale)
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        const v = validateBusinessEmail(email)
        if (!v.ok) {
            setFieldEmailError("dialog", v.msg)
            setIsSubmitting(false)
            return
        }

        try {
            // 1) HubSpot (principal)
            await submitToHubSpot()

            // 2) Fallback: form ascuns (Sheets via Apps Script)
            // await fallbackSubmit()


            setIsDialogOpen(false)
            setIsSuccessDialogOpen(true)

            // reset
            setEmail("")
            setFirstName("")
            setLastName("")
            setUseCase("")
            setCompany("")
            setDepartment("")
            setKeepUpdated(true)
        } catch (err) {
            console.error("Form submission error:", err)
            setError("Failed to submit. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
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

                {/* FORMULAR INIȚIAL */}
                <form
                    onSubmit={handleEmailSubmit}
                    className="scroll-fade fade-at-bottom mx-auto w-full max-w-md px-4"
                    data-hs-ignore="true"
                >
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Input
                            type="email"
                            placeholder="your.email@company.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                clearEmailError("top")
                            }}
                            onBlur={(e) => {
                                const v = validateBusinessEmail(e.target.value)
                                if (!v.ok) setFieldEmailError("top", v.msg)
                            }}
                            required
                            className="h-12 flex-1 bg-gray-900/50 border border-gray-800 text-white placeholder:text-gray-400 backdrop-blur-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <Button
                            type="submit"
                            className="h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6"
                            style={{ animation: "gradient 8s linear infinite", backgroundSize: "300% 100%", backgroundPosition: "left" }}
                        >
                            {data.CtaButton}
                        </Button>
                    </div>
                    {emailErrors.top && <p className="text-red-400 text-sm mt-1 text-left">{emailErrors.top}</p>}
                </form>
            </div>

            {/* DIALOG COMPLETARE */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
                    <DialogHeader>
                        <DialogTitle>Complete your registration</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Please provide additional information to get free POCs at launch.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} className="space-y-4 pt-4" data-hs-ignore="true">
                        <div className="space-y-1">
                            <Label htmlFor="dialog-email" className="text-gray-400">Business Email</Label>
                            <Input
                                id="dialog-email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    clearEmailError("dialog")
                                }}
                                onBlur={(e) => {
                                    const v = validateBusinessEmail(e.target.value)
                                    if (!v.ok) setFieldEmailError("dialog", v.msg)
                                }}
                                required
                                placeholder="your.email@company.com"
                                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                            />
                            {emailErrors.dialog && <p className="text-red-400 text-sm">{emailErrors.dialog}</p>}
                        </div>


                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Role/Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                        <div className="space-y-1">
                            <Label htmlFor="useCase" className="text-gray-400">
                                Use Case
                            </Label>
                            <textarea
                                id="useCase"
                                value={useCase}
                                onChange={(e) => setUseCase(e.target.value)}
                                placeholder="What's the #1 challenge you'd like us to help with?"
                                rows={3}
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md resize-none"
                            />
                        </div>

                        <label className="flex items-center gap-2 text-gray-400 text-sm">
                            <input
                                type="checkbox"
                                checked={keepUpdated}
                                onChange={(e) => setKeepUpdated(e.target.checked)}
                                className="w-4 h-4 text-purple-600 bg-gray-900/50 border-gray-800 rounded focus:ring-purple-500 focus:ring-2"
                            />
                            Keep me updated with launch news and resources
                        </label>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white"
                                style={{ animation: "gradient 8s linear infinite", backgroundSize: "300% 100%", backgroundPosition: "left" }}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* DIALOG DE SUCCES */}
            <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
                <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white text-center">
                    <div className="py-6 flex flex-col items-center">
                        <div className="mb-4 text-2xl sm:text-3xl md:text-4xl">
                            <DialogTitle>
                                <GradientText>Welcome to the future!</GradientText>
                            </DialogTitle>
                        </div>
                        <p className="text-lg text-gray-400 mb-6">
                            The next era of AI is coming... and you'll be among the first to experience it!
                        </p>
                        <Button
                            onClick={() => setIsSuccessDialogOpen(false)}
                            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8"
                            style={{
                                animation: "gradient 8s linear infinite",
                                backgroundSize: "300% 100%",
                                backgroundPosition: "left",
                            }}
                        >
                            OK
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
