import Header from '@/components/Header'
import BreakingNewsTicker from '@/components/BreakingNewsTicker'
import FeaturedStory from '@/components/FeaturedStory'
import SidebarArticles from '@/components/SidebarArticles'
import ArticleList from '@/components/ArticleList'
import Footer from '@/components/Footer'

export default function Home() {
  return (
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
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#333333] mb-4 pb-4 border-b border-[#CCCCCC]">
                Featured Stories
              </h3>
              <SidebarArticles />
            </div>
          </div>
        </div>

        {/* Main Article List */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#333333]">Latest News</h2>
            <a href="#" className="text-[#CC0000] hover:text-[#990000] font-semibold text-sm">
              View All <i className="fa fa-arrow-right ml-1"></i>
            </a>
          </div>
          <ArticleList />
        </div>
      </div>

      <Footer />
    </main>
  )
}
