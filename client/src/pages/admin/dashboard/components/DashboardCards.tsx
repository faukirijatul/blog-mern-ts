import React from "react";

const DashboardCards: React.FC = () => {
  const stats = [
    { title: "Total Blogs", count: 120, bgColor: "bg-blue-500" },
    { title: "Total Users", count: 50, bgColor: "bg-green-500" },
    { title: "Total Visits", count: 3000, bgColor: "bg-purple-500" },
    { title: "Total Views", count: 5000, bgColor: "bg-yellow-500" },
    { title: "Total Comments", count: 200, bgColor: "bg-red-500" },
    { title: "Total Likes", count: 800, bgColor: "bg-indigo-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`${stat.bgColor} text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center`}
        >
          <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
          <p className="text-3xl font-bold">{stat.count}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
