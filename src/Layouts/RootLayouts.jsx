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
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-28 py-1">
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
