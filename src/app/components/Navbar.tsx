export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-slate-700">
          N-Device Auth Demo
        </h1>
        <div className="space-x-3">
          <a href="/" className="text-slate-600 hover:text-slate-900 text-sm">
            Home
          </a>
          <a
            href="/login"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  )
}
