import React, { useState, useEffect, useCallback } from "react";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from "react-icons/fa";
import debounce from "lodash.debounce";
import axios from "axios";
import { API_BASE } from "../../../constans";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { SkeletonRow } from "../AllBlogsTable/skeleton";
import { formatDate } from "../../../helper/formatDate";
import toast from "react-hot-toast";

interface IUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  savedBlogsCount: number;
  totalComments: number;
  totalLikes: number;
}

const AllUsersTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/v1/users`, {
        params: { search, sortBy, order, page: currentPage, limit },
      });
      if (response.data.success) {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy, order, currentPage]);

  const debouncedSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleSort = (key: string) => {
    setSortBy(key);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const renderSortIcon = (key: string) => {
    if (sortBy === key) {
      return order === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="p-6 mt-15">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 rounded-[5px] px-2 py-[5px] w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center justify-between">
                  <p>Name</p> {renderSortIcon("name")}
                </div>
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort("email")}>
                <div className="flex items-center justify-between">
                  <p>Email</p> {renderSortIcon("email")}
                </div>
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort("statistic.totalComments")}>
                <div className="flex items-center justify-between">Comments {renderSortIcon("statistic.totalComments")}</div>
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort("statistic.totalLikes")}>
                <div className="flex items-center justify-between">Likes {renderSortIcon("statistic.totalLikes")}</div>
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort("savedBlogs.length")}>
                <div className="flex items-center justify-between">Saved {renderSortIcon("savedBlogs.length")}</div>
              </th>
              <th className="p-4 cursor-pointer" onClick={() => handleSort("createdAt")}>
                <div className="flex items-center justify-between">
                  <p>Joined At</p> {renderSortIcon("createdAt")}
                </div>
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array(5).fill(null).map((_, i) => <SkeletonRow key={i} />)
              : users.map((user, index) => (
                  <tr key={user._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                    <td className="p-4 text-center">{index + 1}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4 text-center">{user.totalComments}</td>
                <td className="p-4 text-center">{user.totalLikes}</td>
                <td className="p-4 text-center">{user.savedBlogsCount}</td>
                    <td className="p-4">{formatDate(user.createdAt)}</td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-1 text-2xl bg-gray-300 rounded-md disabled:opacity-50 mr-2"
        >
          <GrFormPrevious />
        </button>
        <span className="px-4 py-2">{currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-1 text-2xl bg-gray-300 rounded-md disabled:opacity-50 ml-2"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default AllUsersTable;
