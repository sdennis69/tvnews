'use client'

import Link from 'next/link'

export default function Footer() {
  const stationName = process.env.NEXT_PUBLIC_STATION_NAME || 'TV Station'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#121212] border-t border-[#333333]">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4 font-display text-lg">{stationName}</h4>
            <p className="text-[#b0b0b0] text-sm leading-relaxed">
              Your trusted source for local news, weather, and entertainment.
            </p>
          </div>

          {/* News */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">News</h4>
            <ul className="space-y-2">
              <li><Link href="/category/local" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">Local News</Link></li>
              <li><Link href="/category/national" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">National</Link></li>
              <li><Link href="/category/sports" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">Sports</Link></li>
              <li><Link href="/category/entertainment" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">Entertainment</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/weather" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">Weather</Link></li>
              <li><Link href="/livestream" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">Live TV</Link></li>
              <li><Link href="/about" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center text-[#f01d4f] hover:bg-[#f01d4f] hover:text-white transition-smooth">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center text-[#f01d4f] hover:bg-[#f01d4f] hover:text-white transition-smooth">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center text-[#f01d4f] hover:bg-[#f01d4f] hover:text-white transition-smooth">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center text-[#f01d4f] hover:bg-[#f01d4f] hover:text-white transition-smooth">
                <i className="fa fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#333333] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-[#808080] text-sm">
            <p>&copy; {currentYear} {stationName}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-[#f01d4f] transition-smooth">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#f01d4f] transition-smooth">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-[#f01d4f] transition-smooth">Sitemap</Link>
            </div>
          </div>
        </div>

        {/* WP Engine Attribution */}
        <div className="mt-8 pt-8 border-t border-[#333333] text-center text-xs text-[#606060]">
          <p>Powered by WP Engine Headless Platform</p>
        </div>
      </div>
    </footer>
  )
}
