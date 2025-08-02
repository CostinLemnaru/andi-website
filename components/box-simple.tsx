"use client"

import ScrollReveal from "@/components/scroll-reveal"

interface TextNode {
  type: "text"
  text: string
}

interface HeadingNode {
  type: "heading"
  children: TextNode[]
  level: number
}

interface ParagraphNode {
  type: "paragraph"
  children: TextNode[]
}

interface ListItemNode {
  type: "list-item"
  children: TextNode[]
}

interface ListNode {
  type: "list"
  format: "unordered" | "ordered"
  children: ListItemNode[]
}

type ContentNode = HeadingNode | ParagraphNode | ListNode

interface BoxSimpleProps {
  __component: string
  id: number
  Title: string
  Content?: ContentNode[] | null // <-- changed to optional + nullable
}

type Props = {
  data: BoxSimpleProps
}

export default function BoxSimple({ data }: Props) {
  const renderNode = (node: ContentNode, index: number) => {
    if (node.type === "heading") {
      const HeadingTag = `h${Math.min(Math.max(node.level, 1), 6)}` as keyof JSX.IntrinsicElements
      return (
        <HeadingTag key={index} className="text-xl font-medium text-white mb-4">
          {node.children.map((child) => child.text).join("")}
        </HeadingTag>
      )
    }

    if (node.type === "paragraph") {
      return (
        <p key={index} className="text-gray-300 mb-6">
          {node.children.map((child) => child.text).join("")}
        </p>
      )
    }

    if (node.type === "list") {
      const ListTag = node.format === "ordered" ? "ol" : "ul"
      return (
        <ListTag key={index} className="space-y-2 text-gray-300 list-disc pl-5 mb-6">
          {node.children.map((item, i) => (
            <li key={i}>{item.children.map((child) => child.text).join("")}</li>
          ))}
        </ListTag>
      )
    }

    return null
  }

  return (
    <ScrollReveal>
      <div className="max-w-4xl mx-auto mb-12 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
        {Array.isArray(data.Content) &&
          data.Content.map((node, index) => renderNode(node, index))}
      </div>
    </ScrollReveal>
  )
}
