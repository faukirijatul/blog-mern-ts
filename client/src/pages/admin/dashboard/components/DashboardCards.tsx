import React, { useEffect } from "react";
import { API_BASE } from "../../../../constans";
import axios from "axios";
import toast from "react-hot-toast";

interface IStatistic {
  totalBlogs: number;
  totalUsers: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalVisits: number;
}

const DashboardCards: React.FC = () => {
  const [statistic, setStatistic] = React.useState<IStatistic>({
    totalBlogs: 0,
    totalUsers: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalVisits: 0,
  });

  useEffect(() => {
    try {
      axios.get(`${API_BASE}/api/v1/statistics`).then((res) => {
        if (res.data.success) {
          setStatistic(res.data.data);
        }
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An unknown error occurred");
        throw new Error(
          error.response?.data?.message || "An unknown error occurred"
        );
      } else {
        toast.error("An unknown error occurred");
        throw new Error("An unknown error occurred"); 
    }
    }
  }, [])

  const stats = [
    { title: "Blogs", count: statistic.totalBlogs, bgColor: "bg-blue-500" },
    { title: "Users", count: statistic.totalUsers, bgColor: "bg-green-500" },
    { title: "Visits", count: statistic.totalVisits, bgColor: "bg-purple-500" },
    { title: "Views", count: statistic.totalViews, bgColor: "bg-yellow-500" },
    { title: "Comments", count: statistic.totalComments, bgColor: "bg-red-500" },
    { title: "Likes", count: statistic.totalLikes, bgColor: "bg-indigo-500" },
];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`${stat.bgColor} text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center`}
        >
          <p className="text-3xl font-bold">{stat.count.toLocaleString("id-ID")}</p>
          <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
