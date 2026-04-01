export default function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-4 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold">
          Sleem
        </a>

        <div className="flex gap-4 items-center">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="/login">Login</a>
          <a
            href="/signup"
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            ابدأ الآن
          </a>
        </div>
      </div>
    </nav>
  )
}
