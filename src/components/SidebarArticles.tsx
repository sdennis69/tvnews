import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  slug: string
  date: string
  author?: { node: { name: string } }
  featuredImage?: { node: { sourceUrl: string } }
  categories?: { edges: Array<{ node: { name: string } }> }
}

const MOCK_POSTS: Post[] = [
  {
    id: '2',
    title: 'What will it take for ships to start sailing through the Strait of Hormuz again?',
    slug: 'ships-strait-hormuz',
    date: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    author: { node: { name: 'CBS News' } },
    categories: { edges: [{ node: { name: 'World' } }] },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop' } },
  },
  {
    id: '3',
    title: 'Local state and national events to be held in celebration of America 250',
    slug: 'america-250-events',
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    author: { node: { name: 'Eric Lampkin' } },
    categories: { edges: [{ node: { name: 'Local News' } }] },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=300&h=200&fit=crop' } },
  },
  {
    id: '4',
    title: 'High school sports roundup: Championship results from across the region',
    slug: 'high-school-sports-roundup',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: { node: { name: 'Sports Desk' } },
    categories: { edges: [{ node: { name: 'Sports' } }] },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop' } },
  },
  {
    id: '5',
    title: 'Severe weather watch issued for several counties ahead of weekend storms',
    slug: 'severe-weather-watch',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    author: { node: { name: 'Weather Team' } },
    categories: { edges: [{ node: { name: 'Weather' } }] },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=300&h=200&fit=crop' } },
  },
]

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
    const fetchFeatured = async () => {
      try {
        const response = await getFeaturedPosts(4)
        if (response?.posts?.edges && response.posts.edges.length > 0) {
          setPosts(response.posts.edges.map((edge: any) => edge.node))
        } else {
          setPosts(MOCK_POSTS)
        }
      } catch (error) {
        setPosts(MOCK_POSTS)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
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

  return (
    <div className="divide-y divide-[#EEEEEE]">
      {posts.map((post) => {
        const author = post.author?.node?.name || 'Staff'
        const image = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'
        return (
          <Link key={post.id} href={`/article/${post.slug}`}>
            <a className="flex gap-4 py-4 first:pt-0 last:pb-0 group hover:bg-[#F9F9F9] transition-colors -mx-4 px-4">
              {/* Thumbnail */}
              <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded bg-[#E8E8E8]">
                <img
                  src={image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Text */}
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
