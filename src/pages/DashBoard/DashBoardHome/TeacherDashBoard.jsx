import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardList,
  FaBookOpen,
  FaStar,
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TeacherDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  //  Fetch teacher statistics
  const { data: teacherStats = {} } = useQuery({
    queryKey: ["teacher-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-dashboard-stats/${user?.email}`
      );
      return res.data;
    },
  });

  const {
    totalClasses,
    totalEnrollment,
    totalAssignments,
    totalSubmissions,
    totalFeedback,
  } = teacherStats;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-2 text-center">
        📊 Teacher Dashboard Overview
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Welcome,{" "}
        <span className="font-semibold">{user?.displayName || "Teacher"}</span>!
        Here is your course and assignment overview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*  Total Classes */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500">
          <div className="flex items-center space-x-4">
            <FaChalkboardTeacher className="text-3xl text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">Total Classes</h3>
              <p className="text-2xl">{totalClasses || 0}</p>
            </div>
          </div>
        </div>

        {/*  Total Enrollments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-500">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-3xl text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Total Enrollments</h3>
              <p className="text-2xl">{totalEnrollment || 0}</p>
            </div>
          </div>
        </div>

        {/*  Total Assignments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-yellow-500">
          <div className="flex items-center space-x-4">
            <FaClipboardList className="text-3xl text-yellow-500" />
            <div>
              <h3 className="text-xl font-semibold">Assignments Given</h3>
              <p className="text-2xl">{totalAssignments || 0}</p>
            </div>
          </div>
        </div>

        {/*  Total Submissions */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-purple-500">
          <div className="flex items-center space-x-4">
            <FaBookOpen className="text-3xl text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Total Submissions</h3>
              <p className="text-2xl">{totalSubmissions || 0}</p>
            </div>
          </div>
        </div>

        {/*  Total Feedback */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-pink-500">
          <div className="flex items-center space-x-4">
            <FaStar className="text-3xl text-pink-500" />
            <div>
              <h3 className="text-xl font-semibold">Feedback Received</h3>
              <p className="text-2xl">{totalFeedback || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardHome;
