'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  date: string
}

export default function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const mockArticles: Article[] = [
      {
        id: '1',
        title: 'City Council Approves $50M Development Project',
        excerpt: 'City officials announce major progress on downtown revitalization initiative...',
        category: 'Local News',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
        author: 'Jane Smith',
        date: '2 hours ago',
      },
      {
        id: '2',
        title: 'Local Team Wins Championship with Last-Minute Goal',
        excerpt: 'In a thrilling match, the home team secured victory with an unexpected play...',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop',
        author: 'Mike Johnson',
        date: '4 hours ago',
      },
      {
        id: '3',
        title: 'Weather Alert: Severe Storm Expected Tonight',
        excerpt: 'Meteorologists warn of potential severe weather conditions in the region...',
        category: 'Weather',
        image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a4c817?w=600&h=400&fit=crop',
        author: 'Sarah Williams',
        date: '1 hour ago',
      },
      {
        id: '4',
        title: 'New Entertainment Venue Opens Downtown',
        excerpt: 'A new state-of-the-art entertainment complex officially opens its doors...',
        category: 'Entertainment',
        image: 'https://images.unsplash.com/photo-1611339555312-e607c04352fa?w=600&h=400&fit=crop',
        author: 'Tom Davis',
        date: '3 hours ago',
      },
      {
        id: '5',
        title: 'Business District Expansion Announced',
        excerpt: 'City leaders reveal plans for major business district expansion project...',
        category: 'Local News',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        author: 'Emma Wilson',
        date: '5 hours ago',
      },
      {
        id: '6',
        title: 'School District Receives State Recognition',
        excerpt: 'Local school district receives prestigious state education award...',
        category: 'Local News',
        image: 'https://images.unsplash.com/photo-1427504494785-cdec0f72a52b?w=600&h=400&fit=crop',
        author: 'Robert Brown',
        date: '6 hours ago',
      },
    ]
    setArticles(mockArticles)
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Local News': 'bg-[#f01d4f]',
      'Sports': 'bg-[#ff6600]',
      'Weather': 'bg-[#0066cc]',
      'Entertainment': 'bg-[#9933cc]',
      'National': 'bg-[#cc0000]',
    }
    return colors[category] || 'bg-[#f01d4f]'
  }

  return (
    <section className="py-12">
      <div className="container-custom">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Latest News</h2>
          <div className="w-16 h-1 bg-[#f01d4f]"></div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="article-card group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-[#2a2a2a]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  loading="lazy"
                  decoding="async"
                />
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 ${getCategoryColor(article.category)} text-white text-xs font-bold px-3 py-1 rounded`}>
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#f01d4f] transition-smooth line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-[#b0b0b0] mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-[#808080] border-t border-[#333333] pt-3">
                  <span><i className="fa fa-clock-o mr-1"></i>{article.date}</span>
                  <span><i className="fa fa-user mr-1"></i>{article.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="bg-[#f01d4f] hover:bg-[#d41a45] text-white font-bold py-3 px-8 rounded transition-smooth inline-flex items-center gap-2">
            <i className="fa fa-arrow-down"></i>
            Load More Stories
          </button>
        </div>
      </div>
    </section>
  )
}
