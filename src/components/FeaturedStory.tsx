'use client'

import Link from 'next/link'

export default function FeaturedStory() {
  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg-custom">
      {/* Featured Image */}
      <div className="relative h-80 overflow-hidden bg-[#2a2a2a]">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
          alt="Featured Story"
          className="w-full h-full object-cover hover:scale-105 transition-smooth"
          loading="lazy"
          decoding="async"
        />
        {/* Breaking News Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge-breaking">
            <i className="fa fa-circle animate-pulse-live mr-2"></i>
            BREAKING
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#f01d4f] text-white text-xs font-bold px-3 py-1 rounded">
            LOCAL NEWS
          </span>
          <span className="text-[#808080] text-xs">2 hours ago</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3 leading-tight hover:text-[#f01d4f] transition-smooth">
          Major City Development Project Gets Final Approval
        </h2>

        <p className="text-[#b0b0b0] text-sm mb-4 leading-relaxed">
          City council unanimously approves $50 million downtown revitalization project that will bring new jobs and economic growth to the community.
        </p>

        <div className="flex items-center justify-between text-xs text-[#808080]">
          <span><i className="fa fa-user mr-2"></i>By Jane Smith</span>
          <Link href="#" className="text-[#f01d4f] hover:text-[#d41a45] font-semibold">
            Read More <i className="fa fa-arrow-right ml-1"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}
