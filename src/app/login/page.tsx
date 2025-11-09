'use client'
import React, { useState, useEffect } from 'react'

export default function LoginPage() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        setFullName(localStorage.getItem('nd_fullName') || '')
        setEmail(localStorage.getItem('nd_email') || '')
        setPhone(localStorage.getItem('nd_phone') || '')
    }, [])



    const [saving, setSaving] = useState(false);
    const isValid = email.trim() !== '';

    const handleSave = () => {
        if (!isValid) {
            alert('Please enter a valid email address.');
            return;
        }
        setSaving(true);
        localStorage.setItem('nd_fullName', fullName)
        localStorage.setItem('nd_email', email)
        localStorage.setItem('nd_phone', phone)
        setTimeout(() => {
            setSaving(false);
            alert('Details saved! You can now proceed to login with Auth0.');
        }, 3000);
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-semibold mb-6">Sign in to your account</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full name</label>
                        <input value={fullName} onChange={e => setFullName(e.target.value)}
                            className="w-full border rounded px-3 py-2" placeholder="Your full name" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)}
                            className="w-full border rounded px-3 py-2" placeholder="+91 9XXXXXXXXX" />
                    </div>

                    <div className="pt-4 flex gap-2">
                        <button onClick={handleSave} className="flex-1 px-4 py-2 rounded border">Save locally</button>
                        <a
                            href="/api/auth/login"
                            className={`flex-1 text-center px-4 py-2 rounded text-white ${isValid ? 'bg-sky-600' : 'bg-sky-300 pointer-events-none'}`}
                        >
                            Login
                        </a>
                    </div>

                    <div className="text-center text-sm text-slate-500 mt-2">
                        By continuing you agree to terms.
                    </div>
                </div>
            </div>
        </div>
    )
}