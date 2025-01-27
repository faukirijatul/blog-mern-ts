import React, { useState, useEffect, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import debounce from "lodash.debounce";

const AllUsersTable: React.FC = () => {
  const [users, setUsers] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUserss] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  useEffect(() => {
    // Dummy data for demonstration
    const dummyUsers = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      comments: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 500),
      saved: Math.floor(Math.random() * 300),
      joinDate: new Date().toISOString(),
    }));
    setUsers(dummyUsers);
    setFilteredUserss(dummyUsers);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedTerm) ||
      user.email.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUserss(filtered);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [users]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null; // Reset sorting
    }

    setSortConfig({ key, direction });

    if (!direction) {
        setFilteredUserss([...users]); // Reset to original order
      return;
    }

    const sorted = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUserss(sorted);
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") return <FaSortUp />;
      if (sortConfig.direction === "desc") return <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 mt-15">All Users</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/3"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">#</th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center justify-between">
                  <p>Name</p> {renderSortIcon("name")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center justify-between">
                  <p>Email</p> {renderSortIcon("email")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("comments")}
              >
                <div className="flex items-center justify-between">
                  <p>Comments</p> {renderSortIcon("comments")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("likes")}
              >
                <div className="flex items-center justify-between">
                  <p>Likes</p> {renderSortIcon("likes")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("saved")}
              >
                <div className="flex items-center justify-between">
                  <p>Saved</p> {renderSortIcon("saved")}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("joinDate")}
              >
                <div className="flex items-center justify-between">
                  <p>Join Date</p> {renderSortIcon("joinDate")}
                </div>
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 text-center">{user.comments}</td>
                <td className="p-4 text-center">{user.likes}</td>
                <td className="p-4 text-center">{user.saved}</td>
                <td className="p-4">
                  {new Date(user.joinDate).toLocaleString()}
                </td>
                <td className="p-4 flex items-center justify-center gap-2">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersTable;
