import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoUrl from '../../Other_Data/School_Logo.jpeg'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const m = localStorage.getItem('theme')
    if (m === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium'
  const linkActive = 'text-blue-600 dark:text-blue-400'
  const linkIdle = 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="School logo" className="h-9 w-9 rounded object-cover shadow-glow" />
            <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">SHETH D.H. HIGH SCHOOL, JAGUDAN</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Home</NavLink>
            <NavLink to="/teachers" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Teachers</NavLink>
            <NavLink to="/events" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Event</NavLink>
            <NavLink to="/results" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Results</NavLink>
            <NavLink to="/about" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>About</NavLink>
            <NavLink to="/donate" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Donate</NavLink>
            <NavLink to="/contact" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Contact</NavLink>
            <NavLink to="/developed-by" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Developed By</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {dark ? (
                <span className="text-yellow-300">☀️</span>
              ) : (
                <span className="text-blue-600">🌙</span>
              )}
            </button>
            <button onClick={() => setOpen((o) => !o)} className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Menu">☰</button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            <NavLink onClick={() => setOpen(false)} to="/" end className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/teachers" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Teachers</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/events" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Event</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/results" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Results</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/donate" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Donate</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Contact</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/developed-by" className={({isActive}) => `${linkBase} ${isActive? linkActive: linkIdle}`}>Developed By</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}


