/**
 * [wppage].tsx — Catch-all route for WordPress pages
 *
 * Handles any URL slug that isn't already covered by a specific Next.js page
 * (e.g. /weather-news/, /about/, /contact/, /advertise/).
 *
 * How it works:
 * - getServerSideProps fetches the WordPress page by its slug via GraphQL
 * - If found, renders the page title + WPBakery/Gutenberg content as HTML
 * - If not found, returns 404
 *
 * This means editors can create any page in WordPress and link to it from
 * Appearance > Menus without any code changes needed.
 */

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import RevcontentWidget from '../src/components/RevcontentWidget'
import type { NavItem } from './_app'
import { getPageBySlug } from '../src/lib/wordpress'

interface WPPage {
  id: string
  title: string
  content: string
  slug: string
  date: string
  featuredImage?: { node: { sourceUrl: string } }
}

interface Props {
  page: WPPage | null
  navItems?: NavItem[]
}

export default function WordPressPage({ page, navItems }: Props) {
  if (!page) return null // 404 handled by getServerSideProps notFound: true

  const seoTitle = `${page.title} - WCBI`
  const seoDesc = ''
  const image = page.featuredImage?.node?.sourceUrl || ''

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        {seoDesc && <meta name="description" content={seoDesc} />}
        {image && <meta property="og:image" content={image} />}
        <meta property="og:title" content={page.title} />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-[#F5F5F5]">
        <Header navItems={navItems} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8" style={{ alignItems: 'flex-start' }}>

            {/* ── LEFT: Page Content ── */}
            <div style={{ flex: '1 1 500px', minWidth: 0 }}>

              {/* Featured Image */}
              {image && (
                <div className="mb-6 rounded overflow-hidden">
                  <Image
                    src={image}
                    alt={page.title}
                    width={900}
                    height={500}
                    className="w-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Page Title */}
              <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6 leading-tight">
                {page.title}
              </h1>

              {/* Page Body — rendered by WordPress (supports WPBakery, Gutenberg, Classic) */}
              <div
                className="prose prose-lg max-w-none wp-content"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <aside
              className="space-y-6 hidden lg:block"
              style={{ width: '288px', flexShrink: 0, position: 'sticky', top: '1rem' }}
            >
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.wppage as string

  try {
    const page = await getPageBySlug(slug)

    if (!page) {
      return { notFound: true }
    }

    return {
      props: { page },
    }
  } catch (err) {
    console.error('Error fetching WP page:', err)
    return { notFound: true }
  }
}
