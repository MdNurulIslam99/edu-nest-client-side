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

      {loading && (
        <p className="text-center text-indigo-600 font-semibold mb-4">
          Loading...
        </p>
      )}

      {requests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {/* MARKED CHANGE: Added index column with border */}
                <th className="border border-gray-300 px-3 py-2">#</th>
                <th className="border border-gray-300 px-3 py-2">Name</th>
                <th className="border border-gray-300 px-3 py-2">Image</th>
                <th className="border border-gray-300 px-3 py-2">Experience</th>
                <th className="border border-gray-300 px-3 py-2">Title</th>
                <th className="border border-gray-300 px-3 py-2">Category</th>
                <th className="border border-gray-300 px-3 py-2">Status</th>
                <th className="border border-gray-300 px-3 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => {
                const disabled =
                  req.status === "rejected" || req.status === "accepted";
                return (
                  <tr key={req._id} className="hover:bg-gray-50">
                    {/* MARKED CHANGE: Added index number with border */}
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {req.name}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {req.image ? (
                        <img
                          src={req.image}
                          alt={req.name}
                          className="w-12 h-12 rounded-full object-cover mx-auto"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 capitalize">
                      {req.experience || "-"}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {req.title}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {req.category}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 capitalize font-semibold">
                      {req.status || "pending"}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 space-x-2 text-center">
                      <button
                        className="btn btn-success btn-sm"
                        disabled={disabled}
                        onClick={() => handleApprove(req._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        disabled={disabled}
                        onClick={() => handleReject(req._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && requests.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No teacher requests found.
        </p>
      )}
    </div>
  );
};

export default TeacherRequest;
