'use client'

import { useEffect, useState } from 'react'

interface BreakingNews {
  message: string
  active: boolean
}

export default function BreakingNewsTicker() {
  const [news, setNews] = useState<BreakingNews[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock data - will be replaced with WordPress GraphQL queries
  useEffect(() => {
    const mockNews: BreakingNews[] = [
      { message: '🔴 LIVE: Major news story developing in the city', active: true },
      { message: 'LIVE COVERAGE: Important event unfolding downtown', active: true },
      { message: 'ALERT: Critical update on ongoing situation', active: true },
      { message: 'UPDATE: Latest developments in top story', active: true },
    ]
    setNews(mockNews)
  }, [])

  // Rotate news items
  useEffect(() => {
    if (news.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [news.length])

  if (news.length === 0) return null

  const currentNews = news[currentIndex]

  return (
    <div className="bg-primary text-white py-3 overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse-custom"></div>
            <span className="font-bold text-sm uppercase tracking-wider">LIVE</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-slide-in-up text-sm md:text-base font-medium">
              {currentNews.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
