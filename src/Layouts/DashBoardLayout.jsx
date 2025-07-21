import React from "react";
import {
  FaHome,
  FaPlusCircle,
  FaChalkboardTeacher,
  FaClipboardList,
  FaUserGraduate,
  FaUsersCog,
  FaUserCircle,
} from "react-icons/fa";
import { Outlet } from "react-router";

import { NavLink } from "react-router";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 lg:hidden w-full">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">DashBoard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}

          <li>
            <NavLink to="/">
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashBoard/addClass">
              <FaPlusCircle className="mr-2" /> Add Class
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/teacherRequest"
              className="flex items-center"
            >
              <FaClipboardList className="mr-2" /> Teacher Request
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/teacherMyClass"
              className="flex items-center"
            >
              <FaChalkboardTeacher className="mr-2" /> My Classes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/adminAllClasses"
              className="flex items-center"
            >
              <FaUserGraduate className="mr-2" /> All Classes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/allUsersTable"
              className="flex items-center"
            >
              <FaUsersCog className="mr-2" /> All Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myProfile" className="flex items-center">
              <FaUserCircle className="mr-2" /> My Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
