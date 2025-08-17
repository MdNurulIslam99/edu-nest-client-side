import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaChalkboardTeacher, FaFileAlt, FaCommentAlt } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Footer/FooterPages/Loading";

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
      console.log("Fetching stats for:", user?.email);
      const res = await axiosSecure.get(
        `/student-dashboard-stats?email=${user?.email?.toLowerCase()}`
      );
      console.log("Stats response:", res.data);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load stats.</p>
    );

  const { enrolledCount = 0, submittedCount = 0, feedbackCount = 0 } = stats;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📊 Student Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaChalkboardTeacher className="text-4xl text-blue-600 mb-2" />}
          title="Enrolled Classes"
          count={enrolledCount}
          description="Total classes you've enrolled in."
          color="blue"
        />
        <StatCard
          icon={<FaFileAlt className="text-4xl text-green-600 mb-2" />}
          title="Assignments Submitted"
          count={submittedCount}
          description="Total assignments you've submitted."
          color="green"
        />
        <StatCard
          icon={<FaCommentAlt className="text-4xl text-yellow-600 mb-2" />}
          title="Feedback Given"
          count={feedbackCount}
          description="Total feedbacks you've submitted."
          color="yellow"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, count, description, color }) => (
  <div
    className={`bg-${color}-100 rounded-xl p-6 shadow hover:shadow-lg transition`}
  >
    <div className="flex flex-col items-center">
      {icon}
      <h3 className="text-xl text-black font-semibold">{title}</h3>
      <p className="text-3xl text-black font-bold">{count}</p>
      <p className="text-sm mt-2 text-gray-600 text-center">{description}</p>
    </div>
  </div>
);

export default StudentDashboard;
