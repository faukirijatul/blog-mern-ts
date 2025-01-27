import React from "react";
import DashboardCards from "./components/DashboardCards";
import LatestUsersTable from "./components/LatestUsersTable";
import LatestBlogsTable from "./components/LatestBlogsTable";

const Dashboard : React.FC = () => {
  return (
    <div className="w-full mx-auto px-2 md:px-6 p-6 bg-white mt-15">
      <DashboardCards />
      <div className="w-full flex flex-col xl:flex-row items-center gap-5 mt-10">
        <LatestUsersTable />
        <LatestBlogsTable />
      </div>
    </div>
  );
};

export default Dashboard;
