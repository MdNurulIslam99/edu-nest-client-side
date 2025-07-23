import React from "react";
import { FaChalkboardTeacher, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

const BecomeTeacher = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 mt-20 mb-10 px-4 shadow-2xl rounded-xl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
            Become an Inspiring Teacher at EduNest
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Share your knowledge, connect with students, and grow your career.
            At EduNest, we value passionate educators who are ready to make a
            difference in the learning journey of others.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Benefit Cards */}
            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border hover:shadow-lg transition">
              <FaChalkboardTeacher className="text-3xl text-indigo-500" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Teach Your Passion
                </h4>
                <p className="text-sm text-gray-500">
                  Create and manage classes in your area of expertise.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border hover:shadow-lg transition">
              <FaMoneyBillWave className="text-3xl text-green-500" />
              <div>
                <h4 className="font-semibold text-gray-800">Earn Income</h4>
                <p className="text-sm text-gray-500">
                  Get paid for every enrolled student in your class.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border hover:shadow-lg transition sm:col-span-2">
              <FaUsers className="text-3xl text-pink-500" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Inspire Students
                </h4>
                <p className="text-sm text-gray-500">
                  Join a community of learners and educators.
                </p>
              </div>
            </div>
          </div>

          <Link to="/teacherRequestForm">
            <button className="btn btn-primary btn-wide">
              Apply to Become a Teacher
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="text-center">
          <img
            src="https://i.ibb.co/cKDT5HZC/teacher.png"
            alt="Become a teacher"
            className="w-full max-w-md mx-auto rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeTeacher;
