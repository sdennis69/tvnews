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

          {/* Featured Section — full width above the sidebar layout */}
          <div className="mb-[30px]">
            {/* FEATURED label */}
            <div className="mb-4">
              <span className="bg-[#003D7A] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest inline-block">
                Featured
              </span>
            </div>
            {/* Two-column layout: large story left, 4 smaller right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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

          {/* Latest News + Right Sidebar */}
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Latest News (main column) */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <span className="bg-[#003D7A] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest inline-block">
                  Latest News
                </span>
              </div>
              <ArticleList />
            </div>

            {/* Right Sidebar */}
            <aside className="w-full md:w-72 md:flex-shrink-0 space-y-6 md:sticky md:top-4">

              {/* Revcontent Widget Slot 1 */}
              <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                <div className="bg-[#003D7A] px-3 py-2 flex items-center justify-between">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Trending</span>
                  <span className="text-white/60 text-xs">Ads By Revcontent</span>
                </div>
                {/* ↓ Paste your Revcontent embed code here ↓ */}
                <div
                  id="revcontent-widget-home-1"
                  className="min-h-[300px] flex items-center justify-center text-[#AAAAAA] text-xs p-4 text-center"
                >
                  <span>Revcontent Widget 1<br />(paste embed code in index.tsx → revcontent-widget-home-1)</span>
                </div>
              </div>

              {/* Revcontent Widget Slot 2 */}
              <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                <div className="bg-[#003D7A] px-3 py-2 flex items-center justify-between">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Sponsored</span>
                  <span className="text-white/60 text-xs">Ads By Revcontent</span>
                </div>
                {/* ↓ Paste your Revcontent embed code here ↓ */}
                <div
                  id="revcontent-widget-home-2"
                  className="min-h-[300px] flex items-center justify-center text-[#AAAAAA] text-xs p-4 text-center"
                >
                  <span>Revcontent Widget 2<br />(paste embed code in index.tsx → revcontent-widget-home-2)</span>
                </div>
              </div>

              {/* Generic Ad / Widget Slot */}
              <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                <div className="bg-[#003D7A] px-3 py-2">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Advertisement</span>
                </div>
                <div
                  id="homepage-ad-slot-1"
                  className="min-h-[250px] flex items-center justify-center text-[#AAAAAA] text-xs p-4 text-center"
                >
                  <span>Ad Unit<br />(300×250 or 300×600)</span>
                </div>
              </div>

            </aside>
          </div>

        </div>

        <Footer />
      </main>
    </>
  )
}
