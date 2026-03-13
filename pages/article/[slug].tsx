import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../src/components/Header'
import Footer from '../../src/components/Footer'
import { getPostBySlug, getPosts } from '../../src/lib/wordpress'

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

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ArticlePage() {
  const router = useRouter()
  const { slug } = router.query

  const [post, setPost] = useState<Post | null>(null)
  const [related, setRelated] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return

    const fetchPost = async () => {
      setLoading(true)
      setNotFound(false)
      try {
        const response = await getPostBySlug(slug)
        if (response?.postBy) {
          setPost(response.postBy)
          // Fetch related posts
          const latestResponse = await getPosts(6)
          if (latestResponse?.posts?.edges) {
            const others = latestResponse.posts.edges
              .map((e: any) => e.node)
              .filter((p: RelatedPost) => p.slug !== slug)
              .slice(0, 3)
            setRelated(others)
          }
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const category = post?.categories?.edges?.[0]?.node?.name || 'News'
  const author = post?.author?.node?.name || 'Staff'
  const image = post?.featuredImage?.node?.sourceUrl || ''

  return (
    <>
      <Head>
        <title>{post ? `${post.title} - WCBI` : 'Article - WCBI'}</title>
        {post?.excerpt && (
          <meta name="description" content={post.excerpt.replace(/<[^>]*>/g, '')} />
        )}
        {image && <meta property="og:image" content={image} />}
      </Head>

      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />

        {/* Loading State */}
        {loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-[#E8E8E8] rounded w-1/4"></div>
              <div className="h-8 bg-[#E8E8E8] rounded w-3/4"></div>
              <div className="h-4 bg-[#E8E8E8] rounded w-1/3"></div>
              <div className="w-full h-96 bg-[#E8E8E8] rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-[#E8E8E8] rounded w-full"></div>
                <div className="h-4 bg-[#E8E8E8] rounded w-full"></div>
                <div className="h-4 bg-[#E8E8E8] rounded w-5/6"></div>
              </div>
            </div>
          </div>
        )}

        {/* Not Found State */}
        {!loading && notFound && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-3xl font-bold text-[#333333] mb-4">Article Not Found</h1>
            <p className="text-[#888888] mb-8">This article may have been removed or the link is incorrect.</p>
            <Link href="/">
              <a className="bg-[#003D7A] text-white px-6 py-3 rounded font-semibold hover:bg-[#002A5A] transition-colors">
                ← Back to Home
              </a>
            </Link>
          </div>
        )}

        {/* Article Content */}
        {!loading && post && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#888888] mb-6">
              <Link href="/"><a className="hover:text-[#003D7A] transition-colors">Home</a></Link>
              <span>/</span>
              <Link href="/news"><a className="hover:text-[#003D7A] transition-colors">{category}</a></Link>
              <span>/</span>
              <span className="text-[#333333] line-clamp-1">{post.title}</span>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-[#003D7A] text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider inline-block">
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111111] leading-tight mb-4">
              {post.title}
            </h1>

            {/* Byline */}
            <div className="flex items-center gap-4 text-sm text-[#666666] mb-6 pb-6 border-b border-[#DDDDDD]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#003D7A] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-semibold text-[#333333]">By {author}</span>
                </div>
              </div>
              <span className="text-[#CCCCCC]">|</span>
              <span title={formatDate(post.date)}>{timeAgo(post.date)}</span>
              <span className="text-[#CCCCCC]">|</span>
              <span className="hidden sm:block">{formatDate(post.date)}</span>
            </div>

            {/* Featured Image */}
            {image && (
              <div className="mb-8 rounded overflow-hidden">
                <img
                  src={image}
                  alt={post.title}
                  className="w-full object-cover max-h-[500px]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none text-[#333333] leading-relaxed
                prose-headings:text-[#111111] prose-headings:font-bold
                prose-a:text-[#003D7A] prose-a:no-underline hover:prose-a:underline
                prose-img:rounded prose-img:w-full
                prose-blockquote:border-l-4 prose-blockquote:border-[#003D7A] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#555555]
                prose-strong:text-[#111111]"
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }}
            />

            {/* Share Bar */}
            <div className="mt-10 pt-6 border-t border-[#DDDDDD]">
              <p className="text-sm font-semibold text-[#333333] mb-3 uppercase tracking-wider">Share this story</p>
              <div className="flex gap-3">
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
              <div className="mt-8 p-6 bg-white rounded-lg border border-[#DDDDDD]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#003D7A] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
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
              <div className="mt-12">
                <h2 className="text-lg font-bold text-white bg-[#003D7A] px-4 py-2 inline-block uppercase tracking-wider mb-6">
                  More Stories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {related.map((rel) => (
                    <Link key={rel.id} href={`/article/${rel.slug}`}>
                      <a className="group block bg-white rounded-lg overflow-hidden border border-[#DDDDDD] hover:shadow-md transition-shadow">
                        {rel.featuredImage?.node?.sourceUrl && (
                          <div className="overflow-hidden h-40">
                            <img
                              src={rel.featuredImage.node.sourceUrl}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <p className="text-xs text-[#003D7A] font-bold uppercase mb-1">
                            {rel.categories?.edges?.[0]?.node?.name || 'News'}
                          </p>
                          <h3 className="text-sm font-bold text-[#222222] group-hover:text-[#003D7A] transition-colors leading-snug line-clamp-3">
                            {rel.title}
                          </h3>
                          <p className="text-xs text-[#888888] mt-2">{timeAgo(rel.date)}</p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Home */}
            <div className="mt-10 text-center">
              <Link href="/">
                <a className="inline-block border-2 border-[#003D7A] text-[#003D7A] px-6 py-2 rounded font-semibold hover:bg-[#003D7A] hover:text-white transition-colors">
                  ← Back to Home
                </a>
              </Link>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  )
}
