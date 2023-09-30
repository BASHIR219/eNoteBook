import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(props) {

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
      <nav style={{
        backgroundColor: "#0093E9",
        backgroundImage: "linear-gradient(160deg, #3421cb 0%, #80D0C7 100%)"
      }} className="navbar navbar-expand-lg">

        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active text-light" aria-current="page" href="/">
                <b>iNoteBook</b>
              </a>
              <Link className="nav-link active text-light" aria-current="page" to="/home">
                My-Notes
              </Link>
              <Link className="nav-link text-light" to="/about">
                About
              </Link>
              <Link className="nav-link text-light" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="form-check form-switch">
          {/* <input
            className="form-check-input"
            onClick={props.toggleMode}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
           <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">
            Dark
          </label> */}
          {!localStorage.getItem('token') ? <div className='d-flex'>
            <Link className="nav-link text-light mx-2" to="/login">
              Login
            </Link>
            <Link className="nav-link text-light mx-2" to="/signup">
              Signup
            </Link>
          </div> : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}

        </div>
      </nav>
    </>
  );
}
