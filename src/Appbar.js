import axios from "axios";
import React from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import { BASE_URL } from "./constant/constants"

const AppBar = () => {
  const navigate = useNavigate();
  const handleLogout=async()=>{
    try{
      await axios.delete(`${BASE_URL}/users/logout`)
      Cookies.remove("accessKey");
      navigate('/');
    }
    catch(err){
      console.log("error in logout ",err);
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