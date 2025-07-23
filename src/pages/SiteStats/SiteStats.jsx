import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUser, FaBook, FaUserGraduate } from "react-icons/fa";

const SiteStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["siteStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/site-stats");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading statistics...</p>;
  if (isError || !stats)
    return <p className="text-center text-red-500">Failed to load stats.</p>;

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 md:px-6 lg:px-8">
      {/* Title & Description */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
          EduNest Platform Growth
        </h2>
        <p className="text-gray-600 max-w-5xl mx-auto text-lg">
          Join thousands of learners and educators who are building a brighter
          future through EduNest. Here’s how far we’ve come and continue to grow
          every day!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-200 shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center h-48 transition-transform hover:scale-105 duration-300">
            <FaUser className="text-4xl text-indigo-600 mb-3" />
            <h3 className="text-3xl font-bold">{stats?.totalUsers || 0}</h3>
            <p className="text-gray-600 text-sm">Total Users</p>
          </div>

          {/* Total Classes */}
          <div className="bg-gradient-to-br from-green-100 to-green-50 border border-green-200 shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center h-48 transition-transform hover:scale-105 duration-300">
            <FaBook className="text-4xl text-green-600 mb-3" />
            <h3 className="text-3xl font-bold">{stats?.totalClasses || 0}</h3>
            <p className="text-gray-600 text-sm">Total Classes</p>
          </div>

          {/* Total Enrollments */}
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200 shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center h-48 transition-transform hover:scale-105 duration-300">
            <FaUserGraduate className="text-4xl text-pink-600 mb-3" />
            <h3 className="text-3xl font-bold">
              {stats?.totalEnrollments || 0}
            </h3>
            <p className="text-gray-600 text-sm">Total Enrollments</p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-[50%] flex justify-center">
          <img
            src="https://i.ibb.co/PZdGPzkp/edunest2.jpg"
            alt="EduNest platform growth"
            className="w-full max-w-md rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SiteStats;
