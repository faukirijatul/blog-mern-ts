import React, { useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { CustomGoogleLoginButton } from "./GoogleLogin";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";

const navbarMenu = ["Home", "Basics", "Frontend", "Backend", "Fullstack"];

const Navbar: React.FC = () => {
  const { user, logoutLoading } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

  return (
    <header className="shadow px-2 md:px-8 xl:px-30 fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-2xl text-gray-700 cursor-pointer"
          >
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold py-4">
            <Link
              to="/"
              className="flex items-center gap-1"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src={logo} alt="Logo" className="h-8" />{" "}
              <span className="text-gray-900 italic">fauki</span>
            </Link>
          </div>
        </div>

        {/* Menu desktop */}
        <nav
          className={`hidden lg:flex flex-row items-center gap-6 relative bg-transparent w-auto p-0`}
        >
          {navbarMenu.map((menu, index) => (
            <Link
              key={index}
              to={menu === "Home" ? "/" : `/category/${menu.toLowerCase()}`}
              className="menu-item relative inline-block px-4 py-5 w-fit"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {menu}
            </Link>
          ))}
          <a
            href="https://fauki.com/"
            target="_blank"
            className="menu-item relative inline-block px-4 py-5 w-fit"
          >
            About Me
          </a>
        </nav>

        {/* Menu mobile */}
        <nav
          className={`${
            showMobileMenu ? "block" : "hidden"
          } flex flex-col lg:hidden items-center absolute top-16 left-0 bg-white w-full shadow-lg p-4`}
        >
          {navbarMenu.map((menu, index) => (
            <Link
              key={index}
              to={menu === "Home" ? "/" : `/category/${menu.toLowerCase()}`}
              className="menu-item relative inline-block px-4 py-5 w-fit"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setShowMobileMenu(false);
              }}
            >
              {menu}
            </Link>
          ))}
          <a
            href="https://fauki.com/"
            target="_blank"
            className="menu-item relative inline-block px-4 py-5 w-fit"
          >
            About Me
          </a>
        </nav>

        {/* Profile Menu */}
        <div className="flex items-center gap-4">
          {!user ? (
            <CustomGoogleLoginButton />
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={
                    user && user.picture
                      ? user.picture.url
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute -right-1 top-11 mt-2 bg-white text-black shadow-lg rounded border border-gray-300 w-[200px]">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  {user && user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setShowDropdown(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 cursor-pointer"
                  >
                    <FaSignOutAlt className="mr-2 inline" />
                    Logout
                    {logoutLoading && (
                      <FaSpinner className="animate-spin ml-2" />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

