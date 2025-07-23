import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaUserGraduate, FaMoneyBillWave, FaBookOpen } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 10;

  // Fetch all classes then filter approved client-side
  const {
    data: allClasses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data.filter((cls) => cls.status === "approved");
    },
  });

  // Pagination calculations
  const totalClasses = allClasses.length;
  const totalPages = Math.ceil(totalClasses / classesPerPage);

  const indexOfLast = currentPage * classesPerPage;
  const indexOfFirst = indexOfLast - classesPerPage;
  const currentClasses = allClasses.slice(indexOfFirst, indexOfLast);

  const handleEnroll = (id) => {
    navigate(`/allClassDetails/${id}`);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold text-gray-500">
        Loading courses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-20 text-lg font-semibold text-red-500">
        Failed to load courses. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-16 mb-10 mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-indigo-700">EduNest Courses</h2>
        <p className="mt-3 text-gray-600 max-w-4xl mx-auto">
          Welcome to EduNest - Smart Education System. Explore and enroll in
          interactive, industry-relevant courses taught by professional
          educators. Start learning today!
        </p>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentClasses.map((cls) => (
          <div
            key={cls._id}
            className="mt-10 card bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300"
          >
            <figure className="h-48 w-full overflow-hidden">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body flex flex-col justify-between h-64">
              <div>
                <h2 className="text-xl font-bold text-indigo-700">
                  {cls.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <FaUserGraduate className="mr-2 text-indigo-500" />
                  Instructor:{" "}
                  <span className="ml-1 font-semibold">
                    {cls.instructorName}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {cls.description?.slice(0, 50)}...
                </p>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <FaMoneyBillWave className="mr-1 text-green-500" /> $
                    {cls.price}
                  </span>
                  <span className="flex items-center">
                    <FaBookOpen className="mr-1 text-blue-500" />
                    Enrolled: {cls.totalEnrollment || 0}
                  </span>
                </div>

                <button
                  onClick={() => handleEnroll(cls._id)}
                  className="btn btn-sm btn-primary mt-4 w-full"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalClasses === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No approved classes available.
        </div>
      )}

      {/* Pagination Controls */}
      {totalClasses > classesPerPage && (
        <div className="flex justify-center mt-12 space-x-2">
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
    </div>
  );
};

export default AllClasses;
