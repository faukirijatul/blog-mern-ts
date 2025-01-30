import React from "react";
import DashboardCards from "./components/DashboardCards";
import LatestUsersAndBlogsTable from "./components/LatestUsersAndBlogsTable";

const Dashboard : React.FC = () => {
  return (
    <div className="w-full mx-auto px-2 md:px-6 p-6 bg-white mt-20">
      <DashboardCards />
      <LatestUsersAndBlogsTable />
    </div>
  );
};

export default Dashboard;
