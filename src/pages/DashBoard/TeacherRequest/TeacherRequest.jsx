import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/teacherRequests")
      .then((res) => {
        setRequests(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch teacher requests:", err);
        Swal.fire("Error", "Failed to load teacher requests", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleApprove = (id) => {
    axiosSecure
      .patch(`/teacherRequests/${id}`, { status: "accepted" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Request approved!", "success");
          setRequests((prev) =>
            prev.map((req) =>
              req._id === id ? { ...req, status: "accepted" } : req
            )
          );
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to approve request.", "error");
      });
  };

  const handleReject = (id) => {
    axiosSecure
      .patch(`/teacherRequests/${id}`, { status: "rejected" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Request rejected!", "success");
          setRequests((prev) =>
            prev.map((req) =>
              req._id === id ? { ...req, status: "rejected" } : req
            )
          );
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to reject request.", "error");
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-200 rounded-lg shadow-2xl mt-28 mb-16">
      <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center">
        Teacher Requests
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Review and manage all teacher applications submitted by users.
      </p>

      {loading ? (
        <p className="text-center text-indigo-600 font-semibold mb-4">
          Loading...
        </p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No teacher requests found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-bordered w-full text-center">
            {/* Table Head */}
            <thead className="bg-indigo-200 text-indigo-800 font-semibold">
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Title</th>
                <th>Experience</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {requests.map((req, index) => {
                const disabled =
                  req.status === "rejected" || req.status === "accepted";
                return (
                  <tr key={req._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={
                                req.image || "https://via.placeholder.com/150"
                              }
                              alt={req.name}
                            />
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="font-bold">{req.name}</div>
                          <div className="text-sm opacity-50">{req.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{req.title || "-"}</td>
                    <td>{req.experience || "-"}</td>
                    <td>{req.category || "-"}</td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          req.status === "accepted"
                            ? "badge-success"
                            : req.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {req.status || "pending"}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          className="btn btn-success btn-xs"
                          disabled={disabled}
                          onClick={() => handleApprove(req._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-error btn-xs"
                          disabled={disabled}
                          onClick={() => handleReject(req._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherRequest;
