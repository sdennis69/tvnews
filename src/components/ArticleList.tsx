import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
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

const MOCK_ARTICLES: Post[] = [
  {
    id: '1',
    title: 'City Officials Announce Major Downtown Revitalization Initiative',
    slug: 'city-revitalization',
    excerpt: '<p>City officials have announced a major progress on the downtown revitalization initiative that will transform the urban core.</p>',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Local News' } }] },
    author: { node: { name: 'Jane Smith' } },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=280&fit=crop' } },
  },
  {
    id: '2',
    title: 'Local Team Wins Championship with Last-Minute Goal',
    slug: 'local-team-championship',
    excerpt: '<p>In a thrilling match, the home team secured victory with an unexpected play in the final seconds.</p>',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Sports' } }] },
    author: { node: { name: 'Mike Johnson' } },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=280&fit=crop' } },
  },
  {
    id: '3',
    title: 'Weather Alert: Severe Storm Expected Tonight',
    slug: 'weather-alert-storm',
    excerpt: '<p>Meteorologists warn of potential severe weather conditions in the region, urging residents to take precautions.</p>',
    date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Weather' } }] },
    author: { node: { name: 'Sarah Williams' } },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=400&h=280&fit=crop' } },
  },
  {
    id: '4',
    title: 'New Entertainment Venue Opens Downtown',
    slug: 'entertainment-venue-opens',
    excerpt: '<p>A new state-of-the-art entertainment complex officially opens its doors to the public this weekend.</p>',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Entertainment' } }] },
    author: { node: { name: 'Tom Davis' } },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=280&fit=crop' } },
  },
  {
    id: '5',
    title: 'Business District Expansion Announced',
    slug: 'business-district-expansion',
    excerpt: '<p>City leaders reveal plans for a major business district expansion project that will create hundreds of jobs.</p>',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    categories: { edges: [{ node: { name: 'Local News' } }] },
    author: { node: { name: 'Emma Wilson' } },
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=280&fit=crop' } },
  },
]

export default function ArticleList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(10)
        if (response?.posts?.edges && response.posts.edges.length > 0) {
          setPosts(response.posts.edges.map((edge: any) => edge.node))
        } else {
          setPosts(MOCK_ARTICLES)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts(MOCK_ARTICLES)
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

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
        const author = post.author?.node?.name || 'Staff'
        const image = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=280&fit=crop'
        const formattedDate = new Date(post.date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        return (
          <Link key={post.id} href={`/article/${post.slug}`}>
            <a className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-all duration-200 group">
              <div className="w-40 h-28 flex-shrink-0 overflow-hidden bg-[#E8E8E8]">
                <img
                  src={image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#CC0000] text-white text-xs font-bold px-2.5 py-1 rounded">
                      {category.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#999999]">{formattedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#333333] group-hover:text-[#CC0000] transition-colors mb-2 line-clamp-2 leading-tight">
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
            </a>
          </Link>
        )
      })}
    </div>
  )
}
