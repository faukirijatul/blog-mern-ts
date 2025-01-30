import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBlog, FaPlus, FaUsers, FaUser, FaLayerGroup, FaCog, FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { logout } from "../../../store/slices/userSlice";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  className?: string;
}

type Props = {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    isMobile: boolean;
}

const Sidebar: React.FC<Props> = ({isExpanded, setIsExpanded, isMobile}) => {

  const dispatch : AppDispatch = useDispatch();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FaBlog /> },
    { name: "Create Blog", path: "/admin/create", icon: <FaPlus /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Profile", path: "/admin/profile", icon: <FaUser /> },
    { name: "Layouts", path: "/admin/layouts", icon: <FaLayerGroup /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 text-white ${
        isExpanded ? "w-64" : "w-13"
      } transition-width duration-300 flex flex-col ${isMobile ? "fixed z-60" : "sticky"} top-0 left-0`}
    >
      <button
        className="text-xl p-4 hover:bg-gray-700 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 hover:bg-gray-700 transition-colors duration-300 ${
                isActive ? "bg-gray-700" : ""
              } ${item.className || ""}`
            }
            onClick={isMobile && isExpanded ? toggleSidebar : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && <span className="text-base">{item.name}</span>}
          </NavLink>
        ))}
        <div
            className="flex items-center gap-4 p-4 hover:bg-gray-700 transition-colors duration-300 text-red-500 cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            <span className="text-xl"><FaSignOutAlt /></span>
            {isExpanded && <span className="text-base">Logout</span>}
          </div>
      </nav>
    </div>
  );
};

export default Sidebar;
