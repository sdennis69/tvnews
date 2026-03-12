import { useState } from 'react'

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

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
      {/* Top Header Bar - Dark Blue Background */}
      <div className="bg-[#003D7A] py-3">
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

      {/* Navigation Bar - Dark Blue Background */}
      <nav className="bg-[#003D7A] border-b border-[#002A5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-14 relative">
            {/* Desktop Navigation - Centered */}
            <ul className="hidden md:flex items-center gap-0 justify-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-3.5 text-sm font-bold text-white hover:bg-[#004A9A] border-b-4 border-transparent hover:border-[#003D7A] transition-all whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Dropdown Toggle */}
            <div className="md:hidden relative w-full">
              <button
                className="w-full flex items-center justify-center text-white hover:bg-[#004A9A] transition-all p-2 font-bold"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Toggle menu"
              >
                <span className="mr-2">MENU</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Mobile Dropdown Navigation */}
              {dropdownOpen && (
                <ul className="absolute top-full left-0 right-0 bg-[#004A9A] border-t border-[#002A5A] py-2 shadow-lg">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block px-4 py-3 text-sm font-bold text-white hover:bg-[#003D7A] transition-all"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
