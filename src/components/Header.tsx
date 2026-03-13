import { useState } from 'react'
import Image from 'next/image'

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
    <header className="sticky top-0 z-50">
      {/* Top Blue Bar - Temperature and Social Links */}
      <div className="bg-[#003D7A] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-white text-sm">
          {/* Temperature */}
          <div className="flex items-center gap-2">
            <span className="font-bold">72°F</span>
            <span>Partly Cloudy</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar - White Background */}
      <div className="bg-white shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <Image src="/wcbi-logo.png" alt="WCBI Logo" width={220} height={48} className="h-12 w-auto object-contain" priority />
          </a>

          {/* 728x90 Leaderboard Ad */}
          <div
            id="header-leaderboard-ad"
            className="hidden md:flex items-center justify-center bg-[#F0F0F0] border border-[#DDDDDD] text-[#AAAAAA] text-xs font-medium"
            style={{ width: '728px', height: '90px', flexShrink: 0 }}
          >
            {/* Paste your 728×90 Google Ad code here */}
            728 × 90 Advertisement
          </div>

          {/* Search Icon */}
          <button className="text-[#003D7A] hover:opacity-80 transition-all hidden md:block" aria-label="Search">
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
