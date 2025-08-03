"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import GradientText from "./gradient-text"
import { getLucideIcon } from "@/lib/icons-map"

interface NavItem {
  id: number
  Title: string
  Description?: string
  Href: string
  Icon?: string
}

interface NavSection {
  id: number
  Title: string
  Standalone: boolean
  Href?: string
  Items: NavItem[]
}

interface NavigationData {
  id: number
  Title: string
  Slug: string
  Sections: NavSection[]
}

interface Props {
  data: NavigationData
}

export default function Navigation({ data }: Props) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const openDropdown = (id: number) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setActiveDropdown(id)
  }

  const closeDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 300)
  }

  const cancelCloseDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const renderDropdown = (section: NavSection) => (
    <div
      className="fixed left-1/2 transform -translate-x-1/2 z-50 dropdown-animation"
      style={{ top: "64px", width: "100%", maxWidth: "6xl", padding: "0 1rem" }}
      onMouseEnter={cancelCloseDropdown}
      onMouseLeave={closeDropdown}
    >
      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0c0c14]/95 backdrop-blur-md p-6 border border-gray-800/50">
          {section.Items.map((item) => {
            const Icon = item.Icon ? getLucideIcon(item.Icon) : null
            return (
              <Link key={item.id} href={item.Href} className="flex items-start p-3 rounded-lg dropdown-item-link">
                <div className="flex-shrink-0 bg-gray-900/40 rounded-full p-2 mr-4">
                  {Icon && <Icon className="h-6 w-6 text-blue-400" />}
                </div>
                <div>
                  <p className="text-base font-medium text-white">{item.Title}</p>
                  <p className="mt-1 text-sm text-gray-400">{item.Description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c14]/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          <div className="flex items-center absolute left-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-medium">
                <GradientText>ANDI</GradientText>
              </span>
              <span className="text-gray-400 text-xl mx-2">by</span>
              <img src="/zamora-logo.png" alt="Zamora" className="h-8 w-auto ml-2" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center justify-center space-x-8">
              {data.Sections.map((section) =>
                section.Standalone ? (
                  <Link key={section.id} href={section.Href || "#"} className="text-gray-300 hover:text-white transition-colors nav-link">
                    {section.Title}
                  </Link>
                ) : (
                  <div key={section.id} className="relative dropdown-container">
                    <button
                      className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none dropdown-button nav-link"
                      onMouseEnter={() => openDropdown(section.id)}
                      onMouseLeave={closeDropdown}
                    >
                      <span>{section.Title}</span>
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === section.id ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === section.id && renderDropdown(section)}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
