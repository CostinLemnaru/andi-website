"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Post {
  id: number
  Title: string
  Subtitle?: string
  slug: string
  createdAt: string
  readTime?: string
}

interface Props {
  data: {
    __component: string
    data: Post
  }
}

export default function PostBox({ data }: Props) {
  const post = data.data
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <span className="bg-emerald-900/60 text-emerald-400 px-3 py-1 rounded-full text-xs mr-3">NEW</span>
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime ?? "5 min read"}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{post.Title}</h2>

          {post.Subtitle && <p className="text-gray-300 mb-6 md:text-lg">{post.Subtitle}</p>}

          <Link
            href={`/post/${post.slug}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md"
          >
            <span>Read Featured White Paper</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.div>
      </div>
  )
}
