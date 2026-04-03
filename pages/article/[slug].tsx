import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../src/components/Header'
import Footer from '../../src/components/Footer'
import RevcontentWidget from '../../src/components/RevcontentWidget'
import type { NavItem } from '../_app'
import { getPostBySlug, getPosts, getAllPostSlugs } from '../../src/lib/wordpress'

interface Post {
  id: string
  title: string
  content?: string
  excerpt?: string
  slug: string
  date: string
  featuredImage?: { node: { sourceUrl: string } }
  author?: { node: { name: string; description?: string } }
  categories?: { edges: Array<{ node: { name: string; slug: string } }> }
}

interface RelatedPost {
  id: string
  title: string
  slug: string
  date: string
  featuredImage?: { node: { sourceUrl: string } }
  categories?: { edges: Array<{ node: { name: string } }> }
}

interface Props {
  post: Post | null
  related: RelatedPost[]
  notFound: boolean
  navItems?: NavItem[]
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticlePage({ post, related, notFound, navItems }: Props) {
  const category = post?.categories?.edges?.[0]?.node?.name || 'News'
  const author = post?.author?.node?.name || 'Staff'
  const image = post?.featuredImage?.node?.sourceUrl || ''

  const seoTitle = post?.seo?.title || (post ? `${post.title} - WCBI` : 'Article - WCBI')
  const seoDesc = post?.seo?.metaDesc || (post?.excerpt ? post.excerpt.replace(/<[^>]*>/g, '').slice(0, 160) : '')
  const ogImage = post?.seo?.opengraphImage?.sourceUrl || image

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        {seoDesc && <meta name="description" content={seoDesc} />}
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            {/* Preload the LCP image so browser discovers it immediately */}
            <link rel="preload" as="image" href={image || ogImage} />
          </>
        )}
        {post && (
          <>
            <meta property="og:title" content={post.seo?.opengraphTitle || post.title} />
            <meta property="og:description" content={post.seo?.opengraphDescription || seoDesc} />
            <meta property="og:type" content="article" />
          </>
        )}
      </Head>

      <main className="min-h-screen bg-white">
        <Header navItems={navItems} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Not Found State */}
          {notFound && (
            <div className="py-24 text-center">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Article Not Found</h1>
              <p className="text-[#555555] mb-8">This article may have been removed or the link is incorrect.</p>
              <Link href="/">
                <a className="bg-[#003D7A] text-white px-6 py-3 rounded font-semibold hover:bg-[#002A5A] transition-colors">
                  ← Back to Home
                </a>
              </Link>
            </div>
          )}

          {/* Article + Sidebar Layout */}
          {post && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

              {/* ── LEFT: Main Article ── */}
              <div style={{ flex: '1 1 500px', minWidth: 0 }}>

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-[#555555] mb-4">
                  <Link href="/"><a className="hover:text-[#003D7A] transition-colors">Home</a></Link>
                  <span>/</span>
                  <Link href="/news"><a className="hover:text-[#003D7A] transition-colors">{category}</a></Link>
                  <span>/</span>
                  <span className="text-[#555555] line-clamp-1">{post.title}</span>
                </nav>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className="bg-[#003D7A] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider inline-block">
                    {category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-[#111111] leading-tight mb-3">
                  {post.title}
                </h1>

                {/* Byline */}
                <p className="text-sm text-[#666666] mb-6">
                  {formatDate(post.date)}
                  {' · '}
                  <span className="font-medium">by {author}</span>
                  <span className="text-[#666666] ml-2">({timeAgo(post.date)})</span>
                </p>

                {/* Article body with image floated right */}
                <div className="text-[#333333] text-base leading-relaxed">
                  {/* Featured image floated right — explicit dimensions prevent layout shift */}
                  {image && (
                    <div className="hidden sm:block float-right ml-6 mb-4 flex-shrink-0 clear-right" style={{ width: '320px', height: '240px', position: 'relative' }}>
                      <Image
                        src={image}
                        alt={post.title}
                        fill
                        sizes="320px"
                        className="rounded shadow-sm object-cover"
                        priority
                        fetchPriority="high"
                      />
                    </div>
                  )}

                  {/* Featured image — full width on mobile only */}
                  {image && (
                    <div className="block sm:hidden w-full mb-4 relative rounded overflow-hidden" style={{ height: '220px' }}>
                      <Image
                        src={image}
                        alt={post.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  {/* Article content */}
                  <div
                    className="prose prose-base max-w-none
                      prose-headings:text-[#111111] prose-headings:font-bold
                      prose-a:text-[#003D7A] prose-a:no-underline hover:prose-a:underline
                      prose-img:rounded prose-img:w-full prose-img:clear-both
                      prose-blockquote:border-l-4 prose-blockquote:border-[#003D7A] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#555555]
                      prose-strong:text-[#111111]"
                    dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }}
                  />
                  <div className="clear-both"></div>
                </div>

                {/* Share Bar */}
                <div className="mt-8 pt-6 border-t border-[#DDDDDD]">
                  <p className="text-xs font-bold text-[#333333] mb-3 uppercase tracking-wider">Share this story</p>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1877F2] text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1DA1F2] text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Twitter
                    </a>
                    <button
                      onClick={() => {
                        if (typeof navigator !== 'undefined') {
                          navigator.clipboard.writeText(window.location.href)
                        }
                      }}
                      className="bg-[#666666] text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>

                {/* Author Bio */}
                {post.author?.node?.description && (
                  <div className="mt-8 p-5 bg-[#F5F5F5] rounded-lg border border-[#DDDDDD]">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#003D7A] flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                        {author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[#111111] mb-1">{author}</p>
                        <p className="text-sm text-[#666666] leading-relaxed">{post.author.node.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Related Articles */}
                {related.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-sm font-bold text-white bg-[#003D7A] px-4 py-2 uppercase tracking-wider inline-block mb-5">
                      More Stories
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {related.map((rel) => (
                        <Link key={rel.id} href={`/article/${rel.slug}`}>
                          <a className="group flex gap-3 bg-[#F9F9F9] rounded-lg overflow-hidden border border-[#EEEEEE] hover:shadow-md transition-shadow p-3">
                            {rel.featuredImage?.node?.sourceUrl && (
                              <div className="flex-shrink-0 relative overflow-hidden rounded bg-[#E8E8E8]" style={{ width: '96px', height: '64px' }}>
                                <Image
                                  src={rel.featuredImage.node.sourceUrl}
                                  alt={rel.title}
                                  fill
                                  sizes="96px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[#003D7A] font-bold uppercase mb-1">
                                {rel.categories?.edges?.[0]?.node?.name || 'News'}
                              </p>
                              <h3 className="text-sm font-bold text-[#222222] group-hover:text-[#003D7A] transition-colors leading-snug line-clamp-3">
                                {rel.title}
                              </h3>
                              <p className="text-xs text-[#555555] mt-1">{timeAgo(rel.date)}</p>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to Home */}
                <div className="mt-10 mb-4">
                  <Link href="/">
                    <a className="inline-block border-2 border-[#003D7A] text-[#003D7A] px-5 py-2 rounded text-sm font-semibold hover:bg-[#003D7A] hover:text-white transition-colors">
                      ← Back to Home
                    </a>
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: Sidebar ── */}
              <aside className="space-y-6 w-full" style={{ width: '100%', maxWidth: '288px', position: 'sticky', top: '1rem' }}>

                {/* Revcontent Widget */}
                {/* CLS fix: reserve min-height so widget expanding doesn't shift layout */}
                <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                  <div className="bg-[#003D7A] px-3 py-2 flex items-center justify-between">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Trending</span>
                    <span className="text-white/60 text-xs">Ads By Revcontent</span>
                  </div>
                  <RevcontentWidget className="p-2" />
                </div>

                {/* Generic Ad / Widget Slot 3 */}
                <div className="bg-white border border-[#DDDDDD] rounded overflow-hidden">
                  <div className="bg-[#003D7A] px-3 py-2">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Advertisement</span>
                  </div>
                  <div
                    id="sidebar-ad-slot-1"
                    className="min-h-[250px] flex items-center justify-center text-[#666666] text-xs p-4 text-center"
                  >
                    <span>Ad Unit<br />(300×250 or 300×600)</span>
                  </div>
                </div>

              </aside>

            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  )
}

/**
 * ISR: Pre-build the 200 most recent articles at deploy time.
 * Older articles are built on first request (fallback: 'blocking') then cached.
 * All pages revalidate every 60 seconds in the background.
 */
export async function getStaticPaths() {
  const slugs = await getAllPostSlugs(200)
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking', // Build unknown slugs on first request, then cache
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    const [postResponse, latestResponse] = await Promise.all([
      getPostBySlug(slug),
      getPosts(6),
    ])

    if (!postResponse?.postBy) {
      return { notFound: true }
    }

    const post = postResponse.postBy
    const related = (latestResponse?.posts?.edges || [])
      .map((e: any) => e.node)
      .filter((p: RelatedPost) => p.slug !== slug)
      .slice(0, 4)

    return {
      props: { post, related, notFound: false },
      revalidate: 60, // Rebuild in background every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return { notFound: true }
  }
}
