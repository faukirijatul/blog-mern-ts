import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white px-2 md:px-8 xl:px-30">
      {/* Bagian atas Footer */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-8 lg:space-y-0  max-w-screen-xl mx-auto pt-4">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start lg:w-1/4">
          <Link
            to="/"
            className="text-2xl font-semibold mb-4"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Logo
          </Link>
          <p className="text-gray-400 px-3 text-center md:px-0 md:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center lg:w-1/4">
          <div className="text-lg font-medium mb-4">Quick Links</div>
          <ul className="space-y-1 flex flex-col items-center">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* List Category */}
        <div className="flex flex-col items-center lg:w-1/4">
          <div className="text-lg font-medium mb-4">List Category</div>
          <ul className="space-y-1 flex flex-col items-center">
            <li>
              <Link
                to="/category/category1"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Category 1
              </Link>
            </li>
            <li>
              <Link
                to="/category/category2"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Category 2
              </Link>
            </li>
            <li>
              <Link
                to="/category/category3"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Category 3
              </Link>
            </li>
            <li>
              <Link
                to="/category/category4"
                className="hover:text-gray-400"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Category 4
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us & Social Icons */}
        <div className="flex flex-col items-center md:items-end lg:w-1/4">
          <div className="text-lg font-medium mb-4">Contact Us</div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bagian bawah Footer */}
      <div className="text-center mt-8 border-t border-gray-700 py-3 text-sm">
        <p>
          &copy; {currentYear}{" "}
          <span
            className="font-semibold hover:underline cursor-pointer"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Your Company
          </span>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
