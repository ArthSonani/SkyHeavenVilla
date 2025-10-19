import React, {useEffect, useState, useRef} from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from '@gsap/react';
import droneShoot from '../assets/farm360.mp4'
import photo1 from '/img2_.jpg'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'
import photo4 from '../assets/photo4.jpg'
import photo5 from '../assets/photo5.jpg'
import photo6 from '../assets/photo6.jpg'
import photo7 from '../assets/photo7.jpg'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import p4 from '../assets/p4.jpg'


import farm180 from '../assets/farm180.mp4'

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.others2', 
        start: 'top 20%',   
        end: 'top -30%',   
        scrub: 2
      }
    });

    
    gsap.from(".video-container", {
      scale: 0.4,
      duration: 3,
      borderRadius: '50px',
      ease: 'power1',
      scrollTrigger: {
        trigger: '.video-container',
        scroller: 'body',
        scrub: 2,
        start: 'top 100%',
        end: 'top 30%',
      }
    });

    gsap.from(".image-container", {
      width: '0px',
      duration: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: '.others',
        scroller: 'body',
        start: 'top 40%',
        end: 'top 15%'
      },
      stagger: 0.5
    });

    tl.from("#p5", {
      y: 300,
      opacity: 0,
      duration: 1

    });

    tl.from("#p6", {
      y: 300,
      opacity: 0,
      duration: 1
    });

    tl.from("#p7", {
      y: 300,
      opacity: 0,
      duration: 1
    });

    gsap.from(".video-container2", {
      scale: 0,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.video-container2',
        scroller: 'body',
        start: 'top 70%'
      }
    });
    

  });

  // --- Simple carousel state & behavior (non-invasive) ---
  const carouselImages = [p1, p2, p3, p4]
  const [current, setCurrent] = useState(0)
  const autoRef = useRef(null)
  const pauseRef = useRef(false)

  useEffect(() => {
    // autoplay every 2.5s
    autoRef.current = setInterval(() => {
      if (!pauseRef.current) setCurrent(c => (c + 1) % carouselImages.length)
    }, 2500)
    return () => clearInterval(autoRef.current)
  }, [])

  const goNext = () => setCurrent(c => (c + 1) % carouselImages.length)
  const goPrev = () => setCurrent(c => (c - 1 + carouselImages.length) % carouselImages.length)

  return (
    <>
      {/* Global Nav component handles navigation now */}

      <div className='text-container'>
        {/* Carousel hero: shows primary set of villa photos with prev/next buttons and autoplay */}
        <div className="gallery-carousel" onMouseEnter={() => (pauseRef.current = true)} onMouseLeave={() => (pauseRef.current = false)}>
          <button className="carousel-btn prev" onClick={goPrev} aria-label="Previous">‹</button>
          <div className="carousel-viewport">
            {carouselImages.map((src, i) => (
              <img key={i} src={src} alt={`villa-${i}`} className={`carousel-item ${i === current ? 'active' : ''}`} />
            ))}
          </div>
          <button className="carousel-btn next" onClick={goNext} aria-label="Next">›</button>
        </div>
      </div>

      <div className='video-container'>
        <video width="100%" height="100%" autoPlay loop muted>
          <source src={droneShoot} type="video/mp4" />
        </video>
      </div>

      <div className="others">
        <div className="image-container" id="p1">
          <img src={photo1} className="photo" />
        </div>

        <div className="image-container" id="p2">
          <img src={photo2} className="photo" />
        </div>

        <div className='text1'>
          Nestled between majestic mountains...<br />
          Surrounded by lush greenery and the soothing hum of nature...<br />
          <span>An idyllic escape where peace and beauty converge, inviting you to immerse yourself in the harmony of nature. <br />Let every breath of fresh air and the gentle whispers of the landscape soothe your soul.</span>
        </div>

        <div className="other-image-container" id="p3">
          <img src={photo3} className="other-photo" />
        </div>

        <div className="other-image-container" id="p4">
          <img src={photo4} className="other-photo" />
        </div>

      </div>

      <div className="others2">
        <div className='text2'>
          <span>
            Discover a sanctuary where nature's beauty embraces you at every turn. Here, the dawn brings an ethereal glow, and the gentle breeze calms the senses. <br />This serene hideaway offers stunning vistas alongside unmatched hospitality, creating an unforgettable escape from the everyday.<br />
          </span>
          <br />A tranquil retreat where every sunrise is magical...<br />
          And the cool mountain breeze carries serenity to your soul...<br />
        </div>

        <div className="image-container2" id="p5">
          <img src={photo5} className="photo2" />
        </div>
        <div className="image-container2" id="p6">
          <img src={photo6} className="photo2" />
        </div>
        <div className="image-container2" id="p7">
          <img src={photo7} className="photo2" />
        </div>

        <div className='video-container2'>
          <video width="100%" height="100%" autoPlay loop muted>
            <source src={farm180} type="video/mp4" />
          </video>
        </div>

        <div className='text3'>
          Welcome to a hidden gem...<br />
          Where breathtaking views meet unparalleled comfort.
        </div>


      </div>
    </>
  );
}
