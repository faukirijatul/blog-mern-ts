import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)] mt-15 p-4">
      <div className="text-center max-w-md">
        <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the blog you're looking for does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BlogNotFound;
