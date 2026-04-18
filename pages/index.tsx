/**
 * WCBI TV Homepage — pixel-perfect rebuild matching local-stream-vision Lovable reference.
 * Layout: BreakingTicker → Header → Hero (8/12 feature + 4/12 live+compact) →
 *         Ad slot → Local News (8/12) + Weather (4/12) → Watch Now (navy bg) →
 *         Trending (8/12) + Newsletter (4/12) → Community grid → Footer
 *
 * Next.js 12 Link syntax: <Link href="..."><a className="...">...</a></Link>
 * All data wired to real WordPress GraphQL (ISR 60s).
 */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Header from '../src/components/Header'
import BreakingNewsTicker from '../src/components/BreakingNewsTicker'
import Footer from '../src/components/Footer'
import { getPosts } from '../src/lib/wordpress'

/* ── Types ─────────────────────────────────────────────────────── */
interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  date: string
  featuredImage?: { node: { sourceUrl: string } }
  author?: { node: { name: string } }
  categories?: { edges: Array<{ node: { name: string } }> }
}

import type { NavItem } from './_app'

interface Props {
  featuredPost: Post | null
  heroSidePosts: Post[]
  localNewsPosts: Post[]
  trendingPosts: Post[]
  communityPosts: Post[]
  navItems?: NavItem[]
}

/* ── Helpers ────────────────────────────────────────────────────── */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return dateStr
  }
}

function timeAgoClient(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function TimeStamp({ dateStr }: { dateStr: string }) {
  const [label, setLabel] = useState(() => formatDate(dateStr))
  useEffect(() => { setLabel(timeAgoClient(dateStr)) }, [dateStr])
  return <>{label}</>
}

function getCategory(post: Post): string {
  return post.categories?.edges?.[0]?.node?.name || 'News'
}

function stripHtml(html: string = ''): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

/* ── Sub-components ─────────────────────────────────────────────── */

function SectionHeader({
  eyebrow, title, href = '/', cta = 'View all',
}: { eyebrow?: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 md:mb-7">
      <div>
        {eyebrow && (
          <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'hsl(var(--breaking))' }}>
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight relative pb-2" style={{ color: 'hsl(var(--primary))' }}>
          {title}
          <span className="absolute left-0 bottom-0 h-1 w-12 rounded-full" style={{ background: 'hsl(var(--breaking))' }} />
        </h2>
      </div>
      <Link href={href}>
        <a className="inline-flex items-center gap-1 text-sm font-semibold shrink-0 hover:underline" style={{ color: 'hsl(var(--primary))' }}>
          {cta}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </Link>
    </div>
  )
}

function ArticleCard({ post }: { post: Post }) {
  const cat = getCategory(post)
  const img = post.featuredImage?.node?.sourceUrl
  return (
    <Link href={`/article/${post.slug}`}>
      <a className="group flex flex-col overflow-hidden rounded-xl transition-all duration-200" style={{ background: 'hsl(var(--card))', boxShadow: 'var(--shadow-card)' }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          {img ? (
            <Image src={img} alt={post.title} layout="fill" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="h-full w-full" style={{ background: 'hsl(var(--secondary))' }} />
          )}
        </div>
        <div className="flex-1 p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--breaking))' }}>{cat}</span>
          <h3 className="mt-1.5 font-display text-base md:text-lg font-bold leading-snug line-clamp-3 group-hover:underline underline-offset-2" style={{ color: 'hsl(var(--foreground))' }}>
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-sm line-clamp-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {stripHtml(post.excerpt)}
            </p>
          )}
          <div className="mt-3 flex items-center gap-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <TimeStamp dateStr={post.date} />
          </div>
        </div>
      </a>
    </Link>
  )
}

function CompactCard({ post }: { post: Post }) {
  const cat = getCategory(post)
  return (
    <Link href={`/article/${post.slug}`}>
      <a className="group block py-3" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--breaking))' }}>{cat}</span>
        <h3 className="font-display text-sm font-bold leading-snug mt-1 line-clamp-2 group-hover:underline underline-offset-2" style={{ color: 'hsl(var(--foreground))' }}>
          {post.title}
        </h3>
        <div className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <TimeStamp dateStr={post.date} />
        </div>
      </a>
    </Link>
  )
}

