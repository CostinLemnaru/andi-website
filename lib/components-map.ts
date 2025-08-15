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
import HeaderLeft from "@/components/header-left"
import InlineIconTitleSubtitleBoxes from "@/components/inline-icon-title-subtitle-boxes"
import ColumnsListSection from "@/components/columns-list-section"
import JoinEarlyAccess from "@/components/join-early-access"
import HeaderIcon from "@/components/header-icon"
import IconBox from "@/components/icon-box"
import RequestDemoBox from "@/components/request-demo-box"
import BoxesColumns from "@/components/boxes-columns"
import Content from "@/components/content"
import BgColoredBoxed from "@/components/bg-colored-boxed"
import ColumnsTextBox from "@/components/columns-text-box"
import CtaSectionButtons from "@/components/cta-section-buttons"
import TagIcon from "@/components/tag-icon"
import ColoredIconTitleSubtitleBoxes from "@/components/colored-icon-title-subtitle-boxes"
import ExpectedLaunchBox from "@/components/expected-launch-box"
import Team from "@/components/team"
import PostContent from "@/components/post-content"
import PostList from "@/components/PostList"
import PostEvolutionTabs from "@/components/PostEvolutionTabs"
import PostColoredBoxesSection from "@/components/PostColoredBoxesSection"
import PostDecisionFlowSection from "@/components/PostDecisionFlowSection"
import PostTableJsonSection from "@/components/PostTableJsonSection"
import PostBoxButtonsSection from "@/components/PostBoxButtonsSection"
import PostSageReadinessSection from "@/components/PostSageReadinessSection"
import PostListNumbersSection from "@/components/PostListNumbersSection"
import PostTitleSection from "@/components/PostTitle"
import PostQuoteSection from "@/components/PostQuoteSection"
import PostTabsBoxesSection from "@/components/PostTabsBoxesSection"
import PostTabsColoredBoxesSection from "@/components/PostTabsColoredBoxesSection"
import PostBusinessImpactCalculator from "@/components/benefits-calculator"
import PostTabsIconsSection from "@/components/key-insights-tabs"
import PostBox from "@/components/PostBox"
import PostsInline from "@/components/PostsInline"
import CardWithTags from "@/components/CardWithTags"
import CardList from "@/components/CardList"
import CardCodeBlock from "@/components/CardCodeBlock"
import CardResources from "@/components/CardResources"
import CardButtonAndTogglePreview from "@/components/CardButtonAndTogglePreview"
import CardSimple from "@/components/CardSimpleData"
import CardTwoColumns from "@/components/CardTwoColumns"
import CardNested from "@/components/CardNested"
import SitemapResources from "@/components/SitemapResources"
import AiPolicyTabs from "@/components/AiPolicyTabs"
import CardWithCodeblocks from "@/components/CardWithCodeblocks"
import Glossary from "@/components/Glossary"
import KnowledgePack from "@/components/KnowledgePack"
import Faqs from "@/components/Faqs"
import BoxesLearnMore from "@/components/BoxesLearnMore"
import BoxTextWysiwg from "@/components/BoxTextWysiwg"
import ColumnTextAndBox from "@/components/ColumnTextAndBox"
import BoxMessageSmall from "@/components/BoxMessageSmall"
import BoxMessageWide from "@/components/BoxMessageWide"

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
  "page.button": Button,
  "page.header-left": HeaderLeft,
  "page.inline-icon-title-subtitle-boxes": InlineIconTitleSubtitleBoxes,
  "page.columns-list-section": ColumnsListSection,
  "page.join-early-access": JoinEarlyAccess,
  "page.header-icon": HeaderIcon,
  "page.icon-box": IconBox,
  "page.request-demo-box": RequestDemoBox,
  "page.boxes-columns": BoxesColumns,
  "page.content": Content,
  "page.bg-colored-boxed": BgColoredBoxed,
  "page.columns-text-box": ColumnsTextBox,
  "page.cta-section": CtaSectionButtons,
  "page.tag-icon": TagIcon,
  "page.colored-icon-title-subtitle-boxes": ColoredIconTitleSubtitleBoxes,
  "page.expected-launch-box": ExpectedLaunchBox,
  "page.team": Team,
  "page.post-box": PostBox,
  "page.posts-inline": PostsInline,
  "page.card-with-tags": CardWithTags,
  "page.card-list": CardList,
  "page.card-code-block": CardCodeBlock,
  "page.card-resources": CardResources,
  "page.card-button-and-toggle-preview": CardButtonAndTogglePreview,
  "page.card-simple": CardSimple,
  "page.card-2-columns": CardTwoColumns,
  "page.card-nested": CardNested,
  "page.sitemap-resources": SitemapResources,
  "page.ai-policy-tabs": AiPolicyTabs,
  "page.card-with-codeblock": CardWithCodeblocks,
  "page.glossary": Glossary,
  "page.knowledge-pack-tabs": KnowledgePack,
  "page.faqs": Faqs,
  "page.boxes-learn-more": BoxesLearnMore,
  "page.box-text-wysiwg": BoxTextWysiwg,
  "page.column-text-and-box": ColumnTextAndBox,
  "page.box-message-small": BoxMessageSmall,
  "page.box-message-wide": BoxMessageWide,
  "posts.content": PostContent,
  "posts.list": PostList,
  "posts.evolution-tabs": PostEvolutionTabs,
  "posts.colored-boxes-section": PostColoredBoxesSection,
  "posts.decision-flow-section": PostDecisionFlowSection,
  "posts.table-json": PostTableJsonSection,
  "posts.box-buttons": PostBoxButtonsSection,
  "posts.sage-readiness-assessment": PostSageReadinessSection,
  "posts.list-numbers": PostListNumbersSection,
  "posts.title": PostTitleSection,
  "posts.quote": PostQuoteSection,
  "posts.tabs-boxes-section": PostTabsBoxesSection,
  "posts.tabs-colored-boxes-section": PostTabsColoredBoxesSection,
  "posts.business-impact-calculator": PostBusinessImpactCalculator,
  "posts.tabs-icons": PostTabsIconsSection,
}