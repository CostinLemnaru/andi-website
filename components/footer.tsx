import Link from "next/link"
import GradientText from "./gradient-text"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800/50 bg-[#0c0c14]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-medium">
                <GradientText>andi</GradientText>
                <span className="text-gray-400 text-xl"> by Zamora</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">Built to Think.
Ready to Act.</p>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Company</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/team" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-xs text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Segments</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/solutions/emerging-businesses"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Emerging Businesses
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/growth-companies"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Growth Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/enterprise-organizations"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Enterprise Organizations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Industries</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/industries/saas-technology"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  SaaS & Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/financial-services"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Financial Services
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/retail-ecommerce"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Retail & E-commerce
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/healthcare"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Healthcare
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Features</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/features/nlp-query-engine"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  NLP Query Engine
                </Link>
              </li>
              <li>
                <Link href="/features/linkdna" className="text-xs text-gray-400 hover:text-white transition-colors">
                  LinkDNA™ Correlation Engine
                </Link>
              </li>
              <li>
                <Link
                  href="/features/insight-labeling"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Insight Labeling
                </Link>
              </li>
              <li>
                <Link
                  href="/features/confidence-based-nlp"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Confidence-Based NLP
                </Link>
              </li>
              <li>
                <Link
                  href="/features/multi-dataset-analysis"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Multi-Dataset Analysis
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800/50 text-center text-xs text-gray-400">
          <p>© 2025 Zamora AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
