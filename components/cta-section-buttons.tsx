"use client"

import ScrollReveal from "./scroll-reveal"

interface CtaSectionProps {
  data: {
    __component: string
    id: number
    Title: string
    subtitle: string
    PrimaryButton: {
      id: number
      Text: string
      Url: string
    }
    SecondaryButton?: {
      id: number
      Text: string
      Url: string
    }
  }
}

export default function CtaSectionButtons({ data }: CtaSectionProps) {
  const { Title, subtitle, PrimaryButton, SecondaryButton } = data

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{Title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">{subtitle}</p>

            <div className="flex justify-center gap-4 flex-wrap">
              {PrimaryButton && (
                <a
                  href={PrimaryButton.Url}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white font-medium hover:from-blue-700 hover:to-cyan-600 transition-all"
                >
                  {PrimaryButton.Text}
                </a>
              )}

              {SecondaryButton && (
                <a
                  href={SecondaryButton.Url}
                  className="px-6 py-3 bg-gray-800 rounded-lg text-white font-medium hover:bg-gray-700 transition-all"
                >
                  {SecondaryButton.Text}
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
