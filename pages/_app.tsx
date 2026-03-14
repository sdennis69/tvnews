/**
 * _app.tsx — App-level wrapper
 *
 * Fetches the WordPress PRIMARY nav menu once via getInitialProps so every
 * page automatically receives navItems without each page needing its own
 * menu fetch. Falls back to hardcoded defaults if WordPress is unreachable
 * or the menu hasn't been configured yet.
 *
 * Performance note: getInitialProps on _app runs server-side on first load
 * and client-side on subsequent navigations. The menu data is tiny (< 1 KB)
 * so it has negligible impact on TTFB or PageSpeed scores.
 */

import type { AppProps } from 'next/app'
import App from 'next/app'
import '../styles/globals.css'
import { getMenuItems } from '../src/lib/wordpress'

export interface NavItem {
  id: string
  label: string
  url: string
  children: { id: string; label: string; url: string }[]
}

// Hardcoded fallback nav — used when WordPress menu is empty or unreachable
const FALLBACK_NAV: NavItem[] = [
  { id: 'home', label: 'HOME', url: '/', children: [] },
  { id: 'news', label: 'NEWS', url: '/news', children: [] },
  { id: 'weather', label: 'WEATHER', url: '/weather', children: [] },
  { id: 'sports', label: 'SPORTS', url: '/sports', children: [] },
  { id: 'videos', label: 'VIDEOS', url: '/videos', children: [] },
  { id: 'livestream', label: 'LIVESTREAM', url: '/livestream', children: [] },
]

interface MyAppProps extends AppProps {
  navItems: NavItem[]
}

export default function MyApp({ Component, pageProps, navItems }: MyAppProps) {
  return <Component {...pageProps} navItems={navItems} />
}

MyApp.getInitialProps = async (appContext: any) => {
  // Run default App getInitialProps first
  const appProps = await App.getInitialProps(appContext)

  let navItems: NavItem[] = FALLBACK_NAV

  try {
    const items = await getMenuItems('PRIMARY')
    if (items && items.length > 0) {
      // Normalize WordPress URLs: strip the WP domain so links are relative
      // e.g. https://tvnews2.wpenginepowered.com/news → /news
      const wpBase = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
      navItems = items.map((item) => ({
        ...item,
        url: item.url.replace(wpBase, '') || '/',
        children: item.children.map((c) => ({
          ...c,
          url: c.url.replace(wpBase, '') || '/',
        })),
      }))
    }
  } catch (err) {
    console.error('Failed to fetch WordPress menu, using fallback:', err)
  }

  return { ...appProps, navItems }
}
