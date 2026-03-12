'use client'

import Link from 'next/link'

interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  time: string
}

export default function ArticleList() {
  const articles: Article[] = [
    {
      id: '1',
      title: 'City Council Approves Major Downtown Development',
      excerpt: 'In a unanimous vote, the city council has approved a $50 million development project that will transform the downtown area with new businesses and residential spaces.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop',
      category: 'LOCAL NEWS',
      author: 'Jane Smith',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'Local School District Receives State Recognition',
      excerpt: 'The school district has been recognized by the state for excellence in education and innovative teaching methods that have improved student outcomes.',
      image: 'https://images.unsplash.com/photo-1427504494785-cdec0f72a52b?w=200&h=150&fit=crop',
      category: 'LOCAL NEWS',
      author: 'Robert Brown',
      time: '4 hours ago',
    },
    {
      id: '3',
      title: 'New Business District Expansion Announced',
      excerpt: 'City leaders have unveiled plans for a major expansion of the business district, which is expected to create hundreds of new jobs in the region.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop',
      category: 'BUSINESS',
      author: 'Emma Wilson',
      time: '5 hours ago',
    },
    {
      id: '4',
      title: 'Community Center Opens New Recreation Facilities',
      excerpt: 'The newly renovated community center now features state-of-the-art fitness equipment, swimming pools, and recreational spaces for all ages.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop',
      category: 'COMMUNITY',
      author: 'Michael Davis',
      time: '6 hours ago',
    },
    {
      id: '5',
      title: 'Local Charity Raises Record Funds for Community',
      excerpt: 'An annual charity event has raised a record-breaking amount of funds that will support local community programs and services.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=150&fit=crop',
      category: 'COMMUNITY',
      author: 'Lisa Anderson',
      time: '7 hours ago',
    },
  ]

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/article/${article.id}`}
          className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-smooth group"
        >
          {/* Image */}
          <div className="w-40 h-28 flex-shrink-0 overflow-hidden bg-[#E8E8E8]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#CC0000] text-white text-xs font-bold px-2.5 py-1 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-[#999999]">{article.time}</span>
              </div>
              <h3 className="text-base font-bold text-[#333333] group-hover:text-[#CC0000] transition-smooth mb-2 line-clamp-2 leading-tight">
                {article.title}
              </h3>
              <p className="text-sm text-[#666666] line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </div>
            <span className="text-xs text-[#999999]">
              <i className="fa fa-user mr-1.5"></i>
              {article.author}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
