import './globals.css'
import { ReactNode } from 'react'

export const metadata = { title: 'N-Device Auth App' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-3xl mx-auto p-6">
          <nav className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold">N-Device Auth Demo</h1>
            <div>
              <a href="/" className="mr-4">Home</a>
              <a href="/login" className="px-3 py-1 rounded bg-sky-600 text-white">Login</a>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
