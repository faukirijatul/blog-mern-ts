import React, { useState, useEffect, useCallback } from "react";
import {
  FaCalendarAlt,
  FaEdit,
  FaRegBookmark,
  FaRegComment,
  FaRegEye,
  FaRegHeart,
  FaTrash,
} from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Select from "react-select";
import debounce from "lodash.debounce";
import { categories } from "../../../data/data";
import axios from "axios";
import { IAllBlog } from "../../../store/slices/blogSlice";
import { formatDate } from "../../../helper/formatDate";
import { capitalizeFirstLetter } from "../../../helper/capitalizeFirstLetter";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../../constans";
import { SkeletonCard, SkeletonRow } from "./skeleton";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import toast from "react-hot-toast";

const AllBlogsTable: React.FC = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<IAllBlog[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/v1/blogs`, {
        params: {
          search,
          category: selectedCategory,
          sortBy,
          order,
          page: currentPage,
          limit,
        },
      });
      if (response.data.success) {
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Error fetching blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, selectedCategory, sortBy, order, currentPage]);

  const debouncedSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleSort = (key: string) => {
    setSortBy(key);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const renderSortIcon = (key: string) => {
    if (sortBy === key) {
      return order === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="p-2 md:p-4 lg:p-6">
      <h2 className="text-2xl font-bold mb-4 mt-15">All Blogs</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          className="border border-gray-300 rounded-[5px] px-2 py-[5px] w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Select
          options={categories}
          isClearable
          placeholder="Filter by category"
          className="w-full min-w-55 md:w-1/4"
          value={categories.find((cat) => cat.value === selectedCategory)}
          onChange={(option) => setSelectedCategory(option?.value || "")}
        />
      </div>

      <div className="overflow-x-auto hidden lg:block">
        <div className="min-w-[1100px]">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
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
                  onClick={() => handleSort("authorData.name")}
                >
                  <div className="flex items-center justify-between">
                    <p>Author</p> {renderSortIcon("authorData.name")}
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
                  onClick={() => handleSort("commentsCount")}
                >
                  <div className="flex items-center justify-between">
                    <p>Comments</p> {renderSortIcon("commentsCount")}
                  </div>
                </th>
                <th
                  className="p-4 cursor-pointer text-center"
                  onClick={() => handleSort("likesCount")}
                >
                  <div className="flex items-center justify-between">
                    <p>Likes</p> {renderSortIcon("likesCount")}
                  </div>
                </th>
                <th
                  className="p-4 cursor-pointer text-center"
                  onClick={() => handleSort("saves")}
                >
                  <div className="flex items-center justify-between">
                    <p>Saved</p> {renderSortIcon("saves")}
                  </div>
                </th>
                <th
                  className="p-4 cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center justify-between">
                    <p>Posted At</p> {renderSortIcon("createdAt")}
                  </div>
                </th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(5)
                    .fill(null)
                    .map((_, i) => <SkeletonRow key={i} />)
                : blogs.map((blog, index) => (
                    <tr
                      key={blog._id}
                      className={
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      }
                    >
                      <td className="p-4 text-center">{index + 1}</td>
                      <td className="p-4">{blog.title}</td>
                      <td className="p-4">{blog.authorData.name}</td>
                      <td className="p-4">
                        {capitalizeFirstLetter(blog.category || "")}
                      </td>
                      <td className="p-4 text-center">{blog.commentsCount}</td>
                      <td className="p-4 text-center">{blog.likesCount}</td>
                      <td className="p-4 text-center">{blog.saves}</td>
                      <td className="p-4">{formatDate(blog.createdAt)}</td>
                      <td className="p-4 flex items-center justify-center gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          onClick={() => navigate(`/admin/edit/${blog.slug}`)}
                        >
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

      <div className="space-y-4 lg:hidden">
        {loading
          ? Array(3)
              .fill(null)
              .map((_, i) => <SkeletonCard key={i} />)
          : blogs.map((blog) => (
              <div
                key={blog._id}
                className="relative flex items-start gap-4 bg-white p-2 border border-gray-300 shadow"
              >
                <div className="min-w-15">
                  <img
                    src={blog.thumbnail.url}
                    alt={blog.title}
                    className="w-15 h-15 object-cover"
                  />
                  <div className="p-2 flex items-center justify-center gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => navigate(`/admin/edit/${blog.slug}`)}
                    >
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-semibold line-clamp-2">
                    {blog.title}
                  </h4>
                  <div className="text-gray-500 text-xs flex items-center gap-1 flex-wrap">
                    <p className="flex items-center gap-1">
                      By {blog.authorData.name}
                    </p>{" "}
                    .{" "}
                    <p className="flex items-center gap-1">
                      {blog.commentsCount} <FaRegComment />
                    </p>{" "}
                    .{" "}
                    <p className="flex items-center gap-1">
                      {blog.likesCount} <FaRegHeart />
                    </p>{" "}
                    .{" "}
                    <p className="flex items-center gap-1">
                      {blog.views} <FaRegEye />
                    </p>{" "}
                    .{" "}
                    <p className="flex items-center gap-1">
                      {blog.saves} <FaRegBookmark />
                    </p>{" "}
                    .{" "}
                    <p className="flex items-center gap-1">
                      <FaCalendarAlt /> {formatDate(blog.createdAt)}
                    </p>
                  </div>
                  <p className="text-gray-900 line-clamp-4 mt-2 text-sm">
                    {blog.highlight}
                  </p>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-1 text-2xl bg-gray-300 rounded-md disabled:opacity-50 mr-2"
        >
          <GrFormPrevious />
        </button>
        <span className="px-4 py-2">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-1 text-2xl bg-gray-300 rounded-md disabled:opacity-50 ml-2"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default AllBlogsTable;
