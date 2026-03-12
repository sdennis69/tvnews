import Header from '@/components/Header'
import BreakingNewsTicker from '@/components/BreakingNewsTicker'
import FeaturedStory from '@/components/FeaturedStory'
import SidebarArticles from '@/components/SidebarArticles'
import ArticleList from '@/components/ArticleList'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <Header />
      <BreakingNewsTicker />

      {/* Main Content Area */}
      <div className="container-custom py-8">
        {/* Featured Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Featured Story - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            <FeaturedStory />
          </div>

          {/* Sidebar Featured Articles - Right Column (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-[#1e1e1e] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4 pb-4 border-b border-[#333333]">
                Featured Stories
              </h3>
              <SidebarArticles />
            </div>
          </div>
        </div>

        {/* Main Article List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Latest News</h2>
            <a href="#" className="text-[#f01d4f] hover:text-[#d41a45] font-semibold text-sm">
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
