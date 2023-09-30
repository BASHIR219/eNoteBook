import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    // const json = await response.json();
    // console.log(json);
    if (response.status === 200) {
      const json = await response.json();
      props.showAlert("Successfully Login", 'success'); 
      localStorage.setItem('token', json.authToken);
      navigate('/home');
    } else {
      // Display the alert if login is unsuccessful
      props.showAlert("Invalid Credential", 'danger'); 

      console.log("wrong credential");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  };

  return (
    <div className='d-flex justify-content-center align-items-center'  style={{
      backgroundColor: "#0093E9",
      backgroundImage: "linear-gradient(160deg, #182B3A 0%, #20A4F3 100%)",
      backgroundSize:'cover',
      minHeight: '100vh',
    }} >
      <form className='container card pt-5' style={{width: '25rem', height:'500px',backgroundImage: "linear-gradient(316deg, #009FC2 0%, #0D0A0B 74%)",  color:'white'}} onSubmit={handleSubmit}>
        <h2>Login to iNoteBook</h2>
        <div className="mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp"
          style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
           />

          <div id="emailHelp" style={{color:'white'}} className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div >
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
          />
        </div>

        <button type="submit" className="btn btn-info mt-5">Submit</button>
      </form>
      
    </div>
  );
}
