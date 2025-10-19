import React, { useRef, useState } from 'react';
import PhotoRing from '../components/PhotoRing';
import logo from '../assets/logo.png';
// Home intentionally shows only PhotoRing and UI text

export default function Home() {
    const galleryRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = (e) => {
        e && e.preventDefault && e.preventDefault()
        setMobileMenuOpen(v => !v)
    }

    const scrollToGallery = (e) => {
        e.preventDefault();
        galleryRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <PhotoRing />
            <div className='navigation'>
                <a href='/gallery' className='nav-links'>OUR&nbsp;GALLERY</a>
                <a href='/stay' className='nav-links' >STAY&nbsp;WITH&nbsp;US</a>
                <a href='/reservation' className='nav-links' >RESERVATION</a>   
            </div>

            {/* Mobile menu button (only visible on small screens via CSS) */}
            <button className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} aria-label="Open menu">
                <span className="hamburger" />
            </button>

            {/* Mobile slide-in sidebar */}
            <aside className={`mobile-sidebar ${mobileMenuOpen ? 'visible' : ''}`} aria-hidden={!mobileMenuOpen}>
                <nav className="mobile-nav">
                    <a href="/gallery" className='nav-links' onClick={() => setMobileMenuOpen(false)}>OUR GALLERY</a>
                    <a href="/stay" className='nav-links' onClick={() => setMobileMenuOpen(false)}>STAY WITH US</a>
                    <a href="/reservation" className='nav-links' onClick={() => setMobileMenuOpen(false)}>RESERVATION</a>
                </nav>
            </aside>
            
            <a className='logo-name'  href="#">
                <img src={logo} alt="Sky Heaven Villa Logo"/> &nbsp;&nbsp;Sky Heaven Villa
            </a>

            <div className='scroll-help'> 
                <span className="material-symbols-outlined">height</span> scroll up/down ...
            </div>

            <div className='tagline'> 
                Where Serenity Meets the Peaks - Your Mountain Retreat Awaits
            </div>
            {/* Visit gallery button restored */}
            <a className='visit-gallery-btn' href='/gallery'>Visit gallery</a>
        </>
    );
}
