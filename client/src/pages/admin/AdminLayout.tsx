import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <Sidebar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isMobile={isMobile}
      />
      <div className={`w-full relative ${isMobile ? "ml-13" : ""}`}>
        <div className="shadow p-4 fixed bg-white w-full flex items-center gap-10 z-10">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <a href="/" className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100">Home</a>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
