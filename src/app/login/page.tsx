// src/app/login/page.tsx
import React from 'react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6 text-black">Sign in to your account</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Full name</label>
            <input className="w-full border rounded px-3 py-2 text-black" placeholder="Your full name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Email</label>
            <input className="w-full border rounded px-3 py-2 text-black" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Phone</label>
            <input className="w-full border rounded px-3 py-2 text-black" placeholder="+91 9XXXXXXXXX" />
          </div>

          <div className="pt-4">
            <button className="w-full px-4 py-2 rounded bg-sky-600 text-white">Save & Continue</button>
          </div>

          <div className="text-center text-sm text-slate-500 mt-2">
            Or <a href="/api/auth/login" className="text-sky-600">Login with Auth0</a>
          </div>
        </div>
      </div>
    </div>
  )
}
