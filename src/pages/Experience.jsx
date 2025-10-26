import React from 'react'
import room1 from '../assets/r1.jpg'
import room2 from '../assets/r2.jpg'
import room3 from '../assets/r3.jpg'
import room4 from '../assets/r4.jpg'
import room5 from '../assets/r5.jpg'
import room6 from '../assets/r6.jpg'

export default function Experience(){

  const amenities = [
    {icon: '🛏️', title: 'Comfortable Beds'},
    {icon: '🛜', title: 'Free WiFi'},
    {icon: '🏊', title: 'Swimming Pool'},
    {icon: '🏕️', title: 'Garden'},
    {icon: '🚘', title: 'Ample Parking'},
    {icon: '🌿', title: 'Terrace Garden'},
    {icon: '🎥', title: '24/7 Security'},
    {icon: '🍳', title: 'In-house Dining'},
  ]

  return (
    <main className="experience-page">
      <section className="exp-hero">
        <div className="exp-hero-inner">
          <h1>Welcome to Sky Heaven Villa</h1>
          <p className="lead">An immersive retreat where mountain air, warm hospitality and timeless comfort meet. Explore our rooms, amenities and nearby attractions — all in one place.</p>
        </div>
      </section>

      <section className="exp-about">
        <h2>About the Villa</h2>
        <p>Sky Heaven Villa is a lovingly restored estate perched on a gentle slope overlooking verdant valleys. Built with local materials and a focus on comfort, it offers a quiet sanctuary for families, couples and solo travelers seeking nature and calm. Highlights include panoramic terraces, an organic kitchen garden, and easy access to nearby trails and cultural sites.</p>
      </section>

      <section className="exp-rooms">
        <h2>Rooms & Suites</h2>
        <p className="muted">The villa comfortably accommodates large groups — ideal for gatherings of up to <strong>17-18 people</strong>.</p>
        <div className="room-gallery">
          <img src={room1} alt="room-1" />
          <img src={room2} alt="room-2" />
          <img src={room3} alt="room-3" />
          <img src={room4} alt="room-4" />
          <img src={room5} alt="room-5" />
          <img src={room6} alt="room-6" />
        </div>
      </section>

      <section className="exp-amenities">
        <h2>Amenities & Features</h2>
        <div className="amenities-grid">
          {amenities.map((a, i) => (
            <div className="amenity" key={i}>
              <div className="amenity-icon">{a.icon}</div>
              <div className="amenity-title">{a.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="exp-location">
        <h2>Location</h2>
        <div className="location-grid">
          <div className="map-wrap">
            {/* Public embed centered on provided address (no API key required) */}
            <iframe
              title="map"
              src={`https://www.google.com/maps?q=${encodeURIComponent('sky heaven villa, Panchgani - Mahabaleshwar Rd, Bhose, Maharashtra 412806')}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
            <div className="map-caption muted" style={{ padding: '10px 12px' }}>
              <div><strong>Sky Heaven Villa</strong></div>
              <div>sky heaven villa, Panchgani - Mahabaleshwar Rd, Bhose, Maharashtra 412806</div>
              <div style={{ marginTop: 6 }}>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('sky heaven villa, Panchgani - Mahabaleshwar Rd, Bhose, Maharashtra 412806')}`} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Open in Google Maps</a>
              </div>
            </div>
          </div>
          <div className="nearby">
            <h3>Nearby Attractions</h3>
            <ul>
              <li>Cheese Factory — 500 m</li>
              <li>Mapro Garden — 1.5 km</li>
              <li>Panchgini — 6 km</li>
              <li>Table point — 6 km</li>
              <li>Mahabaleshwar — 12 km</li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  )
}
