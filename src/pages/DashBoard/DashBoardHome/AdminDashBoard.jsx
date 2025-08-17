import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClock,
  FaBook,
  FaClipboardList,
  FaCheckCircle,
  FaComments,
  FaUserCheck,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-dashboard-stats");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-10">Loading dashboard stats...</p>;
  if (isError || !stats)
    return (
      <p className="text-center text-red-600 py-10">
        Failed to load dashboard statistics.
      </p>
    );

  return (
    <div className="w-11/12 mx-auto px-6 py-12">
      {/* Title and Description */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-3">
          Admin Dashboard Overview
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Monitor key metrics across your platform including users, teachers,
          classes, assignments, and more. Stay informed about platform activity
          at a glance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Total Users */}
        <div className="card bg-white shadow-lg rounded-xl border border-indigo-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaUsers className="text-indigo-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
          <p className="text-indigo-700 font-semibold mt-1">Total Users</p>
          <p className="text-gray-500 mt-2 text-sm">
            All registered users on the platform.
          </p>
        </div>

        {/* Total Teachers */}
        <div className="card bg-white shadow-lg rounded-xl border border-green-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaChalkboardTeacher className="text-green-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalTeachers}</h2>
          <p className="text-green-700 font-semibold mt-1">Total Teachers</p>
          <p className="text-gray-500 mt-2 text-sm">
            Teachers actively instructing classes.
          </p>
        </div>

        {/* Total Students */}
        <div className="card bg-white shadow-lg rounded-xl border border-pink-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaUserGraduate className="text-pink-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalStudents}</h2>
          <p className="text-pink-700 font-semibold mt-1">Total Students</p>
          <p className="text-gray-500 mt-2 text-sm">
            Registered students actively learning.
          </p>
        </div>

        {/* Pending Teacher Requests */}
        <div className="card bg-white shadow-lg rounded-xl border border-yellow-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaUserCheck className="text-yellow-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.pendingTeacherRequests}</h2>
          <p className="text-yellow-700 font-semibold mt-1">
            Pending Teacher Requests
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Teachers awaiting approval.
          </p>
        </div>

        {/* Total Classes */}
        <div className="card bg-white shadow-lg rounded-xl border border-blue-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaBook className="text-blue-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalClasses}</h2>
          <p className="text-blue-700 font-semibold mt-1">Total Classes</p>
          <p className="text-gray-500 mt-2 text-sm">
            All classes created by teachers.
          </p>
        </div>

        {/* Approved Classes */}
        <div className="card bg-white shadow-lg rounded-xl border border-teal-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaCheckCircle className="text-teal-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.approvedClasses}</h2>
          <p className="text-teal-700 font-semibold mt-1">Approved Classes</p>
          <p className="text-gray-500 mt-2 text-sm">
            Classes approved and published.
          </p>
        </div>

        {/* Total Assignments */}
        <div className="card bg-white shadow-lg rounded-xl border border-purple-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaClipboardList className="text-purple-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalAssignments}</h2>
          <p className="text-purple-700 font-semibold mt-1">
            Total Assignments
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Assignments created by teachers.
          </p>
        </div>

        {/* Total Submissions */}
        <div className="card bg-white shadow-lg rounded-xl border border-red-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaClock className="text-red-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalSubmissions}</h2>
          <p className="text-red-700 font-semibold mt-1">Total Submissions</p>
          <p className="text-gray-500 mt-2 text-sm">
            Submitted assignments by students.
          </p>
        </div>

        {/* Total Feedbacks */}
        <div className="card bg-white shadow-lg rounded-xl border border-pink-300 p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
          <FaComments className="text-pink-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalFeedbacks}</h2>
          <p className="text-pink-700 font-semibold mt-1">Total Feedbacks</p>
          <p className="text-gray-500 mt-2 text-sm">
            Student feedback and reviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStats;
