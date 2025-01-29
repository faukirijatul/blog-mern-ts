import React, { useEffect } from "react";
import { blogData } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getFiveLatestAndPopularBlogs,
} from "../../store/slices/blogSlice";
import {
  FaCalendarAlt,
  FaRegComment,
  FaRegEye,
  FaRegHeart,
} from "react-icons/fa";
import { formatDate } from "../../helper/formatDate";

const LatestAndMostPopular: React.FC = () => {

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const { fiveLatestBlogs, fivePopularBlogs } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    dispatch(getFiveLatestAndPopularBlogs());
  }, [dispatch]);

  return (
    <div className="max-w-screen-xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Latest Post */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
          <div className="space-y-2">
            {fiveLatestBlogs.map((blog) => (
              <div
                key={blog._id}
                className="flex items-start gap-4 bg-white p-2 border border-gray-300 shadow cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  navigate(`/blog/${blog.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src={blog.thumbnail.url}
                  alt={blog.title}
                  className="w-24 h-24 object-cover"
                />
                <div>
                  <h4
                    className="text-lg font-semibold line-clamp-1"
                    title={blog.title}
                  >
                    {blog.title}
                  </h4>
                  <div className="text-gray-500 text-sm flex items-center gap-1">
                    By {blog.authorData.name} . {blog.commentsCount}{" "}
                    <FaRegComment /> . {blog.likesCount} <FaRegHeart /> .{" "}
                    {blog.views} <FaRegEye />
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
                    <FaCalendarAlt /> {formatDate(blog.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Most Popular</h3>
          <div className="space-y-2">
            {fivePopularBlogs.map((blog) => (
              <div
                key={blog._id}
                className="flex items-start gap-4 bg-white p-2 border border-gray-300 shadow cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  navigate(`/blog/${blog.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src={blog.thumbnail.url}
                  alt={blog.title}
                  className="w-24 h-24 object-cover"
                />
                <div>
                  <h4
                    className="text-lg font-semibold line-clamp-1"
                    title={blog.title}
                  >
                    {blog.title}
                  </h4>
                  <div className="text-gray-500 text-sm flex items-center gap-1">
                    By {blog.authorData.name} . {blog.commentsCount}{" "}
                    <FaRegComment /> . {blog.likesCount} <FaRegHeart /> .{" "}
                    {blog.views} <FaRegEye />
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
                    <FaCalendarAlt /> {formatDate(blog.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestAndMostPopular;
