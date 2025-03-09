import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess} from "../redux/user/userSlice";

export default function HeaderCom() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <nav className="border-b-2 flex justify-between items-center p-4 dark:bg-gray-900">
      {/* Logo */}
      <Link
        to="/"
        className="text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 rounded-lg text-white">
          Antara's
        </span>
        Blog
      </Link>

      {/* Search */}
      <div className="flex items-center gap-3">
        <form className="hidden lg:inline">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                theme === "light" ? "bg-white text-gray-700" : "bg-gray-700 text-white"
              }`}
            />
            <AiOutlineSearch
              className={`absolute top-2.5 left-3 ${
                theme === "light" ? "text-gray-400" : "text-gray-200"
              }`}
            />
          </div>
        </form>
        <button className="w-10 h-10 flex items-center justify-center lg:hidden bg-gray-200 rounded-lg dark:bg-gray-700">
          <AiOutlineSearch
            className={`text-lg ${
              theme === "light" ? "text-gray-700" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex gap-3">
        <button
          className="p-2 hidden sm:inline bg-gray-200 rounded-lg dark:bg-gray-700"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-white" />
          )}
        </button>

        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg ${
                theme === "light" ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-white"
              }`}
            >
              <img
                src={currentUser.profilePicture}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span>{currentUser.username}</span>
            </button>
            {showDropdown && (
              <div
                className={`absolute right-0 mt-2 rounded shadow-lg w-48 ${
                  theme === "light"
                    ? "bg-white border-gray-200 text-gray-700"
                    : "bg-gray-800 border-gray-600 text-white"
                }`}
              >
                <div className="px-4 py-2 border-b">
                  <p className="text-sm">{currentUser.username}</p>
                  <p className="text-sm font-medium truncate">
                    {currentUser.email}
                  </p>
                </div>
                <Link to="/dashboard?tab=profile">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
                    }`}
                  >
                    Profile
                  </button>
                </Link>
                <hr
                  className={`${
                    theme === "light" ? "border-gray-200" : "border-gray-600"
                  }`}
                />
                <button
                  onClick={handleSignout}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
                  }`}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/sign-in">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 rounded-lg text-white">
              Sign In
            </button>
          </Link>
        )}

        <button
          className="navbar-toggler block md:hidden p-2 text-gray-700 border border-gray-700 rounded-lg dark:text-white dark:border-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto`}
        id="navbarNav"
      >
        <ul className="flex flex-col md:flex-row md:ml-auto md:mr-4 gap-x-4">
          <li className={`nav-item ${path === "/" ? "active" : ""}`}>
            <Link
              to="/"
              className={`nav-link block py-2 px-4 ${
                theme === "light"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-300"
              }`}
            >
              Home
            </Link>
          </li>
          <li className={`nav-item ${path === "/about" ? "active" : ""}`}>
            <Link
              to="/about"
              className={`nav-link block py-2 px-4 ${
                theme === "light"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-300"
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
