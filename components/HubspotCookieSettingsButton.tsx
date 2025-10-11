"use client"

import { useCallback, useEffect } from "react"

declare global {
  interface Window {
    _hsq?: unknown[]
    _hsp?: unknown[]
  }
}

type Props = {
  className?: string
}

export default function HubspotCookieSettingsButton({ className }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return

    window._hsq = window._hsq || []
    window._hsp = window._hsp || []

    ;((d, s, id) => {
      const existing = d.getElementById(id)
      if (existing) return
      const js = d.createElement(s)
      js.id = id
      js.setAttribute("type", "text/javascript")
      js.setAttribute("async", "true")
      js.setAttribute("defer", "true")
      js.setAttribute("src", "https://js-eu1.hs-scripts.com/146673485.js")
      const fjs = d.getElementsByTagName(s)[0]
      if (fjs?.parentNode) {
        fjs.parentNode.insertBefore(js, fjs)
      } else {
        ;(d.head || d.body || d.documentElement).appendChild(js)
      }
    })(document, "script", "hs-script-loader")
  }, [])

  const cssClasses = className + " inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 py-2 h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6";

  const handleClick = useCallback(() => {
    if (typeof window === "undefined") return
    const queue = (window._hsp = window._hsp || [])
    queue.push(["showBanner"])
  }, [])

  return (
    <button
      type="button"
      id="hs_show_banner_button"
      className={cssClasses}
      onClick={handleClick}
    >
      Cookie Settings
    </button>
  )
}
