'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const stationName = process.env.NEXT_PUBLIC_STATION_NAME || 'TV Station'
  const stationLogo = process.env.NEXT_PUBLIC_STATION_LOGO

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Local News', href: '/category/local' },
    { label: 'National', href: '/category/national' },
    { label: 'Sports', href: '/category/sports' },
    { label: 'Weather', href: '/weather' },
    { label: 'Entertainment', href: '/category/entertainment' },
    { label: 'Live TV', href: '/live' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="bg-secondary-light border-b-4 border-primary sticky top-0 z-50 shadow-lg-custom">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {stationLogo && (
              <img 
                src={stationLogo} 
                alt={stationName}
                className="h-12 w-auto transition-smooth group-hover:opacity-80"
              />
            )}
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white font-display">{stationName}</h1>
              <p className="text-xs text-gray-400">Local News Network</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-secondary transition-smooth"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-secondary transition-smooth"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-secondary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-secondary transition-smooth"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
