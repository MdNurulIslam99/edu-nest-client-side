import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsersTable = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("❌ Failed to fetch users:", err));
  }, [axiosSecure]);

  // Make Admin handler
  const handleMakeAdmin = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make ${email} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              // Update local state
              const updated = users.map((user) =>
                user._id === id ? { ...user, role: "admin" } : user
              );
              setUsers(updated);

              Swal.fire("Success!", `${email} is now an admin`, "success");
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
              <th>Make Admin</th>
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
                  {user.role !== "admin" ? (
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => handleMakeAdmin(user._id, user.email)}
                    >
                      <FaUserShield className="mr-1" /> Make Admin
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">Already Admin</span>
                  )}
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
