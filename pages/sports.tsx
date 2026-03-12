import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function SportsPage() {
  return (
    <>
      <Head>
        <title>Sports - TV News</title>
        <meta name="description" content="Local and national sports news" />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-[#003D7A] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Sports</h1>
            <p className="text-[#003D7A]">Local and national sports coverage</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Local Team Wins Championship', date: 'Mar 12', category: 'LOCAL' },
              { title: 'College Football Spring Games Begin', date: 'Mar 11', category: 'COLLEGE' },
              { title: 'High School Basketball Finals Tonight', date: 'Mar 11', category: 'HIGH SCHOOL' },
              { title: 'Pro Sports Roundup', date: 'Mar 10', category: 'NATIONAL' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#DDDDDD] hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-r from-[#003D7A] to-[#004A9A]"></div>
                <div className="p-4">
                  <span className="inline-block bg-[#003D7A] text-[#003D7A] text-xs font-bold px-3 py-1 rounded mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#999999]">{item.date}</p>
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
