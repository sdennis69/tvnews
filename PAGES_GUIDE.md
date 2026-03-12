# How to Add and Edit Pages in Your TV Station Website

## Quick Overview

Your website uses **Next.js Pages Router**, which means:
- Every file in the `pages/` folder automatically becomes a route
- `pages/index.tsx` → `yoursite.com/`
- `pages/about.tsx` → `yoursite.com/about`
- `pages/news/category.tsx` → `yoursite.com/news/category`

---

## Adding a New Page

### Step 1: Create a New File

Create a new file in the `pages/` folder. For example, to create an "About Us" page:

**File:** `pages/about.tsx`

```tsx
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - TV News</title>
        <meta name="description" content="Learn about our news station" />
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-[#333333] mb-6">About Us</h1>
          <p className="text-[#555555] text-lg leading-relaxed">
            Welcome to our news station...
          </p>
        </div>

        <Footer />
      </main>
    </>
  )
}
```

### Step 2: Add Navigation Link

Edit `src/components/Header.tsx` to add a link to your new page:

```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'ABOUT', href: '/about' },  // ← Add this line
  { label: 'LIVESTREAM', href: '/livestream' },
]
```

### Step 3: Build and Test

```bash
npm run build
npm run dev
```

Visit `http://localhost:3000/about` to see your new page.

---

## Editing Existing Pages

### Current Pages in Your Site

| Page | File | URL |
|------|------|-----|
| Homepage | `pages/index.tsx` | `/` |
| Live Stream | `pages/livestream.tsx` | `/livestream` |
| 404 Error | `pages/404.tsx` | (automatic) |

### How to Edit a Page

**Example: Edit the Homepage**

1. Open `pages/index.tsx`
2. Modify the content inside the `<main>` tag
3. Save the file
4. The dev server will automatically reload (hot reload)

**Example: Edit the Header Text**

```tsx
// In pages/index.tsx
<h1 className="text-4xl font-bold text-[#333333]">
  Breaking News & Local Stories  {/* ← Change this text */}
</h1>
```

---

## Common Page Structures

### Basic Page with Hero Section

```tsx
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>News - TV News</title>
      </Head>
      <main className="min-h-screen bg-[#F5F5F5]">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-[#003D7A] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white">Latest News</h1>
            <p className="text-[#00DD00] mt-2">Stay updated with breaking stories</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-[#555555]">Your content here...</p>
        </div>

        <Footer />
      </main>
    </>
  )
}
```

### Page with Two Columns

```tsx
export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#333333] mb-4">Main Content</h2>
              <p className="text-[#555555]">Your main content here...</p>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white bg-[#003D7A] px-3 py-2 mb-4">
                Sidebar
              </h3>
              <p className="text-[#555555]">Sidebar content here...</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
```

---

## Color Reference (WCBI Theme)

Use these colors throughout your pages:

```
Primary (Dark Blue):     #003D7A
Accent (Bright Green):   #00DD00
Dark Accent (Green):     #00BB00
Background (Light):      #F5F5F5
Text (Dark):             #333333
Text (Medium):           #555555
Text (Light):            #999999
White:                   #FFFFFF
```

### Tailwind Classes

```tsx
// Background colors
<div className="bg-[#003D7A]">Dark Blue</div>
<div className="bg-[#00DD00]">Bright Green</div>
<div className="bg-[#F5F5F5]">Light Gray</div>

// Text colors
<h1 className="text-[#333333]">Dark Text</h1>
<p className="text-[#555555]">Medium Text</p>
<span className="text-[#00DD00]">Green Accent</span>

// Common combinations
<button className="bg-[#00DD00] text-[#003D7A] font-bold px-4 py-2 rounded">
  Click Me
</button>

<div className="bg-[#003D7A] text-white p-6 rounded">
  Dark Blue Section
</div>
```

---

## Adding Dynamic Content (from WordPress)

To fetch articles from WordPress on your page:

```tsx
import { useEffect, useState } from 'react'
import { getPosts } from '../src/lib/wordpress'

export default function NewsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(10)
        if (response?.posts?.edges) {
          setPosts(response.posts.edges.map((edge: any) => edge.node))
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 mb-4 rounded">
            <h2 className="text-2xl font-bold text-[#333333]">{post.title}</h2>
            <p className="text-[#555555]">{post.excerpt}</p>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  )
}
```

---

## Creating Nested Routes

To create nested pages like `/news/local` or `/sports/college`:

### Create Folder Structure

```
pages/
  news/
    index.tsx      → /news
    local.tsx      → /news/local
    national.tsx   → /news/national
  sports/
    index.tsx      → /sports
    college.tsx    → /sports/college
```