function HorizontalCard({ post, rank }: { post: Post; rank?: number }) {
  const cat = getCategory(post)
  const img = post.featuredImage?.node?.sourceUrl
  return (
    <Link href={`/article/${post.slug}`}>
      <a className="group flex gap-4 items-start hover:opacity-95">
        {rank !== undefined && (
          <span className="font-display text-3xl md:text-4xl font-extrabold leading-none w-8 shrink-0" style={{ color: 'hsl(var(--breaking) / 0.8)' }}>
            {rank}
          </span>
        )}
        <div className="relative w-28 sm:w-36 shrink-0 overflow-hidden rounded-md" style={{ aspectRatio: '4/3' }}>
          {img ? (
            <Image src={img} alt={post.title} layout="fill" sizes="144px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="h-full w-full" style={{ background: 'hsl(var(--secondary))' }} />
          )}
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--breaking))' }}>{cat}</span>
          <h3 className="font-display text-sm sm:text-base font-bold leading-snug line-clamp-3 group-hover:underline underline-offset-2" style={{ color: 'hsl(var(--foreground))' }}>
            {post.title}
          </h3>
          <div className="mt-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <TimeStamp dateStr={post.date} />
          </div>
        </div>
      </a>
    </Link>
  )
}

function FeatureCard({ post }: { post: Post }) {
  const cat = getCategory(post)
  const img = post.featuredImage?.node?.sourceUrl
  return (
    <Link href={`/article/${post.slug}`}>
      <a className="group relative block overflow-hidden rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {img ? (
            <Image src={img} alt={post.title} layout="fill" sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
          ) : (
            <div className="h-full w-full" style={{ background: 'hsl(var(--secondary))' }} />
          )}
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-white">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white/80 mb-2">{cat}</span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold leading-tight group-hover:underline underline-offset-4 decoration-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 text-sm md:text-base text-white/85 line-clamp-2 max-w-3xl">{stripHtml(post.excerpt)}</p>
          )}
          <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
            {post.author?.node?.name && <span>{post.author.node.name}</span>}
            {post.author?.node?.name && <span>•</span>}
            <span><TimeStamp dateStr={post.date} /></span>
          </div>
        </div>
      </a>
    </Link>
  )
}

