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
            {/* Global Nav handles navigation and logo */}

            <div className='scroll-help'> 
                <span className="material-symbols-outlined">height</span> scroll up/down ...
            </div>

            <div className='tagline'> 
                Where Serenity Meets the Peaks - Your Mountain Retreat Awaits
            </div>
            {/* Visit gallery button restored with a classical, explicit CTA */}
            <a className='visit-gallery-btn' href='/gallery' aria-label='Experience the gallery' title='Experience the gallery'>Experience the Gallery</a>
        </>
    );
}
