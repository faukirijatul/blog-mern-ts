import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../../../../constans";
import toast from "react-hot-toast";
import { formatDate } from "../../../../helper/formatDate";
import { capitalizeFirstLetter } from "../../../../helper/capitalizeFirstLetter";

interface ILatestUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface ILatestBlog {
  _id: string;
  title: string;
  createdAt: string;
  category: string;
  author: {
    name: string;
  };
}

const LatestUsersAndBlogsTable: React.FC = () => {
  const [latestUsers, setLatestUsers] = React.useState<ILatestUser[]>([]);
  const [latestBlogs, setLatestBlogs] = React.useState<ILatestBlog[]>([]);

  useEffect(() => {
    try {
      axios
        .get(`${API_BASE}/api/v1/statistics/latest-users-and-blogs`)
        .then((response) => {
          setLatestUsers(response.data.latestUsers);
          setLatestBlogs(response.data.latestBlogs);
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
        throw new Error(
          error.response?.data?.message || "An unknown error occurred"
        );
      } else {
        toast.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col xl:flex-row items-center xl:items-start gap-5 mt-10">
      <div className="w-full">
        <div className="flex justify-start gap-10 items-center mb-4">
          <h2 className="text-2xl font-bold">Latest Users</h2>
          <Link
            to={"/admin/users"}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            View All
          </Link>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Join Since</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <div className="flex justify-start gap-10 items-center mb-4">
          <h2 className="text-2xl font-bold">Latest Blogs</h2>
          <Link
            to={"/admin/blogs"}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            View All
          </Link>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Author</th>
              <th className="text-left p-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {latestBlogs.map((blog, index) => (
              <tr
                key={blog._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="p-4">{blog.title}</td>
                <td className="p-4">{blog.author.name}</td>
                <td className="p-4">{capitalizeFirstLetter(blog.category)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestUsersAndBlogsTable;
