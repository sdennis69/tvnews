import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedPosts, getPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  slug: string
  date: string
  author?: { node: { name: string } }
  featuredImage?: { node: { sourceUrl: string } }
  categories?: { edges: Array<{ node: { name: string } }> }
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
}

export default function SidebarArticles() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const sticky = await getFeaturedPosts(5)
        if (sticky?.posts?.edges && sticky.posts.edges.length > 1) {
          setPosts(sticky.posts.edges.slice(1, 5).map((e: any) => e.node))
          return
        }
        const latest = await getPosts(5)
        if (latest?.posts?.edges && latest.posts.edges.length > 1) {
          setPosts(latest.posts.edges.slice(1, 5).map((e: any) => e.node))
        } else if (latest?.posts?.edges && latest.posts.edges.length > 0) {
          setPosts(latest.posts.edges.map((e: any) => e.node))
        }
      } catch (error) {
        console.error('Error fetching sidebar posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-28 h-20 flex-shrink-0 bg-[#E8E8E8] rounded"></div>
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-4 bg-[#E8E8E8] rounded w-full"></div>
              <div className="h-4 bg-[#E8E8E8] rounded w-3/4"></div>
              <div className="h-3 bg-[#E8E8E8] rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-[#888888] text-sm">
        <p>No articles available.</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-[#EEEEEE]">
      {posts.map((post) => {
        const author = post.author?.node?.name || 'Staff'
        const image = post.featuredImage?.node?.sourceUrl || ''
        return (
          <Link key={post.id} href={`/article/${post.slug}`}>
            <a className="flex gap-4 py-4 first:pt-0 last:pb-0 group hover:bg-[#F9F9F9] transition-colors -mx-4 px-4">
              {image && (
                <div className="w-28 h-20 flex-shrink-0 relative overflow-hidden rounded bg-[#E8E8E8]">
                  <Image
                    src={image}
                    alt={post.title}
                    fill
                    sizes="112px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-semibold text-[#222222] group-hover:text-[#003D7A] transition-colors leading-snug line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-xs text-[#888888] mt-1">
                  <span className="font-medium">by {author}</span>
                  <span className="mx-1">·</span>
                  <span>{timeAgo(post.date)}</span>
                </p>
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
