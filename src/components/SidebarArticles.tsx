import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  slug: string
  date: string
  featuredImage?: {
    node: {
      sourceUrl: string
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

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'City Officials Announce Major Downtown Revitalization Initiative',
    slug: 'city-revitalization',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Local News' } }] },
  },
  {
    id: '2',
    title: 'Local Team Wins Championship with Last-Minute Goal',
    slug: 'local-team-championship',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Sports' } }] },
  },
  {
    id: '3',
    title: 'Weather Alert: Severe Storm Expected Tonight',
    slug: 'weather-alert-storm',
    date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Weather' } }] },
  },
]

const FALLBACK_IMAGES: Record<string, string> = {
  'Local News': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
  'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop',
  'Weather': 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=300&h=200&fit=crop',
  'Entertainment': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop',
  'default': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
}

export default function SidebarArticles() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await getFeaturedPosts(3)
        if (response?.posts?.edges && response.posts.edges.length > 0) {
          setPosts(response.posts.edges.map((edge: any) => edge.node))
        } else {
          setPosts(MOCK_POSTS)
        }
      } catch (error) {
        console.error('Error fetching featured posts:', error)
        setPosts(MOCK_POSTS)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 bg-white rounded-lg overflow-hidden border border-[#CCCCCC] animate-pulse">
            <div className="w-24 h-20 flex-shrink-0 bg-[#E8E8E8]"></div>
            <div className="flex-1 p-3 space-y-2">
              <div className="h-3 bg-[#E8E8E8] rounded w-1/3"></div>
              <div className="h-4 bg-[#E8E8E8] rounded w-full"></div>
              <div className="h-3 bg-[#E8E8E8] rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
        const image =
          post.featuredImage?.node?.sourceUrl ||
          FALLBACK_IMAGES[category] ||
          FALLBACK_IMAGES['default']
        const formattedDate = new Date(post.date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        return (
          <Link key={post.id} href={`/article/${post.slug}`}>
            <a className="flex gap-3 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-all duration-200 group">
              <div className="w-24 h-20 flex-shrink-0 overflow-hidden bg-[#E8E8E8]">
                <img
                  src={image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <span className="bg-[#CC0000] text-white text-xs font-bold px-2 py-1 rounded inline-block mb-1">
                    {category.toUpperCase()}
                  </span>
                  <h3 className="text-sm font-bold text-[#333333] group-hover:text-[#CC0000] transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                </div>
                <span className="text-xs text-[#999999]">{formattedDate}</span>
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
