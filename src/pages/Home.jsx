import React, { useRef } from 'react';
import PhotoRing from '../components/PhotoRing';
import logo from '../assets/logo.png';
import Gallery from './Gallery';

export default function Home() {
    const galleryRef = useRef(null);

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
            
            <a className='logo-name'  href="#">
                <img src={logo} alt="Sky Heaven Villa Logo"/> &nbsp;&nbsp;Sky Heaven Villa
            </a>

            <div className='scroll-help'> 
                <span className="material-symbols-outlined">height</span> scroll up/down ...
            </div>

            <div className='tagline'> 
                Where Serenity Meets the Peaks - Your Mountain Retreat Awaits
            </div>

            <Gallery ref={galleryRef} />
        </>
    );
}
