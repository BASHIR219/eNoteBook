import React from 'react'
import backgroundImage from '../image/banner2.png';

export default function LandingPage() {

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overFlow:'hidden',
        minHeight: '100vh', // Ensures the background covers the entire viewport
      };
      
  return (
    <div  style={backgroundStyle}>
    <header className="jumbotron text-center d-flex " >
        <div className="container-sm" style={{ color:'white', backgroundColor: 'rgba(0, 0, 10, 0.3)', padding: '30px',marginTop:'10px', borderRadius: '10px', width:'500px' }}>
            <h1>Welcome to iNotebook</h1>
            <p>Your Digital Notepad on the Cloud</p>
           
        </div>
    </header>

    
    <section >
        <div className="row d-flex justify-content-between" >
            <div className="col-lg-6" style={{ color:'white', backgroundColor: 'rgba(0, 0, 10, 0.3)', padding: '20px', borderRadius: '10px',width:'300px', marginLeft:'40px'  }}>
                <h2>Key Features</h2>
                <ul>
                    <li>Cloud-Powered Convenience</li>
                    <li>Sleek and Intuitive Interface</li>
                    <li>Powerful Organization Tools</li>
                    <li>Collaborative Note-taking</li>
                    <li>Secure and Private</li>
                </ul>
            </div>
            <div className="col-lg-6 " style={{ color:'white', backgroundColor: 'rgba(0, 0, 10, 0.3)', padding: '20px', borderRadius: '10px',width:'300px', marginRight:'40px'  }}>
                <h2>Why Choose iNotebook</h2>
                <ul>
                    <li>Reliability</li>
                    <li>Customization</li>
                    <li>Continuous Improvement</li>
                    <li>Cross-Platform</li>
                </ul>
            </div>
        </div>
    </section>

  
    <section className="container text-center" style={{ color:'white', backgroundColor: 'rgba(0, 0, 10, 0.3)', padding: '20px', borderRadius: '10px', width:'500px' }}>
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied users who have made iNotebook their go-to app for organizing their thoughts and ideas.</p>
        <p>Start your journey towards a more efficient and organized life today!</p>
        <a href="/signup" className="btn btn-primary btn-lg">SignUp Now</a>
    </section>

  
    <footer style={{color:"white", backgroundColor:'#3421cb'}} className=" text-center py-3 fixed-bottom">
        <div className="container" >
            <p>&copy; 2023 iNotebook. All rights reserved.</p>
        </div>
    </footer>
    </div>

  )
}
