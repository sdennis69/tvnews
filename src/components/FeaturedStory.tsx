import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedPosts, getPosts } from '@/lib/wordpress'

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
        const sticky = await getFeaturedPosts(1)
        if (sticky?.posts?.edges?.[0]?.node) {
          setPost(sticky.posts.edges[0].node)
          return
        }
        const latest = await getPosts(1)
        if (latest?.posts?.edges?.[0]?.node) {
          setPost(latest.posts.edges[0].node)
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
      <div className="animate-pulse">
        <div className="w-full h-80 bg-[#E8E8E8] rounded mb-3"></div>
        <div className="h-6 bg-[#E8E8E8] rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[#E8E8E8] rounded w-1/3"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12 text-[#888888]">
        <p>No posts available. Check your WordPress connection.</p>
      </div>
    )
  }

  const author = post.author?.node?.name || 'Staff'
  const image = post.featuredImage?.node?.sourceUrl || ''

  return (
    <Link href={`/article/${post.slug}`}>
      <a className="block group">
        {image && (
          <div className="w-full relative overflow-hidden rounded bg-[#E8E8E8] mb-3" style={{ aspectRatio: '16/9' }}>
            <Image
              src={image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        )}
        <h2 className="text-xl font-bold text-[#222222] group-hover:text-[#003D7A] transition-colors leading-snug mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-[#888888]">
          <span>by {author}</span>
          <span className="mx-2">·</span>
          <span>{timeAgo(post.date)}</span>
        </p>
      </a>
    </Link>
  )
}
