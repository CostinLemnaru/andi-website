"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Building,
  Building2,
  Server,
  BuildingIcon,
  ShoppingBag,
  Stethoscope,
  Factory,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Link2,
  Tag,
  CheckCircle,
  Database,
  DollarSign,
  LineChart,
  Layers,
  BarChart3,
  Settings,
  FileText,
  Video,
  BookOpen,
  Download,
  Users,
} from "lucide-react"
import GradientText from "./gradient-text"

type DropdownItem = {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

type DropdownSection = {
  title: string
  items: DropdownItem[]
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openDropdown = (dropdown: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveDropdown(dropdown)
  }

  const closeDropdown = () => {
    if (closeTimeoutRef.current) return

    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      closeTimeoutRef.current = null
    }, 300)
  }

  const cancelCloseDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const segmentsDropdown: DropdownSection = {
    title: "Segments",
    items: [
      {
        title: "Emerging Businesses",
        description: "For fast-moving teams with lean resources who need actionable insights.",
        icon: <Home className="h-6 w-6 text-blue-400" />,
        href: "/solutions/emerging-businesses",
      },
      {
        title: "Growth Companies",
        description: "For scaling organizations with cross-functional complexity seeking alignment.",
        icon: <Building className="h-6 w-6 text-purple-400" />,
        href: "/solutions/growth-companies",
      },
      {
        title: "Enterprise Organizations",
        description: "For global organizations with complex structure requiring holistic insights.",
        icon: <Building2 className="h-6 w-6 text-pink-400" />,
        href: "/solutions/enterprise-organizations",
      },
    ],
  }

  const industriesDropdown: DropdownSection = {
    title: "Industries",
    items: [
      {
        title: "SaaS & Technology",
        description: "Connect product usage, billing, and customer success data.",
        icon: <Server className="h-6 w-6 text-blue-400" />,
        href: "/industries/saas-technology",
      },
      {
        title: "Financial Services",
        description: "Correlate risk data, client information, and transactions.",
        icon: <BuildingIcon className="h-6 w-6 text-purple-400" />,
        href: "/industries/financial-services",
      },
      {
        title: "Retail & E-commerce",
        description: "Connect inventory, marketing, and customer behavior data.",
        icon: <ShoppingBag className="h-6 w-6 text-pink-400" />,
        href: "/industries/retail-ecommerce",
      },
      {
        title: "Healthcare & Life Sciences",
        description: "Unify clinical, operational, and financial data.",
        icon: <Stethoscope className="h-6 w-6 text-blue-400" />,
        href: "/industries/healthcare",
      },
      {
        title: "Manufacturing & Logistics",
        description: "Connect sensor data, supply chain, and production metrics.",
        icon: <Factory className="h-6 w-6 text-purple-400" />,
        href: "/industries/manufacturing-logistics",
      },
      {
        title: "Consulting & Professional Services",
        description: "Link time tracking, project management, and client data.",
        icon: <Briefcase className="h-6 w-6 text-pink-400" />,
        href: "/industries/consulting-services",
      },
      {
        title: "Public Sector & Education",
        description: "Unify funding, program performance, and operational data.",
        icon: <GraduationCap className="h-6 w-6 text-blue-400" />,
        href: "/industries/public-sector-education",
      },
    ],
  }

  const featuresDropdown: DropdownSection = {
    title: "Features",
    items: [
      {
        title: "NLP Query Engine",
        description: "Ask questions in plain language and receive structured insights.",
        icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
        href: "/features/nlp-query-engine",
      },
      {
        title: "LinkDNA™ Correlation Engine",
        description: "Links records without shared IDs using synthetic identifiers.",
        icon: <Link2 className="h-6 w-6 text-purple-400" />,
        href: "/features/linkdna",
      },
      {
        title: "Insight Labeling",
        description: "Automatically tags findings by business impact.",
        icon: <Tag className="h-6 w-6 text-pink-400" />,
        href: "/features/insight-labeling",
      },
      {
        title: "Confidence-Based NLP Output",
        description: "Every insight comes with a confidence score and reasoning trail.",
        icon: <CheckCircle className="h-6 w-6 text-blue-400" />,
        href: "/features/confidence-based-nlp",
      },
      {
        title: "Multi-Dataset Analysis",
        description: "Correlates siloed data sources for a complete picture.",
        icon: <Database className="h-6 w-6 text-purple-400" />,
        href: "/features/multi-dataset-analysis",
      },
    ],
  }

  const useCasesDropdown: DropdownSection = {
    title: "Use Cases",
    items: [
      {
        title: "Finance",
        description: "The Business Brain Behind Every Line Item.",
        icon: <DollarSign className="h-6 w-6 text-blue-400" />,
        href: "/use-cases/finance",
      },
      {
        title: "Leadership",
        description: "Clarity on What Matters. Confidence in What Comes Next.",
        icon: <LineChart className="h-6 w-6 text-purple-400" />,
        href: "/use-cases/leadership",
      },
      {
        title: "Product",
        description: "Turn Usage, Feedback, and Financial Impact into One Insight Loop.",
        icon: <Layers className="h-6 w-6 text-pink-400" />,
        href: "/use-cases/product",
      },
      {
        title: "Marketing",
        description: "Make Every Dollar Count and Every Campaign Smarter.",
        icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
        href: "/use-cases/marketing",
      },
      {
        title: "Operations",
        description: "Operational Precision Without Manual Oversight.",
        icon: <Settings className="h-6 w-6 text-purple-400" />,
        href: "/use-cases/operations",
      },
    ],
  }

  const resourcesDropdown: DropdownSection = {
    title: "Resources",
    items: [
      {
        title: "White Papers",
        description: "In-depth research and analysis on AI intelligence.",
        icon: <FileText className="h-6 w-6 text-blue-400" />,
        href: "/resources/white-papers",
      },
      {
        title: "Case Studies",
        description: "Real-world examples of how businesses use ANDI.",
        icon: <BookOpen className="h-6 w-6 text-purple-400" />,
        href: "/resources/case-studies",
      },
      {
        title: "Webinars",
        description: "Watch our on-demand webinars to learn more about ANDI.",
        icon: <Video className="h-6 w-6 text-pink-400" />,
        href: "/resources/webinars",
      },
      {
        title: "Data Sheets",
        description: "Technical specifications and feature overviews.",
        icon: <Download className="h-6 w-6 text-blue-400" />,
        href: "/resources/data-sheets",
      },
      {
        title: "User Roles & Capabilities",
        description: "Learn about ANDI's role-based access system.",
        icon: <Users className="h-6 w-6 text-purple-400" />,
        href: "/resources/user-roles",
      },
      {
        title: "Blog",
        description: "Stay up-to-date with the latest news and insights.",
        icon: <FileText className="h-6 w-6 text-pink-400" />,
        href: "/resources/blog",
      },
    ],
  }

  const renderDropdown = (section: DropdownSection) => {
    return (
      <div
        className="fixed left-1/2 transform -translate-x-1/2 z-50 dropdown-animation"
        style={{
          display: "block",
          top: "64px",
          width: "100%",
          maxWidth: "6xl",
          padding: "0 1rem",
        }}
        onMouseEnter={cancelCloseDropdown}
        onMouseLeave={closeDropdown}
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0c0c14]/95 backdrop-blur-md p-6 border border-gray-800/50">
            {section.items.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-start p-3 rounded-lg dropdown-item-link">
                <div className="flex-shrink-0 bg-gray-900/40 rounded-full p-2 mr-4">
                  <div className="dropdown-icon">{item.icon}</div>
                </div>
                <div>
                  <p className="text-base font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-400">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c14]/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          <div className="flex items-center absolute left-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-medium">
                <GradientText>andi</GradientText>
              </span>
              <span className="text-gray-400 text-xl mx-2">by</span>
              <img src="/zamora-logo.png" alt="Zamora" className="h-8 w-auto ml-2" />
            </Link>
          </div>
          <div className="hidden md:block" ref={dropdownRef}>
            {/* Navigation links remain the same */}
            <div className="flex items-center justify-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors nav-link">
                Home
              </Link>
              {/* Features Dropdown */}
              <div className="relative dropdown-container">
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none dropdown-button nav-link"
                  onMouseEnter={() => openDropdown("features")}
                  onMouseLeave={closeDropdown}
                >
                  <span>Features</span>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "features" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "features" && renderDropdown(featuresDropdown)}
              </div>

              {/* Segments Dropdown */}
              <div className="relative dropdown-container">
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none dropdown-button nav-link"
                  onMouseEnter={() => openDropdown("segments")}
                  onMouseLeave={closeDropdown}
                >
                  <span>Segments</span>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "segments" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "segments" && renderDropdown(segmentsDropdown)}
              </div>

              {/* Industries Dropdown */}
              <div className="relative dropdown-container">
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none dropdown-button nav-link"
                  onMouseEnter={() => openDropdown("industries")}
                  onMouseLeave={closeDropdown}
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "industries" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "industries" && renderDropdown(industriesDropdown)}
              </div>

              {/* Use Cases Dropdown */}
              <div className="relative dropdown-container">
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none dropdown-button nav-link"
                  onMouseEnter={() => openDropdown("useCases")}
                  onMouseLeave={closeDropdown}
                >
                  <span>Use Cases</span>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "useCases" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "useCases" && renderDropdown(useCasesDropdown)}
              </div>

              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors nav-link">
                Pricing
              </Link>

              {/* Resources Dropdown */}
              <div className="relative dropdown-container">
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none dropdown-button nav-link"
                  onMouseEnter={() => openDropdown("resources")}
                  onMouseLeave={closeDropdown}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "resources" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "resources" && renderDropdown(resourcesDropdown)}
              </div>

              <Link href="/team" className="text-gray-300 hover:text-white transition-colors nav-link">
                Meet the Team
              </Link>
            </div>
          </div>
          <div className="md:hidden absolute right-0">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu remains unchanged */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0c0c14]/95 backdrop-blur-md border-b border-gray-800/50 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Features */}
            <div className="block px-3 py-2">
              <button
                onClick={() => handleDropdownToggle("mobileFeatures")}
                className="flex items-center w-full text-left rounded-md text-base font-medium text-gray-300 hover:text-white focus:outline-none"
              >
                <span>Features</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "mobileFeatures" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobileFeatures" && (
                <div className="mt-2 space-y-2 pl-4">
                  {featuresDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="mr-3">{item.icon}</div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Segments */}
            <div className="block px-3 py-2">
              <button
                onClick={() => handleDropdownToggle("mobileSegments")}
                className="flex items-center w-full text-left rounded-md text-base font-medium text-gray-300 hover:text-white focus:outline-none"
              >
                <span>Segments</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "mobileSegments" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobileSegments" && (
                <div className="mt-2 space-y-2 pl-4">
                  {segmentsDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="mr-3">{item.icon}</div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Industries */}
            <div className="block px-3 py-2">
              <button
                onClick={() => handleDropdownToggle("mobileIndustries")}
                className="flex items-center w-full text-left rounded-md text-base font-medium text-gray-300 hover:text-white focus:outline-none"
              >
                <span>Industries</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "mobileIndustries" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobileIndustries" && (
                <div className="mt-2 space-y-2 pl-4">
                  {industriesDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="mr-3">{item.icon}</div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Use Cases */}
            <div className="block px-3 py-2">
              <button
                onClick={() => handleDropdownToggle("mobileUseCases")}
                className="flex items-center w-full text-left rounded-md text-base font-medium text-gray-300 hover:text-white focus:outline-none"
              >
                <span>Use Cases</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "mobileUseCases" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobileUseCases" && (
                <div className="mt-2 space-y-2 pl-4">
                  {useCasesDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="mr-3">{item.icon}</div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile Resources */}
            <div className="block px-3 py-2">
              <button
                onClick={() => handleDropdownToggle("mobileResources")}
                className="flex items-center w-full text-left rounded-md text-base font-medium text-gray-300 hover:text-white focus:outline-none"
              >
                <span>Resources</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "mobileResources" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobileResources" && (
                <div className="mt-2 space-y-2 pl-4">
                  {resourcesDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="mr-3">{item.icon}</div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/team"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Meet the Team
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
