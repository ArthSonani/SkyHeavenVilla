import React from 'react'

export default function BookContact(){
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const checkin = e.target.checkin.value;
    const checkout = e.target.checkout.value;
    const guests = e.target.guests.value;
    const message = e.target.message.value || '';

    // Your WhatsApp number (with country code, no + or spaces)
    const phoneNumber = "919824390589"; // <-- replace with your number

    const text = `Hello! I am ${name}. My email is ${email}.\nCheck-in: ${checkin} \nCheck-out: ${checkout} \nGuests: ${guests} \nMessage: ${message}`;
    const encodedText = encodeURIComponent(text);

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    window.open(whatsappURL, "_blank");
  }

  return (
    <main className="book-contact-page">
      <section className="bc-hero">
        <div className="bc-inner">
          <h1>Book & Contact</h1>
          <p className="lead">Plan your stay at Sky Heaven Villa — send your booking details and we'll reply on WhatsApp shortly.</p>
        </div>
      </section>

      <section className="bc-grid">
        <div className="bc-form-wrap">
          <h2>Booking Form</h2>
          <form className="bc-form" onSubmit={handleSubmit}>
            <label>Name<input name="name" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <div className="bc-dates">
              <label>Check-in<input name="checkin" type="date" required /></label>
              <label>Check-out<input name="checkout" type="date" required /></label>
            </div>
            <label>Number of Guests
              <select name="guests" defaultValue="2">
                {Array.from({length:20}, (_,i) => i+1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>Message<textarea name="message" rows={4} placeholder="Any special requests or questions?" /></label>

            <div className="bc-actions">
              <button type="submit" className="primary">Send to WhatsApp</button>
            </div>
          </form>
        </div>

        <aside className="bc-contact">
          <h3>Contact Details</h3>
          <p><strong>Address</strong><br /></p>
          <p style={{color: "rgb(255,255,255,0.6)"}}>Sky Heaven Villa, Panchgani - Mahabaleshwar Rd, Bhose, Maharashtra 412806</p>
          <p><strong>Phone / WhatsApp</strong><br /></p>
          <p><a href="https://wa.me/919824390589" target="_blank" rel="noreferrer" style={{color: "rgb(255,255,255,0.6)"}}>+91 98243 90589</a></p>
          <p><strong>Email</strong><br /></p>
          <p><a href="mailto:prakashsonani19@gmail.com" style={{color: "rgb(255,255,255,0.6)"}}>prakashsonani19@gmail.com</a></p>

          <h4>Social</h4>
          <ul className="social-list">
            <li>
              <a href="https://www.instagram.com/sky_heaven_villa/" target="_blank" rel="noreferrer" style={{color: "rgb(255,255,255,0.6)"}}>
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm8 3.5a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>
                Instagram
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer" style={{color: "rgb(255,255,255,0.6)"}}>
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2L2 7v9c0 1.1.9 2 2 2h6v-7h4v7h6c1.1 0 2-.9 2-2V7l-10-5z"/></svg>
                Airbnb
              </a>
            </li>
            <li>
              <a href="https://www.makemytrip.com/" target="_blank" rel="noreferrer" style={{color: "rgb(255,255,255,0.6)"}}>
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM9 9a3 3 0 106 0 3 3 0 00-6 0z"/></svg>
                MakeMyTrip
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer" style={{color: "rgb(255,255,255,0.6)"}}>
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 7h10v2H7V7zm0 4h10v2H7v-2zM5 19h14v2H5v-2zM5 3h14v2H5V3z"/></svg>
                Booking.com
              </a>
            </li>
            <li>
              <a href="https://www.agoda.com/" target="_blank" rel="noreferrer" style={{color: "rgb(255,255,255,0.6)"}}>
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 3h14v4H5V3zm0 6h8v12H5V9zm10 0h4v12h-4V9z"/></svg>
                Agoda
              </a>
            </li>
          </ul>

          <div className="bc-footer-quicklinks">
            <h4>Quick Links</h4>
            <nav>
              <a href="/" style={{color: "rgb(255,255,255,0.6)"}}>Home</a>
              <a href="/experience" style={{color: "rgb(255,255,255,0.6)"}}>Experience</a>
              <a href="/gallery" style={{color: "rgb(255,255,255,0.6)"}}>Gallery</a>
              <a href="/book" style={{color: "rgb(255,255,255,0.6)"}}>Book</a>
            </nav>
          </div>
        </aside>
      </section>
    </main>
  )
}
