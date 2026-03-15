/**
 * _app.tsx — App-level wrapper
 *
 * Navigation is now hardcoded in Header.tsx — no WordPress menu fetch needed.
 * This restores Next.js Automatic Static Optimization for all static pages.
 */

import type { AppProps } from 'next/app'
import '../styles/globals.css'

// Kept for type compatibility with pages that still accept navItems prop
export interface NavItem {
  id: string
  label: string
  url: string
  children: { id: string; label: string; url: string }[]
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
