"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

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
    data: Post[]
  }
}

export default function PostsInline({ data }: Props) {
  const posts = data.data

  return (
    <div className="max-w-7xl mx-auto px-4 mb-20 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => {
        const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })

        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full"
          >
            <div className="p-6 flex-grow">
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
                {post.readTime && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>

              <h2 className="text-xl font-bold mb-3 text-white">{post.Title}</h2>
              <p className="text-gray-300 mb-6">{post.Subtitle}</p>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <Link
                href={`/post/${post.slug}`}
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>Read White Paper</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        )
      })}
    </div>
    </div>
  )
}
