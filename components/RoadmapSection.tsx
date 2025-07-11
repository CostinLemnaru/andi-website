"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GradientText from "./gradient-text"
import { getLucideIcon } from "@/lib/icons-map"

type Spec = { id: number; Title: string }
type Feature = {
  id: number
  Title: string
  Description: string
  icon: string
  Specs: Spec[]
}
type Version = {
  id: number
  Title: string
  Subtitle: string
  Timeline: string
  State: string
  Color: string
  Features: Feature[]
}
type Props = {
  data: {
    Versions: Version[]
  }
}

export default function RoadmapSection({ data }: Props) {
    const versions = data?.Versions ?? []

    const [selectedVersionId, setSelectedVersionId] = useState(
        versions.length > 0 ? versions[0].id : 0
    )

    const selectedVersion = versions.find((v: Version) => v.id === selectedVersionId)!
    const getFeaturesByVersion = (id: number) => versions.find((v: Version) => v.id === id)?.Features ?? []
    const TAILWIND_COLORS = new Set([
        "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky",
        "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
        "slate", "gray", "zinc", "neutral", "stone"
    ]);

    function getTailwindBgColor(color: string, shade: number = 500): string {
        if (TAILWIND_COLORS.has(color)) {
            return `bg-${color}-${shade}`;
        }
        return `bg-gray-${shade}`;
    }

    return (
        <section className="relative z-10 py-24 px-4 sm:px-6 mb-12 md:mb-0">
            <div className="max-w-5xl mx-auto">
            <div className="scroll-fade fade-from-top transition-all duration-700 ease-in-out">
                <h2 className="text-3xl sm:text-4xl font-light mb-16 text-center">
                <GradientText>Roadmap</GradientText>
                </h2>

                <div className="w-full">
                <div className="relative mb-12">
                    <div className="relative flex justify-between items-start">
                    {versions.map((v: Version) => (
                        <div
                        key={v.id}
                        className="flex-1 flex flex-col items-center cursor-pointer group"
                        onClick={() => setSelectedVersionId(v.id)}
                        >
                        <div className="relative">
                            <div
                            className={`w-5 h-5 rounded-full transition-all duration-300 ${
                                selectedVersionId === v.id
                                ? "bg-purple-400 scale-125"
                                : "bg-gray-600 group-hover:bg-gray-400"
                            }`}
                            />
                            {selectedVersionId === v.id && (
                            <motion.div
                                layoutId="active-timeline-dot"
                                className="absolute -inset-2 rounded-full bg-purple-500/30"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            )}
                        </div>
                        <div className="text-center mt-4">
                            <p
                            className={`font-medium transition-colors duration-300 ${
                                selectedVersionId === v.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                            }`}
                            >
                            {v.Title.split(" - ")[0]}
                            </p>
                            <p
                            className={`text-xs transition-colors duration-300 ${
                                selectedVersionId === v.id ? "text-purple-300" : "text-gray-500 group-hover:text-gray-400"
                            }`}
                            >
                            {v.Timeline}
                            </p>
                        </div>
                        </div>
                    ))}
                    </div>
                    <div className="absolute top-2.5 left-0 w-full h-0.5 bg-gray-700 -z-10" />
                </div>

                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedVersionId}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute w-full"
                    >
                        <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Badge className={`${getTailwindBgColor(selectedVersion.Color)} text-white px-4 py-2`}>
                            {selectedVersion.State}
                            </Badge>
                            <span className="text-gray-400">{selectedVersion.Timeline}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-light text-gray-400 mb-2">{selectedVersion.Title}</h3>
                        <p className="text-gray-300 text-lg">{selectedVersion.Subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFeaturesByVersion(selectedVersionId).map((feature: Feature) => {
                            const Icon = getLucideIcon(feature.icon)
                            return (
                                <Card
                                key={feature.id}
                                className="bg-gray-900/30 backdrop-blur-sm border-gray-800/50 hover:bg-gray-900/50 transition-all duration-300 h-full"
                                >
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                                        {Icon && <Icon className="w-5 h-5 text-purple-400" />}
                                    </div>
                                    <CardTitle className="text-gray-400 text-lg">{feature.Title}</CardTitle>
                                    </div>
                                    <p className="text-gray-300 text-sm">{feature.Description}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                        Technical Requirements
                                    </h4>
                                    <ul className="space-y-1">
                                        {feature.Specs.map((spec) => (
                                        <li key={spec.id} className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="h-3 w-3 text-purple-400 flex-shrink-0" />
                                            {spec.Title}
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                </CardContent>
                                </Card>
                            )
                        })}
                        </div>
                    </motion.div>
                    </AnimatePresence>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}
