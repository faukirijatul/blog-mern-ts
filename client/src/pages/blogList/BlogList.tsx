import React, { useCallback, useEffect, useState } from "react";
import Advertisement from "../../components/Advertisement";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowDown,
  FaArrowUp,
  FaBookmark,
  FaCalendarAlt,
  FaEdit,
  FaRegBookmark,
  FaRegComment,
  FaRegEye,
  FaRegHeart,
  FaSpinner,
  FaTrash,
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
import { formatDate } from "../../helper/formatDate";
import { API_BASE } from "../../constans";

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
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [selectedCategory, setSelectedCategory] = useState(category || "");

  useEffect(() => {
    document.title = "Fauki Personal Blog";
  }, [])

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
          pathname.startsWith("/category") ? "mt-20 px-2 md:px-8" : ""
        }`}
      >
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="text-sm md:text-base border border-gray-300 px-2 py-[6px] rounded-[5px] w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => debouncedSearch(e.target.value)}
          />

          {/* Category & Sorting */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
            <Select
              options={categories}
              placeholder="Select Category"
              value={categories.find((cat) => cat.value === selectedCategory)}
              onChange={(option) => setSelectedCategory(option?.value || "")}
              className="w-full sm:w-1/2 text-sm md:text-base"
              isClearable
            />
            <Select
              options={sortOptions}
              placeholder="Sort By"
              value={sortOptions.find((opt) => opt.value === sortBy)}
              onChange={(option) => setSortBy(option?.value || "createdAt")}
              className="w-full sm:w-1/2 text-sm md:text-base"
              isClearable
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Blog Section */}
          <div className="flex-2">
            <div className=" mb-4 flex items-center justify-between">
              <h3 className="text-base md:text-xl font-bold">All Blogs</h3>
              <div className="flex items-center gap-2">
              {loading && <FaSpinner className="animate-spin" />}
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
                  className="relative flex items-start gap-4 bg-white p-2 md:p-4 border border-gray-300 shadow cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/blog/${blog.slug}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="min-w-20 md:min-w-32">
                    <img
                      src={blog.thumbnail.url}
                      alt={blog.title}
                      className="w-20 md:w-32 h-20 md:h-32 object-cover"
                    />
                    {user && user.role === "admin" && (
                      <div className="p-4 flex items-center justify-center gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          onClick={() => window.location.href=(`/admin/edit/${blog.slug}`)}
                        >
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold line-clamp-2">
                      {blog.title}
                    </h4>
                    <div className="text-gray-500 text-xs md:text-sm flex items-center gap-1 flex-wrap">
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
                        <FaCalendarAlt /> {formatDate(blog.createdAt)}
                      </p>
                    </div>
                    <p className="text-gray-900 line-clamp-3 mt-2 text-sm md:text-base">
                      {blog.highlight}
                    </p>
                  </div>

                  <div
                    className="absolute top-1 md:top-2 right-1 md:right-2 cursor-pointer"
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
                  <span>{loading ? "Loading..." : "Load More"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Advertisement Section */}
          <Advertisement />
        </div>
      </div>
    </>
  );
};

export default BlogList;
