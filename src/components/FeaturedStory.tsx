'use client'

export default function FeaturedStory() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* Featured Image */}
      <div className="relative h-96 overflow-hidden bg-[#E8E8E8]">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
          alt="Featured Story"
          className="w-full h-full object-cover hover:scale-105 transition-smooth duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1.5 rounded inline-block">
            LOCAL NEWS
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#333333] mb-3 leading-tight hover:text-[#CC0000] transition-smooth">
          Major City Development Project Gets Final Approval
        </h2>

        {/* Excerpt */}
        <p className="text-[#666666] text-base mb-4 leading-relaxed line-clamp-3">
          City council unanimously approves $50 million downtown revitalization project that will bring new jobs and economic growth to the community.
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-[#999999] border-t border-[#CCCCCC] pt-4">
          <span>
            <i className="fa fa-user mr-2"></i>By Jane Smith
          </span>
          <span>2 hours ago</span>
        </div>
      </div>
    </div>
  )
}
