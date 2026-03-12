import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function VideosPage() {
  return (
    <>
      <Head>
        <title>Videos - TV News</title>
        <meta name="description" content="Watch video news stories and coverage" />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-[#003D7A] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Videos</h1>
            <p className="text-[#003D7A]">Watch our latest video stories and coverage</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Breaking News Coverage', duration: '3:45' },
              { title: 'Weather Alert Update', duration: '2:15' },
              { title: 'Local Community Event', duration: '5:20' },
              { title: 'Sports Highlights', duration: '4:10' },
              { title: 'Interview with Mayor', duration: '6:30' },
              { title: 'Traffic Report', duration: '1:50' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#DDDDDD] hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative h-40 bg-gradient-to-br from-[#003D7A] to-[#004A9A] flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#003D7A] rounded-full flex items-center justify-center group-hover:bg-[#002A5A] transition-colors">
                    <svg className="w-8 h-8 text-[#003D7A]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
                    {item.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#333333]">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
