'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=600&fit=crop")',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center container-custom">
        <div className="max-w-2xl">
          <div className="inline-block bg-primary px-4 py-2 rounded-sm mb-4">
            <span className="text-white font-bold text-sm uppercase tracking-wider">LOCAL NEWS</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Major Breakthrough in Local Development Project
          </h1>
          
          <p className="text-lg text-gray-200 mb-6 max-w-xl">
            City officials announce significant progress on downtown revitalization initiative, promising new jobs and economic growth for the community.
          </p>
          
          <div className="flex gap-4">
            <Link
              href="/article/1"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-sm transition-smooth"
            >
              Read Full Story
            </Link>
            <button className="border-2 border-white text-white hover:bg-white hover:text-secondary font-bold py-3 px-8 rounded-sm transition-smooth">
              Watch Video
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-300">
            <p>Published 2 hours ago by Jane Smith</p>
          </div>
        </div>
      </div>
    </section>
  )
}