### Example: `pages/news/local.tsx`

```tsx
export default function LocalNewsPage() {
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#333333]">Local News</h1>
        {/* Your local news content */}
      </div>
      <Footer />
    </main>
  )
}
```

---

## Reusable Components

Create components in `src/components/` and use them across pages:

### Create `src/components/NewsCard.tsx`

```tsx
export default function NewsCard({ title, excerpt, date, image }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#DDDDDD]">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#333333] mb-2">{title}</h3>
        <p className="text-[#555555] text-sm mb-2">{excerpt}</p>
        <span className="text-xs text-[#999999]">{date}</span>
      </div>
    </div>
  )
}
```

### Use in Your Page

```tsx
import NewsCard from '../src/components/NewsCard'

export default function NewsPage() {
  const articles = [
    { id: 1, title: 'Breaking News', excerpt: '...', date: '2 hours ago', image: '...' },
    { id: 2, title: 'Local Story', excerpt: '...', date: '4 hours ago', image: '...' },
  ]

  return (
    <main>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>
      <Footer />
    </main>
  )
}
```

---

## File Structure Reference

```
tv-station-website/
├── pages/                          ← All your pages go here
│   ├── index.tsx                   ← Homepage
│   ├── livestream.tsx              ← Live stream page
│   ├── about.tsx                   ← About page (you create this)
│   ├── news/
│   │   ├── index.tsx               ← /news
│   │   ├── local.tsx               ← /news/local
│   │   └── national.tsx            ← /news/national
│   ├── _app.tsx                    ← App wrapper (don't edit usually)
│   ├── _document.tsx               ← HTML wrapper (don't edit usually)
│   └── 404.tsx                     ← 404 error page
├── src/
│   ├── components/                 ← Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FeaturedStory.tsx
│   │   ├── ArticleList.tsx
│   │   └── NewsCard.tsx            ← Your new component
│   ├── lib/
│   │   └── wordpress.ts            ← WordPress API functions
│   └── pages/                      ← Don't use this folder
├── styles/
│   └── globals.css                 ← Global styles
├── tailwind.config.js              ← Tailwind configuration
└── package.json
```

---

## Deployment

After making changes:

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add new page: About Us"
   git push origin main
   ```

4. **WP Engine Atlas rebuilds automatically** (2-3 minutes)

---

## Tips & Best Practices

1. **Always include `<Head>`** with title and meta description for SEO
2. **Use the Header and Footer components** on every page for consistency
3. **Keep pages in the `pages/` folder** — this is how Next.js routing works
4. **Use Tailwind classes** instead of custom CSS for styling
5. **Test locally before pushing** to catch errors early
6. **Use components for repeated content** to avoid duplication
7. **Keep color consistent** — use the WCBI theme colors defined above

---

## Common Tasks

### Add a Contact Form Page

```tsx
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your form submission logic here
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#333333] mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mb-4 p-3 border border-[#DDDDDD] rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mb-4 p-3 border border-[#DDDDDD] rounded"
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full mb-4 p-3 border border-[#DDDDDD] rounded h-32"
          />
          <button
            type="submit"
            className="bg-[#00DD00] text-[#003D7A] font-bold px-6 py-3 rounded hover:bg-[#00BB00]"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </main>
  )
}
```

### Add a Weather Page

```tsx
export default function WeatherPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#333333] mb-6">Weather</h1>
        
        {/* Current Conditions */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-[#003D7A] mb-4">Current Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F5F5F5] p-4 rounded">
              <p className="text-[#555555]">Temperature</p>
              <p className="text-3xl font-bold text-[#00DD00]">72°F</p>
            </div>
            <div className="bg-[#F5F5F5] p-4 rounded">
              <p className="text-[#555555]">Condition</p>
              <p className="text-xl font-bold text-[#333333]">Partly Cloudy</p>
            </div>
            <div className="bg-[#F5F5F5] p-4 rounded">
              <p className="text-[#555555]">Humidity</p>
              <p className="text-3xl font-bold text-[#00DD00]">65%</p>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[#003D7A] mb-4">7-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="bg-[#F5F5F5] p-4 rounded text-center">
                <p className="font-bold text-[#333333] mb-2">{day}</p>
                <p className="text-2xl mb-2">☀️</p>
                <p className="text-sm text-[#555555]">72°F</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
```

---

## Need Help?

- **TypeScript errors?** Check that all props are properly typed
- **Styling issues?** Use the Tailwind classes with `className="..."`
- **Page not showing?** Make sure the file is in `pages/` folder and saved
- **Colors wrong?** Use the hex codes from the Color Reference section above
