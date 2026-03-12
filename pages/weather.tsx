import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function WeatherPage() {
  return (
    <>
      <Head>
        <title>Weather - TV News</title>
        <meta name="description" content="Local weather forecast and alerts" />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-[#003D7A] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Weather</h1>
            <p className="text-[#003D7A]">Local forecast and severe weather alerts</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Current Conditions */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-4">Current Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#F5F5F5] p-6 rounded border-l-4 border-[#003D7A]">
                <p className="text-[#555555] text-sm mb-2">Temperature</p>
                <p className="text-4xl font-bold text-[#003D7A]">72°F</p>
              </div>
              <div className="bg-[#F5F5F5] p-6 rounded border-l-4 border-[#003D7A]">
                <p className="text-[#555555] text-sm mb-2">Condition</p>
                <p className="text-2xl font-bold text-[#333333]">Partly Cloudy</p>
              </div>
              <div className="bg-[#F5F5F5] p-6 rounded border-l-4 border-[#003D7A]">
                <p className="text-[#555555] text-sm mb-2">Humidity</p>
                <p className="text-4xl font-bold text-[#003D7A]">65%</p>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-4">7-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {[
                { day: 'Mon', icon: '☀️', temp: '72°F' },
                { day: 'Tue', icon: '☀️', temp: '74°F' },
                { day: 'Wed', icon: '⛅', temp: '68°F' },
                { day: 'Thu', icon: '🌧️', temp: '65°F' },
                { day: 'Fri', icon: '⛅', temp: '70°F' },
                { day: 'Sat', icon: '☀️', temp: '75°F' },
                { day: 'Sun', icon: '☀️', temp: '76°F' },
              ].map((item) => (
                <div key={item.day} className="bg-[#F5F5F5] p-4 rounded text-center border border-[#DDDDDD]">
                  <p className="font-bold text-[#333333] mb-2">{item.day}</p>
                  <p className="text-3xl mb-2">{item.icon}</p>
                  <p className="text-sm font-bold text-[#003D7A]">{item.temp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
