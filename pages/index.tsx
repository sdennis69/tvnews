import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../src/components/Header'
import BreakingNewsTicker from '../src/components/BreakingNewsTicker'
import Footer from '../src/components/Footer'
import RevcontentWidget from '../src/components/RevcontentWidget'
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
  navItems?: NavItem[]
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
}

export default function Home({ featuredPost, sidebarPosts, latestPosts, navItems }: Props) {
  const lcpImageUrl = featuredPost?.featuredImage?.node?.sourceUrl || ''

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_STATION_NAME || 'TV News'} - Local News, Weather & More`}</title>
        <meta name="description" content="Your local source for breaking news, weather, sports, and community stories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preload LCP image — URL is known at server render time so browser fetches it immediately */}
        {lcpImageUrl && (
          <link
            rel="preload"
            as="image"
            href={`/_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=828&q=75`}
            // @ts-ignore — fetchpriority is valid HTML but not yet in TS types
            fetchpriority="high"
          />
        )}
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header navItems={navItems} />
        <BreakingNewsTicker />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Featured Section — full width above the sidebar layout */}
          <div className="mb-[30px]">
            <div className="mb-4">
              <span className="bg-[#003D7A] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest inline-block">
                Featured
              </span>
            </div>
            {/* Two-column layout: large story left, 4 smaller right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left: Large Featured Story — rendered from SSR data */}
              <div>
                {featuredPost ? (
                  <Link href={`/article/${featuredPost.slug}`}>
                    <a className="block group">
                      {featuredPost.featuredImage?.node?.sourceUrl && (
                        <div className="w-full relative overflow-hidden rounded bg-[#E8E8E8] mb-3" style={{ aspectRatio: '16/9' }}>
                          <Image
                            src={featuredPost.featuredImage.node.sourceUrl}
                            alt={featuredPost.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            priority
                            fetchPriority="high"
                          />
                        </div>
                      )}
                      <h2 className="text-xl font-bold text-[#222222] group-hover:text-[#003D7A] transition-colors leading-snug mb-2">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm text-[#888888]">
                        <span>by {featuredPost.author?.node?.name || 'Staff'}</span>
                        <span className="mx-2">·</span>
                        <span>{timeAgo(featuredPost.date)}</span>
                      </p>
                    </a>
                  </Link>
                ) : (
                  <div className="text-center py-12 text-[#888888]">
                    <p>No posts available. Check your WordPress connection.</p>
                  </div>
                )}
              </div>

              {/* Right: 4 Smaller Articles — rendered from SSR data */}
              <div>
                {sidebarPosts.length > 0 ? (
                  <div className="divide-y divide-[#EEEEEE]">
                    {sidebarPosts.map((post) => (
                      <Link key={post.id} href={`/article/${post.slug}`}>
                        <a className="flex gap-4 py-4 first:pt-0 last:pb-0 group hover:bg-[#F9F9F9] transition-colors -mx-4 px-4">
                          {post.featuredImage?.node?.sourceUrl && (
                            <div className="w-28 h-20 flex-shrink-0 relative overflow-hidden rounded bg-[#E8E8E8]">
                              <Image
                                src={post.featuredImage.node.sourceUrl}
                                alt={post.title}
                                fill
                                sizes="112px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 flex flex-col justify-between">
                            <h3 className="text-sm font-semibold text-[#222222] group-hover:text-[#003D7A] transition-colors leading-snug line-clamp-3">
                              {post.title}
                            </h3>
                            <p className="text-xs text-[#888888] mt-1">
                              <span className="font-medium">by {post.author?.node?.name || 'Staff'}</span>
                              <span className="mx-1">·</span>
                              <span>{timeAgo(post.date)}</span>
                            </p>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#888888] text-sm">
                    <p>No articles available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Latest News + Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Latest News (main column) — rendered from SSR data */}
            <div style={{ flex: '1 1 500px', minWidth: 0 }}>
              <div className="mb-4">
                <span className="bg-[#003D7A] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest inline-block">
                  Latest News
                </span>
              </div>
              {latestPosts.length > 0 ? (
                <div className="space-y-4">
                  {latestPosts.map((post) => {
                    const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
                    const author = post.author?.node?.name || 'Staff'
                    const image = post.featuredImage?.node?.sourceUrl || ''
                    return (
                      <Link key={post.id} href={`/article/${post.slug}`}>
                        <a className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-all duration-200 group">
                          {image && (
                            <div className="w-40 h-28 flex-shrink-0 relative overflow-hidden bg-[#E8E8E8]">
                              <Image
                                src={image}
                                alt={post.title}
                                fill
                                sizes="160px"
                                className="object-cover group-hover:scale-110 transition-all duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-[#003D7A] text-white text-xs font-bold px-2.5 py-1 rounded">
                                  {category.toUpperCase()}
                                </span>
                                <span className="text-xs text-[#999999]">{timeAgo(post.date)}</span>
                              </div>
                              <h3 className="text-base font-bold text-[#333333] group-hover:text-[#003D7A] transition-colors mb-2 line-clamp-2 leading-tight">
                                {post.title}
                              </h3>
                              <p className="text-sm text-[#555555] line-clamp-2 leading-relaxed">
                                {post.excerpt?.replace(/<[^>]*>/g, '') || ''}
                              </p>
                            </div>
                            <span className="text-xs text-[#999999] mt-2">by {author}</span>
                          </div>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-[#888888]">
                  <p className="text-lg font-medium mb-2">No articles found</p>
                  <p className="text-sm">Make sure your WordPress site is connected and has published posts.</p>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-6" style={{ width: '288px', flexShrink: 0, position: 'sticky', top: '1rem' }}>

              {/* Revcontent Widget */}
              {/* CLS fix: reserve min-height so widget expanding doesn't shift layout */}
              <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                <div className="bg-[#003D7A] px-3 py-2 flex items-center justify-between">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Trending</span>
                  <span className="text-white/60 text-xs">Ads By Revcontent</span>
                </div>
                <RevcontentWidget className="p-2" />
              </div>

              {/* Generic Ad / Widget Slot */}
              <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                <div className="bg-[#003D7A] px-3 py-2">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Advertisement</span>
                </div>
                <div
                  id="homepage-ad-slot-1"
                  className="min-h-[250px] flex items-center justify-center text-[#AAAAAA] text-xs p-4 text-center"
                >
                  <span>Ad Unit<br />(300×250 or 300×600)</span>
                </div>
              </div>

            </aside>
          </div>

        </div>

        <Footer />
      </main>
    </>
  )
}

// Static generation with ISR: page is pre-built at deploy time and regenerated
// in the background every 60 seconds when a new request comes in.
// This serves pure static HTML with zero server processing time per request,
// eliminating the React hydration delay that was causing the 1,100ms LCP render delay.
export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch featured post (sticky) and latest posts in parallel
    const [stickyResponse, latestResponse] = await Promise.all([
      getFeaturedPosts(6),
      getPosts(12),
    ])

    // Determine featured post: first sticky, fallback to first latest
    let featuredPost: Post | null = null
    let sidebarPosts: Post[] = []

    const stickyPosts = stickyResponse?.posts?.edges?.map((e: any) => e.node) || []
    const allLatest = latestResponse?.posts?.edges?.map((e: any) => e.node) || []

    if (stickyPosts.length > 0) {
      featuredPost = stickyPosts[0]
      // Fill sidebar with remaining stickies, then latest (excluding featured)
      const remaining = [
        ...stickyPosts.slice(1),
        ...allLatest.filter((p: Post) => p.id !== featuredPost?.id),
      ]
      sidebarPosts = remaining.slice(0, 4)
    } else if (allLatest.length > 0) {
      featuredPost = allLatest[0]
      sidebarPosts = allLatest.slice(1, 5)
    }

    // Latest news list: all posts excluding the featured one
    const latestPosts = allLatest
      .filter((p: Post) => p.id !== featuredPost?.id)
      .slice(0, 10)

    return {
      props: {
        featuredPost,
        sidebarPosts,
        latestPosts,
      },
      // Regenerate the page in the background at most once every 60 seconds
      // when a new request comes in — keeps content fresh without SSR overhead
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      props: {
        featuredPost: null,
        sidebarPosts: [],
        latestPosts: [],
      },
      revalidate: 30,
    }
  }
}