function LiveVideoPlayer() {
  const [muted, setMuted] = useState<boolean | null>(null)
  const [playing, setPlaying] = useState<boolean | null>(null)
  useEffect(() => { setMuted(true); setPlaying(true) }, [])
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'hsl(var(--card))', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: 'hsl(218 60% 17%)', color: '#ffffff' }}>
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'hsl(var(--live))' }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'hsl(var(--live))' }} />
        </span>
        <span className="text-xs font-bold uppercase tracking-widest">Watch Live</span>
      </div>
      <div className="group relative w-full overflow-hidden bg-black">
        <div className="relative" style={{ aspectRatio: '16/9' }}>
          <Image src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" alt="WCBI Live Broadcast" layout="fill" className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: 'hsl(var(--live))' }}>
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Live
          </div>
          {playing !== null && (
            <button onClick={() => setPlaying(!playing)} className="absolute inset-0 grid place-items-center text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label={playing ? 'Pause' : 'Play'}>
              <span className="grid place-items-center rounded-full bg-black/60 backdrop-blur-sm h-16 w-16">
                {playing
                  ? <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                }
              </span>
            </button>
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-white text-sm truncate">WWAYTV3 News at Noon — Live</div>
            </div>
            {muted !== null && (
              <button onClick={() => setMuted(!muted)} className="grid h-8 w-8 place-items-center rounded-md text-white hover:bg-white/20" aria-label={muted ? 'Unmute' : 'Mute'}>
                {muted
                  ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdSlot({ height = 'h-24 md:h-28', label = 'Advertisement' }: { height?: string; label?: string }) {
  return (
    <div className={`w-full ${height} rounded-lg border border-dashed grid place-items-center text-center`} style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--secondary) / 0.5)' }}>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</div>
        <div className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Sponsored content</div>
      </div>
    </div>
  )
}

function WeatherWidget() {
  const days = [
    { day: 'Today', hi: 82, lo: 68, icon: '☀️' },
    { day: 'Fri', hi: 78, lo: 65, icon: '⛈️' },
    { day: 'Sat', hi: 75, lo: 63, icon: '☁️' },
    { day: 'Sun', hi: 80, lo: 66, icon: '☀️' },
    { day: 'Mon', hi: 83, lo: 69, icon: '🌤️' },
  ]
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--gradient-navy)', color: '#ffffff', boxShadow: 'var(--shadow-card)' }}>
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest opacity-70">Wilmington, NC</div>
            <div className="mt-1 flex items-end gap-2">
              <span className="font-display text-5xl md:text-6xl font-extrabold leading-none">82°</span>
              <span className="text-sm opacity-80 mb-1">Feels like 86°</span>
            </div>
            <div className="mt-1 text-sm opacity-85">Partly cloudy • H 82° L 68°</div>
          </div>
          <span className="text-5xl">☀️</span>
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs opacity-85">
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
            12 mph SE
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            68% humidity
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 bg-black/15" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {days.map(({ day, hi, lo, icon }) => (
          <div key={day} className="px-2 py-3 text-center text-xs">
            <div className="font-semibold opacity-90">{day}</div>
            <div className="my-1.5 text-base">{icon}</div>
            <div className="font-bold">{hi}°<span className="opacity-60">/{lo}°</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page Component ─────────────────────────────────────────────── */
export default function Home({ featuredPost, heroSidePosts, localNewsPosts, trendingPosts, communityPosts, navItems }: Props) {
  const watchNowItems = [
    { slug: 'live-coverage', category: 'Live', title: 'LIVE: Tracking severe weather — WWAYTV3 Chief Meteorologist', publishedAt: 'Live now', duration: 'LIVE', image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=600&q=80' },
    { slug: 'evening-newscast', category: 'Newscast', title: 'Tonight at 6: Top stories from across the Golden Triangle', publishedAt: 'Tonight at 6:00', duration: '22:08', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80' },
    { slug: 'council-vote', category: 'Local News', title: 'Watch: Full coverage of the Columbus City Council vote', publishedAt: '2 hours ago', duration: '8:42', image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=600&q=80' },
    { slug: 'community-event', category: 'Community', title: 'Volunteers serve thousands at annual community event', publishedAt: '1 day ago', duration: '3:55', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80' },
  ]

  return (
    <>
      <Head>
        <title>WWAYTV3 — Wilmington, NC Local News, Weather &amp; Sports</title>
        <meta name="description" content="Wilmington, NC's trusted source for breaking news, weather, sports, and community stories. ABC, CBS &amp; CW affiliate." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col" style={{ background: 'hsl(var(--background))' }}>
        <BreakingNewsTicker />
        <Header navItems={navItems} />

        <main className="flex-1">

          {/* ══ HERO ══════════════════════════════════════════════════════ */}
          <section className="container pt-6 md:pt-8 pb-2">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                {featuredPost ? (
                  <FeatureCard post={featuredPost} />
                ) : (
                  <div className="rounded-xl flex items-center justify-center" style={{ aspectRatio: '16/9', background: 'hsl(var(--card))' }}>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>No featured story available.</p>
                  </div>
                )}
              </div>
              <aside className="lg:col-span-4 flex flex-col gap-4">
                <LiveVideoPlayer />
                <div className="rounded-xl p-4" style={{ background: 'hsl(var(--card))', boxShadow: 'var(--shadow-card)' }}>
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'hsl(var(--breaking))' }}>More Top Stories</div>
                  {heroSidePosts.slice(0, 3).map((post) => (
                    <CompactCard key={post.id} post={post} />
                  ))}
                </div>
              </aside>
            </div>
          </section>

          {/* ══ AD SLOT ═══════════════════════════════════════════════════ */}
          <div className="container py-6">
            <AdSlot />
          </div>

          {/* ══ LOCAL NEWS + WEATHER ══════════════════════════════════════ */}
          <section className="container pb-10 md:pb-14">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionHeader eyebrow="Golden Triangle" title="Local News" href="/news" />
                <div className="grid gap-5 sm:grid-cols-2">
                  {localNewsPosts.slice(0, 4).map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4 space-y-6">
                <SectionHeader eyebrow="Forecast" title="Weather" href="/weather" cta="Full forecast" />
                <WeatherWidget />
                <AdSlot height="h-64" label="Sponsor" />
              </div>
            </div>
          </section>

          {/* ══ WATCH NOW (navy bg) ════════════════════════════════════════ */}
          <div style={{ background: 'var(--gradient-navy)', color: '#ffffff' }}>
            <section className="container py-10 md:py-14">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest inline-block px-2 py-0.5 rounded mb-2" style={{ background: 'hsl(var(--breaking))', color: 'hsl(var(--breaking-foreground))' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                    On Now
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">Watch Now</h2>
                </div>
                <Link href="/videos">
                  <a className="text-sm font-semibold hover:underline opacity-90" style={{ color: '#ffffff' }}>All videos →</a>
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {watchNowItems.map((v) => (
                  <Link key={v.slug} href={`/article/${v.slug}`}>
                    <a className="group block rounded-xl overflow-hidden transition-all duration-200" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <Image src={v.image} alt={v.title} layout="fill" sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                        <span className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: v.duration === 'LIVE' ? 'hsl(var(--live))' : 'rgba(0,0,0,0.75)' }}>
                          {v.duration === 'LIVE' && <span className="inline-block h-1.5 w-1.5 rounded-full bg-white mr-1 align-middle animate-pulse" />}
                          {v.duration}
                        </span>
                        <div className="absolute inset-0 grid place-items-center">
                          <span className="grid h-12 w-12 place-items-center rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80" style={{ color: 'hsl(var(--breaking-foreground))' }}>{v.category}</div>
                        <div className="font-display text-base font-bold leading-snug mt-1 line-clamp-2">{v.title}</div>
                        <div className="text-xs mt-2 opacity-70">{v.publishedAt}</div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* ══ TRENDING + NEWSLETTER ═════════════════════════════════════ */}
          <section className="container py-10 md:py-14">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionHeader eyebrow="Most Read Today" title="Trending" href="/news" />
                <div className="space-y-4">
                  {trendingPosts.map((post, i) => (
                    <HorizontalCard key={post.id} post={post} rank={i + 1} />
                  ))}
                </div>
              </div>
              <aside className="lg:col-span-4 space-y-6">
                <div className="rounded-xl p-6" style={{ background: 'var(--gradient-navy)', color: '#ffffff', boxShadow: 'var(--shadow-card)' }}>
                  <div className="h-6 w-6 mb-3 p-1 rounded" style={{ background: 'hsl(var(--breaking))', color: 'hsl(var(--breaking-foreground))' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <h3 className="font-display text-xl font-extrabold leading-tight">Get the WWAYTV3 Daily newsletter</h3>
                  <p className="mt-2 text-sm opacity-80">The day's top local stories, weather, and sports — delivered every morning.</p>
                  <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Email address" className="flex-1 rounded-md px-3 py-2 text-sm outline-none" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }} />
                    <button type="submit" className="rounded-md px-4 text-sm font-bold uppercase tracking-wide hover:opacity-90" style={{ background: 'hsl(var(--breaking))', color: 'hsl(var(--breaking-foreground))' }}>Sign up</button>
                  </form>
                </div>
                <AdSlot height="h-72" label="Sidebar Ad" />
              </aside>
            </div>
          </section>

          {/* ══ COMMUNITY & LIFESTYLE ═════════════════════════════════════ */}
          <section className="container pb-10 md:pb-14">
            <SectionHeader eyebrow="People &amp; Places" title="Community &amp; Lifestyle" href="/community" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {communityPosts.slice(0, 6).map((post) => (
                <ArticleCard key={post.id + 'comm'} post={post} />
              ))}
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  )
}

/* ── getStaticProps ─────────────────────────────────────────────── */
export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const latestRes = await getPosts(30)
    const allPosts: Post[] = latestRes?.posts?.edges?.map((e: { node: Post }) => e.node) || []
    const featuredPost: Post | null = allPosts[0] || null
    const featuredId = featuredPost?.id
    const rest = allPosts.filter((p) => p.id !== featuredId)

    return {
      props: {
        featuredPost,
        heroSidePosts: rest.slice(0, 3),
        localNewsPosts: rest.slice(0, 4),
        trendingPosts: rest.slice(4, 9),
        communityPosts: rest.slice(9, 15),
      },
      revalidate: 60,
    }
  } catch (err) {
    console.error('getStaticProps error:', err)
    return {
      props: { featuredPost: null, heroSidePosts: [], localNewsPosts: [], trendingPosts: [], communityPosts: [] },
      revalidate: 60,
    }
  }
}
