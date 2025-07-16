import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const RootLayouts = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div className=" min-h-[calc(100vh-385px)]">
          <Outlet></Outlet>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayouts;
