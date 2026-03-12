'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  featuredImage?: {
    node: {
      sourceUrl: string
    }
  }
  author?: {
    node: {
      name: string
    }
  }
  categories?: {
    edges: Array<{
      node: {
        name: string
      }
    }>
  }
}

export default function ArticleList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(10)
        if (response?.posts?.edges) {
          setPosts(response.posts.edges.map((edge: any) => edge.node))
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 bg-white rounded-lg overflow-hidden border border-[#CCCCCC] animate-pulse">
            <div className="w-40 h-28 flex-shrink-0 bg-[#E8E8E8]"></div>
            <div className="flex-1 p-4 space-y-3">
              <div className="h-3 bg-[#E8E8E8] rounded w-1/4"></div>
              <div className="h-5 bg-[#E8E8E8] rounded w-full"></div>
              <div className="h-4 bg-[#E8E8E8] rounded w-full"></div>
              <div className="h-3 bg-[#E8E8E8] rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center border border-[#CCCCCC]">
        <p className="text-[#666666]">No posts available. Please add articles to your WordPress site.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
        const author = post.author?.node?.name || 'Staff'
        const image = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop'
        const formattedDate = new Date(post.date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        return (
          <Link
            key={post.id}
            href={`/article/${post.slug}`}
            className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-smooth group"
          >
            {/* Image */}
            <div className="w-40 h-28 flex-shrink-0 overflow-hidden bg-[#E8E8E8]">
              <img
                src={image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#CC0000] text-white text-xs font-bold px-2.5 py-1 rounded">
                    {category.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#999999]">{formattedDate}</span>
                </div>
                <h3 className="text-base font-bold text-[#333333] group-hover:text-[#CC0000] transition-smooth mb-2 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-[#666666] line-clamp-2 leading-relaxed">
                  {post.excerpt?.replace(/<[^>]*>/g, '') || 'Read the full story for more details.'}
                </p>
              </div>
              <span className="text-xs text-[#999999]">
                <i className="fa fa-user mr-1.5"></i>
                {author}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
