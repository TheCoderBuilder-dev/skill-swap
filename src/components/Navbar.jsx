import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()
  const [unreadNotifications, setUnreadNotifications] = useState(2)

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Browse Skills', path: '/skills' },
    { name: 'Messages', path: '/messages' },
    { name: 'Notifications', path: '/notifications', showBadge: true },
    { name: 'Profile', path: '/profile' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-logo">SkillSwap</span>
        </Link>
        <div className="navbar-links">
          {navItems.map(({ name, path, showBadge }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${isActive(path) ? 'active' : ''}`}
            >
              {name}
              {showBadge && unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
