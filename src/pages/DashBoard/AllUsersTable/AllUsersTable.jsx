import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserSlash } from "react-icons/fa"; // 🆕
import Swal from "sweetalert2";

const AllUsersTable = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading users...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Failed to load users.</p>
    );

  // ✅ 1. Update handler name & logic
  const handleToggleAdmin = (id, email, currentRole) => {
    const action = currentRole === "admin" ? "remove admin" : "make admin";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action} for ${email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/toggle-admin/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Success",
                `${email} is now ${res.data.newRole}`,
                "success"
              );
              refetch(); // ✅ Refetch users
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update role", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
        All Registered Users
      </h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full table-zebra text-center">
          <thead className="bg-indigo-100 text-indigo-800 text-sm uppercase">
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th> {/* 🆕 updated heading */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex justify-center">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-indigo-300 ring-offset-base-100 ring-offset-2">
                        <img src={user.photoUrl} alt={user.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">{user.name}</td>
                <td className="text-sm">{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "badge-success" : "badge-ghost"
                    }`}
                  >
                    {user.role || "student"}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      user.role === "admin"
                        ? "btn-outline btn-error"
                        : "btn-outline btn-success"
                    }`}
                    onClick={() =>
                      handleToggleAdmin(user._id, user.email, user.role)
                    }
                  >
                    <FaUserShield className="mr-1" />
                    {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsersTable;
