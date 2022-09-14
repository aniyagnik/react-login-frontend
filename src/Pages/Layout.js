import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../Appbar";

const Layout = () => {
  return (
    <div className="DashboardBg">
      <AppBar />
      <Outlet />
    </div>
  );
};

export default Layout;
