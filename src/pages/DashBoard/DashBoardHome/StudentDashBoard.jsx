import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaChalkboardTeacher, FaFileAlt, FaCommentAlt } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studentDashboardStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-dashboard-stats?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load stats.</p>
    );

  const { enrolledCount, submittedCount, feedbackCount } = stats;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📊 Student Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Enrolled Classes */}
        <div className="bg-blue-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex flex-col items-center">
            <FaChalkboardTeacher className="text-4xl text-blue-600 mb-2" />
            <h3 className="text-xl font-semibold">Enrolled Classes</h3>
            <p className="text-3xl font-bold">{enrolledCount}</p>
            <p className="text-sm mt-2 text-gray-600 text-center">
              Total classes you've enrolled in.
            </p>
          </div>
        </div>

        {/* Submitted Assignments */}
        <div className="bg-green-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex flex-col items-center">
            <FaFileAlt className="text-4xl text-green-600 mb-2" />
            <h3 className="text-xl font-semibold">Assignments Submitted</h3>
            <p className="text-3xl font-bold">{submittedCount}</p>
            <p className="text-sm mt-2 text-gray-600 text-center">
              Total assignments you've submitted.
            </p>
          </div>
        </div>

        {/* Feedback Given */}
        <div className="bg-yellow-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex flex-col items-center">
            <FaCommentAlt className="text-4xl text-yellow-600 mb-2" />
            <h3 className="text-xl font-semibold">Feedback Given</h3>
            <p className="text-3xl font-bold">{feedbackCount}</p>
            <p className="text-sm mt-2 text-gray-600 text-center">
              Total feedbacks you've submitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
