import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Phone Agent Analytics Dashboard',
  description: 'Analytics dashboard for AI voice agent calls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold">
                Phone Agent Analytics
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="hover:text-blue-600">
                  Calls
                </Link>
                <Link href="/analytics" className="hover:text-blue-600">
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
