"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Slider } from "@/components/ui/slider"

interface InputConfig {
  id: string
  label: string
  min: number
  max: number
  step: number
  default: number
}

interface TangibleBenefit {
  id: string
  label: string
  unit: string
}

interface StrategicBenefit {
  id: string
  title: string
  description: string
}

interface Props {
  data: {
    __component: string
    id: number
    Config: {
      inputs: InputConfig[]
      benefits: {
        tangible: TangibleBenefit[]
        strategic: StrategicBenefit[]
      }
    }
  }
}

export default function PostBusinessImpactCalculator({ data }: Props) {
  const [values, setValues] = useState(
    Object.fromEntries(data.Config.inputs.map((input) => [input.id, input.default]))
  )

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const updateValue = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  // Sample calculations (replace with your logic)
  const analysisTimeSaved = Math.round(values.integrationTime * values.employees * 0.4 * 50)
  const communicationTimeSaved = Math.round(values.dataUsers * values.toolsCount * 0.7 * 50)
  const decisionTimeReduced = Math.round(values.toolsCount * 3 * 50)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
        className="my-12 bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold mb-6 text-center text-purple-400">Business Impact Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {data.Config.inputs.map((input) => (
              <div key={input.id}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {input.label}: {values[input.id]}
                </label>
                <Slider
                  value={[values[input.id]]}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  onValueChange={(val) => updateValue(input.id, val[0])}
                  className="my-4"
                />
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-4 text-blue-400">Estimated Benefits</h4>

            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Tangible Benefits</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">{data.Config.benefits.tangible[0]?.label}</span>
                  <span className="text-lg font-bold text-white">{analysisTimeSaved} {data.Config.benefits.tangible[0]?.unit}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">{data.Config.benefits.tangible[1]?.label}</span>
                  <span className="text-lg font-bold text-white">{communicationTimeSaved} {data.Config.benefits.tangible[1]?.unit}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">{data.Config.benefits.tangible[2]?.label}</span>
                  <span className="text-lg font-bold text-white">{decisionTimeReduced} {data.Config.benefits.tangible[2]?.unit}</span>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-1">Strategic Benefits</div>
                {data.Config.benefits.strategic.map((b) => (
                  <div key={b.id} className="bg-gray-700/30 p-3 rounded-md mb-2">
                    <div className="text-sm font-medium text-blue-300 mb-1">{b.title}</div>
                    <div className="text-xs text-gray-300">{b.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
