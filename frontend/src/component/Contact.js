import React from 'react'

export default function Contact() {
  return (
    <div>
      <section id="contact" style={{
      color: 'white',
      backgroundImage: "linear-gradient(160deg, #5F0F40 0%, #310E68 100%)",
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}>
      <div className="container pt-5">
        <div className="row">
          <div className="col-lg-6">
            <h2>Contact Us</h2>
            <p>
              Have questions or feedback? We'd love to hear from you! Reach out to us through the following methods:
            </p>
            <ul>
            <li >Email: <a className='text-decoration-none text-light' href="mailto:bashirahmad00219@gmail.com">bashirahmad00219@gmail.com</a></li>
              <li >Phone: <a className='text-decoration-none text-light' href="tel:+919717491394">9717491394</a></li>
              <li>Address:  Dubai DXB 439539 Street, Abu-Dhabi, UAE</li>
            </ul>
          </div>
          <div className="col-lg-6">
            {/* Add an image or map showing the location here */}
            {/* <img
              src="your-contact-image.jpg"
              alt="Contact Us"
              className="img-fluid"
            /> */}
          </div>
        </div>
      </div>
    </section>

    </div>
  )
}
