/**
 * Header component — WCBI TV
 *
 * Full navigation hardcoded from wcbi.com menu structure.
 * No WordPress dependency — edit this file to update the nav.
 *
 * URL mapping:
 *  - Internal Next.js routes use relative paths (/news, /sports, etc.)
 *  - External / legacy WP pages use full https://www.wcbi.com/... URLs
 */

import { useState } from 'react'
import Image from 'next/image'

interface NavChild {
  label: string
  url: string
  external?: boolean
}

interface NavItem {
  id: string
  label: string
  url: string
  children: NavChild[]
  external?: boolean
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'HOME',
    url: '/',
    children: [],
  },
  {
    id: 'news',
    label: 'NEWS',
    url: '/news',
    children: [
      { label: '2025 Municipal Elections', url: 'https://www.wcbi.com/2025-municipal-elections/', external: true },
      { label: 'Crime', url: 'https://www.wcbi.com/crime/', external: true },
      { label: 'Local News', url: '/news' },
      { label: 'National/World News', url: 'https://www.wcbi.com/national-world-news/', external: true },
      { label: 'MidMorning with WCBI', url: 'https://www.wcbi.com/local-news/midmorning-with-wcbi/', external: true },
      { label: 'Sunrise & Midday Guests', url: 'https://www.wcbi.com/sunrise-midday-guests/', external: true },
      { label: 'WCBI Sunrise Saturday', url: 'https://www.wcbi.com/wcbi-sunrise-saturday/', external: true },
    ],
  },
  {
    id: 'sports',
    label: 'SPORTS',
    url: '/sports',
    children: [
      { label: 'Local Sports', url: '/sports' },
      { label: 'College Sports', url: '/sports' },
      { label: '2025 High School Football Tour', url: 'https://www.wcbi.com/2025-high-school-football-tour/', external: true },
    ],
  },
  {
    id: 'weather',
    label: 'WEATHER',
    url: '/weather-news',
    children: [
      { label: 'Latest Forecast', url: 'https://www.wcbi.com/weather/', external: true },
      { label: 'Interactive Radar & Alerts', url: 'https://www.wcbi.com/weather-radar/', external: true },
      { label: 'Severe Weather Center', url: 'https://www.wcbi.com/severeweather/', external: true },
      { label: 'Area Closings', url: 'https://www.wcbi.com/area-closings/', external: true },
      { label: 'Local River Forecast', url: 'https://www.wcbi.com/rivers/', external: true },
      { label: 'WCBI Weather Radios', url: 'https://www.wcbi.com/weather-radios/', external: true },
      { label: 'Weather Whys', url: 'https://www.wcbi.com/weather-whys/', external: true },
      { label: 'Weather Safety Information', url: 'https://www.wcbi.com/weather-safety-information/', external: true },
    ],
  },
  {
    id: 'contests',
    label: 'CONTESTS',
    url: 'https://www.wcbi.com/contests/',
    external: true,
    children: [
      { label: '2026 March Mayhem 3 in 1', url: 'https://www.wcbi.com/2026-march-mayhem-3-in-1/', external: true },
      { label: 'Monster Jam Ticket Giveaway 2026', url: 'https://www.wcbi.com/monster-jam-ticket-giveaway-2026/', external: true },
      { label: 'Viewers Choice Awards 2026', url: 'https://www.wcbi.com/viewers-choice-awards-2026/', external: true },
      { label: 'WCBI Cutest Couple 2026', url: 'https://www.wcbi.com/wcbi-cutest-couple-2026/', external: true },
      { label: 'FOX 4 Winter Premieres Giveaway', url: 'https://wcbi.secondstreetapp.com/FOX-4-Winter-Premieres/', external: true },
      { label: 'FOX 4 Premiere Week Giveaway', url: 'https://wcbi.secondstreetapp.com/FOX-4-Premiere-Week-2025/', external: true },
      { label: 'Teacher of the Month', url: 'https://wcbi.secondstreetapp.com/TEACHER-OF-THE-MONTH-2025-2026/rounds/1/gallery/', external: true },
      { label: 'Contest Rules & Privacy', url: 'https://www.wcbi.com/wcbi-contests-rules-privacy-and-service/', external: true },
    ],
  },
  {
    id: 'features',
    label: 'FEATURES',
    url: 'https://www.wcbi.com/features/',
    external: true,
    children: [],
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    url: '#',
    children: [
      { label: 'WCBI Cares', url: 'https://www.wcbi.com/wcbi-cares/', external: true },
      { label: 'WCBI CONNECT', url: 'https://www.wcbi.com/connect/', external: true },
      { label: 'WCBI Senior Expo 2025', url: 'https://www.wcbi.com/wcbi-senior-expo-2025/', external: true },
      { label: 'Job Fair 2025', url: 'https://www.wcbi.com/job-fair/', external: true },
      { label: 'Senior Spotlight 2025', url: 'https://wcbi.secondstreetapp.com/Senior-Spotlight-2025/rounds/1/gallery', external: true },
      { label: 'Home, Garden and More Show', url: 'https://www.wcbi.com/home-garden-and-more-show/', external: true },
      { label: 'Local Events', url: 'https://www.wcbi.com/local-events/', external: true },
      { label: 'Obituaries', url: 'https://www.wcbi.com/2026-obituaries/', external: true },
      { label: 'Pets Without Partners', url: 'https://www.wcbi.com/pets-without-partners/', external: true },
      { label: 'Big Deals', url: 'https://wcbi.bigdealsmedia.net/', external: true },
      { label: 'WCBI Medical Expert', url: 'https://www.wcbi.com/lifestyles/wcbi-medical-expert/', external: true },
      { label: 'Hosford Legal Line', url: 'https://www.wcbi.com/lifestyles/hosford-legal-line/', external: true },
      { label: 'Find A Job', url: 'https://www.wcbi.com/find-a-job/', external: true },
    ],
  },
  {
    id: 'channels',
    label: 'CHANNELS',
    url: '#',
    children: [
      { label: 'WCBI Channel Updates', url: 'https://www.wcbi.com/wcbi-channels/', external: true },
      { label: 'CBS Livefeed', url: 'https://www.wcbi.com/cbs-livefeed/', external: true },
      { label: 'Fox 4', url: 'https://www.fox.com/', external: true },
      { label: 'WCBI – LP', url: 'https://www.wcbi.com/wcbi-lp/', external: true },
      { label: "What's On", url: 'https://www.wcbi.com/whats-on/', external: true },
      { label: 'Ion Plus', url: 'https://ionplustv.com/schedule', external: true },
    ],
  },
  {
    id: 'about',
    label: 'ABOUT US',
    url: '#',
    children: [
      { label: 'About WCBI-TV', url: 'https://www.wcbi.com/about-wcbi/', external: true },
      { label: 'Contact Us', url: 'https://www.wcbi.com/about-wcbi/contact-us/', external: true },
      { label: 'Employment', url: 'https://www.wcbi.com/category/employment/', external: true },
      { label: 'WCBI FCC Reports', url: 'https://www.wcbi.com/fcc/', external: true },
      { label: 'Intern With Us', url: 'https://www.wcbi.com/about-wcbi/intern-with-us/', external: true },
      { label: 'Meet the WCBI Team', url: 'https://www.wcbi.com/meet-wcbi-team/', external: true },
      { label: 'Mobile App', url: 'https://www.wcbi.com/mobile-app-2/', external: true },
      { label: 'WCBI – On-Air Guest Rules', url: 'https://www.wcbi.com/on-air-guest-rules/', external: true },
    ],
  },
  {
    id: 'advertise',
    label: 'ADVERTISE',
    url: '#',
    children: [
      { label: 'Broadcast & Digital', url: 'https://www.wcbi.com/about-wcbi/advertise/', external: true },
      { label: 'Outdoor Media', url: 'https://www.wcbi.com/outdoor-media/', external: true },
      { label: 'Video Services of WCBI', url: 'https://www.wcbi.com/videoservices/', external: true },
      { label: 'WCBI Payment Portal', url: 'https://www.wcbi.com/wcbi-payment-portal/', external: true },
    ],
  },
  {
    id: 'live',
    label: 'WCBI LIVE',
    url: 'https://www.wcbi.com/live/',
    external: true,
    children: [],
  },
]

