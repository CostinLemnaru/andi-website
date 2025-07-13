import CtaSection from "@/components/CtaSection"
import HeroSection from "@/components/HeroSection"
import PageHeader from "@/components/page-header"
import RoadmapSection from "@/components/RoadmapSection"
import RoiCalculatorSection from "@/components/RoiCalculatorSection"
import SecuritySection from "@/components/SecuritySection"

export const componentsMap: Record<string, React.FC<any>> = {
  "hero.hero-section": HeroSection,
  "home.security-section": SecuritySection,
  "home.roadmap-section": RoadmapSection,
  "home.roi-calculator-section": RoiCalculatorSection,
  "home.cta-section": CtaSection,
  "page.page-header": PageHeader,
}