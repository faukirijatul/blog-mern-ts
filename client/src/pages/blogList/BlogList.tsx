import React, { useEffect, useState } from "react";
import Advertisement from "../../components/Advertisement";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
  FaRegEye,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { IAllBlog } from "../../store/slices/blogSlice";
import { useSelector } from "react-redux";
import { saveBlog, unsaveBlog } from "../../store/slices/userSlice";
import axios from "axios";

const API_BASE = import.meta.env.VITE_SERVER_URL;

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  const [blogs, setBlogs] = useState<IAllBlog[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/v1/blogs`, {
        params: {
          page,
          limit,
          search: "",
          category: "",
          sortBy: "createdAt",
          order: "desc",
        },
      });

      if (response.data.success) {
        const newBlogs = response.data.blogs;
        setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
        setPage((prevPage) => prevPage + 1);

        if (newBlogs.length < limit) {
          setHasMore(false); // Hentikan jika data kurang dari limit
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(); // Fetch pertama kali saat komponen dipasang
  }, []);

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
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Blog Section */}
          <div className="flex-2">
            <h3 className="text-xl font-bold mb-4">All Blogs</h3>
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

                  <div className="absolute top-2 right-2 cursor-pointer" onClick={(e) => e.stopPropagation()}>
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
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer mt-4 hover:bg-gray-100 disabled:opacity-50"
                  onClick={fetchBlogs}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
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
