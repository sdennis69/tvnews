// WCBI TV Homepage — Deep Navy + Breaking Red Design
// Design: Modern Broadcast News — dark bg #0A1628, red accent #DC2626, Barlow Condensed headlines
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../src/components/Header'
import BreakingNewsTicker from '../src/components/BreakingNewsTicker'
import Footer from '../src/components/Footer'
import RevcontentWidget from '../src/components/RevcontentWidget'
import { useState, useCallback } from 'react'
import { getFeaturedPosts, getPosts } from '../src/lib/wordpress'

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
  sidebarPosts: Post[]
  latestPosts: Post[]
  initialEndCursor: string | null
  initialHasNextPage: boolean
  navItems?: NavItem[]
}

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
const PAGE_SIZE = 10

async function fetchMoreLatest(after: string, excludeId: string): Promise<{ posts: Post[]; endCursor: string | null; hasNextPage: boolean }> {
  const query = `
    query GetMoreLatest($after: String) {
      posts(first: ${PAGE_SIZE}, after: $after) {
        edges { node {
          id title slug excerpt date
          featuredImage { node { sourceUrl } }
          author { node { name } }
          categories { edges { node { name } } }
        }}
        pageInfo { hasNextPage endCursor }
      }
    }
  `
  const res = await fetch(`${WORDPRESS_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { after } }),
  })
  const json = await res.json()
  const data = json?.data?.posts
  const posts = (data?.edges?.map((e: { node: Post }) => e.node) || []).filter((p: Post) => p.id !== excludeId)
  return {
    posts,
    endCursor: data?.pageInfo?.endCursor || null,
    hasNextPage: data?.pageInfo?.hasNextPage || false,
  }
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function CategoryBadge({ name }: { name: string }) {
  return (
    <span className="inline-block text-[0.6rem] font-black tracking-widest uppercase text-[#DC2626] bg-[#DC2626]/10 border border-[#DC2626]/30 px-2 py-0.5">
      {name}
    </span>
  )
}

export default function Home({ featuredPost, sidebarPosts, latestPosts: initialLatestPosts, initialEndCursor, initialHasNextPage, navItems }: Props) {
  const [latestPosts, setLatestPosts] = useState<Post[]>(initialLatestPosts)
  const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (!endCursor || loading) return
    setLoading(true)
    try {
      const result = await fetchMoreLatest(endCursor, featuredPost?.id || '')
      setLatestPosts(prev => [...prev, ...result.posts])
      setEndCursor(result.endCursor)
      setHasNextPage(result.hasNextPage)
    } catch (e) {
      console.error('Load more failed:', e)
    } finally {
      setLoading(false)
    }
  }, [endCursor, loading, featuredPost?.id])

  const lcpImageUrl = featuredPost?.featuredImage?.node?.sourceUrl || ''

  return (
    <>
      <Head>
        <title>{`WCBI TV - Columbus, MS Local News, Weather & Sports`}</title>
        <meta name="description" content="Columbus, Mississippi's trusted source for breaking news, weather, sports, and community stories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {lcpImageUrl && (
          <link
            rel="preload"
            as="image"
            href={`/_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=828&q=75`}
            // @ts-ignore
            fetchpriority="high"
          />
        )}
      </Head>

      <main className="min-h-screen bg-[#0A1628]">
        <Header navItems={navItems} />
        <BreakingNewsTicker />

        {/* ── HERO: Featured + Sidebar Stories ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Large featured story */}
            <div className="lg:col-span-2">
              {featuredPost ? (
                <Link href={`/article/${featuredPost.slug}`}>
                  <a className="block group relative overflow-hidden rounded-lg bg-[#0D1E35]">
                    {featuredPost.featuredImage?.node?.sourceUrl ? (
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <Image
                          src={featuredPost.featuredImage.node.sourceUrl}
                          alt={featuredPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 66vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority
                          fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-black tracking-widest uppercase text-white bg-[#DC2626] px-2.5 py-1">
                              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"></span>
                              LIVE COVERAGE
                            </span>
                            <span className="text-[#9CA3AF] text-xs">{timeAgo(featuredPost.date)}</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-[#FCA5A5] transition-colors" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {featuredPost.title}
                          </h2>
                          <p className="text-[#D1D5DB] text-sm mt-2 line-clamp-2 leading-relaxed">
                            {featuredPost.excerpt?.replace(/<[^>]*>/g, '') || ''}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6">
                        <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{featuredPost.title}</h2>
                      </div>
                    )}
                  </a>
                </Link>
              ) : (
                <div className="rounded-lg bg-[#0D1E35] flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                  <p className="text-[#4B5563] text-sm">No featured story available.</p>
                </div>
              )}
            </div>

            {/* Right: 4 sidebar stories */}
            <div className="flex flex-col gap-3">
              {sidebarPosts.slice(0, 4).map((post) => {
                const cat = post.categories?.edges?.[0]?.node?.name || 'NEWS'
                return (
                  <Link key={post.id} href={`/article/${post.slug}`}>
                    <a className="flex gap-3 group bg-[#0D1E35] hover:bg-[#152844] rounded-lg p-3 transition-colors border border-[#1E3A5F] hover:border-[#DC2626]/30">
                      {post.featuredImage?.node?.sourceUrl && (
                        <div className="w-20 h-16 flex-shrink-0 relative overflow-hidden rounded bg-[#152844]">
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <CategoryBadge name={cat} />
                        <h3 className="text-sm font-bold text-white group-hover:text-[#FCA5A5] transition-colors leading-snug mt-1 line-clamp-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {post.title}
                        </h3>
                        <span className="text-[#4B5563] text-xs">{timeAgo(post.date)}</span>
                      </div>
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── LATEST NEWS + SIDEBAR ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Latest News column */}
            <div style={{ flex: '1 1 500px', minWidth: 0 }}>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#1E3A5F]">
                <div className="w-1 h-5 bg-[#DC2626] rounded-full"></div>
                <h2 className="text-sm font-black tracking-widest uppercase text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Latest News</h2>
              </div>

              {latestPosts.length > 0 ? (
                <div className="space-y-3">
                  {latestPosts.map((post) => {
                    const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
                    const image = post.featuredImage?.node?.sourceUrl || ''
                    return (
                      <Link key={post.id} href={`/article/${post.slug}`}>
                        <a className="flex gap-4 bg-[#0D1E35] hover:bg-[#152844] rounded-lg overflow-hidden transition-colors group border border-[#1E3A5F] hover:border-[#DC2626]/30">
                          {image && (
                            <div className="w-36 h-24 flex-shrink-0 relative overflow-hidden bg-[#152844]">
                              <Image
                                src={image}
                                alt={post.title}
                                fill
                                sizes="144px"
                                className="object-cover group-hover:scale-110 transition-all duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <CategoryBadge name={category} />
                                <span className="text-[#4B5563] text-xs">{timeAgo(post.date)}</span>
                              </div>
                              <h3 className="text-base font-bold text-white group-hover:text-[#FCA5A5] transition-colors line-clamp-2 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                {post.title}
                              </h3>
                              <p className="text-xs text-[#6B7280] line-clamp-1 mt-1 leading-relaxed">
                                {post.excerpt?.replace(/<[^>]*>/g, '') || ''}
                              </p>
                            </div>
                            <p className="text-xs text-[#4B5563] mt-1">
                              by {post.author?.node?.name || 'Staff'}
                            </p>
                          </div>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-[#4B5563]">
                  <p>No articles available.</p>
                </div>
              )}

              {hasNextPage && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs tracking-widest uppercase px-8 py-3 transition-colors"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Loading…
                      </>
                    ) : 'Load More Stories'}
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-4" style={{ width: '100%', maxWidth: '288px' }}>
              <div className="bg-[#0D1E35] border border-[#1E3A5F] rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1E3A5F]">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#DC2626] rounded-full"></div>
                    <span className="text-white text-xs font-black uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Trending</span>
                  </div>
                  <span className="text-[#4B5563] text-[0.6rem]">Ads By Revcontent</span>
                </div>
                <RevcontentWidget className="p-2" />
              </div>

              <div className="bg-[#0D1E35] border border-[#1E3A5F] rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1E3A5F]">
                  <div className="w-1 h-4 bg-[#1E3A5F] rounded-full"></div>
                  <span className="text-[#4B5563] text-xs font-bold uppercase tracking-widest">Advertisement</span>
                </div>
                <div
                  id="homepage-ad-slot-1"
                  className="min-h-[250px] flex items-center justify-center text-[#4B5563] text-xs p-4 text-center"
                >
                  <span>Ad Unit<br />(300×250 or 300×600)</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [stickyResponse, latestResponse] = await Promise.all([
      getFeaturedPosts(6),
      getPosts(12),
    ])

    let featuredPost: Post | null = null
    let sidebarPosts: Post[] = []
    const stickyPosts = stickyResponse?.posts?.edges?.map((e: any) => e.node) || []
    const allLatest = latestResponse?.posts?.edges?.map((e: any) => e.node) || []

    if (stickyPosts.length > 0) {
      featuredPost = stickyPosts[0]
      const remaining = [
        ...stickyPosts.slice(1),
        ...allLatest.filter((p: Post) => p.id !== featuredPost?.id),
      ]
      sidebarPosts = remaining.slice(0, 4)
    } else if (allLatest.length > 0) {
      featuredPost = allLatest[0]
      sidebarPosts = allLatest.slice(1, 5)
    }

    const latestResponse2 = await getPosts(PAGE_SIZE)
    const allLatestForPage = latestResponse2?.posts?.edges?.map((e: any) => e.node) || []
    const latestPosts = allLatestForPage
      .filter((p: Post) => p.id !== featuredPost?.id)
      .slice(0, PAGE_SIZE)
    const initialEndCursor = latestResponse2?.posts?.pageInfo?.endCursor || null
    const initialHasNextPage = latestResponse2?.posts?.pageInfo?.hasNextPage || false

    return {
      props: {
        featuredPost,
        sidebarPosts,
        latestPosts,
        initialEndCursor,
        initialHasNextPage,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      props: {
        featuredPost: null,
        sidebarPosts: [],
        latestPosts: [],
        initialEndCursor: null,
        initialHasNextPage: false,
      },
      revalidate: 30,
    }
  }
}
