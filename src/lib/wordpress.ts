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
      console.error('GraphQL errors:', result.errors)
      return null
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
      seo?: { title?: string; metaDesc?: string }
    } | null
  }>(query, { slug })

  return result?.pageBy || null
}
