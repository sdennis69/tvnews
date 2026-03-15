/**
 * /weather-news — Weather News category listing page
 * Layout: horizontal thumbnail-left cards matching homepage style
 */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import RevcontentWidget from '../src/components/RevcontentWidget'
import type { NavItem } from './_app'
import { getPostsByCategory } from '../src/lib/wordpress'

interface Post {
  id: string; title: string; slug: string; excerpt?: string
  date: string; featuredImage?: { node: { sourceUrl: string } }
  author?: { node: { name: string } }
  categories?: { edges: Array<{ node: { name: string; slug: string } }> }
}
interface Props { posts: Post[]; navItems?: NavItem[] }

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
}

export default function WeatherNewsPage({ posts, navItems }: Props) {
  const featured = posts[0]
  const rest = posts.slice(1)
  return (
    <>
      <Head>
        <title>Weather News - WCBI TV | Telling Your Story</title>
        <meta name="description" content="Weather forecasts and severe weather alerts from WCBI TV." />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header navItems={navItems} />
        <div className="bg-[#003D7A] py-6 border-b-4 border-[#CC0000]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wide">Weather News</h1>
            <p className="text-blue-200 text-sm mt-1">Forecasts &amp; Severe Weather Alerts</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Main article column */}
            <div style={{ flex: '1 1 500px', minWidth: 0 }}>

              {/* Featured top story */}
              {featured && (
                <>
                  <div className="text-xs font-bold text-white bg-[#003D7A] inline-block px-3 py-1 mb-3 uppercase tracking-wider">Featured</div>
                  <Link href={`/article/${featured.slug}`}>
                    <a className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-all duration-200 group mb-4 block">
                      {featured.featuredImage?.node?.sourceUrl && (
                        <div style={{ width: '240px', height: '160px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: '#E8E8E8' }}>
                          <Image
                            src={featured.featuredImage.node.sourceUrl}
                            alt={featured.title}
                            fill
                            sizes="240px"
                            className="object-cover group-hover:scale-110 transition-all duration-300"
                            priority
                          />
                        </div>
                      )}
                      <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <span className="bg-[#003D7A] text-white text-xs font-bold px-2.5 py-1 rounded">WEATHER</span>
                            <span className="text-xs text-[#666666]">{timeAgo(featured.date)}</span>
                          </div>
                          <h2 className="text-xl font-bold text-[#333333] group-hover:text-[#003D7A] transition-colors mb-2 leading-tight">
                            {featured.title}
                          </h2>
                          {featured.excerpt && (
                            <p className="text-sm text-[#555555] leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {featured.excerpt.replace(/<[^>]*>/g, '')}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-[#666666] mt-2">by {featured.author?.node?.name || 'Staff'}</span>
                      </div>
                    </a>
                  </Link>
                </>
              )}

              {/* More stories label */}
              <div className="border-b-2 border-[#003D7A] mb-4">
                <span className="bg-[#003D7A] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider inline-block">Latest Weather</span>
              </div>

              {/* Horizontal card list */}
              <div className="space-y-4">
                {rest.map((post) => {
                  const category = post.categories?.edges?.[0]?.node?.name || 'WEATHER'
                  const image = post.featuredImage?.node?.sourceUrl || ''
                  return (
                    <Link key={post.id} href={`/article/${post.slug}`}>
                      <a className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg border border-[#CCCCCC] transition-all duration-200 group">
                        {image && (
                          <div style={{ width: '160px', height: '112px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: '#E8E8E8' }}>
                            <Image
                              src={image}
                              alt={post.title}
                              fill
                              sizes="160px"
                              className="object-cover group-hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        )}
                        <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                              <span className="bg-[#003D7A] text-white text-xs font-bold px-2.5 py-1 rounded">
                                {category.toUpperCase()}
                              </span>
                              <span className="text-xs text-[#666666]">{timeAgo(post.date)}</span>
                            </div>
                            <h3 className="text-base font-bold text-[#333333] group-hover:text-[#003D7A] transition-colors mb-2 leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-sm text-[#555555] leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {post.excerpt.replace(/<[^>]*>/g, '')}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-[#666666] mt-2">by {post.author?.node?.name || 'Staff'}</span>
                        </div>
                      </a>
                    </Link>
                  )
                })}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-16 text-[#666666]">
                  <p>No weather stories found. Check back soon.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside style={{ width: '288px', flexShrink: 0, position: 'sticky', top: '1rem' }}>
              <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                <div className="bg-[#003D7A] px-3 py-2 flex items-center justify-between">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Trending</span>
                  <span className="text-white/60 text-xs">Ads By Revcontent</span>
                </div>
                <RevcontentWidget className="p-2" />
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const result = await getPostsByCategory('wcbi-featured-weather', 25)
    const posts: Post[] = result?.posts?.edges?.map((e: { node: Post }) => e.node) || []
    return { props: { posts }, revalidate: 60 }
  } catch (err) {
    console.error('Error fetching weather news:', err)
    return { props: { posts: [] }, revalidate: 60 }
  }
}
