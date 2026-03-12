import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  excerpt?: string
  slug: string
  date: string
  featuredImage?: { node: { sourceUrl: string } }
  author?: { node: { name: string } }
  categories?: { edges: Array<{ node: { name: string } }> }
}

const MOCK_FEATURED: Post = {
  id: '1',
  title: 'Cool Down For Thursday!',
  slug: 'cool-down-thursday',
  excerpt: '<p>Temperatures are expected to drop significantly heading into Thursday as a cold front pushes through the region. Residents should prepare for cooler conditions.</p>',
  date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  categories: { edges: [{ node: { name: 'Weather' } }] },
  author: { node: { name: 'Michael Sokell' } },
  featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&h=520&fit=crop' } },
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
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
        } else {
          setPost(MOCK_FEATURED)
        }
      } catch (error) {
        setPost(MOCK_FEATURED)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="w-full h-80 bg-[#E8E8E8] rounded mb-3"></div>
        <div className="h-6 bg-[#E8E8E8] rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[#E8E8E8] rounded w-1/3"></div>
      </div>
    )
  }

  if (!post) return null

  const author = post.author?.node?.name || 'Staff'
  const image = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&h=520&fit=crop'

  return (
    <Link href={`/article/${post.slug}`}>
      <a className="block group">
        {/* Large Image */}
        <div className="w-full overflow-hidden rounded bg-[#E8E8E8] mb-3">
          <img
            src={image}
            alt={post.title}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-[#222222] group-hover:text-[#003D7A] transition-colors leading-snug mb-2">
          {post.title}
        </h2>
        {/* Byline */}
        <p className="text-sm text-[#888888]">
          <span>by {author}</span>
          <span className="mx-2">·</span>
          <span>{timeAgo(post.date)}</span>
        </p>
      </a>
    </Link>
  )
}
