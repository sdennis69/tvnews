import Head from 'next/head'
import Header from '../src/components/Header'
import BreakingNewsTicker from '../src/components/BreakingNewsTicker'
import FeaturedStory from '../src/components/FeaturedStory'
import SidebarArticles from '../src/components/SidebarArticles'
import ArticleList from '../src/components/ArticleList'
import Footer from '../src/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_STATION_NAME || 'TV News'} - Local News, Weather & More`}</title>
        <meta name="description" content="Your local source for breaking news, weather, sports, and community stories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        <BreakingNewsTicker />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Featured Section */}
          <div className="mb-12">
            {/* FEATURED label */}
            <div className="mb-4">
              <span className="bg-[#003D7A] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest inline-block">
                Featured
              </span>
            </div>
            {/* Two-column layout: large story left, 4 smaller right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left: Large Featured Story */}
              <div>
                <FeaturedStory />
              </div>
              {/* Right: 4 Smaller Articles */}
              <div>
                <SidebarArticles />
              </div>
            </div>
          </div>

          {/* Main Article List */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#003D7A] pb-2">
              <h2 className="text-xl font-bold text-[#333333] uppercase tracking-wide">Latest News</h2>
              <a href="#" className="text-[#003D7A] hover:text-[#002A5A] font-semibold text-sm">
                View All →
              </a>
            </div>
            <ArticleList />
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
