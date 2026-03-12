'use client'

import Link from 'next/link'

interface SidebarArticle {
  id: string
  title: string
  image: string
  category: string
  time: string
}

export default function SidebarArticles() {
  const articles: SidebarArticle[] = [
    {
      id: '1',
      title: 'Local Team Wins Championship Game',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop',
      category: 'SPORTS',
      time: '1 hour ago',
    },
    {
      id: '2',
      title: 'Weather Alert: Storms Expected Tonight',
      image: 'https://images.unsplash.com/photo-1527482797697-8795b1a55a45?w=300&h=200&fit=crop',
      category: 'WEATHER',
      time: '30 min ago',
    },
    {
      id: '3',
      title: 'New Entertainment Venue Opens Downtown',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      category: 'ENTERTAINMENT',
      time: '3 hours ago',
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'SPORTS': 'bg-[#ff6600]',
      'WEATHER': 'bg-[#0066cc]',
      'ENTERTAINMENT': 'bg-[#9933cc]',
      'LOCAL NEWS': 'bg-[#cc0000]',
      'NATIONAL': 'bg-[#cc0000]',
    }
    return colors[category] || 'bg-[#cc0000]'
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/article/${article.id}`}
          className="flex gap-4 bg-[#ffffff] rounded-lg overflow-hidden hover:border-[#cc0000] border border-[#cccccc] transition-smooth group"
        >
          {/* Image */}
          <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-[#e8e8e8]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <span className={`${getCategoryColor(article.category)} text-white text-xs font-bold px-2 py-1 rounded inline-block mb-2`}>
                {article.category}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-[#cc0000] transition-smooth line-clamp-2">
                {article.title}
              </h3>
            </div>
            <span className="text-xs text-[#999999]">{article.time}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
