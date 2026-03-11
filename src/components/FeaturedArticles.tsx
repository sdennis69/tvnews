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

  // Mock data - will be replaced with WordPress GraphQL queries
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
        title: 'New Movie Theater Opens Downtown',
        excerpt: 'State-of-the-art cinema brings entertainment to the heart of the city...',
        category: 'Entertainment',
        image: 'https://images.unsplash.com/photo-1489599849228-bed2db80bd74?w=600&h=400&fit=crop',
        author: 'Tom Brown',
        date: '6 hours ago',
      },
    ]
    setArticles(mockArticles)
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Local News': 'bg-blue-600',
      'National News': 'bg-purple-600',
      'Sports': 'bg-green-600',
      'Weather': 'bg-cyan-600',
      'Entertainment': 'bg-pink-600',
    }
    return colors[category] || 'bg-gray-600'
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-8 font-display">Latest News</h2>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <article 
            key={article.id}
            className="bg-secondary-light rounded-lg overflow-hidden hover:shadow-lg-custom transition-smooth group cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {/* Image */}
              <div className="md:col-span-1 h-48 md:h-auto rounded-lg overflow-hidden bg-black">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${getCategoryColor(article.category)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                      {article.category}
                    </span>
                  </div>

                  <Link href={`/article/${article.id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-smooth font-display">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-sm mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/articles"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-sm transition-smooth"
        >
          View All Articles
        </Link>
      </div>
    </section>
  )
}
