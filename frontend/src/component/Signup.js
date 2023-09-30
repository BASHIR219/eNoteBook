import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '', // Separate state for confirm password
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", 'danger');
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem('token', json.authToken);
      navigate('/home');
    } else {
      // Display the alert if signup is unsuccessful
      props.showAlert("Invalid Details", 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='d-flex justify-content-center align-items-center'  style={{
      backgroundColor: "#0093E9",
      backgroundImage: "linear-gradient(160deg, #182B3A 0%, #20A4F3 100%)",
      backgroundSize:'cover',
      minHeight: '100vh',
    }} >

      <form className='container-fluid card pt-5' style={{width: '25rem', height:'550px', backgroundImage: "linear-gradient(316deg, #009FC2 0%, #0D0A0B 74%)", color:'white'}} onSubmit={handleSubmit}>
        <h2 className='d-flex justify-content-center'> iNoteBook</h2>
        <h4 className='d-flex justify-content-center underline-light'><ins>SignUp-Page</ins></h4>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} id="name" name='name' 
          style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email'
          style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
          />
          <div id="emailHelp" style={{color:'white'}} className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password"
          style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name='cpassword' id="cpassword"
          style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
          />
        </div>
        <button type="submit" className="btn btn-info mb-3">Submit</button>
      </form>
      {/* <style>{`
      body {
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        color:'white'        
      }
    `}</style> */}
    </div>
  );
}
