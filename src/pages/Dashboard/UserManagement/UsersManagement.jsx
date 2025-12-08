import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axios = useAxios();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
       const res = await axios.get(`/users?searchText=${searchText}`);
       return res.data;
    },
  });

  const handleMakeManager = (user) => {
    const roleInfo = { role: "manager" };
    axios.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
         if(res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.displayName} promoted to Manager`,
                    showConfirmButton: false,
                    timer: 2000,
               });
          }
    });
  };

  const handleRemoveManager = (user) => {
    const roleInfo = { role: "user" };
    axios.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
        if(res.data.modifiedCount) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.displayName} is now a User`,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    });
  };

  const handleDelete = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // call API to delete user
                axios.delete(`/users/${userId}`) 
                    .then(() => {
                        refetch();
                    });
                    Swal.fire("Deleted!", "User has been deleted.", "success");
            }
        });
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-4">Users ({users.length})</h2>

      {/* Search Box */}
      <div className="mb-6">
        <div className="flex items-center bg-white border rounded-xl shadow-sm px-4 py-2 gap-3">
          <svg
            className="h-5 w-5 opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
            />
          </svg>

          <input
            type="search"
            placeholder="Search users..."
            className="flex-1 outline-none text-lg"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Admin Action</th>
              <th className="py-3 px-4 text-center">Others</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition border-b"
              >
                <td className="py-3 px-4">{index + 1}</td>

                <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={user.photoURL}
                            className="w-12 h-12 rounded-xl object-cover shadow-md"
                            alt={user.displayName}
                        />
                        <div>
                            <div className="font-semibold text-lg">
                                {user.displayName}
                            </div>
                            <div className="text-sm text-gray-500">
                                Member
                            </div>
                        </div>
                    </div>
                </td>

                <td className="py-3 px-4">{user.email}</td>

                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-700"
                        : user.role === "manager"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                     `}
                  >
                    {user.role}
                </span>
                </td>

                <td className="py-3 px-4 text-center">
                    {user.role === "manager" ? (
                        <button
                          onClick={() => handleRemoveManager(user)}
                          className="p-3 bg-red-100 hover:bg-red-200 rounded-xl text-red-700 shadow-sm"
                        >
                          <FiShieldOff size={18} />
                        </button>
                    ) : (
                        <button
                          onClick={() => handleMakeManager(user)}
                          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-sm"
                        >
                          <FaUserShield size={18} />
                        </button>
                    )}
                </td>
                <td className="py-3 px-4 text-center bg-rounded-xl">
                    <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 rounded bg-purple-500 text-white hover:bg-red-500 transition"
                    >
                        Delete User 
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

export default UsersManagement;