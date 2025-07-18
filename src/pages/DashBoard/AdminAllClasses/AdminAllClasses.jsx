import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminAllClasses = () => {
  const [classes, setClasses] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("❌ Failed to fetch all classes", err));
  }, [axiosSecure]);

  return (
    <div className="max-w-7xl mt-16 rounded-lg shadow-2xl bg-gray-100 mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-700">
          All Classes Overview
        </h2>
        <p className="text-gray-600 mt-2">
          Admin can review, approve, or reject all submitted classes from
          instructors in EduNest.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full text-center">
          {/* Head */}
          <thead className="bg-indigo-100 text-indigo-800 text-sm uppercase">
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Image</th>
              <th className="text-center">Title</th>
              <th className="text-center">Email</th>
              <th className="text-center">Description</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {classes.map((cls, index) => (
              <tr key={cls._id} className="text-center">
                <td className="align-middle">{index + 1}</td>
                <td className="align-middle">
                  <div className="flex justify-center">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={cls.image}
                          alt={cls.title}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium align-middle">{cls.title}</td>
                <td className="text-sm align-middle">{cls.instructorEmail}</td>
                <td className="text-sm align-middle max-w-xs text-left px-4">
                  {cls.description.length > 100
                    ? cls.description.slice(0, 100) + "..."
                    : cls.description}
                </td>
                <td className="align-middle">
                  <span
                    className={`badge text-white ${
                      cls.status === "approved"
                        ? "badge-success"
                        : cls.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {cls.status || "pending"}
                  </span>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-xs btn-success text-white">
                      <FaCheckCircle className="mr-1" /> Approve
                    </button>
                    <button className="btn btn-xs btn-error text-white">
                      <FaTimesCircle className="mr-1" /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {classes.length === 0 && (
          <p className="text-center text-gray-500 py-10">No classes found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAllClasses;
