# 🔐 N-Device Auth Demo

A mini web app built with **Next.js**, **Auth0**, and **Upstash Redis**  
that limits concurrent logins to **N = 3 devices** per account.  
If a user logs in from a 4th device, they must log out one of the existing sessions.

---

## 🚀 Live Demo
👉 [https://your-vercel-app.vercel.app](https://your-vercel-app.vercel.app)

*(Replace with your deployed URL)*

---

## 🧠 Features

✅ **Auth0 Authentication** — Secure login and logout with user profile.  
✅ **Session Tracking** — Each login stores device details (ID, browser, timestamp).  
✅ **Concurrent Device Limit (N=3)** — Only 3 devices can stay logged in at once.  
✅ **Force Logout Modal** — Lets user remove an old device gracefully.  
✅ **Redis Backend (Upstash)** — Fast, serverless, free-tier datastore.  
✅ **Professional UI** — Responsive, minimal Tailwind design.

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | Next.js 15 + TypeScript |
| Styling | Tailwind CSS |
| Auth | Auth0 |
| Database | Upstash Redis (REST API) |
| Deployment | Vercel |
| State Management | React Hooks |
| Device Tracking | LocalStorage + Redis |

---

## 🧩 System Design Overview

**Flow:**

1. User logs in via Auth0.  
2. Frontend checks/stores a stable `deviceId` in `localStorage`.  
3. `/api/sessions` POST → registers device in Redis using email key (`sessions:user@email`).  
4. If 3 devices already active → returns **409 Conflict**.  
5. UI displays modal → user can “Force Logout” an older device.  
6. Redis updates automatically and removes the old session.  

---

## 📂 Folder Structure

src/
├─ app/
│ ├─ page.tsx # Public landing page
│ ├─ login/page.tsx # Login form
│ └─ dashboard/page.tsx # Protected dashboard (after login)
│
├─ pages/api/
│ ├─ auth/[...auth0].ts # Auth0 SDK routes
│ └─ sessions/index.ts # Redis-based session management
│
└─ lib/
└─ redis.ts # Upstash Redis config


---

## ⚙️ Environment Variables

Add these in both **`.env.local`** (for local dev) and Vercel project settings:

AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=https://your-vercel-app.vercel.app

AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com

AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io

UPSTASH_REDIS_REST_TOKEN=your_upstash_token