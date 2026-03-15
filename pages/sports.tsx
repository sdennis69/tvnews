/**
 * /sports — Sports category listing page (local, college, high school)
 * Layout: horizontal thumbnail-left cards matching homepage style
 */
import { GetServerSideProps } from 'next'
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

const CAT_COLORS: Record<string, string> = {
  'local-sports': '#003D7A',
  'college-sports': '#CC0000',
  'high-school-sports': '#006600',
  'national-sports': '#555555',
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
}

export default function SportsPage({ posts, navItems }: Props) {
  const featured = posts[0]
  const rest = posts.slice(1)
  return (
    <>
      <Head>
        <title>Sports - WCBI TV | Telling Your Story</title>
        <meta name="description" content="Local, college, and high school sports coverage from WCBI TV." />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header navItems={navItems} />
        <div className="bg-[#003D7A] py-6 border-b-4 border-[#CC0000]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wide">Sports</h1>
            <p className="text-blue-200 text-sm mt-1">Local · College · High School</p>
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
                            <span className="bg-[#003D7A] text-white text-xs font-bold px-2.5 py-1 rounded">SPORTS</span>
                            <span className="text-xs text-[#999999]">{timeAgo(featured.date)}</span>
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
                        <span className="text-xs text-[#999999] mt-2">by {featured.author?.node?.name || 'Staff'}</span>
                      </div>
                    </a>
                  </Link>
                </>
              )}

              {/* More stories label */}
              <div className="border-b-2 border-[#003D7A] mb-4">
                <span className="bg-[#003D7A] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider inline-block">More Sports</span>
              </div>

              {/* Horizontal card list */}
              <div className="space-y-4">
                {rest.map((post) => {
                  const catSlug = post.categories?.edges?.[0]?.node?.slug || ''
                  const catName = post.categories?.edges?.[0]?.node?.name || 'Sports'
                  const badgeColor = CAT_COLORS[catSlug] || '#003D7A'
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
                              <span
                                className="text-white text-xs font-bold px-2.5 py-1 rounded"
                                style={{ backgroundColor: badgeColor }}
                              >
                                {catName.toUpperCase()}
                              </span>
                              <span className="text-xs text-[#999999]">{timeAgo(post.date)}</span>
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
                          <span className="text-xs text-[#999999] mt-2">by {post.author?.node?.name || 'Staff'}</span>
                        </div>
                      </a>
                    </Link>
                  )
                })}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-16 text-[#999999]">
                  <p>No sports stories found. Check back soon.</p>
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [local, college, hs] = await Promise.all([
      getPostsByCategory('local-sports', 10),
      getPostsByCategory('college-sports', 10),
      getPostsByCategory('high-school-sports', 10),
    ])
    const allPosts = [
      ...(local?.posts?.edges?.map((e: { node: Post }) => e.node) || []),
      ...(college?.posts?.edges?.map((e: { node: Post }) => e.node) || []),
      ...(hs?.posts?.edges?.map((e: { node: Post }) => e.node) || []),
    ]
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return { props: { posts: allPosts.slice(0, 25) } }
  } catch (err) {
    console.error('Error fetching sports:', err)
    return { props: { posts: [] } }
  }
}
