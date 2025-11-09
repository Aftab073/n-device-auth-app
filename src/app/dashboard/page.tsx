'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [fullName, setFullName] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // simulate small load time to make UX natural
    const t = setTimeout(() => {
      const savedName = localStorage.getItem('nd_fullName')
      const savedPhone = localStorage.getItem('nd_phone')
      setFullName(savedName)
      setPhone(savedPhone)
      setLoading(false)

    }, 180)

    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-slate-50 p-8">
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
          <p className="text-sm text-slate-500">Loading profile…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-slate-50 p-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div>
            <a href="/api/auth/logout" className="px-3 py-1 border rounded">Logout</a>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4">
          <div className="p-4 border rounded">
            <h3 className="font-medium">Profile</h3>
            <p className="text-sm text-slate-600">Name: <span className="font-medium">{fullName ?? 'Not provided'}</span></p>
            <p className="text-sm text-slate-600">Phone: <span className="font-medium">{phone ?? 'Not provided'}</span></p>
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-medium">Sessions</h3>
            <p className="text-sm text-slate-600">Active sessions will show here</p>
          </div>
        </section>
      </div>
    </div>
  )
}
