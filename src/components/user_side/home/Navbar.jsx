import React, { useState } from "react";
import { LuUserCircle } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate('../');
  };

  return (
    <nav className="bg-gray-100 w-[1000px] bg-opacity-20 backdrop-blur-lg p-4 mt-6 rounded-full fixed top-0 left-0 right-0 mx-auto z-50">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <NavLink className="nav-link" to="/home">
            <div className="text-white text-2xl font-semibold cursor-pointer">
              <FaApple className="size-8" />
            </div>
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDropdown}
            className="text-white flex items-center space-x-2 focus:outline-none"
          >
            <div className="rounded-full overflow-hidden bg-gradient-to-tr from-gray-300 to-black opacity-80 h-8 w-8 flex items-center justify-center">
              <LuUserCircle className="h-6 w-6 text-white" />
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-44 w-48 bg-white bg-opacity-50 backdrop-blur-lg shadow-lg rounded-lg py-2">
              <NavLink className="nav-link" to="/profile">
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-200 transition-colors"
                >
                  Profile
                </a>
              </NavLink>

              {isAuthenticated ? (
                <a
                  onClick={handleLogout}
                  className="block px-4 py-2 text-white hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Logout
                </a>
              ) : (
                <NavLink to="/">
                  <a className="block px-4 py-2 text-white hover:bg-gray-200 transition-colors cursor-pointer">
                    Login
                  </a>
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
