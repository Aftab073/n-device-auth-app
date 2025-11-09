export default function Home() {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>N-Device Auth Demo</h1>
      <p>Public page — login to access your private dashboard.</p>
      <div>
        <a href="/api/auth/login">Login with Auth0</a>
      </div>
    </div>
  )
}
