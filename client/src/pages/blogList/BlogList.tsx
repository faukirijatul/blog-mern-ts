import React, { useEffect } from "react";
import Advertisement from "../../components/Advertisement";
import { blogData } from "../../data/data";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark, FaRegComment, FaRegEye, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getAllBlogs, IBlogQuery } from "../../store/slices/blogSlice";
import { useSelector } from "react-redux";

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const dispatch : AppDispatch = useDispatch();
  
  const { allBlogs } = useSelector((state : RootState) => state.blog);

  const query : IBlogQuery = {
    page: 1,
    limit: 10,
    search: "",
    category: "",
    sortBy: "createdAt",
    order: "desc",
  };

  useEffect(() => {
    dispatch(getAllBlogs(query));
  }, [dispatch]);

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
              {allBlogs.map((blog) => (
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
                      By {blog.authorData.name} . {blog.commentsCount} <FaRegComment /> . {blog.likesCount} <FaRegHeart /> . {blog.views} <FaRegEye />
                    </div>
                    <p className="text-gray-900 line-clamp-3 mt-2">
                      {blog.highlight}
                    </p>
                  </div>

                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Bookmark clicked");
                    }}
                  >
                    <FaRegBookmark />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer mt-4 hover:bg-gray-100">
                Load More
              </button>
            </div>
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
