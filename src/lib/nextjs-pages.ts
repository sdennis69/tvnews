/**
 * nextjs-pages.ts
 *
 * Whitelist of WordPress page slugs that should be rendered by Next.js.
 * Any page slug NOT in this list will be redirected to WordPress directly
 * so that WPBakery and other PHP-rendered content works correctly.
 *
 * HOW TO ADD A PAGE TO NEXT.JS:
 *   Add its slug to the NEXTJS_PAGE_SLUGS array below.
 *
 * HOW TO LET WORDPRESS/WPBAKERY HANDLE A PAGE:
 *   Simply don't add it here — it will automatically redirect to WordPress.
 *
 * NOTE: Article posts (/[slug] via [post].tsx) are always handled by Next.js
 * and are not affected by this list.
 */

export const NEXTJS_PAGE_SLUGS: string[] = [
  // ── Category/listing pages managed in Next.js ──
  'news',
  'weather-news',
  'sports',
  'crime',
  'national-world-news',

  // ── Add more Next.js-managed page slugs here as needed ──
]
