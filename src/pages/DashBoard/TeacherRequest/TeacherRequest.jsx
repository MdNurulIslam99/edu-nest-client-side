import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

  // Fetch all teacher requests
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacherRequests");
      return res.data;
    },
  });

  const totalRequests = requests.length;
  const totalPages = Math.ceil(totalRequests / requestsPerPage);

  // Get current page requests
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirst, indexOfLast);

  const handleUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure you want to ${status} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    axiosSecure
      .patch(`/teacherRequests/${id}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", `Request ${status}ed`, "success");
          refetch();
        }
      })
      .catch(() => Swal.fire("Error", `Failed to ${status} request`, "error"));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 bg-base-200 rounded-xl mt-16">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-4">
        Teacher Requests
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Review and manage all teacher applications submitted by users.
      </p>

      {isLoading ? (
        <p className="text-center text-indigo-600 font-semibold">Loading...</p>
      ) : totalRequests === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No teacher requests found.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-indigo-100 text-indigo-800 font-semibold text-center">
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
              <tbody>
                {currentRequests.map((req, index) => {
                  const disabled =
                    req.status === "rejected" || req.status === "accepted";
                  return (
                    <tr key={req._id} className="text-center">
                      <td>{indexOfFirst + index + 1}</td>
                      <td>
                        <div className="flex items-center justify-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={
                                  req.image ||
                                  req.photoUrl ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={req.name}
                              />
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-bold">{req.name}</div>
                            <div className="text-sm opacity-60">
                              {req.email}
                            </div>
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
                            className="btn btn-success btn-xs text-white"
                            disabled={disabled}
                            onClick={() => handleUpdate(req._id, "accepted")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-error btn-xs text-white"
                            disabled={disabled}
                            onClick={() => handleUpdate(req._id, "rejected")}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-indigo-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherRequest;
