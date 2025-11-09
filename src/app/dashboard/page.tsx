import React from 'react'

export default function DashboardPage() {
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
            <p className="text-sm text-slate-600">Name: —</p>
            <p className="text-sm text-slate-600">Phone: —</p>
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-medium">Sessions</h3>
            <p className="text-sm text-slate-600">Active sessions will show here.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
