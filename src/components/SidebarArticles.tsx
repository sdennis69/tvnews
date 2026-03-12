
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

export default function SidebarArticles() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await getFeaturedPosts(3)
        if (response?.posts?.edges) {
          setPosts(response.posts.edges.map((edge: any) => edge.node))
        }
      } catch (error) {
        console.error('Error fetching featured posts:', error)
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

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center border border-[#CCCCCC]">
        <p className="text-[#666666]">No featured posts available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
        const image = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'
        const formattedDate = new Date(post.date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        })

        return (
          <Link
            key={post.id}
            href={`/article/${post.slug}`}
            className="flex gap-3 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-smooth group"
          >
            {/* Image */}
            <div className="w-24 h-20 flex-shrink-0 overflow-hidden bg-[#E8E8E8]">
              <img
                src={image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <span className="bg-[#CC0000] text-white text-xs font-bold px-2 py-1 rounded inline-block mb-1">
                  {category.toUpperCase()}
                </span>
                <h3 className="text-sm font-bold text-[#333333] group-hover:text-[#CC0000] transition-smooth line-clamp-2 leading-tight">
                  {post.title}
                </h3>
              </div>
              <span className="text-xs text-[#999999]">{formattedDate}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
