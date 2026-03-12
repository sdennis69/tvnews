
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden bg-[#ffffff]">
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=600&fit=crop")',
          }}
        ></div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center container-custom">
        <div className="max-w-2xl">
          {/* Breaking News Badge */}
          <div className="mb-4 inline-block">
            <div className="badge-breaking">
              <i className="fa fa-circle animate-pulse-live mr-2"></i>
              BREAKING NEWS
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Major Breakthrough in Local Development Project
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-200 mb-6 max-w-xl leading-relaxed">
            City officials announce significant progress on downtown revitalization initiative, promising new jobs and economic growth for the community.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/article/1"
              className="bg-[#cc0000] hover:bg-[#002A5A] text-white font-bold py-3 px-8 rounded transition-smooth inline-flex items-center gap-2"
            >
              <i className="fa fa-play"></i>
              Read Full Story
            </Link>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#ffffff] font-bold py-3 px-8 rounded transition-smooth inline-flex items-center gap-2">
              <i className="fa fa-video-camera"></i>
              Watch Video
            </button>
          </div>

          {/* Metadata */}
          <div className="mt-8 text-sm text-gray-300 flex items-center gap-4">
            <span><i className="fa fa-clock-o mr-2"></i>Published 2 hours ago</span>
            <span><i className="fa fa-user mr-2"></i>By Jane Smith</span>
          </div>
        </div>
      </div>
    </section>
  )
}
