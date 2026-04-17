/**
 * Footer — WCBI TV
 * Next.js 12 Link syntax: <Link href="..."><a>...</a></Link>
 * Hydration-safe: year is hardcoded to avoid new Date() server/client mismatch.
 */
import Link from "next/link"

const YEAR = 2026

const newsLinks = [
  { label: "Local News", href: "/news" },
  { label: "Crime", href: "/crime" },
  { label: "National and World", href: "/national-world-news" },
  { label: "Sports", href: "/sports" },
]

const resourceLinks = [
  { label: "Weather", href: "/weather" },
  { label: "Live TV", href: "/livestream" },
  { label: "About Us", href: "/about-wcbi" },
  { label: "Contact", href: "/about-wcbi/contact-us" },
]

export default function Footer() {
  return (
    <footer style={{ background: "var(--gradient-navy)", color: "hsl(var(--primary-foreground))" }}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "hsl(var(--breaking))" }}>
              WCBI TV
            </div>
            <p className="text-sm leading-relaxed opacity-75">
              Columbus, Mississippi&apos;s trusted source for local news, weather, and sports. A Morris Multimedia station.
            </p>
          </div>

          {/* News */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "hsl(var(--breaking))" }}>News</div>
            <ul className="space-y-2 text-sm">
              {newsLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <a className="opacity-70 hover:opacity-100 transition-opacity">{l.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "hsl(var(--breaking))" }}>Resources</div>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <a className="opacity-70 hover:opacity-100 transition-opacity">{l.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "hsl(var(--breaking))" }}>Connect</div>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/wcbitv" target="_blank" rel="noopener noreferrer" aria-label="WCBI on Facebook"
                className="h-8 w-8 rounded flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.1)" }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com/WCBINEWS" target="_blank" rel="noopener noreferrer" aria-label="WCBI on Twitter"
                className="h-8 w-8 rounded flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.1)" }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://www.youtube.com/user/wcbitv1" target="_blank" rel="noopener noreferrer" aria-label="WCBI on YouTube"
                className="h-8 w-8 rounded flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.1)" }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-60"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <p>&copy; {YEAR} WCBI TV. All rights reserved. Columbus, MS.</p>
          <div className="flex gap-5">
            <Link href="/about-wcbi/privacy-policy-2">
              <a className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            </Link>
            <Link href="/terms-of-use">
              <a className="hover:opacity-100 transition-opacity">Terms of Service</a>
            </Link>
            <Link href="/fcc">
              <a className="hover:opacity-100 transition-opacity">FCC Public File</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
