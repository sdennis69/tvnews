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

  return queryWordPress(query, { first, after })
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
        content
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

  return queryWordPress(query, { slug })
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

  return queryWordPress(query, { categorySlug, first })
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

  return queryWordPress(query)
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
          }
        }
      }
    }
  `

  return queryWordPress(query, { first })
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

  return queryWordPress(query, { search, first })
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

  return queryWordPress(query)
}
