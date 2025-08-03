"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import AnimatedBackground from "./animated-background"
import Navigation from "./navigation"
import Footer from "./footer"

interface PageLayoutProps {
  children: ReactNode
  className?: string,
  nav?: any
}

export default function PageLayout({ children, className = "", nav }: PageLayoutProps) {
  const pathname = usePathname()
  const main = nav?.main
  const footer = nav?.footer


  // Add effect to scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative w-full overflow-hidden bg-[#0c0c14] font-montserrat">
      <div className="fixed inset-0 backdrop-blur-[80px]">
        <AnimatedBackground />
      </div>
      {main && <Navigation data={main} />}
      <main className={`relative z-10 pt-16 ${className}`}>{children}</main>
      {footer && <Footer data={footer} />}
    </div>
  )
}
