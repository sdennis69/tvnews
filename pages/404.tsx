import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found - TV News</title>
      </Head>
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-[#00DD00] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-[#333333] mb-4">Page Not Found</h2>
          <p className="text-[#555555] mb-8">The page you are looking for does not exist.</p>
          <Link href="/" className="bg-[#00DD00] text-white px-6 py-3 rounded font-semibold hover:bg-[#00BB00] transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </>
  )
}
