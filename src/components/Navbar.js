import React from 'react'
import {Link , useLocation, useNavigate} from "react-router-dom";
// import { useEffect } from "react";
const Navbar = () => {
  let navigate  = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate("/login")
  }
  let location = useLocation();
  // useEffect(() => {
  //   //  console.log(location);
  // }, [location]);
   
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
     {!localStorage.getItem('token')?<form className="form-inline my-2 my-lg-0">
      <Link className='btn btn-primary mx-2' to="/login">Login</Link>
      <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>

      </form> : <button className='btn btn-primary' onClick={handleLogout} >Logout</button>}
    </div>
  </nav> 
  )
  }

export default Navbar