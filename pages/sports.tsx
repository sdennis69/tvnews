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

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function stripHtml(h: string) { return h.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim() }

const CAT_COLORS: Record<string, string> = {
  'local-sports': '#003D7A',
  'college-sports': '#CC0000',
  'high-school-sports': '#006600',
  'national-sports': '#555555',
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
            <div style={{ flex: '1 1 500px', minWidth: 0 }}>
              {featured && (
                <Link href={`/article/${featured.slug}`}>
                  <a className="block mb-8 group">
                    <div className="bg-white rounded overflow-hidden shadow-sm border border-[#DDDDDD] hover:shadow-md transition-shadow">
                      {featured.featuredImage?.node?.sourceUrl ? (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <Image src={featured.featuredImage.node.sourceUrl} alt={featured.title} layout="fill" objectFit="cover" priority />
                        </div>
                      ) : <div className="h-64 bg-gradient-to-r from-[#003D7A] to-[#CC0000]" />}
                      <div className="p-5">
                        <span className="inline-block bg-[#CC0000] text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-3">Sports</span>
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#003D7A] transition-colors leading-tight">{featured.title}</h2>
                        {featured.excerpt && <p className="text-[#555555] text-sm mb-3">{stripHtml(featured.excerpt).slice(0, 180)}</p>}
                        <div className="flex items-center gap-3 text-xs text-[#999999]">
                          {featured.author?.node?.name && <span>{featured.author.node.name}</span>}
                          <span>{formatDate(featured.date)}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              )}
              <div className="border-b-2 border-[#003D7A] mb-6">
                <span className="bg-[#003D7A] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider inline-block">More Sports</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map((post) => {
                  const catSlug = post.categories?.edges?.[0]?.node?.slug || ''
                  const badgeColor = CAT_COLORS[catSlug] || '#003D7A'
                  const catName = post.categories?.edges?.[0]?.node?.name || 'Sports'
                  return (
                    <Link key={post.id} href={`/article/${post.slug}`}>
                      <a className="block group">
                        <div className="bg-white rounded overflow-hidden shadow-sm border border-[#DDDDDD] hover:shadow-md transition-shadow h-full">
                          {post.featuredImage?.node?.sourceUrl ? (
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                              <Image src={post.featuredImage.node.sourceUrl} alt={post.title} layout="fill" objectFit="cover" />
                            </div>
                          ) : <div className="h-40 bg-gradient-to-r from-[#003D7A] to-[#CC0000]" />}
                          <div className="p-4">
                            <span
                              className="inline-block text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider mb-2 rounded"
                              style={{ backgroundColor: badgeColor }}
                            >{catName}</span>
                            <h3 className="text-base font-bold text-[#1A1A1A] mb-2 group-hover:text-[#003D7A] transition-colors leading-snug">{post.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-[#999999]">
                              {post.author?.node?.name && <span>{post.author.node.name}</span>}
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </div>
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
