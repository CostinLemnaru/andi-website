"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import GradientText from "./gradient-text"
import { getLucideIcon } from "@/lib/icons-map"
import { Button } from "@/components/ui/button"

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
  const [openMobileSections, setOpenMobileSections] = useState<Record<number, boolean>>({})
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

  const toggleMobileSection = (id: number) => {
    setOpenMobileSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setOpenMobileSections({})
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
    <nav className="fixed left-0 right-0 top-12 z-50 border-b border-gray-800/50 bg-[#0c0c14]/80 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-medium">
            <GradientText>ANDI</GradientText>
          </span>
          <span className="mx-2 text-xl text-gray-400">by</span>
          <img src="/zamora-logo.png" alt="Zamora" className="ml-2 h-8 w-auto" />
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center space-x-8">
            {data.Sections.map((section) =>
              section.Standalone ? (
                <Link key={section.id} href={section.Href || "#"} className="nav-link text-gray-300 transition-colors hover:text-white">
                  {section.Title}
                </Link>
              ) : (
                <div key={section.id} className="dropdown-container relative">
                  <button
                    className="dropdown-button nav-link flex items-center text-gray-300 transition-colors hover:text-white focus:outline-none"
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

        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-lg border border-purple-500/50 bg-transparent px-5 py-2 font-medium text-purple-400 transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
          >
            <Link href="/contact?source=sales">Contact Sales</Link>
          </Button>
          <Button
            asChild
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <Link href="/andi-login">ANDI Login</Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden sm:inline-flex rounded-lg border border-purple-500/50 px-3 py-1 text-xs font-medium text-purple-300 transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-200"
          >
            <Link href="/contact?source=sales">Contact Sales</Link>
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-200 hover:border-gray-500 hover:bg-gray-800"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="border-t border-gray-800/50 bg-[#0c0c14]/95 px-4 py-6 text-gray-200">
          <div className="flex flex-col space-y-4">
            {data.Sections.map((section) =>
              section.Standalone ? (
                <Link key={section.id} href={section.Href || "#"} className="text-base font-medium hover:text-white" onClick={closeMobileMenu}>
                  {section.Title}
                </Link>
              ) : (
                <div key={section.id} className="border border-gray-800/60 rounded-lg">
                  <button
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium hover:text-white"
                    onClick={() => toggleMobileSection(section.id)}
                  >
                    <span>{section.Title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openMobileSections[section.id] ? "rotate-180" : ""}`} />
                  </button>
                  {openMobileSections[section.id] && (
                    <div className="space-y-3 border-t border-gray-800/60 bg-[#0f0f1a] px-4 py-3">
                      {section.Items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.Href}
                          className="block text-sm text-gray-300 hover:text-white"
                          onClick={closeMobileMenu}
                        >
                          <div className="font-medium">{item.Title}</div>
                          {item.Description && <div className="text-xs text-gray-500">{item.Description}</div>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-lg border border-purple-500/50 bg-transparent px-4 py-2 text-sm font-medium text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-200"
            >
              <Link href="/contact?source=sales" onClick={closeMobileMenu}>
                Contact Sales
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Link href="/andi-login" onClick={closeMobileMenu}>
                ANDI Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
