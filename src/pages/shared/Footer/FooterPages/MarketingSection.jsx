import React, { useEffect } from "react";
import { Link } from "react-router";

const MarketingSection = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="bg-indigo-50 mt-28 mb-16 rounded-2xl py-16 px-4 sm:px-6 lg:px-16 text-gray-800">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: Textual Content */}
        <div>
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">
            Empower Your Learning Journey with EduNest
          </h2>
          <p className="text-lg mb-4">
            EduNest is your trusted companion in modern education. Whether
            you're a student seeking skill development, a tutor ready to teach,
            or an institution managing digital classrooms — EduNest connects and
            empowers you all in one place.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-indigo-600 font-bold text-lg mr-2">✓</span>
              Flexible online & hybrid class management
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 font-bold text-lg mr-2">✓</span>
              Seamless tutor-student communication
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 font-bold text-lg mr-2">✓</span>
              Skill-based learning paths for all levels
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 font-bold text-lg mr-2">✓</span>
              Real-time performance tracking & certificates
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Get Started for Free
            </Link>
            <Link
              to="/"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-100 transition font-semibold"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Right: Image or Graphic */}
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co/1YDqJS38/training.jpg"
            alt="EduNest Learning Platform"
            className="rounded-2xl shadow-xl w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
