/**
 * /news — Local News category listing page
 * Layout: horizontal thumbnail-left cards matching homepage style
 * Pagination: initial 10 posts SSG + client-side "Load More" via WPGraphQL cursor
 */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import RevcontentWidget from '../src/components/RevcontentWidget'
import type { NavItem } from './_app'
import { getPostsByCategory, queryWordPress } from '../src/lib/wordpress'

interface Post {
  id: string; title: string; slug: string; excerpt?: string
  date: string; featuredImage?: { node: { sourceUrl: string } }
  author?: { node: { name: string } }
  categories?: { edges: Array<{ node: { name: string; slug: string } }> }
}
interface Props {
  posts: Post[]
  initialEndCursor: string | null
  initialHasNextPage: boolean
  navItems?: NavItem[]
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
}

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
const PAGE_SIZE = 10

async function fetchMorePosts(after: string): Promise<{ posts: Post[]; endCursor: string | null; hasNextPage: boolean }> {
  const query = `
    query GetMoreNews($after: String) {
      posts(first: ${PAGE_SIZE}, after: $after, where: { categoryName: "local-news" }) {
        edges { node {
          id title slug excerpt date
          featuredImage { node { sourceUrl } }
          author { node { name } }
          categories { edges { node { name slug } } }
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
  return {
    posts: data?.edges?.map((e: { node: Post }) => e.node) || [],
    endCursor: data?.pageInfo?.endCursor || null,
    hasNextPage: data?.pageInfo?.hasNextPage || false,
  }
}

export default function NewsPage({ posts: initialPosts, initialEndCursor, initialHasNextPage, navItems }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (!endCursor || loading) return
    setLoading(true)
    try {
      const result = await fetchMorePosts(endCursor)
      setPosts(prev => [...prev, ...result.posts])
      setEndCursor(result.endCursor)
      setHasNextPage(result.hasNextPage)
    } catch (e) {
      console.error('Load more failed:', e)
    } finally {
      setLoading(false)
    }
  }, [endCursor, loading])

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <Head>
        <title>Local News - WCBI TV | Telling Your Story</title>
        <meta name="description" content="Latest local news from Columbus, Mississippi and the Golden Triangle." />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header navItems={navItems} />
        <div className="bg-[#003D7A] py-6 border-b-4 border-[#CC0000]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wide">Local News</h1>
            <p className="text-blue-200 text-sm mt-1">Columbus, Mississippi &amp; the Golden Triangle</p>
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
                            <span className="bg-[#003D7A] text-white text-xs font-bold px-2.5 py-1 rounded">LOCAL NEWS</span>
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
                <span className="bg-[#003D7A] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider inline-block">Latest News</span>
              </div>

              {/* Horizontal card list */}
              <div className="space-y-4">
                {rest.map((post) => {
                  const category = post.categories?.edges?.[0]?.node?.name || 'NEWS'
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
                  <p>No stories found. Check back soon.</p>
                </div>
              )}

              {/* Load More button */}
              {hasNextPage && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-[#003D7A] hover:bg-[#002A5A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded transition-colors duration-200"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

            {/* Sidebar */}
            <aside className="space-y-6" style={{ width: '100%', maxWidth: '288px', flexShrink: 0, position: 'sticky', top: '1rem' }}>
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
    const result = await getPostsByCategory('local-news', PAGE_SIZE)
    const posts: Post[] = result?.posts?.edges?.map((e: { node: Post }) => e.node) || []
    const initialEndCursor = result?.posts?.pageInfo?.endCursor || null
    const initialHasNextPage = result?.posts?.pageInfo?.hasNextPage || false
    return { props: { posts, initialEndCursor, initialHasNextPage }, revalidate: 60 }
  } catch (err) {
    console.error('Error fetching local news:', err)
    return { props: { posts: [], initialEndCursor: null, initialHasNextPage: false }, revalidate: 60 }
  }
}
