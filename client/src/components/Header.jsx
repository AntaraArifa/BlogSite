import { Navbar, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 rounded-lg text-white">
          Antara's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        className="w-10 h-10 flex items-center justify-center lg:hidden"
        color="gray"
      >
        <AiOutlineSearch className="text-lg" />
      </Button>

      <div className="flex gap-3 md:order-2">
        <Button className="p-2 hidden sm:inline" color="gray">
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button className="px-2 py-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 rounded-lg text-white">
            Sign In
          </Button>
        </Link>
        <Button
          className="navbar-toggler block md:hidden p-2 text-gray-700 border border-gray-700 rounded-lg"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon">☰</span>
        </Button>
      </div>

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
              className="nav-link block py-2 px-4 text-gray-700 hover:text-gray-900 md:hover:bg-transparent md:border-0 md:p-0"
            >
              Home
            </Link>
          </li>
          <li className={`nav-item ${path === "/about" ? "active" : ""}`}>
            <Link
              to="/about"
              className="nav-link block py-2 px-4 text-gray-700 hover:text-gray-900 md:hover:bg-transparent md:border-0 md:p-0"
            >
              About
            </Link>
          </li>
          <li className={`nav-item ${path === "/projects" ? "active" : ""}`}>
            <Link
              to="/projects"
              className="nav-link block py-2 px-4 text-gray-700 hover:text-gray-900 md:hover:bg-transparent md:border-0 md:p-0"
            >
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </Navbar>
  );
}
