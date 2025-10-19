import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Nav(){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname || '/'

  const pages = [
    { path: '/', label: 'HOME' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/experience', label: 'EXPERIENCE' },
    { path: '/book', label: 'BOOK' }
  ]

  // show three links excluding current page
  const links = pages.filter(p => p.path !== path).slice(0,3)

  const toggleMobileMenu = (e) => {
    e && e.preventDefault && e.preventDefault()
    setMobileMenuOpen(v => !v)
  }

  return (
    <>
      <div className='navigation' role='navigation' aria-label='Primary'>
        {links.map(l => (
          <Link key={l.path} to={l.path} className='nav-links'>{l.label}</Link>
        ))}
      </div>

      {/* mobile menu button */}
      <button className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} aria-label="Open menu">
        <span className="hamburger" />
      </button>

      {/* mobile slide-in sidebar */}
      <aside className={`mobile-sidebar ${mobileMenuOpen ? 'visible' : ''}`} aria-hidden={!mobileMenuOpen}>
        <nav className="mobile-nav">
          {pages.map(p => (
            p.path !== path ? (
              <Link key={p.path} to={p.path} className='nav-links' onClick={() => setMobileMenuOpen(false)}>{p.label}</Link>
            ) : null
          ))}
        </nav>
      </aside>

      {/* logo (kept global) */}
      <Link className='logo-name' to="/">
        <img src={logo} alt="Sky Heaven Villa"/> <span style={{marginLeft:8}}>Sky Heaven Villa</span>
      </Link>
    </>
  )
}
