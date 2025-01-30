import React, { useCallback, useEffect, useState } from "react";
import Advertisement from "../../components/Advertisement";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowDown,
  FaArrowUp,
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
  FaRegEye,
  FaRegHeart,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { IAllBlog } from "../../store/slices/blogSlice";
import { useSelector } from "react-redux";
import { saveBlog, unsaveBlog } from "../../store/slices/userSlice";
import axios from "axios";
import debounce from "lodash.debounce";
import Select from "react-select";
import { categories } from "../../data/data";

const API_BASE = import.meta.env.VITE_SERVER_URL;

const sortOptions = [
  { value: "createdAt", label: "Post Time" },
  { value: "likesCount", label: "Likes" },
  { value: "views", label: "Views" },
];

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  const { category } = useParams<{ category?: string }>();

  const [blogs, setBlogs] = useState<IAllBlog[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [selectedCategory, setSelectedCategory] = useState(category || "");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const fetchBlogs = async (reset = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/v1/blogs`, {
        params: {
          page: reset ? 1 : page,
          limit,
          search,
          category: selectedCategory,
          sortBy,
          order,
        },
      });

      if (response.data.success) {
        const newBlogs = response.data.blogs;
        setBlogs(reset ? newBlogs : [...blogs, ...newBlogs]);
        setPage(reset ? 2 : page + 1);

        setHasMore(newBlogs.length === limit);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(true);
  }, [search, selectedCategory, sortBy, order]);

  const debouncedSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const handleSaveBlog = (blogId: string) => {
    dispatch(saveBlog(blogId));
  };

  const handleUnsaveBlog = (blogId: string) => {
    dispatch(unsaveBlog(blogId));
  };

  return (
    <>
      <div
        className={`max-w-screen-xl mx-auto py-8 ${
          pathname.startsWith("/category") ? "mt-20 px-2 xl:px-0" : ""
        }`}
      >
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="border border-gray-300 px-2 py-[6px] rounded-[5px] w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => debouncedSearch(e.target.value)}
          />

          {/* Category & Sorting */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
            <Select
              options={categories}
              placeholder="Select Category"
              value={categories.find((cat) => cat.value === selectedCategory)}
              onChange={(option) => setSelectedCategory(option?.value || "")}
              className="w-full sm:w-1/2"
              isClearable
            />
            <Select
              options={sortOptions}
              placeholder="Sort By"
              value={sortOptions.find((opt) => opt.value === sortBy)}
              onChange={(option) => setSortBy(option?.value || "createdAt")}
              className="w-full sm:w-1/2"
              isClearable
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Blog Section */}
          <div className="flex-2">
            <div className=" mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">All Blogs</h3>
              <div>
                {order === "desc" ? (
                  <FaArrowUp
                    onClick={() => setOrder("asc")}
                    className="cursor-pointer"
                  />
                ) : (
                  <FaArrowDown
                    onClick={() => setOrder("desc")}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="relative flex items-start gap-4 bg-white p-4 border border-gray-300 shadow cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/blog/${blog.slug}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={blog.thumbnail.url}
                    alt={blog.title}
                    className="w-32 h-32 object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold line-clamp-2">
                      {blog.title}
                    </h4>
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                      By {blog.authorData.name} . {blog.commentsCount}{" "}
                      <FaRegComment /> . {blog.likesCount} <FaRegHeart /> .{" "}
                      {blog.views} <FaRegEye />
                    </div>
                    <p className="text-gray-900 line-clamp-3 mt-2">
                      {blog.highlight}
                    </p>
                  </div>

                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user &&
                    user.savedBlogs &&
                    user.savedBlogs.includes(blog._id) ? (
                      <FaBookmark onClick={() => handleUnsaveBlog(blog._id)} />
                    ) : (
                      <FaRegBookmark onClick={() => handleSaveBlog(blog._id)} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer mt-4 hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => fetchBlogs()}
                  disabled={loading}
                >
                  {loading && <FaSpinner className="animate-spin" />}
                  <span>Load More</span>
                </button>
              </div>
            )}
          </div>

          {/* Advertisement Section */}
          <Advertisement />
        </div>
      </div>

      <div className={`${pathname.startsWith("/category") ? "" : "hidden"}`}>
        <Footer />
      </div>
    </>
  );
};

export default BlogList;
