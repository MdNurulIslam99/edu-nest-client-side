import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCreditCard,
} from "react-icons/fa";

const HowEduNestWorks = () => {
  return (
    <div className="py-16 mt-20 mb-16 bg-gradient-to-b from-indigo-50 to-white rounded-xl shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-12">
          How EduNest Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <FaUserGraduate className="text-4xl text-indigo-500 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">1. Sign Up</h4>
            <p className="text-gray-600 text-sm">
              Create a free student account and explore a variety of courses.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <FaChalkboardTeacher className="text-4xl text-green-500 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">2. Enroll in Classes</h4>
            <p className="text-gray-600 text-sm">
              Choose your desired course and start learning from top educators.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <FaCreditCard className="text-4xl text-pink-500 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">3. Get Certified</h4>
            <p className="text-gray-600 text-sm">
              Complete classes, submit assignments, and earn certificates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowEduNestWorks;
