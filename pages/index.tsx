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
          {/* Featured Section - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Main Featured Story - Left Column (2/3 width) */}
            <div className="lg:col-span-2">
              <FeaturedStory />
            </div>

            {/* Sidebar Featured Articles - Right Column (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-[#DDDDDD]">
                <h3 className="text-sm font-bold text-white bg-[#CC0000] px-3 py-2 mb-4 uppercase tracking-wide">
                  Featured Stories
                </h3>
                <SidebarArticles />
              </div>
            </div>
          </div>

          {/* Main Article List */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#CC0000] pb-2">
              <h2 className="text-xl font-bold text-[#333333] uppercase tracking-wide">Latest News</h2>
              <a href="#" className="text-[#CC0000] hover:text-[#990000] font-semibold text-sm">
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
