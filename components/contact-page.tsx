"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, HelpCircle, FileText, CheckCircle } from "lucide-react"
import PageLayout from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan",
    "Singapore", "Netherlands", "Sweden", "Switzerland", "Other",
]

const contactReasons = ["Sales Inquiry", "Book a Demo", "Support", "Partnership", "Press", "Other"]

// Map UI labels -> HubSpot internal values
const hubspotReasonMap: Record<string, "Sales_inquiry" | "Book_a_demo" | "Support" | "Partnership" | "Press" | "Other"> = {
    "Sales Inquiry": "Sales_inquiry",
    "Book a Demo": "Book_a_demo",
    "Support": "Support",
    "Partnership": "Partnership",
    "Press": "Press",
    "Other": "Other",
}

// helpers
const getCookie = (name: string) => {
    if (typeof document === "undefined") return ""
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
    return match ? decodeURIComponent(match[2]) : ""
}

type Props = any

export default function ContactPage({ data }: Props) {
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        role: "",
        country: "",
        phone: "",
        reason: "",
        message: "",
        keepUpdated: true,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        const source = searchParams?.get("source")
        if (source === "demo") setFormData((prev) => ({ ...prev, reason: "Book a Demo" }))
        else if (source === "sales") setFormData((prev) => ({ ...prev, reason: "Sales Inquiry" }))
    }, [searchParams?.get("source")])

    const validateBusinessEmail = (email: string) => {
        const personalDomains = [
            "gmail.com", "gmail.co.uk", "gmail.ca", "gmail.com.au", "gmail.de", "gmail.fr", "gmail.it", "gmail.es",
            "yahoo.com", "yahoo.co.uk", "yahoo.ca", "yahoo.com.au", "yahoo.de", "yahoo.fr", "yahoo.it", "yahoo.es",
            "aol.com", "aol.co.uk", "aol.ca", "aol.com.au", "aol.de", "aol.fr",
            "hotmail.com", "hotmail.co.uk", "hotmail.ca", "hotmail.com.au", "hotmail.de", "hotmail.fr",
            "outlook.com", "outlook.co.uk", "outlook.ca", "outlook.com.au", "outlook.de", "outlook.fr",
            "live.com", "live.co.uk", "live.ca", "live.com.au", "live.de", "live.fr",
        ]
        const domain = email.split("@")[1]?.toLowerCase()
        return !personalDomains.includes(domain)
    }

    const handleEmailBlur = () => {
        if (formData.email.trim()) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }))
            } else if (!validateBusinessEmail(formData.email)) {
                setErrors((prev) => ({ ...prev, email: "Please use a valid business email address" }))
            } else {
                setErrors((prev) => ({ ...prev, email: "" }))
            }
        }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.email.trim()) newErrors.email = "Business email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
        else if (!validateBusinessEmail(formData.email)) newErrors.email = "Please use a valid business email address"
        if (!formData.company.trim()) newErrors.company = "Company is required"
        if (!formData.reason) newErrors.reason = "Please select a reason for contact"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // === HubSpot submit ===
    const submitToHubSpot = async () => {
        const hutk = getCookie("hubspotutk")

        const payload = {
            formGuid: "f1cdff9a-10ae-45a5-9061-77b0761dc55d",
            fields: [
                { name: "firstname", value: formData.firstName },
                { name: "lastname", value: formData.lastName },
                { name: "email", value: formData.email },
                { name: "company", value: formData.company },
                { name: "role_department", value: formData.role || "" },
                { name: "country", value: formData.country || "" },
                { name: "phone", value: formData.phone || "" },
                { name: "message", value: formData.message || "" },
                { name: "use_case", value: formData.message || "" }, // sau schimbă cu un câmp dedicat
                { name: "reason_for_contact", value: hubspotReasonMap[formData.reason] || "Other" },
                // Dacă ai și consimțământ în formularul HS, decomentează:
                { name: "LEGAL_CONSENT.subscription_type_1062787159", value: formData.keepUpdated ? "true" : "false" },
                { name: "LEGAL_CONSENT.processing", value: "true" },
            ],
            context: {
                pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai/contact",
                pageName: typeof document !== "undefined" ? document.title : "Contact",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsSubmitting(true)
        try {
            await submitToHubSpot()
            setIsSubmitted(true)
        } catch (error) {
            console.error("Error submitting to HubSpot:", error)
            alert("There was an error submitting your message. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <PageLayout>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                            <CheckCircle className="h-8 w-8 text-green-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-4">Thank you! 🎉</h1>
                        <p className="text-gray-400 mb-8">We've received your message and will get back to you shortly.</p>
                        <Button onClick={() => setIsSubmitted(false)} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                            Send Another Message
                        </Button>
                    </motion.div>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <div className="min-h-screen py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column - Form */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Whether you're curious about features, need support, or want to explore partnerships, we'd love to hear from you.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" data-hs-ignore="true">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name*</label>
                                        <Input
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500"
                                            placeholder="John"
                                        />
                                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name*</label>
                                        <Input
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500"
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Email*</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        onBlur={handleEmailBlur}
                                        className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500"
                                        placeholder="john.doe@company.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Company*</label>
                                    <Input
                                        value={formData.company}
                                        onChange={(e) => handleInputChange("company", e.target.value)}
                                        className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500"
                                        placeholder="Your Company"
                                    />
                                    {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Role / Department</label>
                                        <Input
                                            value={formData.role}
                                            onChange={(e) => handleInputChange("role", e.target.value)}
                                            className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500"
                                            placeholder="CTO, Marketing Director, etc."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Country / Region</label>
                                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                                            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500">
                                                <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-900 border-gray-700">
                                                {countries.map((country) => (
                                                    <SelectItem key={country} value={country} className="text-white hover:bg-gray-800">
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone (optional)</label>
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Contact*</label>
                                    <Select
                                        key={formData.reason}
                                        value={formData.reason}
                                        onValueChange={(value) => handleInputChange("reason", value)}
                                    >
                                        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500">
                                            <SelectValue placeholder="Select reason" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-gray-700">
                                            {contactReasons.map((reason) => (
                                                <SelectItem key={reason} value={reason} className="text-white hover:bg-gray-800">
                                                    {reason}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.reason && <p className="text-red-400 text-sm mt-1">{errors.reason}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Message / Details</label>
                                    <Textarea
                                        value={formData.message}
                                        onChange={(e) => handleInputChange("message", e.target.value)}
                                        className="bg-gray-900/50 border-gray-700 text-white focus:border-purple-500 min-h-[120px]"
                                        placeholder="Tell us more about your needs…"
                                    />
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="keepUpdated"
                                        checked={formData.keepUpdated}
                                        onCheckedChange={(checked) => handleInputChange("keepUpdated", checked as boolean)}
                                        className="border-gray-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-1"
                                    />
                                    <label htmlFor="keepUpdated" className="text-sm text-gray-300 leading-relaxed">
                                        Yes, keep me updated with product news and early access opportunities.
                                    </label>
                                </div>

                                <div className="text-xs text-gray-500 leading-relaxed">
                                    By submitting, you agree to our Privacy Policy and consent to us contacting you about your request.
                                    Your information will never be shared.
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </motion.div>

                        {/* Right Column - Company Info */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:pl-8">
                            <div className="sticky top-24">
                                <h2 className="text-2xl font-bold text-white mb-8">Other ways to connect</h2>

                                <div className="space-y-6">
                                    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-lg">
                                                <Mail className="h-5 w-5 text-purple-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">Email Us</h3>
                                        </div>
                                        <a href="mailto:hello@zamora.ai" className="text-purple-400 hover:text-purple-300 transition-colors">
                                            hello@zamora.ai
                                        </a>
                                    </div>

                                    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg">
                                                <HelpCircle className="h-5 w-5 text-blue-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">Support Center</h3>
                                        </div>
                                        <Link href="/support" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            Visit Support Center
                                        </Link>
                                    </div>

                                    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-orange-500/20 rounded-lg">
                                                <FileText className="h-5 w-5 text-orange-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">FAQ</h3>
                                        </div>
                                        <Link href="/faqs" className="text-orange-400 hover:text-orange-300 transition-colors">
                                            Browse FAQ
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl">
                                    <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
                                    <p className="text-gray-400 text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
