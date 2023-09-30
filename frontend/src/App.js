// import { Route, Router } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import About from './component/About';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup'; // Correct the case to match "Signup.js"
import { useState } from 'react';
import LandingPage from './component/LandingPage';
import Contact from './component/Contact';


function App() {
  const [alert, setAlert] =useState(null);

  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type,
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500);

  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert  alert={alert}/>          
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="home" element={<Home showAlert={showAlert} />} />
            <Route path="about" element={<About  />} />
            <Route path="contact" element={<Contact  />} />
            <Route path="login" element={<Login showAlert={showAlert} />} />
            <Route path="signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
