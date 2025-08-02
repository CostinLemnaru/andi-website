"use client"

import ScrollReveal from "./scroll-reveal"

interface RichTextChild {
  type: "text"
  text: string
  bold?: boolean
}

interface RichTextBlock {
  type: "paragraph"
  children: RichTextChild[]
}

interface ColumnsTextBoxProps {
  data: {
    __component: string
    id: number
    Title: string
    LeftColumn: RichTextBlock[]
    RightColumn: RichTextBlock[]
  }
}

// helper to render rich-text paragraph
function renderParagraph(block: RichTextBlock, key: number) {
  const hasOnlyBoldTitle =
    block.children.length === 1 &&
    block.children[0].type === "text" &&
    block.children[0].bold

  if (hasOnlyBoldTitle) {
    return (
      <h3 key={key} className="text-xl font-semibold text-white mb-3">
        {block.children[0].text}
      </h3>
    )
  }

  return (
    <p key={key} className="text-gray-300 leading-relaxed mb-4">
      {block.children.map((child, index) =>
        child.bold ? (
          <strong key={index} className="text-white font-bold">
            {child.text}
          </strong>
        ) : (
          <span key={index}>{child.text}</span>
        )
      )}
    </p>
  )
}

export default function ColumnsTextBox({ data }: ColumnsTextBoxProps) {
  const { Title, LeftColumn = [], RightColumn = [] } = data

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mt-20 bg-gray-900/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">{Title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {LeftColumn.map((block, idx) => renderParagraph(block, idx))}
              </div>
              <div>
                {RightColumn.map((block, idx) => renderParagraph(block, idx))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
