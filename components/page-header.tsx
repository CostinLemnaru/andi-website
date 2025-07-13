import GradientText from "./gradient-text"

interface PageHeaderProps {
  title: string
  subtitle?: string
}

type Props = {
  data: PageHeaderProps
}

export default function PageHeader({ data }: Props) {
  const {title, subtitle} = data
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
        <GradientText>{title}</GradientText>
      </h1>
      {subtitle && <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  )
}
