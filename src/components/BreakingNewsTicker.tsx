'use client'

import { useEffect, useState } from 'react'

export default function BreakingNewsTicker() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const breakingNews = [
    '🔴 BREAKING: City Council approves major development project',
    '⚠️ WEATHER ALERT: Severe thunderstorms expected this evening',
    '📺 LIVE: Mayor holds press conference on infrastructure',
    '🏆 SPORTS: Local team advances to championship finals',
    '📰 DEVELOPING: New business district announced downtown',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (breakingNews.length * 100))
    }, 30)
    return () => clearInterval(interval)
  }, [breakingNews.length])

  return (
    <div className="bg-gradient-to-r from-[#f01d4f] to-[#d41a45] py-3 overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center gap-4">
          {/* Breaking News Label */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="animate-pulse-live">
              <span className="inline-block w-3 h-3 bg-white rounded-full"></span>
            </div>
            <span className="text-white font-bold text-sm uppercase tracking-wider">
              BREAKING NEWS
            </span>
          </div>

          {/* Ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap" style={{
              transform: `translateX(${-scrollPosition}px)`,
              transition: 'transform 0.1s linear'
            }}>
              {[...breakingNews, ...breakingNews].map((news, idx) => (
                <span 
                  key={idx} 
                  className="text-white text-sm font-medium flex items-center gap-4"
                >
                  <span className="text-white">•</span>
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
