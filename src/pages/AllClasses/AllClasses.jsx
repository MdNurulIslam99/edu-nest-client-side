import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUserGraduate, FaMoneyBillWave, FaBookOpen } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  //  changed: TanStack query for GET request
  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data.filter((cls) => cls.status === "approved");
    },
  });

  const handleEnroll = (id) => {
    navigate(`/allClassDetails/${id}`); //  Go to class details page
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
        {classes.map((cls) => (
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
                  {cls.description?.slice(0, 80)}...
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
                    Enrolled: {cls.totalEnrolled || 0}
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

      {classes.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No approved classes available.
        </div>
      )}
    </div>
  );
};

export default AllClasses;
