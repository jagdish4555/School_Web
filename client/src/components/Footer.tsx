export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-radial from-gray-900 via-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-bold text-lg">SHETH D.H. HIGH SCHOOL, JAGUDAN</h4>
          <p className="mt-2 text-sm text-gray-400">Inspiring excellence in learning and character.</p>
        </div>
        <div>
          <h5 className="text-white font-semibold">Quick Links</h5>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/teachers" className="hover:text-white">Teachers</a></li>
            <li><a href="/events" className="hover:text-white">Events</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/donate" className="hover:text-white">Donate</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold">Contact</h5>
          <p className="mt-2 text-sm">SHETH D.H. HIGH SCHOOL, JAGUDAN</p>
          <p className="text-sm"> +91 9428752528</p>
          <p className="text-sm"> dhjagudan@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">© {new Date().getFullYear()} SHETH D.H. HIGH SCHOOL, JAGUDAN</div>
    </footer>
  )
}


