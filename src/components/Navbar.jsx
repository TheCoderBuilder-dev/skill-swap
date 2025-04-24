import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()
  const [unreadNotifications, setUnreadNotifications] = useState(2)
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-logo">SkillSwap</span>
        </Link>
        <div className="navbar-links">
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/skills" className={`nav-link ${location.pathname === '/skills' ? 'active' : ''}`}>
            Browse Skills
          </Link>
          <Link to="/messages" className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}>
            Messages
          </Link>
          <Link to="/notifications" className={`nav-link ${location.pathname === '/notifications' ? 'active' : ''}`}>
            Notifications
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </Link>
          <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 