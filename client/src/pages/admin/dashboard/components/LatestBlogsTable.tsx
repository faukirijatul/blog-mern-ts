import React from "react";
import { Link } from "react-router-dom";

const LatestBlogsTable: React.FC = () => {
  const blogs = [
    { title: "React Basics", author: "John Doe", category: "Frontend" },
    { title: "Advanced Node.js", author: "Jane Smith", category: "Backend" },
    { title: "CSS Grid Tutorial", author: "Alice Johnson", category: "Design" },
    {
      title: "Understanding TypeScript",
      author: "Robert Brown",
      category: "Frontend",
    },
    {
      title: "MongoDB Best Practices",
      author: "Emily Davis",
      category: "Database",
    },
    { title: "GraphQL vs REST", author: "Chris Wilson", category: "API" },
    { title: "Next.js Guide", author: "Patricia Lee", category: "Fullstack" },
    { title: "Tailwind CSS Tips", author: "Michael Clark", category: "Design" },
    {
      title: "Express.js Security",
      author: "Laura Martin",
      category: "Backend",
    },
    {
      title: "Deploying with Docker",
      author: "James Allen",
      category: "DevOps",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-start gap-10 items-center mb-4">
        <h2 className="text-2xl font-bold">Latest Blogs</h2>
        <Link to={"/admin/blogs"} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100">View All</Link>
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
          {blogs.map((blog, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
            >
              <td className="p-4">{blog.title}</td>
              <td className="p-4">{blog.author}</td>
              <td className="p-4">{blog.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestBlogsTable;
