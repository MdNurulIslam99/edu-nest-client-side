import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Footer/FooterPages/Loading";

const AdminAllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: classes = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/classes/${id}`, { status });
      Swal.fire("Success", `Class ${status}!`, "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to update class status", "error");
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(classes.length / itemsPerPage);
  const paginatedClasses = classes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-11/12 mt-16 rounded-lg shadow-2xl bg-base-200 mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-700">
          All Classes Overview
        </h2>
        <p className="text-white mt-2">
          Admin can review, approve, or reject all submitted classes from
          instructors in EduNest.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-lg font-medium mt-10">
          <Loading></Loading>
        </div>
      ) : isError ? (
        <div className="text-center text-lg text-red-500 mt-10">
          Failed to load classes.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table table-zebra w-full text-center">
              <thead className="bg-indigo-100 text-indigo-800 text-sm uppercase">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Email</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClasses.map((cls, index) => (
                  <tr key={cls._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={cls.image} alt={cls.title} />
                        </div>
                      </div>
                    </td>
                    <td>{cls.title}</td>
                    <td className="text-sm">{cls.instructorEmail}</td>
                    <td className="text-left max-w-xs">
                      {cls.description.length > 100
                        ? cls.description.slice(0, 50) + "..."
                        : cls.description}
                    </td>
                    <td>
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
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          className="btn btn-xs btn-success text-white"
                          onClick={() => updateStatus(cls._id, "approved")}
                          disabled={cls.status === "approved"}
                        >
                          <FaCheckCircle className="mr-1" /> Approve
                        </button>
                        <button
                          className="btn btn-xs btn-error text-white"
                          onClick={() => updateStatus(cls._id, "rejected")}
                          disabled={cls.status === "rejected"}
                        >
                          <FaTimesCircle className="mr-1" /> Reject
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-info text-white"
                        disabled={cls.status !== "approved"}
                        onClick={() =>
                          navigate(`/dashboard/classProgress/${cls._id}`)
                        }
                      >
                        <FaChartLine className="mr-1" />
                        Progress
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {classes.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                No classes found.
              </p>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="flex justify-center mt-6">
            <div className="join">
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  className={`join-item btn btn-sm ${
                    currentPage === page + 1 ? "btn-primary text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAllClasses;
