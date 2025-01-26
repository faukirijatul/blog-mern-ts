import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Blog } from "../types";

type Props = {
  setIsSearchOpen: (value: boolean) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredBlogs: Blog[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const SearchModal: React.FC<Props> = ({
  setIsSearchOpen,
  handleSearchChange,
  filteredBlogs,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
      onClick={() => {
        setIsSearchOpen(false);
        setSearchQuery("");
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Enter search query . . ."
            className="p-2 w-full border rounded-lg"
            onChange={handleSearchChange}
          />
        </div>

        {filteredBlogs.length > 0 && (
          <div className="mt-4">
            <ul>
              {filteredBlogs.map((blog) => (
                <li
                  key={blog.id}
                  className="py-2"
                  onClick={() => {
                    navigate(`/blog/${blog.id}`);
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <span className="font-medium hover:underline cursor-pointer">
                    {blog.title}
                  </span>
                </li>
              ))}
            </ul>
            <button className="text-blue-500 mt-2 block text-center hover:underline cursor-pointer">
              View More
            </button>
          </div>
        )}

        {filteredBlogs.length === 0 && searchQuery && (
          <div className="mt-4 text-gray-500">No blogs found</div>
        )}

        <div className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white cursor-pointer">
          <IoMdClose
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="text-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
