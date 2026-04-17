/**
 * Header component — WWAYTV3
 *
 * Full navigation hardcoded from wwaytv3.com menu structure.
 * No WordPress dependency — edit this file to update the nav.
 *
 * URL mapping:
 *  - Internal Next.js routes use relative paths (/news, /sports, etc.)
 *  - External / legacy WP pages use full https://www.wwaytv3.com/... URLs
 */

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
      { label: '2025 Municipal Elections', url: '/2025-municipal-elections' },
      { label: 'Crime', url: '/crime' },
      { label: 'Local News', url: '/news' },
      { label: 'National/World News', url: '/national-world-news' },
      { label: 'MidMorning with WWAY', url: '/local-news/midmorning-with-wcbi' },
      { label: 'Sunrise & Midday Guests', url: '/sunrise-midday-guests' },
      { label: 'WWAY Sunrise Saturday', url: '/wcbi-sunrise-saturday' },
    ],
  },
  {
    id: 'sports',
    label: 'SPORTS',
    url: '/sports',
    children: [
      { label: 'Local Sports', url: '/sports' },
      { label: 'College Sports', url: '/sports' },
      { label: '2025 High School Football Tour', url: '/2025-high-school-football-tour' },
    ],
  },
  {
    id: 'weather',
    label: 'WEATHER',
    url: '/weather-news',
    children: [
      { label: 'Latest Forecast', url: '/weather' },
      { label: 'Interactive Radar & Alerts', url: '/weather-radar' },
      { label: 'Severe Weather Center', url: '/severeweather' },
      { label: 'Area Closings', url: '/area-closings' },
      { label: 'Local River Forecast', url: '/rivers' },
      { label: 'WWAY Weather Radios', url: '/weather-radios' },
      { label: 'Weather Whys', url: '/weather-whys' },
      { label: 'Weather Safety Information', url: '/weather-safety-information' },
    ],
  },
  {
    id: 'contests',
    label: 'CONTESTS',
    url: '/contests',
    children: [
      { label: '2026 March Mayhem 3 in 1', url: '/2026-march-mayhem-3-in-1' },
      { label: 'Monster Jam Ticket Giveaway 2026', url: '/monster-jam-ticket-giveaway-2026' },
      { label: 'Viewers Choice Awards 2026', url: '/viewers-choice-awards-2026' },
      { label: 'WWAY Cutest Couple 2026', url: '/wcbi-cutest-couple-2026' },
      { label: 'FOX 4 Winter Premieres Giveaway', url: 'https://wcbi.secondstreetapp.com/FOX-4-Winter-Premieres/', external: true },
      { label: 'FOX 4 Premiere Week Giveaway', url: 'https://wcbi.secondstreetapp.com/FOX-4-Premiere-Week-2025/', external: true },
      { label: 'Teacher of the Month', url: 'https://wcbi.secondstreetapp.com/TEACHER-OF-THE-MONTH-2025-2026/rounds/1/gallery/', external: true },
      { label: 'Contest Rules & Privacy', url: '/wway-contests-rules-privacy-and-service' },
    ],
  },
  {
    id: 'features',
    label: 'FEATURES',
    url: '/features',
    children: [],
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    url: '#',
    children: [
      { label: 'WWAY Cares', url: '/wcbi-cares' },
      { label: 'WWAY CONNECT', url: '/connect' },
      { label: 'WWAY Senior Expo 2025', url: '/wcbi-senior-expo-2025' },
      { label: 'Job Fair 2025', url: '/job-fair' },
      { label: 'Senior Spotlight 2025', url: 'https://wcbi.secondstreetapp.com/Senior-Spotlight-2025/rounds/1/gallery', external: true },
      { label: 'Home, Garden and More Show', url: '/home-garden-and-more-show' },
      { label: 'Local Events', url: '/local-events' },
      { label: 'Obituaries', url: '/2026-obituaries' },
      { label: 'Pets Without Partners', url: '/pets-without-partners' },
      { label: 'Big Deals', url: 'https://wcbi.bigdealsmedia.net/', external: true },
      { label: 'WWAY Medical Expert', url: '/lifestyles/wcbi-medical-expert' },
      { label: 'Hosford Legal Line', url: '/lifestyles/hosford-legal-line' },
      { label: 'Find A Job', url: '/find-a-job' },
    ],
  },
  {
    id: 'channels',
    label: 'CHANNELS',
    url: '#',
    children: [
      { label: 'WWAY Channel Updates', url: '/wcbi-channels' },
      { label: 'CBS Livefeed', url: '/cbs-livefeed' },
      { label: 'Fox 4', url: 'https://www.fox.com/', external: true },
      { label: 'WWAY – LP', url: '/wcbi-lp' },
      { label: "What's On", url: '/whats-on' },
      { label: 'Ion Plus', url: 'https://ionplustv.com/schedule', external: true },
    ],
  },
  {
    id: 'about',
    label: 'ABOUT US',
    url: '#',
    children: [
      { label: 'About WWAYTV3', url: '/about-wcbi' },
      { label: 'Contact Us', url: '/about-wcbi/contact-us' },
      { label: 'Employment', url: '/category/employment' },
      { label: 'WWAYTV3 FCC Reports', url: '/fcc' },
      { label: 'Intern With Us', url: '/about-wcbi/intern-with-us' },
      { label: 'Meet the WWAYTV3 Team', url: '/meet-wcbi-team' },
      { label: 'Mobile App', url: '/mobile-app-2' },
      { label: 'WWAY – On-Air Guest Rules', url: '/on-air-guest-rules' },
    ],
  },
  {
    id: 'advertise',
    label: 'ADVERTISE',
    url: '#',
    children: [
      { label: 'Broadcast & Digital', url: '/about-wcbi/advertise' },
      { label: 'Outdoor Media', url: '/outdoor-media' },
      { label: 'Video Services of WWAYTV3', url: '/videoservices' },
      { label: 'WWAYTV3 Payment Portal', url: '/wcbi-payment-portal' },
    ],
  },
  {
    id: 'live',
    label: 'WWAY LIVE',
    url: '/live',
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('wway-theme') : null
    const initial: 'light' | 'dark' = saved === 'light' ? 'light' : 'dark'
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggleTheme = () => {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('wway-theme', next)
  }

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: 'hsl(var(--background))', borderBottom: '1px solid hsl(var(--border))' }}>
      {/* Top Utility Bar */}
      <div style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }} className="py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2" style={{ color: 'hsl(var(--primary-foreground) / 0.7)' }}>
            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm0 15a5 5 0 100-10 5 5 0 000 10zm7.07-12.07a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0zM21 11h1a1 1 0 010 2h-1a1 1 0 010-2zM4.93 4.93a1 1 0 011.41 0l.71.71A1 1 0 015.64 7.05l-.71-.71a1 1 0 010-1.41zM3 11H2a1 1 0 000 2h1a1 1 0 000-2zm1.93 6.07l.71-.71a1 1 0 011.41 1.41l-.71.71a1 1 0 01-1.41-1.41zM12 20a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm7.07-1.93a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0z"/></svg>
            <span>72°F Partly Cloudy</span>
          </div>
          <div className="flex items-center gap-4" style={{ color: 'hsl(var(--primary-foreground) / 0.7)' }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className="flex items-center gap-1.5 text-xs font-semibold hover:text-white transition-colors"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            <a href="https://www.facebook.com/wwaytv3" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WWAYTV3 on Facebook">
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com/WWAYTV3" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WWAYTV3 on Twitter">
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://www.youtube.com/user/wwaytv3" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WWAYTV3 on YouTube">
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Logo + Leaderboard Ad */}
      <div className="py-3" style={{ backgroundColor: 'hsl(var(--background))', borderBottom: '1px solid hsl(var(--border))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <Image src="/wwaytv3-logo.webp" alt="WWAYTV3 Logo" width={300} height={72} className="object-contain" priority />
          </a>
          <div
            id="header-leaderboard-ad"
            className="hidden md:flex items-center justify-center text-xs font-medium"
            style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))', width: '728px', height: '90px', flexShrink: 0 }}
          >
            728 × 90 Advertisement
          </div>
          <button className="hidden md:block transition-all" aria-label="Search" style={{ color: 'hsl(var(--primary-foreground) / 0.7)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav style={{ backgroundColor: 'hsl(var(--primary))', borderBottom: '2px solid hsl(var(--breaking))' }}>
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
                    className="block px-3 py-3.5 text-xs font-bold border-b-2 border-transparent transition-all whitespace-nowrap tracking-widest"
                    style={{ color: 'hsl(var(--primary-foreground))', borderBottomColor: 'transparent' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(var(--breaking))'; (e.currentTarget as HTMLElement).style.borderBottomColor = 'hsl(var(--breaking))'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(var(--primary-foreground))'; (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}
                  >
                    {item.label}
                    {item.children.length > 0 && (
                      <span className="ml-1 text-xs opacity-70">▾</span>
                    )}
                  </a>

                  {item.children.length > 0 && activeDropdown === item.id && (
                    <ul className="absolute top-full left-0 min-w-[200px] py-1 z-50 shadow-lg" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderTop: '2px solid hsl(var(--breaking))' }}>
                      {item.children.map((child, i) => (
                        <li key={i}>
                          <a
                            href={child.url}
                            target={child.external ? '_blank' : undefined}
                            rel={child.external ? 'noopener noreferrer' : undefined}
                            className="block px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap tracking-wide"
                            style={{ color: 'hsl(var(--card-foreground) / 0.8)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(var(--secondary))'; (e.currentTarget as HTMLElement).style.color = 'hsl(var(--breaking))'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'hsl(var(--card-foreground) / 0.8)'; }}
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
                className="w-full flex items-center justify-center transition-all p-2 font-bold"
              style={{ color: 'hsl(var(--primary-foreground))' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Toggle menu"
              >
                <span className="mr-2 text-xs tracking-widest">MENU</span>
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
                <ul className="absolute top-full left-0 right-0 py-2 shadow-lg z-50 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: 'hsl(var(--card))', borderTop: '2px solid hsl(var(--breaking))' }}>
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      {item.children.length > 0 ? (
                        <>
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold transition-all text-left tracking-widest"
                            style={{ color: 'hsl(var(--card-foreground))' }}
                            onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                          >
                            <span>{item.label}</span>
                            <span className="text-xs opacity-70">{mobileExpanded === item.id ? '▲' : '▾'}</span>
                          </button>
                          {mobileExpanded === item.id && (
                            <ul className="bg-[#0A1628]">
                              {item.children.map((child, i) => (
                                <li key={i}>
                                  <a
                                    href={child.url}
                                    target={child.external ? '_blank' : undefined}
                                    rel={child.external ? 'noopener noreferrer' : undefined}
                                    className="block px-8 py-2.5 text-xs transition-all tracking-wide"
                                  style={{ color: 'hsl(var(--muted-foreground))' }}
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
                          className="block px-4 py-3 text-xs font-bold transition-all tracking-widest"
                          style={{ color: 'hsl(var(--card-foreground))' }}
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
