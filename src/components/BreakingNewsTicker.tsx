import { useState, useEffect, useRef } from 'react'
import { getPosts } from '@/lib/wordpress'

export default function BreakingNewsTicker() {
  const [headlines, setHeadlines] = useState<string[]>([])
  const [offset, setOffset] = useState(0)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await getPosts(6)
        if (response?.posts?.edges && response.posts.edges.length > 0) {
          setHeadlines(response.posts.edges.map((e: any) => e.node.title))
        }
      } catch (error) {
        console.error('Error fetching ticker headlines:', error)
      }
    }
    fetchHeadlines()
  }, [])

  useEffect(() => {
    if (headlines.length === 0) return
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1)
    }, 30)
    return () => clearInterval(interval)
  }, [headlines.length])

  if (headlines.length === 0) return null

  const repeated = [...headlines, ...headlines]

  return (
    <div className="bg-[#003D7A] py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">Breaking News</span>
          </div>
          {/* Divider */}
          <div className="w-px h-4 bg-white/30 flex-shrink-0"></div>
          {/* Scrolling Ticker */}
          <div className="flex-1 overflow-hidden" ref={tickerRef}>
            <div
              className="flex gap-12 whitespace-nowrap"
              style={{ transform: `translateX(-${offset % (headlines.length * 400)}px)` }}
            >
              {repeated.map((headline, index) => (
                <span key={index} className="text-white text-sm font-medium">
                  {headline}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
