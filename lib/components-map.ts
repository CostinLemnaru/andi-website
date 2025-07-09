import HeroSection from "@/components/HeroSection"
import SecuritySection from "@/components/SecuritySection"

export const componentsMap: Record<string, React.FC<any>> = {
  "hero.hero-section": HeroSection,
  "home.security-section": SecuritySection,
}