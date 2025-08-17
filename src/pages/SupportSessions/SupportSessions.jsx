import React from "react";
import { FaClock, FaUserTie, FaChalkboardTeacher } from "react-icons/fa";

const supportSessions = [
  {
    title: "Morning Session",
    time: "9:00 AM - 12:00 PM",
    icon: <FaClock />,
    mentor: "Mentor: Asif Ahmed",
  },
  {
    title: "Afternoon Session",
    time: "2:00 PM - 5:00 PM",
    icon: <FaClock />,
    mentor: "Mentor: Dablu Hossain",
  },
  {
    title: "Evening Session",
    time: "7:00 PM - 10:00 PM",
    icon: <FaClock />,
    mentor: "Mentor: kablus Hasan",
  },
];

const SupportSessions = () => {
  return (
    <div className="w-11/12 mx-auto px-5 py-13 rounded-2xl mt-20 shadow-xl bg-gradient-to-r from-indigo-50 to-blue-100">
      <div className=" px-4 text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4">
          Daily Support Sessions
        </h2>
        <p className="text-gray-600 mb-10 text-lg max-w-2xl xl:max-w-4xl mx-auto">
          Join our live support sessions 3 times a day — guided by expert
          mentors to solve doubts, review assignments, and grow your skills.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {supportSessions.map((session, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-6 transition transform hover:-translate-y-1"
            >
              <div className="text-indigo-600 text-4xl mb-4">
                {session.icon}
              </div>
              <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
                {session.title}
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                <FaClock className="inline mr-2 text-indigo-500" />
                {session.time}
              </p>
              <p className="text-sm text-gray-600">
                <FaUserTie className="inline mr-2 text-indigo-500" />
                {session.mentor}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportSessions;
