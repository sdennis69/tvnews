import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function MorePage() {
  return (
    <>
      <Head>
        <title>More - TV News</title>
        <meta name="description" content="More content and features" />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-[#003D7A] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">More</h1>
            <p className="text-[#00DD00]">Additional content and features</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: 'Community Events',
                description: 'Find local events happening in your area',
                icon: '📅'
              },
              { 
                title: 'Contact Us',
                description: 'Get in touch with our news team',
                icon: '📧'
              },
              { 
                title: 'About Us',
                description: 'Learn more about our station',
                icon: 'ℹ️'
              },
              { 
                title: 'Advertise With Us',
                description: 'Reach our audience with your message',
                icon: '📢'
              },
              { 
                title: 'Jobs & Careers',
                description: 'Join our team',
                icon: '💼'
              },
              { 
                title: 'Mobile App',
                description: 'Download our news app',
                icon: '📱'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-[#DDDDDD] hover:shadow-md transition-shadow cursor-pointer group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">{item.title}</h3>
                <p className="text-[#555555]">{item.description}</p>
                <div className="mt-4 text-[#00DD00] font-bold text-sm group-hover:text-[#00BB00]">
                  Learn More →
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
