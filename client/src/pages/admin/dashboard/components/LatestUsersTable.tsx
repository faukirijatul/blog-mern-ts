import React from "react";
import { Link } from "react-router-dom";

const LatestUsersTable: React.FC = () => {
    const users = [
      { name: "Alice Johnson", email: "alice@example.com", registeredDate: "2023-12-01" },
      { name: "Bob Smith", email: "bob@example.com", registeredDate: "2023-12-02" },
      { name: "Charlie Brown", email: "charlie@example.com", registeredDate: "2023-12-03" },
      { name: "Diana Prince", email: "diana@example.com", registeredDate: "2023-12-04" },
      { name: "Ethan Hunt", email: "ethan@example.com", registeredDate: "2023-12-05" },
      { name: "Fiona Clark", email: "fiona@example.com", registeredDate: "2023-12-06" },
      { name: "George Miller", email: "george@example.com", registeredDate: "2023-12-07" },
      { name: "Hannah Davis", email: "hannah@example.com", registeredDate: "2023-12-08" },
      { name: "Ian Wright", email: "ian@example.com", registeredDate: "2023-12-09" },
      { name: "Jane Doe", email: "jane@example.com", registeredDate: "2023-12-10" },
    ];
  
    return (
      <div className="w-full">
        <div className="flex justify-start gap-10 items-center mb-4">
        <h2 className="text-2xl font-bold">Latest Users</h2>
        <Link to={"/admin/users"} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100">View All</Link>
      </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Registered Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.registeredDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default LatestUsersTable