'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  // --- Fetch Auth0 user + register device ---
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const text = await res.text()
        if (!text || res.status === 204) return router.push('/login')
        const data = JSON.parse(text)
        const userObj = data.user || data
        if (!userObj.email) return router.push('/login')
        setUser(userObj)
        setPhone(localStorage.getItem('nd_phone'))
        setLoading(false)

        // try registering this device
        const reg = await fetch('/api/sessions', { method: 'POST' })
        const json = await reg.json()
        if (reg.status === 409) {
          // device limit reached
          setSessions(json.devices || [])
          setShowModal(true)
        } else {
          // normal, show current list
          const list = await fetch('/api/sessions').then(r => r.json())
          setSessions(list)
        }
      } catch (err) {
        console.error(err)
        router.push('/login')
      }
    }
    loadUser()
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/api/auth/logout')
  }

  const handleForceLogout = async (deviceId: string) => {
    await fetch(`/api/sessions?deviceId=${deviceId}`, { method: 'DELETE' })
    const list = await fetch('/api/sessions').then(r => r.json())
    setSessions(list)
    if (list.length <= 3) setShowModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 text-sm">Loading user info...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 p-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow">
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
          <h3 className="font-medium mb-2">Active Devices</h3>
          <ul className="text-sm text-slate-700 space-y-1">
            {sessions.map((d) => (
              <li key={d.deviceId} className="flex justify-between border-b py-1">
                <span>
                  {d.userAgent?.split('(')[0]} —{' '}
                  {new Date(d.timestamp).toLocaleString()}
                </span>
                <button
                  onClick={() => handleForceLogout(d.deviceId)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Force Logout
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Device limit reached (3)
            </h2>
            <p className="text-sm text-slate-600 mb-4 text-center">
              Please logout one of your active devices to continue.
            </p>
            <div className="max-h-60 overflow-y-auto border-t border-b py-2 mb-3">
              {sessions.map((d) => (
                <div
                  key={d.deviceId}
                  className="flex justify-between items-center border-b last:border-0 px-1 py-1"
                >
                  <span className="text-xs text-slate-600 truncate">
                    {d.userAgent}
                  </span>
                  <button
                    onClick={() => handleForceLogout(d.deviceId)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-1 bg-slate-700 text-white rounded hover:bg-slate-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
