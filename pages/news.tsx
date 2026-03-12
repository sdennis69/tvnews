import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import ArticleList from '../src/components/ArticleList'

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>News - TV News</title>
        <meta name="description" content="Latest news stories and breaking news updates" />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-[#003D7A] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Latest News</h1>
            <p className="text-[#003D7A]">Stay updated with breaking stories from your community</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 border-b-2 border-[#003D7A] pb-2">
            <h2 className="text-2xl font-bold text-[#333333] uppercase tracking-wide">All News Stories</h2>
          </div>
          <ArticleList />
        </div>

        <Footer />
      </main>
    </>
  )
}
