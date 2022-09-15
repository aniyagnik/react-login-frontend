import axios from "axios";
import React from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const AppBar = () => {
  const navigate = useNavigate();
  const handleLogout=async()=>{
    try{
      await axios('/logout')
      Cookies.remove("accessKey");
      navigate('/');
    }
    catch{
      console.log(err);
    }
  }
  return (
    <div className="navbar">
      <div className="navbar-item">Home</div>
      <div className="navbar-item dropdown">          
          <span>Profile</span>
          <div className="dropdown-content">
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default AppBar;