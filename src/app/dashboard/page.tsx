'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

    useEffect(() => {
  const loadUser = async () => {
    try {
      const res = await fetch('/api/auth/me')
      const status = res.status
      console.log('Auth status:', status)

      if (status === 204) {
        console.log('No session cookie — redirecting to login')
        router.push('/login')
        return
      }

      const text = await res.text()
      if (!text) {
        console.log('Empty response body — redirecting')
        router.push('/login')
        return
      }

      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        console.error('Invalid JSON:', text)
        router.push('/login')
        return
      }

      const userObj = data.user || data
      console.log('User object:', userObj)

      // ✅ Only proceed if email or name exists
      if (userObj && (userObj.email || userObj.name)) {
        setUser(userObj)
        const savedPhone = localStorage.getItem('nd_phone')
        setPhone(savedPhone)
        setLoading(false)
        return
      }

      console.log('No user info found — redirecting')
      router.push('/login')
    } catch (err) {
      console.error('Auth check failed', err)
      router.push('/login')
    }
  }

  loadUser()
}, [router])



  const handleLogout = () => {
    localStorage.removeItem('nd_phone')
    localStorage.removeItem('nd_fullName')
    localStorage.removeItem('nd_email')
    router.push('/api/auth/logout')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-600">Loading user info...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-600">
          Redirecting to login...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-slate-50 p-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              Welcome, {user.name || 'User'}
            </h2>
            <p className="text-sm text-slate-600">Email: {user.email}</p>
            <p className="text-sm text-slate-600">
              Phone: {phone || 'Not provided'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 border rounded hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>

        <section className="mt-6">
          <h3 className="font-medium mb-2">Active Sessions</h3>
          <p className="text-sm text-slate-600">
            Device session tracking will appear here soon.
          </p>
        </section>
      </div>
    </div>
  )
}
