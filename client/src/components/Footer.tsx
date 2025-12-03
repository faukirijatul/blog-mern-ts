import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.svg";
import { categories } from "../data/data";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const { visits } = useSelector((state: RootState) => state.statistic);

  return (
    <footer className="bg-gray-800 text-white px-2 md:px-8 xl:px-30">
      {/* Bagian atas Footer */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-8 lg:space-y-0  max-w-screen-xl mx-auto pt-4">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start flex-1">
          <Link
            to="/"
            className="text-2xl font-semibold mb-4 flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={logo} alt="Logo" className="h-8" />{" "}
            <span className="text-gray-300 italic">fauki</span>
          </Link>
          <p className="text-gray-300 px-3 text-sm text-center md:px-0 md:text-left">
            A personal blog sharing tips and experiences on software
            development, from coding to best practices in app development.
          </p>

          <p className="text-gray-200 px-3 text-sm text-center md:px-0 md:text-left mt-5">
            Total Visits: {visits.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center flex-1">
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
              <a
                href="https://fauki.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                About
              </a>
            </li>
            <a
              href="https://fauki.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Contact
            </a>
          </ul>
        </div>

        {/* List Category */}
        <div className="flex flex-col items-center flex-1">
          <div className="text-lg font-medium mb-4">List Category</div>
          <ul className="space-y-1 flex flex-col items-center">
            {categories.map((category) => (
              <li key={category.value}>
                <Link
                  to={`/category/${category.value}`}
                  className="hover:text-gray-400"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us & Social Icons */}
        <div className="flex flex-col items-center md:items-end flex-1">
          <div className="text-lg font-medium mb-4">Contact Us</div>
          <div className="flex space-x-4">
            {/* <a
              href="https://faukirijatul.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaFacebook />
            </a> */}
            {/* <a
              href="https://faukirijatul.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaTwitter />
            </a> */}
            <a
              href="https://instagram.com/faukirijatul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/faukirijatulh/"
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
            Fauki
          </span>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
