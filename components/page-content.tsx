"use client"

import { componentsMap } from "@/lib/components-map"
import PageLayout from "@/components/page-layout"
import { useRef, useEffect } from "react"
import PostHeader from "./PostHeader"

type StrapiComponent =
  | {
      __component: string
      id: number
      Title: {
        prefix: string
        highlight: string
        subtitle?: string
      }
      Description: {
        tagline_plain: string
        action_words: string[]
        rotating_words: string[]
        tagline_suffix: string
      }
      CtaText?: string
    }
  | {
      __component: string // fallback for unknown ones
      [key: string]: any
    }

type PageData = {
  id: number
  slug: string
  Components?: StrapiComponent[]
  Content?: StrapiComponent[]
  Seo?: {
    title: string
    description: string
  }
  Title?: string
  Subtitle?: string
  createdAt?: string
}

type Props = {
  data?: PageData
}

export default function PageContent({ data }: Props) {
  const components = data?.Components || data?.Content || []
  const sectionsRef = useRef<HTMLDivElement>(null)

  // Setup scroll-based animations
  useEffect(() => {
    let ticking = false
    let animationFrameId: number

    const updateElements = () => {
      const scrollElements = document.querySelectorAll(".scroll-fade")
      const windowHeight = window.innerHeight
      const windowCenter = windowHeight / 2

      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

      scrollElements.forEach((element) => {
        const rect = element.getBoundingClientRect()

        // Check for special classes
        const isFadeFromTop = element.classList.contains("fade-from-top")
        const isFadeAtBottom = element.classList.contains("fade-at-bottom")
        const isFadeEarly = element.classList.contains("fade-early")

        let opacity = 0

        // Special case for elements that should be visible at the bottom of the page
        if (isFadeAtBottom && isAtBottom) {
          opacity = 1
        } else if (isFadeFromTop) {
          // For roadmap section:
          // 1. Start fading in when top reaches center
          // 2. Fully visible when top is above center
          // 3. Stay visible until bottom reaches center
          // 4. Start fading out when bottom moves above center

          if (rect.top <= windowCenter) {
            if (rect.bottom >= windowCenter) {
              // Element is still in view (between top passing center and bottom passing center)
              opacity = 1
            } else {
              // Bottom has passed center, start fading out
              const distanceFromCenter = (rect.bottom - windowCenter) / windowHeight
              opacity = Math.max(0, 1 + distanceFromCenter * 2)
            }
          } else {
            // Top hasn't reached center yet, calculate fade in
            const distanceFromCenter = (rect.top - windowCenter) / windowHeight
            opacity = Math.max(0, 1 - distanceFromCenter * 2)
          }
        } else if (isFadeEarly) {
          // For ROI calculator - start fading in as soon as top enters viewport
          if (rect.top <= windowHeight) {
            // Element top is visible in viewport, calculate fade based on how much is visible
            if (rect.top <= windowHeight * 0.8) {
              // Fully visible when top reaches 80% of viewport height
              opacity = 1
            } else {
              // Gradual fade in from 100% to 80% of viewport height
              const fadeProgress = (windowHeight - rect.top) / (windowHeight * 0.2)
              opacity = Math.max(0, Math.min(1, fadeProgress))
            }
          } else {
            // Element not yet visible
            opacity = 0
          }
        } else {
          // For all other elements, use modified calculation to fade out later when scrolling up
          const elementCenter = rect.top + rect.height / 2
          const distanceFromCenter = (elementCenter - windowCenter) / windowHeight
          // If element is above center (scrolling up), use a gentler fade rate
          if (distanceFromCenter < 0) {
            // Element is above center (scrolling up) - fade out more slowly
            opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 1.2)) // Reduced from 2 to 1.2 for slower fade
          } else {
            // Element is below center (scrolling down) - use original fade rate
            opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 2))
          }
        }
        // Apply opacity directly without transitions for immediate effect
        ;(element as HTMLElement).style.opacity = opacity.toString()

        // Apply transform based on position (subtle parallax effect)
        const distanceFromCenter = (rect.top + rect.height / 2 - windowCenter) / windowHeight
        const translateY = Math.abs(distanceFromCenter) * 20 // max 20px shift
        ;(element as HTMLElement).style.transform = `translateY(${distanceFromCenter > 0 ? translateY : 0}px)`
      })

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame for smoother animations
        ticking = true
        animationFrameId = window.requestAnimationFrame(updateElements)
      }
    }

    // Initial update
    updateElements()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <PageLayout className="pt-0">
      <div ref={sectionsRef} className="relative">
        {data?.Title && data?.Subtitle && data?.createdAt && (
          <PostHeader
            Title={data.Title}
            Subtitle={data.Subtitle}
            createdAt={data.createdAt}
          />
        )}
        {components.map((component: any) => {
          const Component = componentsMap[component.__component]
          if (!Component) {
            console.warn("Component not found for", component.__component)
            return null
          }
          return <Component key={component.id} data={component} />
        })}
      </div>
    </PageLayout>
  )
}