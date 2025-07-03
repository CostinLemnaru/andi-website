"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Color utility function to convert HSL to hex
    const hslToHex = (h: number, s: number, l: number): string => {
      // Ensure h is within 0-360 range
      h = h % 360
      if (h < 0) h += 360

      l /= 100
      const a = (s * Math.min(l, 1 - l)) / 100
      const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0")
      }
      return `#${f(0)}${f(8)}${f(4)}`
    }

    // Cloud class for mist effect
    class Cloud {
      x: number
      y: number
      radius: number
      baseRadius: number
      baseHue: number
      saturation: number
      lightness: number
      maxAlpha: number
      individualPhase: number
      speed: number
      velocityX: number
      velocityY: number
      colorCycleSpeed: number
      colorCyclePhase: number

      constructor() {
        // Position clouds randomly
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height

        // Large base radius
        const minDimension = Math.min(canvas.width, canvas.height)
        this.baseRadius = minDimension * (0.4 + Math.random() * 0.6)
        this.radius = this.baseRadius

        // Base hue - will be cycled
        this.baseHue = Math.random() * 360

        // Darker tones - reduced saturation and lightness
        this.saturation = 70 + Math.random() * 20 // 70-90%
        this.lightness = 20 + Math.random() * 15 // 20-35% (darker)

        // Alpha
        this.maxAlpha = 0.15 + Math.random() * 0.1 // 0.15-0.25

        // Individual phase for size pulsing
        this.individualPhase = Math.random() * Math.PI * 2
        this.speed = 0.0005 + Math.random() * 0.0008

        // Velocity for movement across screen
        const speed = 0.2 + Math.random() * 0.3
        const angle = Math.random() * Math.PI * 2
        this.velocityX = Math.cos(angle) * speed
        this.velocityY = Math.sin(angle) * speed

        // Color cycling
        this.colorCycleSpeed = 0.00005 + Math.random() * 0.00005
        this.colorCyclePhase = Math.random() * Math.PI * 2
      }

      // Get current hue based on time and cycling - REMOVED TEAL/GREEN
      getCurrentHue(time: number): number {
        const cyclePosition = (time * this.colorCycleSpeed + this.colorCyclePhase) % (Math.PI * 2)
        const cyclePercent = (Math.sin(cyclePosition) + 1) / 2 // 0 to 1

        // Revised color zones (focusing on darker tones):
        // Deep blues: 220-240
        // Purples: 250-280
        // Deep purples: 270-290
        // Magentas: 290-310
        // Dark reds: 340-360
        // Dark oranges: 15-30

        let targetHue: number

        if (cyclePercent < 0.2) {
          // Deep blues to purples
          targetHue = 220 + cyclePercent * 5 * 30 // 220-250
        } else if (cyclePercent < 0.4) {
          // Purples to deep purples
          const t = (cyclePercent - 0.2) / 0.2
          targetHue = 250 + t * 20 // 250-270
        } else if (cyclePercent < 0.6) {
          // Deep purples to magentas
          const t = (cyclePercent - 0.4) / 0.2
          targetHue = 270 + t * 20 // 270-290
        } else if (cyclePercent < 0.8) {
          // Magentas to dark reds
          const t = (cyclePercent - 0.6) / 0.2
          targetHue = 290 + t * 50 // 290-340
        } else {
          // Dark reds to dark oranges and back
          const t = (cyclePercent - 0.8) / 0.2
          if (t < 0.5) {
            targetHue = 340 + t * 2 * 20 // 340-360
          } else {
            targetHue = (t - 0.5) * 2 * 30 // 0-30
          }
        }

        return targetHue
      }

      getColor(time: number, alpha = 1): string {
        const hue = this.getCurrentHue(time)

        // Adjust saturation and lightness based on hue for more variety
        // while keeping everything dark
        let adjustedSaturation = this.saturation
        let adjustedLightness = this.lightness

        // Make reds and oranges slightly darker
        if (hue > 330 || hue < 40) {
          adjustedLightness = Math.max(15, this.lightness - 5)
        }

        // Make purples slightly more saturated
        if (hue >= 250 && hue <= 290) {
          adjustedSaturation = Math.min(95, this.saturation + 5)
        }

        const hexColor = hslToHex(hue, adjustedSaturation, adjustedLightness)
        const alphaHex = Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")
        return `${hexColor}${alphaHex}`
      }

      update(time: number, globalFadeValue: number) {
        // Breathing effect - radius pulsates with individual phase
        this.radius = this.baseRadius + Math.sin(time * this.speed + this.individualPhase) * (this.baseRadius * 0.15)

        // Use the global fade value for synchronized fading
        const alpha = globalFadeValue * this.maxAlpha

        // Move across screen
        this.x += this.velocityX
        this.y += this.velocityY

        // Wrap around edges with overlap to avoid gaps
        const buffer = this.radius * 0.5
        if (this.x < -buffer) this.x = canvas.width + buffer
        if (this.x > canvas.width + buffer) this.x = -buffer
        if (this.y < -buffer) this.y = canvas.height + buffer
        if (this.y > canvas.height + buffer) this.y = -buffer

        return alpha
      }

      draw(ctx: CanvasRenderingContext2D, time: number, alpha: number) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)

        // More gradual gradient for smoother blending
        gradient.addColorStop(0, this.getColor(time, alpha))
        gradient.addColorStop(0.6, this.getColor(time, alpha * 0.7))
        gradient.addColorStop(1, this.getColor(time, 0))

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create clouds
    const clouds: Cloud[] = []
    // Ensure we have enough clouds to cover the screen
    const cloudCount = Math.min(12, Math.max(8, Math.floor((canvas.width * canvas.height) / 200000)))

    for (let i = 0; i < cloudCount; i++) {
      clouds.push(new Cloud())
    }

    // Animation loop
    let animationFrameId: number
    const startTime = Date.now()

    // Global fade speed
    const globalFadeSpeed = 0.0006

    // Minimum fade value to ensure there's always some color visible
    const minFadeValue = 0.2

    const animate = () => {
      if (!ctx) return

      const currentTime = Date.now()
      const elapsedTime = currentTime - startTime

      // Calculate global fade value with a minimum to prevent complete darkness
      const globalFadeValue = minFadeValue + (1 - minFadeValue) * (Math.sin(elapsedTime * globalFadeSpeed) + 1) * 0.5

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient - darker
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#080810") // Darker blue-black
      gradient.addColorStop(1, "#0a0a14") // Slightly lighter but still very dark
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set blending mode for glow effect
      ctx.globalCompositeOperation = "screen"

      // Update and draw clouds
      clouds.forEach((cloud) => {
        const alpha = cloud.update(elapsedTime, globalFadeValue)
        cloud.draw(ctx, elapsedTime, alpha)
      })

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over"

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-[#080810]" />
}
