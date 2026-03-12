import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import LiveStreamSection from '../src/components/LiveStreamSection'

export default function LivestreamPage() {
  return (
    <>
      <Head>
        <title>{`Watch Live - ${process.env.NEXT_PUBLIC_STATION_NAME || 'TV News'}`}</title>
        <meta name="description" content="Watch live news coverage and breaking news updates." />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 border-b-2 border-[#003D7A] pb-2">
            <h1 className="text-2xl font-bold text-[#333333] uppercase tracking-wide">Watch Live</h1>
            <p className="text-[#555555] text-sm mt-1">Live news coverage and breaking news updates</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Stream Player */}
            <div className="lg:col-span-2">
              <LiveStreamSection />

              {/* Broadcasting Schedule */}
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-[#DDDDDD]">
                <h2 className="text-sm font-bold text-white bg-[#003D7A] px-3 py-2 mb-4 uppercase tracking-wide">
                  Broadcasting Schedule
                </h2>
                <div className="space-y-4">
                  {[
                    { time: '5:00 AM – 7:00 AM', show: 'Morning News', desc: 'Start your day with local and national news' },
                    { time: '12:00 PM – 12:30 PM', show: 'Midday Report', desc: 'Breaking news and weather updates' },
                    { time: '5:00 PM – 6:00 PM', show: 'Evening News', desc: 'Comprehensive evening news coverage' },
                    { time: '6:00 PM – 6:30 PM', show: 'Sports Report', desc: 'Local and national sports highlights' },
                    { time: '10:00 PM – 10:30 PM', show: 'Late News', desc: 'End your day with the latest headlines' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start border-l-4 border-[#003D7A] pl-4">
                      <div>
                        <p className="text-sm font-bold text-[#003D7A]">{item.time}</p>
                        <p className="font-bold text-[#333333]">{item.show}</p>
                        <p className="text-sm text-[#555555]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#DDDDDD]">
                <h3 className="text-sm font-bold text-white bg-[#003D7A] px-3 py-2 mb-4 uppercase tracking-wide">
                  Stream Info
                </h3>
                <div className="space-y-3 text-sm text-[#555555]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#003D7A] rounded-full animate-pulse"></span>
                    <span>Live 24/7 News Coverage</span>
                  </div>
                  <p>Our live stream brings you continuous news coverage from your local community and around the world.</p>
                  <p>Having trouble viewing? Try refreshing the page or check your internet connection.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#DDDDDD]">
                <h3 className="text-sm font-bold text-white bg-[#003D7A] px-3 py-2 mb-4 uppercase tracking-wide">
                  Contact Us
                </h3>
                <div className="space-y-2 text-sm text-[#555555]">
                  <p><strong className="text-[#333333]">News Tips:</strong><br />news@tvstation.com</p>
                  <p><strong className="text-[#333333]">Technical Issues:</strong><br />tech@tvstation.com</p>
                  <p><strong className="text-[#333333]">Phone:</strong><br />(555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
