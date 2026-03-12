'use client'

import { useEffect, useState } from 'react'
import { getFeaturedPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  excerpt: string
  slug: string
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

export default function FeaturedStory() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await getFeaturedPosts(1)
        if (response?.posts?.edges?.[0]?.node) {
          setPost(response.posts.edges[0].node)
        }
      } catch (error) {
        console.error('Error fetching featured post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md h-96 animate-pulse">
        <div className="h-64 bg-[#E8E8E8]"></div>
        <div className="p-6 space-y-3">
          <div className="h-4 bg-[#E8E8E8] rounded w-1/4"></div>
          <div className="h-6 bg-[#E8E8E8] rounded"></div>
          <div className="h-4 bg-[#E8E8E8] rounded w-full"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-6 text-center">
        <p className="text-[#666666]">No featured posts available</p>
      </div>
    )
  }

  const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
  const author = post.author?.node?.name || 'Staff'
  const image = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
  const formattedDate = new Date(post.date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* Featured Image */}
      <div className="relative h-96 overflow-hidden bg-[#E8E8E8]">
        <img
          src={image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-smooth duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1.5 rounded inline-block">
            {category.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#333333] mb-3 leading-tight hover:text-[#CC0000] transition-smooth">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[#666666] text-base mb-4 leading-relaxed line-clamp-3">
          {post.excerpt?.replace(/<[^>]*>/g, '') || 'Read the full story for more details.'}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-[#999999] border-t border-[#CCCCCC] pt-4">
          <span>
            <i className="fa fa-user mr-2"></i>By {author}
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  )
}
