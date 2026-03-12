
import { useState, useEffect } from 'react'

export default function BreakingNewsTicker() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const breakingNews = [
    '🔴 BREAKING: City Council Approves Major Development Project',
    '📰 DEVELOPING: New Business District Expansion Announced',
    '⚠️ ALERT: Weather Warning Issued for Tonight',
    '🏆 SPORTS: Local Team Advances to Championship Finals',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (breakingNews.length * 100))
    }, 30)
    return () => clearInterval(interval)
  }, [breakingNews.length])

  return (
    <div className="bg-[#003D7A] py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Breaking News Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-sm whitespace-nowrap">BREAKING NEWS</span>
          </div>

          {/* Scrolling Ticker */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-8 whitespace-nowrap transition-transform"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {breakingNews.concat(breakingNews).map((news, index) => (
                <span key={index} className="text-white text-sm font-medium">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
