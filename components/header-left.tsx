"use client"

interface Props {
  data: {
    Title: string
    Subtitle?: string
  }
}

export default function HeaderLeft({ data }: Props) {
  const { Title, Subtitle } = data

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          {Title}
        </h1>
        {Subtitle && (
          <p className="text-xl text-gray-300 max-w-3xl">
            {Subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