interface Props {
  navItems?: unknown // kept for API compatibility, ignored — menu is hardcoded
}

export default function Header(_props: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50">
      {/* Top Blue Bar */}
      <div className="bg-[#003D7A] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold">72°F</span>
            <span>Partly Cloudy</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/wcbitv" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com/WCBINEWS" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://www.youtube.com/user/wcbitv1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Logo + Leaderboard Ad */}
      <div className="bg-white shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <Image src="/wcbi-logo.png" alt="WCBI Logo" width={256} height={70} className="object-contain" priority />
          </a>
          <div
            id="header-leaderboard-ad"
            className="hidden md:flex items-center justify-center bg-[#F0F0F0] border border-[#DDDDDD] text-[#AAAAAA] text-xs font-medium"
            style={{ width: '728px', height: '90px', flexShrink: 0 }}
          >
            728 × 90 Advertisement
          </div>
          <button className="text-[#003D7A] hover:opacity-80 transition-all hidden md:block" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#003D7A] border-b border-[#002A5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-14 relative">

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-0 justify-center">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.children.length > 0 && setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.url}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="block px-3 py-3.5 text-sm font-bold text-white hover:bg-[#004A9A] border-b-4 border-transparent hover:border-white transition-all whitespace-nowrap"
                  >
                    {item.label}
                    {item.children.length > 0 && (
                      <span className="ml-1 text-xs opacity-70">▾</span>
                    )}
                  </a>

                  {item.children.length > 0 && activeDropdown === item.id && (
                    <ul className="absolute top-full left-0 bg-[#002A5A] shadow-lg min-w-[220px] py-1 z-50">
                      {item.children.map((child, i) => (
                        <li key={i}>
                          <a
                            href={child.url}
                            target={child.external ? '_blank' : undefined}
                            rel={child.external ? 'noopener noreferrer' : undefined}
                            className="block px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004A9A] transition-colors whitespace-nowrap"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className="absolute top-full left-0 right-0 bg-[#004A9A] border-t border-[#002A5A] py-2 shadow-lg z-50 max-h-[80vh] overflow-y-auto">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      {item.children.length > 0 ? (
                        <>
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-white hover:bg-[#003D7A] transition-all text-left"
                            onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                          >
                            <span>{item.label}</span>
                            <span className="text-xs opacity-70">{mobileExpanded === item.id ? '▲' : '▾'}</span>
                          </button>
                          {mobileExpanded === item.id && (
                            <ul className="bg-[#003D7A]">
                              {item.children.map((child, i) => (
                                <li key={i}>
                                  <a
                                    href={child.url}
                                    target={child.external ? '_blank' : undefined}
                                    rel={child.external ? 'noopener noreferrer' : undefined}
                                    className="block px-8 py-2.5 text-sm text-white/80 hover:bg-[#002A5A] transition-all"
                                    onClick={() => setDropdownOpen(false)}
                                  >
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <a
                          href={item.url}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="block px-4 py-3 text-sm font-bold text-white hover:bg-[#003D7A] transition-all"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
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
