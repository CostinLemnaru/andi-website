"use client"

import ScrollReveal from "./scroll-reveal"

interface TableSectionProps {
  data: {
    __component: string
    id: number
    Title: string
    Config: {
      columns: {
        text: string
        color: string
      }[]
      rows: {
        values: {
          text: string
          color: string
        }[]
      }[]
    }
  }
}

export default function TableSection({ data }: TableSectionProps) {
  const { Title, Config } = data

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <ScrollReveal>
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
          <h3 className="text-xl font-medium text-white mb-6 text-center">{Title}</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  {Config.columns.map((col, idx) => (
                    <th key={idx} className={`py-3 px-4 font-medium ${col.color}`}>
                      {col.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Config.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`border-b border-gray-800/50 hover:bg-gray-800/20 ${
                      rIdx === Config.rows.length - 1 ? "last:border-none" : ""
                    }`}
                  >
                    {row.values.map((cell, cIdx) => (
                      <td key={cIdx} className={`py-3 px-4 ${cell.color}`}>
                        {cell.text}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p>
              Priority Score is calculated based on adoption rate, retention impact, revenue impact, and development
              effort.
            </p>
            <p>
              Green indicates positive performance, yellow indicates moderate concerns, and red indicates areas
              needing immediate attention.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
