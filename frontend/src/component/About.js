import React from 'react'
import image from '../image/banner1.png';

export default function About() {

  return (
    <section id="about" style={{
      color:'white',
      backgroundImage: "linear-gradient(160deg, #5F0F40 0%, #310E68 100%)",
      backgroundSize:'cover',
      minHeight: '100vh',
    }}>
    <div className="container pt-5">
      <div className="row">
        <div className="col-lg-6">
          <h2>About iNotebook</h2>
          <p>
            iNotebook is your ultimate cloud-based note-taking solution. Our mission is to empower you to capture,
            organize, and access your notes seamlessly from anywhere, at any time.
          </p>
          <p>
            Designed with productivity in mind, iNotebook offers a range of features to enhance your note-taking
            experience:
          </p>
          <ul>
            <li>Effortlessly create and edit notes in a user-friendly interface.</li>
            <li>Access your notes securely from the cloud, across devices.</li>
            <li>Collaborate with colleagues, friends, or classmates in real-time.</li>
            <li>Stay organized with folders, tags, and powerful search capabilities.</li>
          </ul>
        </div>
        <div className="col-lg-6 mt-5">
          {/* Add an image or video showcasing your app here */}
          <img
            src={image}
            alt="iNotebook Interface"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
  )
}
