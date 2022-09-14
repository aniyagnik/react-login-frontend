import React from "react";

const AppBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-item">Home</div>
      <div className="navbar-item dropdown">          
          <span>Profile</span>
          <div class="dropdown-content">
          <p>Logout</p>
          <p>Delete Account</p>
        </div>
      </div>
    </div>
  );
}

export default AppBar;