"use client"

import GradientText from "./gradient-text"

interface PageHeaderProps {
  Title?: string
  Subtitle?: string
}

type Props = {
  data: PageHeaderProps
}

export default function PageHeader({ data }: Props) {
  const {Title, Subtitle} = data
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 mb-12 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
        <GradientText>{Title}</GradientText>
      </h1>
      {Subtitle && <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">{Subtitle}</p>}
    </div>
  )
}
