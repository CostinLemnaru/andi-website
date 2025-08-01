import CtaSection from "@/components/CtaSection"
import HeroSection from "@/components/HeroSection"
import PageHeader from "@/components/page-header"
import RoadmapSection from "@/components/RoadmapSection"
import RoiCalculatorSection from "@/components/RoiCalculatorSection"
import SecuritySection from "@/components/SecuritySection"
import BoxListItems from "@/components/box-list-items"
import BoxSimple from "@/components/box-simple"
import BoxQandA from "@/components/box-q-and-a"
import BoxItems from "@/components/box-items"
import SectionIconBoxes from "@/components/section-icon-boxes"
import TabsSection from "@/components/tabs-section"
import BoxIcon from "@/components/box-icon"
import TabsBoxSection from "@/components/tabs-box-section"
import BusinessPulseSection from "@/components/business-pulse-section"
import TabsComponentsSection from "@/components/tabs-components-section"
import BoxNestedSection from "@/components/box-nested-section"
import BoxListSteps from "@/components/box-list-steps"
import MetricsSection from "@/components/metrics-section"
import InlineBoxesSection from "@/components/inline-boxes-section"
import BoxIconListSection from "@/components/box-icon-list-section"
import TableSection from "@/components/table-section"
import MarketingPerformanceDashboard from "@/components/marketing-performance-dashboard"
import PricingSection from "@/components/pricing-section"
import SectionBoxFeaturesFooter from "@/components/section-box-features-footer"
import AddOnsSection from "@/components/add-ons-section"
import AccordionJson from "@/components/accordion-json"
import TabsVerticalSection from "@/components/tabs-vertical-section"
import Accordion from "@/components/accordion"
import Button from "@/components/button"

export const componentsMap: Record<string, React.FC<any>> = {
  "hero.hero-section": HeroSection,
  "home.security-section": SecuritySection,
  "home.roadmap-section": RoadmapSection,
  "home.roi-calculator-section": RoiCalculatorSection,
  "home.cta-section": CtaSection,
  "page.header": PageHeader,
  "page.box-list-items": BoxListItems,
  "page.box-simple": BoxSimple,
  "page.box-q-and-a": BoxQandA,
  "page.box-items": BoxItems,
  "page.section-icon-boxes": SectionIconBoxes,
  "page.tabs-section": TabsSection,
  "page.box-icon": BoxIcon,
  "page.tabs-box-section": TabsBoxSection,
  "page.business-pulse-section": BusinessPulseSection,
  "page.tabs-components-section": TabsComponentsSection,
  "page.box-nested-section": BoxNestedSection,
  "page.box-list-steps": BoxListSteps,
  "page.metrics-section": MetricsSection,
  "page.inline-boxes-section": InlineBoxesSection,
  "page.box-icon-list-section": BoxIconListSection,
  "page.table-section": TableSection,
  "page.marketing-performance-dashboard": MarketingPerformanceDashboard,
  "page.pricing-section": PricingSection,
  "page.section-box-features-footer": SectionBoxFeaturesFooter,
  "page.add-ons-section": AddOnsSection,
  "page.accordion-json": AccordionJson,
  "page.tabs-vertical-section": TabsVerticalSection,
  "page.accordion": Accordion,
  "page.button": Button
}