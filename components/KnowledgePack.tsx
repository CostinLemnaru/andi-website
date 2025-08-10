"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Building2, Award, TrendingUp, Globe, Code, Shield } from "lucide-react"

export interface CompanyInfo {
  name: string
  founded: string
  headquarters: string
  industry: string
  stage: string
  employees: string
  website: string
  mission: string
}

export interface Technology {
  name: string
  description: string
  category: string
}

export interface CompetitiveAdvantage {
  title: string
  description: string
  impact: string
}

export interface MarketPosition {
  targetMarket: string
  marketSize: string
  competitors: string[]
  differentiators: string[]
}

export interface KnowledgePackData {
  lastUpdated: string
  companyTabLabel: string
  technologyTabLabel: string
  marketTabLabel: string
  advantagesTabLabel: string
  companyInfo: CompanyInfo
  keyTechnologies: Technology[]
  competitiveAdvantages: CompetitiveAdvantage[]
  marketPosition: MarketPosition
}
export interface Config {
    Config: KnowledgePackData
}
export interface KnowledgePackPageProps {
    data: {
      Config: KnowledgePackData
    }
}


export default function KnowledgePack({ data }: KnowledgePackPageProps) {
  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid grid-cols-4 bg-gray-800/50 w-fit mx-auto">
            <TabsTrigger value="company" className="data-[state=active]:bg-blue-600">
              <Building2 className="h-4 w-4 mr-2" />
              {data.Config.companyTabLabel}
            </TabsTrigger>
            <TabsTrigger value="technology" className="data-[state=active]:bg-blue-600">
              <Code className="h-4 w-4 mr-2" />
              {data.Config.technologyTabLabel}
            </TabsTrigger>
            <TabsTrigger value="market" className="data-[state=active]:bg-blue-600">
              <Globe className="h-4 w-4 mr-2" />
              {data.Config.marketTabLabel}
            </TabsTrigger>
            <TabsTrigger value="advantages" className="data-[state=active]:bg-blue-600">
              <Award className="h-4 w-4 mr-2" />
              {data.Config.advantagesTabLabel}
            </TabsTrigger>
          </TabsList>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-blue-400" />
                  {data.Config.companyTabLabel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4 text-gray-300">
                    <p><strong>Company Name:</strong> {data.Config.companyInfo.name}</p>
                    <p><strong>Founded:</strong> {data.Config.companyInfo.founded}</p>
                    <p><strong>Headquarters:</strong> {data.Config.companyInfo.headquarters}</p>
                    <p><strong>Industry:</strong> {data.Config.companyInfo.industry}</p>
                    <p><strong>Stage:</strong> {data.Config.companyInfo.stage}</p>
                    <p><strong>Team Size:</strong> {data.Config.companyInfo.employees}</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300">{data.Config.companyInfo.mission}</p>
                    <a
                      href={data.Config.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {data.Config.companyInfo.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technology Tab */}
          <TabsContent value="technology" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <Code className="h-6 w-6 text-purple-400" />
                  {data.Config.technologyTabLabel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {data.Config.keyTechnologies.map((tech, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-white text-lg">{tech.name}</h4>
                        <Badge variant="outline" className="text-xs">{tech.category}</Badge>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <Globe className="h-6 w-6 text-yellow-400" />
                  {data.Config.marketTabLabel}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">{data.Config.marketPosition.targetMarket}</p>
                <p className="text-gray-300">{data.Config.marketPosition.marketSize}</p>
                <div className="flex flex-wrap gap-2">
                  {data.Config.marketPosition.competitors.map((competitor, index) => (
                    <Badge key={index} variant="outline" className="text-gray-300">
                      {competitor}
                    </Badge>
                  ))}
                </div>
                <ul className="space-y-2">
                  {data.Config.marketPosition.differentiators.map((diff, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      {diff}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advantages Tab */}
          <TabsContent value="advantages" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <Award className="h-6 w-6 text-orange-400" />
                  {data.Config.advantagesTabLabel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {data.Config.competitiveAdvantages.map((advantage, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600/20 rounded-lg p-3">
                          <TrendingUp className="h-6 w-6 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-lg mb-2">{advantage.title}</h4>
                          <p className="text-gray-300 mb-3 leading-relaxed">{advantage.description}</p>
                          <div className="bg-orange-900/20 border border-orange-500/30 rounded-md p-3">
                            <p className="text-orange-300 text-sm">
                              {advantage.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
