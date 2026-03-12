import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
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

export default function ArticleList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(10)
        if (response?.posts?.edges && response.posts.edges.length > 0) {
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
      <div className="text-center py-12 text-[#888888]">
        <p className="text-lg font-medium mb-2">No articles found</p>
        <p className="text-sm">Make sure your WordPress site is connected and has published posts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
        const author = post.author?.node?.name || 'Staff'
        const image = post.featuredImage?.node?.sourceUrl || ''
        return (
          <Link key={post.id} href={`/article/${post.slug}`}>
            <a className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-all duration-200 group">
              {image && (
                <div className="w-40 h-28 flex-shrink-0 overflow-hidden bg-[#E8E8E8]">
                  <img
                    src={image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#003D7A] text-white text-xs font-bold px-2.5 py-1 rounded">
                      {category.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#999999]">{timeAgo(post.date)}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#333333] group-hover:text-[#003D7A] transition-colors mb-2 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#555555] line-clamp-2 leading-relaxed">
                    {post.excerpt?.replace(/<[^>]*>/g, '') || ''}
                  </p>
                </div>
                <span className="text-xs text-[#999999] mt-2">by {author}</span>
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
