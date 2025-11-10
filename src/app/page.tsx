'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h1 className="text-3xl font-semibold text-slate-800 mb-2">
        N-Device Auth Demo
      </h1>
      <p className="text-slate-600 mb-8">
        Secure Auth0 login with concurrent device limit (N=3).
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Login button */}
        <a
          href="/api/auth/login"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm font-medium"
        >
          Sign In
        </a>

        {/* Register button */}
        <a
          href="/api/auth/login?screen_hint=signup"
          className="px-5 py-2.5 bg-slate-200 text-slate-800 rounded-lg shadow hover:bg-slate-300 transition text-sm font-medium"
        >
          Register
        </a>
      </div>

      <footer className="text-xs text-slate-500 mt-10">
        Built by <span className="font-semibold">Aftab Tamboli</span> — Demo App
      </footer>
    </div>
  )
}
