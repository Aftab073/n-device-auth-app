'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        // Some browsers return 204 No Content just after callback:
        if (!res.ok || res.status === 204) return
        const text = await res.text()
        if (!text) return
        const data = JSON.parse(text)
        if (data?.user) router.push('/dashboard')
      } catch {
        /* ignore – means not logged in yet */
      }
    }

    checkAuth()
  }, [router])

  return (
    <main className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-2">N-Device Auth Demo</h1>
      <p>Public page — login to access your dashboard.</p>
      <div className="mt-4">
        <a
          href="/login"
          className="bg-sky-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </a>
      </div>
    </main>
  )
}
