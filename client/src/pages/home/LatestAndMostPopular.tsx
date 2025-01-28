import React from "react";
import { blogData } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { calculateTotalCommentsAndReplies } from "../../helper/calculateTotalCommentsAndReplies";

const LatestAndMostPopular: React.FC = () => {
  // Sorting untuk menentukan Most Popular
  const sortedByLikes = [...blogData].sort((a, b) => b.likes - a.likes);
  const sortedByDate = [...blogData].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestPost = sortedByDate.slice(0, 5); // Top 5 berdasarkan tanggal terbaru
  const mostPopular = sortedByLikes.slice(0, 5); // Top 5 berdasarkan likes

  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Latest Post */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
          <div className="space-y-2">
            {latestPost.map((blog) => (
              <div
                key={blog.id}
                className="flex items-start gap-4 bg-white p-2 border border-gray-300 shadow cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  navigate(`/blog/${blog.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-24 h-24 object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    By {blog.author} - {calculateTotalCommentsAndReplies(blog.comments)} Comments
                  </p>
                  <p className="text-gray-500 text-sm">{blog.likes} Likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Most Popular</h3>
          <div className="space-y-2">
            {mostPopular.map((blog) => (
              <div
                key={blog.id}
                className="flex items-start gap-4 bg-white p-2 shadow border border-gray-300 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  navigate(`/blog/${blog.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-24 h-24 object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold">{blog.title}</h4>
                  <p className="text-gray-500 text-sm">
                    By {blog.author} - {countComments(blog.comments)} Comments
                  </p>
                  <p className="text-gray-500 text-sm">{blog.likes} Likes</p>
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
