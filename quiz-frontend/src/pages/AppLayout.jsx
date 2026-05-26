import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
