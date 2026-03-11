import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LiveStreamSection from '@/components/LiveStreamSection'

export const metadata = {
  title: 'Live TV - TV Station',
  description: 'Watch live news coverage and breaking news updates',
}

export default function LivestreamPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Header />
      
      <div className="container-custom py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-display">Watch Live</h1>
          <p className="text-gray-400">Watch our live news coverage and breaking news updates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LiveStreamSection />
            
            <div className="mt-12 bg-secondary-light rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-display">Broadcasting Schedule</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold text-white">Morning News</h3>
                  <p className="text-gray-400 text-sm">Monday - Friday, 6:00 AM - 9:00 AM</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold text-white">Midday Update</h3>
                  <p className="text-gray-400 text-sm">Monday - Friday, 12:00 PM - 1:00 PM</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold text-white">Evening News</h3>
                  <p className="text-gray-400 text-sm">Monday - Friday, 5:00 PM - 6:00 PM</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold text-white">Weekend News</h3>
                  <p className="text-gray-400 text-sm">Saturday & Sunday, 6:00 PM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-secondary-light rounded-lg p-6 sticky top-20">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 font-display">About Live TV</h3>
              
              <p className="text-gray-400 text-sm mb-4">
                Watch our live news broadcasts and stay updated with breaking news as it happens. Our experienced journalists bring you the stories that matter most to our community.
              </p>
              
              <div className="space-y-3 pt-4 border-t border-secondary">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Contact</p>
                  <p className="text-white font-bold">news@tvstation.com</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Phone</p>
                  <p className="text-white font-bold">(555) 123-4567</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Follow Us</p>
                  <div className="flex gap-3 mt-2">
                    <a href="#" className="text-primary hover:text-primary-dark transition-smooth">Facebook</a>
                    <a href="#" className="text-primary hover:text-primary-dark transition-smooth">Twitter</a>
                    <a href="#" className="text-primary hover:text-primary-dark transition-smooth">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
