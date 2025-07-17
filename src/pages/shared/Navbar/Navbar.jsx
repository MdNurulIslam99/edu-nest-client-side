import React, { use } from "react";
import { NavLink } from "react-router";
import userIcon from "/user.png";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Sign-out successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        toast.error("User can't Sign Out. Something went wrong!");
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-neutral-950 text-lg font-bold"
              : "text-white  text-lg font-bold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          className={({ isActive }) =>
            isActive
              ? "text-neutral-950  text-lg font-bold"
              : "text-white text-lg font-bold"
          }
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teacherRequestForm"
          className={({ isActive }) =>
            isActive
              ? "text-neutral-950 text-lg font-bold"
              : "text-white text-lg font-bold"
          }
        >
          Teach on EduNest
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#0682a1] shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 xl:px-8 flex items-center justify-between h-16">
        {/* 🔄 CHANGED: Flex container for logo and mobile menu */}
        <div className="flex lg:flex-row items-center gap-4">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="cursor-pointer text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-[1] p-2 shadow bg-[#0682a1] rounded-box w-52 text-white space-y-1"
            >
              {links}
            </ul>
          </div>

          <NavLink className="flex items-center gap-2" to="/">
            <img
              className="h-10 w-10 rounded-full"
              src="https://i.ibb.co/Jw6Z9Xgj/logo-Edu-Nest.png"
              alt="logo"
            />
            <h1 className="text-lg sm:text-xl font-bold text-white whitespace-nowrap">
              Edu<span className="text-emerald-200">Nest</span>
            </h1>
          </NavLink>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal space-x-5 font-semibold text-white">
            {links}
          </ul>
        </div>

        {/* 🔄 CHANGED: User Dropdown/Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || userIcon} alt="User" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 space-y-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52"
              >
                <li className="text-center font-semibold text-gray-800 cursor-default">
                  {user.displayName}
                </li>
                <li>
                  <NavLink
                    to="/dashBoard"
                    className="hover:bg-gray-200 btn text-center font-semibold"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  {/* <button
                    onClick={handleLogOut}
                    className="hover:bg-gray-100 w-full text-center font-semibold"
                  >
                    Logout
                  </button> */}

                  <button
                    onClick={handleLogOut}
                    className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/signin"
                className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default NavBar;
