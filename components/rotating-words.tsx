"use client"

import { useEffect, useRef, useState } from "react"

export default function RotatingWords({ 
    words = [],
    className = "mx-3" 
  }: { 
    words?: string[]
    className?: string 
  }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      // Calculate position based on the duplicated list
      // Reset to the top of the duplicated list when reaching the end
      const totalItems = words.length * 2
      const newIndex = currentIndex % totalItems
      const newPosition = -newIndex * 1.2

      // If we've reached the end of the original list, reset to the beginning of the duplicate
      if (newIndex === words.length) {
        containerRef.current.style.transition = "none"
        containerRef.current.style.transform = `translateY(0em)`

        // Force a reflow to make the transition removal take effect
        containerRef.current.offsetHeight

        // Re-enable transition and start from the beginning
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "transform 0.5s ease"
            setCurrentIndex(0)
          }
        }, 10)

        return
      }

      containerRef.current.style.transition = "transform 0.5s ease"
      containerRef.current.style.transform = `translateY(${newPosition}em)`
    }
  }, [currentIndex, words.length])

  return (
    <span
      className={`word-carousel ${className}`}
      style={{
        minWidth: "130px",
        maxWidth: "none",
        width: "auto",
        marginLeft: "0.3em",
        marginRight: "0.1em",
      }}
    >
      <div ref={containerRef} className="word-carousel-items">
        {words.map((word, index) => (
          <div key={`original-${index}`} className="word-carousel-item" style={{ justifyContent: "flex-start" }}>
            <span
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{
                animation: "gradient 8s linear infinite",
                backgroundSize: "300% 100%",
                backgroundPosition: "left",
                animationDelay: `-${index * 0.8}s`, // Offset animation based on word index
              }}
            >
              {word}
            </span>
          </div>
        ))}
        {/* Duplicate the list for endless loop effect */}
        {words.map((word, index) => (
          <div key={`duplicate-${index}`} className="word-carousel-item" style={{ justifyContent: "flex-start" }}>
            <span
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{
                animation: "gradient 8s linear infinite",
                backgroundSize: "300% 100%",
                backgroundPosition: "left",
                animationDelay: `-${index * 0.8}s`, // Offset animation based on word index
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>
    </span>
  )
}
