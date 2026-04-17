
import Link from 'next/link'

export default function Footer() {
  const stationName = process.env.NEXT_PUBLIC_STATION_NAME || 'TV Station'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0D1E35] text-white border-t-2 border-[#DC2626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#DC2626] mb-4">WCBI TV</h4>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Columbus, Mississippi's trusted source for local news, weather, and sports.
            </p>
          </div>

          {/* News */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#DC2626] mb-4">News</h4>
            <ul className="space-y-2">
              <li><Link href="/news"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">Local News</a></Link></li>
              <li><Link href="/crime"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">Crime</a></Link></li>
              <li><Link href="/national-world-news"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">National &amp; World</a></Link></li>
              <li><Link href="/sports"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">Sports</a></Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#DC2626] mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/weather"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">Weather</a></Link></li>
              <li><Link href="/livestream"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">Live TV</a></Link></li>
              <li><Link href="/about-wcbi"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">About Us</a></Link></li>
              <li><Link href="/about-wcbi/contact-us"><a className="text-[#9CA3AF] hover:text-white transition-colors text-sm">Contact</a></Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#DC2626] mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/wcbitv" target="_blank" rel="noopener noreferrer" aria-label="WCBI on Facebook" className="w-8 h-8 bg-[#152844] hover:bg-[#DC2626] rounded flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com/WCBINEWS" target="_blank" rel="noopener noreferrer" aria-label="WCBI on Twitter" className="w-8 h-8 bg-[#152844] hover:bg-[#DC2626] rounded flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://www.youtube.com/user/wcbitv1" target="_blank" rel="noopener noreferrer" aria-label="WCBI on YouTube" className="w-8 h-8 bg-[#152844] hover:bg-[#DC2626] rounded flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#1E3A5F] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#4B5563] text-xs">&copy; {currentYear} WCBI TV. All rights reserved. Columbus, MS.</p>
          <div className="flex gap-5 text-xs">
            <Link href="/about-wcbi/privacy-policy-2"><a className="text-[#4B5563] hover:text-[#9CA3AF] transition-colors">Privacy Policy</a></Link>
            <Link href="/terms-of-use"><a className="text-[#4B5563] hover:text-[#9CA3AF] transition-colors">Terms of Service</a></Link>
            <Link href="/fcc"><a className="text-[#4B5563] hover:text-[#9CA3AF] transition-colors">FCC Public File</a></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
