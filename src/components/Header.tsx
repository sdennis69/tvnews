import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'NEWS', href: '/news' },
    { label: 'WEATHER', href: '/weather' },
    { label: 'SPORTS', href: '/sports' },
    { label: 'VIDEOS', href: '/videos' },
    { label: 'LIVESTREAM', href: '/livestream' },
    { label: 'MORE', href: '/more' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Header Bar - Maroon Background */}
      <div className="bg-[#8B0000] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-white leading-none">41</span>
              <span className="text-lg font-bold text-white ml-1">NBC</span>
            </div>
          </a>

          {/* Search Icon */}
          <button className="text-white hover:opacity-80 transition-all hidden md:block" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Bar - White Background */}
      <nav className="bg-white border-b border-[#CCCCCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-0">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-3.5 text-sm font-bold text-[#333333] hover:text-[#CC0000] border-b-4 border-transparent hover:border-[#CC0000] transition-all whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[#333333] hover:text-[#CC0000] transition-all p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <ul className="md:hidden bg-white border-t border-[#CCCCCC] py-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-sm font-bold text-[#333333] hover:bg-[#F5F5F5] hover:text-[#CC0000] transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  )
}
