
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
            <p className="text-[#DDDDDD] text-sm leading-relaxed">
              Your trusted source for local news, weather, and entertainment.
            </p>
          </div>

          {/* News */}
          <div>
            <h4 className="text-lg font-bold mb-4">News</h4>
            <ul className="space-y-2">
              <li><Link href="/category/local" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">Local News</Link></li>
              <li><Link href="/category/national" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">National</Link></li>
              <li><Link href="/category/sports" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">Sports</Link></li>
              <li><Link href="/category/entertainment" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">Entertainment</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/weather" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">Weather</Link></li>
              <li><Link href="/livestream" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">Live TV</Link></li>
              <li><Link href="/about-wcbi" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">About Us</Link></li>
              <li><Link href="/about-wcbi/contact-us" className="text-[#DDDDDD] hover:text-white transition-smooth text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/wcbitv" target="_blank" rel="noopener noreferrer" aria-label="WCBI on Facebook" className="text-[#CCCCCC] hover:text-[#003D7A] transition-smooth text-lg">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="https://twitter.com/WCBINEWS" target="_blank" rel="noopener noreferrer" aria-label="WCBI on Twitter" className="w-10 h-10 text-[#CCCCCC] rounded-full flex items-center justify-center hover:bg-[#cc0000] hover:text-white transition-smooth">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/wcbi" target="_blank" rel="noopener noreferrer" aria-label="WCBI on Instagram" className="w-10 h-10 text-[#CCCCCC] rounded-full flex items-center justify-center hover:bg-[#cc0000] hover:text-white transition-smooth">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.youtube.com/user/wcbitv1" target="_blank" rel="noopener noreferrer" aria-label="WCBI on YouTube" className="w-10 h-10 text-[#CCCCCC] rounded-full flex items-center justify-center hover:bg-[#cc0000] hover:text-white transition-smooth">
                <i className="fa fa-youtube" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#555555] pt-8 text-center text-sm text-[#DDDDDD]">
          <p className="mb-2">
            &copy; {currentYear} {stationName}. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <Link href="/about-wcbi/privacy-policy-2" className="hover:text-[#003D7A] transition-smooth">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-of-use" className="hover:text-[#003D7A] transition-smooth">Terms of Service</Link>
            <span>|</span>
            <Link href="/about-wcbi/contact-us" className="hover:text-[#003D7A] transition-smooth">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
