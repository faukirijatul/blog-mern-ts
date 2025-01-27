import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { blogData } from "../data/data";
import logo from "../assets/logo.svg";
import { GoSearch } from "react-icons/go";
import { Blog } from "../types";
import debounce from "lodash.debounce";
import SearchModal from "./SearchModal";
import { CustomGoogleLoginButton } from "./GoogleLogin";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";

const Navbar: React.FC = () => {
  const { user } = useSelector((state : RootState ) => state.user);
  const dispatch : AppDispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

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

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBlogs([]);
    } else {
      const results = blogData.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(results.slice(0, 5));
    }
  }, [searchQuery]);

  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    300
  );

  return (
    <>
      <header className="shadow px-2 md:px-8 xl:px-30 fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            {/* Hamburger Menu untuk versi mobile */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-2xl text-gray-700"
            >
              {showMobileMenu ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo di kiri */}
            <div className="text-2xl font-bold py-4">
              <Link
                to="/"
                className="flex items-center"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img src={logo} alt="Logo" className="h-8" />
              </Link>
            </div>
          </div>

          {/* Menu di desktop */}
          <nav
            className={`hidden lg:flex flex-row items-center gap-6 relative bg-transparent w-auto p-0`}
          >
            {[
              "Home",
              "Category 1",
              "Category 2",
              "Category 3",
              "Category 4",
            ].map((menu, index) => (
              <Link
                key={index}
                to={
                  menu === "Home"
                    ? "/"
                    : `/category/${menu.toLowerCase().replace(" ", "-")}`
                }
                className="menu-item relative inline-block px-4 py-5 w-fit"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {menu}
              </Link>
            ))}
          </nav>

          {/* Menu di mobile */}
          <nav
            className={`${
              showMobileMenu ? "block" : "hidden"
            } flex flex-col lg:hidden items-center absolute top-16 left-0 bg-white w-full shadow-lg p-4`}
          >
            {[
              "Home",
              "Category 1",
              "Category 2",
              "Category 3",
              "Category 4",
            ].map((menu, index) => (
              <Link
                key={index}
                to={
                  menu === "Home"
                    ? "/"
                    : `/category/${menu.toLowerCase().replace(" ", "-")}`
                }
                className="menu-item relative inline-block px-4 py-5 w-fit"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setShowMobileMenu(false);
                }}
              >
                {menu}
              </Link>
            ))}
          </nav>

          {/* Bagian kanan: Login / Profil */}
          <div className="flex items-center gap-4">
            <div
              className="text-2xl bg-gray-200 rounded-full p-2 cursor-pointer"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <GoSearch />
            </div>
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
                      user && user.picture ? user.picture.url :
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {/* Dropdown menu jika sudah login */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profil
                    </Link>
                    {user && user.role === "admin" && (
                      <a
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setShowDropdown(false)}
                    >
                      Admin Dashboard
                    </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                    >
                      <FaSignOutAlt className="mr-2 inline" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal Search */}
      {isSearchOpen && (
        <SearchModal
          setIsSearchOpen={setIsSearchOpen}
          handleSearchChange={handleSearchChange}
          filteredBlogs={filteredBlogs}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </>
  );
};

export default Navbar;
