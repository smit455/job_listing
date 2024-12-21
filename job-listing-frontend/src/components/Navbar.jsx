import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 shadow-lg p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-white hover:text-yellow-300 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Job Listings
        </h1>

        {/* Hamburger Menu for Small Screens */}
        <div className="sm:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex-col sm:flex-row sm:flex sm:space-x-6 text-white font-medium text-lg absolute sm:static top-16 left-0 sm:top-auto sm:left-auto w-full sm:w-auto sm:bg-transparent transition-all duration-300 ${
            isMenuOpen ? "bg-indigo-700 block" : "hidden"
          }`}
        >
          <li
            className="hover:text-yellow-300 transition-all duration-300 cursor-pointer p-4 sm:p-0"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            className="hover:text-yellow-300 transition-all duration-300 cursor-pointer p-4 sm:p-0"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/about");
            }}
          >
            About
          </li>
          <li
            className="hover:text-yellow-300 transition-all duration-300 cursor-pointer p-4 sm:p-0"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/contact");
            }}
          >
            Contact
          </li>

          {/* Post a Job Button for Small Screens */}
          <li className="sm:hidden">
            <button
              className="bg-yellow-400 text-indigo-800 font-bold w-full text-center px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 hover:shadow-lg transition-all duration-300"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/post-job");
              }}
            >
              Post a Job
            </button>
          </li>
        </ul>

        {/* Post a Job Button for Larger Screens */}
        <button
          className="hidden sm:block bg-yellow-400 text-indigo-800 font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 hover:shadow-lg transition-all duration-300"
          onClick={() => navigate("/post-job")}
        >
          Post a Job
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
