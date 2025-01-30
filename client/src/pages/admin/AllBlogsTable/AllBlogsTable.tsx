import React, { useState, useEffect, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Select from "react-select";
import debounce from "lodash.debounce";
import { Blog } from "../../../types";
import { categories } from "../../../data/data";

const AllBlogsTable: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  useEffect(() => {
    // Dummy data for demonstration
    const dummyBlogs = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Blog Title ${i + 1}`,
      author: `Author ${i + 1}`,
      category: `Category ${((i + 1) % 5) + 1}`,
      comments: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 500),
      saved: Math.floor(Math.random() * 300),
      postedAt: new Date().toISOString(),
    }));
    setBlogs(dummyBlogs);
    setFilteredBlogs(dummyBlogs);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(lowercasedTerm) ||
        blog.author.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredBlogs(filtered);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [blogs]);

  const handleFilterChange = (selectedOption: any) => {
    setCategoryFilter(selectedOption);
    if (selectedOption) {
      const filtered = blogs.filter(
        (blog) => blog.category === selectedOption.value
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null; // Reset sorting
    }

    setSortConfig({ key, direction });

    if (!direction) {
      setFilteredBlogs([...blogs]); // Reset to original order
      return;
    }

    const sorted = [...filteredBlogs].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredBlogs(sorted);
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") return <FaSortUp />;
      if (sortConfig.direction === "desc") return <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 mt-15">All Blogs</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          className="border border-gray-300 rounded-lg px-2 py-[6px] w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Select
          options={categories}
          isClearable
          placeholder="Filter by category"
          className="w-full md:w-1/4"
          onChange={handleFilterChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">#</th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center justify-between">
                  <p>Title</p> {renderSortIcon("title")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("author")}
              >
                <div className="flex items-center justify-between">
                  <p>Author</p> {renderSortIcon("author")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center justify-between">
                  <p>Category</p> {renderSortIcon("category")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("comments")}
              >
                <div className="flex items-center justify-between">
                  <p>Comments</p> {renderSortIcon("comments")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("likes")}
              >
                <div className="flex items-center justify-between">
                  <p>Likes</p> {renderSortIcon("likes")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("saved")}
              >
                <div className="flex items-center justify-between">
                  <p>Saved</p> {renderSortIcon("saved")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("postedAt")}
              >
                <div className="flex items-center justify-between">
                  <p>Posted At</p> {renderSortIcon("postedAt")}
                </div>
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog, index) => (
              <tr
                key={blog.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4">{blog.title}</td>
                <td className="p-4">{blog.author}</td>
                <td className="p-4">{blog.category}</td>
                <td className="p-4 text-center">{blog.comments}</td>
                <td className="p-4 text-center">{blog.likes}</td>
                <td className="p-4 text-center">{blog.saved}</td>
                <td className="p-4">
                  {new Date(blog.postedAt).toLocaleString()}
                </td>
                <td className="p-4 flex items-center justify-center gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBlogsTable;
