import Header from '@/components/Header'
import BreakingNewsTicker from '@/components/BreakingNewsTicker'
import HeroSection from '@/components/HeroSection'
import LiveStreamSection from '@/components/LiveStreamSection'
import FeaturedArticles from '@/components/FeaturedArticles'
import WeatherWidget from '@/components/WeatherWidget'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary">
      <Header />
      <BreakingNewsTicker />
      <HeroSection />
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedArticles />
          </div>
          <div className="lg:col-span-1">
            <LiveStreamSection />
            <div className="mt-8">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
