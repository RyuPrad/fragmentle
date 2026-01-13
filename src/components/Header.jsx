import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🧩</span>
            <span className="font-bold text-xl text-gray-800">Fragmentle</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/play" active={isActive('/play')}>Play</NavLink>
            <NavLink to="/how-to-play" active={isActive('/how-to-play')}>How to Play</NavLink>
            <NavLink to="/stats" active={isActive('/stats')}>Stats</NavLink>
            
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <Link 
                  to="/profile"
                  className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium"
                >
                  {user.email?.charAt(0).toUpperCase()}
                </Link>
              </div>
            ) : (
              <Link 
                to="/profile" 
                className="ml-2 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              <MobileNavLink to="/play" onClick={() => setMenuOpen(false)}>Play</MobileNavLink>
              <MobileNavLink to="/how-to-play" onClick={() => setMenuOpen(false)}>How to Play</MobileNavLink>
              <MobileNavLink to="/stats" onClick={() => setMenuOpen(false)}>Stats</MobileNavLink>
              <MobileNavLink to="/profile" onClick={() => setMenuOpen(false)}>
                {user ? 'Profile' : 'Sign In'}
              </MobileNavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
        active 
          ? 'bg-gray-100 text-gray-900' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
    >
      {children}
    </Link>
  )
}