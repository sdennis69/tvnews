'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const stationName = process.env.NEXT_PUBLIC_STATION_NAME || 'TV Station'
  const stationLogo = process.env.NEXT_PUBLIC_STATION_LOGO

  const navItems = [
    { 
      label: 'Home', 
      href: '/',
      icon: 'fa-home'
    },
    { 
      label: 'NEWS', 
      href: '/category/local',
      submenu: [
        { label: 'Local News', href: '/category/local' },
        { label: 'Across Georgia', href: '/category/georgia' },
        { label: 'National News', href: '/category/national' },
        { label: 'Around the World', href: '/category/world' },
      ]
    },
    { 
      label: 'ACCUWEATHER', 
      href: '/weather',
      submenu: [
        { label: 'Weather', href: '/weather' },
        { label: 'Storm Center', href: '/weather/storms' },
        { label: 'Radar', href: '/weather/radar' },
        { label: 'Forecast', href: '/weather/forecast' },
      ]
    },
    { 
      label: 'SPORTS', 
      href: '/category/sports',
      submenu: [
        { label: 'Sports', href: '/category/sports' },
        { label: 'High School Football', href: '/category/football' },
        { label: 'Local Sports', href: '/category/local-sports' },
      ]
    },
    { 
      label: 'VIDEOS', 
      href: '/videos'
    },
    { 
      label: 'FEATURES', 
      href: '#',
      submenu: [
        { label: 'Discover Middle Georgia', href: '/discover' },
        { label: 'Community Events', href: '/events' },
        { label: 'Special Reports', href: '/reports' },
      ]
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#1e1e1e] border-b border-[#333333] shadow-lg">
      {/* Top bar with logo and search */}
      <div className="bg-[#121212] border-b border-[#333333]">
        <div className="container-custom py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {stationLogo && (
              <img 
                src={stationLogo} 
                alt={stationName}
                className="h-12 w-auto"
              />
            )}
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white group-hover:text-[#f01d4f] transition-smooth">
                {stationName}
              </h1>
              <p className="text-xs text-[#b0b0b0]">News • Weather • Sports</p>
            </div>
          </Link>

          {/* Search and mobile menu toggle */}
          <div className="flex items-center gap-4">
            <button className="text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth hidden md:block">
              <i className="fa fa-search text-lg"></i>
            </button>
            <button 
              className="md:hidden text-[#b0b0b0] hover:text-[#f01d4f] transition-smooth"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="hidden md:block bg-[#1e1e1e]">
        <div className="container-custom">
          <ul className="flex items-center gap-0">
            {navItems.map((item) => (
              <li 
                key={item.label}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-4 text-sm font-semibold text-[#f1f5f9] hover:text-[#f01d4f] border-b-4 border-transparent hover:border-[#f01d4f] transition-all"
                >
                  {item.icon && <i className={`fa ${item.icon}`}></i>}
                  {item.label}
                </Link>

                {/* Dropdown menu */}
                {item.submenu && (
                  <ul className="absolute left-0 top-full bg-[#2a2a2a] border border-[#333333] rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-max">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.label}>
                        <Link
                          href={subitem.href}
                          className="block px-4 py-3 text-sm text-[#f1f5f9] hover:text-[#f01d4f] hover:bg-[#1e1e1e] transition-all border-l-4 border-transparent hover:border-[#f01d4f]"
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#2a2a2a] border-t border-[#333333]">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-semibold text-[#f1f5f9] hover:text-[#f01d4f] hover:bg-[#1e1e1e] border-l-4 border-transparent hover:border-[#f01d4f] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <ul className="bg-[#1e1e1e] border-t border-[#333333]">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.label}>
                        <Link
                          href={subitem.href}
                          className="block px-6 py-2 text-xs text-[#b0b0b0] hover:text-[#f01d4f] transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
