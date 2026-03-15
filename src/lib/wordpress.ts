/**
 * WordPress GraphQL Integration for WP Engine Atlas
 * 
 * This module handles all GraphQL queries to the WordPress backend.
 * Update WORDPRESS_URL and authentication as needed for your WP Engine setup.
 */

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-site.wpengine.com'

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

interface PostNode {
  id: string
  title: string
  slug: string
  excerpt?: string
  date: string
  featuredImage?: {
    node: {
      sourceUrl: string
    }
  }
  author?: {
    node: {
      name: string
      description?: string
    }
  }
  categories?: {
    edges: Array<{
      node: {
        name: string
        slug: string
      }
    }>
  }
  content?: string
  seo?: {
    title?: string
    metaDesc?: string
    opengraphTitle?: string
    opengraphDescription?: string
    opengraphImage?: { sourceUrl: string }
  }
}

interface PostsResponse {
  posts: {
    edges: Array<{
      node: PostNode
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor?: string
    }
  }
}

interface PostBySlugResponse {
  postBy: PostNode
}

interface CategoriesResponse {
  categories: {
    edges: Array<{
      node: {
        id: string
        name: string
        slug: string
        description?: string
      }
    }>
  }
}

interface SiteSettingsResponse {
  generalSettings: {
    title: string
    description: string
    url: string
  }
}

/**
 * Execute a GraphQL query against the WordPress backend
 */
export async function queryWordPress<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T | null> {
  try {
    const response = await fetch(`${WORDPRESS_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      console.error(`GraphQL request failed: ${response.status}`)
      return null
    }

    const result: GraphQLResponse<T> = await response.json()

    if (result.errors) {
      console.error('GraphQL errors:', JSON.stringify(result.errors))
      // Return partial data if available — don't bail on non-fatal errors
      if (!result.data) return null
    }

    return result.data || null
  } catch (error) {
    console.error('WordPress query error:', error)
    return null
  }
}

/**
 * Fetch all published posts with pagination
 */
export async function getPosts(first: number = 10, after?: string) {
  const query = `
    query GetPosts($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `

  return queryWordPress<PostsResponse>(query, { first, after })
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($slug: String!) {
      postBy(slug: $slug) {
        id
        title
        content(format: RENDERED)
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
            description
          }
        }
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `

  return queryWordPress<PostBySlugResponse>(query, { slug })
}

/**
 * Fetch posts by category
 */
export async function getPostsByCategory(categorySlug: string, first: number = 10) {
  const query = `
    query GetPostsByCategory($categorySlug: String!, $first: Int) {
      posts(first: $first, where: { categoryName: $categorySlug }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
  `

  return queryWordPress<PostsResponse>(query, { categorySlug, first })
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  const query = `
    query GetCategories {
      categories(first: 100) {
        edges {
          node {
            id
            name
            slug
            description
          }
        }
      }
    }
  `

  return queryWordPress<CategoriesResponse>(query)
}

/**
 * Fetch featured/sticky posts
 */
export async function getFeaturedPosts(first: number = 5) {
  const query = `
    query GetFeaturedPosts($first: Int) {
      posts(first: $first, where: { sticky: true }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `

  return queryWordPress<PostsResponse>(query, { first })
}

/**
 * Search posts by keyword
 */
export async function searchPosts(search: string, first: number = 10) {
  const query = `
    query SearchPosts($search: String!, $first: Int) {
      posts(first: $first, where: { search: $search }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `

  return queryWordPress<PostsResponse>(query, { search, first })
}

/**
 * Fetch navigation menu items by menu location or name
 * Requires WPGraphQL Menu plugin or WPGraphQL (v0.9+) with menu support
 */
export async function getMenuItems(menuLocation: string = 'PRIMARY') {
  const query = `
    query GetMenuItems($location: MenuLocationEnum) {
      menuItems(where: { location: $location }, first: 50) {
        edges {
          node {
            id
            label
            url
            parentId
            childItems {
              edges {
                node {
                  id
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  `

  const result = await queryWordPress<{
    menuItems: {
      edges: Array<{
        node: {
          id: string
          label: string
          url: string
          parentId: string | null
          childItems: {
            edges: Array<{
              node: { id: string; label: string; url: string }
            }>
          }
        }
      }>
    }
  }>(query, { location: menuLocation })

  if (!result?.menuItems?.edges) return []

  // Return only top-level items (no parentId) with their children
  return result.menuItems.edges
    .map((e) => e.node)
    .filter((item) => !item.parentId)
    .map((item) => ({
      id: item.id,
      label: item.label,
      url: item.url,
      children: item.childItems?.edges?.map((c) => ({
        id: c.node.id,
        label: c.node.label,
        url: c.node.url,
      })) || [],
    }))
}

/**
 * Fetch site settings
 */
export async function getSiteSettings() {
  const query = `
    query GetSiteSettings {
      generalSettings {
        title
        description
        url
      }
    }
  `

  return queryWordPress<SiteSettingsResponse>(query)
}

/**
 * Fetch a WordPress PAGE (not post) by its slug.
 * Used by the catch-all page route to render any WP page linked from the nav.
 */
export async function getPageBySlug(slug: string) {
  const query = `
    query GetPageBySlug($slug: String!) {
      pageBy(uri: $slug) {
        id
        title
        content(format: RENDERED)
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `
  const result = await queryWordPress<{
    pageBy: {
      id: string
      title: string
      content: string
      slug: string
      date: string
      featuredImage?: { node: { sourceUrl: string } }
      seo?: {
        title?: string
        metaDesc?: string
        opengraphTitle?: string
        opengraphDescription?: string
        opengraphImage?: { sourceUrl: string }
      }
    } | null
  }>(query, { slug })

  return result?.pageBy || null
}

// ── ISR helpers ────────────────────────────────────────────────────────────────

/**
 * Fetch the most recent post slugs for getStaticPaths.
 * Pre-builds the top N articles at deploy time; older articles are built
 * on first request (fallback: 'blocking') and then cached via ISR.
 */
export async function getAllPostSlugs(first: number = 200): Promise<string[]> {
  const data = await queryWordPress<{
    posts: { nodes: { slug: string }[] }
  }>(`
    query GetAllPostSlugs($first: Int!) {
      posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
        }
      }
    }
  `, { first })

  if (!data?.posts?.nodes) return []
  return data.posts.nodes.map((n) => n.slug)
}

/**
 * Fetch all published page slugs for getStaticPaths on [wppage].
 * Excludes the homepage (slug: 'home') since that has its own route.
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const data = await queryWordPress<{
    pages: { nodes: { slug: string }[] }
  }>(`
    query GetAllPageSlugs {
      pages(first: 500, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `)

  if (!data?.pages?.nodes) return []
  return data.pages.nodes
    .map((n) => n.slug)
    .filter((slug) => slug !== 'home' && slug !== 'sample-page')
}
