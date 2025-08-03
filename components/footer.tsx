import Link from "next/link"
import GradientText from "./gradient-text"

interface NavItem {
  id: number
  Title: string
  Href: string
}

interface NavSection {
  id: number
  Title: string
  Items: NavItem[]
}

interface NavigationData {
  id: number
  Title: string
  Slug: string
  Sections: NavSection[]
}

type Props = {
  data?: NavigationData | null
}

export default function Footer({ data }: Props) {
  return (
    <footer className="relative z-10 border-t border-gray-800/50 bg-[#0c0c14]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-medium">
                <GradientText>andi</GradientText>
                <span className="text-gray-400 text-xl"> by Zamora</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">Built to Think. Ready to Act.</p>
          </div>

          {data?.Sections.map((section) => (
            <div key={section.id}>
              <h3 className="text-white text-sm font-medium mb-3">{section.Title}</h3>
              <ul className="space-y-1.5">
                {section.Items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.Href || "#"}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      {item.Title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800/50 text-center text-xs text-gray-400">
          <p>© 2025 Zamora AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
