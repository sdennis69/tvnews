import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_STATION_NAME || 'TV Station',
  description: process.env.NEXT_PUBLIC_STATION_DESCRIPTION || 'Your local news source',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-secondary text-white font-sans">
        {children}
      </body>
    </html>
  )
}
