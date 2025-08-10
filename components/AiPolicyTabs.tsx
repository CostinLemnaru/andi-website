"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertTriangle, FileText, Zap } from "lucide-react"

export interface AllowedItem {
  activity: string
  description: string
  conditions: string[]
}

export interface ProhibitedItem {
  activity: string
  description: string
  consequences: string[]
}

export interface RateLimit {
  limit: string
  description: string
  enforcement: string
}

export interface AttributionExample {
  context: string
  format: string
}

export interface Attribution {
  required: boolean
  format: string
  examples: AttributionExample[]
}

export interface Policy {
  allowed: AllowedItem[]
  prohibited: ProhibitedItem[]
  rateLimits: Record<string, RateLimit>
  attribution: Attribution
}

export interface Contact {
  email: string
  subject: string
  purposes: string[]
}

export interface Enforcement {
  monitoring: string
  violations: string
  appeals: string
}

export interface PolicyData {
  version: string
  effectiveDate: string
  lastModified: string
  policy: Policy
  contact: Contact
  enforcement: Enforcement
}

export interface Config {
    Config: PolicyData
}

interface AIPolicyDataPageProps {
  data: {
    Config: PolicyData
  }
}

export default function AiPolicyTabs({ data }: AIPolicyDataPageProps) {

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Tabs defaultValue="allowed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
          <TabsTrigger value="allowed" className="data-[state=active]:bg-green-600">
            <CheckCircle className="h-4 w-4 mr-2" /> Allowed
          </TabsTrigger>
          <TabsTrigger value="prohibited" className="data-[state=active]:bg-red-600">
            <XCircle className="h-4 w-4 mr-2" /> Prohibited
          </TabsTrigger>
          <TabsTrigger value="rates" className="data-[state=active]:bg-yellow-600">
            <Zap className="h-4 w-4 mr-2" /> Rate Limits
          </TabsTrigger>
          <TabsTrigger value="attribution" className="data-[state=active]:bg-blue-600">
            <FileText className="h-4 w-4 mr-2" /> Attribution
          </TabsTrigger>
          <TabsTrigger value="enforcement" className="data-[state=active]:bg-purple-600">
            <AlertTriangle className="h-4 w-4 mr-2" /> Enforcement
          </TabsTrigger>
        </TabsList>

        {/* Allowed */}
        <TabsContent value="allowed" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" /> Allowed Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.Config.policy.allowed.map((item, index) => (
                  <div key={index} className="bg-green-900/10 border border-green-500/20 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2 capitalize">
                          {item.activity.replace(/_/g, " ")}
                        </h4>
                        <p className="text-gray-300 mb-3">{item.description}</p>
                        <p className="text-sm font-medium text-green-300">Conditions:</p>
                        <ul className="text-sm text-gray-400">
                          {item.conditions.map((cond, condIndex) => (
                            <li key={condIndex} className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span> {cond}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prohibited */}
        <TabsContent value="prohibited" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-400" /> Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.Config.policy.prohibited.map((item, index) => (
                  <div key={index} className="bg-red-900/10 border border-red-500/20 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2 capitalize">
                          {item.activity.replace(/_/g, " ")}
                        </h4>
                        <p className="text-gray-300 mb-3">{item.description}</p>
                        <p className="text-sm font-medium text-red-300">Consequences:</p>
                        <ul className="text-sm text-gray-400">
                          {item.consequences.map((cons, consIndex) => (
                            <li key={consIndex} className="flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span> {cons}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rate Limits */}
        <TabsContent value="rates" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-400" /> Rate Limits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {Object.entries(data.Config.policy.rateLimits).map(([key, limit]) => (
                  <div key={key} className="bg-yellow-900/10 border border-yellow-500/20 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-gray-300 mb-3">{limit.description}</p>
                      </div>
                      <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">{limit.limit}</Badge>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-md p-3">
                      <p className="text-yellow-300 text-sm">
                        <strong>Enforcement:</strong> {limit.enforcement}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attribution */}
        <TabsContent value="attribution" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-400" /> Attribution Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">Required Format</h4>
                <div className="bg-gray-800/50 rounded-md p-4 font-mono text-sm text-gray-300 whitespace-pre-line">
                  {data.Config.policy.attribution.format}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Attribution Examples</h4>
                <div className="space-y-4">
                  {data.Config.policy.attribution.examples.map((example, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                      <h5 className="font-medium text-blue-300 mb-2">{example.context}</h5>
                      <div className="bg-gray-800/50 rounded-md p-3 font-mono text-sm text-gray-300">
                        {example.format}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enforcement */}
        <TabsContent value="enforcement" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-purple-400" /> Enforcement & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Monitoring & Enforcement</h4>
                  <p><strong>Monitoring:</strong> {data.Config.enforcement.monitoring}</p>
                  <p><strong>Violations:</strong> {data.Config.enforcement.violations}</p>
                  <p><strong>Appeals:</strong> {data.Config.enforcement.appeals}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Contact Information</h4>
                  <p>
                    <strong>Email:</strong>
                    <a href={`mailto:${data.Config.contact.email}`} className="text-blue-400 hover:text-blue-300 ml-2">
                      {data.Config.contact.email}
                    </a>
                  </p>
                  <p><strong>Subject:</strong> {data.Config.contact.subject}</p>
                  <ul className="text-sm space-y-1">
                    {data.Config.contact.purposes.map((purpose, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span> {purpose}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
