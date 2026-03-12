'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'NEWS', href: '/news' },
    { label: 'WEATHER', href: '/weather' },
    { label: 'SPORTS', href: '/sports' },
    { label: 'VIDEOS', href: '/videos' },
    { label: 'FEATURES', href: '/features' },
    { label: 'MORE', href: '/more' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Header Bar - Maroon Background */}
      <div className="bg-[#8B0000] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-white">41</span>
              <span className="text-lg font-bold text-white ml-1">NBC</span>
            </div>
          </Link>

          {/* Search Icon */}
          <button className="text-white hover:opacity-80 transition-smooth hidden md:block">
            <i className="fa fa-search text-xl"></i>
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
                  <Link
                    href={item.href}
                    className="px-4 py-3.5 text-sm font-bold text-[#333333] hover:text-[#CC0000] border-b-4 border-transparent hover:border-[#CC0000] transition-smooth whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[#333333] hover:text-[#CC0000] transition-smooth"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <ul className="md:hidden bg-white border-t border-[#CCCCCC] py-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-bold text-[#333333] hover:bg-[#F5F5F5] hover:text-[#CC0000] transition-smooth"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  )
}
