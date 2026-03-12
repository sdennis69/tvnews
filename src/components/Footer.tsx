
import Link from 'next/link'

export default function Footer() {
  const stationName = process.env.NEXT_PUBLIC_STATION_NAME || 'TV Station'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#333333] text-white border-t border-[#555555]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold mb-4">{stationName}</h4>
            <p className="text-[#CCCCCC] text-sm leading-relaxed">
              Your trusted source for local news, weather, and entertainment.
            </p>
          </div>

          {/* News */}
          <div>
            <h4 className="text-lg font-bold mb-4">News</h4>
            <ul className="space-y-2">
              <li><Link href="/category/local" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">Local News</Link></li>
              <li><Link href="/category/national" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">National</Link></li>
              <li><Link href="/category/sports" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">Sports</Link></li>
              <li><Link href="/category/entertainment" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">Entertainment</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/weather" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">Weather</Link></li>
              <li><Link href="/livestream" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">Live TV</Link></li>
              <li><Link href="/about" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-[#CCCCCC] hover:text-[#00DD00] transition-smooth text-lg">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 text-[#CCCCCC] rounded-full flex items-center justify-center text-[#00DD00] hover:bg-[#cc0000] hover:text-white transition-smooth">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 text-[#CCCCCC] rounded-full flex items-center justify-center text-[#00DD00] hover:bg-[#cc0000] hover:text-white transition-smooth">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 text-[#CCCCCC] rounded-full flex items-center justify-center text-[#00DD00] hover:bg-[#cc0000] hover:text-white transition-smooth">
                <i className="fa fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#555555] pt-8 text-center text-sm text-[#CCCCCC]">
          <p className="mb-2">
            &copy; {currentYear} {stationName}. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-[#00DD00] transition-smooth">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-[#00DD00] transition-smooth">Terms of Service</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-[#00DD00] transition-smooth">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
